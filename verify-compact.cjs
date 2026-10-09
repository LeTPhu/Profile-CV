const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Model = require("./github-public-cv/portfolio-model.js");
const Renderer = require("./github-public-cv/portfolio-renderer.js");

module.exports = async (browser, baseURL) => {
  const source = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "github-public-cv/data/portfolio.json"),
      "utf8",
    ),
  );
  const context = await browser.newContext({
    locale: "vi-VN",
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const url = baseURL + "/github-public-cv/";
  for (const lang of ["vi", "en"]) {
    await page.goto(url + (lang === "en" ? "en/" : "") + "?lang=" + lang);
    await page.evaluate(() => document.fonts.ready);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      const typography = await page.evaluate(() => {
        const size = (selector) =>
          parseFloat(
            getComputedStyle(document.querySelector(selector)).fontSize,
          );
        return {
          summary: size(".hero-summary"),
          about: size(".about-copy p"),
          card: size(".project-summary"),
          skill: size(".skill-card p"),
          award: size(".award-item p"),
          certificate: size(".certificate-body > p"),
          label: size(".project-meta"),
          tags: size(".tags li"),
          link: size(".project-body .text-link"),
          heading: size(".section-heading h2"),
          family: getComputedStyle(document.body).fontFamily,
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      assert.equal(
        typography.overflow,
        false,
        `${lang} typography overflow at ${width}`,
      );
      assert.match(typography.family, /Be Vietnam Pro/);
      for (const field of ["summary", "about"])
        assert.ok(
          typography[field] >= (width <= 640 ? 16 : 17),
          `${field}: larger reading size at ${width}`,
        );
      for (const field of ["card", "skill", "award", "certificate"])
        assert.ok(
          typography[field] >= (width <= 640 ? 15 : 16),
          `${field}: legible card text at ${width}`,
        );
      assert.ok(
        typography.label >= 12 &&
          typography.tags >= 12 &&
          typography.link >= 14 &&
          typography.heading >= 30,
        "Readable labels, links and headings",
      );
    }
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.locator(".menu-toggle").click();
    assert.equal(
      await page.locator(".menu-toggle").getAttribute("aria-expanded"),
      "true",
    );
    await page.setViewportSize({ width: 1200, height: 900 });
    await page.waitForFunction(
      () => !document.body.classList.contains("menu-open"),
    );
    assert.equal(
      await page.locator(".menu-toggle").getAttribute("aria-expanded"),
      "false",
    );
  }
  for (const name of [
    "Lê Tấn Phú - Kỹ sư Trí tuệ nhân tạo",
    "Profile".repeat(15),
  ]) {
    const data = Model.normalize(source);
    data.profile.name = name;
    const renderer = Renderer(data);
    for (const lang of ["vi", "en"]) {
      const target =
        url + (lang === "en" ? "en/" : "") + "?layout-probe&lang=" + lang;
      await page.route(target, (route) =>
        route.fulfill({
          contentType: "text/html; charset=utf-8",
          body: renderer.documentHtml(lang, null, renderer.homePage(lang)),
        }),
      );
      await page.goto(target);
      await page.evaluate(() => document.fonts.ready);
      for (const width of [320, 390, 768, 1024, 1440]) {
        await page.setViewportSize({ width, height: 900 });
        const measurements = await page.evaluate(() => ({
          viewport: innerWidth,
          page: document.documentElement.scrollWidth,
          heading: document.querySelector("h1").scrollWidth,
          box: document.querySelector("h1").clientWidth,
          sectionPadding: parseFloat(
            getComputedStyle(document.querySelector(".section")).paddingTop,
          ),
        }));
        assert.ok(
          measurements.page <= measurements.viewport,
          `${lang}, width ${width}, ${name}: ${JSON.stringify(measurements)}`,
        );
        assert.ok(
          measurements.heading <= measurements.box + 1,
          "Heading wraps without clipping",
        );
        assert.ok(measurements.sectionPadding <= 62, "Compact section spacing");
      }
      await page.unroute(target);
    }
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(url + "?lang=vi");
  await page.getByRole("button", { name: "Nghiên cứu", exact: true }).click();
  const grid = await page.locator(".project-grid").boundingBox();
  const cards = await page.locator(".project-grid .project-card:visible").all();
  assert.equal(cards.length, 2);
  for (const card of cards)
    assert.ok(
      (await card.boundingBox()).width >= grid.width / 2 - 20,
      "Filtered cards fill available columns",
    );
  for (const card of cards) {
    const illustration = card.locator(".media:not(.has-image)");
    if (await illustration.count())
      assert.ok(
        (await illustration.boundingBox()).height <= 180,
        "Empty filtered covers stay compact",
      );
  }
  assert.match(
    await page.locator(".project-grid").getAttribute("class"),
    /is-filtered/,
  );
  await page
    .locator(".project-filters")
    .getByRole("button", { name: "Tất cả", exact: true })
    .click();
  assert.equal(
    (await page.locator(".project-grid").getAttribute("class")).includes(
      "is-filtered",
    ),
    false,
  );
  for (const project of source.projects) {
    await page.goto(url + "projects/" + project.id + ".html?lang=vi");
    if (!project.gallery.some((image) => image.src))
      assert.equal(
        await page.locator(".project-gallery").count(),
        0,
        "No empty public gallery: " + project.id,
      );
    if (!project.image.src)
      assert.ok(
        (await page.locator(".media--cover").boundingBox()).height <= 175,
        "Compact placeholder cover",
      );
  }
  const fixture = Model.normalize(source);
  fixture.projects = [fixture.projects[0]];
  const photo = source.certificates[0];
  fixture.projects[0].gallery = [
    {
      src: photo.src,
      alt: { vi: "Ảnh kiểm thử đầy đủ", en: "Complete test image" },
      caption: { vi: "", en: "English caption" },
      position: "50% 50%",
    },
    { src: "", alt: { vi: "Chỗ thêm ảnh", en: "Image slot" } },
  ];
  const renderer = Renderer(fixture);
  const project = fixture.projects[0];
  const target = url + "projects/" + project.id + ".html?gallery-probe&lang=vi";
  await page.route(target, (route) =>
    route.fulfill({
      contentType: "text/html; charset=utf-8",
      body: renderer.documentHtml(
        "vi",
        project,
        renderer.projectPage("vi", project),
      ),
    }),
  );
  await page.goto(target);
  assert.equal(await page.locator(".project-gallery figure").count(), 1);
  assert.equal(await page.locator(".related-section").count(), 0);
  assert.equal(
    await page.locator(".project-gallery figcaption").textContent(),
    "Ảnh kiểm thử đầy đủ",
  );
  const image = page.locator(".media--gallery img");
  await image.scrollIntoViewIfNeeded();
  await image.evaluate((element) => element.decode());
  assert.equal(
    await image.evaluate((element) => getComputedStyle(element).objectFit),
    "contain",
  );
  await context.close();
  return "Larger bilingual reading sizes and responsive menu, long names at five widths, compact sections/covers, full-width filtered cards, no empty galleries/related section and uncropped real gallery images";
};
