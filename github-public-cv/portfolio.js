document.documentElement.classList.add("js");

// Preserve previously shared language links while serving prerendered HTML.
const requestedLanguage = new URLSearchParams(location.search).get("lang");
if (document.body.dataset.page === "home" && requestedLanguage && requestedLanguage !== document.body.dataset.language) {
  if (requestedLanguage === "en") location.replace(new URL("en/" + location.hash, location.href));
  if (requestedLanguage === "vi") location.replace(new URL("../" + location.hash, location.href));
}

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
function closeMenu() {
  document.body.classList.remove("menu-open");
  toggle.setAttribute("aria-expanded", "false");
  toggle.querySelector("[data-menu-label]").textContent = toggle.dataset.openLabel;
}
toggle.addEventListener("click", () => {
  const expanded = toggle.getAttribute("aria-expanded") !== "true";
  document.body.classList.toggle("menu-open", expanded);
  toggle.setAttribute("aria-expanded", String(expanded));
  toggle.querySelector("[data-menu-label]").textContent = expanded ? toggle.dataset.closeLabel : toggle.dataset.openLabel;
});
nav.addEventListener("click", event => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && document.body.classList.contains("menu-open")) {
    closeMenu();
    toggle.focus();
  }
});
window.matchMedia("(min-width: 901px)").addEventListener("change", closeMenu);

const filters = document.querySelector(".project-filters");
if (filters) {
  filters.hidden = false;
  filters.addEventListener("click", event => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    filters.querySelectorAll("button").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
    let count = 0;
    document.querySelectorAll(".project-grid .project-card").forEach(card => {
      const visible = button.dataset.filter === "all" || card.dataset.category === button.dataset.filter;
      card.hidden = !visible;
      if (visible) count++;
    });
    const status = document.querySelector("#filter-count");
    status.textContent = count + " " + status.dataset.resultLabel;
    document.querySelector("#no-projects").hidden = count !== 0;
  });
}

const copyButton = document.querySelector("#copy-email");
if (copyButton) {
  copyButton.hidden = false;
  copyButton.addEventListener("click", async () => {
    const status = document.querySelector("#copy-status");
    const field = document.querySelector("#copy-email-value");
    try {
      await navigator.clipboard.writeText(copyButton.dataset.email);
      status.textContent = copyButton.dataset.copied;
      field.hidden = true;
    } catch {
      field.hidden = false;
      field.focus();
      field.select();
      status.textContent = copyButton.dataset.fallback;
    }
  });
}

document.querySelectorAll("[data-media] img").forEach(image => {
  const showPlaceholder = () => {
    const media = image.closest("[data-media]");
    image.remove();
    media.classList.remove("has-image");
    media.querySelector(".media-placeholder").hidden = false;
  };
  image.addEventListener("error", showPlaceholder, { once: true });
  if (image.complete && !image.naturalWidth) showPlaceholder();
});

if ("IntersectionObserver" in window && document.body.dataset.page === "home") {
  const observer = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (!visible.length) return;
    const current = visible[0].target.id;
    nav.querySelectorAll("a").forEach(link => {
      if (link.hash === "#" + current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }, { rootMargin: "-15% 0px -45% 0px", threshold: [0, .2, .5] });
  document.querySelectorAll("main > section[id]").forEach(section => observer.observe(section));
}
