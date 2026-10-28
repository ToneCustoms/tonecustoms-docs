# ToneCustoms — Community Publishing Guide

Use this guide to publish announcements and developer insights **directly in GitHub** without needing another website service.

## Post an announcement

1. Open [ANNOUNCEMENTS.md](../ANNOUNCEMENTS.md) in the public docs repository.
2. Click the GitHub edit pencil (or create a pull request if review is required).
3. Add a dated row at the top of the Latest Announcements table.
4. Add a detailed dated section if needed; include accurate dates, official links and any eligibility rules.
5. Commit to `main`. The existing documentation deployment workflow is configured to publish Markdown changes after its checks pass.
6. Confirm the new post appears on the [Announcements page](https://tonecustoms.github.io/tonecustoms-docs/ANNOUNCEMENTS).

## Post a developer insight

1. Open [INSIGHTS.md](../INSIGHTS.md).
2. Add the new dated post under **Insights feed**, newest first.
3. Use the format below and remove the “No developer insight posts” placeholder after the first post.
4. Commit and check the live [Insights page](https://tonecustoms.github.io/tonecustoms-docs/INSIGHTS).

```md
### YYYY-MM-DD — Post title

**Status:** Concept / In development / Preview / Released

**Inside the build:** What the team is working on or exploring.

**Why it matters:** The gameplay or community benefit.

**Community question:** What feedback would be useful?

**Links:** [Relevant public demo or guide](https://example.com)
```

## Publishing rules

- Confirm the post is approved and accurate before publishing.
- Do not invent script versions, release dates, giveaways, special membership perks or partnerships.
- For a giveaway, publish the actual eligibility, entry method, end date, selection process and platform rules before accepting entries.
- Use [Announcements](../ANNOUNCEMENTS.md) for official releases and notices; use [Insights](../INSIGHTS.md) for previews and behind-the-scenes notes.
- Link to [Discord](https://discord.gg/JdZ7NTG5KF) for community conversation and to [GitHub feature requests](https://github.com/ToneCustoms/tonecustoms-docs/issues/new?template=feature-request.yml) for structured ideas.
- Never post credentials, paid source code, private customer records or confidential business terms.

**Capabilities:** These pages are public and editable by authorized GitHub repository contributors. They do not automatically cross-post to Discord, enable GitHub Discussions, or create member-only access.
