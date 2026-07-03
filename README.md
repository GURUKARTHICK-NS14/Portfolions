# Guru Karthick N S — Portfolio

Bold "mass poster" personal-brand portfolio — black background, crimson + gold accents, huge condensed poster typography, duotone hero photo with a scan-light sweep and a CGPA seal badge, ghost numerals behind each section, scroll-reveal animations, animated counters/skill bars, cursor glow, and a certificate gallery with lightbox.

## Structure
```
portfolio/
├── index.html          # all page content
├── css/
│   └── style.css       # design system + animations
├── js/
│   └── script.js       # cursor glow, scroll effects, counters, lightbox
└── assets/
    ├── img/
    │   └── profile.jpg  # hero photo
    ├── certs/            # certificate images used in the Certifications section
    └── resume/
        └── Guru_Karthick_NS_Resume.pdf  # downloadable resume (nav, hero & contact buttons)
```

## Run it
Just open `index.html` in any browser — no build step needed.

For local development with live reload, you can also run:
```
npx serve .
```
from inside the `portfolio` folder.

## Customize
- **Colors / fonts / gradient** → top of `css/style.css` under `:root` (`--red`, `--gold`, `--grad`).
- **Hero photo** → replace `assets/img/profile.jpg` with a new image (same filename, or update the `<img src>` in `index.html`).
- **Projects / certs / experience content** → edit directly inside `index.html`, each section is clearly commented.
- **Add a new certificate** → drop the image in `assets/certs/`, then copy an existing `.cert-card` block in the Certifications section of `index.html` and update the `data-*` attributes + image path.

## Deploy
Works as-is on GitHub Pages, Netlify, or Vercel — it's a static site, just upload the whole `portfolio` folder.
