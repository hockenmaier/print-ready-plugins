# Distribution repository guidance

This repository contains public plugin distribution files, documentation and local packaging scripts. Never copy the backend repository, infrastructure, private reports, customer models, credentials or signed artifact links here.

Read docs/distribution.md before changing a plugin. It is the owning specification for this repository. Record product or release-policy changes in docs/decisions.md before implementation.

The shared modeling instructions, welcome skill and MCP descriptions originate in the product source. Import an explicit verified file list; do not hand-edit a generated skill or service reference here. Preserve identical shared instructions between hosts and allow only documented host compatibility additions.

The private release process pushes codex/generated-claude-dev-<source SHA> branches using a deploy key scoped to this public repository. Validate those branches and open update PRs with the repository-local workflow token. The public repository must never receive private-repository read access or AWS credentials. Review generated updates through PRs; do not edit both copies of a skill.

Current work targets dev only. Do not change an endpoint to production, create a public release, submit to a directory or claim a listed Claude plugin without authorization and actual host acceptance. A public development repository is not a directory publication.

Keep the owner's proprietary license. Changes to licensing require Brian's direction. No open-source license may be substituted automatically.

Use short-lived codex/ branches and pull requests after initial repository setup. Validate the exact PR head, merge completed work, and delete the merged branch. Run node scripts/validate.mjs and inspect the packaged ZIP before handoff. Keep generated ZIPs in ignored build output; do not add GitHub Actions build artifact uploads.

Write plainly. Describe tested behavior and remaining gaps accurately. Preserve supplied product copy and host-specific technical instructions. When UI changes, verify supported light and dark modes in the actual host.
