# ToneCustoms Gun Jam — Installation & Configuration Guide

**FiveM resource:** `tonecustoms_gunjam`  
**Required:** `ox_lib` and `ox_inventory`  
**Support:** [ToneCustoms Discord](https://discord.gg/JdZ7NTG5KF)

This guide supports customers who receive the official ToneCustoms Gun Jam resource. It does **not** contain or distribute private source code.

## Install

1. Download the purchased Gun Jam resource from the authorized delivery channel and place the **`tonecustoms_gunjam`** folder in your FiveM server's resources directory.
2. Open `install/ox_inventory_items.txt` in the delivered package. This text file contains an entry for `gun_cleaning_kit`.
3. Copy the **item entry only** into the existing item table in `ox_inventory/data/items.lua`. If the item already exists, adjust that entry rather than adding a duplicate. Do not paste another `return` statement.
4. Reload or restart `ox_inventory` as appropriate for your installation so it reads the item definition.
5. Ensure dependencies start first. In your server configuration, use this order if it is not already configured:

```cfg
ensure ox_lib
ensure ox_inventory
ensure tonecustoms_gunjam
```

6. Make the `gun_cleaning_kit` available through your own supported inventory shops, crafting or administration system if you want players to use the cleaning feature.

**Important:** `ox_inventory_items.txt` is a **copy-and-paste installation snippet**, not a runnable Lua resource. Do not rename it to `.lua` or start it as a separate resource.

## How it works

- The supplied Gun Jam source tracks shot counts for supported guns using weapon metadata.
- The default implemented jam cycle is **10 shots per jam**.
- Press **J** (default configurable binding) to clear a jam; the counter then begins a new cycle.
- Use `gun_cleaning_kit` with a supported equipped firearm to perform weapon maintenance.
- Compatible weapons include the configured list and supported registered addon firearms, depending on ox_inventory registration and exclusions.

## What buyers may configure

The supplied `config.lua` is the intended customer customization file.

| Setting | Purpose |
| --- | --- |
| `Config.Enabled`, `Config.Debug` | Enable the mechanic or diagnostics |
| `Config.ClearKey` | Default key to clear a jam |
| `Config.CleaningItem` | Item name for maintenance |
| `Config.CleaningDuration` | Cleaning duration |
| `Config.CleaningRemovesDirt` | Fouling reduction |
| `Config.CleaningRestoresDurability` | Limited durability recovery |
| `Config.CleaningMaxDurability` | Maximum cleaning recovery |
| `Config.Weapons`, `Config.Categories` | Weapon classifications and mappings |
| `Config.Malfunctions` | Malfunction names and clearing durations |
| `Config.ClearAnimation`, `Config.CleaningAnimation` | Animation selection |
| `Config.Text` | Notification and action text |

**Build note:** The original config still includes chance/probability fields from an earlier approach; the supplied shared implementation uses a **fixed 10-shot default**, not those probability values, to determine jams. Do not assume those old chance options change the actual cycle.

Customers may edit **designated configuration files only**. Editing core Lua implementation or protected resources requires authorization.

## Troubleshooting

For a step-by-step diagnosis, use the **[dedicated Gun Jam Troubleshooting Guide](gun-jam-troubleshooting.md)**.


| Problem | What to check |
| --- | --- |
| Resource does not start | Folder name, `fxmanifest.lua`, dependencies and startup order |
| Cleaning kit not available | Item registration, duplicates and ox_inventory reload |
| Kit doesn't trigger | Item export setting and equipped supported firearm |
| Particular gun is unaffected | Weapon registration and supported/excluded weapon rules |
| Clear key doesn't work | FiveM key bindings and current jam state |
| Animation differs | Configured animation settings and custom weapon compatibility |

For assistance, contact [ToneCustoms Discord](https://discord.gg/JdZ7NTG5KF). Include the relevant error, environment and already-tried steps, without exposing passwords or purchase credentials.

## Learn more

- [Gun Jam Product Overview](gun-jam.md)
- [Troubleshooting Guide](gun-jam-troubleshooting.md)
- [Release History](gun-jam-changelog.md)
- [Video Demonstration](https://youtu.be/kPniOo-VThw)
- [Official ToneCustoms Store](https://tonecustoms.tebex.store/)
- [Licensing and Support Information](../policies/README.md)

[← Product Catalog](README.md)
