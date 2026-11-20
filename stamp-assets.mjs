#!/usr/bin/env node
// Cache busting for static HTML: node stamp-assets.mjs [web root]
// Rewrites every reference to a local CSS or JavaScript file in the HTML files to path?v=<hash of the file>.
// Run it after every build. The file names must stay stable, so the bundler must not put a hash into them.
// Works from Node 14 on.
import { createHash } from 'node:crypto';
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.argv[2] ?? 'public';
const hashes = new Map();
const hash = path => {
  if (!hashes.has(path)) {
    const file = join(root, decodeURIComponent(path));
    hashes.set(path, existsSync(file) ? createHash('sha1').update(readFileSync(file)).digest('hex').slice(0, 10) : null);
  }
  return hashes.get(path);
};

let changed = 0;
// no readdirSync({ recursive }): this runs inside the project's build, which can need an old Node
const walk = folder => readdirSync(folder).flatMap(name => {
  const path = join(folder, name);
  return statSync(path).isDirectory() ? walk(path) : path.endsWith('.html') ? [path] : [];
});
for (const file of walk(root)) {
  const before = readFileSync(file, 'utf8');
  const after = before.replace(/\b(href|src)=(["'])(\/[^"'?#]+\.(?:css|m?js))(\?[^"'#]*)?\2/g,
    (match, attribute, quote, path) => hash(path) ? `${attribute}=${quote}${path}?v=${hash(path)}${quote}` : match);
  if (after !== before) {
    writeFileSync(file, after);
    changed++;
  }
}
const missing = [...hashes].filter(([, value]) => !value).map(([path]) => path);
console.log(`stamped ${hashes.size - missing.length} files, updated ${changed} HTML files`);
if (missing.length) console.log(`not found in ${root}, left as they are: ${missing.join(', ')}`);
