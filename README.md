# Print Ready plugins

Design useful 3D-printable parts with actual OpenSCAD previews, editable SCAD and STL downloads. These installation packages connect to the hosted Print Ready service. The service implementation is maintained separately.

## Gemini CLI

Run in your terminal:

```sh
gemini extensions install https://github.com/hockenmaier/print-ready-plugins
gemini
```

Restart an existing Gemini session after installation. Read the [first-time Gemini guide](docs/gemini-testing.md) for Google sign-in, gallery discovery and an actual part test. The root extension connects to production. Installation, gallery listing and real-host acceptance are separate checks. Gemini CLI can use actual previews and download links when it does not display an interactive viewer.

## Claude Code

Run these commands in your terminal:

```sh
claude plugin marketplace add hockenmaier/print-ready-plugins
claude plugin install print-ready@print-ready
```

The [production Claude package](plugins/claude/README.md) connects to production. For dev testing, install `print-ready-dev@print-ready`. The [Claude test guide](docs/claude-testing.md) records the separate host checks. Independent repository installation does not establish an official Claude directory listing.

## Releases and maintainers

Production packages use `https://api.printreadyparts.com/mcp`. Development packages use `https://dev.printreadyparts.com/mcp`. The generated [production receipt](releases/plugins-prod.json) and [development receipt](releases/plugins-dev.json), when present, record their own source versions, commits and file hashes. They can differ. Shared skills are imported from immutable verified service bundles, with explicit host compatibility additions. Do not edit generated skills here.

Validate with Node.js 24:

```sh
node scripts/validate.mjs
node scripts/package.mjs
```

See [release requirements](docs/distribution.md). Plugin files use the [proprietary license](LICENSE). Public availability does not grant general redistribution rights.

[ChatGPT plugin](https://chatgpt.com/plugins/plugin_asdk_app_6ad4196fb960819189edf1264310ddf7) · [Examples](https://printreadyparts.com/welcome) · [Support](https://printreadyparts.com/support) · [Privacy](https://printreadyparts.com/privacy) · [Terms](https://printreadyparts.com/terms)
