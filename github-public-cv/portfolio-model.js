(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.PortfolioModel = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const sections = [
    "about",
    "projects",
    "experience",
    "skills",
    "awards",
    "contact",
  ];
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const bi = () => ({ vi: "", en: "" });
  const image = () => ({ src: "", alt: bi(), position: "50% 50%" });
  const keys = [
    "about",
    "projects",
    "experience",
    "skills",
    "awards",
    "contact",
    "aboutTitle",
    "projectIntro",
    "projectSub",
    "experienceTitle",
    "skillsTitle",
    "awardsTitle",
    "contactTitle",
    "contactText",
    "archiveTitle",
    "archiveIntro",
    "footer",
    "motto",
    "disciplines",
    "snapshot",
    "photoCaption",
  ];
  function safeTree(value, depth = 0) {
    if (depth > 18)
      throw new Error("Dữ liệu quá nhiều cấp / Data is too deeply nested.");
    if (value && typeof value === "object")
      for (const key of Object.keys(value)) {
        if (["__proto__", "prototype", "constructor"].includes(key))
          throw new Error("Dữ liệu chứa khóa không an toàn / Unsafe data key.");
        safeTree(value[key], depth + 1);
      }
  }
  function normalize(value) {
    safeTree(value);
    const d = clone(value);
    if (!d.profile || !d.education || !Array.isArray(d.projects))
      throw new Error(
        "Không phải dữ liệu portfolio đầy đủ / Not a complete portfolio file.",
      );
    d.certificates ??= [];
    d.customSections ??= [];
    d.settings ??= {};
    d.settings.sectionOrder ??= [...sections];
    d.settings.hiddenSections ??= [];
    d.settings.autoLanguage ??= true;
    d.settings.scholarship ??= "4 / 4";
    d.content ??= { vi: {}, en: {} };
    d.content.vi ??= {};
    d.content.en ??= {};
    d.profile.photo ??= image();
    for (const p of d.projects) {
      p.image ??= image();
      p.gallery ??= [];
    }
    for (const s of d.customSections) {
      s.image ??= image();
      s.points ??= { vi: [], en: [] };
    }
    return d;
  }
  function newItem(kind) {
    const id =
      kind +
      "-" +
      Date.now().toString(36) +
      "-" +
      Math.random().toString(36).slice(2, 6);
    if (kind === "experience")
      return {
        role: bi(),
        organization: bi(),
        period: "",
        points: { vi: [], en: [] },
      };
    if (kind === "skills") return { name: "", description: bi(), items: [] };
    if (kind === "awards")
      return { date: "", title: bi(), detail: bi(), certificate: "" };
    if (kind === "projects")
      return {
        id,
        name: "",
        category: "engineering",
        period: bi(),
        title: bi(),
        summary: bi(),
        context: bi(),
        points: { vi: [], en: [] },
        result: bi(),
        technologies: [],
        repository: "",
        image: image(),
        gallery: [],
      };
    if (kind === "certificates")
      return {
        id,
        category: "award",
        issued: new Date().toISOString().slice(0, 10),
        src: "",
        width: 0,
        height: 0,
        title: bi(),
        issuer: bi(),
        description: bi(),
        alt: bi(),
      };
    if (kind === "customSections")
      return {
        id,
        title: bi(),
        body: bi(),
        points: { vi: [], en: [] },
        image: image(),
      };
    throw new Error("Unknown collection");
  }
  const assetPath = (src) =>
    /^assets\/[a-zA-Z0-9/_.-]+$/.test(src) &&
    !src.split("/").some((x) => x === ".." || x === "." || !x);
  const images = (d) =>
    [
      d.profile.photo,
      ...d.projects.flatMap((p) => [p.image, ...p.gallery]),
      ...d.certificates,
      ...d.customSections.map((s) => s.image),
    ].filter(Boolean);
  function validate(input) {
    const d = normalize(input),
      errors = [];
    const text = (value, name, required = false) => {
      if (
        typeof value !== "string" ||
        value.length > 30000 ||
        (required && !value.trim())
      )
        errors.push(name + ": cần nội dung hợp lệ / valid text required.");
    };
    const bilingual = (value, name, required = false, list = false) => {
      for (const lang of ["vi", "en"]) {
        const v = value?.[lang];
        if (list) {
          if (!Array.isArray(v) || v.length > 200)
            errors.push(name + "." + lang + ": cần danh sách / list required.");
          else v.forEach((x) => text(x, name + "." + lang));
        } else text(v, name + "." + lang, required);
      }
    };
    const array = (name, max = 100) => {
      if (!Array.isArray(d[name]) || d[name].length > max)
        throw new Error(name + ": danh sách không hợp lệ / invalid list.");
    };
    for (const name of [
      "projects",
      "certificates",
      "experience",
      "skills",
      "awards",
      "tools",
      "customSections",
    ])
      array(name);
    const ids = new Set(sections);
    for (const kind of ["projects", "certificates", "customSections"]) {
      const ownIds = new Set();
      for (const item of d[kind]) {
        if (
          !/^[a-z0-9][a-z0-9-]{0,79}$/.test(item.id) ||
          ownIds.has(item.id) ||
          (kind === "customSections" && ids.has(item.id))
        )
          errors.push(
            kind +
              ": mã mục trùng hoặc không hợp lệ / duplicate or invalid ID.",
          );
        ownIds.add(item.id);
        if (kind === "customSections") ids.add(item.id);
      }
    }
    text(d.profile.name, "profile.name", true);
    text(d.profile.initials, "profile.initials", true);
    text(d.profile.focus, "profile.focus", true);
    text(d.profile.phone, "profile.phone");
    if (!/^[+\d ()-]*$/.test(d.profile.phoneLink || ""))
      errors.push("Số điện thoại không hợp lệ / Invalid phone link.");
    if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(d.profile.email))
      errors.push("Email không hợp lệ / Invalid email.");
    if (!/^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/?$/.test(d.profile.github))
      errors.push("GitHub profile URL không hợp lệ.");
    for (const key of ["location", "direction", "summary"])
      bilingual(d.profile[key], "profile." + key, true);
    bilingual(d.profile.about, "profile.about", false, true);
    for (const key of ["school", "degree", "classification"])
      bilingual(d.education[key], "education." + key, true);
    text(d.education.gpa, "education.gpa");
    text(d.education.period, "education.period");
    bilingual(d.english, "english");
    d.tools.forEach((x) => text(x, "tools"));
    for (const e of d.experience) {
      bilingual(e.role, "experience.role", true);
      bilingual(e.organization, "experience.organization", true);
      text(e.period, "experience.period");
      bilingual(e.points, "experience.points", false, true);
    }
    for (const s of d.skills) {
      text(s.name, "skills.name", true);
      bilingual(s.description, "skills.description");
      if (!Array.isArray(s.items)) errors.push("skills.items: invalid list");
      else s.items.forEach((x) => text(x, "skills.items"));
    }
    for (const a of d.awards) {
      text(a.date, "awards.date", true);
      bilingual(a.title, "awards.title", true);
      bilingual(a.detail, "awards.detail");
      if (a.certificate && !d.certificates.some((c) => c.id === a.certificate))
        errors.push(
          "Giải thưởng trỏ đến chứng nhận đã xóa / Award evidence no longer exists.",
        );
    }
    for (const p of d.projects) {
      text(p.name, "projects.name", true);
      if (!["engineering", "research", "ai"].includes(p.category))
        errors.push("Invalid project category");
      for (const key of ["period", "title", "summary", "context", "result"])
        bilingual(
          p[key],
          "projects." + key,
          ["title", "summary"].includes(key),
        );
      bilingual(p.points, "projects.points", false, true);
      if (
        !Array.isArray(p.technologies) ||
        !Array.isArray(p.gallery) ||
        p.gallery.length > 30
      )
        errors.push("Invalid project technologies/gallery");
      else p.technologies.forEach((x) => text(x, "projects.technologies"));
      if (
        p.repository &&
        !/^https:\/\/github\.com\/[a-zA-Z0-9_-]+\/[a-zA-Z0-9_.-]+\/?$/.test(
          p.repository,
        )
      )
        errors.push("Invalid project GitHub URL");
    }
    for (const c of d.certificates) {
      for (const key of ["title", "issuer", "description"])
        bilingual(c[key], "certificates." + key, true);
      if (!["award", "participation"].includes(c.category))
        errors.push("Invalid certificate category");
      if (
        !/^\d{4}-\d{2}-\d{2}$/.test(c.issued) ||
        !Number.isFinite(Date.parse(c.issued)) ||
        new Date(c.issued).toISOString().slice(0, 10) !== c.issued
      )
        errors.push("Ngày cấp không hợp lệ / Invalid issue date.");
      if (
        !c.src ||
        !Number.isInteger(c.width) ||
        !Number.isInteger(c.height) ||
        c.width < 1 ||
        c.height < 1 ||
        c.width * c.height > 40000000
      )
        errors.push(
          "Chứng nhận cần ảnh hợp lệ / Certificate needs a valid image.",
        );
    }
    for (const s of d.customSections) {
      bilingual(s.title, "customSections.title", true);
      bilingual(s.body, "customSections.body");
      bilingual(s.points, "customSections.points", false, true);
    }
    for (const img of images(d))
      if (img.src) {
        if (!assetPath(img.src) || !/\.(jpe?g|png|webp)$/i.test(img.src))
          errors.push(
            "Ảnh phải là JPG/PNG/WebP trong assets/ / Invalid image path.",
          );
        bilingual(img.alt, "image.alt", true);
        if (
          img.position &&
          !/^\d{1,3}(\.\d+)?% \d{1,3}(\.\d+)?%$/.test(img.position)
        )
          errors.push("Invalid image position");
      }
    if (!assetPath(d.profile.pdf) || !/\.pdf$/i.test(d.profile.pdf))
      errors.push("Invalid PDF path");
    if (!/^https:\/\/letphu\.github\.io\/Profile-CV\/$/.test(d.siteUrl))
      errors.push("Site URL must match the configured website.");
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(d.updated) ||
      !Number.isFinite(Date.parse(d.updated))
    )
      errors.push("Invalid update date");
    for (const lang of ["vi", "en"])
      for (const [key, value] of Object.entries(d.content[lang])) {
        if (!keys.includes(key))
          errors.push("Unsupported content label: " + key);
        text(value, "content." + key);
      }
    for (const key of ["sectionOrder", "hiddenSections"]) {
      const list = d.settings[key];
      if (
        !Array.isArray(list) ||
        new Set(list).size !== list.length ||
        list.some((id) => !ids.has(id))
      )
        errors.push("Invalid section settings: " + key);
    }
    if (typeof d.settings.autoLanguage !== "boolean")
      errors.push("Invalid automatic language setting");
    text(d.settings.scholarship, "settings.scholarship");
    if (new TextEncoder().encode(JSON.stringify(d, null, 2)).length > 900000)
      errors.push("Dữ liệu vượt 900 KB / Data exceeds 900 KB.");
    return errors;
  }
  return {
    sections,
    keys,
    clone,
    normalize,
    validate,
    newItem,
    image,
    images,
    assetPath,
  };
});
