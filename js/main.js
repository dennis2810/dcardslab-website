const DCARDSLAB_CONFIG = {
  // Placeholder: replace with the final eBay shop URL when available.
  ebayUrl: "",

  // Placeholder: replace with the final Instagram profile URL when available.
  instagramUrl: "",
};

function applyConfiguredLinks() {
  document.querySelectorAll("[data-link]").forEach((link) => {
    const configKey = `${link.dataset.link}Url`;
    const url = DCARDSLAB_CONFIG[configKey];

    if (url) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
      link.removeAttribute("data-placeholder");
      link.removeAttribute("aria-disabled");
      return;
    }

    link.href = "#";
    link.dataset.placeholder = "true";
    link.setAttribute("aria-disabled", "true");
    link.title = "Platzhalter: Link wird später ergänzt";
    link.addEventListener("click", (event) => event.preventDefault());
  });
}

function setupMobileNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");

  if (!toggle || !nav) {
    return;
  }

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    document.body.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      document.body.classList.remove("nav-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setCurrentYear() {
  const yearElement = document.getElementById("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

applyConfiguredLinks();
setupMobileNavigation();
setCurrentYear();
