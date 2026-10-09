const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
module.exports = async (browser, baseURL) => {
  const url = baseURL + "/github-public-cv/";
  const context = await browser.newContext({ locale: "en-US" }),
    page = await context.newPage();
  await page.goto(url + "?ref=test#certificates");
  await page.waitForURL("**/en/index.html?ref=test#certificates");
  assert.equal(await page.locator("html").getAttribute("lang"), "en");
  await page.locator(".language-link").click();
  await page.waitForURL("**/index.html?ref=test&lang=vi#certificates");
  assert.equal(await page.locator("html").getAttribute("lang"), "vi");
  await page.goto(url);
  assert.equal(await page.locator("html").getAttribute("lang"), "vi");
  await page.goto(url + "en/projects/aiocrm.html");
  assert.equal(await page.locator("html").getAttribute("lang"), "en");
  await context.close();
  const englishCV = await browser.newContext({ locale: "en-US" });
  const cv = await englishCV.newPage();
  await cv.goto(url + "cv.html");
  await cv.locator("#print-cv:enabled").waitFor();
  assert.equal(await cv.locator("html").getAttribute("lang"), "en");
  assert.match(await cv.locator("#print-cv").textContent(), /Print/);
  assert.match(
    await cv.locator("#preview-summary").textContent(),
    /Nguyen Tat Thanh/,
  );
  await cv.locator('[data-lang="vi"]').click();
  await cv.goto(url + "cv.html");
  await cv.locator("#print-cv:enabled").waitFor();
  assert.equal(await cv.locator("html").getAttribute("lang"), "vi");
  await cv.goto(url + "cv.html?lang=en");
  await cv.locator("#print-cv:enabled").waitFor();
  assert.equal(await cv.locator("html").getAttribute("lang"), "en");
  await englishCV.close();
  const vietnameseCV = await browser.newContext({ locale: "vi-VN" });
  const v = await vietnameseCV.newPage();
  await v.goto(url + "cv.html");
  await v.locator("#print-cv:enabled").waitFor();
  assert.equal(await v.locator("html").getAttribute("lang"), "vi");
  await v.evaluate(() => localStorage.setItem("portfolio.language", "en"));
  await v.reload();
  await v.locator("#print-cv:enabled").waitFor();
  assert.equal(await v.locator("html").getAttribute("lang"), "en");
  await vietnameseCV.close();
  const disabled = await browser.newContext({ locale: "en-US" });
  const d = await disabled.newPage();
  const cvData = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "github-public-cv/data/cv-public.json"),
      "utf8",
    ),
  );
  cvData.autoLanguage = false;
  await d.route("**/data/cv-public.json", (route) =>
    route.fulfill({
      contentType: "application/json",
      body: JSON.stringify(cvData),
    }),
  );
  await d.goto(url + "cv.html");
  await d.locator("#print-cv:enabled").waitFor();
  assert.equal(await d.locator("html").getAttribute("lang"), "vi");
  await d.goto(url + "cv.html?lang=en");
  await d.locator("#print-cv:enabled").waitFor();
  assert.equal(await d.locator("html").getAttribute("lang"), "en");
  await disabled.close();
  const blocked = await browser.newContext({ locale: "en-GB" });
  await blocked.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new Error("Storage blocked");
      },
    });
  });
  const b = await blocked.newPage();
  await b.goto(url + "projects/qa-tiger.html?campaign=one#main");
  await b.waitForURL("**/en/projects/qa-tiger.html?campaign=one#main");
  await b.locator(".language-link").click();
  await b.waitForURL("**/projects/qa-tiger.html?campaign=one&lang=vi#main");
  assert.equal(await b.locator("html").getAttribute("lang"), "vi");
  await b.reload();
  assert.equal(await b.locator("html").getAttribute("lang"), "vi");
  await b.goto(url + "cv.html");
  await b.locator("#print-cv:enabled").waitFor();
  assert.equal(await b.locator("html").getAttribute("lang"), "en");
  await b.goto(url + "cv.html?lang=vi");
  await b.locator("#print-cv:enabled").waitFor();
  assert.equal(await b.locator("html").getAttribute("lang"), "vi");
  await b.goto(url + "admin/");
  assert.match(await b.locator(".login-card h2").textContent(), /Sign in/);
  await blocked.close();
  return "Portfolio/A4 automatic VI/EN, persisted/manual choices, opt-out setting, deep links/query/hash and blocked-storage fallback including admin";
};
