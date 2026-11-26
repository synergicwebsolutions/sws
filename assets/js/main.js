document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileNav = document.getElementById("mobile-nav");

  /* ── 1. Sticky header border on scroll ── */
  if (header) {
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ── 2. Full-screen mobile menu ── */
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mobileNav.classList.contains("is-open");
      mobileNav.classList.toggle("is-open");
      menuToggle.classList.toggle("is-active");
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      document.body.style.overflow = isOpen ? "" : "hidden";
    });

    const closeMenu = () => {
      mobileNav.classList.remove("is-open");
      menuToggle.classList.remove("is-active");
      menuToggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && mobileNav.classList.contains("is-open")) {
        closeMenu();
        menuToggle.focus();
      }
    });
  }

  /* ── 3. FAQ accordion ── */
  document.querySelectorAll(".faq-trigger").forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const isExpanded = trigger.getAttribute("aria-expanded") === "true";
      const panelId = trigger.getAttribute("aria-controls");
      const panel = panelId ? document.getElementById(panelId) : null;

      // Close all others
      document.querySelectorAll(".faq-trigger").forEach((other) => {
        other.setAttribute("aria-expanded", "false");
        const otherId = other.getAttribute("aria-controls");
        const otherPanel = otherId ? document.getElementById(otherId) : null;
        if (otherPanel) otherPanel.hidden = true;
      });

      if (!isExpanded && panel) {
        trigger.setAttribute("aria-expanded", "true");
        panel.hidden = false;
      }
    });
  });

  /* ── 4. Scroll-reveal animations ── */
  const reveals = document.querySelectorAll(".reveal");
  if (reveals.length > 0 && "IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback: show everything
    reveals.forEach((el) => el.classList.add("visible"));
  }

  /* ── 5. Stats counter animation ── */
  const statValues = document.querySelectorAll(".stat-value[data-count]");
  if (statValues.length > 0 && "IntersectionObserver" in window) {
    const countObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            countObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    statValues.forEach((el) => countObserver.observe(el));
  }

  function animateCounter(el) {
    const raw = el.getAttribute("data-count");
    const match = raw.match(/^(\d+)(.*)$/);
    if (!match) return;

    const target = parseInt(match[1], 10);
    const suffix = match[2] || "";
    const duration = 1600;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      el.textContent = Math.round(target * eased) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }

    el.textContent = "0" + suffix;
    requestAnimationFrame(update);
  }

  /* ── 6. Active nav link highlight on scroll ── */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-list a:not(.btn)");

  if (sections.length > 0 && navLinks.length > 0) {
    const highlightNav = () => {
      let current = "";
      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        if (window.scrollY >= top) {
          current = section.getAttribute("id");
        }
      });
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href").includes("#" + current));
      });
    };
    window.addEventListener("scroll", highlightNav, { passive: true });
    highlightNav();
  }
});
