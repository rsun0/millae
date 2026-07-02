// Replace with a real form endpoint (e.g. Formspree, Buttondown, ConvertKit) to make
// the subscribe form actually collect emails. Until then it only simulates success.
const SUBSCRIBE_ENDPOINT = "";

document.addEventListener("DOMContentLoaded", () => {
  const wipToast = document.getElementById("wipToast");
  if (wipToast && !sessionStorage.getItem("millae_wip_dismissed")) {
    setTimeout(() => wipToast.classList.add("open"), 400);
  }
  const dismissWip = () => {
    if (!wipToast) return;
    wipToast.classList.remove("open");
    sessionStorage.setItem("millae_wip_dismissed", "1");
  };
  const closeWipBtn = document.getElementById("closeWip");
  const dismissWipBtn = document.getElementById("dismissWip");
  if (closeWipBtn) closeWipBtn.addEventListener("click", dismissWip);
  if (dismissWipBtn) dismissWipBtn.addEventListener("click", dismissWip);

  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => navLinks.classList.remove("open"));
    });
  }

  const modal = document.getElementById("subscribeModal");
  const openTriggers = [
    document.getElementById("openSubscribe"),
    document.getElementById("openSubscribe2"),
    document.getElementById("openSubscribe3"),
  ].filter(Boolean);
  const closeBtn = document.getElementById("closeSubscribe");

  const openModal = () => {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  };

  openTriggers.forEach((btn) => btn.addEventListener("click", openModal));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      dismissWip();
    }
  });

  const form = document.getElementById("subscribeForm");
  const status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = form.email.value.trim();
      if (!email) return;

      status.textContent = "Subscribing...";
      status.className = "form-status";

      if (!SUBSCRIBE_ENDPOINT) {
        setTimeout(() => {
          status.textContent = "Thanks — we'll be in touch.";
          status.className = "form-status success";
          form.reset();
        }, 400);
        return;
      }

      try {
        const res = await fetch(SUBSCRIBE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        if (!res.ok) throw new Error("Request failed");
        status.textContent = "Thanks — you're subscribed.";
        status.className = "form-status success";
        form.reset();
      } catch (err) {
        status.textContent = "Something went wrong. Please try again.";
        status.className = "form-status error";
      }
    });
  }
});
