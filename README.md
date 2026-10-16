# Hutame UI documentation

Static, responsive Turkish documentation for Library.lua. No build step or npm dependency.

## Preview

Run `python -m http.server 4173 --directory docs` from this repository and open http://localhost:4173.

## Publish on GitHub Pages

Push these files to GitHub. In **Settings → Pages**, select **Deploy from a branch**, branch **main**, directory **/docs**, then save. The expected address is https://hutamev2.github.io/Hutame-new-lib/ after deployment succeeds.

All asset URLs are relative; hash routes support project subpaths and direct navigation. `.nojekyll` disables Jekyll processing. The site requires JavaScript. Google Fonts are optional and have system-font fallbacks.

## Edit

- `docs/content.js`: guides, API examples and property tables.
- `docs/app.js`: navigation, search, copying and illustrative web demos.
- `docs/style.css`: responsive layout, themes and accessibility styles.

Examples were checked against the local Library.lua source. Web demos simulate controls; they do not execute Roblox or validate Luau runtime behavior. Review examples when updating the library.
