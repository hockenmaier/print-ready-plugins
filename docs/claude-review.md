# Claude directory preparation

The current folder, plugins/claude-dev, is a development distribution and must not be submitted as the production listing.

The intended production plugin identity is print-ready, with folder plugins/claude and MCP URL https://api.printreadyparts.com/mcp. The product source prepares that package. It must pass live production release checks and actual installed-host testing before being mirrored here. Shared skills and tool language are generated from the same authored source as the other Print Ready packages.

## Prepared

- Public repository with an explicit distribution file allowlist and source hashes.
- Proprietary license inside the installable plugin folder.
- Package integrity and ZIP checks in CI, plus Anthropic's official pinned CLI validator. These checks are separate from the portal scan and review.
- Successful owner companion-cube test on Claude dev 0.7.27, including the native viewer. Additional cases remain in the [host checklist](claude-testing.md).

## Before submission

- Select the intended publisher account on a paid Claude plan and connect its GitHub account with access to this repository.
- Export a verified production package into plugins/claude. Check the exact public commit and stable plugin identity. Do not submit the dev folder or change its endpoint to make it look like production.
- Retest guest creation, native viewer, revisions, downloads, deliberate sign-in/save, private reopen and access isolation with the actual production package.
- Finish cross-host wording and usage attribution checks in the product source.
- Prepare three to five actual PNG screenshots of app responses, each at least 1000 pixels wide, with prompt text supplied separately. Exclude account identifiers and chat prompts from the captures.
- Put populated reviewer-account credentials only in the portal's secure review fields. Never publish them here.
- Validate the production plugin folder in the portal, resolve findings and complete review setup. The owner completes binding legal/compliance acknowledgements.

The hosted server and plugin bundle are separate submissions in the same publisher organization. First submit the production server as an MCP connector, then the repository-backed plugin bundle referencing the same URL. Pair them where offered. Choose a deliberate tracked branch or tag; dev update PRs must not change production files.

Product: https://printreadyparts.com . Guide: https://printreadyparts.com/welcome . Support: https://printreadyparts.com/support . Privacy: https://printreadyparts.com/privacy . Terms: https://printreadyparts.com/terms . Verify their current wording and behavior before review.

The repository is public and proprietary. Visibility permits inspection; the license grants installation and use rather than general redistribution. Do not substitute an open-source license to clear a portal finding.

Sources checked October 23, 2026: [plugin submission](https://claude.com/docs/plugins/submit), [connector submission](https://claude.com/docs/connectors/building/submission), [MCP App screenshot requirements](https://claude.com/docs/connectors/building/submission#carousel-screenshots-for-mcp-apps).
