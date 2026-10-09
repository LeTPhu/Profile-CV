const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const site = path.join(root, "github-public-cv");
const model = require("../github-public-cv/portfolio-model.js");
const data = model.normalize(
  JSON.parse(
    fs
      .readFileSync(path.join(site, "data/portfolio.json"), "utf8")
      .replace(/^\uFEFF/, ""),
  ),
);
const languages = ["vi", "en"];
const createRenderer = require("../github-public-cv/portfolio-renderer.js");
const {
  labels,
  esc,
  t,
  pagePath,
  documentHtml,
  homePage,
  projectPage,
  header,
  footer,
} = createRenderer(data);

function validate() {
  const errors = model.validate(data);
  if (errors.length) throw new Error(errors.join("\n"));
  const ids = new Set();
  for (const project of data.projects) {
    if (!/^[a-z0-9-]+$/.test(project.id) || ids.has(project.id))
      throw new Error("Invalid or duplicate project id");
    ids.add(project.id);
    if (!["engineering", "research", "ai"].includes(project.category))
      throw new Error("Invalid category");
    for (const lang of languages) {
      if (
        !project.title?.[lang] ||
        !project.summary?.[lang] ||
        !Array.isArray(project.points?.[lang])
      )
        throw new Error("Missing project translation");
    }
    if (
      project.repository &&
      !/^https:\/\/github\.com\//.test(project.repository)
    )
      throw new Error("Invalid repository URL");
  }
  const certificateIds = new Set();
  for (const certificate of data.certificates || []) {
    if (
      !/^[a-z0-9-]+$/.test(certificate.id) ||
      certificateIds.has(certificate.id)
    )
      throw new Error("Invalid or duplicate certificate id");
    certificateIds.add(certificate.id);
    if (!["award", "participation"].includes(certificate.category))
      throw new Error("Invalid certificate category");
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(certificate.issued) ||
      !Number.isFinite(Date.parse(certificate.issued)) ||
      new Date(certificate.issued).toISOString().slice(0, 10) !==
        certificate.issued
    )
      throw new Error("Invalid certificate issue date");
    if (!(certificate.width > 0 && certificate.height > 0) || !certificate.src)
      throw new Error("Certificate needs an image and dimensions");
    for (const lang of languages) {
      if (
        ![certificate.title, certificate.issuer, certificate.description].every(
          (field) => field?.[lang],
        )
      )
        throw new Error("Missing certificate translation");
    }
  }
  for (const award of data.awards) {
    if (award.certificate && !certificateIds.has(award.certificate))
      throw new Error("Unknown award evidence: " + award.certificate);
  }
  const images = model.images(data);
  for (const image of images) {
    if (!image?.src) continue;
    if (
      !/^assets\/[a-zA-Z0-9/_.-]+$/.test(image.src) ||
      image.src.split("/").includes("..")
    )
      throw new Error("Images must be local files within assets/");
    if (!fs.existsSync(path.join(site, image.src)))
      throw new Error("Missing image: " + image.src);
    if (!image.alt?.vi || !image.alt?.en)
      throw new Error("Missing image alternative text");
  }
  if (!fs.existsSync(path.join(site, data.profile.pdf)))
    throw new Error("Missing original CV PDF");
}

function write(relative, content) {
  const destination = path.join(site, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, content.replace(/[ \t]+$/gm, ""), "utf8");
}

function buildCvData() {
  const output = {
    activeDoc: "vi",
    autoLanguage: data.settings.autoLanguage,
    documents: {},
  };
  const old = JSON.parse(
    fs.readFileSync(path.join(site, "data/cv-public.json"), "utf8"),
  );
  for (const lang of languages) {
    const theme = old.documents[lang].theme;
    output.documents[lang] = {
      profile: {
        fullName: data.profile.name,
        headline: t(data.profile.direction, lang) + " | " + data.profile.focus,
        dob: "",
        nationality: "",
        email: data.profile.email,
        phone: data.profile.phone,
        website: data.profile.github,
        address: t(data.profile.location, lang),
        summary: t(data.profile.summary, lang),
        photo: data.profile.photo.src
          ? "./" + data.profile.photo.src
          : "./assets/avatar-placeholder.svg",
      },
      theme,
      visibility: {
        photo: Boolean(data.profile.photo.src),
        personal: true,
        skills: !data.settings.hiddenSections.includes("skills"),
        languages: true,
        awards: !data.settings.hiddenSections.includes("awards"),
        summary: !data.settings.hiddenSections.includes("about"),
        education: true,
        experience: !data.settings.hiddenSections.includes("experience"),
        projects: !data.settings.hiddenSections.includes("projects"),
        customSections: data.customSections.some(
          (s) => !data.settings.hiddenSections.includes(s.id),
        ),
        certifications: false,
      },
      contactVisibility: {
        dob: false,
        nationality: false,
        email: true,
        phone: true,
        website: true,
        address: true,
      },
      experience: data.experience.map((exp) => ({
        role: t(exp.role, lang),
        company: t(exp.organization, lang),
        period: exp.period,
        location: "",
        details: t(exp.points, lang).join("\n"),
      })),
      education: [
        {
          school: t(data.education.school, lang),
          degree: t(data.education.degree, lang),
          period: data.education.period,
          details:
            t(data.education.classification, lang) +
            " - GPA " +
            data.education.gpa,
        },
      ],
      projects: data.projects.map((project) => ({
        name: project.name + " - " + t(project.title, lang),
        role: t(project.context, lang),
        period: t(project.period, lang),
        details: [...t(project.points, lang), t(project.result, lang)].join(
          "\n",
        ),
      })),
      skills: data.skills.map((skill) => ({
        name: skill.name,
        level: "",
        details: skill.items.join("\n"),
      })),
      languages: [{ name: labels[lang].english, level: t(data.english, lang) }],
      awards: data.awards.map((award) => {
        const match = /^(\d{2})\/(\d{4})$/.exec(award.date);
        return {
          month: match ? match[1] : "",
          year: match ? match[2] : award.date,
          title: t(award.title, lang) + " - " + t(award.detail, lang),
        };
      }),
      customSections: data.customSections
        .filter((s) => !data.settings.hiddenSections.includes(s.id))
        .map((s) => ({
          title: t(s.title, lang),
          details: [t(s.body, lang), ...t(s.points, lang)]
            .filter(Boolean)
            .join("\n"),
        })),
      certifications: [],
    };
  }
  write("data/cv-public.json", JSON.stringify(output, null, 2) + "\n");
}

validate();
// Delete only our marked, obsolete generated pages in these exact directories.
for (const folder of ["projects", "en/projects"]) {
  const directory = path.join(site, folder);
  if (!fs.existsSync(directory)) continue;
  for (const filename of fs.readdirSync(directory)) {
    if (
      !/^[a-z0-9-]+\.html$/.test(filename) ||
      data.projects.some((p) => p.id + ".html" === filename)
    )
      continue;
    const target = path.resolve(directory, filename);
    if (path.dirname(target) !== directory)
      throw new Error("Unsafe generated page path");
    if (
      fs
        .readFileSync(target, "utf8")
        .includes('data-generated-portfolio="true"')
    )
      fs.unlinkSync(target);
  }
}
for (const lang of languages) {
  write(pagePath(lang), documentHtml(lang, null, homePage(lang)));
  for (const project of data.projects)
    write(
      pagePath(lang, project),
      documentHtml(lang, project, projectPage(lang, project)),
    );
}
const urls = languages.flatMap((lang) =>
  [null, ...data.projects].map(
    (project) =>
      new URL(pagePath(lang, project).replace(/index\.html$/, ""), data.siteUrl)
        .href,
  ),
);
write(
  "sitemap.xml",
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.map((url) => `<url><loc>${esc(url)}</loc><lastmod>${data.updated}</lastmod></url>`).join("")}</urlset>\n`,
);
write(
  "robots.txt",
  "User-agent: *\nAllow: /\nSitemap: " +
    new URL("sitemap.xml", data.siteUrl).href +
    "\n",
);
write(
  "404.html",
  documentHtml(
    "vi",
    null,
    `${header("vi")}<main id="main" class="container not-found"><p class="section-eyebrow">404 / KHÔNG TÌM THẤY</p><h1>Trang này chưa có.</h1><p>Bạn có thể quay về hồ sơ cá nhân hoặc xem các dự án.</p><a class="button button-primary" href="${data.siteUrl}">Về trang chủ ↗</a></main>${footer("vi")}`,
  ).replace("<head>", '<head>\n  <base href="' + esc(data.siteUrl) + '" />'),
);
buildCvData();
console.log(
  `Built portfolio: 2 homepages, ${data.projects.length * 2} project pages, sitemap and bilingual CV data.`,
);
