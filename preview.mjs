#!/usr/bin/env node
// Local preview of the static site: node preview.mjs [web root] [port]
// Serves /page from page.html and /dir/ from dir/index.html, and answers unknown paths with 404.html.
import { existsSync, readFileSync, statSync } from 'node:fs';
import http from 'node:http';
import { dirname, extname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), 'public'));
const PORT = Number(process.argv[3] ?? 8765);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.gif': 'image/gif',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.pdf': 'application/pdf', '.mp4': 'video/mp4',
  '.webm': 'video/webm',
};
const isFile = path => existsSync(path) && statSync(path).isFile();

http.createServer((request, response) => {
  let path;
  try { path = decodeURIComponent(request.url.split('?')[0]); } catch { path = '/'; }
  const full = resolve(ROOT, `.${path}`);
  const inside = full === ROOT || full.startsWith(ROOT + sep);
  const file = inside && [full, `${full}.html`, join(full, 'index.html')].find(isFile);
  const notFound = join(ROOT, '404.html');
  if (!file && !isFile(notFound)) return response.writeHead(404, { 'Content-Type': 'text/plain' }).end('404 Not Found');
  response.writeHead(file ? 200 : 404, { 'Content-Type': TYPES[extname(file || notFound).toLowerCase()] ?? 'application/octet-stream' });
  response.end(readFileSync(file || notFound));
}).listen(PORT, '127.0.0.1', () => console.log(`http://127.0.0.1:${PORT} serves ${ROOT}`));
