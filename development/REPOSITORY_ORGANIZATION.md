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

## Suggested naming for future repositories

- Protected resource: `tonecustoms_<resource>` — for example, the existing `tonecustoms_gunjam`.
- New public free resource (only after approved for publication): `tonecustoms_<resource>`.
- Distinguish visibility in GitHub's repository settings, not by relying on a `-private` or `-free` name suffix.

Naming examples are patterns only: they do **not** imply the example repository exists or that a resource is available.

## GitHub Projects workflow

Use the existing GitHub Project to coordinate work across repositories instead of creating a separate project for each script. A project item represents a deliverable or issue; the repository stores the actual code or documentation.

| Status | Meaning | Exit condition |
| --- | --- | --- |
| Backlog | Approved idea or task awaiting prioritization | Selected for work |
| Ready | Scope, owner and next action are clear | Development begins |
| In Progress | Work is actively being implemented or documented | Ready for review |
| Review | Changes, installation guidance and dependencies are checked | Accepted or returned for fixes |
| Done | Deliverable completed with relevant issue or documentation updated | Final state |

**Suggested project fields:** Status, Priority (High / Medium / Low), Type (Script / Bug / Docs / Release), and Repository. Add target dates only when a real deadline exists; don't create fake launch dates.

### Recommended working views

- **Board:** Group by Status to see current work and blockers.
- **Backlog:** Filter to Backlog and Ready, sorted by priority.
- **Releases:** Filter to Release type to track preparation, store information and documentation together.

### Keep the project useful

1. Create an item when there is a clear next action, not simply because a resource might exist someday.
2. Link an existing GitHub issue or pull request where one exists; don't create duplicates.
3. Keep unreleased or sensitive details in private repositories or private project items.
4. When an item is Done, update public documentation only for owner-approved features and releases.
5. Review stale In Progress items periodically, without treating idle development as a missed deadline.

**Access note:** A public documentation guide cannot change GitHub Project board settings. Configure project fields and views in GitHub Projects itself.

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
