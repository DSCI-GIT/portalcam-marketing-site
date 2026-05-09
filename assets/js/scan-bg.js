/* =========================================================
   Full-screen scan background interaction controller
   ========================================================= */

(() => {
  const shell = document.getElementById("scanHero");
  const stage = document.getElementById("scanStage");
  const touchToggle = document.getElementById("scanTouchToggle");

  if (!shell || !stage) return;

  const body = document.body;

  function updateScanState() {
    const shellRect = shell.getBoundingClientRect();
    const stageRect = stage.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

    const shellVisible = shellRect.top < viewportHeight && shellRect.bottom > 0;
    const interactive = shellVisible && stageRect.top < viewportHeight * 0.72 && stageRect.bottom > viewportHeight * 0.18;

    body.classList.toggle("scan-bg-visible", shellVisible);
    body.classList.toggle("scan-bg-interactive", interactive);

    if (!interactive) {
      body.classList.remove("scan-bg-touch-enabled");
      if (touchToggle) touchToggle.textContent = "Enable touch interaction";
    }
  }

  window.addEventListener("scroll", updateScanState, { passive: true });
  window.addEventListener("resize", updateScanState);
  updateScanState();

  if (touchToggle) {
    touchToggle.addEventListener("click", () => {
      const enabled = body.classList.toggle("scan-bg-touch-enabled");
      touchToggle.textContent = enabled ? "Resume page scrolling" : "Enable touch interaction";
    });
  }
})();
