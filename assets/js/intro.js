// FILE: /assets/js/intro.js
(() => {
  const KEY = "immersa_intro_seen_v3";

  const overlay = document.getElementById("introOverlay");
  const logoWrap = document.getElementById("introLogoWrap");
  const introImg = document.getElementById("introLogo");
  const clickArea = document.getElementById("introClickArea");
  const navLogo = document.getElementById("navLogo");

  if (!overlay || !logoWrap || !introImg || !clickArea || !navLogo) return;

  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Optional dev replay: add ?intro=1
  const forceIntro = window.location.search.includes("intro=1");
  if (forceIntro) {
    try { localStorage.removeItem(KEY); } catch {}
  }

  const alreadySeen = localStorage.getItem(KEY) === "1";
  if (alreadySeen) return;

  // Show overlay + lock scroll
  overlay.style.display = "flex";
  overlay.classList.add("intro-idle");
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";

  // Parallax
  const bgA = document.getElementById("introBgA");
  const bgB = document.getElementById("introBgB");
  const bgG = document.getElementById("introBgGrid");

  function onMove(e) {
    if (!bgA || !bgB || !bgG) return;
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = (e.clientY / window.innerHeight) * 2 - 1;
    bgA.style.transform = `translate3d(${x * -18}px, ${y * -14}px, 0px)`;
    bgB.style.transform = `translate3d(${x *  14}px, ${y * -10}px, 0px)`;
    bgG.style.transform = `translate3d(${x *  -8}px, ${y *   6}px, 0px) rotateX(${y * 1.5}deg) rotateY(${x * -2}deg)`;
  }
  window.addEventListener("pointermove", onMove);

  function finish() {
    overlay.classList.remove("intro-idle");
    overlay.style.display = "none";
    overlay.style.opacity = "1";
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    window.removeEventListener("pointermove", onMove);
    try { localStorage.setItem(KEY, "1"); } catch {}
  }

  function animateToHeader() {
    overlay.classList.remove("intro-idle");

    if (prefersReduced) {
      finish();
      return;
    }

    const start = introImg.getBoundingClientRect();
    const target = navLogo.getBoundingClientRect();

    // Hide header logo until we crossfade
    const prevNavOpacity = navLogo.style.opacity;
    navLogo.style.opacity = "0";

    // Flyer clone (animate a fixed element so math is perfect)
    const flyer = introImg.cloneNode(true);
    flyer.id = "introLogoFlyer";
    flyer.style.position = "fixed";
    flyer.style.left = `${start.left}px`;
    flyer.style.top = `${start.top}px`;
    flyer.style.width = `${start.width}px`;
    flyer.style.height = `${start.height}px`;
    flyer.style.transformOrigin = "center center";
    flyer.style.zIndex = "10000";
    flyer.style.willChange = "transform, opacity, filter";
    flyer.style.filter = "drop-shadow(0 22px 70px rgba(0,0,0,.60))";
    document.body.appendChild(flyer);

    // Hide original content (we animate the flyer only)
    logoWrap.style.opacity = "0";

    const sx = start.left + start.width / 2;
    const sy = start.top + start.height / 2;
    const tx = target.left + target.width / 2;
    const ty = target.top + target.height / 2;

    const dx = tx - sx;
    const dy = ty - sy;

    // Scale based on IMAGE height, not wrapper height
    const scale = Math.max(0.18, Math.min(1, target.height / start.height));

    const anim = flyer.animate(
      [
        { transform: "translate3d(0,0,0) rotateX(0deg) rotateY(-4deg) scale(1)", opacity: 1 },
        { transform: `translate3d(${dx * 0.45}px, ${dy * 0.45}px, -120px) rotateX(12deg) rotateY(18deg) scale(1.06)`, opacity: 1 },
        { transform: `translate3d(${dx}px, ${dy}px, 0px) rotateX(0deg) rotateY(0deg) scale(${scale})`, opacity: 1 }
      ],
      { duration: 1050, easing: "cubic-bezier(.2,.9,.2,1)", fill: "forwards" }
    );

    anim.onfinish = () => {
      // Crossfade flyer out, header logo in
      flyer.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, easing: "ease-out", fill: "forwards" });
      navLogo.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 220, easing: "ease-out", fill: "forwards" })
        .onfinish = () => { navLogo.style.opacity = prevNavOpacity || ""; };

      // Fade overlay
      overlay.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 260, easing: "ease-out", fill: "forwards" })
        .onfinish = () => {
          try { flyer.remove(); } catch {}
          finish();
        };
    };
  }

  clickArea.addEventListener("click", animateToHeader, { once: true });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      animateToHeader();
    }
  }, { once: true });
})();