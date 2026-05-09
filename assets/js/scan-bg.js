/* =========================================================
   Full-screen scan background interaction controller
   ========================================================= */

(() => {
  const shell = document.getElementById("scanHero");
  const stage = document.getElementById("scanStage");
  const touchToggle = document.getElementById("scanTouchToggle");

  if (!shell || !stage) return;

  const body = document.body;
  let ticking = false;

  const getViewportHeight = () => {
    return window.visualViewport?.height || window.innerHeight || document.documentElement.clientHeight;
  };

  function setTouchEnabled(enabled) {
    body.classList.toggle("scan-bg-touch-enabled", enabled);
    if (touchToggle) {
      touchToggle.textContent = enabled ? "Resume page scrolling" : "Enable touch interaction";
      touchToggle.setAttribute("aria-pressed", enabled ? "true" : "false");
    }
  }

  function updateScanState() {
    ticking = false;

    const shellRect = shell.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    const viewportHeight = getViewportHeight();

    const shellVisible = shellRect.top < viewportHeight && shellRect.bottom > 0;
    const interactive = shellVisible && stageRect.top < viewportHeight * 0.72 && stageRect.bottom > viewportHeight * 0.18;

    body.classList.toggle("scan-bg-visible", shellVisible);
    body.classList.toggle("scan-bg-interactive", interactive);

    if (!interactive) {
      setTouchEnabled(false);
    }
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateScanState);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate, { passive: true });
  window.visualViewport?.addEventListener("resize", requestUpdate, { passive: true });
  requestUpdate();

  if (touchToggle) {
    touchToggle.setAttribute("aria-pressed", "false");
    touchToggle.addEventListener("click", () => {
      setTouchEnabled(!body.classList.contains("scan-bg-touch-enabled"));
    });
  }
})();
