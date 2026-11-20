# Übernachten in Rostock (statisch)

Statische Version von übernachten-in-rostock.de. Kein PHP, kein CMS, kein Build auf dem Server.
Der Webroot ist `public/`. Alles darin ist eingecheckt, auch das gebaute CSS und JavaScript.

## Änderungen

- **Inhalte:** direkt in `public/*.html` bearbeiten. Header und Footer stehen in jeder Datei.
- **CSS und JavaScript:** Quellen liegen in `src/`. Tailwind liest die Klassen aus `public/*.html`.

```
npm install          # einmalig
npm run production   # baut public/assets/css und public/assets/js
python3 preview.py   # Vorschau auf http://127.0.0.1:8765
```

Der Build schreibt die neuen `?id=...` Werte für CSS und JavaScript selbst in alle HTML-Dateien.
Danach committen und pushen. Immer `npm run production` einchecken, nie `npm run dev`.

## Server (Forge)

Site als statische Seite anlegen, Web Directory `/public`, Deploy Script nur `git pull`.
Die Seiten heißen `impressum.html`, die URLs aber `/impressum`. Dafür braucht die nginx-Config:

```
location / {
    try_files $uri $uri.html $uri/ =404;
}
```
