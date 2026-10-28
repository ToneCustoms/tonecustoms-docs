# ToneCustoms — Support Dashboard

**Staff workspace · GitHub Issues**

Use the links below to manage incoming support without another service. These are **live filtered GitHub Issue views**, not a separate hosted dashboard or GitHub Projects board.

## Ticket queue

| Queue | GitHub view |
| --- | --- |
| All open requests | [Open tickets](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+is%3Aopen) |
| New / awaiting review | [New tickets](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+is%3Aopen+label%3A%22status%3A+new%22) |
| Investigating | [In progress](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+is%3Aopen+label%3A%22status%3A+investigating%22) |
| Waiting on customer | [Customer reply needed](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+is%3Aopen+label%3A%22status%3A+waiting-on-customer%22) |
| Closed tickets | [Resolved/closed history](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+is%3Aclosed) |
| Technical support | [Script support requests](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+label%3Asupport) |
| Documentation | [Documentation reports](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+label%3Adocumentation) |
| Suggestions | [Feature requests](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+label%3Aenhancement) |

## Status workflow

**New → Investigating → Waiting on Customer (if needed) → Resolved**

- **New:** Incoming issues receive the `status: new` label automatically from the ToneCustoms Support Triage GitHub Action.
- **Investigating:** Staff replace the status with `status: investigating` when reviewing a report.
- **Waiting on Customer:** Staff replace the status with `status: waiting-on-customer` if logs or additional information are needed.
- **Resolved:** Close the issue after confirming the outcome. GitHub Actions automatically replaces the status label with `status: resolved`.
- **Reopened:** Reopening a ticket automatically resets its status to `status: new` without posting a duplicate welcome message.

**Important:** GitHub issue labels are not mutually exclusive. When changing a status, remove the old `status:` label so the ticket appears in the correct filtered view. Status labels are provisioned by the triage workflow when the first new issue is opened.

## Team ownership

Assign an issue to the responsible GitHub team member through the **Assignees** sidebar. No staff member is automatically assigned without an explicit team decision.

## Handling common cases

1. Check for an existing issue before investigating a new report.
2. Keep troubleshooting replies in the original issue for an auditable support history.
3. Ask for a redacted console error, reproduction steps, and resource version if needed.
4. Link the appropriate [Known Issues & Fixes](./KNOWN_ISSUES) entry when a confirmed fix exists.
5. Close resolved cases with a concise explanation so future customers can find the answer.

## Security and customer privacy

Issues are **public**. Never ask customers to post license keys, order details, protected source code, tokens, database credentials, or personal information. Direct billing and order-verification questions to the customer's original private Tebex order-support thread.

[Support Center](./SUPPORT) · [Known Issues](./KNOWN_ISSUES) · [Troubleshooting](./TROUBLESHOOTING)
