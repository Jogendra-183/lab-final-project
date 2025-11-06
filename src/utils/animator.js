// Lightweight animation engine: reveals elements on scroll and on SPA route changes.
// No CSS here. Pair this with your existing CSS file that defines [data-animate] behavior.

const SELECTORS = [
  // Sections / blocks
  ".page-header", ".hero-section", ".hero-container", ".exhibition-preview",
  ".expo-section", ".contact-hero", ".contact-wrapper", ".contact-glass",
  ".upload-card", ".create-exhibition-card", ".artist-hero", ".curator-hero",
  ".stats-grid", ".artist-stats", ".card",

  // Grids / items
  ".grid-container > *", ".art-gallery > *", ".expo-masonry > *",
  ".exhibition-grid > *", ".expo-artists > *",

  // Generic components
  ".art-card", ".art-card-premium", ".managed-artwork", ".managed-exhibition",
  ".exhibition-card", ".artist-mini", ".stat-box", ".nav-links a", ".btn",
  ".btn-primary", ".btn-secondary", ".hero-btn", ".login-panel", ".auth-card",
  ".preview-content", ".expo-modal", ".role-selector button", ".role-group button"
];

function markForAnimation(root = document) {
  SELECTORS.forEach((sel) => {
    root.querySelectorAll(sel).forEach((el, i) => {
      if (!el.hasAttribute("data-animate")) {
        el.setAttribute("data-animate", "fade-up");
        el.style.setProperty("--anim-delay", `${Math.min(i * 60, 480)}ms`);
      }
    });
  });
}

export default function initAnimator() {
  // Enable animation mode on <html>
  document.documentElement.classList.add("anim-enabled");

  // Mark initial DOM
  markForAnimation();

  // IntersectionObserver: add .is-visible when in view
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );

  // Observe current markups
  document.querySelectorAll("[data-animate]").forEach((el) => io.observe(el));

  // MutationObserver: watch for SPA changes, lists, modals
  const mo = new MutationObserver((muts) => {
    let added = false;
    muts.forEach((m) => {
      m.addedNodes?.forEach((n) => {
        if (n.nodeType === 1) {
          markForAnimation(n);
          added = true;
        }
      });
    });
    if (added) {
      document.querySelectorAll("[data-animate]:not(.is-visible)").forEach((el) => io.observe(el));
    }
  });

  mo.observe(document.body, { childList: true, subtree: true });
}
