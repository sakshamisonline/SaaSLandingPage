# Prodigy — SaaS Landing Page

A modern, animated landing page concept for a fictional project management SaaS called **Prodigy**. Built as a portfolio/practice project to showcase front-end UI design and scroll-based motion design with GSAP.

> ⚠️ **Note:** This is a self-initiated portfolio project, not a real product or client project. "Prodigy," the pricing, testimonials, and company logos are fictional and used only to demonstrate design and animation skills.

![Prodigy landing page preview](assets/screenshots/hero.png)

## 🔗 Live Demo

[View live demo](#) <!-- replace with your GitHub Pages / Netlify / Vercel link -->

## Features

- **Cinematic scroll-pinned hero animation** — a dashboard mockup travels, scales, and exits as you scroll, built with GSAP's `ScrollTrigger` (pin + scrub), not CSS alone
- Smooth entrance animations across every section (features, pricing, testimonials, CTA) using scroll-triggered reveals and staggering
- Glassmorphism UI cards with a consistent navy/amber design system
- Fully responsive layout (breakpoint at 900px for tablet/mobile)
- Respects `prefers-reduced-motion` for accessibility
- Sections included: Navbar, Hero, Logos strip, Features grid, How it works, Pricing, Testimonials, CTA banner, Footer

## 🛠️ Tech Stack

- **HTML5** — semantic structure
- **CSS3** — custom properties (design tokens), Flexbox/Grid, media queries
- **JavaScript (Vanilla)** — animation orchestration
- **[GSAP 3](https://gsap.com/)** + **ScrollTrigger** plugin — scroll-based and entrance animations
- **Google Fonts** — Syne (display), Inter (body)

## 🎬 About the Scroll Animation

The hero section uses a single GSAP timeline driven by `ScrollTrigger` with `pin: true` and `scrub`, so the dashboard mockup's position, scale, and rotation are all tied directly to scroll progress rather than separate triggers — this avoids the common "jump/flicker" bugs you get from mixing CSS `position: sticky` with independent scroll animations.

## ⚠️ Known Limitations

- All CTA buttons (`Get started`, `Start for free`, etc.) are placeholder links (`href="#"`) — there's no backend or signup flow
- Only one responsive breakpoint (900px); very small phone screens (<375px) aren't specifically optimized
- Testimonials, company logos, and user counts are fictional, used for layout/demo purposes only

## 📄 License

This project is open for learning/reference purposes. Feel free to fork and adapt it.

---

Built by Saksham as a portfolio project.
