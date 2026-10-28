# ToneCustoms Support Intake Backend (setup required)

This is a **Cloudflare Worker** for the ToneCustoms documentation site's customer support assistant. It is **not deployed or connected yet**. It accepts verified customer support requests, creates **private GitHub Issues**, and sends staff notifications to Discord.

## Architecture

Customer → website support assistant → Cloudflare Turnstile → Cloudflare Worker → private GitHub Issues + Discord webhook.

- GitHub Pages is static; it cannot safely store GitHub credentials or Discord webhook URLs.
- All customer details are stored in a **private repository**, never the public documentation repository.
- The Discord message contains the private issue URL only, not the customer's contact information or description.
- Customers get a ticket reference (e.g., TC-123) but **not** a private GitHub issue URL they cannot open.
- The GitHub issue is assigned to the ToneCustoms owner account (`tonyiswavy`) for GitHub notifications.
- This is guided troubleshooting plus ticket intake; it is **not yet an AI conversational model**. No AI API is configured.

## Required owner setup

1. Create a dedicated **private GitHub repository**, such as `ToneCustoms/tonecustoms-support`, and enable Issues. Do not use the public docs repository for tickets.
2. Create a narrowly scoped GitHub fine-grained access token with access **only** to that private repository and **Issues: Read and write** and **Metadata: Read** permissions. Store it as a Worker secret, not in GitHub Pages or code.
3. Create a Discord webhook in your private staff/support channel. Store its URL as a Worker secret.
4. Create a Cloudflare Turnstile widget for `tonecustoms.github.io` and keep the **secret key** in the Worker. The **site key** is safe to use in the browser.
5. Deploy `worker.ts` as a Cloudflare Worker. Configure the environment variables and secrets below. Configure a Cloudflare **rate limiting binding** named `SUPPORT_RATE_LIMIT` (for example, 5 requests per minute per IP).
6. Configure the frontend endpoint and Turnstile site key in `../.vitepress/theme/support-config.ts`. Do not enable the ticket submit button until the Worker endpoint is deployed and tested.

### Worker configuration

| Variable / binding | Type | Purpose |
| --- | --- | --- |
| `GITHUB_TOKEN` | Secret | Fine-grained GitHub token, Issues write on the private support repository |
| `GITHUB_PRIVATE_REPO` | Environment variable | `ToneCustoms/tonecustoms-support` or the actual private support repo |
| `DISCORD_WEBHOOK_URL` | Secret | Private staff channel webhook |
| `TURNSTILE_SECRET` | Secret | Cloudflare Turnstile server-side verification |
| `ALLOWED_ORIGIN` | Environment variable | `https://tonecustoms.github.io` |
| `SUPPORT_RATE_LIMIT` | Cloudflare rate limiting binding | Prevent excessive submissions; fail closed if missing |

Use a Worker config such as:

```toml
name = "tonecustoms-support"
main = "worker.ts"
compatibility_date = "2026-10-01"

[vars]
GITHUB_PRIVATE_REPO = "ToneCustoms/tonecustoms-support"
ALLOWED_ORIGIN = "https://tonecustoms.github.io"

[[ratelimits]]
name = "SUPPORT_RATE_LIMIT"
namespace_id = "1001"
simple = { limit = 5, period = 60 }
```

Configure the secrets using Cloudflare's secure secret manager. **Never paste secret values into this repository, a public GitHub Issue, or a support chat.** The sample `namespace_id` is illustrative; use a unique identifier for this rate limiting namespace.

## Behavior and safeguards

- Only accepts JSON POST to `/ticket` from the configured website origin.
- Requires a successful Turnstile challenge with the expected hostname.
- Enforces field lengths and a per-IP rate limit.
- Verifies that the configured GitHub destination is private and has Issues enabled.
- Never returns the private GitHub issue URL to customers.
- Returns `201` with a ticket reference on successful issue creation.
- The Discord alert is best effort; if it fails, the GitHub issue still exists and the customer receives their ticket reference.
- The browser should not claim success unless the Worker returns `201`.
- Keep customer records in accordance with your support retention and privacy practices; don't collect payment details, credentials, or private source code.

## Next stage

After credentials, repository, and Worker deployment are ready, enable the frontend integration and verify end-to-end ticket creation, GitHub notification, and Discord alert with a non-sensitive test ticket. Customer status lookup and AI-generated replies are **not** included in this initial backend.
