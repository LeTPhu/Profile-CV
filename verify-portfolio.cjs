const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

module.exports = async (browser, baseURL) => {
  const results = [];
  const page = await browser.newPage({ locale: "vi-VN", viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const url = baseURL + "/github-public-cv/";
  const content = JSON.parse(fs.readFileSync(path.join(__dirname, "github-public-cv/data/portfolio.json"), "utf8"));
  await page.goto(url);
  assert.equal(await page.locator("h1").textContent(), "Lê Tấn Phú.");
  assert.equal(await page.locator(".project-grid .project-card").count(), 7);
  assert.equal(await page.locator(".award-item").count(), 6);
  assert.equal(await page.locator(".certificate-card").count(), 5);
  assert.deepEqual(content.awards.slice(-2).map(award => award.date), ["04/2023", "03/2023"]);
  assert.equal(await page.locator(".timeline-entry").count(), 2);
  assert.equal(await page.locator(".hero-portrait img").count(), 0);
  assert.match(await page.locator(".hero-summary").textContent(), /Nguyễn Tất Thành/);
  results.push("Real CV data and intentional photo placeholders");

  const invalidLabels = await page.locator("[aria-labelledby]").evaluateAll(nodes => nodes.flatMap(node => node.getAttribute("aria-labelledby").split(/\s+/).filter(id => !document.getElementById(id))));
  assert.deepEqual(invalidLabels, []);
  const pages = [url, url + "en/", ...content.projects.flatMap(project => [url + "projects/" + project.id + ".html", url + "en/projects/" + project.id + ".html"])];
  const resources = new Set();
  for (const target of pages) {
    const response = await page.goto(target);
    assert.equal(response.status(), 200, target);
    assert.equal(await page.locator("h1").count(), 1, target);
    const links = await page.locator("a[href], link[rel=stylesheet], script[src], img[src]").evaluateAll(elements => elements.map(element => element.href || element.src).filter(Boolean));
    links.filter(link => link.startsWith(baseURL) && !link.includes("#")).forEach(link => resources.add(link));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, target);
  }
  for (const resource of resources) assert.equal((await page.request.get(resource)).status(), 200, resource);
  const pdf = await page.request.get(url + content.profile.pdf);
  const digest = buffer => crypto.createHash("sha256").update(buffer).digest("hex");
  assert.equal(digest(await pdf.body()), digest(fs.readFileSync(path.join(__dirname, "github-public-cv", content.profile.pdf))));
  results.push("Both languages, all 14 project pages and local links/PDF");

  await page.goto(url);
  await page.getByRole("button", { name: "Nghiên cứu", exact: true }).click();
  assert.equal(await page.locator(".project-grid .project-card:visible").count(), 2);
  await page.getByRole("button", { name: "AI ứng dụng", exact: true }).click();
  assert.equal(await page.locator(".project-grid .project-card:visible").count(), 2);
  await page.getByRole("button", { name: "Hệ thống & web", exact: true }).click();
  assert.equal(await page.locator(".project-grid .project-card:visible").count(), 3);
  await page.locator(".project-filters").getByRole("button", { name: "Tất cả", exact: true }).click();
  assert.equal(await page.locator(".project-grid .project-card:visible").count(), 7);
  results.push("Project filters and counts");

  const certificateFilters = page.locator(".certificate-filters");
  await certificateFilters.getByRole("button", { name: "Giấy khen", exact: true }).click();
  assert.equal(await page.locator(".certificate-card:visible").count(), 2);
  await certificateFilters.getByRole("button", { name: "Chứng nhận tham gia", exact: true }).click();
  assert.equal(await page.locator(".certificate-card:visible").count(), 3);
  await certificateFilters.getByRole("button", { name: "Tất cả", exact: true }).click();
  for (const certificate of content.certificates) {
    const image = page.locator(`#certificate-${certificate.id} img`);
    await image.scrollIntoViewIfNeeded();
    await image.evaluate(element => element.decode());
    assert.deepEqual(await image.evaluate(element => [element.naturalWidth, element.naturalHeight]), [certificate.width, certificate.height]);
    assert.equal(await image.evaluate(element => element.getBoundingClientRect().height <= element.parentElement.clientHeight), true, "Uncropped certificate frame");
  }
  const firstCertificate = page.locator('[data-certificate="ai-first-prize"]');
  const waitForImage = () => page.waitForFunction(() => {
    const image = document.querySelector("#viewer-image");
    return !image.hidden && image.complete && image.naturalWidth > 0;
  });
  await firstCertificate.click();
  await waitForImage();
  assert.equal(await page.locator("#certificate-viewer").evaluate(element => element.open), true);
  assert.equal(await page.locator("#viewer-count").textContent(), "1 / 5");
  assert.equal(await page.locator(".viewer-close").evaluate(element => element === document.activeElement), true);
  await page.keyboard.press("Shift+Tab");
  assert.equal(await page.locator("#viewer-download").evaluate(element => element === document.activeElement), true);
  await page.keyboard.press("Tab");
  assert.equal(await page.locator(".viewer-close").evaluate(element => element === document.activeElement), true);
  assert.equal(await page.locator("#viewer-image").evaluate(element => element.getBoundingClientRect().height <= element.parentElement.clientHeight), true);
  await page.getByRole("button", { name: "Phóng to / thu nhỏ", exact: true }).click();
  assert.equal(await page.locator(".viewer-stage").evaluate(element => element.scrollWidth > element.clientWidth), true);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await page.getByRole("button", { name: "Phóng to / thu nhỏ", exact: true }).click();
  await page.keyboard.press("ArrowLeft");
  await waitForImage();
  assert.equal(await page.locator("#viewer-count").textContent(), "5 / 5");
  await page.keyboard.press("ArrowRight");
  await waitForImage();
  assert.equal(await page.locator("#viewer-count").textContent(), "1 / 5");
  const downloadPromise = page.waitForEvent("download");
  await page.locator("#viewer-download").click();
  assert.equal((await downloadPromise).suggestedFilename(), "ai-first-prize.jpg");
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => !document.body.classList.contains("viewer-open"));
  assert.equal(await firstCertificate.evaluate(element => element === document.activeElement), true);

  await certificateFilters.getByRole("button", { name: "Giấy khen", exact: true }).click();
  await page.locator('[data-certificate="software-first-prize"]').click();
  await waitForImage();
  assert.equal(await page.locator("#viewer-count").textContent(), "2 / 2");
  await page.getByRole("button", { name: "Ảnh tiếp theo", exact: true }).click();
  await waitForImage();
  assert.equal(await page.locator("#viewer-count").textContent(), "1 / 2");
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => !document.body.classList.contains("viewer-open"));
  await certificateFilters.getByRole("button", { name: "Chứng nhận tham gia", exact: true }).click();
  await page.locator('[data-evidence-id="software-first-prize"]').click();
  await waitForImage();
  assert.equal(await page.locator("#viewer-title").textContent(), "Giải Nhất Kỹ thuật phần mềm");
  assert.equal(await page.locator("#viewer-count").textContent(), "2 / 5");
  await page.keyboard.press("Escape");
  await page.waitForFunction(() => !document.body.classList.contains("viewer-open"));
  await certificateFilters.getByRole("button", { name: "Tất cả", exact: true }).click();
  results.push("Five original certificates: dimensions, filters, modal focus, zoom, wrap navigation, downloads and CV evidence links");

  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, "Homepage overflow at " + width);
    await firstCertificate.click();
    await waitForImage();
    assert.equal(await page.locator("#certificate-viewer").evaluate(element => element.scrollWidth <= element.clientWidth), true, "Viewer overflow at " + width);
    assert.equal(await page.locator("#viewer-image").evaluate(element => element.getBoundingClientRect().height <= element.parentElement.clientHeight), true, "Viewer image fits at " + width);
    await page.keyboard.press("Escape");
    await page.waitForFunction(() => !document.body.classList.contains("viewer-open"));
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Mở menu", exact: true }).click();
  assert.equal(await page.locator(".menu-toggle").getAttribute("aria-expanded"), "true");
  await page.keyboard.press("Escape");
  assert.equal(await page.locator(".menu-toggle").getAttribute("aria-expanded"), "false");
  assert.equal(await page.locator(".menu-toggle").evaluate(element => element === document.activeElement), true);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.screenshot({ path: "output/playwright/portfolio-mobile.png" });
  await page.goto(url + "projects/aiocrm.html");
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await page.screenshot({ path: "output/playwright/project-mobile.png" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.screenshot({ path: "output/playwright/project-desktop.png" });
  results.push("320-1440px layouts and keyboard-accessible mobile menu");

  await page.goto(url + "?lang=en");
  await page.waitForURL("**/github-public-cv/en/index.html?lang=en");
  assert.equal(await page.locator("html").getAttribute("lang"), "en");
  await page.getByRole("link", { name: "Đọc bằng tiếng Việt", exact: true }).click();
  assert.equal(await page.locator("html").getAttribute("lang"), "vi");
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => { throw new Error("Blocked"); } } }));
  await page.getByRole("button", { name: "Sao chép email", exact: true }).click();
  assert.equal(await page.locator("#copy-email-value").inputValue(), content.profile.email);
  assert.equal(await page.locator("#copy-email-value").isVisible(), true);
  results.push("Language links and clipboard fallback");

  await page.goto(url + "en/#certificates");
  await page.locator('[data-certificate="ai-first-prize"]').click();
  await waitForImage();
  assert.match(await page.locator("#viewer-title").textContent(), /First Prize/);
  await page.getByRole("button", { name: "Close image", exact: true }).click();
  await page.waitForFunction(() => !document.body.classList.contains("viewer-open"));

  const failureContext = await browser.newContext({ locale: "vi-VN" });
  const failurePage = await failureContext.newPage();
  await failurePage.route("**/assets/certificates/ai-first-prize.jpg", route => route.abort());
  await failurePage.goto(url);
  await failurePage.locator('[data-certificate="ai-first-prize"]').click();
  await failurePage.waitForFunction(() => document.querySelector("#viewer-status").textContent.includes("Chưa tải được"));
  assert.equal(await failurePage.locator("[data-viewer-zoom]").isDisabled(), true);
  assert.equal(await failurePage.locator("#viewer-original").getAttribute("href"), url + "assets/certificates/ai-first-prize.jpg");
  await failurePage.getByRole("button", { name: "Ảnh tiếp theo", exact: true }).click();
  await failurePage.waitForFunction(() => !document.querySelector("#viewer-image").hidden);
  await failureContext.close();
  results.push("English certificate viewer and recovery from failed image requests");

  const imageContext = await browser.newContext({ locale: "vi-VN" });
  const imagePage = await imageContext.newPage();
  const html = fs.readFileSync(path.join(__dirname, "github-public-cv/index.html"), "utf8")
    .replace('<div class="media media--portrait" data-media>', '<div class="media media--portrait has-image" data-media><img src="data:image/png;base64,broken" alt="Test portrait" />')
    .replace('<div class="media-placeholder">', '<div class="media-placeholder" hidden>');
  await imagePage.route(url + "?image-test", route => route.fulfill({ contentType: "text/html; charset=utf-8", body: html }));
  await imagePage.goto(url + "?image-test");
  await imagePage.waitForFunction(() => !document.querySelector(".hero-portrait img"));
  assert.equal(await imagePage.locator(".hero-portrait .media-placeholder").isVisible(), true);
  await imageContext.close();
  results.push("Broken portrait gracefully returns to its placeholder");

  await page.emulateMedia({ reducedMotion: "reduce" });
  assert.equal(await page.locator(".hero-content").evaluate(element => getComputedStyle(element).animationName), "none");
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const noJs = await context.newPage();
  await noJs.route("https://fonts.googleapis.com/**", route => route.abort());
  await noJs.route("https://fonts.gstatic.com/**", route => route.abort());
  await noJs.goto(url);
  assert.equal(await noJs.locator(".project-card").count(), 7);
  assert.equal(await noJs.locator(".certificate-card").count(), 5);
  assert.equal(await noJs.locator(".certificate-filters").isVisible(), false);
  assert.equal(await noJs.locator('[data-certificate="ai-first-prize"]').getAttribute("href"), "assets/certificates/ai-first-prize.jpg");
  assert.equal(await noJs.locator("#main-nav").getByRole("link", { name: "Giới thiệu", exact: true }).isVisible(), true);
  assert.equal(await noJs.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await noJs.goto(url + "en/projects/qa-tiger.html");
  assert.match(await noJs.locator(".result-box").textContent(), /13\.80/);
  await context.close();
  assert.deepEqual(errors, []);
  await page.close();
  results.push("Readable without JavaScript/fonts; reduced motion; no uncaught errors");
  return results;
};
