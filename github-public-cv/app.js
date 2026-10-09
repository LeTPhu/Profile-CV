const STORAGE_KEY = "cv-public-site-v2";
const LEGACY_STORAGE_KEYS = ["cv-public-site-v1"];
const DATA_SOURCE = "./data/cv-public.json";

const fallbackPhoto =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=640&q=80";

const FONT_PRESETS = {
  be_vietnam: {
    body: '"Be Vietnam Pro", sans-serif',
    heading: '"Be Vietnam Pro", sans-serif',
  },
  roboto: {
    body: '"Roboto", sans-serif',
    heading: '"Roboto", sans-serif',
  },
};

const UI_COPY = {
  vi: {
    pageTitle: "Hồ sơ CV công khai",
    pageSubtitle: "Đọc dữ liệu từ data/cv-public.json hoặc nhập file JSON từ máy.",
    loading: "Đang tải dữ liệu...",
    loaded: "Đã tải dữ liệu từ repo thành công.",
    loadedLocal: "Đang dùng dữ liệu JSON bạn đã nhập trước đó (local).",
    imported: "Đã nhập JSON thành công.",
    fallback:
      "Không đọc được data/cv-public.json. Hiện tại đang hiển thị dữ liệu mặc định trong app.",
    invalidFile: "File JSON không hợp lệ.",
  },
  en: {
    pageTitle: "Public CV Profile",
    pageSubtitle: "Loaded from data/cv-public.json or a JSON file you import from your computer.",
    loading: "Loading CV data...",
    loaded: "Loaded data from repository successfully.",
    loadedLocal: "Using locally imported JSON data from this browser.",
    imported: "JSON imported successfully.",
    fallback: "Could not load data/cv-public.json. Showing built-in demo data.",
    invalidFile: "Invalid JSON file.",
  },
};

const SECTION_LABELS = {
  vi: {
    personal: "Thông tin cá nhân",
    skills: "Các kỹ năng",
    awards: "Giải thưởng",
    languages: "Ngôn ngữ",
    summary: "Hồ sơ chuyên môn",
    education: "Học vấn",
    experience: "Kinh nghiệm làm việc",
    projects: "Dự án",
    custom: "Mục bổ sung",
    certifications: "Chứng chỉ",
    contact: {
      dob: "Ngày sinh",
      nationality: "Quốc tịch",
      email: "Email",
      phone: "Điện thoại",
      website: "Website",
      address: "Địa chỉ",
    },
  },
  en: {
    personal: "Personal Information",
    skills: "Skills",
    awards: "Awards",
    languages: "Languages",
    summary: "Professional Profile",
    education: "Education",
    experience: "Work Experience",
    projects: "Projects",
    custom: "Additional Section",
    certifications: "Certifications",
    contact: {
      dob: "Date of birth",
      nationality: "Nationality",
      email: "Email",
      phone: "Phone",
      website: "Website",
      address: "Address",
    },
  },
};

const demoDocVi = {
  profile: {
    fullName: "Nguyễn Văn A",
    headline: "AI Engineer",
    dob: "01/01/2000",
    nationality: "Việt Nam",
    email: "example@email.com",
    phone: "+84 900 000 000",
    website: "linkedin.com/in/your-profile",
    address: "Hồ Chí Minh, Việt Nam",
    summary:
      "Tìm kiếm vai trò AI Engineer để phát triển sản phẩm ứng dụng Machine Learning.\nĐóng góp giải pháp đạt hiệu quả kinh doanh đo lường được.",
    photo: fallbackPhoto,
  },
  theme: {
    accent: "#1d7c73",
    layout: "left",
    fontPreset: "be_vietnam",
    baseFontSize: 13.3,
    sectionTitleSize: 15,
    entryTitleSize: 14.4,
    lineHeight: 1.55,
    sectionGap: 14,
    sidebarWidth: 34,
    sidebarPadding: 20,
    awardColumnGap: 8,
    sidebarSectionGap: 18,
    justifyText: false,
    photoSize: 170,
    photoBorder: 3,
  },
  visibility: {
    photo: true,
    personal: true,
    skills: true,
    languages: true,
    awards: true,
    summary: true,
    education: true,
    experience: true,
    projects: true,
    customSections: true,
    certifications: true,
  },
  contactVisibility: {
    dob: true,
    nationality: true,
    email: true,
    phone: true,
    website: true,
    address: true,
  },
  experience: [
    {
      role: "AI Intern",
      company: "ABC Tech",
      period: "09/2024 - 10/2024",
      location: "Hồ Chí Minh",
      details:
        "Tham gia dự án gợi ý dữ liệu lớn.\nHỗ trợ xây pipeline ETL và quản trị chất lượng dữ liệu.\nBáo cáo kết quả theo tuần cho team.",
    },
  ],
  education: [
    {
      school: "Nguyen Tat Thanh University",
      degree: "Công nghệ thông tin - Trí tuệ nhân tạo",
      period: "09/2021 - 02/2025",
      details: "GPA: 3.75 - Xuất sắc",
    },
  ],
  projects: [
    {
      name: "Ecommerce FiveStars",
      role: "Trưởng nhóm",
      period: "02/2023 - 03/2023",
      details:
        "Xây dựng dashboard đánh giá hiệu quả các mô hình.\nTối ưu metric và theo dõi chất lượng sản phẩm.",
    },
  ],
  customSections: [
    {
      title: "Hoạt động",
      details: "Tình nguyện viên cho CLB kỹ thuật.\nTổ chức workshop chia sẻ về AI ứng dụng.",
    },
  ],
  skills: [
    {
      name: "Python",
      level: "Advanced",
      details: "FastAPI, Pandas, Numpy",
    },
    {
      name: "Machine Learning",
      level: "Advanced",
      details: "Model training, evaluation, deployment",
    },
  ],
  languages: [
    { name: "Tiếng Việt", level: "Bản ngữ" },
    { name: "Tiếng Anh", level: "IELTS 7.0" },
  ],
  certifications: [{ title: "Basic IT Application", year: "2020" }],
  awards: [
    { month: "11", year: "2024", title: "Top 5 Data Science Challenge" },
    { month: "07", year: "2024", title: "Third Prize AI Contest" },
  ],
};

const demoDocEn = {
  profile: {
    fullName: "Nguyễn Văn A",
    headline: "AI Engineer",
    dob: "Jan 01, 2000",
    nationality: "Vietnamese",
    email: "example@email.com",
    phone: "+84 900 000 000",
    website: "linkedin.com/in/your-profile",
    address: "Ho Chi Minh City, Vietnam",
    summary:
      "Seeking an AI Engineer role to build production-ready Machine Learning solutions.\nFocused on measurable business impact and reliable deployment.",
    photo: fallbackPhoto,
  },
  theme: {
    accent: "#1f4e79",
    layout: "right",
    fontPreset: "roboto",
    baseFontSize: 13.2,
    sectionTitleSize: 15.2,
    entryTitleSize: 14.3,
    lineHeight: 1.55,
    sectionGap: 14,
    sidebarWidth: 35,
    sidebarPadding: 20,
    awardColumnGap: 8,
    sidebarSectionGap: 18,
    justifyText: false,
    photoSize: 170,
    photoBorder: 3,
  },
  visibility: structuredClone(demoDocVi.visibility),
  contactVisibility: structuredClone(demoDocVi.contactVisibility),
  experience: [
    {
      role: "AI Intern",
      company: "ABC Tech",
      period: "Sep 2024 - Oct 2024",
      location: "Ho Chi Minh City",
      details:
        "Contributed to a recommendation system project.\nBuilt ETL support scripts and data quality checks.\nReported weekly progress to product and engineering teams.",
    },
  ],
  education: [
    {
      school: "Nguyen Tat Thanh University",
      degree: "BSc in Computer Science - Artificial Intelligence",
      period: "Sep 2021 - Feb 2025",
      details: "GPA: 3.75 - Excellent",
    },
  ],
  projects: [
    {
      name: "Ecommerce FiveStars",
      role: "Team Lead",
      period: "Feb 2023 - Mar 2023",
      details:
        "Built an analytics dashboard for model quality.\nDefined metrics and improved release confidence.",
    },
  ],
  customSections: [
    {
      title: "Activities",
      details: "Volunteer at technical student club.\nOrganized an internal AI workshop.",
    },
  ],
  skills: [
    { name: "Python", level: "Advanced", details: "FastAPI, Pandas, Numpy" },
    { name: "Machine Learning", level: "Advanced", details: "Training, eval, deployment" },
  ],
  languages: [
    { name: "Vietnamese", level: "Native" },
    { name: "English", level: "IELTS 7.0" },
  ],
  certifications: [{ title: "Basic IT Application", year: "2020" }],
  awards: [
    { month: "11", year: "2024", title: "Top 5 Data Science Challenge" },
    { month: "07", year: "2024", title: "Third Prize AI Contest" },
  ],
};

const defaultState = {
  activeDoc: "vi",
  documents: {
    vi: demoDocVi,
    en: demoDocEn,
  },
};

let state = normalizeAppState(defaultState);
let automaticLanguage = true;

init();

async function init() {
  applyLangFromQuery();
  renderAll();
  setBusy(true);
  bindActions();

  const loadedRepo = await loadFromRepo();
  const loadedLocal = !loadedRepo && loadFromLocalStorage();

  applyLangFromQuery();
  renderAll();

  if (loadedRepo) setStatus(getUiCopy().loaded);
  else if (loadedLocal) setStatus(getUiCopy().loadedLocal);
  else setStatus(getUiCopy().fallback, true);
  setBusy(false);
}

function bindActions() {
  document.getElementById("print-cv").addEventListener("click", async () => { await document.fonts.ready; window.print(); });

  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-lang");
      if (target !== "vi" && target !== "en") return;
      state.activeDoc = target;
      updateUrlLang(target);
      renderAll();
    });
  });

  document.getElementById("import-json").addEventListener("change", async (event) => {
    const [file] = event.target.files || [];
    if (!file) return;
    setBusy(true);
    try {
      const text = await file.text();
      const parsed = JSON.parse(text.replace(/^\uFEFF/, ""));
      validatePayload(parsed);
      if (!ingestData(parsed)) throw new Error("invalid");
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch { /* Preview remains usable without browser storage. */ }
      setStatus(getUiCopy().imported);
      renderAll();
    } catch {
      setStatus(getUiCopy().invalidFile, true);
      alert(getUiCopy().invalidFile);
    }
    event.target.value = "";
    setBusy(false);
  });

  document.getElementById("use-repo-data").addEventListener("click", async () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
    } catch { /* Storage may be disabled. */ }
    setBusy(true);
    setStatus(getUiCopy().loading);
    await loadFromRepo();
    applyLangFromQuery();
    renderAll();
    setBusy(false);
  });
}

function loadFromLocalStorage() {
  try {
    const keys = [STORAGE_KEY, ...LEGACY_STORAGE_KEYS];
    for (const key of keys) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      validatePayload(parsed);
      state = normalizeAppState(mergeData(defaultState, parsed));
      if (key !== STORAGE_KEY) localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

async function loadFromRepo() {
  setStatus(getUiCopy().loading);
  try {
    const response = await fetch(DATA_SOURCE, { cache: "no-store", signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const parsed = await response.json();
    validatePayload(parsed);
    if (!ingestData(parsed)) throw new Error("invalid data structure");
    automaticLanguage = parsed.autoLanguage !== false;
    setStatus(getUiCopy().loaded);
    return true;
  } catch {
    setStatus(getUiCopy().fallback, true);
    return false;
  }
}

function ingestData(payload) {
  validatePayload(payload);
  if (!payload || typeof payload !== "object") return false;

  if (payload.documents && typeof payload.documents === "object") {
    state = normalizeAppState(mergeData(state, payload));
    return true;
  }

  if ((payload.vi && isDocumentPayload(payload.vi)) || (payload.en && isDocumentPayload(payload.en))) {
    const incoming = {
      activeDoc: state.activeDoc,
      documents: {
        vi: payload.vi || state.documents.vi,
        en: payload.en || state.documents.en,
      },
    };
    state = normalizeAppState(mergeData(state, incoming));
    return true;
  }

  if (payload.document && isDocumentPayload(payload.document)) {
    return applyDocumentToActive(payload.document);
  }

  if (isDocumentPayload(payload)) {
    return applyDocumentToActive(payload);
  }

  return false;
}

function applyDocumentToActive(docPayload) {
  const fallback = state.activeDoc === "en" ? demoDocEn : demoDocVi;
  state.documents[state.activeDoc] = normalizeDocument(
    mergeData(state.documents[state.activeDoc], docPayload),
    fallback
  );
  return true;
}

function applyLangFromQuery() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  if (lang === "vi" || lang === "en") {
    state.activeDoc = lang;
    rememberLanguage(lang);
    return;
  }
  let saved;
  try {
    saved = localStorage.getItem("portfolio.language");
  } catch {
    /* Language detection still works without storage. */
  }
  if (saved === "vi" || saved === "en") state.activeDoc = saved;
  else if (automaticLanguage) {
    const preferred = (navigator.languages || [navigator.language])
      .map(value => value.toLowerCase().split("-")[0])
      .find(value => value === "vi" || value === "en");
    if (preferred) state.activeDoc = preferred;
  }
}

function rememberLanguage(lang) {
  try {
    localStorage.setItem("portfolio.language", lang);
  } catch {
    /* Explicit URL choice is the storage fallback. */
  }
}

function updateUrlLang(lang) {
  const url = new URL(window.location.href);
  url.searchParams.set("lang", lang);
  window.history.replaceState({}, "", url.toString());
  rememberLanguage(lang);
}

function getUiCopy() {
  return UI_COPY[state.activeDoc] || UI_COPY.vi;
}

function getActiveDoc() {
  return state.documents[state.activeDoc];
}

function normalizeAppState(rawState) {
  const merged = mergeData(defaultState, rawState || {});
  return {
    activeDoc: merged.activeDoc === "en" ? "en" : "vi",
    documents: {
      vi: normalizeDocument(merged.documents?.vi, demoDocVi),
      en: normalizeDocument(merged.documents?.en, demoDocEn),
    },
  };
}

function normalizeDocument(data, fallbackDoc) {
  const doc = mergeData(fallbackDoc, data || {});

  doc.theme = mergeData(fallbackDoc.theme, doc.theme || {});
  doc.visibility = mergeData(fallbackDoc.visibility, doc.visibility || {});
  doc.contactVisibility = mergeData(fallbackDoc.contactVisibility, doc.contactVisibility || {});

  doc.theme.fontPreset = FONT_PRESETS[doc.theme.fontPreset] ? doc.theme.fontPreset : fallbackDoc.theme.fontPreset;

  doc.experience = normalizeArray(doc.experience);
  doc.education = normalizeArray(doc.education);
  doc.projects = normalizeArray(doc.projects);
  doc.customSections = normalizeArray(doc.customSections);
  doc.skills = normalizeArray(doc.skills);
  doc.languages = normalizeArray(doc.languages);
  doc.certifications = normalizeArray(doc.certifications);
  doc.awards = normalizeArray(doc.awards).map((award) => normalizeAward(award));

  return doc;
}

function normalizeArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeAward(award) {
  const parsed = parseAwardDate(award?.date ?? "");
  return {
    ...award,
    month: String(award?.month ?? parsed.month ?? ""),
    year: String(award?.year ?? parsed.year ?? ""),
    title: String(award?.title ?? ""),
  };
}

function isDocumentPayload(payload) {
  if (!payload || typeof payload !== "object") return false;
  return ["profile", "theme", "experience", "education", "projects", "skills"].some((key) => key in payload);
}

function renderAll() {
  document.documentElement.lang = state.activeDoc;
  const status = document.getElementById("status-text");
  if (status.dataset.statusKey) status.textContent = getUiCopy()[status.dataset.statusKey];
  renderHeader();
  renderLangSwitch();
  renderPreview();
  if (typeof renderWebsiteSummary === "function") renderWebsiteSummary();
}

function renderHeader() {
  const en = state.activeDoc === "en";
  text("import-label", en ? "Preview JSON" : "Xem thử JSON");
  text("tools-label", en ? "Preview tools" : "Công cụ xem thử");
  text("use-repo-data", en ? "Published version" : "Bản đã công bố");
  text("print-cv", en ? "Print / Save PDF" : "In / Lưu PDF");
  text("page-subtitle", en ? "Experience, projects and achievements." : "Kinh nghiệm, dự án và những dấu mốc nổi bật.");
  document.title = (getActiveDoc().profile.fullName || "CV") + " | " + (en ? "Resume" : "Hồ sơ nghề nghiệp");
  document.getElementById("preview-photo").alt = en ? "Profile photo" : "Ảnh đại diện";
  text("tools-hint", en ? "Import JSON to preview on this device. Update data/cv-public.json to publish changes." : "Nhập JSON để xem thử trên máy này. Cập nhật data/cv-public.json để công bố thay đổi.");
  const copy = getUiCopy();
  text("page-title", copy.pageTitle);
  
}

function renderLangSwitch() {
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.classList.toggle("active", button.getAttribute("data-lang") === state.activeDoc);
    button.setAttribute("aria-pressed", String(button.getAttribute("data-lang") === state.activeDoc));
  });
}

function renderPreview() {
  const doc = getActiveDoc();
  const labels = SECTION_LABELS[state.activeDoc] || SECTION_LABELS.vi;
  const preview = document.getElementById("cv-preview");
  const accent = /^#[0-9a-f]{6}$/i.test(doc.theme.accent) ? doc.theme.accent : "#1d7c73";
  preview.style.setProperty("--sidebar", `color-mix(in srgb, ${accent} 12%, white)`);
  const fontPreset = FONT_PRESETS[doc.theme.fontPreset] || FONT_PRESETS.be_vietnam;

  preview.style.setProperty("--accent", accent);
  preview.style.setProperty("--font-body", fontPreset.body);
  preview.style.setProperty("--font-heading", fontPreset.heading);
  preview.style.setProperty("--base-font-size", `${clamp(Number(doc.theme.baseFontSize), 11.5, 16)}px`);
  preview.style.setProperty(
    "--section-title-size",
    `${clamp(Number(doc.theme.sectionTitleSize), 12, 22)}px`
  );
  preview.style.setProperty(
    "--entry-title-size",
    `${clamp(Number(doc.theme.entryTitleSize), 12, 18)}px`
  );
  preview.style.setProperty("--base-line-height", `${clamp(Number(doc.theme.lineHeight), 1.2, 2)}`);
  preview.style.setProperty("--section-gap", `${clamp(Number(doc.theme.sectionGap), 8, 24)}px`);
  preview.style.setProperty("--sidebar-width", `${clamp(Number(doc.theme.sidebarWidth), 22, 48)}%`);

  const sidebarPadding = clamp(Number(doc.theme.sidebarPadding), 14, 30);
  const awardColumnGap = clamp(Number(doc.theme.awardColumnGap), 4, 24);
  const sidebarBlockGap = clamp(Number(doc.theme.sidebarSectionGap), 8, 28);
  preview.style.setProperty("--sidebar-padding-x", `${sidebarPadding}px`);
  preview.style.setProperty("--sidebar-padding-y", `${sidebarPadding + 6}px`);
  preview.style.setProperty("--award-column-gap", `${awardColumnGap}px`);
  preview.style.setProperty("--sidebar-block-gap", `${sidebarBlockGap}px`);
  preview.style.setProperty("--body-align", doc.theme.justifyText ? "justify" : "left");
  preview.style.setProperty("--photo-size", `${clamp(Number(doc.theme.photoSize), 110, 220)}px`);
  preview.style.setProperty("--photo-border", `${clamp(Number(doc.theme.photoBorder), 1, 6)}px`);

  preview.classList.remove("layout-left", "layout-right", "layout-stacked", "profile-vi", "profile-en");
  preview.classList.add(`layout-${normalizeLayout(doc.theme.layout)}`);
  preview.classList.add(state.activeDoc === "en" ? "profile-en" : "profile-vi");

  text("title-personal", labels.personal);
  text("title-skills", labels.skills);
  text("title-awards", labels.awards);
  text("title-languages", labels.languages);
  text("title-summary", labels.summary);
  text("title-education", labels.education);
  text("title-experience", labels.experience);
  text("title-projects", labels.projects);
  text("title-custom", labels.custom);
  text("title-certifications", labels.certifications);

  text("preview-name", doc.profile.fullName);
  text("preview-headline", doc.profile.headline);
  document.getElementById("preview-photo").src = safePhoto(doc.profile.photo);

  renderSummary(doc.profile.summary);

  const contactEntries = [
    { key: "dob", label: labels.contact.dob, value: doc.profile.dob },
    { key: "nationality", label: labels.contact.nationality, value: doc.profile.nationality },
    { key: "email", label: labels.contact.email, value: doc.profile.email },
    { key: "phone", label: labels.contact.phone, value: doc.profile.phone },
    { key: "website", label: labels.contact.website, value: doc.profile.website },
    { key: "address", label: labels.contact.address, value: doc.profile.address },
  ].filter((item) => doc.contactVisibility[item.key] && String(item.value || "").trim());
  renderContactList(contactEntries);

  renderSkills(doc.skills);
  renderLanguages(doc.languages);
  renderAwardsSidebar(doc.awards);
  renderEducation(doc.education);
  renderExperience(doc.experience);
  renderProjects(doc.projects);
  renderCustomSections(doc.customSections);
  renderMini("preview-certifications", doc.certifications, "title", "year");

  setVisible("block-photo", doc.visibility.photo);
  setVisible("block-personal", doc.visibility.personal && contactEntries.length > 0);
  setVisible("block-skills", doc.visibility.skills && hasMeaningfulItems(doc.skills));
  setVisible("block-awards", doc.visibility.awards && hasMeaningfulItems(doc.awards));
  setVisible("block-languages", doc.visibility.languages && hasMeaningfulItems(doc.languages));
  setVisible("block-summary", doc.visibility.summary && hasText(doc.profile.summary));
  setVisible("block-education", doc.visibility.education && hasMeaningfulItems(doc.education));
  setVisible("block-experience", doc.visibility.experience && hasMeaningfulItems(doc.experience));
  setVisible("block-projects", doc.visibility.projects && hasMeaningfulItems(doc.projects));
  setVisible("block-custom-sections", doc.visibility.customSections && hasMeaningfulItems(doc.customSections));
  setVisible("block-certifications", doc.visibility.certifications && hasMeaningfulItems(doc.certifications));
}

function hasText(value) {
  return String(value || "").trim().length > 0;
}

function hasMeaningfulItems(items) {
  return Array.isArray(items) && items.some((item) => item && Object.values(item).some(hasText));
}

function renderContactList(entries) {
  const ul = document.getElementById("preview-contact");
  ul.innerHTML = "";

  entries.forEach((entry) => {
    const lines = cleanLines(entry.value);
    if (!lines.length) return;

    const li = document.createElement("li");
    li.className = "contact-item";
    li.innerHTML = '<span class="contact-dot" aria-hidden="true"></span>';

    const content = document.createElement("div");
    content.className = "contact-content";

    if (lines.length === 1) {
      content.innerHTML = `<strong>${escapeHtml(entry.label)}:</strong> ${escapeHtml(lines[0])}`;
    } else {
      content.innerHTML = `
        <strong>${escapeHtml(entry.label)}:</strong>
        <ul class="contact-detail-list">
          ${lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
        </ul>
      `;
    }

    li.append(content);
    ul.append(li);
  });
}

function renderSkills(skills) {
  const ul = document.getElementById("preview-skills");
  ul.innerHTML = "";

  skills.forEach((skill) => {
    const li = document.createElement("li");
    const detailLines = cleanLines(skill.details);

    if (detailLines.length > 1) {
      li.innerHTML = `
        <strong>${escapeHtml(skill.name || "")}</strong>
        <small>${escapeHtml(skill.level || "")}</small>
        <ul class="skill-detail-list">
          ${detailLines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
        </ul>
      `;
    } else {
      li.innerHTML = `
        <strong>${escapeHtml(skill.name || "")}</strong>
        <small>${escapeHtml(skill.level || "")}</small>
        <small>${escapeHtml(detailLines[0] || "")}</small>
      `;
    }
    ul.append(li);
  });
}

function renderLanguages(languages) {
  const ul = document.getElementById("preview-languages");
  ul.innerHTML = "";

  languages.forEach((lang) => {
    const li = document.createElement("li");
    li.innerHTML = `<strong>${escapeHtml(lang.name || "")}</strong><small>${escapeHtml(lang.level || "")}</small>`;
    ul.append(li);
  });
}

function renderAwardsSidebar(awards) {
  const root = document.getElementById("preview-awards-sidebar");
  root.innerHTML = "";

  awards.forEach((award) => {
    const row = document.createElement("div");
    row.className = "award-row";
    row.innerHTML = `
      <span class="award-date">${escapeHtml(formatAwardDate(award))}</span>
      <span class="award-title">${escapeHtml(award.title || "")}</span>
    `;
    root.append(row);
  });
}

function renderEducation(education) {
  const root = document.getElementById("preview-education");
  root.innerHTML = "";

  education.forEach((edu) => {
    const entry = document.createElement("article");
    entry.className = "entry";
    entry.innerHTML = `
      <div class="entry-head">
        <div class="entry-title">${escapeHtml(edu.degree || "")}</div>
        <div class="entry-meta">${escapeHtml(edu.period || "")}</div>
      </div>
      <div class="entry-sub">${escapeHtml(edu.school || "")}</div>
      ${renderParagraphOrBullets(edu.details)}
    `;
    root.append(entry);
  });
}

function renderExperience(experience) {
  const root = document.getElementById("preview-experience");
  root.innerHTML = "";

  experience.forEach((job) => {
    const entry = document.createElement("article");
    entry.className = "entry";
    entry.innerHTML = `
      <div class="entry-head">
        <div class="entry-title">${escapeHtml(job.role || "")}</div>
        <div class="entry-meta">${escapeHtml(job.period || "")}</div>
      </div>
      <div class="entry-sub">${escapeHtml(job.company || "")} ${job.location ? `| ${escapeHtml(job.location)}` : ""}</div>
      ${renderBullets(job.details)}
    `;
    root.append(entry);
  });
}

function renderProjects(projects) {
  const root = document.getElementById("preview-projects");
  root.innerHTML = "";

  projects.forEach((project) => {
    const entry = document.createElement("article");
    entry.className = "entry";
    entry.innerHTML = `
      <div class="entry-head">
        <div class="entry-title">${escapeHtml(project.name || "")}</div>
        <div class="entry-meta">${escapeHtml(project.period || "")}</div>
      </div>
      <div class="entry-sub">${escapeHtml(project.role || "")}</div>
      ${renderBullets(project.details)}
    `;
    root.append(entry);
  });
}

function renderCustomSections(customSections) {
  const root = document.getElementById("preview-custom-sections");
  root.innerHTML = "";

  customSections.forEach((section) => {
    const entry = document.createElement("article");
    entry.className = "entry";
    entry.innerHTML = `
      <div class="entry-head">
        <div class="entry-title">${escapeHtml(section.title || "")}</div>
      </div>
      ${renderBullets(section.details)}
    `;
    root.append(entry);
  });
}

function renderMini(targetId, items, titleKey, yearKey) {
  const root = document.getElementById(targetId);
  root.className = "chip-list";
  root.innerHTML = "";

  items.forEach((item) => {
    const line = document.createElement("div");
    line.className = "chip";
    line.innerHTML = `<strong>${escapeHtml(item[yearKey] || "")}</strong> - ${escapeHtml(item[titleKey] || "")}`;
    root.append(line);
  });
}

function renderSummary(textBlock) {
  const root = document.getElementById("preview-summary");
  const lines = cleanLines(textBlock);
  if (!lines.length) {
    root.innerHTML = "";
    return;
  }
  if (lines.length === 1) {
    root.innerHTML = `<p>${escapeHtml(lines[0])}</p>`;
    return;
  }
  root.innerHTML = `<ul>${lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>`;
}

function renderBullets(textBlock) {
  const lines = cleanLines(textBlock);
  if (!lines.length) return "";
  return `<ul>${lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>`;
}

function renderParagraphOrBullets(textBlock) {
  const lines = cleanLines(textBlock);
  if (!lines.length) return "";
  if (lines.length === 1) return `<p>${escapeHtml(lines[0])}</p>`;
  return `<ul>${lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>`;
}

function cleanLines(textBlock) {
  return String(textBlock || "")
    .split("\n")
    .map((line) => line.trim().replace(/^[-•]\s*/, ""))
    .filter(Boolean);
}

function setVisible(id, visible) {
  const node = document.getElementById(id);
  if (!node) return;
  node.style.display = visible ? "" : "none";
}

function text(id, value) {
  const node = document.getElementById(id);
  if (!node) return;
  node.textContent = value || "";
}

function setStatus(message, isError = false) {
  const node = document.getElementById("status-text");
  node.textContent = message;
  node.style.color = isError ? "#9f1239" : "#355167";
  node.dataset.statusKey = Object.keys(getUiCopy()).find(key => getUiCopy()[key] === message) || "";
}

function normalizeLayout(layoutValue) {
  return ["left", "right", "stacked"].includes(layoutValue) ? layoutValue : "left";
}

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function parseAwardDate(value) {
  const cleaned = String(value || "").trim();
  const match = cleaned.match(/^(\d{1,2})\s*[/-]\s*(\d{4})$/);
  if (!match) return { month: "", year: "" };
  return { month: match[1], year: match[2] };
}

function formatAwardDate(award) {
  const monthRaw = String(award?.month ?? "").trim();
  const yearRaw = String(award?.year ?? "").trim();
  const monthNum = Number.parseInt(monthRaw, 10);
  const month = Number.isInteger(monthNum) ? String(monthNum).padStart(2, "0") : monthRaw;
  if (month && yearRaw) return `${month}/${yearRaw}`;
  return month || yearRaw || "";
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function mergeData(base, override) {
  if (Array.isArray(base)) return structuredClone(Array.isArray(override) ? override : base);
  if (typeof base === "object" && base !== null) {
    const output = { ...base };
    for (const key of Object.keys(base)) output[key] = mergeData(base[key], override?.[key]);
    return output;
  }
  return override ?? base;
}

function validateDocument(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Invalid CV");
  const groups = ["profile", "theme", "visibility", "contactVisibility"];
  const lists = ["experience", "education", "projects", "skills", "languages", "awards", "certifications", "customSections"];
  if (![...groups, ...lists].some(key => key in value)) throw new Error("Empty CV");
  for (const key of groups) {
    if (!(key in value)) continue;
    const group = value[key];
    if (!group || typeof group !== "object" || Array.isArray(group)) throw new Error("Invalid group");
    for (const [field, item] of Object.entries(group)) {
      const expected = key === "profile" ? "string" : key.includes("Visibility") || key === "visibility" || field === "justifyText" ? "boolean" : ["accent", "layout", "fontPreset"].includes(field) ? "string" : "number";
      if (typeof item !== expected || (expected === "number" && !Number.isFinite(item))) throw new Error("Invalid field");
    }
  }
  for (const key of lists) {
    if (!(key in value)) continue;
    if (!Array.isArray(value[key]) || value[key].some(item => !item || typeof item !== "object" || Array.isArray(item) || Object.values(item).some(v => typeof v !== "string" && typeof v !== "number"))) throw new Error("Invalid list");
  }
}

function validatePayload(payload) {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) throw new Error("Invalid JSON");
  const docs = payload.documents || ((payload.vi || payload.en) ? payload : null);
  if (docs) {
    if (!docs || typeof docs !== "object" || Array.isArray(docs) || !["vi", "en"].some(k => k in docs)) throw new Error("Missing CV");
    for (const lang of ["vi", "en"]) if (lang in docs) validateDocument(docs[lang]);
  } else validateDocument(payload.document || payload);
}

function safePhoto(value) {
  const source = String(value || "");
  return /^(https?:\/\/|data:image\/(png|jpeg|webp|gif);base64,|\.?\.?\/)/i.test(source) ? source : fallbackPhoto;
}

function setBusy(busy) { document.querySelectorAll(".header-actions button, .header-actions input").forEach(el => { el.disabled = busy; }); }
