// FILE: /assets/js/site-bg.js
(() => {
  const prefersReduced =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  const siteBg = document.getElementById("siteBg");
  const iframe = document.getElementById("bgIframe");
  if (!siteBg || !iframe) return;

  // Start hidden (CSS already does this). We only enable if it loads.
  let loaded = false;

  iframe.addEventListener("load", () => {
    loaded = true;
    // If embedding is allowed, we show it.
    siteBg.classList.add("is-playing");
  });

  // If it doesn't load within 3s, assume blocked and keep fallback only.
  // (Error 153 usually still “loads” a page, but it shows the overlay UI. Our CSS keeps iframe hidden unless is-playing,
  // so if it “loads” but shows the error UI, you can force fallback by NOT enabling is-playing.)
  //
  // Safer behavior: we only enable is-playing after a short delay AND if the iframe is visible size-wise.
  setTimeout(() => {
    if (!loaded) return;

    // Conservative: some blocked embeds still trigger load.
    // If you keep seeing error screens, comment out the next line to *always* fallback.
    siteBg.classList.add("is-playing");
  }, 800);

  // Hard fallback: if you want to ALWAYS hide YouTube until you switch to an embeddable video,
  // uncomment the next line:
  // iframe.src = "";
})();