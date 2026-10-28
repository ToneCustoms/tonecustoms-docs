# ToneCustoms Analytics & Business Insights

**A practical measurement plan for ToneCustoms customer experience, releases and business growth.**

> **Current status:** This page defines metrics and reporting destinations. It does not claim that visitor tracking, sales integrations, automated reporting or a live dashboard are already active.

## What to measure

| Area | Key measures | Source / access |
| --- | --- | --- |
| Website | Visits, popular pages, referrers, product-page engagement | Privacy-conscious site analytics provider, after configuration |
| Products | Product-page interest, showcase link clicks, store outbound clicks | Site events; not equivalent to purchases |
| Sales | Orders, revenue, refunds, products sold | Private Tebex transaction records; never publish customer details |
| Support | Open tickets, time to first human response, resolution time, reopened tickets, common issue categories | GitHub Issues and timestamps |
| Releases | Released versions, time since update, documented fixes, known issues | Approved product changelogs |
| Community | Feature requests, approved suggestions, announcement activity | GitHub Issues and approved public posts |
| YouTube | Views, watch time, subscribers and showcase traffic | YouTube Studio; distinguish platform traffic from store sales |

## Recommended dashboard

- **Owner overview:** Sales and order trends, support backlog, new releases and website interest.
- **Customer experience:** New vs. resolved tickets, median first response, median resolution time and recurring problems.
- **Product performance:** Product-page views, Tebex outbound clicks, verified purchases and update adoption where measurable.
- **Content performance:** YouTube showcase performance and traffic referred to documentation or Tebex.

## Metric definitions

- **Open support tickets:** Public issues not closed at the reporting cutoff; exclude non-support categories for the support-specific backlog.
- **First human response:** Time between ticket creation and the first actual ToneCustoms team reply; automated welcome messages do not count.
- **Resolution time:** Time from ticket creation to closure; report reopened issues separately.
- **Store click-through rate:** Tracked store-link clicks divided by tracked product-page sessions; requires consent and accurate event instrumentation.
- **Sales conversion:** Verified orders divided by eligible store sessions; cannot be inferred from documentation outbound clicks alone.
- **Release frequency:** Count of approved published script versions, not Git commits or documentation edits.

## Privacy and operational rules

- Keep revenue, orders, refund details and customer identifiers in **owner-only reporting**, never public documentation.
- Avoid collecting license keys, payment details, IP addresses or private ticket contents in website analytics.
- Choose analytics with appropriate consent, retention and privacy disclosures before adding tracking code.
- Use aggregate reporting and mark missing data as unavailable rather than zero.
- Do not describe tracking as active until the provider is configured and events have been validated.

## Implementation checklist

- [ ] Select and configure a privacy-conscious website analytics provider.
- [ ] Verify page-view and outbound-click tracking on the live website.
- [ ] Establish a private Tebex sales reporting connection or export.
- [ ] Establish a GitHub support metrics collection workflow.
- [ ] Create a private owner dashboard using real source data.
- [ ] Validate metrics and document refresh cadence.
- [ ] Update privacy disclosures to reflect actual data collection.

[Customer Journey](CUSTOMER_JOURNEY.md) · [Script Updates](SCRIPT_UPDATES.md) · [Support Dashboard](SUPPORT_DASHBOARD.md) · [Privacy Draft](policies/PRIVACY.md)
