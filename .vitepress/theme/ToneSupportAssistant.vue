<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { supportConfig } from './support-config'
import { withBase } from 'vitepress'

type Topic = 'install' | 'broken' | 'purchase' | 'custom' | 'bug' | 'contact'
const isOpen = ref(false)
const topic = ref<Topic | null>(null)
const dialog = ref<HTMLElement | null>(null)
const trigger = ref<HTMLButtonElement | null>(null)
type ProductId = 'gunjam' | 'family' | 'window' | 'other'
type IssueId = 'startup' | 'interaction' | 'inventory' | 'ui' | 'saving' | 'other'
const product = ref<ProductId | ''>('')
const issue = ref<IssueId | ''>('')
const description = ref('')
const framework = ref('')
const copied = ref(false)
const customerContact = ref('')
const ticketResult = ref('')
const submitError = ref('')
const submitting = ref(false)
const challengeToken = ref('')
const challengeEl = ref<HTMLElement | null>(null)
const ticketEnabled = Boolean(supportConfig.endpoint && supportConfig.turnstileSiteKey)
type TurnstileApi = { render: (element: HTMLElement, options: Record<string, unknown>) => string }
function turnstileApi(): TurnstileApi | undefined {
  return (window as unknown as { turnstile?: TurnstileApi }).turnstile
}
let challengeRendered = false
async function renderChallenge() {
  if (!ticketEnabled || !challengeEl.value || challengeRendered) return
  if (!turnstileApi()) {
    const existing = document.querySelector('script[data-tc-turnstile]')
    if (!existing) {
      const script = document.createElement('script')
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
      script.async = true
      script.defer = true
      script.dataset.tcTurnstile = 'true'
      document.head.appendChild(script)
    }
    for (let n = 0; n < 30 && !turnstileApi(); n++) {
      await new Promise(resolve => setTimeout(resolve, 200))
    }
  }
  if (turnstileApi() && challengeEl.value && !challengeRendered) {
    challengeRendered = true
    turnstileApi()!.render(challengeEl.value, {
      sitekey: supportConfig.turnstileSiteKey,
      theme: 'dark',
      callback: (token: string) => { challengeToken.value = token },
      'expired-callback': () => { challengeToken.value = '' },
      'error-callback': () => { challengeToken.value = '' }
    })
  }
}
watch([product, issue, isOpen], async () => {
  await nextTick()
  if (isOpen.value && product.value && issue.value) await renderChallenge()
})
async function submitTicket() {
  if (!ticketEnabled || submitting.value || !product.value || !issue.value) return
  if (description.value.trim().length < 15 || !customerContact.value.trim() || !challengeToken.value) {
    submitError.value = 'Add a contact, describe the issue (at least 15 characters), and complete verification.'
    return
  }
  submitting.value = true
  submitError.value = ''
  ticketResult.value = ''
  try {
    const response = await fetch(supportConfig.endpoint.replace(/\\/$/, '') + '/ticket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        product: products.find(p => p.id === product.value)?.name,
        issue: issues.find(i => i.id === issue.value)?.name,
        framework: framework.value,
        description: description.value,
        contact: customerContact.value,
        turnstileToken: challengeToken.value
      })
    })
    const result = await response.json() as { ticketId?: string; error?: string }
    if (!response.ok || !result.ticketId) throw new Error(result.error || 'Ticket submission failed.')
    ticketResult.value = result.ticketId
  } catch (error) {
    submitError.value = error instanceof Error ? error.message : 'Could not submit your ticket.'
  } finally {
    submitting.value = false
    challengeToken.value = ''
  }
}

const products: { id: ProductId; name: string; troubleshooting: string; installation: string }[] = [
  { id: 'gunjam', name: 'Gun Jam', troubleshooting: '/products/gun-jam-troubleshooting', installation: '/products/gun-jam-installation' },
  { id: 'family', name: 'Family System', troubleshooting: '/products/family-system-troubleshooting', installation: '/products/family-system-installation' },
  { id: 'window', name: 'Window Cleaning', troubleshooting: '/products/window-cleaning-troubleshooting', installation: '/products/window-cleaning-installation' },
  { id: 'other', name: 'Other ToneCustoms script', troubleshooting: '/TROUBLESHOOTING', installation: '/INSTALLATION' }
]
const issues: { id: IssueId; name: string; advice: string }[] = [
  { id: 'startup', name: 'Script will not start', advice: 'Check the first relevant server console error, the resource folder and fxmanifest.lua, then confirm documented dependencies start before the resource.' },
  { id: 'interaction', name: 'Interaction or keybind is not working', advice: 'Check the configured interaction or keybind, player permissions and client console. Make sure the feature is available in the intended gameplay context.' },
  { id: 'inventory', name: 'Inventory item is not working', advice: 'Confirm the item name and definition in ox_inventory, then check the delivered installation snippet and any required item-use integration.' },
  { id: 'ui', name: 'Menu or interface will not open', advice: 'Check the client console for errors, UI files, permissions and required integrations. Check input focus if a menu opens but cannot be used.' },
  { id: 'saving', name: 'Progress, changes or rewards not saving', advice: 'Review server console errors and the delivered instructions for persistence and framework requirements. Avoid running unverified SQL migrations.' },
  { id: 'other', name: 'Something else', advice: 'Record how to reproduce the problem, the expected behavior and the first relevant redacted error message.' }
]
function resetFlow() {
  product.value = ''
  issue.value = ''
  description.value = ''
  framework.value = ''
  copied.value = false
  customerContact.value = ''
  ticketResult.value = ''
  submitError.value = ''
  challengeToken.value = ''
}
function chooseTopic(id: Topic) {
  topic.value = id
  resetFlow()
}
function supportSummary() {
  return [
    'ToneCustoms support request',
    'Script: ' + (products.find(p => p.id === product.value)?.name || 'Not selected'),
    'Help needed: ' + (topic.value === 'install' ? 'Installation' : 'Troubleshooting'),
    'Issue: ' + (issues.find(i => i.id === issue.value)?.name || 'Not selected'),
    'Framework: ' + (framework.value || 'Not specified'),
    'Description: ' + (description.value.trim() || 'Not provided')
  ].join('\n')
}
async function copySummary() {
  try {
    await navigator.clipboard.writeText(supportSummary())
    copied.value = true
  } catch {
    copied.value = false
  }
}

const topics: { id: Topic; icon: string; label: string }[] = [
  { id: 'install', icon: '⚙', label: 'Install a script' },
  { id: 'broken', icon: '🛠', label: 'My script is not working' },
  { id: 'purchase', icon: '🛒', label: 'Purchases & delivery' },
  { id: 'custom', icon: '✦', label: 'Custom development' },
  { id: 'bug', icon: '✎', label: 'Report a documentation issue' },
  { id: 'contact', icon: '◉', label: 'Talk to support' }
]
const guidance: Record<Topic, { title: string; text: string; links: { label: string; href: string; external?: boolean }[] }> = {
  install: {
    title: 'Installing a ToneCustoms script',
    text: 'Start with the installation hub, then follow the guide for your specific resource. Check its required framework and dependencies before making changes.',
    links: [
      { label: 'Installation hub', href: '/INSTALLATION' },
      { label: 'Customer checklist', href: '/CUSTOMER_CHECKLIST' },
      { label: 'Ask on Discord', href: 'https://discord.gg/JdZ7NTG5KF', external: true }
    ]
  },
  broken: {
    title: 'Let’s troubleshoot your script',
    text: 'Use our troubleshooting guides for startup errors, inventory items, missing interactions, database issues and UI problems. Keep credentials and private source files out of public messages.',
    links: [
      { label: 'Troubleshooting center', href: '/TROUBLESHOOTING' },
      { label: 'Product guides', href: '/products/' },
      { label: 'Contact technical support', href: 'https://discord.gg/JdZ7NTG5KF', external: true }
    ]
  },
  purchase: {
    title: 'Purchases, delivery & access',
    text: 'Check the order confirmation and the delivery instructions for your specific product. For billing disputes, missing entitlements or refund cases, use the original Tebex order-support channel.',
    links: [
      { label: 'Purchase & delivery guide', href: '/PURCHASE_AND_DELIVERY' },
      { label: 'Customer policies', href: '/policies/' },
      { label: 'Official store', href: 'https://tonecustoms.tebex.store/', external: true }
    ]
  },
  custom: {
    title: 'Discuss a custom FiveM project',
    text: 'Tell us what players or server staff should be able to do, your framework, dependencies and the essential gameplay features. Availability and terms are confirmed individually.',
    links: [
      { label: 'Custom development guide', href: '/CUSTOM_DEVELOPMENT' },
      { label: 'Contact ToneCustoms', href: 'https://discord.gg/JdZ7NTG5KF', external: true }
    ]
  },
  bug: {
    title: 'Improve our documentation',
    text: 'Report broken links, incorrect instructions or missing information using our documentation feedback forms. For actual script errors, use technical support instead.',
    links: [
      { label: 'Documentation feedback', href: 'https://github.com/ToneCustoms/tonecustoms-docs/issues/new/choose', external: true },
      { label: 'Technical troubleshooting', href: '/TROUBLESHOOTING' }
    ]
  },
  contact: {
    title: 'Contact ToneCustoms support',
    text: 'For resource setup and technical questions, join the official Discord. For billing and order disputes, reply through your existing Tebex order-support thread.',
    links: [
      { label: 'Join Discord support', href: 'https://discord.gg/JdZ7NTG5KF', external: true },
      { label: 'Support information', href: '/SUPPORT' },
      { label: 'Frequently asked questions', href: '/FAQ' }
    ]
  }
}
function open() {
  isOpen.value = true
  topic.value = null
  resetFlow()
  nextTick(() => dialog.value?.focus())
}
function close() {
  isOpen.value = false
  topic.value = null
  resetFlow()
  nextTick(() => trigger.value?.focus())
}
function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isOpen.value) close()
}
function urlFor(link: { href: string; external?: boolean }) {
  return link.external ? link.href : withBase(link.href)
}
onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => window.removeEventListener('keydown', handleKeydown))
</script>

<template>
  <div class="tc-assistant">
    <section v-if="isOpen" ref="dialog" class="tc-assistant-panel" role="dialog" aria-label="ToneCustoms support assistant" aria-modal="false" tabindex="-1">
      <header class="tc-assistant-header">
        <div class="tc-assistant-avatar" aria-hidden="true">TC</div>
        <div class="tc-assistant-heading">
          <strong>ToneCustoms Support</strong>
          <span>Interactive help center</span>
        </div>
        <button class="tc-assistant-close" type="button" aria-label="Close support assistant" @click="close">×</button>
      </header>
      <div class="tc-assistant-content">
        <template v-if="!topic">
          <p class="tc-assistant-greeting">Welcome to ToneCustoms.</p>
          <p class="tc-assistant-intro">What do you need help with today?</p>
          <div class="tc-assistant-options">
            <button v-for="item in topics" :key="item.id" type="button" class="tc-assistant-option" @click="chooseTopic(item.id)">
              <span class="tc-assistant-option-icon" aria-hidden="true">{{ item.icon }}</span>
              <span>{{ item.label }}</span>
              <span class="tc-assistant-chevron" aria-hidden="true">›</span>
            </button>
          </div>
        </template>
        <template v-else-if="topic === 'install' || topic === 'broken'">
          <button class="tc-assistant-back" type="button" @click="topic = null; resetFlow()">← All help topics</button>
          <h2 class="tc-assistant-topic-title">{{ topic === 'install' ? 'Let’s install your script' : 'Let’s troubleshoot your script' }}</h2>
          <p class="tc-assistant-topic-copy">Choose your script and issue to see relevant checks. You can also prepare a support message.</p>
          <label class="tc-assistant-field-label" for="tc-product">1. Which script?</label>
          <select id="tc-product" v-model="product" class="tc-assistant-field" @change="issue = ''; copied = false">
            <option value="" disabled>Select your script</option>
            <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }}</option>
          </select>
          <template v-if="product">
            <label class="tc-assistant-field-label" for="tc-issue">2. What is happening?</label>
            <select id="tc-issue" v-model="issue" class="tc-assistant-field" @change="copied = false">
              <option value="" disabled>Select the closest issue</option>
              <option v-for="i in issues" :key="i.id" :value="i.id">{{ i.name }}</option>
            </select>
            <template v-if="issue">
              <div class="tc-assistant-tip">
                <strong>First checks</strong>
                <p>{{ issues.find(i => i.id === issue)?.advice }}</p>
                <p v-if="product === 'gunjam' && issue === 'interaction'">Gun Jam: the default jam-clearing key is J, and the supported weapon must be jammed.</p>
                <p v-if="product === 'gunjam' && issue === 'inventory'">Gun Jam: use the delivered cleaning kit ox_inventory item-definition snippet.</p>
                <p v-if="product === 'family' && issue === 'interaction'">Family System: check family rank and management permissions.</p>
                <p v-if="product === 'window' && issue === 'ui'">Window Cleaning: check mouse input and focus during the cleaning interaction.</p>
              </div>
              <div class="tc-assistant-links">
                <a :href="withBase(products.find(p => p.id === product)?.troubleshooting || '/TROUBLESHOOTING')" @click="close()">Product troubleshooting guide <span aria-hidden="true">↗</span></a>
                <a :href="withBase(products.find(p => p.id === product)?.installation || '/INSTALLATION')" @click="close()">Installation guide <span aria-hidden="true">↗</span></a>
              </div>
              <label class="tc-assistant-field-label" for="tc-framework">3. Framework (optional)</label>
              <select id="tc-framework" v-model="framework" class="tc-assistant-field" @change="copied = false">
                <option value="">Not sure / other</option>
                <option value="Qbox">Qbox</option>
                <option value="QBCore">QBCore</option>
                <option value="ESX">ESX</option>
              </select>
              <label class="tc-assistant-field-label" for="tc-description">4. Describe your issue (optional)</label>
              <textarea id="tc-description" v-model="description" class="tc-assistant-field tc-assistant-textarea" maxlength="1200" rows="3" placeholder="What happened? What did you expect? Any redacted error?" @input="copied = false"></textarea>
              <p class="tc-assistant-privacy">Do not include passwords, tokens, license keys, payment information or private source files.</p>
              <button class="tc-assistant-copy" type="button" @click="copySummary">{{ copied ? '✓ Support summary copied' : 'Copy support summary' }}</button>
              <p class="tc-assistant-privacy">Nothing is sent automatically when you copy a summary. Share it privately with support.</p>
              <template v-if="ticketEnabled">
                <div class="tc-assistant-ticket">
                  <strong>Submit a private support ticket</strong>
                  <p>Creates a private GitHub support issue and alerts ToneCustoms staff on Discord.</p>
                  <label class="tc-assistant-field-label" for="tc-contact">How can staff contact you?</label>
                  <input id="tc-contact" v-model="customerContact" class="tc-assistant-field" maxlength="120" placeholder="Discord username or email" autocomplete="off" />
                  <div ref="challengeEl" class="tc-assistant-challenge"></div>
                  <p v-if="submitError" class="tc-assistant-error" role="alert">{{ submitError }}</p>
                  <p v-if="ticketResult" class="tc-assistant-success" role="status">Ticket submitted! Your reference: <strong>{{ ticketResult }}</strong>. Keep this reference for follow-up.</p>
                  <button v-if="!ticketResult" class="tc-assistant-copy" type="button" :disabled="submitting" @click="submitTicket">{{ submitting ? 'Submitting…' : 'Submit private ticket' }}</button>
                </div>
              </template>
              <p v-else class="tc-assistant-privacy">Private ticket submission is being configured. For now, copy your summary and contact support on Discord.</p>
              <div class="tc-assistant-links">
                <a href="https://discord.gg/JdZ7NTG5KF" target="_blank" rel="noopener noreferrer">Open ToneCustoms Discord <span aria-hidden="true">↗</span></a>
              </div>
            </template>
          </template>
        </template>
        <template v-else>
          <button class="tc-assistant-back" type="button" @click="topic = null">← All help topics</button>
          <h2 class="tc-assistant-topic-title">{{ guidance[topic].title }}</h2>
          <p class="tc-assistant-topic-copy">{{ guidance[topic].text }}</p>
          <div class="tc-assistant-links">
            <a v-for="link in guidance[topic].links" :key="link.href" :href="urlFor(link)" :target="link.external ? '_blank' : undefined" :rel="link.external ? 'noopener noreferrer' : undefined" @click="!link.external && close()">
              {{ link.label }} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </template>
      </div>
      <footer class="tc-assistant-footer">
        <span>Built for Roleplay. Made with Purpose.</span>
        <span class="tc-assistant-note">Guided help · Not live chat</span>
      </footer>
    </section>
    <button ref="trigger" class="tc-assistant-trigger" type="button" :aria-expanded="isOpen" aria-label="Open ToneCustoms support assistant" @click="isOpen ? close() : open()">
      <svg v-if="!isOpen" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11.5a8.5 8.5 0 0 1-8.5 8.5 8.8 8.8 0 0 1-3.7-.8L3 21l1.3-4.6a8.5 8.5 0 1 1 15.7-4.9Z"/><path d="M8 11.5h8M8 15h5"/></svg>
      <span v-else aria-hidden="true" class="tc-assistant-x">×</span>
      <span class="tc-assistant-trigger-label">{{ isOpen ? 'Close help' : 'Need help?' }}</span>
    </button>
  </div>
</template>
