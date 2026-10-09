(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.PortfolioRenderer = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  return function createRenderer(data) {
    const languages = ["vi", "en"];
    const esc = (value) =>
      String(value ?? "").replace(
        /[&<>"']/g,
        (c) =>
          ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
          })[c],
      );
    const t = (value, lang) =>
      typeof value === "string" ? value : (value?.[lang] ?? "");
    const htmlList = (items) =>
      items.map((item) => `<li>${esc(item)}</li>`).join("");
    const tagList = (items, lang) =>
      `<ul class="tags" aria-label="${lang === "vi" ? "Công nghệ và công cụ" : "Technologies and tools"}">${htmlList(items)}</ul>`;
    const pagePath = (lang, project) =>
      `${lang === "en" ? "en/" : ""}${project ? "projects/" + project.id + ".html" : "index.html"}`;
    const basePath = (lang, project) =>
      "../".repeat((lang === "en" ? 1 : 0) + (project ? 1 : 0));
    const labels = {
      vi: {
        about: "Giới thiệu",
        projects: "Dự án",
        experience: "Hành trình",
        skills: "Kỹ năng",
        awards: "Thành tích",
        contact: "Liên hệ",
        skip: "Đến nội dung",
        menu: "Mở menu",
        close: "Đóng menu",
        pdf: "Tải CV PDF",
        resume: "Xem CV A4",
        home: "Trang chủ",
        explore: "Khám phá dự án",
        email: "Gửi email",
        all: "Tất cả",
        engineering: "Hệ thống & web",
        research: "Nghiên cứu",
        ai: "AI ứng dụng",
        detail: "Xem chi tiết",
        cover: "Không gian dành cho ảnh dự án",
        portrait: "Không gian dành cho ảnh chân dung",
        selected: "Dự án & nghiên cứu",
        projectIntro:
          "Những hệ thống tôi xây dựng, những câu hỏi tôi tìm hiểu.",
        projectSub:
          "Từ AI ứng dụng đến hệ thống web và nghiên cứu học thuật. Chọn một dự án để xem phạm vi, công nghệ và kết quả ghi nhận.",
        aboutTitle: "Từ nền tảng AI đến hệ thống có kiểm thử.",
        experienceTitle: "Học hỏi qua từng trải nghiệm.",
        skillsTitle: "Công nghệ tôi làm việc cùng.",
        awardsTitle: "Những cột mốc đáng nhớ.",
        contactTitle: "Bắt đầu một cuộc trò chuyện.",
        contactText:
          "Bạn muốn trao đổi về AI ứng dụng, agent/LLM hoặc phát triển hệ thống web? Có thể liên hệ với tôi qua email hoặc GitHub.",
        projectCount: "dự án & nghiên cứu",
        scholarship: "năm nhận học bổng",
        education: "Học vấn",
        tools: "Công cụ & môi trường",
        english: "Tiếng Anh",
        snapshot: "Hồ sơ cập nhật từ CV 2026",
        scope: "Phạm vi & đóng góp",
        technologies: "Công nghệ sử dụng",
        recorded: "Kết quả ghi nhận trong CV",
        gallery: "Ảnh & tư liệu dự án",
        galleryNote:
          "Khu vực dành cho ảnh giao diện, sơ đồ hoặc kết quả thực nghiệm.",
        repo: "Repository GitHub",
        back: "Tất cả dự án",
        next: "Khám phá thêm",
        read: "Xem hồ sơ chi tiết",
        contactDetails: "Thông tin liên hệ",
        imageOne: "Ảnh giao diện / sơ đồ",
        imageTwo: "Ảnh kết quả / minh chứng",
        noResult: "Chưa có dự án trong nhóm này.",
        resultCount: "dự án đang hiển thị",
        copy: "Sao chép email",
        copied: "Đã sao chép email.",
        copyFallback: "Chọn email bên dưới để sao chép.",
        footer: "AI ứng dụng. Hệ thống có kiểm thử.",
        photoCaption: "Lê Tấn Phú / Hồ sơ cá nhân",
        overview: "Tổng quan dự án",
        projectLabel: "Dự án",
        lastUpdate: "Cập nhật",
        motto: "Học hỏi. Xây dựng. Kiểm chứng.",
        disciplines: "AI ứng dụng / Phát triển hệ thống / Nghiên cứu",
        archive: "Thư viện minh chứng",
        archiveTitle: "Những nỗ lực được ghi nhận.",
        archiveIntro:
          "Giấy khen và chứng nhận từ các cuộc thi, hoạt động học tập. Chọn một ảnh để xem rõ toàn bộ nội dung.",
        award: "Giấy khen",
        participation: "Chứng nhận tham gia",
        issued: "Ngày cấp",
        evidence: "Xem minh chứng",
        viewImage: "Xem ảnh lớn",
        originalImage: "Mở ảnh gốc",
        downloadImage: "Tải ảnh gốc",
        closeViewer: "Đóng ảnh",
        previousImage: "Ảnh trước",
        nextImage: "Ảnh tiếp theo",
        zoom: "Phóng to / thu nhỏ",
        imageLoading: "Đang tải ảnh…",
        imageError: "Chưa tải được ảnh. Bạn có thể thử mở ảnh gốc.",
        documentCount: "tư liệu đang hiển thị",
        proofCount: "giấy khen & chứng nhận",
        illustration: "Minh họa lĩnh vực · Có thể thêm ảnh dự án",
        cvMilestones: "Các cột mốc trong CV",
        archiveHint: "Ảnh tư liệu được giữ nguyên, không chỉnh sửa nội dung.",
      },
      en: {
        about: "About",
        projects: "Projects",
        experience: "Journey",
        skills: "Skills",
        awards: "Achievements",
        contact: "Contact",
        skip: "Skip to content",
        menu: "Open menu",
        close: "Close menu",
        pdf: "Download CV",
        resume: "View A4 resume",
        home: "Home",
        explore: "Explore projects",
        email: "Send an email",
        all: "All",
        engineering: "Systems & web",
        research: "Research",
        ai: "Applied AI",
        detail: "View project",
        cover: "Space for project imagery",
        portrait: "Space for a portrait photo",
        selected: "Projects & research",
        projectIntro: "Systems I build. Questions I explore.",
        projectSub:
          "From applied AI to web systems and academic research. Explore each project's scope, technologies and recorded findings.",
        aboutTitle: "An AI foundation. A focus on tested systems.",
        experienceTitle: "Learning through experience.",
        skillsTitle: "Technologies I work with.",
        awardsTitle: "Milestones along the way.",
        contactTitle: "Let's start a conversation.",
        contactText:
          "Interested in applied AI, agents/LLM systems or web development? You can reach me by email or on GitHub.",
        projectCount: "projects & research",
        scholarship: "years of scholarships",
        education: "Education",
        tools: "Tools & environment",
        english: "English",
        snapshot: "Profile based on the 2026 CV",
        scope: "Scope & contributions",
        technologies: "Technologies",
        recorded: "Results recorded in the CV",
        gallery: "Project imagery & materials",
        galleryNote:
          "Space for interface screenshots, diagrams or experimental results.",
        repo: "GitHub repository",
        back: "All projects",
        next: "Explore more",
        read: "Explore the full profile",
        contactDetails: "Contact information",
        imageOne: "Interface / diagram",
        imageTwo: "Results / evidence",
        noResult: "No projects in this category yet.",
        resultCount: "projects shown",
        copy: "Copy email",
        copied: "Email copied.",
        copyFallback: "Select the email below to copy it.",
        footer: "Applied AI. Tested systems.",
        photoCaption: "Le Tan Phu / Personal profile",
        overview: "Project overview",
        projectLabel: "Project",
        lastUpdate: "Updated",
        motto: "Learn. Build. Validate.",
        disciplines: "Applied AI / Systems development / Research",
        archive: "Evidence archive",
        archiveTitle: "Effort, recognised.",
        archiveIntro:
          "Awards and participation certificates from competitions and learning activities. Select an image to read the full document.",
        award: "Award",
        participation: "Participation",
        issued: "Issued",
        evidence: "View evidence",
        viewImage: "View larger image",
        originalImage: "Open original",
        downloadImage: "Download original",
        closeViewer: "Close image",
        previousImage: "Previous image",
        nextImage: "Next image",
        zoom: "Zoom in / out",
        imageLoading: "Loading image…",
        imageError: "The image could not load. Try opening the original.",
        documentCount: "documents shown",
        proofCount: "awards & certificates",
        illustration: "Field illustration · Space for project imagery",
        cvMilestones: "Milestones from the CV",
        archiveHint: "Document images retain their original content.",
      },
    };

    for (const lang of languages)
      Object.assign(labels[lang], data.content?.[lang] || {});
    const sectionIds = [
      "about",
      "projects",
      "experience",
      "skills",
      "awards",
      "contact",
    ];
    const order = [
      ...new Set([
        ...(data.settings?.sectionOrder || sectionIds),
        ...sectionIds,
        ...(data.customSections || []).map((s) => s.id),
      ]),
    ];
    const visible = (id) => !(data.settings?.hiddenSections || []).includes(id);
    function media(image, lang, prefix, kind, label, number = "") {
      const hasImage = Boolean(image?.src);
      const illustrated = ["project", "cover"].includes(kind);
      const marks = ["CRM", "API", "SED", "VQA", "IT", "OCR", "CV"];
      const mark = marks[Number(number) - 1] || "AI";
      return `<div class="media media--${kind}${hasImage ? " has-image" : ""}" data-media>
    ${hasImage ? `<img src="${esc(prefix + image.src)}" alt="${esc(t(image.alt, lang))}" ${kind === "portrait" ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" style="object-position:${esc(image.position || "50% 50%")}" />` : ""}
    <div class="media-placeholder"${hasImage ? " hidden" : ""}>
      <span class="media-index" aria-hidden="true">${kind === "portrait" ? "PERSONAL / 01" : "PROJECT / " + number}</span>
      <div class="media-mark${illustrated ? " field-illustration" : ""}" aria-hidden="true">${kind === "portrait" ? esc(data.profile.initials) : illustrated ? `<svg viewBox="0 0 400 220" fill="none"><path d="M65 65H140L200 110L260 65H335M65 155H140L200 110L260 155H335" stroke="currentColor" stroke-width="1.2"/><circle cx="200" cy="110" r="67" stroke="currentColor" stroke-dasharray="3 7"/><circle cx="200" cy="110" r="43" fill="currentColor" fill-opacity=".08" stroke="currentColor"/><rect x="30" y="45" width="70" height="40" rx="8" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><rect x="30" y="135" width="70" height="40" rx="8" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><rect x="300" y="45" width="70" height="40" rx="8" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><rect x="300" y="135" width="70" height="40" rx="8" fill="currentColor" fill-opacity=".06" stroke="currentColor"/><path d="M48 60H81M48 69H69M48 150H75M48 159H81M318 60H351M318 69H339M318 150H345M318 159H351" stroke="currentColor" opacity=".45"/><text x="200" y="117" text-anchor="middle" fill="currentColor" font-size="21" font-family="Roboto, sans-serif" font-weight="500">${mark}</text></svg>` : "<span></span><span></span><span></span>"}</div>
      <span class="media-label">${esc(illustrated ? labels[lang].illustration : label)}</span>
    </div>
  </div>`;
    }

    function header(lang, project) {
      const l = labels[lang];
      const prefix = basePath(lang, project);
      const home = prefix + (lang === "en" ? "en/" : "./");
      const other = lang === "vi" ? "en" : "vi";
      const alternate = prefix + pagePath(other, project);
      return `<a class="skip-link" href="#main">${esc(l.skip)}</a>
  <header class="site-nav">
    <div class="nav-inner">
      <a class="brand" href="${home}" aria-label="${esc(l.home)}"><span class="brand-mark">P.</span><span>${esc(data.profile.name)}<span class="brand-sub">AI / ENGINEERING</span></span></a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="main-nav" data-open-label="${esc(l.menu)}" data-close-label="${esc(l.close)}"><span class="menu-icon" aria-hidden="true"></span><span data-menu-label>${esc(l.menu)}</span></button>
      <nav id="main-nav" class="main-nav" aria-label="${lang === "vi" ? "Điều hướng chính" : "Main navigation"}">
        ${order
          .filter((id) => visible(id) && id !== "contact")
          .slice(0, 5)
          .map(
            (id) =>
              `<a href="${project ? home : ""}#${id}">${esc(l[id] || t(data.customSections?.find((s) => s.id === id)?.title, lang))}</a>`,
          )
          .join("")}
        ${visible("contact") ? `<a class="nav-contact" href="${project ? home : ""}#contact">${esc(l.contact)} <span aria-hidden="true">↗</span></a>` : ""}
      </nav>
      <a class="language-link" href="${alternate}" lang="${other}" hreflang="${other}" aria-label="${lang === "vi" ? "Read in English" : "Đọc bằng tiếng Việt"}">${lang === "vi" ? "EN" : "VI"} <span aria-hidden="true">↗</span></a>
    </div>
  </header>`;
    }

    function footer(lang, project) {
      const l = labels[lang],
        prefix = basePath(lang, project);
      const updated = new Intl.DateTimeFormat(
        lang === "vi" ? "vi-VN" : "en-GB",
        { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "UTC" },
      ).format(new Date(data.updated));
      return `<footer class="footer container"><div><a class="footer-brand" href="${prefix + (lang === "en" ? "en/" : "./")}">${esc(data.profile.name)}<span aria-hidden="true">.</span></a><p>${esc(l.footer)}</p></div><div class="footer-right"><a href="${esc(data.profile.github)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="${esc(prefix + data.profile.pdf)}" download>${esc(l.pdf)} ↓</a><a href="${prefix}admin/">${lang === "vi" ? "Quản trị" : "Manage"}</a><small>${esc(l.lastUpdate)}: ${updated} · ${esc(l.snapshot)}</small></div></footer>`;
    }

    function sectionHeading(number, eyebrow, title, description = "") {
      const id = {
        "01": "about-heading",
        "02": "projects-heading",
        "03": "experience-heading",
        "04": "skills-heading",
        "05": "awards-heading",
        "06": "contact-heading",
      }[number];
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
      <a class="text-link" href="${prefix + pagePath(lang, project)}">${esc(l.detail)} <span aria-hidden="true">↗</span></a>
    </div>
  </article>`;
    }

    function certificateGallery(lang, prefix) {
      const l = labels[lang];
      if (!data.certificates?.length) return "";
      return `<div id="certificates" class="certificate-archive">
    <div class="archive-heading"><div><p class="section-eyebrow">${esc(l.archive)} / ${String(data.certificates.length).padStart(2, "0")}</p><h3>${esc(l.archiveTitle)}</h3><p>${esc(l.archiveIntro)}</p></div><span class="archive-seal" aria-hidden="true">LP<span>EVIDENCE / ARCHIVE</span></span></div>
    <div class="certificate-toolbar"><div class="certificate-filters" role="group" aria-label="${esc(l.archive)}" hidden>${["all", "award", "participation"].map((filter) => `<button type="button" data-certificate-filter="${filter}" aria-pressed="${filter === "all"}">${esc(l[filter])}</button>`).join("")}</div><p id="certificate-count" role="status" data-result-label="${esc(l.documentCount)}">${data.certificates.length} ${esc(l.documentCount)}</p></div>
    <div class="certificate-grid">${data.certificates
      .map((certificate, index) => {
        const issued = new Intl.DateTimeFormat(
          lang === "vi" ? "vi-VN" : "en-GB",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            timeZone: "UTC",
          },
        ).format(new Date(certificate.issued));
        return `<article class="certificate-card" id="certificate-${certificate.id}" data-certificate-category="${certificate.category}">
        <a class="certificate-image" href="${esc(prefix + certificate.src)}" target="_blank" rel="noopener noreferrer" data-certificate="${certificate.id}" data-title="${esc(t(certificate.title, lang))}" data-description="${esc(t(certificate.description, lang))}" data-issuer="${esc(t(certificate.issuer, lang))}" data-issued="${esc(l.issued + ": " + issued)}" data-alt="${esc(t(certificate.alt, lang))}" aria-label="${esc(l.viewImage + ": " + t(certificate.title, lang))}">
          <img src="${esc(prefix + certificate.src)}" width="${certificate.width}" height="${certificate.height}" alt="${esc(t(certificate.alt, lang))}" loading="lazy" decoding="async" />
          <span class="certificate-image-error" hidden>${esc(l.imageError)}</span><span class="image-open" aria-hidden="true">${esc(l.viewImage)} ↗</span>
        </a><div class="certificate-body"><div class="certificate-meta"><span>${l[certificate.category]}</span><span aria-hidden="true">${String(index + 1).padStart(2, "0")} / ${String(data.certificates.length).padStart(2, "0")}</span></div><h4>${esc(t(certificate.title, lang))}</h4><p>${esc(t(certificate.description, lang))}</p><div class="certificate-foot"><span>${esc(t(certificate.issuer, lang))}</span><time datetime="${certificate.issued}">${esc(l.issued)}: ${issued}</time></div></div>
      </article>`;
      })
      .join("")}</div><p class="archive-note">${esc(l.archiveHint)}</p>
  </div>`;
    }

    function certificateDialog(lang) {
      const l = labels[lang];
      return `<dialog id="certificate-viewer" class="certificate-viewer" aria-labelledby="viewer-title" data-loading="${esc(l.imageLoading)}" data-error="${esc(l.imageError)}">
    <div class="viewer-top"><p class="small-label">${esc(l.archive)} <span id="viewer-count" role="status"></span></p><button type="button" class="viewer-close" aria-label="${esc(l.closeViewer)}" autofocus>${esc(l.closeViewer)} ×</button></div>
    <div class="viewer-stage"><img id="viewer-image" alt="" hidden /><p id="viewer-status" role="status"></p></div>
    <div class="viewer-caption"><div><h2 id="viewer-title"></h2><p id="viewer-description"></p><p class="viewer-issuer" id="viewer-issuer"></p></div><div class="viewer-navigation"><button type="button" data-viewer-prev aria-label="${esc(l.previousImage)}">←</button><button type="button" data-viewer-zoom aria-pressed="false">${esc(l.zoom)}</button><button type="button" data-viewer-next aria-label="${esc(l.nextImage)}">→</button></div></div>
    <div class="viewer-bottom"><span id="viewer-issued"></span><div><a id="viewer-original" target="_blank" rel="noopener noreferrer">${esc(l.originalImage)} ↗</a><a id="viewer-download" download>${esc(l.downloadImage)} ↓</a></div></div>
  </dialog>`;
    }

    function homePage(lang) {
      const l = labels[lang],
        prefix = basePath(lang);
      const source = `${header(lang)}
  <main id="main">
    <section class="hero container" aria-labelledby="hero-title">
      <div class="hero-content">
        <p class="hero-edition">PERSONAL PORTFOLIO <span>2026 / VI + EN</span></p>
        <p class="hero-eyebrow"><span class="status-dot" aria-hidden="true"></span>${esc(t(data.profile.direction, lang))}</p>
        <h1 id="hero-title">${esc(data.profile.name)}<span class="name-period">.</span></h1>
        <p class="hero-focus">${data.profile.focus
          .split(/\s*&\s*|\n/)
          .map((x, i) => (i ? `<span>${esc(x)}.</span>` : esc(x) + "."))
          .join("<br />")}</p>
        <p class="hero-motto">${esc(l.motto)}</p>
        <p class="hero-summary">${esc(t(data.profile.summary, lang))}</p>
        <div class="hero-actions"><a class="button button-primary" href="#projects">${esc(l.explore)} <span aria-hidden="true">↗</span></a><a class="button button-outline" href="${prefix + data.profile.pdf}" download>${esc(l.pdf)} <span aria-hidden="true">↓</span></a></div>
        <p class="hero-location"><span aria-hidden="true">⌖</span> ${esc(t(data.profile.location, lang))} <span class="location-divider">/</span> <a href="${esc(data.profile.github)}" target="_blank" rel="noopener noreferrer">@${esc(data.profile.github.split("/").filter(Boolean).pop())} ↗</a></p>
      </div>
      <figure class="hero-portrait">${media(data.profile.photo, lang, prefix, "portrait", l.portrait)}
        <figcaption><span>${esc(l.photoCaption)}</span><span aria-hidden="true">PROFILE / 2026</span></figcaption>
        <div class="portrait-tag" aria-hidden="true">AI / ML<br /><strong>BUILD. TEST. LEARN.</strong></div>
        <a class="portrait-proof" href="#certificates"><span class="proof-star" aria-hidden="true"><svg viewBox="0 0 40 40" fill="none"><path d="M20 2L24 15L38 20L24 25L20 38L16 25L2 20L16 15Z" stroke="currentColor"/><path d="M20 10V30M10 20H30" stroke="currentColor"/></svg></span><span><strong>${String(data.certificates?.length || 0).padStart(2, "0")}</strong><small>${esc(l.proofCount)}</small></span><span aria-hidden="true">↗</span></a>
      </figure>
    </section>
    <div class="discipline-strip container"><span>${esc(l.disciplines)}</span><a href="#about">${esc(l.about)} <span aria-hidden="true">↓</span></a></div>
    <div class="stats container" aria-label="${lang === "vi" ? "Thông tin nổi bật" : "Profile highlights"}">
      <div><strong>${esc(data.education.gpa)}</strong><span>GPA · ${esc(t(data.education.classification, lang))}</span></div>
      <div><strong>${data.projects.length.toString().padStart(2, "0")}</strong><span>${esc(l.projectCount)}</span></div>
      <div><strong>${esc(data.settings?.scholarship ?? "4 / 4")}</strong><span>${esc(l.scholarship)}</span></div>
    </div>
    <section id="about" class="section container about-section" aria-labelledby="about-heading">
      ${sectionHeading("01", l.about, l.aboutTitle)}
      <div class="about-grid"><div class="about-copy">${t(
        data.profile.about,
        lang,
      )
        .map((p) => `<p>${esc(p)}</p>`)
        .join(
          "",
        )}<a class="text-link" href="${prefix}cv.html?lang=${lang}">${esc(l.resume)} ↗</a></div>
      <article class="education-card"><p class="small-label">${esc(l.education)} / ${esc(data.education.period)}</p><h3>${esc(t(data.education.school, lang))}</h3><p>${esc(t(data.education.degree, lang))}</p><div class="education-bottom"><strong>${esc(data.education.gpa)}</strong><span>${esc(t(data.education.classification, lang))}</span></div></article></div>
    </section>
    <section id="projects" class="section projects-section" aria-labelledby="projects-heading"><div class="container">
      ${sectionHeading("02", l.selected, l.projectIntro, l.projectSub)}
      <div class="project-toolbar"><div class="project-filters" role="group" aria-label="${lang === "vi" ? "Lọc dự án" : "Filter projects"}" hidden>
      ${["all", "engineering", "research", "ai"].map((filter) => `<button type="button" data-filter="${filter}" aria-pressed="${filter === "all"}">${esc(l[filter])}</button>`).join("")}</div><p id="filter-count" class="filter-count" role="status" aria-live="polite" data-result-label="${esc(l.resultCount)}">${data.projects.length} ${esc(l.resultCount)}</p></div>
      <div class="project-grid">${data.projects.map((p, i) => projectCard(p, i, lang, prefix)).join("")}</div>
      <p id="no-projects" hidden>${esc(l.noResult)}</p>
    </div></section>
    <section id="experience" class="section container" aria-labelledby="experience-heading">
      ${sectionHeading("03", l.experience, l.experienceTitle)}
      <div class="timeline">${data.experience.map((exp, i) => `<article class="timeline-entry"><div class="timeline-date"><span class="timeline-point" aria-hidden="true"></span><span>${esc(exp.period)}</span><small>0${i + 1}</small></div><div class="timeline-content"><h3>${esc(t(exp.role, lang))}</h3><p class="timeline-company">${esc(t(exp.organization, lang))}</p><ul>${htmlList(t(exp.points, lang))}</ul></div></article>`).join("")}</div>
    </section>
    <section id="skills" class="section skills-section" aria-labelledby="skills-heading"><div class="container">
      ${sectionHeading("04", l.skills, l.skillsTitle)}
      <div class="skills-grid">${data.skills.map((skill, i) => `<article class="skill-card"><span class="skill-number">0${i + 1}</span><h3>${esc(skill.name)}</h3><p>${esc(t(skill.description, lang))}</p>${tagList(skill.items, lang)}</article>`).join("")}</div>
      <div class="toolbox"><h3>${esc(l.tools)}</h3>${tagList(data.tools, lang)}<p class="language-note"><strong>${esc(l.english)}:</strong> ${esc(t(data.english, lang))}</p></div>
    </div></section>
    <section id="awards" class="section container awards-section" aria-labelledby="awards-heading">
      ${sectionHeading("05", l.awards, l.awardsTitle)}
      <p class="milestones-label small-label">${esc(l.cvMilestones)}</p>
      <div class="awards-list">${data.awards.map((award, i) => `<article class="award-item"><span class="award-number">0${i + 1}</span><div><h3>${esc(t(award.title, lang))}</h3><p>${esc(t(award.detail, lang))}</p>${award.certificate ? `<a class="award-evidence" href="#certificate-${award.certificate}" data-evidence-id="${award.certificate}">${esc(l.evidence)} ↗</a>` : ""}</div><time>${esc(award.date)}</time></article>`).join("")}</div>
      ${certificateGallery(lang, prefix)}
    </section>
    <section id="contact" class="section contact-section" aria-labelledby="contact-heading"><div class="container contact-grid">
      <div>${sectionHeading("06", l.contact, l.contactTitle)}<p class="contact-intro">${esc(l.contactText)}</p><a class="button button-light" href="mailto:${esc(data.profile.email)}">${esc(l.email)} <span aria-hidden="true">↗</span></a></div>
      <div class="contact-details" aria-label="${esc(l.contactDetails)}"><a class="contact-email" href="mailto:${esc(data.profile.email)}">${esc(data.profile.email)} <span aria-hidden="true">↗</span></a><a href="tel:${esc(data.profile.phoneLink)}">${esc(data.profile.phone)}</a><a href="${esc(data.profile.github)}" target="_blank" rel="noopener noreferrer">${esc(data.profile.github.replace("https://", ""))} ↗</a><span>${esc(t(data.profile.location, lang))}</span><button type="button" id="copy-email" data-email="${esc(data.profile.email)}" data-copied="${esc(l.copied)}" data-fallback="${esc(l.copyFallback)}" hidden>${esc(l.copy)}</button><p id="copy-status" role="status" aria-live="polite"></p><input id="copy-email-value" type="text" readonly value="${esc(data.profile.email)}" aria-label="Email" hidden /></div>
    </div></section>
  </main>${footer(lang)}${certificateDialog(lang)}`;
      // Reorder complete generated blocks, never user-provided HTML.
      const blocks = {};
      const shell = source
        .replace(
          /    <section id="([a-z0-9-]+)"[\s\S]*?<\/section>/g,
          (html, id) => {
            blocks[id] = html;
            return "";
          },
        )
        .replace(/\n(?:[ \t]*\n){2,}/g, "\n\n");
      for (const item of data.customSections || [])
        blocks[item.id] =
          `<section id="${esc(item.id)}" class="section container" aria-labelledby="${esc(item.id)}-heading"><div class="section-heading"><p class="section-eyebrow">${lang === "vi" ? "Góc chia sẻ" : "More about me"}</p><h2 id="${esc(item.id)}-heading">${esc(t(item.title, lang))}</h2></div><div class="about-copy">${t(
            item.body,
            lang,
          )
            .split("\n")
            .filter(Boolean)
            .map((p) => `<p>${esc(p)}</p>`)
            .join(
              "",
            )}<ul>${htmlList(t(item.points, lang))}</ul></div>${item.image?.src ? media(item.image, lang, prefix, "gallery", "") : ""}</section>`;
      let result = shell.replace(
        "  </main>",
        order
          .filter(visible)
          .map((id) => blocks[id] || "")
          .join("\n") + "\n  </main>",
      );
      if (!visible("projects"))
        result = result.replace(
          /<a class="button button-primary" href="#projects">[\s\S]*?<\/a>/,
          "",
        );
      if (!visible("about"))
        result = result.replace(/<a href="#about">[\s\S]*?<\/a>/, "");
      if (!visible("awards") || !data.certificates.length)
        result = result.replace(/<a class="portrait-proof"[\s\S]*?<\/a>/, "");
      return result;
    }

    function projectPage(lang, project) {
      const l = labels[lang],
        prefix = basePath(lang, project);
      const index = data.projects.findIndex((p) => p.id === project.id);
      const home = prefix + (lang === "en" ? "en/" : "./");
      const gallery = project.gallery.length
        ? project.gallery
            .map(
              (image, i) =>
                `<figure>${media(image, lang, prefix, "gallery", l.galleryNote, String(i + 1).padStart(2, "0"))}<figcaption>${esc(t(image.caption || image.alt, lang))}</figcaption></figure>`,
            )
            .join("")
        : `<figure>${media(null, lang, prefix, "gallery", l.imageOne, "01")}<figcaption>${esc(l.galleryNote)}</figcaption></figure><figure>${media(null, lang, prefix, "gallery", l.imageTwo, "02")}<figcaption>${esc(l.galleryNote)}</figcaption></figure>`;
      const related = data.projects
        .filter((p) => p.id !== project.id)
        .slice(0, 3);
      return `${header(lang, project)}<main id="main" class="project-page category-${project.category}">
    <section class="project-hero container">
      <a class="text-link" href="${home}#projects">← ${esc(l.back)}</a>
      <div class="project-meta"><span>${l[project.category]} / 0${index + 1}</span><span>${esc(t(project.period, lang))}</span></div>
      <h1>${esc(project.name)}<span class="name-period">.</span></h1><p class="project-subheading">${esc(t(project.title, lang))}</p><p class="project-lead">${esc(t(project.summary, lang))}</p>
      <div class="project-hero-actions"><span class="project-context">${esc(t(project.context, lang))}</span>${project.repository ? `<a class="button button-outline" href="${esc(project.repository)}" target="_blank" rel="noopener noreferrer">${esc(l.repo)} ↗</a>` : ""}</div>
      <figure class="project-cover">${media(project.image, lang, prefix, "cover", l.cover, String(index + 1).padStart(2, "0"))}<figcaption>${esc(l.galleryNote)}</figcaption></figure>
    </section>
    <section class="container project-information">
      <div class="project-details"><p class="section-eyebrow">01 / ${esc(l.overview)}</p><h2>${esc(l.scope)}</h2><ul class="contribution-list">${htmlList(t(project.points, lang))}</ul><div class="result-box"><p class="small-label">${esc(l.recorded)}</p><p>${esc(t(project.result, lang))}</p></div></div>
      <aside class="project-stack"><h2>${esc(l.technologies)}</h2>${tagList(project.technologies, lang)}<a class="text-link" href="${prefix + data.profile.pdf}" download>${esc(l.pdf)} ↓</a></aside>
    </section>
    <section class="section container project-gallery"><p class="section-eyebrow">02 / ${esc(l.gallery)}</p><h2>${esc(l.gallery)}</h2><div class="gallery-grid">${gallery}</div></section>
    <section class="section related-section"><div class="container">${sectionHeading("03", l.next, l.selected)}<div class="related-grid">${related.map((p) => projectCard(p, data.projects.indexOf(p), lang, prefix, true)).join("")}</div></div></section>
  </main>${footer(lang, project)}`;
    }

    function documentHtml(lang, project, body) {
      const prefix = basePath(lang, project);
      const canonical = new URL(
        pagePath(lang, project).replace(/index\.html$/, ""),
        data.siteUrl,
      ).href;
      const title = project
        ? project.name + " | " + data.profile.name
        : data.profile.name + " | " + data.profile.focus;
      const description = project
        ? t(project.summary, lang)
        : t(data.profile.summary, lang);
      const schema = project
        ? {
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            name: project.name,
            description,
            url: canonical,
            creator: { "@type": "Person", name: data.profile.name },
          }
        : {
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            mainEntity: {
              "@type": "Person",
              name: data.profile.name,
              url: data.siteUrl,
              sameAs: [data.profile.github],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: t(data.education.school, lang),
              },
              knowsAbout: data.skills.map((skill) => skill.name),
            },
          };
      return `<!doctype html>
<html lang="${lang}" data-generated-portfolio="true">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="portfolio-auto-language" content="${data.settings?.autoLanguage === false ? "off" : "on"}" />
  ${languages.map((locale) => `<meta name="portfolio-path-${locale}" content="${prefix + pagePath(locale, project)}" />`).join("\n  ")}
  <script src="${prefix}language.js"></script>
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="theme-color" content="#173d32" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:locale" content="${lang === "vi" ? "vi_VN" : "en_US"}" />
  <link rel="canonical" href="${canonical}" />
  ${languages.map((locale) => `<link rel="alternate" hreflang="${locale}" href="${new URL(pagePath(locale, project).replace(/index\.html$/, ""), data.siteUrl).href}" />`).join("\n  ")}
  <link rel="icon" href="${prefix}assets/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${prefix}portfolio.css?v=20261009-2" />
  <script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>
  <script src="${prefix}portfolio.js?v=20261009-2" defer></script>
</head>
<body data-page="${project ? "project" : "home"}" data-language="${lang}">${body}</body>
</html>\n`;
    }

    return {
      labels,
      esc,
      t,
      pagePath,
      basePath,
      documentHtml,
      homePage,
      projectPage,
      header,
      footer,
    };
  };
});
