const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const site = path.join(root, "github-public-cv");
const data = JSON.parse(fs.readFileSync(path.join(site, "data/portfolio.json"), "utf8").replace(/^\uFEFF/, ""));
const languages = ["vi", "en"];
const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const t = (value, lang) => typeof value === "string" ? value : value?.[lang] ?? "";
const htmlList = items => items.map(item => `<li>${esc(item)}</li>`).join("");
const tagList = (items, lang) => `<ul class="tags" aria-label="${lang === "vi" ? "Công nghệ và công cụ" : "Technologies and tools"}">${htmlList(items)}</ul>`;
const pagePath = (lang, project) => `${lang === "en" ? "en/" : ""}${project ? "projects/" + project.id + ".html" : "index.html"}`;
const basePath = (lang, project) => "../".repeat((lang === "en" ? 1 : 0) + (project ? 1 : 0));
const labels = {
  vi: {
    about: "Giới thiệu", projects: "Dự án", experience: "Hành trình", skills: "Kỹ năng", awards: "Thành tích", contact: "Liên hệ",
    skip: "Đến nội dung", menu: "Mở menu", close: "Đóng menu", pdf: "Tải CV PDF", resume: "Xem CV A4",
    home: "Trang chủ", explore: "Khám phá dự án", email: "Gửi email", all: "Tất cả", engineering: "Hệ thống & web", research: "Nghiên cứu", ai: "AI ứng dụng",
    detail: "Xem chi tiết", cover: "Không gian dành cho ảnh dự án", portrait: "Không gian dành cho ảnh chân dung",
    selected: "Dự án & nghiên cứu", projectIntro: "Những hệ thống tôi xây dựng, những câu hỏi tôi tìm hiểu.",
    projectSub: "Từ AI ứng dụng đến hệ thống web và nghiên cứu học thuật. Chọn một dự án để xem phạm vi, công nghệ và kết quả ghi nhận.",
    aboutTitle: "Từ nền tảng AI đến hệ thống có kiểm thử.",
    experienceTitle: "Học hỏi qua từng trải nghiệm.", skillsTitle: "Công nghệ tôi làm việc cùng.",
    awardsTitle: "Những cột mốc đáng nhớ.", contactTitle: "Bắt đầu một cuộc trò chuyện.",
    contactText: "Bạn muốn trao đổi về AI ứng dụng, agent/LLM hoặc phát triển hệ thống web? Có thể liên hệ với tôi qua email hoặc GitHub.",
    projectCount: "dự án & nghiên cứu", scholarship: "năm nhận học bổng", education: "Học vấn",
    tools: "Công cụ & môi trường", english: "Tiếng Anh", snapshot: "Hồ sơ cập nhật từ CV 2026",
    scope: "Phạm vi & đóng góp", technologies: "Công nghệ sử dụng", recorded: "Kết quả ghi nhận trong CV",
    gallery: "Ảnh & tư liệu dự án", galleryNote: "Khu vực dành cho ảnh giao diện, sơ đồ hoặc kết quả thực nghiệm.",
    repo: "Repository GitHub", back: "Tất cả dự án", next: "Khám phá thêm", read: "Xem hồ sơ chi tiết",
    contactDetails: "Thông tin liên hệ", imageOne: "Ảnh giao diện / sơ đồ", imageTwo: "Ảnh kết quả / minh chứng",
    noResult: "Chưa có dự án trong nhóm này.", resultCount: "dự án đang hiển thị", copy: "Sao chép email",
    copied: "Đã sao chép email.", copyFallback: "Chọn email bên dưới để sao chép.", footer: "AI ứng dụng. Hệ thống có kiểm thử.",
    photoCaption: "Lê Tấn Phú / Hồ sơ cá nhân", overview: "Tổng quan dự án", projectLabel: "Dự án", lastUpdate: "Cập nhật",
  },
  en: {
    about: "About", projects: "Projects", experience: "Journey", skills: "Skills", awards: "Achievements", contact: "Contact",
    skip: "Skip to content", menu: "Open menu", close: "Close menu", pdf: "Download CV", resume: "View A4 resume",
    home: "Home", explore: "Explore projects", email: "Send an email", all: "All", engineering: "Systems & web", research: "Research", ai: "Applied AI",
    detail: "View project", cover: "Space for project imagery", portrait: "Space for a portrait photo",
    selected: "Projects & research", projectIntro: "Systems I build. Questions I explore.",
    projectSub: "From applied AI to web systems and academic research. Explore each project's scope, technologies and recorded findings.",
    aboutTitle: "An AI foundation. A focus on tested systems.",
    experienceTitle: "Learning through experience.", skillsTitle: "Technologies I work with.",
    awardsTitle: "Milestones along the way.", contactTitle: "Let's start a conversation.",
    contactText: "Interested in applied AI, agents/LLM systems or web development? You can reach me by email or on GitHub.",
    projectCount: "projects & research", scholarship: "years of scholarships", education: "Education",
    tools: "Tools & environment", english: "English", snapshot: "Profile based on the 2026 CV",
    scope: "Scope & contributions", technologies: "Technologies", recorded: "Results recorded in the CV",
    gallery: "Project imagery & materials", galleryNote: "Space for interface screenshots, diagrams or experimental results.",
    repo: "GitHub repository", back: "All projects", next: "Explore more", read: "Explore the full profile",
    contactDetails: "Contact information", imageOne: "Interface / diagram", imageTwo: "Results / evidence",
    noResult: "No projects in this category yet.", resultCount: "projects shown", copy: "Copy email",
    copied: "Email copied.", copyFallback: "Select the email below to copy it.", footer: "Applied AI. Tested systems.",
    photoCaption: "Le Tan Phu / Personal profile", overview: "Project overview", projectLabel: "Project", lastUpdate: "Updated",
  }
};

function validate() {
  if (!data.profile?.name || !Array.isArray(data.projects) || !data.projects.length) throw new Error("Missing profile or projects");
  const ids = new Set();
  for (const project of data.projects) {
    if (!/^[a-z0-9-]+$/.test(project.id) || ids.has(project.id)) throw new Error("Invalid or duplicate project id");
    ids.add(project.id);
    if (!["engineering", "research", "ai"].includes(project.category)) throw new Error("Invalid category");
    for (const lang of languages) {
      if (!project.title?.[lang] || !project.summary?.[lang] || !Array.isArray(project.points?.[lang])) throw new Error("Missing project translation");
    }
    if (project.repository && !/^https:\/\/github\.com\//.test(project.repository)) throw new Error("Invalid repository URL");
  }
  const images = [data.profile.photo, ...data.projects.flatMap(project => [project.image, ...project.gallery])];
  for (const image of images) {
    if (!image?.src) continue;
    if (!/^assets\/[a-zA-Z0-9/_.-]+$/.test(image.src) || image.src.split("/").includes("..")) throw new Error("Images must be local files within assets/");
    if (!fs.existsSync(path.join(site, image.src))) throw new Error("Missing image: " + image.src);
    if (!image.alt?.vi || !image.alt?.en) throw new Error("Missing image alternative text");
  }
  if (!fs.existsSync(path.join(site, data.profile.pdf))) throw new Error("Missing original CV PDF");
}

function media(image, lang, prefix, kind, label, number = "") {
  const hasImage = Boolean(image?.src);
  return `<div class="media media--${kind}${hasImage ? " has-image" : ""}" data-media>
    ${hasImage ? `<img src="${esc(prefix + image.src)}" alt="${esc(t(image.alt, lang))}" ${kind === "portrait" ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" style="object-position:${esc(image.position || "50% 50%")}" />` : ""}
    <div class="media-placeholder"${hasImage ? " hidden" : ""}>
      <span class="media-index" aria-hidden="true">${kind === "portrait" ? "PERSONAL / 01" : "PROJECT / " + number}</span>
      <div class="media-mark" aria-hidden="true">${kind === "portrait" ? esc(data.profile.initials) : '<span></span><span></span><span></span>'}</div>
      <span class="media-label">${esc(label)}</span>
    </div>
  </div>`;
}

function header(lang, project) {
  const l = labels[lang];
  const prefix = basePath(lang, project);
  const home = prefix + (lang === "en" ? "en/" : "./");
  const other = lang === "vi" ? "en" : "vi";
  const alternate = prefix + pagePath(other, project);
  return `<a class="skip-link" href="#main">${l.skip}</a>
  <header class="site-nav">
    <div class="nav-inner">
      <a class="brand" href="${home}" aria-label="${l.home}"><span class="brand-mark">P.</span><span>Lê Tấn Phú<span class="brand-sub">AI / ENGINEERING</span></span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" data-open-label="${l.menu}" data-close-label="${l.close}"><span class="menu-icon" aria-hidden="true"></span><span data-menu-label>${l.menu}</span></button>
      <nav id="main-nav" class="main-nav" aria-label="${lang === "vi" ? "Điều hướng chính" : "Main navigation"}">
        ${["about", "projects", "experience", "skills", "awards"].map(id => `<a href="${project ? home : ""}#${id}">${l[id]}</a>`).join("")}
        <a class="nav-contact" href="${project ? home : ""}#contact">${l.contact} <span aria-hidden="true">↗</span></a>
      </nav>
      <a class="language-link" href="${alternate}" lang="${other}" hreflang="${other}" aria-label="${lang === "vi" ? "Read in English" : "Đọc bằng tiếng Việt"}">${lang === "vi" ? "EN" : "VI"} <span aria-hidden="true">↗</span></a>
    </div>
  </header>`;
}

function footer(lang, project) {
  const l = labels[lang], prefix = basePath(lang, project);
  const updated = new Intl.DateTimeFormat(lang === "vi" ? "vi-VN" : "en-GB", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" }).format(new Date(data.updated));
  return `<footer class="footer container"><div><a class="footer-brand" href="${prefix + (lang === "en" ? "en/" : "./")}">Lê Tấn Phú<span aria-hidden="true">.</span></a><p>${l.footer}</p></div><div class="footer-right"><a href="${esc(data.profile.github)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="${esc(prefix + data.profile.pdf)}" download>${l.pdf} ↓</a><small>${l.lastUpdate}: ${updated} · ${l.snapshot}</small></div></footer>`;
}

function sectionHeading(number, eyebrow, title, description = "") {
  const id = { "01": "about-heading", "02": "projects-heading", "03": "experience-heading", "04": "skills-heading", "05": "awards-heading", "06": "contact-heading" }[number];
  return `<div class="section-heading"><p class="section-eyebrow"><span>${number}</span> ${esc(eyebrow)}</p><h2 id="${id}">${esc(title)}</h2>${description ? `<p class="section-description">${esc(description)}</p>` : ""}</div>`;
}

function projectCard(project, index, lang, prefix, compact = false) {
  const l = labels[lang];
  return `<article class="project-card category-${project.category}" data-category="${project.category}">
    <a class="project-image-link" href="${prefix + pagePath(lang, project)}" aria-label="${esc(l.detail + ": " + project.name)}">${media(project.image, lang, prefix, "project", l.cover, String(index + 1).padStart(2, "0"))}</a>
    <div class="project-body">
      <div class="project-meta"><span>${l[project.category]}</span><span>${esc(t(project.period, lang))}</span></div>
      <h3><a href="${prefix + pagePath(lang, project)}">${esc(project.name)} <span aria-hidden="true">↗</span></a></h3>
      <p class="project-title">${esc(t(project.title, lang))}</p>
      ${compact ? "" : `<p class="project-summary">${esc(t(project.summary, lang))}</p>${tagList(project.technologies.slice(0, 4), lang)}`}
      <a class="text-link" href="${prefix + pagePath(lang, project)}">${l.detail} <span aria-hidden="true">↗</span></a>
    </div>
  </article>`;
}

function homePage(lang) {
  const l = labels[lang], prefix = basePath(lang);
  return `${header(lang)}
  <main id="main">
    <section class="hero container" aria-labelledby="hero-title">
      <div class="hero-content">
        <p class="hero-eyebrow"><span class="status-dot" aria-hidden="true"></span>${esc(t(data.profile.direction, lang))}</p>
        <h1 id="hero-title">Lê Tấn Phú<span class="name-period">.</span></h1>
        <p class="hero-focus">AI Agent.<br /><span>LLM Systems.</span></p>
        <p class="hero-summary">${esc(t(data.profile.summary, lang))}</p>
        <div class="hero-actions"><a class="button button-primary" href="#projects">${l.explore} <span aria-hidden="true">↗</span></a><a class="button button-outline" href="${prefix + data.profile.pdf}" download>${l.pdf} <span aria-hidden="true">↓</span></a></div>
        <p class="hero-location"><span aria-hidden="true">⌖</span> ${esc(t(data.profile.location, lang))} <span class="location-divider">/</span> <a href="${esc(data.profile.github)}" target="_blank" rel="noopener noreferrer">@LeTPhu ↗</a></p>
      </div>
      <figure class="hero-portrait">${media(data.profile.photo, lang, prefix, "portrait", l.portrait)}
        <figcaption><span>${l.photoCaption}</span><span aria-hidden="true">PROFILE / 2026</span></figcaption>
        <div class="portrait-tag" aria-hidden="true">AI / ML<br /><strong>BUILD. TEST. LEARN.</strong></div>
      </figure>
    </section>
    <div class="stats container" aria-label="${lang === "vi" ? "Thông tin nổi bật" : "Profile highlights"}">
      <div><strong>${data.education.gpa}</strong><span>GPA · ${esc(t(data.education.classification, lang))}</span></div>
      <div><strong>${data.projects.length.toString().padStart(2, "0")}</strong><span>${l.projectCount}</span></div>
      <div><strong>4 / 4</strong><span>${l.scholarship}</span></div>
    </div>
    <section id="about" class="section container about-section" aria-labelledby="about-heading">
      ${sectionHeading("01", l.about, l.aboutTitle)}
      <div class="about-grid"><div class="about-copy">${t(data.profile.about, lang).map(p => `<p>${esc(p)}</p>`).join("")}<a class="text-link" href="${prefix}cv.html?lang=${lang}">${l.resume} ↗</a></div>
      <article class="education-card"><p class="small-label">${l.education} / ${data.education.period}</p><h3>${esc(t(data.education.school, lang))}</h3><p>${esc(t(data.education.degree, lang))}</p><div class="education-bottom"><strong>${data.education.gpa}</strong><span>${esc(t(data.education.classification, lang))}</span></div></article></div>
    </section>
    <section id="projects" class="section projects-section" aria-labelledby="projects-heading"><div class="container">
      ${sectionHeading("02", l.selected, l.projectIntro, l.projectSub)}
      <div class="project-toolbar"><div class="project-filters" role="group" aria-label="${lang === "vi" ? "Lọc dự án" : "Filter projects"}" hidden>
      ${["all", "engineering", "research", "ai"].map(filter => `<button type="button" data-filter="${filter}" aria-pressed="${filter === "all"}">${l[filter]}</button>`).join("")}</div><p id="filter-count" class="filter-count" role="status" aria-live="polite" data-result-label="${l.resultCount}">${data.projects.length} ${l.resultCount}</p></div>
      <div class="project-grid">${data.projects.map((p, i) => projectCard(p, i, lang, prefix)).join("")}</div>
      <p id="no-projects" hidden>${l.noResult}</p>
    </div></section>
    <section id="experience" class="section container" aria-labelledby="experience-heading">
      ${sectionHeading("03", l.experience, l.experienceTitle)}
      <div class="timeline">${data.experience.map((exp, i) => `<article class="timeline-entry"><div class="timeline-date"><span class="timeline-point" aria-hidden="true"></span><span>${exp.period}</span><small>0${i + 1}</small></div><div class="timeline-content"><h3>${esc(t(exp.role, lang))}</h3><p class="timeline-company">${esc(t(exp.organization, lang))}</p><ul>${htmlList(t(exp.points, lang))}</ul></div></article>`).join("")}</div>
    </section>
    <section id="skills" class="section skills-section" aria-labelledby="skills-heading"><div class="container">
      ${sectionHeading("04", l.skills, l.skillsTitle)}
      <div class="skills-grid">${data.skills.map((skill, i) => `<article class="skill-card"><span class="skill-number">0${i + 1}</span><h3>${esc(skill.name)}</h3><p>${esc(t(skill.description, lang))}</p>${tagList(skill.items, lang)}</article>`).join("")}</div>
      <div class="toolbox"><h3>${l.tools}</h3>${tagList(data.tools, lang)}<p class="language-note"><strong>${l.english}:</strong> ${esc(t(data.english, lang))}</p></div>
    </div></section>
    <section id="awards" class="section container awards-section" aria-labelledby="awards-heading">
      ${sectionHeading("05", l.awards, l.awardsTitle)}
      <div class="awards-list">${data.awards.map((award, i) => `<article class="award-item"><span class="award-number">0${i + 1}</span><div><h3>${esc(t(award.title, lang))}</h3><p>${esc(t(award.detail, lang))}</p></div><time>${esc(award.date)}</time></article>`).join("")}</div>
    </section>
    <section id="contact" class="section contact-section" aria-labelledby="contact-heading"><div class="container contact-grid">
      <div>${sectionHeading("06", l.contact, l.contactTitle)}<p class="contact-intro">${l.contactText}</p><a class="button button-light" href="mailto:${esc(data.profile.email)}">${l.email} <span aria-hidden="true">↗</span></a></div>
      <div class="contact-details" aria-label="${l.contactDetails}"><a class="contact-email" href="mailto:${esc(data.profile.email)}">${esc(data.profile.email)} <span aria-hidden="true">↗</span></a><a href="tel:${esc(data.profile.phoneLink)}">${esc(data.profile.phone)}</a><a href="${esc(data.profile.github)}" target="_blank" rel="noopener noreferrer">github.com/LeTPhu ↗</a><span>${esc(t(data.profile.location, lang))}</span><button type="button" id="copy-email" data-email="${esc(data.profile.email)}" data-copied="${l.copied}" data-fallback="${l.copyFallback}" hidden>${l.copy}</button><p id="copy-status" role="status" aria-live="polite"></p><input id="copy-email-value" type="text" readonly value="${esc(data.profile.email)}" aria-label="Email" hidden /></div>
    </div></section>
  </main>${footer(lang)}`;
}

function projectPage(lang, project) {
  const l = labels[lang], prefix = basePath(lang, project);
  const index = data.projects.findIndex(p => p.id === project.id);
  const home = prefix + (lang === "en" ? "en/" : "./");
  const gallery = project.gallery.length ? project.gallery.map((image, i) => `<figure>${media(image, lang, prefix, "gallery", l.galleryNote, String(i + 1).padStart(2, "0"))}<figcaption>${esc(t(image.caption || image.alt, lang))}</figcaption></figure>`).join("") : `<figure>${media(null, lang, prefix, "gallery", l.imageOne, "01")}<figcaption>${l.galleryNote}</figcaption></figure><figure>${media(null, lang, prefix, "gallery", l.imageTwo, "02")}<figcaption>${l.galleryNote}</figcaption></figure>`;
  const related = data.projects.filter(p => p.id !== project.id).slice(0, 3);
  return `${header(lang, project)}<main id="main" class="project-page category-${project.category}">
    <section class="project-hero container">
      <a class="text-link" href="${home}#projects">← ${l.back}</a>
      <div class="project-meta"><span>${l[project.category]} / 0${index + 1}</span><span>${esc(t(project.period, lang))}</span></div>
      <h1>${esc(project.name)}<span class="name-period">.</span></h1><p class="project-subheading">${esc(t(project.title, lang))}</p><p class="project-lead">${esc(t(project.summary, lang))}</p>
      <div class="project-hero-actions"><span class="project-context">${esc(t(project.context, lang))}</span>${project.repository ? `<a class="button button-outline" href="${esc(project.repository)}" target="_blank" rel="noopener noreferrer">${l.repo} ↗</a>` : ""}</div>
      <figure class="project-cover">${media(project.image, lang, prefix, "cover", l.cover, String(index + 1).padStart(2, "0"))}<figcaption>${l.galleryNote}</figcaption></figure>
    </section>
    <section class="container project-information">
      <div class="project-details"><p class="section-eyebrow">01 / ${l.overview}</p><h2>${l.scope}</h2><ul class="contribution-list">${htmlList(t(project.points, lang))}</ul><div class="result-box"><p class="small-label">${l.recorded}</p><p>${esc(t(project.result, lang))}</p></div></div>
      <aside class="project-stack"><h2>${l.technologies}</h2>${tagList(project.technologies, lang)}<a class="text-link" href="${prefix + data.profile.pdf}" download>${l.pdf} ↓</a></aside>
    </section>
    <section class="section container project-gallery"><p class="section-eyebrow">02 / ${l.gallery}</p><h2>${l.gallery}</h2><div class="gallery-grid">${gallery}</div></section>
    <section class="section related-section"><div class="container">${sectionHeading("03", l.next, l.selected)}<div class="related-grid">${related.map(p => projectCard(p, data.projects.indexOf(p), lang, prefix, true)).join("")}</div></div></section>
  </main>${footer(lang, project)}`;
}

function documentHtml(lang, project, body) {
  const prefix = basePath(lang, project);
  const canonical = new URL(pagePath(lang, project).replace(/index\.html$/, ""), data.siteUrl).href;
  const title = project ? project.name + " | Lê Tấn Phú" : "Lê Tấn Phú | AI Agent & LLM Systems";
  const description = project ? t(project.summary, lang) : t(data.profile.summary, lang);
  const schema = project ? { "@context": "https://schema.org", "@type": "CreativeWork", name: project.name, description, url: canonical, creator: { "@type": "Person", name: data.profile.name } } : { "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: { "@type": "Person", name: data.profile.name, url: data.siteUrl, sameAs: [data.profile.github], alumniOf: { "@type": "CollegeOrUniversity", name: "Nguyen Tat Thanh University" }, knowsAbout: data.skills.map(skill => skill.name) } };
  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="theme-color" content="#173d32" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:locale" content="${lang === "vi" ? "vi_VN" : "en_US"}" />
  <link rel="canonical" href="${canonical}" />
  ${languages.map(locale => `<link rel="alternate" hreflang="${locale}" href="${new URL(pagePath(locale, project).replace(/index\.html$/, ""), data.siteUrl).href}" />`).join("\n  ")}
  <link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${prefix}portfolio.css" />
  <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>
  <script src="${prefix}portfolio.js" defer></script>
</head>
<body data-page="${project ? "project" : "home"}" data-language="${lang}">${body}</body>
</html>\n`;
}

function write(relative, content) {
  const destination = path.join(site, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, content.replace(/[ \t]+$/gm, ""), "utf8");
}

function buildCvData() {
  const output = { activeDoc: "vi", documents: {} };
  const old = JSON.parse(fs.readFileSync(path.join(site, "data/cv-public.json"), "utf8"));
  for (const lang of languages) {
    const theme = old.documents[lang].theme;
    output.documents[lang] = {
      profile: {
        fullName: data.profile.name, headline: t(data.profile.direction, lang) + " | " + data.profile.focus,
        dob: "", nationality: "", email: data.profile.email, phone: data.profile.phone, website: data.profile.github,
        address: t(data.profile.location, lang), summary: t(data.profile.summary, lang),
        photo: data.profile.photo.src ? "./" + data.profile.photo.src : "./assets/avatar-placeholder.svg",
      },
      theme,
      visibility: { photo: Boolean(data.profile.photo.src), personal: true, skills: true, languages: true, awards: true, summary: true, education: true, experience: true, projects: true, customSections: false, certifications: false },
      contactVisibility: { dob: false, nationality: false, email: true, phone: true, website: true, address: true },
      experience: data.experience.map(exp => ({ role: t(exp.role, lang), company: t(exp.organization, lang), period: exp.period, location: "", details: t(exp.points, lang).join("\n") })),
      education: [{ school: t(data.education.school, lang), degree: t(data.education.degree, lang), period: data.education.period, details: t(data.education.classification, lang) + " - GPA " + data.education.gpa }],
      projects: data.projects.map(project => ({ name: project.name + " - " + t(project.title, lang), role: t(project.context, lang), period: t(project.period, lang), details: [...t(project.points, lang), t(project.result, lang)].join("\n") })),
      skills: data.skills.map(skill => ({ name: skill.name, level: "", details: skill.items.join("\n") })),
      languages: [{ name: labels[lang].english, level: t(data.english, lang) }],
      awards: data.awards.map(award => {
        const match = /^(\d{2})\/(\d{4})$/.exec(award.date);
        return { month: match ? match[1] : "", year: match ? match[2] : award.date, title: t(award.title, lang) + " - " + t(award.detail, lang) };
      }),
      customSections: [], certifications: [],
    };
  }
  write("data/cv-public.json", JSON.stringify(output, null, 2) + "\n");
}

validate();
for (const lang of languages) {
  write(pagePath(lang), documentHtml(lang, null, homePage(lang)));
  for (const project of data.projects) write(pagePath(lang, project), documentHtml(lang, project, projectPage(lang, project)));
}
const urls = languages.flatMap(lang => [null, ...data.projects].map(project => new URL(pagePath(lang, project).replace(/index\.html$/, ""), data.siteUrl).href));
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map(url => `<url><loc>${esc(url)}</loc><lastmod>${data.updated}</lastmod></url>`).join("")}</urlset>\n`);
write("robots.txt", "User-agent: *\nAllow: /\nSitemap: " + new URL("sitemap.xml", data.siteUrl).href + "\n");
write("404.html", documentHtml("vi", null, `${header("vi")}<main id="main" class="container not-found"><p class="section-eyebrow">404 / KHÔNG TÌM THẤY</p><h1>Trang này chưa có.</h1><p>Bạn có thể quay về hồ sơ cá nhân hoặc xem các dự án.</p><a class="button button-primary" href="${data.siteUrl}">Về trang chủ ↗</a></main>${footer("vi")}`).replace("<head>", '<head>\n  <base href="' + esc(data.siteUrl) + '" />'));
buildCvData();
console.log("Built portfolio: 2 homepages, 14 project pages, sitemap and bilingual CV data.");
