# FAQ

### Do I need to install anything?
No. It is one HTML file. Download it and open it.

### Does it need the internet?
No. Every built-in sound is generated in your browser. The only optional
network request is the one-time Opus encoder download, which you are asked
about first and which is cached on your device afterwards.

### Where does my data go?
Nowhere. There are no analytics, no accounts and no servers. Your mixes, custom
sounds and settings are stored on your own device.

### Why does nothing happen until I press play?
Browsers block audio until you interact with the page. Press the ▶ button, or
tap a preset, and it starts.

### Some layers sounded quiet or missing — was that a bug?
It was, and it is fixed. Layers used to differ wildly in level, and a few were
effectively inaudible (vinyl crackle, the café drone, subsonic train and cosmic
layers). The app now measures every layer and levels them automatically, and
those layers were rebuilt.

### Can it ship with recorded samples?
Every **built-in** sound is synthesised — no audio files are bundled, which is
what keeps the app one small offline file and avoids shipping anyone else's
recordings. You can add **your own** audio: **More ⋯ → Add sound files**, and
each file becomes a real layer stored on your device.

### How long can an export be?
Up to 10 minutes, in WAV (16 or 24-bit) or Opus.

### Why is Opus export not instant?
Opus is a compressed format, so it has to be encoded — that takes a little time
even though it is many times faster than real time. WAV is instant.

### Why did it ask to download something?
That is the optional Opus encoder (about 230 KB). You can decline and still
export WAV, or the browser's own recorder will be used instead.

### Can I install it as an app?
Yes. On iOS use **Share → Add to Home Screen**. On Chrome/Edge/Android, host the
folder with `sw.js` next to `index.html` and an **Install app** button appears in
the More menu.

### Does it work on a phone?
Yes — it is fully responsive and works well on mobile. Note that **binaural
beats need headphones** to have any effect, and drag-to-reorder needs a mouse or
trackpad.

### The screen stays on while it plays. Can I stop that?
That is the Wake Lock, which is deliberate — it stops your phone sleeping while
a soundscape plays. It is released automatically when you pause.

### How do I find a preset?

Open the **Preset** dropdown next to the title. All 36 are listed, grouped by category (Sleep, Focus, Relax, Nature, Urban), plus a **My mixes** group for anything you save. **Surprise me** picks a random one.

### Can I use it in Hindi or Gujarati?

Yes. Open **More ⋯ → Language** and pick English, हिन्दी or ગુજરાતી. The interface, the layer names, the presets and the messages all change, and your choice is remembered between visits.

### Can I share my own sounds with someone?

Yes. **More ⋯ → Export sound pack** writes a single file containing every custom sound you have added plus the current mix. Anyone can bring it in with **Import sound pack…**. The pack holds real audio, so the file is as big as the sounds in it.

### Can I share a mix?
Yes: **More ⋯ → Copy share link** encodes the mix into the URL. Anyone opening
that link gets your exact mix. You can also export/import mixes as JSON.

### Something is wrong / I have an idea.
Please [open an issue](../../issues) — there are templates for both.

### Is there a keyboard-only way to use it?
Yes, see the shortcut table in the [README](../README.md#️-keyboard-shortcuts).
