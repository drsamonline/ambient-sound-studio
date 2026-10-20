#!/usr/bin/env node
/*
 * Build the minified index.html from the readable source.
 *
 *   npm install      # once, dev only
 *   npm run build
 *
 * Nothing else in the project needs a build step: src/ambient-sound-studio.src.html
 * is the source of truth and runs directly in a browser.
 */
const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

const root = path.join(__dirname, '..');
const SRC = path.join(root, 'src', 'ambient-sound-studio.src.html');
const OUT = path.join(root, 'index.html');

const options = {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
  removeAttributeQuotes: true,
  removeRedundantAttributes: true,
  keepClosingSlash: true,
  caseSensitive: true,
  minifyJS: {
    compress: { passes: 3, ecma: 2020, toplevel: true },
    mangle: { toplevel: true },
    format: { comments: false }
  }
};

(async () => {
  const source = fs.readFileSync(SRC, 'utf8');
  const out = await minify(source, options);
  fs.writeFileSync(OUT, out);
  const pct = ((1 - out.length / source.length) * 100).toFixed(1);
  console.log('source   :', source.length, 'bytes');
  console.log('minified :', out.length, 'bytes  (' + pct + '% smaller)');
  console.log('wrote    :', path.relative(root, OUT));
})().catch((err) => {
  console.error('build failed:', err.message);
  process.exit(1);
});
