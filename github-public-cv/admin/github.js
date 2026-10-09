(function (root, factory) {
  if (typeof module === "object" && module.exports) module.exports = factory();
  else root.GitHubPublisher = factory();
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";
  const config = Object.freeze({
    owner: "LeTPhu",
    repo: "Profile-CV",
    branch: "main",
    dataPath: "github-public-cv/data/portfolio.json",
  });
  const base = "/repos/" + config.owner + "/" + config.repo;
  const encode = (bytes) => {
    let binary = "";
    for (let i = 0; i < bytes.length; i += 16384)
      binary += String.fromCharCode(...bytes.subarray(i, i + 16384));
    return btoa(binary);
  };
  const decode = (text) =>
    new TextDecoder("utf-8", { fatal: true }).decode(
      Uint8Array.from(atob(text.replace(/\s/g, "")), (c) => c.charCodeAt(0)),
    );
  function create() {
    let token = "",
      baseline = "",
      publishing = false;
    async function request(path, method = "GET", body) {
      if (!token)
        throw new Error("Phiên đăng nhập đã kết thúc / Session expired.");
      const controller = new AbortController(),
        timeout = setTimeout(() => controller.abort(), 30000);
      let response;
      try {
        response = await fetch("https://api.github.com" + path, {
          method,
          headers: {
            Accept: "application/vnd.github+json",
            Authorization: "Bearer " + token,
            "X-GitHub-Api-Version": "2026-03-10",
            ...(body ? { "Content-Type": "application/json" } : {}),
          },
          ...(body ? { body: JSON.stringify(body) } : {}),
          signal: controller.signal,
          cache: "no-store",
          credentials: "omit",
          referrerPolicy: "no-referrer",
        });
      } catch {
        throw new Error(
          "Không kết nối được GitHub; giữ nguyên bản nháp và thử lại / Cannot reach GitHub; your draft is retained.",
        );
      } finally {
        clearTimeout(timeout);
      }
      if (!response.ok) {
        if (response.status === 401) {
          token = "";
          throw new Error(
            "Mã truy cập sai hoặc đã hết hạn / Invalid or expired access token.",
          );
        }
        if (response.status === 403)
          throw new Error(
            "GitHub từ chối: kiểm tra quyền Contents: Read and write, phạm vi repository hoặc giới hạn API / Check token permissions, repository scope or API rate limit.",
          );
        if ([409, 422].includes(response.status))
          throw new Error(
            "Có xung đột trên GitHub. Không ghi đè; hãy sao lưu và tải bản mới / GitHub conflict; export your draft and reload.",
          );
        throw new Error(
          "Yêu cầu GitHub không thành công (" +
            response.status +
            ") / GitHub request failed.",
        );
      }
      return response.status === 204 ? {} : response.json();
    }
    async function head() {
      return (await request(base + "/git/ref/heads/" + config.branch)).object
        .sha;
    }
    async function login(secret) {
      token = secret.trim();
      try {
        const user = await request("/user");
        if (user.login.toLowerCase() !== config.owner.toLowerCase())
          throw new Error(
            "Chỉ chủ sở hữu LeTPhu được quản trị website này / Only the site owner LeTPhu can manage this website.",
          );
        const repo = await request(base);
        if (!repo.permissions?.push)
          throw new Error(
            "Tài khoản không có quyền cập nhật repository / Account lacks repository write access.",
          );
        baseline = await head();
        const source = await request(
          base + "/contents/" + config.dataPath + "?ref=" + baseline,
        );
        if (source.encoding !== "base64" || !source.content)
          throw new Error(
            "Không đọc được dữ liệu portfolio / Cannot read portfolio data.",
          );
        return {
          login: user.login,
          sha: baseline,
          data: JSON.parse(decode(source.content)),
        };
      } catch (error) {
        token = "";
        baseline = "";
        throw error;
      }
    }
    async function publish(data, media, expectedHead, progress = () => {}) {
      if (publishing)
        throw new Error("Đang xuất bản / Publication in progress.");
      publishing = true;
      try {
        if (expectedHead !== baseline || (await head()) !== baseline)
          throw new Error(
            "Repository đã thay đổi từ khi đăng nhập. Bản nháp được giữ nguyên; sao lưu rồi đăng nhập lại để tải bản mới / Repository changed; export your draft and reload before publishing.",
          );
        const commit = await request(base + "/git/commits/" + baseline);
        const repositoryTree = await request(
          base + "/git/trees/" + commit.tree.sha + "?recursive=1",
        );
        if (repositoryTree.truncated)
          throw new Error(
            "Repository quá lớn để kiểm tra ảnh an toàn / Repository tree is too large to validate assets safely.",
          );
        const paths = new Set(
          repositoryTree.tree
            .filter((x) => x.type === "blob")
            .map((x) => x.path),
        );
        const uploads = new Set(media.map((x) => "github-public-cv/" + x.path));
        const assets = [
          data.profile.pdf,
          data.profile.photo.src,
          ...data.projects.flatMap((p) => [
            p.image.src,
            ...p.gallery.map((x) => x.src),
          ]),
          ...data.certificates.map((x) => x.src),
          ...data.customSections.map((x) => x.image.src),
        ].filter(Boolean);
        for (const path of assets)
          if (
            !paths.has("github-public-cv/" + path) &&
            !uploads.has("github-public-cv/" + path)
          )
            throw new Error(
              "Thiếu file ảnh/PDF: " +
                path +
                " / Asset missing from repository and draft.",
            );
        const entries = [
          {
            path: config.dataPath,
            mode: "100644",
            type: "blob",
            content: JSON.stringify(data, null, 2) + "\n",
          },
        ];
        for (let i = 0; i < media.length; i++) {
          const item = media[i];
          if (!/^assets\/uploads\/[a-z0-9-]+\.(jpg|png|webp)$/.test(item.path))
            throw new Error("Unsafe upload path");
          progress("Tải ảnh / Upload image " + (i + 1) + " / " + media.length);
          const blob = await request(base + "/git/blobs", "POST", {
            content: encode(new Uint8Array(item.bytes)),
            encoding: "base64",
          });
          entries.push({
            path: "github-public-cv/" + item.path,
            mode: "100644",
            type: "blob",
            sha: blob.sha,
          });
        }
        progress("Lưu dữ liệu Việt/Anh / Saving bilingual content");
        const tree = await request(base + "/git/trees", "POST", {
          base_tree: commit.tree.sha,
          tree: entries,
        });
        const next = await request(base + "/git/commits", "POST", {
          message: "Update portfolio content from owner dashboard",
          tree: tree.sha,
          parents: [baseline],
        });
        if ((await head()) !== baseline)
          throw new Error(
            "Có thay đổi mới trong lúc tải ảnh. Đã dừng để không ghi đè / Concurrent update detected; publication stopped safely.",
          );
        try {
          await request(base + "/git/refs/heads/" + config.branch, "PATCH", {
            sha: next.sha,
            force: false,
          });
        } catch (error) {
          // A dropped response can occur after GitHub applied the commit.
          let actual;
          try {
            actual = await head();
          } catch {
            throw new Error(
              "Chưa xác minh được kết quả xuất bản. Kiểm tra lịch sử GitHub trước khi thử lại / Publication outcome uncertain; check GitHub history before retrying.",
            );
          }
          if (actual !== next.sha) throw error;
        }
        baseline = next.sha;
        return {
          sha: next.sha,
          url:
            "https://github.com/" +
            config.owner +
            "/" +
            config.repo +
            "/commit/" +
            next.sha,
        };
      } finally {
        publishing = false;
      }
    }
    return {
      login,
      publish,
      logout: () => {
        token = "";
        baseline = "";
      },
      config,
      encode,
      decode,
    };
  }
  return { create, config, encode, decode };
});
