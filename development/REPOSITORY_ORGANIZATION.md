# ToneCustoms Repository Organization

This guide explains how ToneCustoms separates public information from protected FiveM development. It is a repository naming and maintenance standard, **not a list of promised releases**.

## Current verified setup (October 25, 2026)

- **Public documentation:** [tonecustoms-docs](https://github.com/tonyiswavy/tonecustoms-docs) — installation, products, support and policies.
- **Public profile:** [tonyiswavy](https://github.com/tonyiswavy/tonyiswavy) — official developer portfolio and community links.
- **Public project:** [ToneCustoms-Shell-Studio](https://github.com/tonyiswavy/ToneCustoms-Shell-Studio) — public project information.
- **Public update metadata:** [tonecustoms-prop-generator-updates](https://github.com/tonyiswavy/tonecustoms-prop-generator-updates) — updater manifest, **not** an all-products changelog.
- **Private script source:** [tonecustoms_gunjam](https://github.com/tonyiswavy/tonecustoms_gunjam) — protected Gun Jam development.
- Other private tools, scripts and experiments remain private. Do not publish their contents or internal plans as part of this public guide.

## When to create a repository

| Purpose | Recommendation | Visibility |
| --- | --- | --- |
| New paid FiveM resource | A separate repository per maintained product, **when development starts** | Private |
| Free script deliberately offered to the public | Publish a repository when code, instructions and license are ready | Public |
| Product install guides / customer support | Use the existing `tonecustoms-docs` repository | Public |
| Product-specific release history | Keep in its existing product documentation or release notes | Public |
| Prop Generator updater manifest | Continue using the existing updates repository | Public |
| Brand profile and community destinations | Maintain the existing profile README | Public |
| Experimental code, credentials, assets and unreleased work | Keep restricted; do not place in public repositories | Private |

**Do not create a second support, documentation, changelog or portfolio repository unless the existing one becomes demonstrably insufficient.**

## Public repository presentation audit (October 25, 2026)

Every public repository should have a meaningful **About** description, relevant topics and a README that states its actual status. These metadata fields appear alongside GitHub repositories and are separate from README content.

| Public repository | About description to use | Suggested topics |
| --- | --- | --- |
| [tonyiswavy](https://github.com/tonyiswavy/tonyiswavy) | ToneCustoms — FiveM development, custom scripts, roleplay systems and official project links. | `fivem`, `tonecustoms`, `lua`, `roleplay` |
| [ToneCustoms-Shell-Studio](https://github.com/tonyiswavy/ToneCustoms-Shell-Studio) | Planning and development showcase for a proposed FiveM interior shell creation studio; no public application release yet. | `fivem`, `gta5`, `3d-modeling`, `development` |
| [tonecustoms-prop-generator-updates](https://github.com/tonyiswavy/tonecustoms-prop-generator-updates) | Public update manifest for ToneCustoms Prop Generator; contains metadata, not application source. | `fivem`, `updates`, `release-metadata`, `tonecustoms` |
| [tonecustoms-docs](https://github.com/tonyiswavy/tonecustoms-docs) | Existing description and topics are already set. | Retain existing relevant topics |

**Metadata still to set:** At this review the first three repositories did not have an About description or topics. The connected GitHub actions can edit README files but cannot change repository About metadata or rename repositories. The table is a ready-to-use set of descriptions and topics, **not a claim those GitHub settings were changed**.

### Naming and visibility decisions

- Preserve existing repository names and clone URLs unless a specific rename has been approved and dependencies or external links have been checked.
- Keep private development, internal tools and bots private. A consistent public brand does not require exposing private source.
- Where legacy names differ from the `tonecustoms_` naming standard, document the discrepancy and plan any future rename separately rather than risking breaking integrations.
- Never create extra repositories simply to make the account look more active.

## Suggested naming for future repositories

- Protected resource: `tonecustoms_<resource>` — for example, the existing `tonecustoms_gunjam`.
- New public free resource (only after approved for publication): `tonecustoms_<resource>`.
- Distinguish visibility in GitHub's repository settings, not by relying on a `-private` or `-free` name suffix.

Naming examples are patterns only: they do **not** imply the example repository exists or that a resource is available.

## GitHub Projects workflow

The existing [ToneCustoms Development Board](https://github.com/users/tonyiswavy/projects/7) is the primary place to track work. Keep its existing, FiveM-specific statuses rather than replacing them with a generic board template.

| Existing board status | Meaning |
| --- | --- |
| **Planned** | Resource or task is inventoried but has not started |
| **Development** | Active implementation |
| **Testing** | Gameplay, integration or documentation checks are underway |
| **Needs Fixes** | Issues found during review or testing |
| **Verified Working** | Functionality confirmed working, but not necessarily released |
| **Released** | Owner-approved official release |

**Board snapshot (October 25, 2026):** Nine items in Planned and one in Released (Gun Jam); the other columns are empty. This is a point-in-time inventory, not a claim that all planned resources are unfinished.

### Working rules

1. Keep existing linked GitHub issues as the source of truth; avoid duplicate project cards.
2. Move a card only when its status genuinely changes, not just to populate columns.
3. Treat **Verified Working** and **Released** as distinct milestones. A tested script is not automatically a public or paid release.
4. Use issue labels or optional project fields for Priority, Type and Repository if those are useful. Never assign artificial deadlines or release versions.
5. Keep sensitive technical details in private repositories. Do not expose protected code, customer information or credentials in public documentation.
6. Maintain a separate Release view only if it improves navigation; the current Development Board already shows the full workflow.

**Access note:** This document records the existing board workflow; editing Project fields, views and card status requires GitHub Projects controls, which are not exposed through the current connected GitHub actions.

## Minimum checklist for each script repository

1. Clear description, product scope, owner, and supported FiveM dependencies.
2. README with install steps, configuration references, compatibility, and support destination.
3. Version and changelog tied to verified releases, not automatic version bumps.
4. License/distribution guidance appropriate to the actual product.
5. Issue templates for actionable defects and feature requests when collaboration warrants them.
6. No API tokens, Discord bot credentials, license keys, purchased third-party assets, or customer information committed to Git.
7. For paid source: confirm **Private** visibility and access permissions before pushing code.
8. Add demo videos and official store links to the **public docs**, without exposing protected source.

## Official public destinations

- [Documentation](https://tonyiswavy.github.io/tonecustoms-docs/)
- [YouTube — subscribe](https://www.youtube.com/@tonyiswavy12)
- [Discord — join](https://discord.gg/JdZ7NTG5KF)
- [GitHub profile](https://github.com/tonyiswavy)
- [Tebex store](https://tonecustoms.tebex.store/)

**Principle:** Release only what is ready and approved. More repositories alone do not mean more finished products.
