# AH Solutions — public startup website

Production-oriented single-page static site for https://ahsolutions.tech/.

**Important:** The provided copy is a transparent *exploration-stage placeholder*. It is not a claim of an existing MVP, established company, AI integration, customers, or Claude usage. Update the product section with real, supportable details **before** using the site for a startup application.

## Why Vite + semantic HTML + small TypeScript, instead of a React SPA?

All main content is directly in `index.html` and therefore readable by crawlers and by users who disable JS. React-only client-side rendering can leave HTML nearly empty before scripts execute. React is unnecessary for this one-page website. `src/main.ts` only closes the mobile nav after navigation and on Escape.

## 1. Requirements

- Node.js 20.19+ or 22.12+ (https://nodejs.org/), Git, VS Code
- A GitHub account and a Cloudflare account (same account that manages the domain)

## 2. Run locally

Open the extracted folder in VS Code → Terminal → New Terminal:

```bash
npm install
npm run dev
```

Open the localhost URL printed by Vite. This URL works only while the local dev server is running.

Check the production build:

```bash
npm run build
npm run preview
```

The production static website is created in `dist/`.

## 3. Edit real company details BEFORE applying

Edit `index.html` (especially Hero, `#product`, `#approach`, `#vision`, and Contact):

- [ ] Choose one genuinely pursued product direction and name it only if real.
- [ ] State the real intended users and problem being solved.
- [ ] Describe actual functionality, current stage and evidence, if any.
- [ ] Explain real Claude integration *only if* actually used (do not imply Anthropic partnership).
- [ ] Add real founder details only with approval.
- [ ] Review every fact and remove anything unsupported.
- [ ] Confirm the email `anhdt@ahsolutions.tech` receives email.
- [ ] If you change the page title or summary, update SEO & OG tags.
- [ ] Use approved screenshots of a **real** prototype only if available.

IMPORTANT: The current "product" section deliberately states a direction in exploration; it is not sufficient evidence of a developed product by itself.

## 4. Push to GitHub

Create a private or public GitHub repository named `ahsolutions-website` (leave initialization unchecked if uploading with Git). From the VS Code Terminal in this folder:

```bash
git init
git add .
git commit -m "Create AH Solutions website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ahsolutions-website.git
git push -u origin main
```

Replace `YOUR_USERNAME`. Authenticate using the GitHub browser credential manager or a supported token; GitHub does not accept normal account passwords for Git HTTPS pushes.

## 5. Cloudflare Pages deployment

1. Log in at https://dash.cloudflare.com/.
2. Open **Workers & Pages** → **Create application** → **Pages** → **Connect to Git** / **Import an existing Git repository** (Cloudflare UI wording may vary).
3. Connect your GitHub account and choose `ahsolutions-website`.
4. Production branch: `main`.
5. Framework preset: **Vite** (or None if unavailable).
6. Build command: `npm run build`.
7. Build output directory: `dist`.
8. Deploy. Verify `https://YOUR_PROJECT.pages.dev` loads.
9. Open Pages project → **Custom domains** → **Set up a domain** → enter `ahsolutions.tech`. The Cloudflare zone for your apex domain must be active in the same account. Follow the automatic DNS instructions.
10. Open `https://ahsolutions.tech` and confirm HTTPS works.

Do not replace MX/TXT records created by Cloudflare Email Routing. Website DNS records (A/CNAME for @/www) and email records (MX/SPF/DKIM) serve different purposes. Avoid overwriting existing DNS records until you understand them.

### WWW redirect → apex

Cloudflare's recommended Pages-specific instructions: https://developers.cloudflare.com/pages/how-to/www-redirect/

Use **Bulk Redirects** to redirect `www.ahsolutions.tech` → `https://ahsolutions.tech` (301, preserve subpath and query string), and create a **proxied** DNS entry for `www` as their guide instructs. Do not create a competing `www` record and Pages custom domain at the same time without first checking configuration.

## 6. Changes are automatic

Once Pages is connected to GitHub, this is the full editing loop:

1. Edit files in VS Code.
2. Test with `npm run build`.
3. `git add .`
4. `git commit -m "Update product details"`
5. `git push`

Cloudflare automatically rebuilds and publishes when `main` is updated. You can close VS Code and turn off your computer: Cloudflare hosts the static files. No Windows computer, local server, VPS, or paid hosting is needed for this static site.

## 7. Test before applying

- https://ahsolutions.tech/ loads with a valid HTTPS certificate on mobile and desktop.
- https://www.ahsolutions.tech/ redirects to the apex domain.
- `View Page Source` shows all text under `#product` (not an empty SPA shell).
- All navigation anchors work.
- Mailto link opens the local mail app (and the destination inbox receives mail).
- https://ahsolutions.tech/robots.txt and /sitemap.xml work.
- https://ahsolutions.tech/favicon.svg and /og-card.png load.
- There are no placeholders in public text, fake metrics, fake screenshots or invented claims.
- The information in the startup application matches the website.

## Email note

Cloudflare Email Routing forwards **incoming** email, and is not itself a conventional full mailbox/SMTP service for composing mail as `anhdt@ahsolutions.tech`. If you need to send replies using the domain address, configure a legitimate outbound email provider and its DKIM/SPF/DMARC as appropriate. Verify the receiving address independently.

## Source links

- Pages Git deploy: https://developers.cloudflare.com/pages/get-started/git-integration/
- Pages domains: https://developers.cloudflare.com/pages/configuration/custom-domains/
- Pages www redirect: https://developers.cloudflare.com/pages/how-to/www-redirect/
- Cloudflare Email Routing: https://developers.cloudflare.com/email-service/get-started/route-emails/
- Claude Startups: https://claude.com/programs/startups
