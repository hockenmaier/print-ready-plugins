# Install and check Print Ready in Gemini CLI

Gemini CLI runs in a terminal on your computer. A Google account signs you into Gemini. Print Ready account sign-in is a separate, optional step for the private model library. The ordinary Gemini website does not install this extension.

## Find the gallery listing

1. Open https://geminicli.com/extensions/ in Chrome.
2. Search for `print-ready`. Also try `Print Ready`, `OpenSCAD` and `hockenmaier` if the gallery search supports them.
3. Open the matching result and check that its repository is https://github.com/hockenmaier/print-ready-plugins.
4. Record the check date, listing URL, displayed version and result. A repository link or a Google search result alone does not confirm a gallery listing.

The gallery documents a daily crawl of public GitHub repositories tagged `gemini-cli-extension` with `gemini-extension.json` at the root. Allow at least a full crawl after publication. If it is absent, check the repository is public, the topic is present, the root manifest is valid and the name and version are correct. Direct installation works independently of gallery discovery.

## Install Gemini CLI for the first time

Install Node.js 20 or newer and Git if they are missing. In Windows Terminal or PowerShell, run:

```sh
npm install -g @google/gemini-cli
gemini --version
gemini extensions install https://github.com/hockenmaier/print-ready-plugins
gemini
```

Review the extension and MCP access prompt. Choose **Login with Google** when Gemini asks. Use your normal Chrome Google session for the browser login. If a work account blocks the connection, follow your organization's policy or use an eligible personal account. Do not paste credentials into chat.

Restart Gemini after installing or updating extensions. Inside Gemini, run:

```text
/extensions list
/mcp
```

Confirm `print-ready` is enabled and the Print Ready MCP server connects to `https://api.printreadyparts.com/mcp`. Ask Gemini to call `get_capabilities` and report the actual service version and environment.

## Test a part

Ask:

> Use Print Ready to make a 40 by 20 by 6 mm PLA plate with a centered 6 mm through-hole. Put its flat bottom at Z=0. Show the actual geometry preview and give me the STL download link.

Confirm the returned model is ready, the preview matches the plate and the STL downloads. Ask for the editable SCAD and another camera view. Gemini CLI may provide file links instead of an embedded interactive viewer. Record the actual behavior. Do not treat successful package installation as a completed modeling test.

Production service 0.7.32 does not accept Gemini CLI local OAuth callbacks. Test guest creation and downloads first. Private library sign-in requires a later explicitly promoted service update and a real browser sign-in check. Dev permits a separate local callback test. Record these results separately. Report the Gemini CLI version, extension version, service version, exact error and time when a step fails.

## Update or remove

Run these commands in the terminal outside an active Gemini conversation:

```sh
gemini extensions update print-ready
gemini extensions uninstall print-ready
```

For a dev test, clone this repository and install the `plugins/gemini-dev` folder with `gemini extensions install ./plugins/gemini-dev`. It uses the dev service and identity `print-ready-dev`. Keep production and dev test evidence separate.

Sources: [installation](https://geminicli.com/docs/get-started/installation/), [authentication](https://geminicli.com/docs/get-started/authentication/), [extension reference](https://geminicli.com/docs/extensions/reference/), [gallery publishing](https://geminicli.com/docs/extensions/releasing/).
