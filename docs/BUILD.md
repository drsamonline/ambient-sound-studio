# Building

**You do not need to build anything to use or edit the app.** The readable
source, `src/ambient-sound-studio.src.html`, is a complete working app — open it
in a browser and it runs.

The build only produces the minified `index.html`.

## Requirements

- Node.js 18 or newer
- `html-minifier-terser` (a dev dependency)

## Build

```bash
npm install      # once
npm run build    # writes index.html from src/
```

Expected output:

```
source   : 116242 bytes
minified : 95793 bytes  (17.6% smaller)
wrote    : index.html
```

## What the build does

`tools/build.js` runs the source through `html-minifier-terser` with:

- whitespace collapsed, comments removed
- CSS minified
- attribute quotes removed where it is safe to do so
- inline JavaScript compressed with Terser (3 passes, top-level mangling)

## A note on mangling

Because top-level names are mangled, internal globals such as `window.L` and
`window.D` are **not reachable from the console in the minified build**. If you
are debugging or hand-editing, work with `src/ambient-sound-studio.src.html`,
which keeps every name readable.

## Verifying a build

After building, confirm the script still parses and the app still boots:

```bash
# quick syntax gate
node -e "const fs=require('fs');const h=fs.readFileSync('index.html','utf8');\
const s=h.match(/<script>([\s\S]*)<\/script>/)[1];new (require('vm').Script)(s);console.log('parses OK')"

# then open index.html and check: 25 cards, 28 presets, play, export
```

## Serving locally

```bash
npm run serve      # python3 -m http.server 8080
# then open http://localhost:8080
```

Serving over http (rather than opening the file directly) is also what lets you
test the service worker and the install prompt.
