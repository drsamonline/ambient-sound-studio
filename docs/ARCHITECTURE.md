# Architecture

Ambient Sound Studio is a single HTML document. There is no framework, no
bundler and no build step required to run it. This document is a guided tour of
how the code is arranged and how a sound travels from a noise buffer to your
speakers or to an exported file.

The readable source is [`src/ambient-sound-studio.src.html`](../src/ambient-sound-studio.src.html).
Everything below refers to that file.

---

## 1. Layout of the file

| Section | What lives there |
|---|---|
| `<style>` | All CSS, including the per-mood theme classes (`body.th-*`) |
| Markup | Header + now-playing bar, filter row, presets, layer grid, mixer, modals, dock |
| `D` | The **layer definitions** — id, display name, hue |
| `P` | The **presets** — id, name, category, theme, layer volumes |
| `BASE_TRIM` | Fallback per-layer gain used before auto-calibration has run |
| Audio engine | Buffer generators, `burst()`, `tone()`, `buildLayer()` |
| Graph | `ensureAudio()`, `ensureLayer()`, `attachLayer()` |
| Scheduler | `pump()` — schedules the random events of event-driven layers |
| UI | `buildUI()`, `syncCard()`, `syncRow()`, `buildMixer()`, `wireControls()` |
| Profiles | `buildProfiles()`, `applyProfileId()`, `tweenTo()`, `switchTheme()` |
| Export | `preRenderTile()`, `normalizeBuffer()`, `encodeWAV()`, `encodeOpusWasm()`, `exportMix()` |
| Extras | IndexedDB store, Opus encoder download/cache, custom sound files |
| Boot | `boot()` — wires everything together |

---

## 2. The layer model

Every sound is a **layer**. A layer is described by a small definition:

```js
{ id: "rain", n: "Rain", h: 200 }   // h is the hue used for its accent colour
```

There are 25 of them: 24 built in, plus a live microphone layer and any number
of custom sounds you add. Layers are created **lazily** — nothing is built until
you actually raise a fader or load a preset that uses it, which is what keeps
idle CPU near zero.

### Signal path of one layer

```
 buildLayer(c, id, BF)                     one of three shapes:
   • continuous bed   (noise -> filters) ─┐
   • event-driven     (bed + evt())      ─┼─> out ─> trim ─> vol ─> pan ─┬─> duckBus ─> g
   • binaural         (stereo merger)    ─┘                             └─> g
                                                                        └─> revIn -> convolver -> revWet -> g
```

- **`out`** is the layer's own output gain. Some layers (rain) modulate it from
  inside their event function to create swells.
- **`trim`** applies the auto-calibration gain (see §4).
- **`vol`** is the fader, driven by `eff(layer)` = value × mute × solo.
- **`pan`** places the layer in the stereo field.
- **`duckBus`** is a shared gain that dips the "bed" layers when a transient
  layer is loud, when ducking is enabled.
- **`revIn → convolver → revWet`** is the reverb send.

### The master chain

```
 g ─> highpass (28 Hz) ─> highshelf (-2.5 dB @ 7.2 kHz) ─> compressor ─> destination
```

The high-pass keeps sub-bass out of phone speakers; the high-shelf takes the
edge off hissy layers; the compressor glues the mix together.

---

## 3. How sounds are made

Nothing is recorded. Four primitives do all the work:

| Primitive | Purpose |
|---|---|
| `mkBuf(ctx, colour, secs)` | White / pink / brown noise, peak-normalised and crossfade-looped so it repeats seamlessly |
| `mkClock(ctx)`, `mkHeart(ctx)` | A one-second tick buffer and a 0.86 s heartbeat thump buffer |
| `mkIR(ctx, secs, decay)` | A generated reverb impulse response (decaying noise, energy-normalised) |
| `burst(...)`, `tone(...)` | One-shot percussive burst and one-shot pitched tone, each with an attack/decay envelope |

`buildLayer()` switches on the layer id and wires these together. A few layers
are worth calling out:

- **Wind chimes** use **modal synthesis** — each strike excites four inharmonic
  partials (ratios 1, 2.76, 5.4, 8.93) with individual decay times.
- **Binaural beat** merges two oscillators into a `ChannelMerger` so the left
  and right ears receive different frequencies.
- **Rain** layers droplet impacts on top of a bed whose gain is slowly modulated.
- **Fire** mixes a brown-noise bed with high-Q crackle pops and low whoomphs.

### Event scheduling

Event-driven layers expose `evt(ctx, dest, time)` which schedules sound **at a
given time** and returns **how long to wait** before the next event. `pump()`
runs every 110 ms, keeps a cursor 0.3 s ahead of the audio clock, and skips
layers that are currently silent. This is why the same code produces live
playback and offline exports.

---

## 4. Auto-calibration

Layers differ wildly in level, so the app measures each one instead of guessing.

When a layer is first built, `calibrateOne()` renders it offline for 3 s (beds)
or 20 s (event-driven, so events are actually captured), finds its peak, and
sets `trim` so every layer's loudest element lands at a common target. Results
are cached in `localStorage` so they are computed once, and can be re-measured
or switched off from the More menu.

---

## 5. Presets and moods

- `applyProfileId()` looks up the preset, calls `tweenTo(volumes)` to fade every
  fader to its target over 1.1 s, and `switchTheme()` to cross-fade the mood.
- `switchTheme()` sets `body.th-<name>`, which the CSS uses to recolour the
  background and enable decorative pseudo-elements, and updates the
  `theme-color` meta tag.
- Custom mixes are stored in `localStorage` and remember their theme.

---

## 6. The export pipeline

```
 measureRenderSpeed()  -> warn if the device is slow
   |
   v
 for each audible layer:
     event-driven -> render a POOL of up to 6 distinct tiles, lay them end to end
                     with equal-power crossfades  (so nothing repeats audibly)
     bed-only     -> build once, schedule events across the whole duration
   |
   v
 master envelope (fade in / fade out, length chosen in the UI)
   |
   v
 OfflineAudioContext.startRendering()
   |
   v
 normalizeBuffer(0.95)        -> consistent, healthy level
   |
   v
 encodeWAV(16/24-bit, streamed in 64K-frame chunks)   or   encodeOpusWasm()
   |
   v
 download, named after the layers in the mix
```

WAV is written in chunks rather than one giant buffer, and the Opus path encodes
straight from the rendered PCM — several times faster than real time, and it
produces real Ogg Opus on every browser.

---

## 7. Persistence

| Store | Contents |
|---|---|
| `localStorage` | Session (volumes, master, theme, Space, accent), custom mixes, calibrated trims, layer order, beat, toggles |
| **IndexedDB** | The cached Opus encoder modules and your custom sound files (as raw bytes) |

IndexedDB is used for the larger payloads because it stores binary data and has
no practical size limit. It works even when the page is opened from `file://`.

---

## 8. Offline

The app makes **no network requests at all** except the optional, user-confirmed
Opus encoder download. Every built-in sound is generated locally, so opening the
file with the network disabled works completely. See the README for the PWA
install details.
