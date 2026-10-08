// Keep long descriptions readable while editing and after importing a CV.
const editorNav = document.getElementById("editor-nav");
document.querySelectorAll(".form-card").forEach((card, index) => {
  card.id = `editor-section-${index}`;
  const link = document.createElement("a");
  link.href = `#${card.id}`;
  link.textContent = card.querySelector("h2").textContent;
  editorNav.append(link);
});
function resizeDescriptions() {
  document.querySelectorAll("textarea").forEach(input => {
    input.style.height = "auto";
    input.style.height = `${input.scrollHeight + 2}px`;
  });
}
document.getElementById("cv-form").addEventListener("input", resizeDescriptions);
new MutationObserver(resizeDescriptions).observe(document.getElementById("cv-form"), { childList: true, subtree: true });
window.addEventListener("resize", resizeDescriptions);
document.fonts.ready.then(resizeDescriptions);
resizeDescriptions();
