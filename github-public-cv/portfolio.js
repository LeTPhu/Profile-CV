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

const certificateFilters = document.querySelector(".certificate-filters");
const certificateCards = [...document.querySelectorAll(".certificate-card")];
if (certificateFilters) {
  certificateFilters.hidden = false;
  certificateFilters.addEventListener("click", event => {
    const button = event.target.closest("[data-certificate-filter]");
    if (!button) return;
    certificateFilters.querySelectorAll("button").forEach(item => item.setAttribute("aria-pressed", String(item === button)));
    let count = 0;
    certificateCards.forEach(card => {
      card.hidden = button.dataset.certificateFilter !== "all" && card.dataset.certificateCategory !== button.dataset.certificateFilter;
      if (!card.hidden) count++;
    });
    const status = document.querySelector("#certificate-count");
    status.textContent = count + " " + status.dataset.resultLabel;
  });
}

document.querySelectorAll(".certificate-image img").forEach(image => {
  const showError = () => {
    image.hidden = true;
    image.parentElement.querySelector(".certificate-image-error").hidden = false;
  };
  image.addEventListener("error", showError, { once: true });
  if (image.complete && !image.naturalWidth) showError();
});

const viewer = document.querySelector("#certificate-viewer");
const certificateLinks = [...document.querySelectorAll("[data-certificate]")];
if (viewer && typeof viewer.showModal === "function" && certificateLinks.length) {
  const image = viewer.querySelector("#viewer-image");
  const stage = viewer.querySelector(".viewer-stage");
  const status = viewer.querySelector("#viewer-status");
  const zoom = viewer.querySelector("[data-viewer-zoom]");
  let items = [], index = 0, returnFocus = null;

  function resetZoom() {
    stage.classList.remove("is-zoomed");
    stage.scrollTo(0, 0);
    zoom.setAttribute("aria-pressed", "false");
  }

  function renderCertificate() {
    const link = items[index];
    resetZoom();
    image.hidden = true;
    // Disabling the focused zoom control would otherwise drop focus outside the dialog.
    if (document.activeElement === zoom) viewer.querySelector(".viewer-close").focus({ preventScroll: true });
    zoom.disabled = true;
    status.hidden = false;
    status.textContent = viewer.dataset.loading;
    viewer.querySelector("#viewer-title").textContent = link.dataset.title;
    viewer.querySelector("#viewer-description").textContent = link.dataset.description;
    viewer.querySelector("#viewer-issuer").textContent = link.dataset.issuer;
    viewer.querySelector("#viewer-issued").textContent = link.dataset.issued;
    viewer.querySelector("#viewer-count").textContent = `${index + 1} / ${items.length}`;
    viewer.querySelector("#viewer-original").href = link.href;
    const download = viewer.querySelector("#viewer-download");
    download.href = link.href;
    download.download = new URL(link.href).pathname.split("/").pop();
    viewer.querySelectorAll("[data-viewer-prev], [data-viewer-next]").forEach(button => { button.disabled = items.length < 2; });
    image.alt = link.dataset.alt;
    image.onload = () => {
      image.hidden = false;
      status.hidden = true;
      zoom.disabled = false;
    };
    image.onerror = () => {
      image.hidden = true;
      status.hidden = false;
      status.textContent = viewer.dataset.error;
      zoom.disabled = true;
    };
    image.src = link.href;
  }

  function openCertificate(link, opener, visibleOnly) {
    items = visibleOnly ? certificateLinks.filter(item => !item.closest(".certificate-card").hidden) : certificateLinks;
    index = items.indexOf(link);
    if (index < 0) return;
    returnFocus = opener;
    closeMenu();
    renderCertificate();
    viewer.showModal();
    document.body.classList.add("viewer-open");
    viewer.querySelector(".viewer-close").focus({ preventScroll: true });
  }

  certificateLinks.forEach(link => link.addEventListener("click", event => {
    // Retain the ordinary image link for modified clicks and no-JS browsing.
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openCertificate(link, link, true);
  }));
  document.querySelectorAll("[data-evidence-id]").forEach(link => link.addEventListener("click", event => {
    const imageLink = certificateLinks.find(item => item.dataset.certificate === link.dataset.evidenceId);
    if (!imageLink || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    openCertificate(imageLink, link, false);
  }));

  function step(direction) {
    index = (index + direction + items.length) % items.length;
    renderCertificate();
  }
  viewer.querySelector("[data-viewer-prev]").addEventListener("click", () => step(-1));
  viewer.querySelector("[data-viewer-next]").addEventListener("click", () => step(1));
  viewer.querySelector(".viewer-close").addEventListener("click", () => viewer.close());
  zoom.addEventListener("click", () => {
    const enlarged = !stage.classList.contains("is-zoomed");
    stage.classList.toggle("is-zoomed", enlarged);
    zoom.setAttribute("aria-pressed", String(enlarged));
    stage.scrollTo(0, 0);
  });
  viewer.addEventListener("keydown", event => {
    if (event.key === "Tab") {
      const controls = [...viewer.querySelectorAll("button:not([disabled]), a[href]")].filter(element => element.getClientRects().length);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      if (stage.classList.contains("is-zoomed")) return;
      event.preventDefault();
      step(event.key === "ArrowRight" ? 1 : -1);
    }
  });
  const outsideViewer = event => {
    const rect = viewer.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  };
  let startedOutside = false;
  viewer.addEventListener("pointerdown", event => { startedOutside = outsideViewer(event); });
  viewer.addEventListener("click", event => {
    if (startedOutside && outsideViewer(event)) viewer.close();
    startedOutside = false;
  });
  viewer.addEventListener("close", () => {
    document.body.classList.remove("viewer-open");
    image.onload = image.onerror = null;
    image.removeAttribute("src");
    resetZoom();
    if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
  });
}

if (document.body.dataset.page === "home") {
  const sections = [...document.querySelectorAll("main > section[id]")];
  let scheduled = false;
  function updateCurrentSection() {
    scheduled = false;
    const offset = document.querySelector(".site-nav").getBoundingClientRect().height + 55;
    let current = "";
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= offset) current = section.id;
    });
    nav.querySelectorAll("a").forEach(link => {
      if (link.hash === "#" + current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  function scheduleNavigationUpdate() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(updateCurrentSection); }
  }
  addEventListener("scroll", scheduleNavigationUpdate, { passive: true });
  addEventListener("resize", scheduleNavigationUpdate);
  updateCurrentSection();
}
