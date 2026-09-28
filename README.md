# LessLate website

Static website for [lesslate.app](https://lesslate.app), published from the repository's `main` branch through GitHub Pages.

## Publication checkpoint

The completed site uses evergreen public wording and the verified privacy disclosures for LessLate 1.3.0 Build 15.

- Branch: `codex/build14-website-refresh`
- Base: `f559f3285422a4c784571f46ca6a58d480d4fb14`
- App privacy evidence: Build 15 manifest correction commit `d52b512bc65144057d62c0a04ec3403330fdb29d` and the user supplied Xcode Privacy Report result
- Public site copy is evergreen and does not describe a development timeline.

Review gallery: http://127.0.0.1:8996/__review/

Full report and evidence: `/Users/fidelis/Documents/Less late/LessLate-Website-Review/`

To restart the private local preview:

```sh
python3 '/Users/fidelis/Documents/Less late/LessLate-Website-Review/preview.py'
```

The preview binds to loopback, sends `X-Robots-Tag: noindex, nofollow, noarchive`, and serves a disallow-all robots file. The optional `--audit --port 8997` mode uses the production crawler policy on loopback only. Review files are outside the publish tree.

## Site structure

- `/`: product overview, genuine build 14 screens, Free and Pro, privacy and FAQ
- `/how-it-works/`: departure checks, Smart Leave, weekly routines and limitations
- `/support/`: product instructions and directly visible support contact
- `/privacy/`: on-device records, providers, optional analytics and rights
- `/subscriptions/`: features, billing, restoration and terms
- `/404.html`: useful missing-page response

The global footer has only the brand and legal/support links. The operator name appears once in the Privacy Policy, pending legal review. The verified support address is visible only in the dedicated Support contact section and is absent from structured data and shared components. No contact form or new data processor was added.

## Technology and accessibility

Semantic static HTML, CSS and small vanilla JavaScript enhance mobile navigation, movement, FAQ, screenshot browsing and support contact. Product content is present in HTML. Reduced motion cancels nonessential animation and uses instant gallery scrolling. The contact button exposes its expanded state, the copy result uses a live status region, and keyboard focus is visible.

No package manager, framework, build dependency, form, website analytics, advertising tracker, cookie or storage API was introduced. Fonts and images are self hosted. Content Security Policy limits scripts and resources to this site, with a hash for each JSON LD block. Editing structured data requires updating its hash.

The six app images are genuine build 14 captures. Complete screenshots are resized uniformly and encoded as AVIF or lossless WebP. Full size 1320 pixel WebP images decode identically to the original PNG pixels. Sources and App Store exports remain untouched. Provenance and hashes are in the private evidence folder.

## Verification and publication gates

All five main pages scored 100 in every Lighthouse category in the saved mobile lab rerun. HTML, CSS, JavaScript syntax, static links, JSON LD, image provenance and reduced motion checks pass. The visible Support contact, mail link, copy action, keyboard controls and accessibility tree were inspected in the local browser. See the report for test limits and remaining legal questions.

GitHub Pages uses the existing `main` root source. `CNAME` and `.nojekyll` remain preserved. The apex domain is canonical, and the `www` DNS record points to GitHub Pages for its redirect to the apex.
