# Distribution repository guidance

Read docs/distribution.md before changing installation files. This repository contains generated Claude and Gemini CLI packages and public documentation. Never copy backend source, infrastructure, private reports, customer models, credentials or signed links here.

The private product repository owns the shared skills, host additions and service menus. Import only verified source snapshots through its distribution workflow. Preserve shared bytes and the proprietary license. Production and dev have separate source receipts and endpoints.

The owner console authorizes explicit publication branches named codex/publish-plugins-<environment>-<request ID>. Public validation precedes the exact-head merge performed by the private publisher with its existing repository-scoped key. Automatic codex/generated-plugins-dev-<source SHA> updates open review PRs and leave production unchanged. The older generated-claude-dev branch form remains supported for historical recovery. The public repository must never receive AWS credentials or private-repository access.

Use short-lived codex/ branches and PRs for maintainer changes. Validate the exact head, merge finished work and remove merged branches. Run node scripts/validate.mjs and node scripts/package.mjs. Keep generated ZIPs in ignored build output. Do not claim actual host acceptance or gallery indexing without evidence. No Claude directory submission or production service deployment is implied by repository publishing.
