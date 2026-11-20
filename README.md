# Portfolio / CV Website

An interactive, zero-dependency portfolio. **All content lives in [`js/data.js`](js/data.js)**. You don't need to touch the HTML.

## Run it
- Double-click `index.html`, **or**
- Use VS Code's "Live Server" extension, **or**
- `python -m http.server` and open http://localhost:8000

## Customize
| What | Where in `js/data.js` |
|---|---|
| Name, roles (typing effect), photo, CV PDF, accent color | `profile` |
| Social links (`github`, `linkedin`, `instagram`, `mail`, `youtube`, `twitter`, `link`) | `socials` |
| Bio + animated counters | `about` |
| Skill bars, grouped into tabs | `skills` |
| Work & project roles timeline | `experience` |
| Schools, organizations, certifications timeline | `education` |
| **Projects** | `projects` |
| Contact text and optional Formspree endpoint | `contact` |

## Adding a finished project
1. Put screenshots in `assets/projects/`.
2. Add an object to the `projects` array:
```js
{
  title: "My New Project",
  date: "2026-12-01",            // newest date becomes the "Latest project" spotlight
  status: "finished",            // or "in-progress"
  category: "Web",               // becomes a filter button automatically
  summary: "One-line description for the card.",
  description: "Longer description shown in the popup.",
  highlights: ["Key result 1", "Key result 2"],
  tech: ["React", "Firebase"],   // searchable
  image: "assets/projects/cover.jpg",
  gallery: ["assets/projects/shot1.jpg", "assets/projects/shot2.jpg"],
  links: { demo: "https://...", repo: "https://github.com/..." },
}
```

## Features
- Typing role animation, morphing avatar, 3D tilt, cursor glow, interactive particle background
- Light/dark theme (remembered), scroll progress, active nav, mobile menu
- Skill tabs with animated bars, animated stat counters, timeline
- Auto "Latest project" spotlight, category filters, live search, and a detail popup with gallery and prev/next (← → keys, Esc)
- Contact form (opens the visitor's email app, or posts to Formspree if you set `formEndpoint`), click-to-copy email
- Responsive, respects reduced-motion, print-friendly (Ctrl+P makes a quick CV)

## Deploy
Push the folder to GitHub and enable **GitHub Pages**, or import it on **Vercel** / **Netlify** with no build settings.
