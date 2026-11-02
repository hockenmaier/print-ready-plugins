---
name: bosl2-cheatsheet
description: Use the pinned BOSL2 library in Print Ready for chamfers, rounding, anchors, attachments, sweeps, screw threads, gears, hinges and snap joints. Consult its linked reference when choosing includes or debugging BOSL2 geometry.
---

# BOSL2 modeling reference

Read the [practical BOSL2 reference](references/bosl2-basics.md). It covers the library included in Print Ready, required include files, positioning, boolean tags, mechanical examples and upstream documentation links.

Call `get_capabilities` to confirm the installed version. Print Ready currently pins BOSL2 2.0.766 at commit `e173fa0ae45f9e2082e0d8c0382dae98621b7c20`. The upstream wiki changes independently, so check the pinned implementation when a newer example uses unfamiliar arguments. Prefer named arguments. Compile and inspect real geometry before claiming a mechanism works; physical fit still requires the user's printer and measurements.

MCP-only clients can call `get_bosl2_cheatsheet` for this skill and its reference. This read does not render a model or open the welcome guide.
