import "./style.css";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      menuToggle.classList.toggle("active");
    });
  }

  const pricingToggles = document.querySelectorAll(".toggle-btn");
  pricingToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      pricingToggles.forEach((btn) => btn.classList.remove("active"));
      toggle.classList.toggle("active");
    });
  });

  const menuItems = document.querySelectorAll(".frame-28 a");

  menuItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      menuItems.forEach((menuItem) => {
        menuItem.classList.remove("active");
        if (menuItem.classList.contains("frame-29")) {
          menuItem.className = "div-2";
        }
      });

      if (item.getAttribute("href") === "#home") {
        item.className = "frame-29";
      } else {
        item.className = "div-2 active";
      }
    });
  });

  const featureNavigation = document.querySelectorAll(".component-10 a");

  featureNavigation.forEach((item) => {
    if (item.classList.contains("frame-128")) {
      const arrowIcon = document.createElement("span");
      arrowIcon.className = "arrow-icon";
      arrowIcon.setAttribute("role", "presentation");
      arrowIcon.setAttribute("aria-hidden", "true");
      item.appendChild(arrowIcon);
    }
  });

  featureNavigation.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();

      featureNavigation.forEach((navItem) => {
        if (navItem.classList.contains("frame-127")) {
          navItem.className = "frame-128";
          const existingArrow = navItem.querySelector(".img-5.readMore");
          if (existingArrow) {
            existingArrow.style.display = "none";
          }
        }
        navItem.classList.remove("active");
      });

      if (item.classList.contains("frame-128")) {
        item.className = "frame-128 active";
      } else {
        item.className = "frame-127";
        const existingArrow = item.querySelector(".img-5.readMore");
        if (existingArrow) {
          existingArrow.style.display = "block";
        }
      }
    });
  });

  const featureNavItems = document.querySelectorAll(".feature-nav-item");
  const featurePanels = document.querySelectorAll(".feature-panel");

  featureNavItems.forEach((item) => {
    item.addEventListener("click", () => {
      const feature = item.dataset.feature;

      featureNavItems.forEach((nav) => nav.classList.remove("active"));
      item.classList.add("active");

      featurePanels.forEach((panel) => panel.classList.remove("active"));
      const activePanel = document.querySelector(`[data-panel="${feature}"]`);
      if (activePanel) {
        activePanel.classList.add("active");
      }
    });
  });

  const playButton = document.querySelector(".play-button");
  if (playButton) {
    playButton.addEventListener("click", () => {
      alert("فیلم آموزشی در حال بارگذاری...");
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            if (menuToggle) menuToggle.classList.remove("active");
          }
        }
      }
    });
  });

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document
    .querySelectorAll(
      ".stat-card, .pricing-card, .testimonial-card, .feature-card"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
});
