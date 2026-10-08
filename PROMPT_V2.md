# Coding prompt — AH Solutions website (more verifiable version)

You are a senior frontend engineer, accessibility specialist, and technical content editor.

Build or improve a **real static public website** for `https://ahsolutions.tech/` using the attached project as the codebase. The website supports an early-stage startup application, but **approval is not guaranteed** and must never be claimed. Your job is to communicate only verifiable truth, not to optimize for gaming an AI reviewer.

## Verified facts (do not expand beyond these)
- Brand: AH Solutions.
- Contact: `anhdt@ahsolutions.tech`.
- Domain: `https://ahsolutions.tech/` (canonical), redirect `www` to apex.
- AH Solutions is an early-stage technology project exploring practical software and AI applications.

## Product facts to collect before final copy
- Product name (if real): `[TO BE PROVIDED]`.
- Founder identity and permission to publish: `[TO BE PROVIDED]`.
- Target user: `[TO BE PROVIDED]`.
- Real-world problem: `[TO BE PROVIDED]`.
- Proposed solution and features: `[TO BE PROVIDED]`.
- Current stage and proof: `[TO BE PROVIDED]`.
- Actual technologies in use: `[TO BE PROVIDED]`.
- Actual usage of Claude/API (if any): `[TO BE PROVIDED]`.

**Do not convert missing facts into invented claims.** If the product facts are missing, make it explicit that the team is exploring a direction, and add a clearly separated author-facing checklist for the founder. Never render bracketed placeholders to visitors.

## Design & content
- Premium, minimal, technical, mobile-first presentation with an original visual identity, not copied from other companies.
- Prioritize one focused `What we're building` section that describes target user → pain → actual solution → stage → genuine AI use. If information is missing, describe only the verified exploration stage.
- Include sections: Hero, About, Product/Focus, Approach/Technology (only if substantiated), Vision, Contact, Footer.
- Clear, operational language. No fabricated customers, user numbers, funding, investors, team, offices, logos, awards, AI partners, live features, testimonials, screenshots or traction.
- Do not use Anthropic/Claude logo or imply Claude partnership. Mention Claude only if usage can be substantiated.
- Never add a working contact form unless a real backend and privacy/consent handling are available. An honest `mailto:` link is fine.

## Technical quality
- Prefer Vite + semantic HTML + minimal TypeScript/CSS, or a static-site generator that generates **real HTML at build time**. A client-rendered React SPA without prerendering is NOT acceptable, because actual product text must appear in HTTP-served HTML even when JS does not execute.
- Implement title, SEO description, canonical, OG/Twitter metadata, favicon, robots.txt, sitemap.xml, valid HTTPS-ready URLs.
- Responsive layout, semantic headings, keyboard access, focus-visible states, adequate contrast, reduced-motion support, no horizontal overflow.
- No backend, database, logins, paid assets, external fonts or external API calls for the marketing page.
- README must document VS Code development, production build, GitHub push, Cloudflare Pages Git deployment, custom apex domain, safe DNS changes preserving Cloudflare Email Routing MX/SPF/DKIM, HTTPS, `www` redirect, and post-launch checks.

## Acceptance criteria
1. `npm install` and `npm run build` complete successfully.
2. Visit page source: all visible headings and product content are present without JavaScript.
3. On mobile and desktop, all anchors and mailto links work with keyboard and touch.
4. `ahsolutions.tech` links, metadata, sitemap, and robots are correct.
5. The public site contains **no invented company/product claim**, and statements match the later startup application.
6. Explain precisely what cannot be verified or completed without Cloudflare/GitHub account access. Do not claim deployment was performed unless confirmed.

Final deliverable: full runnable project, setup instructions for a beginner on Windows, and a list of factual questions the founder must answer before submitting any application.
