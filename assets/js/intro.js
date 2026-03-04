// FILE: /assets/js/intro.js
(() => {
  const introSection = document.getElementById("intro");
  const logoWrap = document.getElementById("introLogoWrap");
  const introImg = document.getElementById("introLogo");
  const header = document.querySelector("header");

  if (!introSection || !logoWrap || !introImg || !header) return;

  const prefersReduced =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const bgA = document.getElementById("introBgA");
  const bgB = document.getElementById("introBgB");
  const bgG = document.getElementById("introBgGrid");

  // Detect if touch device
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Hide header until intro is done
  header.classList.add("header-hidden");

  // Show intro on load
  introSection.style.display = "flex";
  introSection.style.opacity = "1";
  introSection.style.transform = "translateY(0px)";
  logoWrap.style.transform = "scale(1.5)";
  introImg.style.opacity = "1";

  // Only lock scroll on desktop (not on mobile)
  if (!isTouchDevice) {
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
  }

  let progress = 0; // 0 = full intro, 1 = gone
  const MIN_PROGRESS = 0;
  const MAX_PROGRESS = 1;

  function applyIntroState() {
    const scaleStart = 1.5;
    const scaleEnd = 0.7;
    const scale = scaleStart + (scaleEnd - scaleStart) * progress;

    const opacity = 1 - progress;
    const translateY = prefersReduced ? 0 : progress * -40;

    logoWrap.style.transform = `scale(${scale.toFixed(3)})`;
    introImg.style.opacity = opacity.toFixed(3);
    introSection.style.transform = `translateY(${translateY}px)`;
    introSection.style.opacity = opacity.toFixed(3);

    if (progress >= MAX_PROGRESS) {
      finishIntro();
    }
  }

  function finishIntro() {
    introSection.classList.add("intro--hidden");
    introSection.style.display = "none";

    // Show header now
    header.classList.remove("header-hidden");

    // Unlock scroll (only if it was locked)
    if (!isTouchDevice) {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }

    window.removeEventListener("wheel", onWheel, wheelOptions);
    window.removeEventListener("keydown", onKeyDown);
    introSection.removeEventListener("click", onTap);
    if (!prefersReduced) {
      window.removeEventListener("pointermove", onPointerMove);
    }
  }

  // Desktop: scroll to dismiss
  function onWheel(e) {
    if (progress < MAX_PROGRESS) {
      e.preventDefault();
    }

    const delta = e.deltaY || e.wheelDelta || 0;
    const step = 0.08;

    if (delta > 0) {
      progress = Math.min(MAX_PROGRESS, progress + step);
    } else if (delta < 0) {
      progress = Math.max(MIN_PROGRESS, progress - step);
    }

    applyIntroState();
  }

  const wheelOptions = { passive: false };

  // Desktop: keyboard to dismiss
  function onKeyDown(e) {
    if (progress >= MAX_PROGRESS) return;

    if (["ArrowDown", "PageDown", " ", "Enter"].includes(e.key)) {
      e.preventDefault();
      progress = Math.min(MAX_PROGRESS, progress + 0.1);
      applyIntroState();
    } else if (["ArrowUp", "PageUp"].includes(e.key)) {
      e.preventDefault();
      progress = Math.max(MIN_PROGRESS, progress - 0.1);
      applyIntroState();
    }
  }

  // Mobile: tap anywhere on intro to dismiss
  function onTap(e) {
    if (progress >= MAX_PROGRESS) return;
    progress = MAX_PROGRESS;
    applyIntroState();
  }

  // Optional: parallax while intro is visible (desktop only)
  function onPointerMove(e) {
    if (!bgA || !bgB || !bgG) return;
    if (progress >= MAX_PROGRESS) return;

    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;

    bgA.style.transform = `translate3d(${x * -18}px, ${y * -14}px, 0px)`;
    bgB.style.transform = `translate3d(${x * 14}px, ${y * -10}px, 0px)`;
    bgG.style.transform = `translate3d(${x * -8}px, ${y * 6}px, 0px) rotateX(${y * 1.5}deg) rotateY(${x * -2}deg)`;
  }

  // Attach listeners based on device type
  if (isTouchDevice) {
    // Mobile: just tap to dismiss
    introSection.addEventListener("click", onTap);
  } else {
    // Desktop: scroll/keyboard to dismiss
    window.addEventListener("wheel", onWheel, wheelOptions);
    window.addEventListener("keydown", onKeyDown);
  }

  if (!prefersReduced) {
    window.addEventListener("pointermove", onPointerMove);
  }

  // Initial state
  applyIntroState();
})();
