const assert = require("node:assert/strict");
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
  await blocked.close();
  return "English browser auto-selection, preserved deep links/query/hash, explicit choice and blocked-storage fallback";
};
