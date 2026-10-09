const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
module.exports = () => {
  const parent = path.join(__dirname, "output/playwright");
  fs.mkdirSync(parent, { recursive: true });
  const fixture = fs.mkdtempSync(path.join(parent, "generation-"));
  const site = path.join(fixture, "github-public-cv");
  fs.cpSync(path.join(__dirname, "github-public-cv"), site, {
    recursive: true,
  });
  fs.mkdirSync(path.join(fixture, "scripts"));
  fs.copyFileSync(
    path.join(__dirname, "scripts/build-portfolio.cjs"),
    path.join(fixture, "scripts/build-portfolio.cjs"),
  );
  const data = JSON.parse(
    fs.readFileSync(path.join(site, "data/portfolio.json"), "utf8"),
  );
  const removed = data.projects.pop();
  data.settings = {
    sectionOrder: [
      "awards",
      "about",
      "projects",
      "experience",
      "skills",
      "contact",
      "writing",
    ],
    hiddenSections: ["experience"],
    autoLanguage: false,
    scholarship: "4 / 4",
  };
  data.customSections = [
    {
      id: "writing",
      title: { vi: "Góc chia sẻ", en: "Writing" },
      body: { vi: "Nội dung mới có dấu.", en: "New content." },
      points: { vi: ["Ý một"], en: ["First point"] },
      image: { src: "", alt: { vi: "", en: "" } },
    },
  ];
  fs.writeFileSync(
    path.join(site, "data/portfolio.json"),
    JSON.stringify(data),
  );
  fs.writeFileSync(
    path.join(site, "projects/manual.html"),
    "<!doctype html><title>Manual page</title>",
  );
  execFileSync(
    process.execPath,
    [path.join(fixture, "scripts/build-portfolio.cjs")],
    { cwd: fixture },
  );
  const vi = fs.readFileSync(path.join(site, "index.html"), "utf8"),
    en = fs.readFileSync(path.join(site, "en/index.html"), "utf8"),
    cv = JSON.parse(
      fs.readFileSync(path.join(site, "data/cv-public.json"), "utf8"),
    );
  assert.ok(
    vi.indexOf('<section id="awards"') < vi.indexOf('<section id="about"'),
  );
  assert.equal(vi.includes('<section id="experience"'), false);
  assert.ok(vi.includes("Góc chia sẻ"));
  assert.ok(en.includes("Writing"));
  assert.ok(vi.includes('name="portfolio-auto-language" content="off"'));
  assert.equal(cv.autoLanguage, false);
  assert.equal(
    cv.documents.vi.customSections[0].details,
    "Nội dung mới có dấu.\nÝ một",
  );
  assert.equal(
    cv.documents.en.customSections[0].details,
    "New content.\nFirst point",
  );
  assert.equal(cv.documents.vi.visibility.experience, false);
  assert.equal(
    fs.existsSync(path.join(site, "projects/" + removed.id + ".html")),
    false,
  );
  assert.equal(
    fs.existsSync(path.join(site, "en/projects/" + removed.id + ".html")),
    false,
  );
  assert.equal(fs.existsSync(path.join(site, "projects/manual.html")), true);
  data.projects = [];
  data.awards = [];
  data.certificates = [];
  fs.writeFileSync(
    path.join(site, "data/portfolio.json"),
    JSON.stringify(data),
  );
  execFileSync(
    process.execPath,
    [path.join(fixture, "scripts/build-portfolio.cjs")],
    { cwd: fixture },
  );
  assert.equal(
    (
      fs.readFileSync(path.join(site, "sitemap.xml"), "utf8").match(/<url>/g) ||
      []
    ).length,
    2,
  );
  assert.equal(fs.existsSync(path.join(site, "projects/manual.html")), true);
  return "Regenerated bilingual content/A4, custom sections, settings, safe obsolete-page cleanup and empty collections";
};
