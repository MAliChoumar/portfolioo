# choumar.is-a.dev

Portfolio of **Mohamad Ali Choumar** — Software Engineering student at the
University of Duisburg-Essen, Essen, Germany.

🌐 **[choumar.is-a.dev](https://choumar.is-a.dev)** · 🇩🇪 German / English

🇩🇪 **Ich spreche fließend Deutsch** und suche eine Werkstudenten- oder
Praktikumsstelle im Ruhrgebiet.

---

## What is here

Eleven sections, each built around one idea rather than a generic card grid:

| Section | What it is |
|---|---|
| **Anlagenschema** | A live schematic of the real projects, languages and tools, and the actual relations between them. Hovering a node lights its connections. |
| **Prüfstand** | Nine claims, each attached to something checkable — commit counts, quality gates, a system in production. |
| **Projekte** | Milano Pizzeria (live), ChoumarOS (private), a Verein website in progress. |
| **Studienverlauf** | The official B.Sc. Software Engineering course plan, colour-coded by discipline. |
| **Werkzeugwand** | Tools on a shadow board, each marked with where it was actually used. No percentage bars. |
| **Leitstand** | How the work is done: specify → execute → verify → answer for it. |
| **Sprachen** | Placed on the CEFR scale, not on invented dots. |
| **Prüfprotokoll** | The site's own search configuration, as an inspection report. |
| **Kontakt** | A work-order form and a nameplate with a vCard QR. |

## Built with

Plain HTML, CSS and JavaScript — no framework, no build step. The animated
background and the schematic are Canvas 2D. Fonts are Bricolage Grotesque and
IBM Plex. Hosted on GitHub Pages over HTTPS on a custom domain.

Roughly **244 KB** in total, down from 993 KB before the rebuild — the previous
version loaded 601 KB of Three.js for a decorative background alone.

## Structure

```
index.html         the portfolio
cv.html            the CV — one A4 page, print to PDF from the page itself
datenschutz.html   privacy notice (DSGVO)
404.html
assets/app.css     design tokens and every section
assets/app.js      schematic, terminal, i18n, interactions, contact form
kontakt-endpoint/  serverless function behind the contact form (deploys separately)
```

## Contact form

The form posts to a small serverless function that relays the message to
e-mail and stores nothing. If that endpoint is unreachable for any reason the
form does not dead-end — it offers a pre-filled mail draft instead, so a
visitor can always get through. See `kontakt-endpoint/README.md`.

## Licence

MIT — see [LICENSE](LICENSE).
