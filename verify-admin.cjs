const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const Model = require("./github-public-cv/portfolio-model.js");
const Renderer = require("./github-public-cv/portfolio-renderer.js");
const source = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "github-public-cv/data/portfolio.json"),
    "utf8",
  ),
);

module.exports = async (browser, baseURL) => {
  const results = [],
    context = await browser.newContext({
      locale: "vi-VN",
      viewport: { width: 1440, height: 1000 },
    }),
    page = await context.newPage(),
    errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const url = baseURL + "/github-public-cv/",
    requests = [];
  let owner = "LeTPhu",
    authorized = true,
    currentHead = "head1",
    patchDropsResponse = false,
    refuseWrites = false,
    jsonCommit,
    blobCommit;
  const tree = fs
    .readdirSync(path.join(__dirname, "github-public-cv/assets/certificates"))
    .filter((x) => /\.jpg$/.test(x))
    .map((x) => ({
      path: "github-public-cv/assets/certificates/" + x,
      type: "blob",
    }));
  tree.push({ path: "github-public-cv/" + source.profile.pdf, type: "blob" });
  await page.route("https://api.github.com/**", async (route) => {
    const request = route.request(),
      p = new URL(request.url()).pathname,
      method = request.method(),
      body = request.postDataJSON();
    requests.push({ p, method, body });
    const answer = async (payload, status = 200) =>
      route.fulfill({
        status,
        contentType: "application/json",
        body: JSON.stringify(payload),
      });
    if (!authorized) return answer({}, 401);
    if (method !== "GET" && refuseWrites) return answer({}, 403);
    if (p === "/user") return answer({ login: owner });
    if (p === "/repos/LeTPhu/Profile-CV")
      return answer({ permissions: { push: true } });
    if (p.endsWith("/git/ref/heads/main"))
      return answer({ object: { sha: currentHead } });
    if (p.includes("/contents/"))
      return answer({
        encoding: "base64",
        content: Buffer.from(JSON.stringify(source)).toString("base64"),
      });
    if (p.includes("/git/commits/") && method === "GET")
      return answer({ tree: { sha: "tree1" } });
    if (p.includes("/git/trees/") && method === "GET")
      return answer({ tree, truncated: false });
    if (p.endsWith("/git/blobs")) {
      blobCommit = body;
      return answer({ sha: "blob1" }, 201);
    }
    if (p.endsWith("/git/trees")) {
      jsonCommit = body;
      return answer({ sha: "tree2" }, 201);
    }
    if (p.endsWith("/git/commits")) return answer({ sha: "head2" }, 201);
    if (p.endsWith("/git/refs/heads/main")) {
      currentHead = body.sha;
      if (patchDropsResponse) return route.abort();
      return answer({ object: { sha: currentHead } });
    }
    return answer({}, 404);
  });
  const login = async () => {
    await page.locator("#token").fill("test-token-not-a-real-credential");
    await page.locator("#login-button").click();
  };
  const goTab = (key) =>
    page
      .locator("#editor-nav")
      .getByRole("button", { name: key, exact: true })
      .click();
  const confirm = async () => {
    await page.locator("#confirm-dialog").waitFor({ state: "visible" });
    await page.locator("#confirm-yes").click();
  };
  await page.goto(url + "admin/");
  await page.screenshot({ path: "output/playwright/admin-login-desktop.png" });
  owner = "another-user";
  await login();
  await page
    .locator("#login-status")
    .filter({ hasText: "Chỉ chủ sở hữu" })
    .waitFor();
  assert.equal(await page.locator("#workspace").isVisible(), false);
  owner = "LeTPhu";
  authorized = false;
  await login();
  await page.locator("#login-status").filter({ hasText: "hết hạn" }).waitFor();
  authorized = true;
  await login();
  await page.locator("#workspace").waitFor({ state: "visible" });
  assert.equal(await page.locator("#token").inputValue(), "");
  assert.match(
    await page.locator('[data-path="profile.summary.vi"]').inputValue(),
    /Nguyễn Tất Thành/,
  );
  const originalEnglish = await page
    .locator('[data-path="profile.summary.en"]')
    .inputValue();
  await page
    .locator('[data-path="profile.summary.vi"]')
    .fill("Nội dung tiếng Việt kiểm thử có dấu.");
  assert.equal(
    await page.locator('[data-path="profile.summary.en"]').inputValue(),
    originalEnglish,
  );
  await page.locator("#undo").click();
  assert.match(
    await page.locator('[data-path="profile.summary.vi"]').inputValue(),
    /Nguyễn Tất Thành/,
  );
  await page.locator("#redo").click();
  assert.equal(
    await page.locator('[data-path="profile.summary.vi"]').inputValue(),
    "Nội dung tiếng Việt kiểm thử có dấu.",
  );
  await page.screenshot({ path: "output/playwright/admin-editor-desktop.png" });
  await page.locator("#save-draft").click();
  await page.locator("#status").filter({ hasText: "Đã lưu nháp" }).waitFor();
  const storage = await page.evaluate(async () => {
    const request = indexedDB.open("portfolio-owner-drafts", 1);
    const db = await new Promise(
      (resolve) => (request.onsuccess = () => resolve(request.result)),
    );
    const q = db.transaction("drafts").objectStore("drafts").get("owner");
    const draft = await new Promise(
      (resolve) => (q.onsuccess = () => resolve(q.result)),
    );
    db.close();
    return JSON.stringify({
      local: { ...localStorage },
      session: { ...sessionStorage },
      draft,
    });
  });
  assert.equal(storage.includes("test-token-not-a-real-credential"), false);
  results.push(
    "Owner-only API authentication, no persisted token, independent languages and undo/redo",
  );

  await goTab("Mục tự thêm");
  await page.locator(".add-button").click();
  await page.locator('[data-path="customSections.0.id"]').fill("writing");
  await page
    .locator('[data-path="customSections.0.title.vi"]')
    .fill("Góc chia sẻ");
  await page.locator('[data-path="customSections.0.title.en"]').fill("Writing");
  await page
    .locator('[data-path="customSections.0.body.vi"]')
    .fill("Dòng một\nDòng hai");
  await page
    .locator('[data-path="customSections.0.body.en"]')
    .fill("First paragraph\nSecond paragraph");
  await goTab("Bố cục & ngôn ngữ");
  await page
    .locator(".section-setting")
    .filter({ hasText: "Góc chia sẻ" })
    .getByRole("button", { name: "Lên", exact: true })
    .click();
  await page
    .locator(".section-setting")
    .filter({ hasText: "Kinh nghiệm" })
    .locator('input[type="checkbox"]')
    .uncheck();
  await page.locator("#preview").click();
  const frame = page.frameLocator("#preview-frame");
  await frame.locator("#writing").waitFor();
  assert.equal(await frame.locator("#experience").count(), 0);
  const ids = await frame
    .locator("main>section[id]")
    .evaluateAll((xs) => xs.map((x) => x.id));
  assert.deepEqual(ids, [
    "about",
    "projects",
    "skills",
    "awards",
    "writing",
    "contact",
  ]);
  assert.equal(await frame.locator("a[href]").count(), 0);
  await page.locator("#preview-language").selectOption("en");
  await frame.getByRole("heading", { name: "Writing", exact: true }).waitFor();
  await page.getByRole("button", { name: "Đóng", exact: true }).click();
  await goTab("Giải thưởng");
  const date = page.locator('[data-path="awards.0.date"]');
  const dateBefore = await date.inputValue();
  await page
    .locator(".record")
    .first()
    .getByRole("button", { name: "Xuống", exact: true })
    .click();
  assert.equal(
    await page.locator('[data-path="awards.1.date"]').inputValue(),
    dateBefore,
  );
  await page
    .locator(".record")
    .first()
    .getByRole("button", { name: "Xóa", exact: true })
    .click();
  await confirm();
  await page.waitForFunction(
    () => document.querySelectorAll(".record").length === 5,
  );
  assert.equal(await page.locator(".record").count(), 5);
  await page.locator("#undo").click();
  assert.equal(await page.locator(".record").count(), 6);
  results.push(
    "Custom bilingual sections, real ordering/visibility, exact sandboxed preview, remove/undo",
  );

  await goTab("Hồ sơ cá nhân");
  const upload = page.locator('.image-actions input[type="file"]').first();
  await upload.setInputFiles({
    name: "unsafe.svg",
    mimeType: "image/svg+xml",
    buffer: Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"></svg>'),
  });
  await page.locator("#status").filter({ hasText: "Chỉ nhận ảnh" }).waitFor();
  const image = fs.readFileSync(
    path.join(
      __dirname,
      "github-public-cv/assets/certificates/ai-first-prize.jpg",
    ),
  );
  await upload.setInputFiles({
    name: "original.jpg",
    mimeType: "image/jpeg",
    buffer: image,
  });
  await page.locator("#status").filter({ hasText: "Đã thêm ảnh" }).waitFor();
  await page
    .locator('[data-path="profile.photo.alt.vi"]')
    .fill("Ảnh minh chứng để kiểm thử");
  await page
    .locator('[data-path="profile.photo.alt.en"]')
    .fill("Evidence image for testing");
  await page.locator("#save-draft").click();
  await page.locator("#status").filter({ hasText: "Đã lưu nháp" }).waitFor();
  const downloadPromise = page.waitForEvent("download");
  await page.locator("#export").click();
  const download = await downloadPromise;
  const backup = JSON.parse(fs.readFileSync(await download.path(), "utf8"));
  assert.equal(
    Buffer.compare(Buffer.from(backup.media[0].content, "base64"), image),
    0,
  );
  assert.equal(backup.data.profile.summary.en, originalEnglish);
  assert.deepEqual(Model.validate(backup.data), []);
  await page.locator("#import").setInputFiles({
    name: "bad.json",
    mimeType: "application/json",
    buffer: Buffer.from('{"documents":{"vi":{}}}'),
  });
  await page
    .locator("#status")
    .filter({ hasText: "Không phải dữ liệu portfolio" })
    .waitFor();
  assert.equal(
    await page.locator('[data-path="profile.summary.en"]').inputValue(),
    originalEnglish,
  );
  await page.locator("#import").setInputFiles({
    name: "backup.json",
    mimeType: "application/json",
    buffer: Buffer.from(JSON.stringify(backup)),
  });
  await confirm();
  await page.locator("#save-draft").click();
  await page.locator("#status").filter({ hasText: "Đã lưu nháp" }).waitFor();
  await page.locator("#restore-draft").click();
  await confirm();
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      ),
      false,
      "Admin overflow at " + width,
    );
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.screenshot({ path: "output/playwright/admin-editor-mobile.png" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  results.push(
    "Safe original-image uploads, full UTF-8 backup/import/drafts and mobile layout",
  );

  const beginPublish = async () => {
    await page.locator("#publish").click();
    await confirm();
  };
  currentHead = "concurrent";
  await beginPublish();
  await page
    .locator("#status")
    .filter({ hasText: "Repository đã thay đổi" })
    .waitFor();
  assert.equal(
    requests.some((x) => x.method === "PATCH"),
    false,
  );
  currentHead = "head1";
  refuseWrites = true;
  await beginPublish();
  await page.locator("#status").filter({ hasText: "GitHub từ chối" }).waitFor();
  assert.equal(
    requests.some((x) => x.method === "PATCH"),
    false,
  );
  refuseWrites = false;
  patchDropsResponse = true;
  await beginPublish();
  await page
    .locator("#status")
    .filter({ hasText: "Đã lưu vào GitHub" })
    .waitFor();
  const written = JSON.parse(
    jsonCommit.tree.find(
      (x) => x.path === "github-public-cv/data/portfolio.json",
    ).content,
  );
  assert.equal(
    written.profile.summary.vi,
    "Nội dung tiếng Việt kiểm thử có dấu.",
  );
  assert.equal(written.profile.summary.en, originalEnglish);
  assert.equal(
    Buffer.compare(Buffer.from(blobCommit.content, "base64"), image),
    0,
  );
  assert.deepEqual(requests.find((x) => x.method === "PATCH").body, {
    sha: "head2",
    force: false,
  });
  assert.equal(jsonCommit.base_tree, "tree1");
  assert.equal(jsonCommit.tree.length, 2);
  assert.match(await page.locator("#dirty-state").textContent(), /Đã đồng bộ/);
  await page.locator("#logout").click();
  await page.locator("#login-panel").waitFor({ state: "visible" });
  await page.locator("#ui-language").click();
  assert.match(await page.locator(".login-card h2").textContent(), /Sign in/);
  await page.locator("#ui-language").click();
  await login();
  await page.locator("#workspace").waitFor({ state: "visible" });
  await page.clock.install();
  await page.evaluate(() => {
    IDBDatabase.prototype.transaction = function () {
      throw new Error("Storage unavailable");
    };
  });
  await page.locator('[data-path="profile.summary.vi"]').click();
  await page
    .locator('[data-path="profile.summary.vi"]')
    .fill("Bản nháp còn nguyên khi hết phiên đăng nhập.");
  await page.clock.fastForward(20 * 60 * 1000 + 1000);
  await page.locator("#login-panel").waitFor({ state: "visible" });
  assert.match(
    await page.locator("#login-status").textContent(),
    /Phiên đăng nhập đã kết thúc/,
  );
  await page.clock.resume();
  await login();
  await page.locator("#workspace").waitFor({ state: "visible" });
  await page.locator("#restore-draft").click();
  await confirm();
  await page.waitForFunction(
    () =>
      document.querySelector('[data-path="profile.summary.vi"]').value ===
      "Bản nháp còn nguyên khi hết phiên đăng nhập.",
    null,
    { timeout: 8000 },
  );
  assert.deepEqual(errors, []);
  await context.close();
  const unsafe = JSON.parse('{"profile":{},"__proto__":{"polluted":true}}');
  assert.throws(() => Model.normalize(unsafe));
  assert.equal({}.polluted, undefined);
  const changed = Model.normalize(source);
  changed.content.vi.aboutTitle = '<img src=x onerror="alert(1)">';
  const rendered = Renderer(changed).homePage("vi");
  assert.ok(rendered.includes("&lt;img"));
  assert.equal(rendered.includes('<img src=x onerror="alert(1)">'), false);
  results.push(
    "Mocked GitHub atomic publication, conflict/read-only protection, dropped-response verification, idle signout and XSS/prototype guards",
  );
  return results;
};
