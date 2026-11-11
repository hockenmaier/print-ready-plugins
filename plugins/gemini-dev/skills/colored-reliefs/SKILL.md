---
name: colored-reliefs
description: Use Print Ready for printable artwork that fits a flat, limited-palette image. Signs, nameplates, birthday and milestone placards, logos, badges, magnets, coasters, ornaments, line art and shallow raised decoration. Use this skill when the request implies this workflow, even if the user never mentions reliefs, color swaps or 3MF.
---

# Colored reliefs

Choose a relief when the design reads from the front and a few flat colors can describe the shapes. For an object with measured mating features, model those features with the Print Ready skill and use this workflow for the artwork if needed.

1. Use the requested size or choose a reasonable width in millimetres. Start with four colors including the base. Use fewer when the artwork needs fewer. If the user specifies more supported filaments or asks for additional manual changes, use that count within the tool limit. Pick a contrasting base and put the colors that need the most visual emphasis higher. Handle color order and layer planning for the user.
2. For new artwork, call the host's image generator. Prompt for straight-on, flat artwork, hard edges, solid fills and the chosen palette. Include exact lettering, shapes and spacing. Ask for clean, broad details that will survive at print size. Exclude perspective, gradients, shading, texture and mockup backgrounds. For artwork with a cutout outline, ask for transparent space outside the shape. Use suitable supplied artwork directly. Send only the image intended to become the print face. Reference photos may inform an image-generation prompt.
3. Check the Print Ready connection with `get_capabilities`. Call `prepare_model` and keep its credentials. Submit the generated or supplied PNG to `create_colored_relief` with the ordered palette, width, and the user-facing brief and design decisions. Prefer a host file input when the host can pass the image. Otherwise use an exported HTTPS URL or PNG data URL. If the host cannot export a generated image, ask the user to attach its PNG. Keep the same environment and preparation on retry. The combined call flattens the palette, traces the outlines, builds the height bands, and packages the print files.
4. Poll `get_model` and inspect the real top and isometric previews. Check legibility, color separation, letter holes and continuity around thin lines. Use a new preparation and `previous_model` for a revision. For difficult artwork, call `refine_artwork` to inspect the flattened PNG, then `trace_artwork` for the SVG and contour JSON. Pass an authorized stage handle as `artwork` to continue. Use the combined call for ordinary requests.
5. Call `show_model` for the ready relief. Deliver the 3MF for printing in color. The model response reports the planned filament order and change heights. Explain manual changes only when they apply. State the planned count as such unless the exact file was sliced with the target settings.

## How to keep swaps low

Use one continuous Z band per color. The base starts on the bed and supports every region. Each higher band contains its own visible regions and the footprints of every band above it. At each transition only the material for the new band is needed. This gives four colors three planned changes, with the first material already loaded. Apply one print profile to the whole relief. The defaults are a 0.20 mm first and regular layer, eight base layers, and four layers per raised color. Honor a supplied printer profile's first and regular layer heights. Each band should contain enough layers to print reliably and hide the filament beneath it.

Use the Bambu Studio format for slot assignments when that slicer is the target. Use standard 3MF with material colors when the slicer is unknown or the user requests it. Both formats use the slicer's printer profile. Set the band heights for that profile and tell the user the matching layer height when it matters. Keep the base and bands together in one object. Create unrelated pieces such as separate milestone tokens as their own objects.

For a design that needs colors at the same height, or parts the user needs to scale independently, use `create_3mf` with named model handles and material colors. Provide a shared `object` name for bodies that need to keep their registration. The independent 3MF tool also works with ordinary CAD models.
