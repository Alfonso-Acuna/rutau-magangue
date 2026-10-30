(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");
  const scrollBehavior = () => (reduceMotion.matches ? "auto" : "smooth");

  const header = document.querySelector(".site-header");
  const scrollBar = document.getElementById("scrollBar");
  const backToTop = document.getElementById("backToTop");
  const year = document.getElementById("year");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  /* ---------- Scroll progress, header, back to top ---------- */
  let scrollTicking = false;

  const updateScrollUI = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (scrollTop / scrollable) * 100 : 0;

    if (scrollBar) {
      scrollBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
    }
    if (header) {
      header.classList.toggle("is-scrolled", scrollTop > 12);
    }
    if (backToTop) {
      backToTop.classList.toggle("show", scrollTop > 640);
    }
    scrollTicking = false;
  };

  const onScroll = () => {
    if (!scrollTicking) {
      scrollTicking = true;
      window.requestAnimationFrame(updateScrollUI);
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  updateScrollUI();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reduceMotion.matches) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll("[data-count]");

  const runCounter = (element) => {
    const target = Number.parseInt(element.dataset.count, 10);
    if (Number.isNaN(target)) return;

    if (reduceMotion.matches) {
      element.textContent = String(target);
      return;
    }

    const duration = 1450;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = String(Math.round(target * eased));
      if (progress < 1) window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
  };

  if (counters.length && "IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.7 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  /* ---------- Active navigation ---------- */
  const sections = Array.from(document.querySelectorAll("main section[id], footer[id]"));
  const navLinks = Array.from(document.querySelectorAll(".nav a[href^='#'], .dot-rail a[href^='#']"));

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
    });
  };

  if (sections.length && "IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: "-42% 0px -52% 0px", threshold: 0 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------- Mobile navigation ---------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  const mobileQuery = window.matchMedia("(max-width: 980px)");

  const closeMenu = () => {
    if (!navToggle || !mainNav) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú");
    mainNav.classList.remove("is-open");
    document.body.classList.remove("nav-open");
  };

  const openMenu = () => {
    if (!navToggle || !mainNav) return;
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú");
    mainNav.classList.add("is-open");
    document.body.classList.add("nav-open");
  };

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) closeMenu();
      else openMenu();
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      if (!mainNav.classList.contains("is-open")) return;
      if (header && !header.contains(event.target)) closeMenu();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    mobileQuery.addEventListener("change", (event) => {
      if (!event.matches) closeMenu();
    });
  }

  /* ---------- Hero pointer tilt ---------- */
  const heroVisual = document.querySelector(".hero-visual");
  const heroArt = document.querySelector(".hero-art");

  if (heroVisual && heroArt && finePointer.matches && !reduceMotion.matches) {
    let pointerTicking = false;
    let targetX = 0;
    let targetY = 0;

    const applyTilt = () => {
      heroArt.style.transform = `translate3d(${targetX}px, ${targetY}px, 0) rotateY(${targetX * 0.22}deg) rotateX(${-targetY * 0.22}deg)`;
      pointerTicking = false;
    };

    heroVisual.addEventListener("pointermove", (event) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = x * 14;
      targetY = y * 12;

      if (!pointerTicking) {
        pointerTicking = true;
        window.requestAnimationFrame(applyTilt);
      }
    });

    heroVisual.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
      heroArt.style.transform = "";
    });
  }

  /* ---------- Horizontal roadmap timeline ---------- */
  const timeline = document.getElementById("timelineScroll");

  if (timeline) {
    const fill = document.getElementById("tlFill");
    const bus = document.getElementById("tlBus");
    const counter = document.getElementById("tlCounter");
    const prevButton = document.getElementById("tlPrev");
    const nextButton = document.getElementById("tlNext");
    const milestones = Array.from(timeline.querySelectorAll(".milestone"));
    const desktopQuery = window.matchMedia("(min-width: 981px)");

    let timelineTicking = false;

    const updateTimeline = () => {
      const maxScroll = timeline.scrollWidth - timeline.clientWidth;
      const progress = maxScroll > 0 ? timeline.scrollLeft / maxScroll : 0;
      const visualProgress = 6 + progress * 94;

      if (fill) fill.style.width = `${visualProgress}%`;
      if (bus) bus.style.left = `${visualProgress}%`;

      const probe = timeline.scrollLeft + 42;
      let activeIndex = 1;

      milestones.forEach((milestone, index) => {
        if (probe >= milestone.offsetLeft) activeIndex = index + 1;
      });

      if (counter) {
        counter.textContent = `${String(activeIndex).padStart(2, "0")} / 07`;
      }

      milestones.forEach((milestone, index) => {
        milestone.classList.toggle("is-active", index === activeIndex - 1);
      });

      if (prevButton) {
        prevButton.disabled = maxScroll <= 0 || timeline.scrollLeft <= 2;
      }
      if (nextButton) {
        nextButton.disabled = maxScroll <= 0 || timeline.scrollLeft >= maxScroll - 2;
      }

      timelineTicking = false;
    };

    const scheduleTimelineUpdate = () => {
      if (!timelineTicking) {
        timelineTicking = true;
        window.requestAnimationFrame(updateTimeline);
      }
    };

    const scrollStep = () => {
      const first = milestones[0];
      if (!first) return 278;
      const styles = window.getComputedStyle(timeline.querySelector(".milestones"));
      const gap = Number.parseFloat(styles.columnGap || styles.gap || "20") || 20;
      return first.getBoundingClientRect().width + gap;
    };

    const moveTimeline = (direction) => {
      timeline.scrollBy({
        left: direction * scrollStep(),
        behavior: scrollBehavior(),
      });
    };

    if (prevButton) prevButton.addEventListener("click", () => moveTimeline(-1));
    if (nextButton) nextButton.addEventListener("click", () => moveTimeline(1));

    timeline.addEventListener("scroll", scheduleTimelineUpdate, { passive: true });
    window.addEventListener("resize", scheduleTimelineUpdate);

    timeline.addEventListener("keydown", (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        moveTimeline(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        moveTimeline(-1);
      } else if (event.key === "Home") {
        event.preventDefault();
        timeline.scrollTo({ left: 0, behavior: scrollBehavior() });
      } else if (event.key === "End") {
        event.preventDefault();
        timeline.scrollTo({ left: timeline.scrollWidth, behavior: scrollBehavior() });
      }
    });

    let isDragging = false;
    let dragStartX = 0;
    let dragStartLeft = 0;
    let hasDragged = false;

    timeline.addEventListener("pointerdown", (event) => {
      if (!desktopQuery.matches || event.pointerType !== "mouse" || event.button !== 0) return;
      isDragging = true;
      hasDragged = false;
      dragStartX = event.clientX;
      dragStartLeft = timeline.scrollLeft;
      timeline.classList.add("is-dragging");
      timeline.setPointerCapture(event.pointerId);
    });

    timeline.addEventListener("pointermove", (event) => {
      if (!isDragging) return;
      const delta = event.clientX - dragStartX;
      if (Math.abs(delta) > 4) hasDragged = true;
      timeline.scrollLeft = dragStartLeft - delta;
    });

    const endDrag = (event) => {
      if (!isDragging) return;
      isDragging = false;
      timeline.classList.remove("is-dragging");
      try {
        timeline.releasePointerCapture(event.pointerId);
      } catch (error) {
        /* pointer capture may already be released */
      }
      if (hasDragged) {
        event.preventDefault();
      }
    };

    timeline.addEventListener("pointerup", endDrag);
    timeline.addEventListener("pointercancel", endDrag);

    milestones.forEach((milestone) => {
      milestone.addEventListener("click", () => {
        if (hasDragged) return;
        const left = milestone.offsetLeft - 28;
        timeline.scrollTo({ left, behavior: scrollBehavior() });
      });
    });

    window.addEventListener("load", scheduleTimelineUpdate);
    scheduleTimelineUpdate();
  }

  /* ---------- Smooth anchor scrolling fallback ---------- */
  document.querySelectorAll("a[href^='#']").forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
      if (history.pushState) {
        history.pushState(null, "", targetId);
      }
    });
  });
})();
