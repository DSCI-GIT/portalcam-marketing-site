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

  // Detect if mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;

  // MOBILE: Skip intro entirely, show header immediately
  if (isMobile) {
    introSection.style.display = "none";
    header.classList.remove("header-hidden");
    return;
  }

  // DESKTOP: Run full intro with scroll control
  header.classList.add("header-hidden");

  introSection.style.display = "flex";
  introSection.style.opacity = "1";
  introSection.style.transform = "translateY(0px)";
  logoWrap.style.transform = "scale(1.5)";
  introImg.style.opacity = "1";

  // Lock scroll until intro is gone
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  let progress = 0;
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

    header.classList.remove("header-hidden");

    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";

    window.removeEventListener("wheel", onWheel, wheelOptions);
    window.removeEventListener("keydown", onKeyDown);
    if (!prefersReduced) {
      window.removeEventListener("pointermove", onPointerMove);
    }
  }

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

  function onPointerMove(e) {
    if (!bgA || !bgB || !bgG) return;
    if (progress >= MAX_PROGRESS) return;

    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;

    bgA.style.transform = `translate3d(${x * -18}px, ${y * -14}px, 0px)`;
    bgB.style.transform = `translate3d(${x * 14}px, ${y * -10}px, 0px)`;
    bgG.style.transform = `translate3d(${x * -8}px, ${y * 6}px, 0px) rotateX(${y * 1.5}deg) rotateY(${x * -2}deg)`;
  }

  window.addEventListener("wheel", onWheel, wheelOptions);
  window.addEventListener("keydown", onKeyDown);

  if (!prefersReduced) {
    window.addEventListener("pointermove", onPointerMove);
  }

  applyIntroState();
})();
