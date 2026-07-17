/* =========================================================
   Full-screen scan background interaction controller
   ========================================================= */

(() => {
  const shell = document.getElementById("scanHero");
  const scanBackground = document.getElementById("scanBackground");
  const controlButton = document.getElementById("scanControlToggle");

  if (!shell || !scanBackground || !controlButton) return;

  const body = document.body;
  let ticking = false;

  const getViewportHeight = () => {
    return window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight;
  };

  function setScanControl(enabled) {
    body.classList.toggle("scan-control-active", enabled);
    scanBackground.classList.toggle("scan-background--manual-active", enabled);
    controlButton.setAttribute("aria-pressed", enabled ? "true" : "false");
    controlButton.textContent = enabled ? "Back to website" : "Explore the Scan";
  }

  function updateScanVisibility() {
    ticking = false;

    const shellRect = shell.getBoundingClientRect();
    const viewportHeight = getViewportHeight();
    const shellVisible = shellRect.top < viewportHeight && shellRect.bottom > 0;

    body.classList.toggle("scan-bg-visible", shellVisible);

    if (!shellVisible && body.classList.contains("scan-control-active")) {
      setScanControl(false);
    }
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateScanVisibility);
  }

  controlButton.addEventListener("click", (event) => {
    event.preventDefault();
    setScanControl(!body.classList.contains("scan-control-active"));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setScanControl(false);
    }
  });

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  window.visualViewport?.addEventListener("resize", requestUpdate, { passive: true });

  setScanControl(false);
  requestUpdate();
})();
