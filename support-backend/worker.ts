/**
 * ToneCustoms private customer support intake.
 * Deploy separately to Cloudflare Workers; never put credentials in GitHub Pages.
 * All required secrets are configured in the Cloudflare Worker environment.
 */
interface Env {
  GITHUB_TOKEN: string
  GITHUB_PRIVATE_REPO: string
  DISCORD_WEBHOOK_URL: string
  TURNSTILE_SECRET: string
  ALLOWED_ORIGIN: string
  SUPPORT_RATE_LIMIT: { limit: (options: { key: string }) => Promise<{ success: boolean }> }
}
type Intake = {
  product?: unknown
  issue?: unknown
  framework?: unknown
  description?: unknown
  contact?: unknown
  turnstileToken?: unknown
}
const respond = (data: object, status = 200, origin = '') =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      ...(origin ? { 'Access-Control-Allow-Origin': origin, Vary: 'Origin' } : {})
    }
  })
const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max).replace(/[\u0000-\u001f\u007f]/g, ' ') : ''
const safeText = (value: string) => value.replace(/@/g, '@\u200b').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const githubHeaders = (token: string) => ({
  Authorization: 'Bearer ' + token,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
  'Content-Type': 'application/json'
})
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get('Origin') || ''
    const allowed = env.ALLOWED_ORIGIN || 'https://tonecustoms.github.io'
    if (origin !== allowed) return respond({ error: 'Origin not allowed.' }, 403)
    if (request.method === 'OPTIONS') {
      return new Response(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': allowed,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Max-Age': '600',
          Vary: 'Origin'
        }
      })
    }
    if (request.method !== 'POST' || new URL(request.url).pathname !== '/ticket') {
      return respond({ error: 'Not found.' }, 404, allowed)
    }
    if (!request.headers.get('Content-Type')?.startsWith('application/json')) {
      return respond({ error: 'JSON required.' }, 415, allowed)
    }
    if (!env.GITHUB_TOKEN || !env.GITHUB_PRIVATE_REPO || !env.TURNSTILE_SECRET || !env.DISCORD_WEBHOOK_URL || !env.SUPPORT_RATE_LIMIT) {
      return respond({ error: 'Support intake is not configured.' }, 503, allowed)
    }
    const ip = request.headers.get('CF-Connecting-IP') || ''
    if (!ip) return respond({ error: 'Request could not be verified.' }, 403, allowed)
    const rate = await env.SUPPORT_RATE_LIMIT.limit({ key: ip })
    if (!rate.success) return respond({ error: 'Too many requests. Please try again later.' }, 429, allowed)
    const raw = await request.text()
    if (raw.length > 6000) return respond({ error: 'Request too large.' }, 413, allowed)
    let data: Intake
    try { data = JSON.parse(raw) as Intake } catch { return respond({ error: 'Invalid request.' }, 400, allowed) }
    const product = clean(data.product, 80)
    const issue = clean(data.issue, 100)
    const framework = clean(data.framework, 60)
    const description = clean(data.description, 1200)
    const contact = clean(data.contact, 120)
    const token = clean(data.turnstileToken, 2500)
    if (!product || !issue || description.length < 15 || !contact || !token) {
      return respond({ error: 'Please complete the required fields and verification.' }, 400, allowed)
    }
    if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(env.GITHUB_PRIVATE_REPO)) {
      return respond({ error: 'Support configuration error.' }, 503, allowed)
    }
    const turnstileForm = new FormData()
    turnstileForm.set('secret', env.TURNSTILE_SECRET)
    turnstileForm.set('response', token)
    turnstileForm.set('remoteip', ip)
    const verified = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: turnstileForm })
    if (!verified.ok) return respond({ error: 'Verification unavailable. Try again.' }, 503, allowed)
    const verification = await verified.json() as { success?: boolean; hostname?: string }
    if (!verification.success || verification.hostname !== 'tonecustoms.github.io') {
      return respond({ error: 'Verification failed. Please retry.' }, 403, allowed)
    }
    const api = 'https://api.github.com/repos/' + env.GITHUB_PRIVATE_REPO
    const headers = githubHeaders(env.GITHUB_TOKEN)
    const repository = await fetch(api, { headers })
    if (!repository.ok) return respond({ error: 'Ticket system temporarily unavailable.' }, 503, allowed)
    const repoData = await repository.json() as { private?: boolean; has_issues?: boolean }
    if (!repoData.private || !repoData.has_issues) {
      return respond({ error: 'Ticket destination must be a private repository with Issues enabled.' }, 503, allowed)
    }
    const title = '[Customer Support] ' + product.slice(0, 45) + ' — ' + issue.slice(0, 45)
    const body = [
      '## ToneCustoms Customer Support',
      '',
      '**Product:** ' + safeText(product),
      '**Issue:** ' + safeText(issue),
      '**Framework:** ' + safeText(framework || 'Not specified'),
      '**Customer contact:** ' + safeText(contact),
      '',
      '### Description',
      '',
      safeText(description),
      '',
      '### Staff checklist',
      '- [ ] Review customer issue and product documentation',
      '- [ ] Investigate / request additional details privately',
      '- [ ] Respond to customer using their supplied contact',
      '- [ ] Resolve and close ticket',
      '',
      '> Submitted through the ToneCustoms website. Private issue: do not copy customer data into public repositories.'
    ].join('\n')
    const created = await fetch(api + '/issues', {
      method: 'POST',
      headers,
      body: JSON.stringify({ title, body, assignees: ['tonyiswavy'] })
    })
    if (!created.ok) return respond({ error: 'Could not create a ticket. Please contact Discord support.' }, 503, allowed)
    const ticket = await created.json() as { number: number; html_url: string }
    // Discord gets only the private issue link, not the customer's description or contact.
    await fetch(env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        content: 'New ToneCustoms support ticket #' + ticket.number + ': ' + ticket.html_url,
        allowed_mentions: { parse: [] }
      })
    }).catch(() => undefined)
    // Do not expose a private GitHub issue URL to anonymous customers.
    return respond({ ticketId: 'TC-' + ticket.number, message: 'Your support request was submitted. Keep this reference for follow-up.' }, 201, allowed)
  }
}
