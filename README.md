# S. Seenivasan Shanmugam — Portfolio

Professional portfolio website for an independent product builder showcasing live SaaS platforms, client production systems, marketplace products, and career experience.

**Live demo:** [https://sseenivasan-portfolio.netlify.app](https://sseenivasan-portfolio.netlify.app)

---

## Description

This repository contains the source code for a static, production-ready portfolio site. It highlights real-world projects including DraftMyDocu, GetBizora, and SJ Clothing, along with case studies, product catalog presentation, and a downloadable resume page.

The site is optimized for performance, responsive layouts, SEO metadata, and continuous deployment through Netlify.

---

## Features

- Responsive, mobile-friendly layout with dark/light theme toggle
- Founder hero section with profile photo and project highlights
- Featured work showcase with premium UI mockups
- Case studies with problem, solution, stack, and result sections
- Bento-style product portfolio grid
- Experience, education, skills, and contact sections
- Printable resume page (`assets/resume.html`)
- Scroll reveal animations and interactive project collage
- SEO meta tags and JSON-LD structured data

---

## Tech Stack

- **HTML5**
- **CSS3** (custom properties, responsive grid/flex layouts)
- **JavaScript** (vanilla ES6+, no frontend framework)
- **Netlify** for hosting and Git-based deployment

---

## Live Demo

[https://sseenivasan-portfolio.netlify.app](https://sseenivasan-portfolio.netlify.app)

---

## Installation

### Prerequisites

- A modern web browser
- [Git](https://git-scm.com/) (optional, for cloning)
- [Node.js](https://nodejs.org/) (optional, for local static server)

### Clone the repository

```bash
git clone https://github.com/seenivasan94/seeni-os-portfolio.git
cd seeni-os-portfolio
```

### Run locally

**Option 1 — Open directly**

Open `index.html` in your browser.

**Option 2 — Local static server (recommended)**

```bash
npx serve .
```

Then open the URL shown in the terminal (for example `http://localhost:3000`).

---

## Project Structure

```
portfolio/
├── index.html              # Main portfolio page
├── css/
│   └── style.css           # Primary stylesheet
├── js/
│   └── app.js              # Theme, navigation, animations, counters
├── assets/
│   ├── resume.html         # Printable resume page
│   └── profile.jpg/        # Profile photo asset
├── README.md
└── LICENSE
```

Additional legacy files from earlier project iterations may exist in the repository but are not required for the current live site.

---

## Deployment

This project is deployed on **Netlify** with GitHub continuous deployment.

Recommended Netlify settings:

| Setting | Value |
|---------|-------|
| Build command | *(leave empty)* |
| Publish directory | `.` |

Push to the `main` branch to trigger automatic deployment.

---

## Contact

**S. Seenivasan Shanmugam**  
Independent Product Builder  
Tirupur, Tamil Nadu, India

- Email: [seenivasan813@gmail.com](mailto:seenivasan813@gmail.com)
- Portfolio: [https://sseenivasan-portfolio.netlify.app](https://sseenivasan-portfolio.netlify.app)
- LinkedIn: [linkedin.com/in/seeni-vasan-29076339b/](https://www.linkedin.com/in/seeni-vasan-29076339b/)
- Codester: [codester.com/seenivasan](https://www.codester.com/seenivasan)

---

## License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## Security Notes

This repository is intended to be public. Do not commit:

- `.env` files
- API keys or tokens
- Passwords or private credentials
- Sensitive client data

Contact details displayed on the public portfolio are intentional business contact information.
