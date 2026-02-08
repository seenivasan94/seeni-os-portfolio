# SEENI.OS by CINI Systems

Offline-first personal portfolio. Pure HTML, CSS, and vanilla JavaScript. No backend, no frameworks. Netlify-ready. Brand-preview theme system and Codester profile integration.

## Folder structure

```
SEENI.OS/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── profile.jpg
│   └── projects/
│       └── (optional product screenshots)
└── README.md
```

---

## 1. How to deploy on Netlify

1. Push this folder to a Git repository (GitHub, GitLab, or Bitbucket).
2. Log in to [Netlify](https://www.netlify.com) and click **Add new site** → **Import an existing project**.
3. Connect the repository and select this project. Netlify will detect it as a static site.
4. Build settings:
   - **Build command:** leave empty
   - **Publish directory:** `/` (root)
5. Click **Deploy site**. The site will be live at a `*.netlify.app` URL. You can add a custom domain in **Domain settings**.

---

## 2. How the theme system works

The site includes a **brand-preview theme system** so visitors can preview how the portfolio (and by extension, your product branding) can look in different styles.

- **Where:** Click the gear icon in the **top navbar** to open the theme side panel (slides in from the right).
- **Panel title:** "Preview Your Brand Theme" with the description "Select a theme to preview how your product can look."
- **Presets:** Eight round-style preset buttons: Startup Blue, SaaS Purple, Fintech Green, Business Orange, Premium Red, Dark Pro (Default), Clean Light, Midnight Cyan.
- **On click:** The theme is applied instantly across the whole site (buttons, badges, borders, highlights, cards, navbar) using CSS variables. A 0.3s transition runs for a smooth change.
- **Persistence:** The chosen theme is saved in `localStorage` under the key `seenios-theme` and restored on reload.
- **Toast:** After a theme change, a small toast message appears: "Theme applied. Imagine your product in this style." It auto-hides after 2 seconds.
- **Active state:** The currently selected theme is highlighted in the side panel.

All theme styling is driven by CSS variables (`--primary`, `--secondary`, `--accent`, `--bg`, `--card-bg`, `--text`, `--muted`, `--border`, `--accent-soft`) defined per `[data-theme="..."]` in `css/style.css`.

---

## 3. How to add new themes

1. **CSS:** In `css/style.css`, add a new block, e.g. `[data-theme="your-theme-id"]`, and set the same variables used by other themes: `--primary`, `--secondary`, `--accent`, `--bg`, `--card-bg`, `--text`, `--muted`, `--border`, `--accent-soft`. Use another theme as a template.
2. **Side panel:** In `index.html`, inside the `<div class="theme-presets">` in the theme side panel, add a new button:
   ```html
   <button type="button" class="theme-preset" data-theme="your-theme-id" aria-label="Your Theme Name" title="Your Theme Name"><span class="theme-preset-dot"></span><span class="theme-preset-label">Your Theme Name</span></button>
   ```
3. **Dot color:** In `css/style.css`, add a rule for the dot, e.g. `.theme-preset[data-theme="your-theme-id"] .theme-preset-dot { background: #yourcolor; }`.
4. **JavaScript:** In `js/main.js`, add `'your-theme-id'` to the `VALID_THEMES` array so the theme can be applied and saved.

---

## 4. Codester Link System

The official Codester profile URL is **locked** and is the only Codester URL used on the site. All Codester buttons open this profile in a new tab; there are no item-specific or guessed URLs, so users never hit a Codester /error page.

**Locked profile URL:**  
In `js/main.js`, the constant `CODESTER_PROFILE_URL` is set to `https://www.codester.com/seenivasan/`. This is the single source of truth. Every Codester button uses it.

**How buttons work:**  
In `index.html`, Codester buttons do not have real `href` values. They use `href="#"` and `data-codester="true"`. On click, JavaScript prevents the default action and runs `window.open(CODESTER_PROFILE_URL, "_blank", "noopener,noreferrer")`. No conditions, no fallback logic, no validation—every click goes to the official profile. A toast message "Opening official Codester store" is shown for 1.5 seconds.

**Safety override:**  
If any script (or injected link) tries to open a Codester URL that contains `/error`, the script overrides `window.open` and redirects such requests to `CODESTER_PROFILE_URL` instead. On DOM ready, any existing links in the page that point to Codester and are invalid (e.g. contain /error) are replaced with the profile URL.

**How to update in future:**  
To change the official profile URL, edit `CODESTER_PROFILE_URL` at the top of `js/main.js` to the new profile URL (e.g. `https://www.codester.com/yourusername/`). Redeploy. Do not add item links or other Codester URLs; the architecture is profile-only to avoid broken or error pages.

---

## 5. How to customize branding

- **Name, role, tagline:** Edit the hero section in `index.html` (`.hero-name`, `.hero-brand`, `.hero-role`, `.hero-tagline`).
- **Colors and feel:** Use the theme system (see sections 2 and 3). Each theme is a set of CSS variables; duplicate a `[data-theme="..."]` block in `css/style.css` and adjust the variable values.
- **Logo/brand text:** The brand link in the navbar is the text "SEENI.OS" in `.brand` in `index.html`. You can change the text or replace it with an image by editing the navbar markup and adding an `img` with your logo.
- **Contact email:** The Netlify form notification is configured in the Netlify dashboard (see section 7). The visible contact section (e.g. reply time) is in `index.html` in the contact panel.

---

## 6. How to add App / Web / SaaS products

Projects are grouped into four categories in `index.html` (section `id="projects"`): Mobile Apps, Web Applications, Admin Dashboards, SaaS Platforms.

To add a product: copy an existing `<article class="product-card">...</article>` inside the right category grid. Edit title, category badge (`badge-app`, `badge-web`, `badge-dashboard`, `badge-saas`), role, stack, use case, status, and keep the Codester button as `<a href="#" class="btn-codester" data-codester="true">View on Codester</a>`. The button opens the official Codester profile (see section 4). Optional: add or update the screenshot in `.product-card-image-wrap` with `src="assets/projects/your-image.jpg"`.

---

## 7. How the contact form works

The contact form uses Netlify form handling (`name="contact"`, `method="POST"`, `data-netlify="true"`, and hidden `form-name`). Fields: Name, Email, Message, Submit.

To receive submissions at **seenivasan813@gmail.com**: deploy on Netlify (section 1), then in **Site dashboard** → **Site configuration** → **Forms** → **Form notifications** → **Add notification** → **Email notification**, choose the form **contact** and set the email to **seenivasan813@gmail.com**.

---

## 8. How to update highlights and profile photo

**Highlights:** In `index.html`, find the section `id="highlights"` and the `<ul class="highlights-list">`. Edit or add `<li>` items.

**Profile photo:** Replace `assets/profile.jpg` or use the in-site "Change Photo" (preview only; to persist, replace the file and redeploy). Clicking the profile image opens a fullscreen modal; close with ×, Escape, or clicking outside.

---

## Running locally

Open `index.html` in a browser, or run:

```bash
npx serve .
```

Then open the URL shown (e.g. `http://localhost:3000`). The site works offline once loaded.
