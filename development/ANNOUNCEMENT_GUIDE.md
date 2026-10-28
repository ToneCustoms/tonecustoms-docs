# ToneCustoms — Announcement Publishing Guide

This guide is for authorized ToneCustoms maintainers publishing announcements on the public documentation site.

## Publish in GitHub

1. Open [ANNOUNCEMENTS.md](../ANNOUNCEMENTS.md) in the `ToneCustoms/tonecustoms-docs` repository.
2. Use GitHub's **Edit this file** action, or submit a pull request if review is needed.
3. Add a new row at the **top** of the Latest Announcements table with the actual publication date, category and short announcement.
4. For longer news, add a heading below the table with date, category, details and official links.
5. Commit the change. The existing GitHub Pages workflow is configured to build and publish changes to Markdown on `main`, subject to its checks and GitHub Pages configuration.
6. Check the live [announcement page](https://tonecustoms.github.io/tonecustoms-docs/ANNOUNCEMENTS) after deployment.

## Recommended announcement format

```md
## YYYY-MM-DD — Announcement title

**Category:** Release / Update / Preview / Giveaway / Community / Support / Partnership

Brief description of the verified announcement.

**Details:** What changed, who it affects and any important eligibility or timing.

**Official links:** [Product or relevant page](https://example.com)

**Status:** Published / Preview / Scheduled (choose accurately)
```

## Publication checklist

- [ ] ToneCustoms has approved this announcement.
- [ ] Date, title, links and claims are accurate.
- [ ] For a **release**, actual customer availability and any version number are verified.
- [ ] For a **giveaway**, entry requirements, eligibility, selection method, closing date and applicable platform rules are defined before publication.
- [ ] For a **partnership**, both parties have approved public use of names, logos and claims.
- [ ] No confidential agreements, customer records, credentials, private code or order details are disclosed.
- [ ] The notice does not promise a support SLA, future update schedule or product feature without approval.
- [ ] The website page is checked after publication.

## Keep announcements distinct

- **Announcements:** Public business news, launches, events and notices.
- **Product changelogs:** Technical changes for an actually released script.
- **Documentation changelog:** Changes to the website and guides.
- **GitHub Issues:** Support tickets, suggestions and public partnership intake—not the official announcement feed.

For urgent corrections, update the original announcement with a clear correction note rather than silently changing important claims.
