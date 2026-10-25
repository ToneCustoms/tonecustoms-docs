# ToneCustoms Private Resource Repository Checklist

**Use for new resources only.** Do not overwrite or silently restructure an existing paid script, modify its original configuration, or change any deployed resource just to match a template.

## Recommended private repository layout

```text
tonecustoms_<resource>/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug-report.yml
│   │   ├── feature-request.yml
│   │   └── release-candidate.yml
│   ├── workflows/
│   │   └── resource-quality.yml
│   └── pull_request_template.md
├── resource/
│   └── tonecustoms_<resource>/
│       ├── fxmanifest.lua
│       ├── config.lua
│       ├── client/
│       ├── server/
│       └── shared/
├── DEVELOPMENT.md
├── README.md
└── RELEASE_NOTES_TEMPLATE.md
```

Only add folders that the new resource actually needs. Inventory items, SQL migrations, NUI assets or exports must be documented per product; do not assume every resource uses them.

## Required controls

- [ ] Repository visibility confirmed **private** before committing any source
- [ ] Owner identified and access limited to authorized collaborators
- [ ] Resource name uses `tonecustoms_` where appropriate
- [ ] Exact framework and dependency requirements recorded
- [ ] Config changes limited to intentional user-editable settings
- [ ] No license keys, webhook URLs, payment details or database credentials committed
- [ ] Lua syntax checks in GitHub Actions (non-runtime check)
- [ ] Gameplay acceptance criteria documented for in-game testing
- [ ] Owner-controlled versioning and customer release approval
- [ ] Public product guide contains only approved customer-facing information
- [ ] Customer delivery occurs through approved Tebex / Cfx.re method, not public GitHub source

## Release note headings

**Added · Changed · Fixed · Compatibility · Upgrade Steps · Known Issues**

## Merge protection

GitHub repository **Settings → Rules → Rulesets** can require a passing quality check or approved review before merging. Availability and enforcement depend on the account, plan, and repository settings. A workflow existing does **not** itself enforce these restrictions.

[Development Workflow](README.md) · [Release Workflow](../RELEASING.md)
