const STORAGE_KEY = "cv-builder-pro-v2";

const fallbackPhoto =
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=500&q=80";

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

const SECTION_LABELS = {
  vi: {
    personal: "Thông tin cá nhân",
    skills: "Các kỹ năng",
    awards: "Giải thưởng",
    languages: "Ngôn ngữ",
    summary: "Mục tiêu nghề nghiệp",
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
    summary: "Career Objective",
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
    fullName: "Nguyễn Huyền Trang",
    headline: "Chuyên viên Sales Admin",
    dob: "04/02/1997",
    nationality: "Việt Nam",
    email: "trang@company.vn",
    phone: "+84 987 654 321",
    website: "linkedin.com/in/trang-sales-admin",
    address: "Quận 1, TP. Hồ Chí Minh",
    summary:
      "Tôi có 3 năm kinh nghiệm ở vị trí Sales Admin, quen thuộc với xử lý dữ liệu, hỗ trợ đội ngũ kinh doanh và theo dõi hiệu suất KPI.",
    photo: fallbackPhoto,
  },
  theme: {
    accent: "#1d7c73",
    layout: "left",
    fontPreset: "be_vietnam",
    baseFontSize: 13.3,
    sectionTitleSize: 15,
    entryTitleSize: 14.5,
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
      role: "Chuyên viên Sales Admin",
      company: "Công ty Cổ phần Vina Market",
      period: "2021 - 2024",
      location: "TP. Hồ Chí Minh",
      details: "Hỗ trợ đội ngũ 20+ nhân viên kinh doanh.\nQuản lý dữ liệu CRM chính xác 99.5%.",
    },
  ],
  education: [
    {
      school: "Đại học Tôn Đức Thắng",
      degree: "Cử nhân Quản trị Kinh doanh",
      period: "2016 - 2020",
      details: "GPA 3.45/4.0.",
    },
  ],
  projects: [
    {
      name: "Dashboard KPI bán hàng",
      role: "Data Coordinator",
      period: "2023",
      details: "Tổng hợp dữ liệu CRM và kho.\nRút ngắn 30% thời gian báo cáo.",
    },
  ],
  customSections: [{ title: "Hoạt động nổi bật", details: "Tổ chức workshop nội bộ." }],
  skills: [
    { name: "Excel nâng cao", level: "Expert", details: "Pivot table, Power Query." },
    { name: "CRM và vận hành", level: "Advanced", details: "Kiểm soát pipeline." },
  ],
  languages: [
    { name: "Tiếng Việt", level: "Bản ngữ" },
    { name: "Tiếng Anh", level: "IELTS 7.0" },
  ],
  certifications: [{ title: "Ứng dụng CNTT cơ bản", year: "2020" }],
  awards: [
    { month: "11", year: "2024", title: "Top 5 cuộc thi Khoa học Dữ liệu" },
    { month: "07", year: "2024", title: "Giải Ba cuộc thi AI 2024" },
  ],
};

const demoDocEn = {
  profile: {
    fullName: "Nguyen Huyen Trang",
    headline: "Sales Admin Specialist",
    dob: "Feb 04, 1997",
    nationality: "Vietnamese",
    email: "trang@company.vn",
    phone: "+84 987 654 321",
    website: "linkedin.com/in/trang-sales-admin",
    address: "District 1, Ho Chi Minh City",
    summary:
      "I have 3 years of experience as a Sales Admin, with strong capabilities in data operations, sales support, and KPI reporting.",
    photo: fallbackPhoto,
  },
  theme: {
    accent: "#1f4e79",
    layout: "right",
    fontPreset: "roboto",
    baseFontSize: 13.2,
    sectionTitleSize: 15.5,
    entryTitleSize: 14.5,
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
      role: "Sales Admin Specialist",
      company: "Vina Market JSC",
      period: "2021 - 2024",
      location: "Ho Chi Minh City",
      details: "Supported a sales team of 20+ members.\nMaintained 99.5% CRM data accuracy.",
    },
  ],
  education: [
    {
      school: "Ton Duc Thang University",
      degree: "Bachelor of Business Administration",
      period: "2016 - 2020",
      details: "GPA 3.45/4.0",
    },
  ],
  projects: [
    {
      name: "Sales KPI Dashboard",
      role: "Data Coordinator",
      period: "2023",
      details: "Integrated CRM and warehouse data.\nReduced report preparation time by 30%.",
    },
  ],
  customSections: [{ title: "Leadership Activities", details: "Organized internal workshops." }],
  skills: [
    { name: "Advanced Excel", level: "Expert", details: "Pivot table, dashboards." },
    { name: "CRM Operations", level: "Advanced", details: "Process optimization." },
  ],
  languages: [
    { name: "Vietnamese", level: "Native" },
    { name: "English", level: "IELTS 7.0" },
  ],
  certifications: [{ title: "Basic IT Application Certificate", year: "2020" }],
  awards: [
    { month: "11", year: "2024", title: "Top 5 - Data Science Competition" },
    { month: "07", year: "2024", title: "Third Prize - AI Competition 2024" },
  ],
};

const defaultState = {
  activeDoc: "vi",
  documents: {
    vi: demoDocVi,
    en: demoDocEn,
  },
};

const listConfigs = {
  experience: {
    container: "experience-editor",
    fields: [
      { key: "role", label: "Vị trí", type: "text" },
      { key: "company", label: "Công ty", type: "text" },
      { key: "period", label: "Thời gian", type: "text" },
      { key: "location", label: "Địa điểm", type: "text" },
      { key: "details", label: "Mô tả (mỗi dòng 1 ý)", type: "textarea" },
    ],
    empty: { role: "", company: "", period: "", location: "", details: "" },
  },
  education: {
    container: "education-editor",
    fields: [
      { key: "school", label: "Trường", type: "text" },
      { key: "degree", label: "Bằng cấp / Chuyên ngành", type: "text" },
      { key: "period", label: "Thời gian", type: "text" },
      { key: "details", label: "Mô tả", type: "textarea" },
    ],
    empty: { school: "", degree: "", period: "", details: "" },
  },
  projects: {
    container: "projects-editor",
    fields: [
      { key: "name", label: "Tên dự án", type: "text" },
      { key: "role", label: "Vai trò", type: "text" },
      { key: "period", label: "Thời gian", type: "text" },
      { key: "details", label: "Mô tả (mỗi dòng 1 ý)", type: "textarea" },
    ],
    empty: { name: "", role: "", period: "", details: "" },
  },
  skills: {
    container: "skills-editor",
    fields: [
      { key: "name", label: "Kỹ năng", type: "text" },
      { key: "level", label: "Mức độ", type: "text" },
      { key: "details", label: "Mô tả ngắn", type: "textarea" },
    ],
    empty: { name: "", level: "", details: "" },
  },
  languages: {
    container: "languages-editor",
    fields: [
      { key: "name", label: "Ngôn ngữ", type: "text" },
      { key: "level", label: "Trình độ", type: "text" },
    ],
    empty: { name: "", level: "" },
  },
  awards: {
    container: "awards-editor",
    fields: [
      { key: "month", label: "Tháng", type: "text" },
      { key: "year", label: "Năm", type: "text" },
      { key: "title", label: "Nội dung giải thưởng", type: "textarea" },
    ],
    empty: { month: "", year: "", title: "" },
  },
  customSections: {
    container: "custom-sections-editor",
    fields: [
      { key: "title", label: "Tên mục", type: "text" },
      { key: "details", label: "Nội dung (mỗi dòng 1 ý)", type: "textarea" },
    ],
    empty: { title: "", details: "" },
  },
  certifications: {
    container: "certifications-editor",
    fields: [
      { key: "title", label: "Tên chứng chỉ", type: "text" },
      { key: "year", label: "Năm", type: "text" },
    ],
    empty: { title: "", year: "" },
  },
};

const displayFormatters = {
  "theme.baseFontSize": (value) => `${Number(value).toFixed(1)} px`,
  "theme.sectionTitleSize": (value) => `${Number(value).toFixed(1)} px`,
  "theme.entryTitleSize": (value) => `${Number(value).toFixed(1)} px`,
  "theme.lineHeight": (value) => Number(value).toFixed(2),
  "theme.sectionGap": (value) => `${Math.round(Number(value))} px`,
  "theme.sidebarWidth": (value) => `${Math.round(Number(value))}%`,
  "theme.sidebarPadding": (value) => `${Math.round(Number(value))} px`,
  "theme.awardColumnGap": (value) => `${Math.round(Number(value))} px`,
  "theme.sidebarSectionGap": (value) => `${Math.round(Number(value))} px`,
  "theme.photoSize": (value) => `${Math.round(Number(value))} px`,
  "theme.photoBorder": (value) => `${Math.round(Number(value))} px`,
};

let state = loadState();
let saveTimer = null;

const form = document.getElementById("cv-form");

init();

function init() {
  bindFlatFields();
  bindButtons();
  renderAll();
}

function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return normalizeAppState(defaultState);
    const parsed = JSON.parse(stored);
    validatePayload(parsed);

    if (parsed?.documents) return normalizeAppState(mergeData(defaultState, parsed));

    const migrated = structuredClone(defaultState);
    migrated.documents.vi = mergeData(demoDocVi, parsed);
    return normalizeAppState(migrated);
  } catch {
    return normalizeAppState(defaultState);
  }
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
  doc.theme.fontPreset = FONT_PRESETS[doc.theme?.fontPreset] ? doc.theme.fontPreset : fallbackDoc.theme.fontPreset;
  doc.awards = (doc.awards || []).map((award) => normalizeAward(award));
  return doc;
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

function getActiveDoc() {
  return state.documents[state.activeDoc];
}

function isDocumentPayload(payload) {
  if (!payload || typeof payload !== "object") return false;
  return ["profile", "theme", "experience", "education", "projects", "skills"].some((key) => key in payload);
}

function importCurrentDoc(parsed, language = state.activeDoc) {
  validatePayload(parsed);
  const fallback = language === "en" ? demoDocEn : demoDocVi;
  let incomingDoc = null;

  if (parsed?.documents && typeof parsed.documents === "object") {
    incomingDoc = parsed.documents[language] ?? null;
  } else if (parsed?.document && isDocumentPayload(parsed.document)) {
    incomingDoc = parsed.document;
  } else if (isDocumentPayload(parsed)) {
    incomingDoc = parsed;
  }

  if (!incomingDoc) return false;

  state.documents[language] = normalizeDocument(mergeData(state.documents[language], incomingDoc), fallback);
  return true;
}

function importAllDocs(parsed) {
  validatePayload(parsed);
  if (parsed?.documents && typeof parsed.documents === "object") {
    state = normalizeAppState(mergeData(state, parsed));
    return true;
  }
  return importCurrentDoc(parsed);
}

function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      document.getElementById("save-status").textContent = "Đã lưu trên trình duyệt";
    } catch {
      document.getElementById("save-status").textContent = "Chưa lưu được. Hãy xuất JSON để giữ dữ liệu.";
    }
  }, 180);
}

function bindFlatFields() {
  form.querySelectorAll("[data-bind]").forEach((input) => {
    const onChange = (event) => {
      const path = event.target.getAttribute("data-bind");
      setPathValue(path, readInputValue(event.target));
      updateDisplayBadges();
      renderPreview();
      scheduleSave();
    };
    input.addEventListener("input", onChange);
    input.addEventListener("change", onChange);
  });

  const photoUpload = document.getElementById("photo-upload");
  photoUpload.addEventListener("change", async (event) => {
    const [file] = event.target.files || [];
    if (!file) return;
    if (!/^image\/(png|jpeg|webp|gif)$/.test(file.type) || file.size > 4 * 1024 * 1024) { alert("Chọn ảnh PNG, JPEG, WebP hoặc GIF dưới 4 MB."); return; }
    const targetDoc = getActiveDoc();
    let dataUrl;
    try { dataUrl = await fileToOptimizedDataUrl(file); } catch { alert("Không đọc được hoặc tối ưu ảnh."); return; }
    targetDoc.profile.photo = dataUrl;
    renderPreview();
    scheduleSave();
    event.target.value = "";
  });
}

function bindButtons() {
  document.getElementById("print-cv").addEventListener("click", async () => {
    await document.fonts.ready;
    window.print();
  });

  document.getElementById("reset-demo").addEventListener("click", () => {
    if (!confirm("Thay nội dung CV đang mở bằng dữ liệu mẫu?")) return;
    if (state.activeDoc === "en") state.documents.en = structuredClone(demoDocEn);
    else state.documents.vi = structuredClone(demoDocVi);
    renderAll();
    scheduleSave();
  });

  document.getElementById("download-json").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(getActiveDoc(), null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `cv-${state.activeDoc}-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  document.getElementById("import-json").addEventListener("change", async (event) => {
    const language = state.activeDoc;
    const [file] = event.target.files || [];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text.replace(/^\uFEFF/, ""));
      validatePayload(parsed);
      if (!importCurrentDoc(parsed, language)) throw new Error("invalid");
      renderAll();
      scheduleSave();
    } catch {
      alert("Tệp JSON không hợp lệ.");
    }
    event.target.value = "";
  });

  document.getElementById("download-all-json").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `cv-vi-en-${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  document.getElementById("import-all-json").addEventListener("change", async (event) => {
    const [file] = event.target.files || [];
    if (!file) return;
    try {
      const text = await file.text();
      const parsed = JSON.parse(text.replace(/^\uFEFF/, ""));
      validatePayload(parsed);
      if (!importAllDocs(parsed)) throw new Error("invalid");
      renderAll();
      scheduleSave();
    } catch {
      alert("Tệp JSON không hợp lệ.");
    }
    event.target.value = "";
  });

  document.querySelectorAll(".add-item").forEach((button) => {
    button.addEventListener("click", () => {
      const listName = button.getAttribute("data-list");
      getActiveDoc()[listName].push(structuredClone(listConfigs[listName].empty));
      renderEditorList(listName);
      renderPreview();
      scheduleSave();
    });
  });

  document.querySelectorAll("[data-doc-switch]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-doc-switch");
      if (target !== "vi" && target !== "en") return;
      state.activeDoc = target;
      renderAll();
      scheduleSave();
    });
  });
}

function renderAll() {
  document.documentElement.lang = state.activeDoc;
  renderDocSwitch();
  fillFlatFields();
  updateDisplayBadges();
  Object.keys(listConfigs).forEach(renderEditorList);
  renderPreview();
}

function renderDocSwitch() {
  document.getElementById("editing-language").textContent = state.activeDoc === "vi" ? "Đang chỉnh sửa CV tiếng Việt" : "Đang chỉnh sửa English CV";
  document.querySelectorAll("[data-doc-switch]").forEach((button) => {
    const active = button.getAttribute("data-doc-switch") === state.activeDoc;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  });
}

function fillFlatFields() {
  form.querySelectorAll("[data-bind]").forEach((input) => {
    writeInputValue(input, getPathValue(input.getAttribute("data-bind")));
  });
}

function updateDisplayBadges() {
  document.querySelectorAll("[data-display-for]").forEach((badge) => {
    const path = badge.getAttribute("data-display-for");
    badge.textContent = (displayFormatters[path] || ((v) => `${v}`))(getPathValue(path));
  });
}

function renderEditorList(listName) {
  const config = listConfigs[listName];
  const root = document.getElementById(config.container);
  const doc = getActiveDoc();
  root.innerHTML = "";

  if (!doc[listName].length) {
    const empty = document.createElement("p");
    empty.className = "empty-editor-note";
    empty.textContent = state.activeDoc === "en" ? "No entries yet. Use Add item to create one." : "Chưa có mục nào. Bấm Thêm mục để tạo nội dung.";
    root.append(empty);
    return;
  }

  doc[listName].forEach((item, index) => {
    const wrapper = document.createElement("article");
    wrapper.className = "item-card";

    const actions = document.createElement("div");
    actions.className = "item-actions";
    actions.append(createMoveButton("↑", listName, index, -1));
    actions.append(createMoveButton("↓", listName, index, 1));
    actions.append(createRemoveButton(listName, index));
    wrapper.append(actions);

    config.fields.forEach((field) => {
      const label = document.createElement("label");
      label.textContent = field.label;
      const input = document.createElement(field.type === "textarea" ? "textarea" : "input");
      if (field.type === "textarea") input.rows = 3;
      if (field.type !== "textarea") input.type = field.type;
      input.value = item[field.key] ?? "";
      input.addEventListener("input", (event) => {
        doc[listName][index][field.key] = event.target.value;
        renderPreview();
        scheduleSave();
      });
      label.append(input);
      wrapper.append(label);
    });

    root.append(wrapper);
  });
}

function createMoveButton(textValue, listName, index, direction) {
  const doc = getActiveDoc();
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = textValue;
  button.className = "item-action-btn move-item";
  const moveLabel = direction < 0 ? "lên" : "xuống";
  button.setAttribute("aria-label", `Di chuyển mục ${index + 1} ${moveLabel}`);
  button.title = `Di chuyển ${moveLabel}`;
  const targetIndex = index + direction;
  button.disabled = targetIndex < 0 || targetIndex >= doc[listName].length;
  button.addEventListener("click", () => moveListItem(listName, index, direction));
  return button;
}

function createRemoveButton(listName, index) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "item-action-btn remove-item";
  button.textContent = "Xóa";
  button.setAttribute("aria-label", `Xóa mục ${index + 1}`);
  button.addEventListener("click", () => {
    const message = state.activeDoc === "en" ? "Delete this entry?" : "Xóa mục này?";
    if (!confirm(message)) return;
    const doc = getActiveDoc();
    doc[listName].splice(index, 1);
    renderEditorList(listName);
    renderPreview();
    scheduleSave();
  });
  return button;
}

function moveListItem(listName, index, direction) {
  const doc = getActiveDoc();
  const targetIndex = index + direction;
  if (targetIndex < 0 || targetIndex >= doc[listName].length) return;
  [doc[listName][index], doc[listName][targetIndex]] = [doc[listName][targetIndex], doc[listName][index]];
  renderEditorList(listName);
  renderPreview();
  scheduleSave();
}

function renderPreview() {
  const doc = getActiveDoc();
  const labels = SECTION_LABELS[state.activeDoc] || SECTION_LABELS.vi;
  const preview = document.getElementById("cv-preview");
  const accent = /^#[0-9a-f]{6}$/i.test(doc.theme.accent) ? doc.theme.accent : "#1d7c73";
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

  document.documentElement.style.setProperty("--accent", accent);
  document.documentElement.style.setProperty("--sidebar", tintColor(accent, 0.85));

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
  renderSummary(doc.profile.summary);
  document.getElementById("preview-photo").src = safePhoto(doc.profile.photo);

  const contactEntries = [
    { key: "dob", label: labels.contact.dob, value: doc.profile.dob },
    { key: "nationality", label: labels.contact.nationality, value: doc.profile.nationality },
    { key: "email", label: labels.contact.email, value: doc.profile.email },
    { key: "phone", label: labels.contact.phone, value: doc.profile.phone },
    { key: "website", label: labels.contact.website, value: doc.profile.website },
    { key: "address", label: labels.contact.address, value: doc.profile.address },
  ]
    .filter((item) => doc.contactVisibility[item.key] && String(item.value || "").trim());
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

function renderSkills(skills) {
  const ul = document.getElementById("preview-skills");
  ul.innerHTML = "";
  skills.forEach((skill) => {
    const li = document.createElement("li");
    const detailsLines = String(skill.details || "")
      .split("\n")
      .map((line) => line.trim().replace(/^[-•]\s*/, ""))
      .filter(Boolean);

    if (detailsLines.length > 1) {
      li.innerHTML = `
        <strong>${escapeHtml(skill.name || "")}</strong>
        <small>${escapeHtml(skill.level || "")}</small>
        <ul class="skill-detail-list">
          ${detailsLines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
        </ul>
      `;
    } else {
      li.innerHTML = `<strong>${escapeHtml(skill.name || "")}</strong><small>${escapeHtml(skill.level || "")}</small><small>${escapeHtml(skill.details || "")}</small>`;
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

function renderSimpleList(targetId, lines) {
  const ul = document.getElementById(targetId);
  ul.innerHTML = "";
  lines.forEach((line) => {
    const li = document.createElement("li");
    li.textContent = line;
    ul.append(li);
  });
}

function renderContactList(entries) {
  const ul = document.getElementById("preview-contact");
  ul.innerHTML = "";

  entries.forEach((entry) => {
    const lines = String(entry.value || "")
      .split("\n")
      .map((line) => line.trim().replace(/^[-•]\s*/, ""))
      .filter(Boolean);

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

function renderSummary(textBlock) {
  const root = document.getElementById("preview-summary");
  const lines = String(textBlock || "")
    .split("\n")
    .map((line) => line.trim().replace(/^[-•]\s*/, ""))
    .filter(Boolean);

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
  const lines = String(textBlock || "")
    .split("\n")
    .map((line) => line.trim().replace(/^[-\u2022]\s*/, ""))
    .filter(Boolean);
  if (!lines.length) return "";
  return `<ul>${lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>`;
}

function renderParagraphOrBullets(textBlock) {
  const lines = String(textBlock || "")
    .split("\n")
    .map((line) => line.trim().replace(/^[-•]\s*/, ""))
    .filter(Boolean);
  if (!lines.length) return "";
  if (lines.length === 1) return `<p>${escapeHtml(lines[0])}</p>`;
  return `<ul>${lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}</ul>`;
}

function setVisible(id, visible) {
  const node = document.getElementById(id);
  if (!node) return;
  node.style.display = visible ? "" : "none";
}

function normalizeLayout(layoutValue) {
  return ["left", "right", "stacked"].includes(layoutValue) ? layoutValue : "left";
}

function clamp(value, min, max) {
  if (!Number.isFinite(value)) return min;
  return Math.min(max, Math.max(min, value));
}

function setPathValue(path, value) {
  const keys = path.split(".");
  let obj = getActiveDoc();
  for (let i = 0; i < keys.length - 1; i += 1) obj = obj[keys[i]];
  obj[keys.at(-1)] = value;
}

function getPathValue(path) {
  return path.split(".").reduce((acc, key) => acc?.[key], getActiveDoc());
}

function readInputValue(input) {
  if (input.type === "checkbox") return input.checked;
  if (input.type === "range" || input.type === "number") {
    const value = Number.parseFloat(input.value);
    return Number.isFinite(value) ? value : 0;
  }
  return input.value;
}

function writeInputValue(input, value) {
  if (input.type === "checkbox") {
    input.checked = Boolean(value);
    return;
  }
  input.value = value ?? "";
}

function text(id, value) {
  document.getElementById(id).textContent = value || "";
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

async function fileToOptimizedDataUrl(file) {
  // Small files are already safe for browser storage; preserve them exactly.
  if (file.size <= 1024 * 1024) return fileToDataUrl(file);
  if (file.type === "image/gif") throw new Error("GIF too large");

  const originalUrl = URL.createObjectURL(file);
  try {
    const image = await loadImage(originalUrl);
    const maxEdge = 1400;
    const scale = Math.min(1, maxEdge / Math.max(image.naturalWidth, image.naturalHeight));
    const width = Math.max(1, Math.round(image.naturalWidth * scale));
    const height = Math.max(1, Math.round(image.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Canvas unavailable");
    context.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL("image/webp", 0.88);
  } finally {
    URL.revokeObjectURL(originalUrl);
  }
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Invalid image"));
    image.src = src;
  });
}

function hasText(value) {
  return String(value || "").trim().length > 0;
}

function hasMeaningfulItems(items) {
  return Array.isArray(items) && items.some((item) => item && Object.values(item).some(hasText));
}

function tintColor(hex, ratio) {
  const color = hex.replace("#", "");
  const num = Number.parseInt(color, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  const mix = (v) => Math.round(v + (255 - v) * ratio);
  const out = [mix(r), mix(g), mix(b)]
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("");
  return `#${out}`;
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
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
