# ToneCustoms Gun Jam — Troubleshooting

**Resource:** `tonecustoms_gunjam`  
**Customer support:** [ToneCustoms Discord](https://discord.gg/JdZ7NTG5KF)

This guide helps diagnose common setup and gameplay issues with purchased copies of ToneCustoms Gun Jam. Follow the steps relevant to your setup; avoid changing protected source code.

## Start here

1. Confirm the folder is named `tonecustoms_gunjam` and includes `fxmanifest.lua`.
2. Check that `ox_lib` and `ox_inventory` are installed and start before Gun Jam.
3. Check the server console for the **first relevant error**, not only the last error in the log.
4. Identify your framework (Qbox, QBCore, or ESX) and the weapon being tested.
5. Verify that the resource and dependencies are running before diagnosing weapon behavior.

## Common issues

### Resource fails to start

**Symptoms:** Console errors, missing dependency, or the resource not showing as started.

- Confirm your `server.cfg` starts the required dependencies before `tonecustoms_gunjam`.
- Confirm the resource folder has the correct name and has not been nested inside an extra folder when extracting.
- Read any startup errors and identify whether they come from Gun Jam, `ox_lib`, or `ox_inventory`.

The basic startup order is:

```cfg
ensure ox_lib
ensure ox_inventory
ensure tonecustoms_gunjam
```

### Gun Cleaning Kit is missing

**Symptoms:** The item is not recognized by ox_inventory.

- Open the delivered `install/ox_inventory_items.txt`.
- Add its **item entry**, not the whole file as a runnable Lua script, to your existing `ox_inventory/data/items.lua` table.
- Check for an existing item with the same name to avoid duplicates.
- Reload or restart the inventory/resource stack according to your server setup.
- Confirm the item name matches the designated cleaning item in the product config.

### Cleaning Kit appears but does nothing

- Equip a supported firearm before using the item.
- Check the cleaning item's configured ox_inventory integration/export in the supplied installation snippet.
- Confirm the item definition was loaded.
- Check redacted client and server console logs for errors.

### Weapon never jams

- Make sure the script is enabled in its designated configuration.
- Confirm the test weapon is registered correctly with ox_inventory.
- Check the product's supported/excluded weapon rules; not all weapon types participate.
- Test the expected **fixed 10-shot cycle** with a supported firearm, starting with a known cleared state.

**Note:** Some older configuration fields mention chance/probability, but the documented implementation follows the fixed 10-shot rule. Do not tune chance settings expecting them to override it.

### Pressing J does not clear a jam

- Check the key mapping in your FiveM settings; the default clear key is **J**.
- Make sure the equipped supported weapon is **currently jammed**.
- Check for conflicting keybinds and any relevant game/client errors.
- Review the configured clearing animation and duration if the action starts but appears interrupted.

### Add-on firearm is not affected

- Confirm the custom firearm is registered in ox_inventory.
- Check the resource's weapon-category and exclusion configuration.
- Compare behavior with a known supported firearm before assuming the add-on is compatible.

## Submit a support request

For assistance, [join the official ToneCustoms Discord](https://discord.gg/JdZ7NTG5KF) and include:

```text
Product: ToneCustoms Gun Jam
Framework:
ox_inventory version (if known):
Gun Jam resource version (if known):
Weapon name:
Expected behavior:
Actual behavior:
Relevant error message (redacted):
Steps already tried:
```

Do **not** post account credentials, private source, license information, purchase receipts with payment details, or server access information publicly.

## Related documentation

[Product Overview](gun-jam.md) · [Installation & Configuration](gun-jam-installation.md) · [Release History](gun-jam-changelog.md) · [Customer Support](../SUPPORT.md) · [Product Catalog](README.md)
