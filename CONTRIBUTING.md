# Contributing

Thanks for taking a look. This is a small, deliberately simple project, and
contributions that keep it that way are very welcome.

## Ground rules

- **Keep it one file.** The whole point is a single self-contained HTML document
  that runs offline with no build step. Please do not introduce a framework, a
  bundler, a runtime dependency or a CDN reference.
- **Edit the source, not the build.** `src/ambient-sound-studio.src.html` is the
  source of truth. `index.html` is generated.
- **Test in a real browser.** Audio bugs do not show up in a linter.

## Getting set up

```bash
git clone https://github.com/drsamonline/ambient-sound-studio.git
cd ambient-sound-studio
# just open the source file — no build needed
open src/ambient-sound-studio.src.html
```

If you change the source, rebuild the minified file before opening a pull request:

```bash
npm install
npm run build
```

## Before you open a pull request

- [ ] The change is made in `src/ambient-sound-studio.src.html`
- [ ] `npm run build` has been run, and `index.html` is updated
- [ ] The script still parses (see [docs/BUILD.md](docs/BUILD.md))
- [ ] You have opened the app and checked: it loads, a preset applies, it plays,
      and an export still works
- [ ] No new network request is introduced anywhere except the existing,
      user-confirmed Opus encoder download
- [ ] No analytics, tracking or telemetry
- [ ] Keyboard and screen-reader access is not made worse

## Adding a sound layer

1. Add an entry to the `D` array with a unique `id`, a display name `n` and a
   hue `h`.
2. Add a `case` in `buildLayer()` — either a continuous bed, an `evt` function,
   or both.
3. Add a fallback gain to `BASE_TRIM` (auto-calibration refines it).
4. If it produces random events, add its id to `EVENTFUL` so exports tile it.
5. Consider a preset that uses it.

## Adding a preset

Add an entry to `P` with a unique `id`, a name `n`, a `cat` (Sleep, Focus,
Relax, Nature or Urban), a `th` theme and a `v` volume map. Every layer id you
reference must exist in `D`.

## Licensing of contributions

By submitting a contribution (a pull request, patch or any other material) you
agree that:

- your contribution is your own original work, or you have the right to submit it;
- you grant the project author a perpetual, worldwide, royalty-free, irrevocable
  licence to use, reproduce, modify, distribute and **relicense** your
  contribution, including under the project's commercial licence; and
- your contribution is provided under the same terms as the rest of the project
  (see [LICENSE](LICENSE)).

This is what allows the project to offer commercial licences while remaining free
for personal use. If you are not comfortable with these terms, please open an
issue with your idea instead of a pull request.

## Commit messages

Short and imperative — `Fix ducking release on solo`, not `fixed stuff`. If a
change alters behaviour, say what and why in the body.

## Reporting bugs

Please use the [bug report template](.github/ISSUE_TEMPLATE/bug_report.md) and
include your browser and version, your operating system, what you did, what you
expected and what happened.
