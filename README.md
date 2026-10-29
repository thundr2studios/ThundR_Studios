# ThundR_Studios V8 — Multi-Project Hub + QuasarPhysics Space Edition

Die Website benötigt nur **ein einziges GitHub-Pages-Repository**. Jede Projektkarte kann auf eine eigene Unterseite zeigen, die im Ordner `projects/` liegt. QuasarPhysics hat jetzt eine modernisierte Space-Website und einen **datengetriebenen Section-Baukasten**.

## Struktur

```text
ThundR_Studios/
├── index.html                 # zentraler Projekt-Hub
├── data.js                    # Projektkarten, individuelle Codes, Seitenpfade
├── script.js / i18n.js       # Hub-Logik, Sprachen und Freischaltungen
├── styles.css / themes.css   # Hub-Design
├── assets/
│   ├── logo.png
│   └── quasar-physics.webp   # dein eingesendetes Projektlogo
└── projects/
    ├── quasarphysics/
    │   ├── index.html
    │   ├── quasarphysics_style.css
    │   ├── quasarphysics_script.js
    │   └── quasarphysics_data.js  # <--- SECTIONS HIER BEARBEITEN!
    └── _vorlage/
        ├── index.html
        ├── project_style.css
        ├── project_script.js
        └── project_data.js    # Vorlage zum Kopieren
```

## Was wurde geändert?

- In `data.js` gibt es keine `url`- und `linkType`-Eigenschaften mehr für Projekte.
- Projektkarten verweisen **nur noch auf lokale Unterseiten** mit `page: "projects/NAME/"`. Wenn kein `page` definiert ist, erscheint ein Hinweis im Projektfenster.
- Social-Media-Links sind weiterhin unter `socials` verfügbar; sie sind keine Projekt-URLs.
- Die Minecraft-IP von QuasarPhysics steht nur in `projects/quasarphysics/quasarphysics_data.js` als `serverAddress`. Sie wird **als Text mit Kopieren-Button**, nicht als Weblink, angezeigt.
- Alle Hub-Tabs einschließlich „Über mich“ bleiben öffentlich. Pro Projekt bleiben `locked: "yes"`/`"no"` und `code` möglich.
- DE/EN und Light/Dark synchronisieren sich über den bisherigen lokalen Speicher zwischen Hub und Unterseite.

## QuasarPhysics: Sections hinzufügen

Öffne **`projects/quasarphysics/quasarphysics_data.js`**. Im Array `sections: [ ... ]` kannst du die Reihenfolge ändern, bestehende Sections aktivieren/deaktivieren und neue Objekte hinzufügen. `enabled: false` blendet einen Abschnitt vollständig aus und entfernt ihn auch aus dem Menü.

### 1. Text-Section

```javascript
{
  id: 'news',
  type: 'text',
  enabled: true,
  label: {de: '06 / NEWS', en: '06 / NEWS'},
  title: {de: 'NEUE<br><em>UPDATES.</em>', en: 'NEW<br><em>UPDATES.</em>'},
  intro: {de: 'Alles über unsere neuesten Änderungen.', en: 'All about our recent changes.'},
  text: {de: 'Hier stehen meine News.', en: 'My latest news go here.'}
}
```

### 2. Feature-Karten

```javascript
{
  id: 'ships',
  type: 'cards',
  enabled: true,
  label: {de: '07 / KONSTRUKTIONEN', en: '07 / CONTRAPTIONS'},
  title: {de: 'UNSERE<br><em>MASCHINEN.</em>', en: 'OUR<br><em>MACHINES.</em>'},
  items: [
    {
      icon: '⚙', number: '01', tag: 'CREATE',
      title: {de: 'Luftschiffe', en: 'Airships'},
      text: {de: 'Neue Maschinen bauen.', en: 'Build new machines.'}
    }
  ]
}
```

### 3. Bildergalerie

Lege Bilder in `projects/quasarphysics/images/` ab (Ordner bei Bedarf selbst anlegen), danach:

```javascript
{
  id: 'gallery', type: 'gallery', enabled: true,
  title: {de: 'GALERIE.', en: 'GALLERY.'},
  items: [
    {image: 'images/screenshot1.webp', caption: {de: 'Meine Fabrik', en: 'My factory'}},
    {image: 'images/screenshot2.webp', caption: {de: 'Meine Welt', en: 'My world'}}
  ]
}
```

### Weitere Typen

| Typ | Benötigte Daten | Ergebnis |
|---|---|---|
| `cards` | `items` mit `title`, `text`, optional `icon`/`tag` | 3-spaltige Feature-Karten |
| `story` | `intro`, optional `quote`, `chips` | Vision mit futuristischer Konsole |
| `timeline` | `items` mit `phase`, `state`, `title`, `text` | Roadmap-Abschnitte |
| `faq` | `items` mit `question`, `answer` | Ausklappbare FAQ |
| `connect` | `serverAddress` aus der Hauptkonfiguration | Minecraft-IP mit Kopieren-Button |
| `text` | `text`, optional `intro` | Text-Section |
| `gallery` | `items` mit `image`, `caption` | Screenshot-Galerie |

**Wichtig:** Beim Einfügen eines weiteren Elements in `sections` muss zwischen benachbarten JavaScript-Objekten jeweils ein Komma stehen. `id` muss einmalig sein; aus allen aktiven Sections entsteht automatisch die Navigationsleiste.

## Andere Projektseiten ohne neue Domains

1. Kopiere `projects/_vorlage/` als `projects/MEINPROJEKT/`.
2. Gestalte dort `index.html` und `project_style.css`, bearbeite die Inhalte in `project_data.js`.
3. Gehe in `data.js` und füge eine Projektkarte hinzu oder ergänze bei einer vorhandenen Karte `page`.

```javascript
{
  id: 'meinprojekt',
  title: 'Mein neues Projekt',
  subtitle: 'Neue Idee',
  category: 'games',             // games, websites, minecraft-mods, minecraft-server
  type: 'Game',
  status: 'In Entwicklung',
  featured: false,
  theme: 'cyan',
  icon: 'game',
  description: 'Meine eigene Projektseite',
  tags: ['Unity', 'Game'],
  locked: 'yes',                 // oder 'no' für öffentlich
  code: 'MEIN-PROJEKTCODE',
  page: 'projects/MEINPROJEKT/', // lokale Unterseite, KEIN externer URL-Link
  en: {subtitle: 'New idea', type: 'Game', status: 'In development', description: 'My own project page'}
}
```

Kein `url`-Eintrag nötig. Die Unterseiten verwenden denselben GitHub-Pages-Host, etwa `https://USERNAME.github.io/REPOSITORY/projects/MEINPROJEKT/`.

## Veröffentlichung

Den **Inhalt** der ZIP (nicht den ZIP-Ordner als Unterordner) in den Root deines GitHub-Pages-Repositories laden. Danach unter **Settings → Pages** `Deploy from a branch`, `main`, `/(root)` auswählen. `index.html` muss im Root liegen. Die relativen Pfade funktionieren auch in Projekt-Repositories.

## Wichtige Sicherheitshinweise

GitHub Pages ist öffentliches statisches Hosting. Projektcodes in `data.js` sind im Browser sichtbar, und Unterseiten sind über direkte Adressen unabhängig von der UI-Sperre erreichbar. Das Feature ist **kein echter Passwortschutz**. Keine geheimen Daten oder API-Schlüssel auf diese Weise veröffentlichen. Ein Minecraft-Server selbst wird nicht auf GitHub Pages betrieben; nur seine Informationswebsite.

Der Status `BETA TESTS` ist manuell gepflegt, kein Online-Statuscheck. Versionsangaben sind bewusst leer, solange sie nicht bestätigt wurden.
