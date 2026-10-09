const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

module.exports = async (browser, baseURL) => {
  const results = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  const url = baseURL + "/github-public-cv/";
  const content = JSON.parse(fs.readFileSync(path.join(__dirname, "github-public-cv/data/portfolio.json"), "utf8"));
  await page.goto(url);
  assert.equal(await page.locator("h1").textContent(), "Lê Tấn Phú.");
  assert.equal(await page.locator(".project-grid .project-card").count(), 7);
  assert.equal(await page.locator(".award-item").count(), 6);
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
  await page.getByRole("button", { name: "Tất cả", exact: true }).click();
  assert.equal(await page.locator(".project-grid .project-card:visible").count(), 7);
  results.push("Project filters and counts");

  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, "Homepage overflow at " + width);
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
  await page.waitForURL("**/github-public-cv/en/");
  assert.equal(await page.locator("html").getAttribute("lang"), "en");
  await page.getByRole("link", { name: "Đọc bằng tiếng Việt", exact: true }).click();
  assert.equal(await page.locator("html").getAttribute("lang"), "vi");
  await page.evaluate(() => Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async () => { throw new Error("Blocked"); } } }));
  await page.getByRole("button", { name: "Sao chép email", exact: true }).click();
  assert.equal(await page.locator("#copy-email-value").inputValue(), content.profile.email);
  assert.equal(await page.locator("#copy-email-value").isVisible(), true);
  results.push("Language links and clipboard fallback");

  const imageContext = await browser.newContext();
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
  assert.equal(await noJs.getByRole("link", { name: "Giới thiệu", exact: true }).isVisible(), true);
  assert.equal(await noJs.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  await noJs.goto(url + "en/projects/qa-tiger.html");
  assert.match(await noJs.locator(".result-box").textContent(), /13\.80/);
  await context.close();
  assert.deepEqual(errors, []);
  await page.close();
  results.push("Readable without JavaScript/fonts; reduced motion; no uncaught errors");
  return results;
};
