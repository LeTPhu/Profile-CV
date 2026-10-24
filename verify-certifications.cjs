const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");
const Model = require("./github-public-cv/portfolio-model.js");
const Renderer = require("./github-public-cv/portfolio-renderer.js");

module.exports = async (browser, baseURL) => {
  const site = path.join(__dirname, "github-public-cv");
  const data = JSON.parse(fs.readFileSync(path.join(site, "data/portfolio.json"), "utf8"));
  const cvData = JSON.parse(fs.readFileSync(path.join(site, "data/cv-public.json"), "utf8"));
  const url = baseURL + "/github-public-cv/";
  const output = path.join(__dirname, "output/playwright");
  const provenance = JSON.parse(fs.readFileSync(path.join(site, "assets/certifications/sources.json"), "utf8"));
  for (const file of provenance.files)
    assert.equal(crypto.createHash("sha256").update(fs.readFileSync(path.join(site, "assets/certifications", file.pdf))).digest("hex"), file.sha256, "Original PDF matches recorded attachment hash");
  fs.mkdirSync(output, { recursive: true });
  assert.deepEqual(Model.validate(data), []);
  assert.equal(data.certifications.length, 2);
  assert.deepEqual(data.certifications.map(c => c.id), ["gemini-certified-educator", "gemini-certified-student-university"]);
  assert.equal(data.certificates.length, 5, "Existing competition evidence stays separate");
  assert.equal(data.awards.length, 6);
  assert.equal(data.projects.length, 7);
  const legacy = structuredClone(data);
  delete legacy.certifications;
  assert.deepEqual(Model.normalize(legacy).certifications, [], "Old backups remain supported");
  for (const lang of ["vi", "en"]) {
    assert.equal(Renderer(legacy).homePage(lang).includes('id="certifications"'), false);
    const hidden = structuredClone(data);
    hidden.settings.hiddenSections = ["certifications"];
    assert.equal(Renderer(hidden).homePage(lang).includes('id="certifications"'), false);
    assert.equal(Renderer(hidden).homePage(lang).includes('href="#certifications"'), false);
    const reordered = structuredClone(data);
    reordered.settings.sectionOrder = ["certifications", ...data.settings.sectionOrder.filter(id => id !== "certifications")];
    const html = Renderer(reordered).homePage(lang);
    assert.ok(html.indexOf('<section id="certifications"') < html.indexOf('<section id="about"'));
  }
  for (const [field, value] of [["expires", "2025-02-30"], ["expires", "2025-12-21"], ["original", "assets/../secret.pdf"], ["original", "https://example.com/file.pdf"]]) {
    const invalid = structuredClone(data);
    invalid.certifications[0][field] = value;
    assert.notEqual(Model.validate(invalid).length, 0, "Reject unsafe or invalid certification " + field);
  }
  const invalid = structuredClone(data);
  invalid.certifications[1].id = invalid.certifications[0].id;
  assert.notEqual(Model.validate(invalid).length, 0, "Duplicate certification IDs are rejected");

  const page = await browser.newPage({ locale: "vi-VN", viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const waitImage = () => page.waitForFunction(() => {
    const img = document.querySelector("#viewer-image");
    return !img.hidden && img.complete && img.naturalWidth > 0;
  });
  for (const lang of ["vi", "en"]) {
    await page.goto(url + (lang === "en" ? "en/" : "") + "?lang=" + lang + "#certifications");
    assert.equal(await page.locator("#certifications .certification-card").count(), 2);
    assert.equal(await page.locator("#awards .certification-card").count(), 0);
    assert.equal(await page.locator('#main-nav a[href="#certifications"]').textContent(), lang === "vi" ? "Chứng chỉ" : "Certifications");
    for (const c of data.certifications) {
      assert.equal(c.recipient, "Lê Tấn Phú");
      assert.equal(c.issued, "2025-12-22");
      assert.equal(c.expires, "2028-12-22");
      const card = page.locator("#certification-" + c.id);
      assert.equal(await card.locator("h3").textContent(), c.title[lang]);
      assert.equal(await card.locator(".certification-issuer").textContent(), "Google for Education");
      assert.match(await card.locator(".certification-recipient").textContent(), /Lê Tấn Phú/);
      assert.equal(await card.locator('time[datetime="2025-12-22"]').textContent(), lang === "vi" ? "22/12/2025" : "Dec 22, 2025");
      assert.equal(await card.locator('time[datetime="2028-12-22"]').textContent(), lang === "vi" ? "22/12/2028" : "Dec 22, 2028");
      const image = card.locator("img");
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(img => img.decode());
      assert.deepEqual(await image.evaluate(img => [img.naturalWidth, img.naturalHeight]), [2200, 1700]);
      assert.equal(await image.evaluate(img => getComputedStyle(img).objectFit), "contain");
      const response = await page.request.get(url + c.original);
      assert.equal(response.status(), 200);
      const digest = value => crypto.createHash("sha256").update(value).digest("hex");
      assert.equal(digest(await response.body()), digest(fs.readFileSync(path.join(site, c.original))), "Served original PDF bytes match the source file");
    }
    for (const width of [320, 390, 768, 1101, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, lang + " at " + width);
      const columns = await page.locator(".certifications-grid").evaluate(el => getComputedStyle(el).gridTemplateColumns.split(" ").length);
      assert.equal(columns, width <= 760 ? 1 : 2);
      await page.locator('[data-certification="gemini-certified-educator"]').click();
      await waitImage();
      assert.equal(await page.locator("#viewer-count").textContent(), "1 / 2");
      assert.match(await page.locator("#viewer-expires").textContent(), /2028/);
      assert.equal(await page.locator("#viewer-pdf").isVisible(), true);
      assert.equal(await page.locator("#viewer-image").evaluate(img => getComputedStyle(img).objectFit), "contain");
      assert.equal(await page.locator("#viewer-image").evaluate(img => img.getBoundingClientRect().height <= img.parentElement.clientHeight), true);
      await page.keyboard.press("Shift+Tab");
      assert.equal(await page.locator("#viewer-download").evaluate(el => el === document.activeElement), true);
      await page.keyboard.press("Tab");
      assert.equal(await page.locator(".viewer-close").evaluate(el => el === document.activeElement), true);
      await page.locator("[data-viewer-next]").click();
      await waitImage();
      assert.match(await page.locator("#viewer-title").textContent(), /Student/);
      assert.equal(await page.locator("#viewer-count").textContent(), "2 / 2");
      await page.locator("[data-viewer-next]").click();
      await waitImage();
      assert.match(await page.locator("#viewer-title").textContent(), /Educator/);
      await page.locator("[data-viewer-zoom]").click();
      assert.equal(await page.locator(".viewer-stage").evaluate(el => el.scrollWidth > el.clientWidth), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.keyboard.press("Escape");
      assert.equal(await page.locator('[data-certification="gemini-certified-educator"]').evaluate(el => el === document.activeElement), true);
    }
    await page.locator('[data-certification="gemini-certified-educator"]').click();
    await waitImage();
    const download = page.waitForEvent("download");
    await page.locator("#viewer-pdf").click();
    assert.equal((await download).suggestedFilename(), "gemini-certified-educator.pdf");
    await page.keyboard.press("Escape");
    await page.locator('[data-certificate="ai-first-prize"]').click();
    await waitImage();
    assert.equal(await page.locator("#viewer-count").textContent(), "1 / 5");
    assert.equal(await page.locator("#viewer-expires").isVisible(), false);
    assert.equal(await page.locator("#viewer-pdf").isVisible(), false);
    await page.keyboard.press("Escape");
    await page.locator("#certifications").screenshot({ path: path.join(output, "certifications-" + lang + "-desktop.png") });

    await page.goto(url + "cv.html?lang=" + lang);
    await page.locator("#print-cv:enabled").waitFor();
    assert.equal(cvData.documents[lang].visibility.certifications, true);
    assert.equal(await page.locator("#preview-certifications .cv-certification").count(), 2);
    const text = await page.locator("#block-certifications").textContent();
    for (const c of data.certifications) {
      assert.ok(text.includes(c.title[lang]));
      assert.ok(text.includes(c.issuer[lang]));
    }
    assert.match(text, /2025/);
    assert.match(text, /2028/);
    assert.equal(await page.locator("#preview-certifications a[href$='.pdf']").count(), 2);
    assert.equal(await page.locator("#preview-projects .entry").count(), 7);
    assert.equal(await page.locator("#preview-awards-sidebar .award-row").count(), 6);
    await page.evaluate(() => document.fonts.ready);
    await page.pdf({ path: path.join(output, "certifications-cv-" + lang + ".pdf"), format: "A4", printBackground: true, preferCSSPageSize: true });
    await page.setViewportSize({ width: 390, height: 844 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, "A4 mobile " + lang);
  }
  await page.goto(url + "?lang=vi#certifications");
  for (const img of await page.locator(".certification-image img").all()) {
    await img.scrollIntoViewIfNeeded();
    await img.evaluate(el => el.decode());
  }
  await page.locator("#certifications").screenshot({ path: path.join(output, "certifications-vi-mobile.png") });
  await page.route("**/assets/certifications/*.png", route => route.abort());
  await page.reload();
  await page.locator(".certification-card .certificate-image-error").first().waitFor({ state: "visible" });
  await page.locator('[data-certification="gemini-certified-educator"]').click();
  await page.locator("#viewer-status").filter({ hasText: "Chưa tải được ảnh" }).waitFor();
  assert.equal(await page.locator("#viewer-pdf").isVisible(), true, "Original PDF remains available when the image fails");
  await page.unroute("**/assets/certifications/*.png");
  await page.locator("[data-viewer-next]").click();
  await waitImage();
  await page.keyboard.press("Escape");
  assert.deepEqual(errors, []);
  await page.close();
  const context = await browser.newContext({ javaScriptEnabled: false });
  const plain = await context.newPage();
  await plain.goto(url + "?lang=vi#certifications");
  assert.equal(await plain.locator(".certification-card").count(), 2);
  assert.match(await plain.locator(".certification-pdf").first().getAttribute("href"), /\.pdf$/);
  await context.close();
  return "Separate bilingual collection, dates/validation, unmodified PDFs, 320-1440px layouts, scoped accessible lightbox/zoom/downloads, failed-image recovery, no-JS links and both A4 exports";
};
