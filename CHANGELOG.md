# Changelog

All notable changes to Ambient Sound Studio are documented here.
This project follows [Semantic Versioning](https://semver.org/).

## [1.6.1] - 2026-10-20

### Fixed
- **The preset list was unreachable.** Presets were laid out as a single
  horizontally-scrolling row with the scrollbar hidden, so most of the 36 sat
  off-screen with nothing to indicate they existed, and the row spilled past
  the edge of the screen.

### Changed
- **Presets are now a dropdown, grouped by category** (Sleep, Focus, Relax,
  Nature, Urban, plus **My mixes**). Every preset is always reachable, nothing
  overflows, and the native list works with a keyboard. **Surprise me** and
  **Save mix** sit beside it; a **Delete mix** button appears when one of your
  own mixes is selected.
- The category filter chips and the search box are gone — the grouped dropdown
  replaces both.

## [1.6.0] - 2026-10-20

### Added
- **Localisation** — the whole interface, the 25 layer names, the 36 presets and
  all messages now speak **English, Hindi and Gujarati**, switchable in the More
  menu and remembered between visits.
- **Sound packs** — export your custom sounds together with the current mix as
  one shareable file, and import someone else's.
- **8 new presets** (36 total), including seasonal and regional mixes: Monsoon
  Evening, Rain on Window, Dawn Chorus, Winter Night, Summer Afternoon, Temple
  Bells, Spa and Exam Hall.
- **Ducking now applies to exports**, not just live playback. The ducking curve
  is measured from the very tiles being exported, so what you hear is what you
  get.
- **Drag-to-reorder now works on touch** (Pointer Events with a drag handle),
  and with the arrow keys when the handle has focus.
- A language row in the More menu.

### Changed
- **Custom sounds are decoded on first use, not at startup.** Decoded audio is
  far larger than the file it came from, so a library of long sounds no longer
  costs memory until you actually raise one. A restored sound now starts silent
  rather than jumping to 50%.
- The now-playing bar updates the instant you pick a preset, instead of after
  the crossfade finishes.
- The saved card order is replayed after custom sounds are restored, so a sound
  keeps the position you gave it.

### Fixed
- A local variable named `t` in the export path shadowed the translation
  function (caught during testing, before release).

## [1.5.0] - 2026-10-19

### Added
- **Installable PWA**: full web app manifest (id, scope, `display_override`,
  categories), 192/512/maskable icons, apple-touch-icon, favicon, and an
  **Install app** button wired to `beforeinstallprompt`.
- **Richer built-in sounds**: rain droplet impacts, a long thunder tail,
  resonant fire pops, multi-note bird phrases, **modal** wind chimes and
  café cup clinks.
- Keyboard shortcuts for the breathing guide (`B`) and mixer view (`V`).
- Focus trapping inside every modal, not just dialogs.

### Fixed
- A saved mix could be **silently wiped** if the accent colour or Space slider
  was changed before audio had ever started.
- Custom sounds **lost their saved volume** when restored after a reload.
- Adding a custom sound **stacked drag-and-drop handlers**, firing the reorder
  logic repeatedly on a single drag.
- The live **microphone layer was included in exports** and rendered as silence.
- Export filenames could contain characters that are illegal on Windows.
- Tab focus could escape the author panel and breathing overlay.

### Changed
- **Relicensed.** The project moved from the MIT licence to the
  **Ambient Sound Studio Personal Use Licence**: free for personal,
  non-commercial use; commercial use requires written permission and a separate
  commercial licence from the author. See [LICENSE](LICENSE).
- Export filename slugs are now sanitised and lower-cased.
- The minified build is produced by `tools/build.js` (npm script `build`).

## [1.4.0] - 2026-10-19

### Added
- **First-load download & cache**: a persistent IndexedDB store, used for the
  Opus encoder and for your own sound files, so they are downloaded/added once
  and reused offline forever.
- **Fast Opus encoder** (libopus WASM, MIT) — real Ogg Opus on every browser,
  several times faster than real time, with the browser recorder as fallback.
- **Add sound files**: any audio file becomes a full layer, stored on device.
- **Pause playback while exporting**, roughly halving export time.

### Fixed
- `NaN` reaching an audio parameter when a layer was added during a preset fade.
- Playback could stay suspended after an export.

## [1.3.0] - 2026-10-19

### Added
- **Binaural beat** layer with a Delta/Theta/Alpha/Beta/Gamma selector.
- **Per-layer level meters** and **ducking**.
- **Fader mixer view** and **drag-to-reorder** layers.
- **Microphone input** as a live layer.
- Preset **categories, filter and search**; **guided breathing**; **Pomodoro**;
  **A/B compare**; **undo**; **gentle ramp-up**; **audio output picker**.
- 12 more presets (26 total at the time).

## [1.2.0] - 2026-10-19

### Added
- **Reverb** with a Space control; master high-pass and high-shelf tone shaping.
- **Lazy layer building** — only layers you actually use are created.
- **Cached per-layer level calibration**.
- Export **equal-power crossfade**, fade-length and 16/24-bit options,
  **streamed WAV writing**, layer-named filenames and a size estimate.
- **In-app dialogs** replacing every native alert/confirm/prompt.
- **More menu**, now-playing bar, slider readouts, toasts, help overlay,
  accent colour, haptics, keyboard shortcuts.
- **Session restore**, **share-by-link**, JSON mix import/export.
- **Media Session** and **Screen Wake Lock**.
- 12 more presets (26 total).

### Fixed
- Session and share-link restore were silently discarding the saved mix.

## [1.1.0] - 2026-10-19

### Added
- **Fully offline**: removed the only CDN dependency; Opus export now uses the
  browser's own recorder.

### Fixed
- Opus export loaded the wrong encoder script, so it silently produced WAV.
- Unsafe injection of custom mix names into the DOM.
- Event scheduling ran for inaudible layers, wasting CPU.

## [1.0.0] - 2026-10-19

### Added
- Initial release: 24 synthesised layers, 14 presets, WAV/Opus export,
  mood themes, sleep timer, offline PWA shell.

[1.6.1]: https://github.com/drsamonline/ambient-sound-studio/compare/v1.6.0...v1.6.1
[1.6.0]: https://github.com/drsamonline/ambient-sound-studio/compare/v1.5.0...v1.6.0
[1.5.0]: https://github.com/drsamonline/ambient-sound-studio/compare/v1.4.0...v1.5.0
[1.4.0]: https://github.com/drsamonline/ambient-sound-studio/compare/v1.3.0...v1.4.0
[1.3.0]: https://github.com/drsamonline/ambient-sound-studio/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/drsamonline/ambient-sound-studio/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/drsamonline/ambient-sound-studio/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/drsamonline/ambient-sound-studio/releases/tag/v1.0.0
