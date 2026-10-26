---
title: ToneCustoms Gun Jam
description: FiveM weapon jamming and maintenance with a fixed ten-shot cycle, metadata tracking and manual jam clearing.
---

# ToneCustoms Gun Jam

**FIVEM · WEAPON INTERACTIONS · OX_INVENTORY**

**Make every shot count.**

Bring another layer of interaction to FiveM firearm gameplay. ToneCustoms Gun Jam adds a **fixed ten-shot jamming cycle**, weapon-specific state tracking, manual clearing, and maintenance for supported firearms.

**Store listing at last review:** $14.99 · [Official ToneCustoms Packages](https://tonecustoms.tebex.store/category/3419336)  
*Confirm current price, availability and checkout terms on Tebex.*

[View on Tebex](https://tonecustoms.tebex.store/category/3419336) · [Watch Demo](https://youtu.be/kPniOo-VThw) · [Installation Guide](gun-jam-installation.md) · [Join Discord Support](https://discord.gg/JdZ7NTG5KF)

## Product at a glance

| Detail | Information |
| --- | --- |
| Product classification | Store-listed FiveM resource |
| Main gameplay | Weapon jamming, manual clearing, maintenance |
| Documented integration | ox_inventory and ox_lib |
| Video | [Watch Gun Jam demonstration](https://youtu.be/kPniOo-VThw) |
| Getting started | [Installation](gun-jam-installation.md) · [Troubleshooting](gun-jam-troubleshooting.md) |
| Purchasing | [Official ToneCustoms packages](https://tonecustoms.tebex.store/category/3419336); confirm current availability and terms |

*The feature descriptions below document the referenced build; this page does not independently confirm current shop pricing or compatibility with every server setup.*

## What players experience

| Feature | Documented behavior |
| --- | --- |
| Fixed jam cycle | Supported firearms jam after every 10 shots in the documented build |
| Weapon-specific tracking | ox_inventory metadata retains each weapon's shot and jam state |
| Manual clearing | Clear jams with the default **J** binding and configured clearing animations |
| Gun Cleaning Kit | Inventory maintenance item supported by the resource |
| Add-on weapon support | Compatible registered custom firearms can be configured, subject to exclusions |
| Adjustable settings | Designated `config.lua` controls supported options, keys, animations and messages |

## Built around weapon interaction

**For players:** Jamming and clearing create a repeatable weapon-handling mechanic rather than an automatic reset when switching weapons.

**For server owners:** Configurable firearm support, interactions and inventory metadata integration let you tailor the experience to your city's gameplay.

## Compatibility and setup

The documented implementation uses **ox_lib** and **ox_inventory**, and targets Qbox, QBCore and ESX environments with the required inventory integration. Compatibility with a particular add-on firearm depends on its registration and configuration.

The included `install/ox_inventory_items.txt` is an **item-definition snippet**, not a standalone Lua resource. Follow the installation guide to add `gun_cleaning_kit` to the existing item definitions.

## Demonstration

[Watch the ToneCustoms Gun Jam gameplay demonstration on YouTube](https://youtu.be/kPniOo-VThw).

The demonstration illustrates gameplay; the delivered build, supported configuration and store checkout establish the customer product.

## Documentation and customer support

| Need | Resource |
| --- | --- |
| Install and configure | [Installation & Configuration](gun-jam-installation.md) |
| Resolve issues | [Troubleshooting Guide](gun-jam-troubleshooting.md) |
| Review published changes | [Release History](gun-jam-changelog.md) |
| Understand delivery | [Purchase & Delivery](../PURCHASE_AND_DELIVERY.md) |
| Review terms | [Customer Policy Center](../policies/README.md) |
| Ask for support | [ToneCustoms Discord](https://discord.gg/JdZ7NTG5KF) |

Only designated configuration files may be modified unless otherwise authorized. Support for installation and configuration is available without a separate support charge. Updates are free when released, without a fixed schedule. Actual checkout terms and applicable law govern purchases.

---

**Explore ToneCustoms Gun Jam:** [Shop Packages](https://tonecustoms.tebex.store/category/3419336) · [Browse all scripts](README.md) · [Subscribe on YouTube](https://www.youtube.com/@tonyiswavy12)

**Explore more ToneCustoms scripts:** [Family System](family-system.md) · [Window Cleaning](window-cleaning.md) · [Full Product Catalog](README.md)

*ToneCustoms — Built for Roleplay. Made with Purpose.*
