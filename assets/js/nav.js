// MOBILE NAV TOGGLE

(() => {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("mobileNav");

  if (!toggle || !menu) return;

  function closeMenu() {
    toggle.classList.remove("is-open");
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  function openMenu() {
    toggle.classList.add("is-open");
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
  }

  function toggleMenu(e) {
    e.stopPropagation();

    if (menu.classList.contains("is-open")) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  // toggle click
  toggle.addEventListener("click", toggleMenu);

  // close when clicking a link
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  // close when clicking outside
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !toggle.contains(e.target)) {
      closeMenu();
    }
  });

  // close on resize back to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
})();