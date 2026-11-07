# Local browser dependencies

Both `index.html` and `en/index.html` load these files from this repository,
so the layout, icons and Bootstrap controls do not depend on a CDN.
Bootstrap has been upgraded within the compatible 3.x series. jQuery is unchanged.

| Dependency | Version | Source | License |
| --- | --- | --- | --- |
| Bootstrap (CSS, JavaScript, Glyphicons fonts) | 3.4.1 | https://cdn.jsdelivr.net/npm/bootstrap@3.4.1/dist/ | `bootstrap-3.4.1/LICENSE` |
| jQuery | 1.12.2 | https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js | `jquery-1.12.2/LICENSE.txt` |

Files are copied without modification. Bootstrap's CSS source map is included.
Keep the `css/` and `fonts/` directories beside each other: the stylesheet
references the icon fonts using relative paths. Load jQuery before Bootstrap.

Google Fonts remain external and are requested over HTTPS.
The existing Google Maps integration is unchanged; it needs a separate API-key
configuration update before it can work on the HTTPS site.
Bootstrap 3.4.1 is the compatibility checkpoint before the Bootstrap 5 migration.
