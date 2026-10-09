(function () {
  "use strict";
  const current = document.documentElement.lang;
  const mode = document.querySelector('meta[name="portfolio-auto-language"]');
  const alternate = (lang) =>
    document.querySelector('meta[name="portfolio-path-' + lang + '"]')?.content;
  if (!alternate("vi") || !alternate("en")) return;
  const url = new URL(location.href),
    explicit = url.searchParams.get("lang");
  let saved;
  try {
    saved = localStorage.getItem("portfolio.language");
  } catch {
    /* Private mode can block storage. */
  }
  let desired = current;
  if (["vi", "en"].includes(explicit)) {
    desired = explicit;
    try {
      localStorage.setItem("portfolio.language", explicit);
    } catch {
      /* The URL still preserves the choice. */
    }
  } else if (current === "en") desired = "en";
  else if (["vi", "en"].includes(saved)) desired = saved;
  else if (mode?.content !== "off" && current === "vi") {
    const preferences = navigator.languages || [navigator.language];
    const firstSupported = preferences
      .map((x) => x.split("-")[0].toLowerCase())
      .find((x) => x === "en" || x === "vi");
    if (firstSupported) desired = firstSupported;
  }
  if (desired !== current) {
    const destination = new URL(alternate(desired), url);
    destination.search = url.search;
    destination.hash = url.hash;
    location.replace(destination.href);
    return;
  }
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".language-link").forEach((link) => {
      const destination = new URL(link.href);
      destination.search = location.search;
      destination.searchParams.set("lang", link.lang);
      destination.hash = location.hash;
      link.href = destination.href;
      link.addEventListener("click", () => {
        try {
          localStorage.setItem("portfolio.language", link.lang);
        } catch {
          /* URL fallback. */
        }
      });
    });
  });
})();
