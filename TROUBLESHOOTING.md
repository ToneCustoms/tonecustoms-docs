# ToneCustoms Troubleshooting Center

**Find the right fix faster.** This guide covers common FiveM resource installation and integration problems. Product-specific instructions take priority over general examples.

## Choose your issue

| Symptom | First place to check |
| --- | --- |
| Resource does not start | [Startup and dependencies](#resource-will-not-start) |
| Script starts but interactions do not appear | [Interactions and targeting](#interactions-are-missing) |
| Inventory items do not work | [Inventory integration](#items-or-inventory-actions-do-not-work) |
| Interface is blank, stuck, or unresponsive | [NUI problems](#ui-is-blank-stuck-or-unresponsive) |
| Data does not save or load | [Database problems](#database-errors-or-missing-saved-data) |
| Access or permissions fail | [Permission problems](#access-or-permission-errors) |
| Script worked before an update | [Update issues](#issues-after-an-update) |

## Resource will not start

1. Confirm the resource folder contains its `fxmanifest.lua` in the expected location.
2. Compare the actual dependency names and versions with the **specific product installation guide**.
3. Review the first relevant error in the server console, not only later cascading errors.
4. Confirm dependency start order where the product documentation requires it.
5. Check for incomplete files or syntax errors after manual configuration edits.

Do not rename resources or change their dependencies without checking the product's documented requirements.

## Interactions are missing

- Confirm the resource is running without startup errors.
- Check that any required targeting library, such as `ox_target`, is installed and started **if that product uses it**.
- Verify any documented interaction location, distance, and required conditions.
- Check whether the player needs a specific state, job, item, or permission.
- Review both client and server errors; a successful server startup does not guarantee that every client interaction loaded.

## Items or inventory actions do not work

- Follow the **product-specific** inventory integration instructions; not every script uses the same item definitions.
- Confirm item names match exactly between the resource and the inventory configuration.
- Verify any required item images and metadata only where applicable.
- Check that the inventory system is supported by the particular product.
- Review relevant server and client errors before changing item definitions.

Never replace an entire inventory items file with a small installation snippet; integrate only the entries required by the product.

## UI is blank, stuck, or unresponsive

- Check the resource's UI files and manifest references against the supplied package.
- Review client errors and the FiveM NUI developer console where applicable.
- Confirm the required UI callback and script dependencies are available.
- If the issue began after editing a file, compare the changed configuration with the original package.
- Report the exact action that triggers the issue.

## Database errors or missing saved data

- Verify that the product actually requires a database and that its documented database dependency is available.
- Check whether the provided SQL setup steps were completed for the correct database.
- Read the exact table or column name in the error rather than creating guessed schema changes.
- Back up data before applying migrations or changing existing tables.
- Do not post database passwords or connection strings publicly.

## Access or permission errors

- Check the product's documented permissions, framework roles, ACE configuration, or integration requirements, **as applicable**.
- Confirm the expected user, group, or server state.
- Avoid granting broad admin permissions just to bypass an error.
- Include a redacted error and the relevant intended permission behavior when asking for help.

## Issues after an update

- Review the [Update Guide](UPDATE_GUIDE.md) and the product's release history.
- Compare dependencies and any migration instructions with the version you installed.
- Preserve permitted configuration values and backups.
- Report both the previous and new versions **if known**.
- Do not assume that every internal commit is a customer release.

## Product-specific support

| Resource | Troubleshooting |
| --- | --- |
| Gun Jam | [Gun Jam Troubleshooting](products/gun-jam-troubleshooting.md) |
| Family System | [Family System Troubleshooting](products/family-system-troubleshooting.md) |
| Window Cleaning | [Window Cleaning Troubleshooting](products/window-cleaning-troubleshooting.md) |

Other resources may still be in development and may not have a public troubleshooting guide.

## Need more help?

Use [ToneCustoms Discord](https://discord.gg/JdZ7NTG5KF) for product installation and technical support. Include:

- Resource name and purchased version, if known
- FiveM framework and relevant dependencies
- The exact steps to reproduce the issue
- Expected and actual behavior
- Relevant **redacted** client/server error messages
- What you've already tried

For order access, billing, and refund cases, use the **original Tebex order-support route**. For documentation mistakes, [open a documentation issue](https://github.com/ToneCustoms/tonecustoms-docs/issues/new/choose).

**Never share** passwords, server access, license keys, order identifiers, private code, or personal/payment details in public.

[Start Here](START_HERE.md) · [Installation Hub](INSTALLATION.md) · [Support](SUPPORT.md) · [FAQ](FAQ.md)

---

**ToneCustoms — Built for Roleplay. Made with Purpose.**
