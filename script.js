// #subscribeForm is a Netlify Form (see the data-netlify attribute in the HTML).
// Netlify detects it from the static markup at deploy time and stores submissions
// server-side — this only works once the site is actually deployed on Netlify.
const SUBSCRIBE_ENDPOINT = "/";

function encodeFormData(data) {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

document.addEventListener("DOMContentLoaded", () => {
  const sslToast = document.getElementById("sslToast");
  if (sslToast && !localStorage.getItem("millae_ssl_toast_shown")) {
    const dismissSslToast = () => sslToast.classList.remove("open");
    setTimeout(() => {
      sslToast.classList.add("open");
      localStorage.setItem("millae_ssl_toast_shown", "1");
    }, 300);
    setTimeout(dismissSslToast, 10300);
    const closeSslToastBtn = document.getElementById("closeSslToast");
    if (closeSslToastBtn) closeSslToastBtn.addEventListener("click", dismissSslToast);
  }

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
    if (e.key === "Escape") closeModal();
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

      try {
        const res = await fetch(SUBSCRIBE_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encodeFormData({ "form-name": form.getAttribute("name"), email }),
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
