# Updating a ToneCustoms Script

Use this guide **only alongside the official update instructions for the specific product**. File layouts, configuration behavior and database steps vary by resource.

## Product release histories

| Product | Release information |
| --- | --- |
| Gun Jam | [Gun Jam release history](products/gun-jam-changelog.md) |
| Family System | [Family System release history](products/family-system-changelog.md) |
| Window Cleaning | [Window Cleaning release history](products/window-cleaning-changelog.md) |

Use the release history for **your specific product**, together with the instructions supplied with its delivered update. Showcase projects without a verified release do not have an approved customer update path here.

## Before updating

1. Confirm a new customer-facing release is actually published in the official delivery channel.
2. Read the product's [release history](products/gun-jam-changelog.md) or accompanying release notes, including any breaking changes.
3. Back up your **current purchased resource configuration** and other affected files/data that you are authorized to maintain.
4. Record the currently installed version if known and any values you changed in designated config files.
5. Check whether the new build changes requirements such as framework, inventory or other dependencies.

## Installing an approved update

1. Obtain the update from the **authorized distribution channel** associated with your original purchase.
2. Follow the exact package-specific replacement, escrow and startup instructions.
3. Carry forward allowed configuration values only where the updated config supports them; avoid blindly copying old files over new defaults.
4. If release notes identify SQL changes or migrations, follow those instructions and preserve appropriate backups first.
5. Restart affected resources using the product's documented dependency order.
6. Review logs and check the resource's expected behavior.

**Do not** modify protected Lua/NUI files or attempt to bypass distribution or escrow protections.

## If something stops working

- Compare the updated configuration with the new documented settings.
- Confirm all required dependencies are installed and have compatible versions.
- Look for the earliest relevant redacted client/server console error.
- Consult the product's troubleshooting page.
- Ask for help in [ToneCustoms Discord](https://discord.gg/JdZ7NTG5KF), supplying the product and versions, expected behavior and error details.

When necessary, use your verified backups and the official product guidance to restore a prior working setup. Do not assume an older version remains available through every distribution method.

## Free updates

ToneCustoms' documented business approach is to provide **released updates** to purchased scripts without an added update charge, subject to applicable terms. ToneCustoms decides whether and when an update is released; there is **no guaranteed cadence**.

[Updates Policy](policies/UPDATES.md) · [Installation](INSTALLATION.md) · [Support](SUPPORT.md) · [Home](README.md)
