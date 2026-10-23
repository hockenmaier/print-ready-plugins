# Claude development acceptance

Test version 0.7.27 against dev. The latest run has not yet been accepted in the actual Claude product. Prior guest modeling and account saving succeeded in an earlier private upload; automated protocol and browser checks also passed for the current service. Neither substitutes for these tests.

## Install

Build the upload ZIP with `node scripts/package.mjs`, or use the ZIP supplied by the maintainer. Upload under Customize > Plugins > Add > Upload plugin. Open the plugin's Connectors tab and add or connect Print Ready Dev at `https://dev.printreadyparts.com/mcp`. Installing the skills alone does not connect their tools.

Start a fresh chat without a signed-in Print Ready account. A host connection step may still appear; use Continue as guest if needed. Claude's account and Print Ready's account are separate. Record unexpected permission prompts and whether Claude offers a persistent choice.

## Cases

1. Ask `Show the Print Ready welcome guide.` Confirm the actual guide opens.
2. Ask `Make a 40 by 20 by 6 mm PLA plate with a centered 6 mm through-hole. Put its flat bottom at Z=0. Show the finished part and its STL download.` Confirm a real preview and native rotatable viewer in the first completed response, with a usable STL and matching dimensions. Record any generic tool labels, replacement viewer or extra request needed to display it.
3. Ask `Make it 50 mm long, keep the other dimensions and centered hole, and show both versions.` Check version selection, matching downloads and access to both files.
4. Ask for a bottom camera view and editable OpenSCAD source. Verify the actual artifacts rather than a verbal claim.
5. Ask to sign in and save the current parts. Complete OAuth through the connector. Confirm account label, explicit saving and reopening from the private library. Reopen the saved part through the signed-in ChatGPT dev connection to verify the shared account.
6. Disconnect through Claude's host settings, then confirm a fresh guest session cannot list the private library and can still start a new guest part. Do not erase existing models or accounts during this test.
7. Check readable controls and the native viewer in both supported light and dark modes. If Claude Code support is to be advertised, repeat the compatible flow there and record UI capability limits accurately.

Record date, client/surface, plugin version, guest or account state, model IDs and observed result. Keep account emails, access secrets, signed URLs and private conversations out of public issues. Inspect backend attribution privately and reconcile Claude events with management reports. The provider filter is still pending.

## Before listing

Use the actual repository-delivered production package for a second acceptance pass after its packager exists. Do not submit this dev folder. The production folder, directory validation, connector submission, reviewer setup and fresh directory installation remain pending. The CLI validator is a syntax check, not an approval or hosted UI test.
