# Übernachten in Rostock (statisch)

Statische Version von übernachten-in-rostock.de. Kein PHP, kein CMS, kein Build auf dem Server.
Der Webroot ist `public/`. Alles darin ist eingecheckt, auch das gebaute CSS und JavaScript.

## Änderungen

- **Inhalte:** direkt in `public/*.html` bearbeiten. Header und Footer stehen in jeder Datei.
- **CSS und JavaScript:** Quellen liegen in `src/`. Tailwind liest die Klassen aus `public/*.html`.

```
nvm use              # Node-Version aus der .nvmrc
npm install          # einmalig
npm run build        # baut public/assets/css und public/assets/js
npm run preview      # Vorschau auf http://127.0.0.1:8765
```

Der Build schreibt die neuen `?v=...` Werte für CSS und JavaScript selbst in alle HTML-Dateien.
Danach committen und pushen.

## Forge

- Site-Typ Static HTML, Web Directory `/public`, Deploy Script nur `git pull origin $FORGE_SITE_BRANCH`.
- In der nginx-Config der Site den von Forge erzeugten `location / { ... }` Block durch diese Zeilen ersetzen:

```nginx
rewrite ^/(.+)/$ /$1 permanent;

location = / {
    try_files /index.html =404;
}

location / {
    try_files $uri $uri.html =404;
}
```

- `rewrite` leitet alte Links mit Slash am Ende weiter (`/impressum/` auf `/impressum`).
- Die beiden `location` Blöcke liefern `/impressum` aus `impressum.html`.
- Kein `$uri/` in `try_files`, sonst entsteht mit der `rewrite` Zeile eine Schleife bei Ordner-URLs wie `/assets`.
- Es gibt keine `404.html`, unbekannte Pfade zeigen die Standardseite von nginx.

Danach prüfen: Startseite, `/impressum`, `/impressum/`, `/assets`, und ein unbekannter Pfad.
