# Security Policy

## Supported versions

The project is a single static HTML file. Only the latest release is supported.

| Version | Supported |
|---|---|
| 1.5.x | ✅ |
| < 1.5 | ❌ |

## Reporting a vulnerability

Please **do not** open a public issue for a security problem. Instead, report it
privately through GitHub's [Security Advisories](../../security/advisories/new)
for this repository, or contact the maintainer directly.

Please include:

- a description of the issue and its impact
- steps to reproduce, or a minimal proof of concept
- the browser and version you tested with

You can expect an acknowledgement within a few days. Please allow time for a fix
before disclosing publicly.

## Scope and threat model

It helps to be explicit about what this app does and does not do.

**What it does**

- Runs entirely in your browser, as a single static file.
- Stores your mixes, settings and any imported sounds in **your own** browser
  storage (`localStorage` and `IndexedDB`).
- Makes **no network requests**, with one exception: if you accept the prompt,
  it downloads the optional Opus encoder from a public CDN and caches it.

**What it does not do**

- No analytics, telemetry, accounts or cloud storage.
- No cookies, no fingerprinting, no third-party scripts.
- No microphone access unless you explicitly enable the microphone layer, and
  that audio is never transmitted anywhere.

**Things worth knowing**

- Imported mixes (`.json`) and audio files are user-supplied data. They are
  parsed locally; a malformed file is rejected with a message rather than
  executed. As with any app, only import files you trust.
- Mixes can be shared as a URL fragment. A shared link contains only layer
  volumes, a theme name and a mix title — nothing personal.

## Dependencies

The shipped app has **no** bundled third-party code. See
[docs/THIRD-PARTY.md](docs/THIRD-PARTY.md).
