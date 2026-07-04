// ===== Register GSAP plugins =====
gsap.registerPlugin(ScrollTrigger);

// ===== Hero entrance sequence (on load) =====
const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

heroTl
  .from(".hero__badge",       { opacity: 0, y: 20, duration: 0.6 })
  .from(".hero__title",       { opacity: 0, y: 40, duration: 0.7 }, "-=0.3")
  .from(".hero__sub",         { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
  .from(".hero__actions",     { opacity: 0, y: 20, duration: 0.5 }, "-=0.3")
  .from(".hero__social-proof",{ opacity: 0, duration: 0.4 },        "-=0.2")
  .from(".mockup", {
    opacity: 0,
    y: 60,
    rotateY: -20,
    rotateX: 8,
    duration: 1,
    ease: "power2.out"
  }, "-=0.8");

// ===== CINEMATIC MOCKUP SCROLL SEQUENCE (desktop only) =====
// The pinned scroll-scrub sequence below only runs on screens wider
// than 900px. Mobile browsers resize the viewport as the address bar
// hides/shows while scrolling, which corrupts GSAP's pin measurements —
// and pinned "scroll-jacking" fights normal touch scrolling anyway.
// Below 900px we skip pinning entirely and use a simple reveal instead
// (see the mobile branch further down).

const scene = document.querySelector(".hero-scene");
const mm = gsap.matchMedia();

mm.add("(min-width: 901px)", () => {
  // One timeline = one source of truth for the whole cinematic sequence.
  // GSAP's own `pin: true` replaces the old CSS `position: sticky` on
  // .hero — this is what fixes the "vanishes at center / never comes
  // back" bug, because pin duration and scrub progress are now driven
  // by the exact same trigger instead of two systems that disagreed.
  //
  // Positions below (0, 0.3, 0.65, 0.8 ...) are fractions of the total
  // scene scroll distance — same relative timing as before, just unified.
  const heroScrollTl = gsap.timeline({
    scrollTrigger: {
      trigger: scene,
      start: "top top",
      end: "bottom top",
      scrub: 0.4,        // lower = tracks the scrollbar more tightly, less "catch-up" lag
      anticipatePin: 1,   // primes the pin a tick early so engaging it doesn't jump/jerk
      pin: ".hero",
      invalidateOnRefresh: true
    }
  });

  heroScrollTl
    // Text fades out over the first stretch — unchanged
    .to(".hero__content", { opacity: 0, x: -60, duration: 0.3, ease: "power2.in" }, 0)

    // Continuous motion, no held/static middle. Using fromTo() with explicit
    // start AND end values (instead of to()) so GSAP never has to guess the
    // "current" value when it recalculates — that ambiguity is what let an
    // async web-font reflow corrupt the animation mid-scroll.
    // 0 → 0.5: mockup travels to center AND grows to its peak size
    .fromTo(".mockup",
      { x: 0, rotateY: -8, rotateX: 4, scale: 1 },
      {
        x: () => -(window.innerWidth * 0.18),
        rotateY: 0,
        rotateX: 0,
        scale: 1.15,
        duration: 0.5,
        ease: "power2.out"
      }, 0)
    // 0.5 → 1: continues seamlessly from center — shrinks back down while
    // sliding out left and fading.
    .fromTo(".mockup",
      { x: () => -(window.innerWidth * 0.18), scale: 1.15, opacity: 1 },
      {
        x: () => -(window.innerWidth * 0.75),
        scale: 0.85,
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      }, 0.5)

    // Grid fades out near the end of the scene
    .to(".hero__bg-grid", { opacity: 0, duration: 0.2 }, 0.8);
});

mm.add("(max-width: 900px)", () => {
  // No pinning, no scroll-scrub, no horizontal travel. The mockup just
  // sits in normal document flow (below the hero text) and gets a plain
  // fade/slide-up the first time it enters the viewport — same visual
  // language as every other section's reveal animation on this page.
  gsap.from(".mockup", {
    scrollTrigger: { trigger: ".mockup", start: "top 90%" },
    opacity: 0,
    y: 40,
    duration: 0.7,
    ease: "power2.out"
  });
});

// Web fonts (e.g. Miranda Sans) can load and reflow the page after
// ScrollTrigger has already measured everything. Doing one clean,
// deliberate refresh once fonts are actually ready avoids ScrollTrigger
// recalculating positions at a random, uncontrolled moment mid-scroll.
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => ScrollTrigger.refresh());
}

// ===== Navbar scroll shadow =====
ScrollTrigger.create({
  start: "top -80px",
  onEnter: () => document.getElementById("nav").style.boxShadow = "0 4px 30px rgba(0,0,0,0.4)",
  onLeaveBack: () => document.getElementById("nav").style.boxShadow = "none"
});

// ===== Logos strip =====
gsap.from(".logos__label, .logos__strip span", {
  scrollTrigger: { trigger: ".logos", start: "top 85%" },
  opacity: 0,
  y: 20,
  duration: 0.5,
  stagger: 0.08,
  ease: "power2.out"
});

// ===== Features cards — stagger in =====
gsap.from(".features__card", {
  scrollTrigger: { trigger: ".features__grid", start: "top 80%" },
  opacity: 0,
  y: 50,
  duration: 0.6,
  stagger: 0.12,
  ease: "power2.out"
});

// ===== Features parallax — odd/even drift =====
// Excludes .features__card--large (the two wide cards) — including them
// in the checkerboard drift is what let "Smart notifications" (even, drifts
// down) collide with "Integrates with your stack" (odd, drifts up) since
// they sit in adjacent rows and were drifting straight toward each other.
// Drift amount reduced from 40px to 16px — at 40px, cards in row 2
// (e.g. the 3rd card, which sits directly under the large 1st card)
// drifted upward past the 20px row gap and visually overlapped the
// row above. 16px stays comfortably inside the gap at all scroll points.
gsap.to(".features__card:not(.features__card--large):nth-child(odd)", {
  scrollTrigger: {
    trigger: ".features",
    start: "top bottom",
    end: "bottom top",
    scrub: 1.5
  },
  y: -16,
  ease: "none"
});
gsap.to(".features__card:not(.features__card--large):nth-child(even)", {
  scrollTrigger: {
    trigger: ".features",
    start: "top bottom",
    end: "bottom top",
    scrub: 1.5
  },
  y: 16,
  ease: "none"
});

// ===== How it works =====
gsap.from(".how__step, .how__connector", {
  scrollTrigger: { trigger: ".how__steps", start: "top 80%" },
  opacity: 0,
  y: 30,
  duration: 0.5,
  stagger: 0.15,
  ease: "power2.out"
});

// ===== Pricing =====
gsap.from(".pricing__card", {
  scrollTrigger: { trigger: ".pricing__grid", start: "top 80%" },
  opacity: 0,
  y: 50,
  duration: 0.6,
  stagger: 0.15,
  ease: "power2.out"
});

// ===== Testimonials =====
gsap.from(".testimonial", {
  scrollTrigger: { trigger: ".testimonials__grid", start: "top 80%" },
  opacity: 0,
  y: 40,
  duration: 0.6,
  stagger: 0.15,
  ease: "power2.out"
});

// ===== CTA Banner =====
gsap.from(".cta-banner__content", {
  scrollTrigger: { trigger: ".cta-banner", start: "top 80%" },
  opacity: 0,
  y: 30,
  duration: 0.7,
  ease: "power2.out"
});

// ===== Mockup float (only while visible) =====
const floatAnim = gsap.to(".mockup", {
  y: -16,
  duration: 3,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  paused: true
});

// Only float when hero is in view
ScrollTrigger.create({
  trigger: scene,
  start: "top top",
  end: "60% top",
  onEnter: () => floatAnim.play(),
  onLeave: () => floatAnim.pause(),
  onEnterBack: () => floatAnim.play(),
  onLeaveBack: () => floatAnim.pause()
});

// ===== Parallax on glows =====
gsap.to(".hero__glow--1", {
  scrollTrigger: {
    trigger: scene,
    start: "top top",
    end: "bottom top",
    scrub: 2
  },
  y: -120,
  x: 60,
  ease: "none"
});
gsap.to(".hero__glow--2", {
  scrollTrigger: {
    trigger: scene,
    start: "top top",
    end: "bottom top",
    scrub: 2
  },
  y: -80,
  ease: "none"
});

// ===== Section heads =====
gsap.utils.toArray(".section-head").forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: "top 85%" },
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: "power2.out"
  });
});

// ===== Reduced motion override =====
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  gsap.globalTimeline.pause();
}
