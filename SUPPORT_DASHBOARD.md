# ToneCustoms — Support Dashboard

**Staff workspace · GitHub Issues**

Use the links below to manage incoming support without another service. These are **live filtered GitHub Issue views**, not a separate hosted dashboard or GitHub Projects board.

## Ticket queue

| Queue | GitHub view |
| --- | --- |
| High priority | [Urgent tickets](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+is%3Aopen+label%3A%22priority%3A+high%22) |
| Normal priority | [Standard tickets](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+is%3Aopen+label%3A%22priority%3A+normal%22) |
| Unassigned | [Unassigned tickets](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+is%3Aopen+no%3Aassignee) |
| All open requests | [Open tickets](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+is%3Aopen) |
| New / awaiting review | [New tickets](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+is%3Aopen+label%3A%22status%3A+new%22) |
| Investigating | [In progress](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+is%3Aopen+label%3A%22status%3A+investigating%22) |
| Waiting on customer | [Customer reply needed](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+is%3Aopen+label%3A%22status%3A+waiting-on-customer%22) |
| Closed tickets | [Resolved/closed history](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+is%3Aclosed) |
| Technical support | [Script support requests](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+label%3Asupport) |
| Documentation | [Documentation reports](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+label%3Adocumentation) |
| Partnership inquiries | [Partnership proposals](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+label%3Apartnership) |
| Suggestions | [Feature requests](https://github.com/ToneCustoms/tonecustoms-docs/issues?q=is%3Aissue+label%3Aenhancement) |

Partnership inquiries are public, non-confidential summaries. Staff should move sensitive negotiations to an appropriate private channel and record only non-sensitive status updates on the issue.

## Status workflow

**New → Investigating → Waiting on Customer (if needed) → Resolved**

- **New:** Incoming issues receive the `status: new` label automatically from the ToneCustoms Support Triage GitHub Action.
- **Investigating:** Assigning a new issue automatically changes `status: new` to `status: investigating`. Staff can also update status manually.
- **Waiting on Customer:** Staff replace the status with `status: waiting-on-customer` if logs or additional information are needed.
- **Resolved:** Close the issue after confirming the outcome. GitHub Actions automatically replaces the status label with `status: resolved`.
- **Reopened:** Reopening a ticket automatically resets its status to `status: new` without posting a duplicate welcome message.

**Important:** GitHub issue labels are not mutually exclusive. When changing a status, remove the old `status:` label so the ticket appears in the correct filtered view. Status and priority labels are provisioned by the triage workflow when the first new issue is opened after the updated workflow is active.

## Team ownership

Assign an issue to the responsible GitHub team member through the **Assignees** sidebar. No staff member is automatically assigned without an explicit team decision. New issues default to `priority: normal`; staff may change to `priority: high` or `priority: low` after assessing actual customer impact. These labels do not guarantee response time.

## Verified support roles and public introductions

When a GitHub user is assigned to an issue, the support workflow posts a public ownership comment showing their GitHub username and support identity. This makes it clear who is responsible for the ticket.

| Support identity | Verification |
| --- | --- |
| ToneCustoms Founder | `tonyiswavy` is configured as the official Founder |
| ToneCustoms Support | Add the approved GitHub username to the workflow's `verifiedRoles` mapping |
| ToneCustoms Developer | Add the approved GitHub username to the same mapping |
| Community Helper | Can help in public replies but must not be described as official staff unless approved |

The workflow uses a **trusted username allowlist**, not self-declared role names. Assignment alone does not establish staff identity. Do not add anyone to this list until the Founder approves their role. This identifies staff in the issue comment; it does not create custom GitHub badges or grant repository permissions.

**Assignment:** GitHub posts a role-aware ownership introduction and moves a new ticket to Investigating.

**Unassignment:** If the last handler is removed, the workflow posts an unassigned notice and resets an Investigating ticket to New.

**Staff handoff:** Assign the next handler and remove the previous handler; the issue history preserves both changes.

**Important:** This workflow is committed but assignment and unassignment events still need a live verification run.

## Handling common cases

1. Check for an existing issue before investigating a new report.
2. Keep troubleshooting replies in the original issue for an auditable support history.
3. Ask for a redacted console error, reproduction steps, and resource version if needed.
4. Link the appropriate [Known Issues & Fixes](./KNOWN_ISSUES) entry when a confirmed fix exists.
5. Close resolved cases with a concise explanation so future customers can find the answer.

## Security and customer privacy

Issues are **public**. Never ask customers to post license keys, order details, protected source code, tokens, database credentials, or personal information. Direct billing and order-verification questions to the customer's original private Tebex order-support thread.

[Support Center](./SUPPORT) · [Known Issues](./KNOWN_ISSUES) · [Troubleshooting](./TROUBLESHOOTING)
