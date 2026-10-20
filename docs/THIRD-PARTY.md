# Third-party components

The application itself — HTML, CSS and JavaScript — is original work by
Dr. Sohil Momin and is released under the **Ambient Sound Studio Personal Use
Licence** (see [LICENSE](../LICENSE)): free for personal, non-commercial use,
with commercial use requiring a separate licence. That restriction applies to
this project's own code only.

It deliberately bundles **no third-party code**. The one external component is
downloaded at runtime, at your request, and is not redistributed by this
repository.

## Runtime, optional

### @audio/encode-opus
- **What it is:** a single-file libopus WebAssembly encoder with an Ogg muxer,
  used to export mixes as Ogg Opus.
- **Licence:** MIT.
- **How it is used:** the app asks your permission, downloads four small modules
  (about 230 KB in total), stores them in your browser's IndexedDB, and reuses
  them offline from then on. Nothing is bundled with this repository.
- **Project:** https://github.com/audiojs/encode
- **Licence text:** included in the package as `LICENSE` and `LICENSE.libopus`.

### @audio/resample-polyphase
- **What it is:** a polyphase resampler used by the encoder to convert your
  device's sample rate to Opus's 48 kHz.
- **Licence:** MIT.
- **Project:** https://github.com/audiojs/resample

## Development only

### html-minifier-terser
- Used only by `npm run build` to produce the minified `index.html`.
- **Licence:** MIT.
- Not part of the shipped app.

## Fonts, icons, images

None. All icons are inline SVG drawn for this project, the banner is generated
SVG, and the app uses the operating system's default UI font stack. No webfonts
are loaded and no image is fetched.
