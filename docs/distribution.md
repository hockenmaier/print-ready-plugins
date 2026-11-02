# Distribution specification

This repository contains installation files for Claude and Gemini CLI. The hosted service, infrastructure, credentials, customer data and private release reports remain in the private product repository. Shared skill files and service menus are generated from immutable verified service bundles. Host additions are authored there too. Do not edit generated skills here.

## Package layout

The root `gemini-extension.json`, `GEMINI.md`, `skills/`, `assets/icon.png` and `LICENSE` form the production Gemini extension. `plugins/claude` is the production Claude plugin. Development variants live in `plugins/claude-dev` and `plugins/gemini-dev`. The root `.claude-plugin/marketplace.json` lists both Claude identities. Production is `print-ready`; development is `print-ready-dev`.

Production packages connect to `https://api.printreadyparts.com/mcp`. Dev packages connect to `https://dev.printreadyparts.com/mcp`. Production and dev may have different source versions. Generated receipts in `releases/plugins-prod.json` and `releases/plugins-dev.json` record the source SHA, environment, package version, source skill hashes, exported file hashes and proprietary license hash. The older `releases/claude-dev.json` remains the legacy dev receipt until the first combined dev import.

Only approved skill/reference paths, host manifests, host context, the icon, README files, LICENSE and sanitized release receipts may be generated. Reject unsafe paths, symlinks, extra installation files, credential patterns, signed URLs and hash mismatches. Keep imported file bytes unchanged across operating systems.

## Publication

The private owner console publishes exact immutable sources. It verifies that the selected service is live and that its menu matches the immutable bundle. Production publication requires the same source to be verified in production. It may wait for an already running deployment of that source. Publishing never deploys a service or selects website content.

The publisher pushes a `codex/publish-plugins-<environment>-<request ID>` branch with the expected public base commit and owner request receipt. Public CI validates file hashes, inventory and packaged ZIPs and opens a PR using its existing repository-local token. The private publisher checks those exact-head results, verifies the public base is unchanged, merges with its existing repository-scoped key and removes the generated branch. Automatic dev synchronization instead uses `codex/generated-plugins-dev-<source SHA>`, validates and opens a review PR. It does not update production packages or merge automatically.

The private repository uses a deploy key scoped to this public repository. The public workflow has only its repository-local temporary token. It receives no AWS credentials or private-source read access. Maintainer changes use short-lived branches and reviewed PRs. Preserve Brian's proprietary license and third-party notices.

## Validate and install

Use Node.js 24:

```sh
node scripts/validate.mjs
node scripts/package.mjs
```

ZIP inspection checks actual archive entries and bytes. Claude's official CLI validates each Claude manifest. Gemini CLI installs directly from the repository. See [Gemini testing](gemini-testing.md) and [Claude testing](claude-testing.md) for actual host checks. A validated ZIP or gallery listing does not prove rendering, sign-in or viewer delivery.

Gemini's gallery discovers public GitHub repositories with topic `gemini-cli-extension` and a valid root `gemini-extension.json`. Its documented crawler runs daily. Keep direct installation available whether or not indexing has completed. Publishing this repository does not submit to Claude's official directory or change the existing ChatGPT listing.
