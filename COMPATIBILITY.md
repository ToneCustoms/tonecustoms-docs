# FiveM Framework & Dependency Compatibility

**Compatibility is product-specific.** This guide explains common requirements; it does not promise that every ToneCustoms resource works with every framework or every version.

## Frameworks and common integrations

| Technology | Role | Important detail |
| --- | --- | --- |
| Qbox | Server framework | Compatibility must be stated on each product page |
| QBCore | Server framework | Resource behavior depends on the supported integration |
| ESX | Server framework | Compatibility must be stated on each product page |
| ox_lib | UI, callbacks and helper functions | Some products require it to start |
| ox_inventory | Inventory, items and weapon metadata | Required by Gun Jam as documented |
| ox_target | In-world interaction targets | Required only by products that explicitly use it |
| oxmysql | Database integration | Required only by products that explicitly use it |

These dependencies serve different functions. Supporting Qbox, QBCore or ESX **does not imply** compatibility with every inventory, target, appearance, or database resource.

## Confirmed documentation by product

| Product | Documented environments | Product requirements |
| --- | --- | --- |
| [ToneCustoms Gun Jam](products/gun-jam.md) | Designed for Qbox, QBCore and ESX environments using ox_inventory | FiveM, `ox_lib`, `ox_inventory`; firearm registration/filter rules apply |
| Other showcased resources | Consult their own pages | Do not assume requirements before publication |

## Before purchasing or installing

1. Identify the exact framework and its version on your server.
2. Confirm the inventory, targeting and database resources you are actually using.
3. Check the product listing and documentation for required dependencies.
4. Check the product's known limitations and integration notes.
5. If support for your setup is unclear, ask [ToneCustoms Discord](https://discord.gg/JdZ7NTG5KF) before purchasing.

## Compatibility questions for support

```text
Product:
Framework and version:
Inventory and version:
Target system (if relevant):
Other integration/dependency:
Question or error:
```

Do not share credentials or protected resource source files in public reports.

[Installation Hub](INSTALLATION.md) · [Products](products/README.md) · [Support](SUPPORT.md) · [Home](README.md)
