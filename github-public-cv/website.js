function renderWebsiteSummary() {
  const en = state.activeDoc === "en";
  document.getElementById("share-result").hidden = true;
  text("share-status", "");
  const profile = getActiveDoc().profile;
  const demo = !profile.fullName.trim() || profile.fullName === demoDocVi.profile.fullName || profile.fullName === demoDocEn.profile.fullName;
  const notice = document.getElementById("demo-notice");
  notice.hidden = !demo;
  notice.textContent = en
    ? "Sample CV. This page does not contain the owner's personal resume yet."
    : "CV minh họa. Trang hiện chưa chứa hồ sơ cá nhân thật của chủ sở hữu.";
  text("page-title", demo ? (en ? "CV preview" : "Bản xem trước CV") : profile.fullName);
  text("page-subtitle", demo
    ? (en ? "A bilingual resume, ready to share." : "Hồ sơ song ngữ, sẵn sàng để chia sẻ.")
    : profile.headline);
  text("share-cv", en ? "Copy link" : "Sao chép liên kết");
  text("share-url-label", en ? "Public page link" : "Liên kết trang công khai");
  text("footer-copy", en ? "Bilingual resume · A4 print" : "CV song ngữ · Bản in A4");
  document.querySelector(".skip-link").textContent = en ? "Skip to resume" : "Đến nội dung CV";
  document.getElementById("cv-preview").lang = state.activeDoc;
  document.title = demo ? (en ? "CV preview | Profile CV" : "Bản xem trước | Profile CV") : profile.fullName + " | " + (en ? "Resume" : "CV");
  document.querySelector('meta[name="description"]').content = demo
    ? (en ? "Bilingual CV preview with A4 printing." : "Bản xem trước CV song ngữ, hỗ trợ in A4.")
    : [profile.fullName, profile.headline].filter(Boolean).join(" · ");

  const nav = document.getElementById("section-nav");
  nav.setAttribute("aria-label", en ? "Resume sections" : "Các mục trong CV");
  nav.replaceChildren();
  document.querySelectorAll(".sidebar-block, .main-block").forEach(block => {
    if (block.style.display === "none") return;
    const heading = block.querySelector("h3");
    if (!heading) return;
    const link = document.createElement("a");
    link.href = "#" + block.id;
    link.textContent = heading.textContent;
    nav.append(link);
  });
}

document.getElementById("share-cv").addEventListener("click", async () => {
  const en = state.activeDoc === "en";
  const url = new URL(window.location.href);
  url.hash = "";
  url.search = "";
  url.searchParams.set("lang", state.activeDoc);
  const input = document.getElementById("share-url");
  input.value = url.href;
  try {
    await navigator.clipboard.writeText(url.href);
    document.getElementById("share-result").hidden = true;
    text("share-status", en ? "Public page link copied. Local JSON previews are not shared." : "Đã sao chép liên kết trang công khai. Nội dung JSON xem thử trên máy không được chia sẻ.");
  } catch {
    document.getElementById("share-result").hidden = false;
    input.focus();
    input.select();
    text("share-status", en ? "Select and copy the link below." : "Bạn có thể chọn và sao chép liên kết bên dưới.");
  }
});

const photo = document.getElementById("preview-photo");
photo.addEventListener("error", () => {
  const placeholder = new URL("assets/avatar-placeholder.svg", window.location.href).href;
  if (photo.src !== placeholder) photo.src = placeholder;
});
renderWebsiteSummary();
