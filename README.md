# Print Ready plugins

Print Ready gives AI assistants tools to design useful 3D-printable parts, inspect actual OpenSCAD previews and deliver STL files. This repository contains distributed plugin files. The hosted service and its implementation are maintained separately.

## Claude development test

The current package is [Print Ready Dev](plugins/claude-dev/README.md), version 0.7.27. It connects to `https://dev.printreadyparts.com/mcp`. It is for development testing, not the production Claude directory listing.

See [tomorrow's test checklist](docs/claude-testing.md) and [release requirements](docs/distribution.md). A successful package check is not evidence that the actual Claude viewer or account flow works. The production Claude package and directory listing are pending.

The [ChatGPT plugin](https://chatgpt.com/plugins/plugin_asdk_app_6ad4196fb960819189edf1264310ddf7) is already published. Visit [Print Ready](https://printreadyparts.com) for examples, [support](https://printreadyparts.com/support), [privacy](https://printreadyparts.com/privacy) and [service terms](https://printreadyparts.com/terms).

## Maintainers

Use Node.js 24. No dependency installation is needed.

```sh
node scripts/validate.mjs
node scripts/package.mjs
```

Plugin files use the [proprietary license](LICENSE). Public availability does not grant general redistribution rights.
