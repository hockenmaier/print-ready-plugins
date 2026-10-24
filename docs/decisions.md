# Decisions

## October 23, 2026

Brian authorized adding generated plugin inheritance to the private release process. Successful verified dev releases export only the approved package files and public provenance to generated branches in this repository. Local checks run on each generated push, then the public workflow opens an update PR. Keep review and merge separate from any production directory release. The public repository has no private-source access or AWS credentials.

Brian reported a successful companion-cube test with the latest dev plugin. Record that result as observed host evidence, while retaining the untested account, guest and production-directory cases.

## October 22, 2026

Brian created hockenmaier/print-ready-plugins as a public, neutrally named distribution repository and authorized its preparation. Keep the service source private and publish only selected installation files and supporting documentation.

Brian selected proprietary licensing. Permit installation and use, retain other rights, and include the license inside each installable plugin folder. Do not apply MIT or another open-source license.

Begin with the existing dev-only Claude package from verified product version 0.7.27 and commit 4533992844efd2719ae77747b9ce0a8b4685bf8a. Preserve its seven packaged files and add the license. Brian will test in Claude before public directory submission. No production service change or directory submission is part of this repository setup.
