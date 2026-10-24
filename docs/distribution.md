# Distribution specification

## Scope

Keep one neutral public repository for distributable Print Ready packages. The hosted MCP service, shared authored language and deployment system stay in the private product source. This repository contains no server implementation or customer data.

Current package path: `plugins/claude-dev`. Its identity is `print-ready-dev`; endpoint is `https://dev.printreadyparts.com/mcp`. Preserve its name and shared files from the verified development ZIP. Add a self-contained LICENSE inside the plugin folder. The bundled manifest still points to the product source repository; correct that metadata in the owning packager before the production distribution, not by editing an imported file here.

Reserve `plugins/claude` for a future production package with identity `print-ready`. Do not create or submit that package until the production packager, actual host tests and release authorization are complete. Do not submit the development folder to the public directory.

## Import boundary

Import only the seven paths declared in scripts/import-verified.mjs. Require a verified Claude dev receipt, its archive SHA-256 and every file hash. Reject extra archive files, unsafe paths and mismatched metadata. Store public provenance with version, source commit, endpoint and file hashes, excluding source checkout paths and private reports. Add the repository's license as the eighth package file.

Maintainers recover a verified release through the private product release process, then run:

```sh
node scripts/import-verified.mjs /path/to/print-ready-claude-dev-VERSION.zip /path/to/print-ready-claude-dev-VERSION.json
node scripts/validate.mjs
node scripts/package.mjs
```

Inspect the staged Git diff and import only the plugin folder and sanitized releases/claude-dev.json. Never commit the input ZIP, original private receipt or build directory. The original receipt contains runner filesystem paths that do not belong in public provenance.

Do not fork MCP descriptions, response instructions or base modeling rules. Keep the verified service reference and shared skills byte-for-byte. Minimal host-specific additions originate in the owning host adapter. The private release process now exports each successful verified dev delivery to a generated branch. This repository validates the branch and opens an update PR using its own ephemeral workflow token. Review and merge the generated PR instead of editing both copies. This is never an automatic production promotion or directory submission.

## Release gates

Local validation covers file inventory, hashes, manifest, dev endpoint and absence of executable server components. CI runs the same checks with no cloud credentials. These checks do not replace Claude's own validator, portal checks or a real host test.

Before public listing, finish actual guest and signed-in tests, provider attribution and console filters, shared product/policy wording, the production host packager, public package metadata and the connector submission. Set the public repository URL in the production manifest, and retain the proprietary license in the plugin folder. Resolve any portal licensing finding with Brian; do not switch licenses to pass validation.

Claude's directory requires a repository-backed plugin bundle and a separate submission for the hosted MCP connector. Use the intended publisher organization and the same production MCP URL for both. Brian completes legal attestations. Repository population does not authorize submission, production deployment or a live release.

Sources checked October 22, 2026: [plugin structure](https://claude.com/docs/plugins/build), [submission](https://claude.com/docs/plugins/submit), [checklist](https://claude.com/docs/plugins/pre-submission-checklist).
