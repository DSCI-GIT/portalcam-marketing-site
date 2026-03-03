/* =========================================================
   Contact form validation + safe fallback submission
   If form action is "#" or empty, uses mailto fallback.
   ========================================================= */

(function () {
  const form = document.getElementById("quoteForm");
  if (!form) return;

  const status = document.getElementById("formStatus");

  const fields = {
    name: form.querySelector("#name"),
    email: form.querySelector("#email"),
    usecase: form.querySelector("#usecase"),
    message: form.querySelector("#message"),
    consent: form.querySelector("#consent"),
  };

  function setError(input, message) {
    const errorEl = input?.closest(".field")?.querySelector(".error");
    if (errorEl) errorEl.textContent = message || "";
  }

  function isEmail(value) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
  }

  function validate() {
    let ok = true;

    if (!fields.name.value.trim()) {
      setError(fields.name, "Please enter your name.");
      ok = false;
    } else setError(fields.name, "");

    if (!fields.email.value.trim() || !isEmail(fields.email.value)) {
      setError(fields.email, "Please enter a valid email.");
      ok = false;
    } else setError(fields.email, "");

    if (!fields.usecase.value.trim()) {
      setError(fields.usecase, "Please choose a use case.");
      ok = false;
    } else setError(fields.usecase, "");

    if (!fields.message.value.trim() || fields.message.value.trim().length < 20) {
      setError(fields.message, "Please add a bit more detail (20+ characters).");
      ok = false;
    } else setError(fields.message, "");

    if (!fields.consent.checked) {
      setError(fields.consent, "Consent is required to submit.");
      ok = false;
    } else setError(fields.consent, "");

    return ok;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (status) status.textContent = "";

    const ok = validate();
    if (!ok) {
      if (status) status.textContent = "Please fix the errors above.";
      return;
    }

    const action = (form.getAttribute("action") || "").trim();
    const mailto = (form.getAttribute("data-mailto") || "").trim();

    // If a real backend is configured, allow normal submit
    const hasBackend = action && action !== "#";
    if (hasBackend) {
      if (status) status.textContent = "Sending…";
      form.submit(); // Goes to configured action endpoint
      return;
    }

    // Mailto fallback (works without any backend but depends on user email client setup)
    const subject = encodeURIComponent("Website Quote Request");
    const body = encodeURIComponent(
      [
        `Name: ${fields.name.value}`,
        `Email: ${fields.email.value}`,
        `Use case: ${fields.usecase.value}`,
        "",
        "Project details:",
        fields.message.value,
      ].join("\n")
    );

    if (!mailto || mailto.includes("TODO")) {
      if (status) {
        status.textContent =
          "Form backend is not connected yet. TODO: Set your real email in data-mailto or connect Formspree.";
      }
      return;
    }

    window.location.href = `mailto:${mailto}?subject=${subject}&body=${body}`;
    if (status) status.textContent = "Opening your email client to send the message…";
  });
})();
