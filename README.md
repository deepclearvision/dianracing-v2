# Dhian Singh Pahal — Official Website

Static website for Dhian Singh Pahal, 2025 Wera Tools British MicroMax Champion.
Built to be fast, dependency-free and easy to host anywhere.

## Structure

- `index.html` — Home
- `about.html` — The Driver
- `racing.html` — Racing record, awards, gallery
- `road-to-f1.html` — The pathway to Formula 1
- `media.html` — Press coverage and videos
- `partnership.html` — Sponsorship programme + enquiry form
- `assets/css/styles.css` — all styling (one file)
- `assets/js/main.js` — menu, scroll effects, enquiry form
- `assets/img/` — optimised images
- `assets/video/` — award/broadcast clips

## Editing content

- Every page is plain HTML. Open any `.html` file in a text editor.
- Colours and fonts are defined once, as variables at the top of
  `assets/css/styles.css`.
- The enquiry form on `partnership.html` deliberately sends nothing from the
  server — it composes a message and hands it to the visitor's own email app,
  so no backend is required.

## Hosting

This folder is a complete site. Any static host works:

- **Netlify / Vercel / Cloudflare Pages** — drag this folder in.
- **GitHub Pages** — push the folder to a repo and enable Pages.
- **Any web server** — upload the folder contents to the server root.

## Notes for the team

- The wordmark in the header is typographic. To use the official logo file,
  replace the `.brand` block in each page's header (and footer) with an
  `<img>` pointing at your logo file in `assets/img/`.
- Images in `assets/img/gallery-*` came from the "piks 1" folder. The larger
  photos in "piks 2" were not used yet — pick your favourites and add them to
  the gallery on `racing.html` following the existing pattern.
- Contact details, social links and partner tiers live on `partnership.html`
  and in the footer of every page.
