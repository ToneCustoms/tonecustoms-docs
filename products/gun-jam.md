# ToneCustoms Gun Jam

**FiveM firearm interaction system** · **Listed on ToneCustoms Tebex**

**[Shop Packages](https://tonecustoms.tebex.store/category/3419336)** · **[Watch Demonstration](https://youtu.be/kPniOo-VThw)** · **[Get Support](https://discord.gg/JdZ7NTG5KF)**

## Overview

**ToneCustoms Gun Jam** adds weapon jamming and manual clearing to supported FiveM firearms. The documented build uses a **fixed 10-shot jam cycle** tracked per weapon through ox_inventory metadata, with clearing interactions and gun-cleaning-kit maintenance.

## Features

| Feature | Behavior |
| --- | --- |
| Fixed jam cycle | Supported firearm jams after 10 shots in the documented implementation |
| Weapon tracking | Shot/jam state is associated with the individual weapon through ox_inventory metadata |
| Manual jam clearing | Default **J** key binding, with configurable actions and animations |
| Gun Cleaning Kit | Inventory item supports maintenance interactions |
| Supported custom firearms | Configured and compatible registered add-on guns can participate; exclusions apply |
| Configuration | Designated `config.lua` controls supported options, keys, animations and text |

**Compatibility:** FiveM with `ox_lib` and `ox_inventory`, designed for Qbox, QBCore and ESX server environments using the required inventory integration. Your actual firearm registration and server setup may affect behavior.

## Customer documentation

| Need | Guide |
| --- | --- |
| **Set up the resource** | [Installation & Configuration](gun-jam-installation.md) |
| **Fix a problem** | [Gun Jam Troubleshooting](gun-jam-troubleshooting.md) |
| **Track published changes** | [Release History](gun-jam-changelog.md) |
| **Understand purchases and updates** | [Customer Policy Center](../policies/README.md) |
| **Contact the developer** | [ToneCustoms Discord](https://discord.gg/JdZ7NTG5KF) |

## Getting started

1. Obtain the official resource via your authorized purchase/delivery method.
2. Follow the [installation guide](gun-jam-installation.md) to install dependencies and register `gun_cleaning_kit`.
3. Review only the designated configuration files.
4. Use the [troubleshooting guide](gun-jam-troubleshooting.md) if you encounter problems.

The `install/ox_inventory_items.txt` supplied with the resource is an **item-definition snippet**, not a standalone script. It is added to the existing ox_inventory item table as described in the setup guide.

## Demo and availability

**[Watch the official Gun Jam demonstration on YouTube](https://youtu.be/kPniOo-VThw)**

The resource has been listed at **$14.99**, but price and availability may change. [Browse the official Packages category on ToneCustoms Tebex](https://tonecustoms.tebex.store/category/3419336). The direct product URL has not been confirmed here; the link intentionally leads to the known store category.

**Purchase terms:** Customers may modify designated configuration files only unless otherwise authorized; actual checkout terms and applicable laws govern purchases. Customer installation support is available without a separate charge, and released updates are free without a promised release cadence.

---

[← All Products](README.md) · [Installation Hub](../INSTALLATION.md) · [Documentation Home](../README.md)
