# Local browser dependencies

Both language versions load Bootstrap and the icon font from this repository.
There is no build step, CDN dependency for UI components, or jQuery dependency.

| Dependency | Version | Source | License |
| --- | --- | --- | --- |
| Bootstrap CSS and JavaScript bundle (includes Popper) | 5.3.8 | https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/ | `bootstrap-5.3.8/LICENSE` |
| Glyphicons Halflings font and used CSS rules | Bootstrap 3.4.1 distribution | https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/ | `glyphicons/LICENSE` |

Bootstrap distribution files are unmodified, including CSS and JavaScript source
maps. The files match the official Bootstrap 5.3.8 SHA-384 integrity values.
The standalone `glyphicons/css/glyphicons.css` contains only the font-face,
base icon rule and icons used by this site, extracted from Bootstrap 3.4.1.
Its font files are unchanged. No Bootstrap 3 component CSS or JavaScript is loaded.

Load the Bootstrap stylesheet, then the Glyphicons stylesheet, then the site
stylesheet. The deferred Bootstrap bundle runs before `scripts/site.js`, which
handles scrollspy and reveal animations without jQuery. Native anchor links and
CSS provide smooth scrolling; reduced-motion preferences are respected.

Google Fonts remain external HTTPS stylesheets. Google Maps uses an HTTPS iframe
for the original coordinates, with localized titles and lazy loading; no Google
Maps JavaScript API key is required. External fonts and maps still need a network
connection. The site remains a static GitHub Pages site.

## Migration checkpoints

- `dec420c`: Bootstrap 3.3.7 to 3.4.1, preserving the original HTML components.
- The next migration replaces the UI components with Bootstrap 5.3.8 and removes
  jQuery. Site CSS preserves the original colors, typography and spacing.
- The content grid still changes to columns at 768px. The long navbar expands at
  1200px so that it does not wrap over the page title on narrower screens.

## Local preview

Run `python3 -m http.server 8765 --bind 127.0.0.1` from the repository root.
Check `/` and `/en/index.html`, including direct `#pricing` links, mobile navigation,
carousel arrows/indicators, all three modal dialogs and the map below contact.
