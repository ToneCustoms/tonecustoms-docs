# ToneCustoms — Documentation & Product Release Workflow

The public documentation repository is separate from ToneCustoms' **private paid-script source repositories**.

## Documentation workflow

1. Create a focused change to a public guide or website styling.
2. Open a pull request for review when practical. GitHub runs quality checks on pull requests.
3. Confirm the checks pass: Markdown links, sensitive-content guard, VitePress build and generated-page checks.
4. Review feature claims, links, screenshots, license language and public availability.
5. Merge an approved change into `main`. Only `main` pushes trigger the website deployment workflow.
6. Inspect the GitHub Actions deployment result and spot-check important live pages.

The deployment workflow also runs its own quality checks **before** uploading the built website. GitHub branch protections/rulesets are separate repository settings; checks running on a PR alone do not make them required for merging.

## Product release procedure

1. Keep private source development and release approval in the relevant private script repository.
2. Confirm the build and any migrations or dependencies with the owner.
3. Assign an approved version **only for an actual product release**.
4. Record verified feature changes, limitations and upgrade instructions in the product's release-history document.
5. Confirm official delivery and current Tebex listing details before marking the resource available.
6. Update the public product page and installation/troubleshooting guides without publishing private source or customer data.
7. Publish to customers through the approved distribution channel, never the public documentation repository.

## Version and changelog rules

- Documentation revisions are **not** FiveM script version increments.
- Do not infer customer release dates or version numbers from internal commits or Cfx.re upload attempts.
- List released changes only when the customer-facing version and its delivery have been confirmed.
- Use consistent release-note headings: **Added**, **Changed**, **Fixed**, **Compatibility**, **Upgrade steps**, **Known issues**.
- Released updates are free to purchasers when ToneCustoms chooses to publish them; no cadence is guaranteed.

## Security boundaries

- Never add paid Lua source, Cfx.re escrow packages, credentials, webhook URLs, database dumps or purchaser records here.
- Ask for private order verification through private support channels, not public GitHub issues.
- The automatic safety scanner detects some obvious exposures, but maintainers must still review changes manually.

[Product Catalog](products/index.md) · [Documentation Changelog](DOCUMENTATION_CHANGELOG.md) · [Contributing](CONTRIBUTING.md) · [Support](SUPPORT.md)
