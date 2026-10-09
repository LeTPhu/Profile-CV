(function () {
  "use strict";
  const M = PortfolioModel,
    api = GitHubPublisher.create();
  const $ = (id) => document.getElementById(id);
  const root = new URL("../", location.href);
  const messages = {
    website: ["Xem website", "View website"],
    logout: ["Đăng xuất", "Sign out"],
    welcome: ["Một nơi để kể câu chuyện của bạn.", "A space for your story."],
    welcomeText: [
      "Sửa hồ sơ, thêm ảnh và chăm chút từng dự án. Hai ngôn ngữ riêng biệt, một không gian quản lý rõ ràng.",
      "Refine your profile, add imagery and give every project room to shine. Two independent languages, one thoughtful workspace.",
    ],
    content: ["Nội dung", "Content"],
    images: ["Hình ảnh", "Images"],
    ownerOnly: ["Dành riêng cho chủ website", "For the website owner"],
    login: ["Đăng nhập bằng quyền GitHub", "Sign in with GitHub access"],
    authHelp: [
      "Dùng mã truy cập GitHub giới hạn cho repository Profile-CV. Đây không phải mật khẩu tài khoản GitHub.",
      "Use a GitHub access token scoped to Profile-CV. This is not your GitHub account password.",
    ],
    token: ["Mã truy cập GitHub", "GitHub access token"],
    connect: ["Xác thực & mở trình chỉnh sửa", "Authenticate & open editor"],
    tokenNote: [
      "Mã chỉ tồn tại trong bộ nhớ của tab này, không lưu vào bản nháp hay mã website. Phiên kết thúc sau 20 phút không hoạt động.",
      "Your token stays in this tab's memory, never in drafts or website source. Sessions end after 20 minutes of inactivity.",
    ],
    setup: ["Cách lấy quyền truy cập", "Set up access"],
    step1: [
      "Mở trang tạo fine-grained token, chọn chủ sở hữu LeTPhu.",
      "Create a fine-grained token with LeTPhu as the resource owner.",
    ],
    step2: [
      "Chỉ chọn repository Profile-CV. Đặt thời hạn ngắn, ví dụ 7 ngày.",
      "Select only Profile-CV. Use a short expiry, for example 7 days.",
    ],
    step3: [
      "Repository permissions: Contents → Read and write; Metadata → Read-only. Không cần quyền Workflow.",
      "Repository permissions: Contents → Read and write; Metadata → Read-only. Workflow access is not needed.",
    ],
    step4: [
      "Tạo mã, nhập vào ô trên. Không chia sẻ mã này cho người khác.",
      "Generate the token and enter it above. Never share it.",
    ],
    createToken: ["Mở trang GitHub tạo mã", "Create a token on GitHub"],
    workspace: ["Chăm chút hồ sơ của bạn.", "Make your profile your own."],
    undo: ["Hoàn tác", "Undo"],
    redo: ["Làm lại", "Redo"],
    save: ["Lưu nháp", "Save draft"],
    restore: ["Khôi phục nháp", "Restore draft"],
    export: ["Sao lưu", "Export backup"],
    import: ["Nhập bản sao lưu", "Import backup"],
    preview: ["Xem trước", "Preview"],
    publish: ["Xuất bản lên GitHub", "Publish to GitHub"],
    expand: ["Mở / thu gọn tất cả", "Expand / collapse all"],
    bilingual: [
      "VIỆT + ENGLISH / NỘI DUNG ĐỘC LẬP",
      "VIETNAMESE + ENGLISH / INDEPENDENT CONTENT",
    ],
    languageNote: [
      "Mỗi cột là một ngôn ngữ riêng. Sửa hoặc nhập dữ liệu không xóa nội dung của ngôn ngữ còn lại. Mỗi dòng trong ô danh sách sẽ thành một ý riêng.",
      "Each column is a separate language. Full backups preserve both versions. Each line in a list field becomes a separate item.",
    ],
    language: ["Ngôn ngữ", "Language"],
    page: ["Trang", "Page"],
    close: ["Đóng", "Close"],
    previewNote: [
      "Bản xem trước dùng cùng mẫu website. Các nút điều hướng bị tắt để bạn không rời trình chỉnh sửa.",
      "This uses the exact website template. Navigation is disabled to keep you in the editor.",
    ],
    cancel: ["Hủy", "Cancel"],
    confirm: ["Xác nhận", "Confirm"],
    profile: ["Hồ sơ cá nhân", "Personal profile"],
    education: ["Học vấn", "Education"],
    experience: ["Kinh nghiệm", "Experience"],
    skills: ["Kỹ năng", "Skills"],
    projects: ["Dự án", "Projects"],
    awards: ["Giải thưởng", "Awards"],
    certificates: ["Giấy khen & chứng nhận", "Awards & certificates"],
    customSections: ["Mục tự thêm", "Custom sections"],
    settings: ["Bố cục & ngôn ngữ", "Layout & language"],
    headings: ["Tiêu đề & lời giới thiệu", "Headings & introductions"],
    add: ["Thêm mục", "Add item"],
    remove: ["Xóa", "Remove"],
    up: ["Lên", "Up"],
    down: ["Xuống", "Down"],
    blank: ["Mục chưa có tiêu đề", "Untitled item"],
    chooseImage: [
      "Chọn ảnh JPG, PNG hoặc WebP (tối đa 8 MB). Ảnh gốc không bị chỉnh sửa.",
      "Choose JPG, PNG or WebP (up to 8 MB). Original images are not altered.",
    ],
    noImage: [
      "Chưa có ảnh; website sẽ dùng vị trí chờ.",
      "No image yet; the website will show a placeholder.",
    ],
    saved: [
      "Đã lưu nháp trên trình duyệt này, chưa công khai.",
      "Draft saved in this browser, not published.",
    ],
    dirty: ["Có thay đổi chưa xuất bản", "Unpublished changes"],
    clean: ["Đã đồng bộ với GitHub", "Synced with GitHub"],
    contact: ["Liên hệ", "Contact"],
    about: ["Giới thiệu", "About"],
    publishWarning: [
      "Nội dung và ảnh sẽ được công khai trong repository và trên website. Không tải tài liệu chứa thông tin nhạy cảm. Ẩn/xóa khỏi trang không xóa lịch sử GitHub. Website cần vài phút để cập nhật sau khi lưu.",
      "Content and images will be public in the repository and on the website. Do not upload sensitive documents. Hiding/removing content does not delete GitHub history. Deployment may take a few minutes.",
    ],
    deleteWarning: [
      "Mục sẽ bị xóa khỏi bản đang sửa. Bạn có thể hoàn tác trước khi xuất bản. Ảnh đã công khai không bị xóa khỏi lịch sử GitHub.",
      "This removes the item from your draft. You can undo before publishing. Published images remain in GitHub history.",
    ],
    confirmImport: [
      "Thay toàn bộ dữ liệu Việt/Anh bằng bản sao lưu này? Bản hiện tại vẫn có thể hoàn tác. Chỉ nhận file portfolio đầy đủ, không nhận CV chỉ có một ngôn ngữ.",
      "Replace both language versions with this complete backup? You can undo. Single-language CV files are not accepted.",
    ],
    expired: [
      "Phiên đăng nhập đã kết thúc. Bản đang sửa được giữ để khôi phục sau khi đăng nhập lại.",
      "Session ended. Your edits are retained for restoration after signing in again.",
    ],
  };
  let ui = "vi",
    data,
    sha = "",
    user = "",
    dirty = false,
    busy = false,
    tab = "profile",
    history = [],
    future = [],
    urls = new Map(),
    media = new Map(),
    retainedDraft,
    lastActivity = 0,
    timer,
    previewTimer,
    draftTimer,
    db;
  try {
    ui =
      localStorage.getItem("portfolio.admin.language") ||
      (navigator.language.startsWith("en") ? "en" : "vi");
  } catch {
    /* Storage may be blocked. */
  }
  if (!["vi", "en"].includes(ui)) ui = "vi";
  const L = (vi, en) => (ui === "en" ? en : vi);
  const msg = (key) => messages[key]?.[ui === "en" ? 1 : 0] || key;
  const el = (tag, text, className) => {
    const n = document.createElement(tag);
    if (text !== undefined) n.textContent = text;
    if (className) n.className = className;
    return n;
  };
  const notice = (text, error = false, target = "status") => {
    $(target).textContent = text;
    $(target).classList.toggle("error", error);
  };
  const get = (path) => path.reduce((o, key) => o?.[key], data);
  function set(path, value) {
    let o = data;
    for (const key of path.slice(0, -1)) o = o[key] ??= {};
    o[path.at(-1)] = value;
  }
  const snapshot = () => JSON.stringify({ data, sha });
  function remember() {
    history.push(snapshot());
    if (history.length > 40) history.shift();
    future = [];
  }
  function changed() {
    dirty = true;
    updateState();
    clearTimeout(previewTimer);
    if ($("preview-dialog").open) previewTimer = setTimeout(renderPreview, 350);
    clearTimeout(draftTimer);
    draftTimer = setTimeout(() => saveDraft(false), 1000);
  }
  function updateState() {
    $("dirty-state").textContent = msg(dirty ? "dirty" : "clean");
    $("undo").disabled = !history.length || busy;
    $("redo").disabled = !future.length || busy;
    $("publish").disabled = busy || !dirty;
  }
  function translate() {
    document.documentElement.lang = ui;
    document.title =
      L("Quản trị hồ sơ", "Manage profile") + " | Portfolio Studio";
    document
      .querySelectorAll("[data-i18n]")
      .forEach((n) => (n.textContent = msg(n.dataset.i18n)));
    $("ui-language").textContent = ui === "vi" ? "English" : "Tiếng Việt";
    $("editor-nav").setAttribute(
      "aria-label",
      L("Nhóm thông tin", "Content groups"),
    );
    if (data) {
      render();
      updateState();
    }
  }
  function activity() {
    if (
      user &&
      !busy &&
      lastActivity &&
      Date.now() - lastActivity >= 20 * 60 * 1000
    ) {
      signOut(true);
      return;
    }
    clearTimeout(timer);
    if (user && !busy) {
      lastActivity = Date.now();
      timer = setTimeout(() => signOut(true), 20 * 60 * 1000);
    }
  }
  ["pointerdown", "keydown"].forEach((name) =>
    document.addEventListener(name, activity, { passive: true }),
  );
  function openDB() {
    if (db) return Promise.resolve(db);
    return new Promise((resolve, reject) => {
      const request = indexedDB.open("portfolio-owner-drafts", 1);
      request.onupgradeneeded = () =>
        request.result.createObjectStore("drafts");
      request.onsuccess = () => {
        db = request.result;
        resolve(db);
      };
      request.onerror = () => reject(new Error("Draft storage unavailable"));
      request.onblocked = () =>
        reject(new Error("Draft storage is blocked by another tab"));
    });
  }
  async function draftOperation(mode, value) {
    const database = await openDB();
    return new Promise((resolve, reject) => {
      const tx = database.transaction(
          "drafts",
          mode === "get" ? "readonly" : "readwrite",
        ),
        store = tx.objectStore("drafts");
      const request =
        mode === "get"
          ? store.get("owner")
          : mode === "delete"
            ? store.delete("owner")
            : store.put(value, "owner");
      tx.oncomplete = () => resolve(request.result);
      tx.onerror = tx.onabort = () => reject(new Error("Draft storage failed"));
    });
  }
  async function saveDraft(explicit = true) {
    if (!data) return;
    try {
      const used = new Set(M.images(data).map((x) => x.src));
      await draftOperation("put", {
        data: M.clone(data),
        sha,
        saved: new Date().toISOString(),
        media: [...media.values()].filter((x) => used.has(x.path)),
      });
      if (explicit) notice(msg("saved"));
    } catch {
      notice(
        L(
          "Không lưu được nháp. Hãy dùng Sao lưu để tránh mất nội dung.",
          "Draft storage failed. Export a backup to protect your edits.",
        ),
        true,
      );
    }
  }
  async function confirm(title, text) {
    if ($("confirm-dialog").open) return false;
    $("confirm-title").textContent = title;
    $("confirm-text").textContent = text;
    const dialog = $("confirm-dialog");
    dialog.returnValue = "cancel";
    dialog.showModal();
    return new Promise((resolve) =>
      dialog.addEventListener(
        "close",
        () => resolve(dialog.returnValue === "yes"),
        { once: true },
      ),
    );
  }
  $("confirm-cancel").onclick = () => $("confirm-dialog").close("cancel");
  $("confirm-yes").onclick = () => $("confirm-dialog").close("yes");
  document
    .querySelectorAll("[data-close]")
    .forEach((b) => (b.onclick = () => $(b.dataset.close).close()));
  function putMedia(items) {
    for (const url of urls.values()) URL.revokeObjectURL(url);
    urls = new Map();
    media = new Map();
    for (const item of items) {
      media.set(item.path, item);
      urls.set(
        item.path,
        URL.createObjectURL(new Blob([item.bytes], { type: item.type })),
      );
    }
  }
  function signOut(expired = false) {
    if (busy) return;
    clearTimeout(timer);
    clearTimeout(draftTimer);
    api.logout();
    if (data && dirty)
      retainedDraft = { data: M.clone(data), sha, media: [...media.values()] };
    user = "";
    lastActivity = 0;
    $("workspace").hidden = true;
    $("logout").hidden = true;
    $("login-panel").hidden = false;
    $("token").value = "";
    $("preview-dialog").close();
    if (data && dirty) saveDraft(false);
    notice(msg("expired"), false, "login-status");
    if (!expired) $("token").focus();
  }
  $("logout").onclick = async () => {
    if (
      !dirty ||
      (await confirm(
        msg("logout"),
        L(
          "Đăng xuất? Bản đang sửa sẽ lưu nháp nếu trình duyệt cho phép.",
          "Sign out? Your edits will be saved locally if storage is available.",
        ),
      ))
    )
      signOut();
  };
  $("login-form").onsubmit = async (event) => {
    event.preventDefault();
    $("login-button").disabled = true;
    notice(
      L("Đang xác thực quyền GitHub…", "Verifying GitHub access…"),
      false,
      "login-status",
    );
    const secret = $("token").value;
    $("token").value = "";
    try {
      const session = await api.login(secret),
        normalized = M.normalize(session.data),
        errors = M.validate(normalized);
      if (errors.length) throw new Error(errors.slice(0, 6).join("\n"));
      const retained =
        data && dirty
          ? { data: M.clone(data), sha, media: [...media.values()] }
          : retainedDraft;
      if (retained) retainedDraft = retained;
      data = normalized;
      sha = session.sha;
      user = session.login;
      lastActivity = Date.now();
      dirty = false;
      history = [];
      future = [];
      putMedia([]);
      $("login-panel").hidden = true;
      $("workspace").hidden = false;
      $("logout").hidden = false;
      $("account").textContent = session.login + " / Profile-CV / main";
      notice("");
      translate();
      activity();
      let draft = retained;
      if (!draft) {
        try {
          draft = await draftOperation("get");
        } catch {
          notice(
            L(
              "Lưu nháp tự động không khả dụng. Bạn vẫn có thể sửa, xuất bản và sao lưu file.",
              "Automatic drafts are unavailable. Editing, publishing and file backups still work.",
            ),
            true,
          );
        }
      }
      if (draft && JSON.stringify(draft.data) !== JSON.stringify(data))
        notice(
          L(
            "Có bản nháp chưa xuất bản. Chọn Khôi phục nháp để tiếp tục; nếu GitHub đã thay đổi, hãy sao lưu và đối chiếu trước khi xuất bản.",
            "An unpublished draft is available. Restore it to continue; if GitHub changed, export and reconcile before publishing.",
          ),
        );
    } catch (error) {
      api.logout();
      user = "";
      notice(error.message, true, "login-status");
    } finally {
      $("login-button").disabled = false;
    }
  };
  $("ui-language").onclick = () => {
    ui = ui === "vi" ? "en" : "vi";
    try {
      localStorage.setItem("portfolio.admin.language", ui);
    } catch {
      /* Optional preference. */
    }
    translate();
  };
  function button(text, action, className) {
    const b = el("button", text, className);
    b.type = "button";
    b.onclick = action;
    return b;
  }
  function field(parent, path, vi, en, type = "text", language) {
    const label = el("label", undefined, "field");
    label.append(el("span", L(vi, en)));
    if (language)
      label.append(
        el(
          "small",
          language === "vi" ? "TIẾNG VIỆT" : "ENGLISH",
          "language-tag",
        ),
      );
    const input = el(
      type === "list" || type === "textarea" ? "textarea" : "input",
    );
    if (input.tagName === "INPUT") input.type = type;
    input.lang = language || ui;
    const value = get(path);
    input.value = type === "list" ? (value || []).join("\n") : (value ?? "");
    input.dataset.path = path.join(".");
    if (type === "textarea" || type === "list")
      input.rows = type === "list" ? 6 : 4;
    input.maxLength = 30000;
    input.oninput = () => {
      remember();
      const previous = get(path);
      set(
        path,
        type === "list"
          ? input.value
              .split(/\r?\n/)
              .map((x) => x.trim())
              .filter(Boolean)
          : input.value,
      );
      if (path.at(-1) === "id" && path[0] === "certificates")
        data.awards.forEach((a) => {
          if (a.certificate === previous) a.certificate = input.value;
        });
      if (path.at(-1) === "id" && path[0] === "customSections")
        for (const key of ["sectionOrder", "hiddenSections"])
          data.settings[key] = data.settings[key].map((id) =>
            id === previous ? input.value : id,
          );
      changed();
    };
    label.append(input);
    parent.append(label);
    return input;
  }
  function pair(parent, path, vi, en, type = "text") {
    const row = el("div", undefined, "fields lang-pair");
    parent.append(row);
    for (const lang of ["vi", "en"])
      field(row, [...path, lang], vi, en, type, lang);
  }
  function select(parent, path, vi, en, options) {
    const label = el("label", undefined, "field"),
      input = el("select");
    label.append(el("span", L(vi, en)));
    for (const [value, text] of options) {
      const o = el("option", text);
      o.value = value;
      input.append(o);
    }
    input.value = get(path) || "";
    input.dataset.path = path.join(".");
    input.onchange = () => {
      remember();
      set(path, input.value);
      changed();
    };
    label.append(input);
    parent.append(label);
  }
  function fields(parent) {
    const n = el("div", undefined, "fields");
    parent.append(n);
    return n;
  }
  async function inspectFile(file) {
    if (file.size > 8 * 1024 * 1024 || !file.size)
      throw new Error(
        L(
          "Ảnh phải nhỏ hơn 8 MB và không rỗng.",
          "Image must be non-empty and at most 8 MB.",
        ),
      );
    const bytes = await file.arrayBuffer(),
      b = new Uint8Array(bytes);
    const type =
      b[0] === 255 && b[1] === 216 && b[2] === 255
        ? "image/jpeg"
        : b[0] === 137 &&
            b[1] === 80 &&
            b[2] === 78 &&
            b[3] === 71 &&
            b[4] === 13 &&
            b[5] === 10 &&
            b[6] === 26 &&
            b[7] === 10
          ? "image/png"
          : new TextDecoder().decode(b.subarray(0, 4)) === "RIFF" &&
              new TextDecoder().decode(b.subarray(8, 12)) === "WEBP"
            ? "image/webp"
            : "";
    if (!type)
      throw new Error(
        L(
          "Chỉ nhận ảnh JPG/PNG/WebP thật; không nhận SVG hoặc HEIC.",
          "Only genuine JPG/PNG/WebP images are accepted, not SVG or HEIC.",
        ),
      );
    const blob = new Blob([bytes], { type }),
      bitmap = await createImageBitmap(blob).catch(() => {
        throw new Error(
          L(
            "File ảnh bị hỏng hoặc không đọc được.",
            "Image is damaged or unreadable.",
          ),
        );
      });
    const { width, height } = bitmap;
    bitmap.close();
    if (width * height > 40000000)
      throw new Error(
        L(
          "Ảnh vượt 40 megapixel. Hãy chọn ảnh nhỏ hơn.",
          "Image exceeds 40 megapixels. Choose a smaller image.",
        ),
      );
    return { bytes, type, width, height };
  }
  function imageEditor(parent, path, title, certificate = false) {
    const box = el("div", undefined, "image-editor");
    box.append(el("h4", title));
    const img = get(path);
    if (img.src) {
      const thumbnail = el("img", undefined, "image-preview");
      thumbnail.src = urls.get(img.src) || new URL(img.src, root).href;
      thumbnail.alt = img.alt?.[ui] || title;
      box.append(thumbnail);
    } else box.append(el("p", msg("noImage"), "image-placeholder"));
    const f = fields(box);
    pair(
      f,
      [...path, "alt"],
      "Mô tả ảnh cho người xem",
      "Image alternative text",
    );
    if (!certificate)
      field(
        f,
        [...path, "position"],
        "Vị trí ảnh (ví dụ 50% 50%)",
        "Image position (e.g. 50% 50%)",
      );
    const actions = el("div", undefined, "image-actions"),
      upload = el("input");
    upload.type = "file";
    upload.accept = "image/jpeg,image/png,image/webp";
    upload.setAttribute("aria-label", title + " / " + msg("images"));
    upload.onchange = async () => {
      if (!upload.files[0]) return;
      try {
        const item = await inspectFile(upload.files[0]);
        const used = new Set(M.images(data).map((x) => x.src));
        const size = [...media.values()]
          .filter((x) => used.has(x.path))
          .reduce((sum, x) => sum + x.bytes.byteLength, 0);
        if (size + item.bytes.byteLength > 32 * 1024 * 1024)
          throw new Error(
            L(
              "Tổng ảnh mới vượt 32 MB. Hãy xuất bản theo từng đợt.",
              "New images exceed 32 MB. Publish in smaller batches.",
            ),
          );
        item.path =
          "assets/uploads/" +
          crypto.randomUUID() +
          "." +
          { "image/jpeg": "jpg", "image/png": "png", "image/webp": "webp" }[
            item.type
          ];
        remember();
        media.set(item.path, item);
        urls.set(
          item.path,
          URL.createObjectURL(new Blob([item.bytes], { type: item.type })),
        );
        const next = {
          ...img,
          src: item.path,
          width: item.width,
          height: item.height,
        };
        set(path, next);
        changed();
        render();
        notice(
          L(
            "Đã thêm ảnh vào bản nháp. Điền mô tả Việt/Anh trước khi xuất bản.",
            "Image added to your draft. Fill in both language descriptions before publishing.",
          ),
        );
      } catch (error) {
        notice(error.message, true);
      } finally {
        upload.value = "";
      }
    };
    actions.append(
      upload,
      button(
        msg("remove") + " " + msg("images").toLowerCase(),
        () => {
          remember();
          set([...path, "src"], "");
          changed();
          render();
        },
        "danger",
      ),
    );
    box.append(actions);
    const library = [
      ...new Map(
        M.images(data)
          .filter((x) => x.src && x.src !== img.src)
          .map((x) => [x.src, x]),
      ).values(),
    ];
    if (library.length) {
      const picker = el("select");
      picker.setAttribute("aria-label", L("Chọn ảnh đã có", "Reuse an image"));
      const empty = el(
        "option",
        L("Chọn lại ảnh đã có…", "Reuse an existing image…"),
      );
      empty.value = "";
      picker.append(empty);
      for (const im of library) {
        const o = el("option", im.alt?.[ui] || im.src);
        o.value = im.src;
        picker.append(o);
      }
      picker.onchange = () => {
        const selected = library.find((x) => x.src === picker.value);
        if (!selected) return;
        if (certificate && (!selected.width || !selected.height)) {
          notice(
            L(
              "Ảnh này chưa có kích thước. Hãy tải file gốc để dùng làm chứng nhận.",
              "This image lacks dimensions. Upload the original to use it as a certificate.",
            ),
            true,
          );
          return;
        }
        remember();
        set(path, {
          ...img,
          src: selected.src,
          width: selected.width,
          height: selected.height,
        });
        changed();
        render();
      };
      actions.append(picker);
    }
    box.append(el("p", msg("chooseImage"), "image-placeholder"));
    parent.append(box);
  }
  function renderProfile(parent) {
    const f = fields(parent);
    for (const [key, vi, en, type] of [
      ["name", "Họ tên", "Full name"],
      ["initials", "Chữ viết tắt", "Initials"],
      [
        "focus",
        "Lĩnh vực nổi bật (dùng & để tách dòng)",
        "Focus (use & for a line break)",
      ],
      ["email", "Email", "Email", "email"],
      ["phone", "Điện thoại hiển thị", "Phone display"],
      ["phoneLink", "Số gọi điện (+84…)", "Callable phone (+84…)"],
      ["github", "Trang GitHub", "GitHub profile", "url"],
    ])
      field(f, ["profile", key], vi, en, type);
    for (const [key, vi, en, type] of [
      ["location", "Địa chỉ", "Location"],
      ["direction", "Định hướng", "Direction"],
      ["summary", "Tóm tắt hồ sơ", "Profile summary", "textarea"],
      [
        "about",
        "Giới thiệu (mỗi dòng một đoạn)",
        "About (one paragraph per line)",
        "list",
      ],
    ])
      pair(f, ["profile", key], vi, en, type);
    imageEditor(parent, ["profile", "photo"], L("Ảnh chân dung", "Portrait"));
    parent.append(
      el(
        "p",
        L(
          "CV PDF gốc được giữ nguyên. Phần CV A4 tự cập nhật theo dữ liệu khi xuất bản.",
          "The original CV PDF is unchanged. The A4 resume is regenerated from content on publication.",
        ),
        "notice",
      ),
    );
  }
  function renderEducation(parent) {
    const f = fields(parent);
    for (const [key, vi, en] of [
      ["school", "Trường", "Institution"],
      ["degree", "Bằng cấp / chuyên ngành", "Degree / major"],
      ["classification", "Xếp loại", "Classification"],
    ])
      pair(f, ["education", key], vi, en);
    field(f, ["education", "period"], "Thời gian", "Period");
    field(f, ["education", "gpa"], "GPA", "GPA");
  }
  const recordFields = {
    experience: [
      ["role", "Vị trí", "Role", "pair"],
      ["organization", "Đơn vị", "Organization", "pair"],
      ["period", "Thời gian", "Period"],
      [
        "points",
        "Mô tả (mỗi dòng một ý)",
        "Description (one item per line)",
        "pair-list",
      ],
    ],
    skills: [
      ["name", "Tên nhóm kỹ năng", "Skill group"],
      ["description", "Mô tả", "Description", "pair-textarea"],
      [
        "items",
        "Kỹ năng / công nghệ (mỗi dòng một tên)",
        "Skills / technologies (one per line)",
        "list",
      ],
    ],
    awards: [
      ["date", "Tháng/năm hoặc khoảng thời gian", "Month/year or period"],
      ["title", "Tên thành tích", "Achievement", "pair"],
      ["detail", "Chi tiết", "Details", "pair-textarea"],
    ],
    projects: [
      [
        "id",
        "Mã đường dẫn (chữ thường, số, dấu -)",
        "URL ID (lowercase, digits, hyphens)",
      ],
      ["name", "Tên dự án", "Project name"],
      ["period", "Thời gian", "Period", "pair"],
      ["title", "Tiêu đề ngắn", "Short title", "pair"],
      ["summary", "Tóm tắt", "Summary", "pair-textarea"],
      ["context", "Vai trò / phạm vi", "Role / context", "pair"],
      [
        "points",
        "Đóng góp (mỗi dòng một ý)",
        "Contributions (one per line)",
        "pair-list",
      ],
      ["result", "Kết quả ghi nhận", "Recorded results", "pair-textarea"],
      [
        "technologies",
        "Công nghệ (mỗi dòng một tên)",
        "Technologies (one per line)",
        "list",
      ],
      [
        "repository",
        "Repository GitHub (có thể để trống)",
        "GitHub repository (optional)",
        "url",
      ],
    ],
    certificates: [
      ["id", "Mã chứng nhận", "Certificate ID"],
      [
        "issued",
        "Ngày cấp trên giấy (không thay mốc giải thưởng)",
        "Issue date (does not change award date)",
        "date",
      ],
      ["title", "Tên giấy khen / chứng nhận", "Document title", "pair"],
      ["issuer", "Đơn vị cấp", "Issuer", "pair"],
      ["description", "Mô tả", "Description", "pair-textarea"],
    ],
    customSections: [
      ["id", "Mã mục (không trùng mục đã có)", "Unique section ID"],
      ["title", "Tiêu đề mục", "Section heading", "pair"],
      [
        "body",
        "Nội dung (mỗi dòng một đoạn)",
        "Body (one paragraph per line)",
        "pair-textarea",
      ],
      [
        "points",
        "Danh sách ý (mỗi dòng một ý)",
        "Bullet points (one per line)",
        "pair-list",
      ],
    ],
  };
  function renderCollection(parent, kind) {
    data[kind].forEach((item, i) => {
      const path = [kind, i],
        record = el("details", undefined, "record");
      record.open = true;
      record.append(
        el(
          "summary",
          String(i + 1).padStart(2, "0") +
            " / " +
            (item.name || item.title?.[ui] || item.role?.[ui] || msg("blank")),
        ),
      );
      const body = el("div", undefined, "record-content"),
        f = fields(body);
      for (const [key, vi, en, type = "text"] of recordFields[kind]) {
        if (type.startsWith("pair"))
          pair(f, [...path, key], vi, en, type.split("-")[1] || "text");
        else field(f, [...path, key], vi, en, type);
      }
      if (kind === "projects") {
        select(f, [...path, "category"], "Nhóm dự án", "Category", [
          ["engineering", L("Hệ thống & web", "Systems & web")],
          ["research", L("Nghiên cứu", "Research")],
          ["ai", L("AI ứng dụng", "Applied AI")],
        ]);
        imageEditor(
          body,
          [...path, "image"],
          L("Ảnh bìa dự án", "Project cover"),
        );
        item.gallery.forEach((image, j) => {
          imageEditor(
            body,
            [...path, "gallery", j],
            L("Ảnh dự án", "Project image") + " " + (j + 1),
          );
          const caption = fields(body);
          pair(
            caption,
            [...path, "gallery", j, "caption"],
            "Chú thích ảnh",
            "Image caption",
          );
          const controls = el("div", undefined, "gallery-controls");
          for (const delta of [-1, 1]) {
            const b = button(msg(delta < 0 ? "up" : "down"), () => {
              remember();
              [item.gallery[j], item.gallery[j + delta]] = [
                item.gallery[j + delta],
                item.gallery[j],
              ];
              changed();
              render();
            });
            b.disabled = j + delta < 0 || j + delta >= item.gallery.length;
            controls.append(b);
          }
          controls.append(
            button(
              msg("remove"),
              () => {
                remember();
                item.gallery.splice(j, 1);
                changed();
                render();
              },
              "danger",
            ),
          );
          body.append(controls);
        });
        body.append(
          button(L("Thêm ảnh vào bộ sưu tập", "Add a gallery image"), () => {
            remember();
            item.gallery.push({ ...M.image(), caption: { vi: "", en: "" } });
            changed();
            render();
          }),
        );
      }
      if (kind === "awards")
        select(
          f,
          [...path, "certificate"],
          "Minh chứng liên kết",
          "Linked certificate",
          [
            ["", L("Không có", "None")],
            ...data.certificates.map((c) => [c.id, c.title[ui] || c.id]),
          ],
        );
      if (kind === "certificates") {
        select(f, [...path, "category"], "Loại tư liệu", "Document category", [
          ["award", L("Giấy khen", "Award")],
          ["participation", L("Chứng nhận tham gia", "Participation")],
        ]);
        imageEditor(body, path, L("Ảnh chứng nhận", "Certificate image"), true);
      }
      if (kind === "customSections")
        imageEditor(
          body,
          [...path, "image"],
          L("Ảnh của mục", "Section image"),
        );
      record.append(body);
      const controls = el("div", undefined, "record-toolbar");
      for (const delta of [-1, 1]) {
        const b = button(msg(delta < 0 ? "up" : "down"), () => {
          remember();
          [data[kind][i], data[kind][i + delta]] = [
            data[kind][i + delta],
            data[kind][i],
          ];
          changed();
          render();
        });
        b.disabled = i + delta < 0 || i + delta >= data[kind].length;
        controls.append(b);
      }
      controls.append(
        button(
          msg("remove"),
          async () => {
            if (!(await confirm(msg("remove"), msg("deleteWarning")))) return;
            remember();
            data[kind].splice(i, 1);
            if (kind === "certificates")
              data.awards.forEach((a) => {
                if (a.certificate === item.id) a.certificate = "";
              });
            if (kind === "customSections")
              for (const key of ["sectionOrder", "hiddenSections"])
                data.settings[key] = data.settings[key].filter(
                  (id) => id !== item.id,
                );
            changed();
            render();
          },
          "danger",
        ),
      );
      record.append(controls);
      parent.append(record);
    });
    parent.append(
      button(
        "+ " + msg("add"),
        () => {
          remember();
          const item = M.newItem(kind);
          data[kind].push(item);
          if (kind === "customSections")
            data.settings.sectionOrder.push(item.id);
          changed();
          render();
          parent.lastElementChild.previousElementSibling?.scrollIntoView({
            block: "start",
            behavior: "smooth",
          });
        },
        "add-button",
      ),
    );
    if (kind === "skills") {
      const f = fields(parent);
      field(
        f,
        ["tools"],
        "Công cụ & môi trường (mỗi dòng một tên)",
        "Tools & environment (one per line)",
        "list",
      );
      pair(
        f,
        ["english"],
        "Trình độ tiếng Anh",
        "English proficiency",
        "textarea",
      );
    }
  }
  function renderSettings(parent) {
    const note = el(
      "p",
      L(
        "Chọn mục hiện/ẩn và dùng Lên/Xuống để đổi thứ tự toàn bộ khối trên website. Ẩn chỉ thay giao diện: dữ liệu vẫn nằm trong repository công khai.",
        "Toggle sections and use Up/Down to reorder entire website blocks. Hiding affects the display only; the public repository still contains the data.",
      ),
      "notice",
    );
    parent.append(note);
    const order = [
      ...new Set([
        ...data.settings.sectionOrder,
        ...M.sections,
        ...data.customSections.map((x) => x.id),
      ]),
    ];
    order.forEach((id, i) => {
      const row = el("div", undefined, "section-setting"),
        label = el("label"),
        checkbox = el("input");
      checkbox.type = "checkbox";
      checkbox.checked = !data.settings.hiddenSections.includes(id);
      label.append(
        checkbox,
        el(
          "span",
          messages[id]
            ? msg(id)
            : data.customSections.find((s) => s.id === id)?.title[ui] || id,
        ),
      );
      checkbox.onchange = () => {
        remember();
        data.settings.hiddenSections = data.settings.hiddenSections.filter(
          (x) => x !== id,
        );
        if (!checkbox.checked) data.settings.hiddenSections.push(id);
        changed();
      };
      const controls = el("div");
      for (const delta of [-1, 1]) {
        const b = button(msg(delta < 0 ? "up" : "down"), () => {
          remember();
          [order[i], order[i + delta]] = [order[i + delta], order[i]];
          data.settings.sectionOrder = order;
          changed();
          render();
        });
        b.disabled = i + delta < 0 || i + delta >= order.length;
        controls.append(b);
      }
      row.append(label, controls);
      parent.append(row);
    });
    const automatic = el("label", undefined, "section-setting"),
      check = el("input");
    check.type = "checkbox";
    check.checked = data.settings.autoLanguage;
    check.onchange = () => {
      remember();
      data.settings.autoLanguage = check.checked;
      changed();
    };
    automatic.append(
      el(
        "span",
        L(
          "Tự chọn tiếng Anh theo ngôn ngữ trình duyệt",
          "Automatically select English from browser language",
        ),
      ),
      check,
    );
    parent.append(automatic);
    const f = fields(parent);
    field(
      f,
      ["settings", "scholarship"],
      "Số năm học bổng nổi bật",
      "Scholarship highlight",
    );
  }
  function render() {
    if (!data) return;
    const nav = $("editor-nav");
    nav.replaceChildren();
    for (const key of [
      "profile",
      "education",
      "experience",
      "skills",
      "projects",
      "awards",
      "certificates",
      "customSections",
      "settings",
      "headings",
    ]) {
      const b = button(msg(key), () => {
        tab = key;
        render();
      });
      b.setAttribute("aria-current", String(tab === key));
      nav.append(b);
    }
    $("editor-title").textContent = msg(tab);
    const editor = $("editor");
    editor.replaceChildren();
    if (tab === "profile") renderProfile(editor);
    else if (tab === "education") renderEducation(editor);
    else if (tab === "settings") renderSettings(editor);
    else if (tab === "headings") {
      const defaults = PortfolioRenderer({
          ...data,
          content: { vi: {}, en: {} },
        }).labels,
        f = fields(editor);
      for (const key of M.keys) {
        const row = el("div", undefined, "fields lang-pair");
        f.append(row);
        for (const lang of ["vi", "en"]) {
          const input = field(
            row,
            ["content", lang, key],
            defaults.vi[key],
            defaults.en[key],
            ["projectSub", "contactText", "archiveIntro"].includes(key)
              ? "textarea"
              : "text",
            lang,
          );
          input.placeholder = defaults[lang][key];
        }
      }
    } else renderCollection(editor, tab);
    updateState();
  }
  $("expand").onclick = () => {
    const items = [...$("editor").querySelectorAll("details")],
      open = items.some((x) => !x.open);
    items.forEach((x) => (x.open = open));
  };
  $("undo").onclick = () => {
    if (!history.length) return;
    future.push(snapshot());
    const state = JSON.parse(history.pop());
    data = state.data;
    sha = state.sha;
    changed();
    render();
  };
  $("redo").onclick = () => {
    if (!future.length) return;
    history.push(snapshot());
    const state = JSON.parse(future.pop());
    data = state.data;
    sha = state.sha;
    changed();
    render();
  };
  $("save-draft").onclick = () => saveDraft();
  $("restore-draft").onclick = async () => {
    try {
      const draft = retainedDraft || (await draftOperation("get"));
      if (!draft)
        throw new Error(
          L(
            "Chưa có bản nháp trên trình duyệt này.",
            "No draft in this browser.",
          ),
        );
      if (
        !(await confirm(
          msg("restore"),
          L(
            "Khôi phục cả dữ liệu Việt/Anh và ảnh trong bản nháp? Bản hiện tại có thể hoàn tác.",
            "Restore both languages and draft images? You can undo.",
          ),
        ))
      )
        return;
      const normalized = M.normalize(draft.data);
      remember();
      data = normalized;
      // Keep the original baseline so a stale draft cannot overwrite newer commits.
      sha = draft.sha;
      for (const item of draft.media || []) {
        if (urls.has(item.path)) URL.revokeObjectURL(urls.get(item.path));
        media.set(item.path, item);
        urls.set(
          item.path,
          URL.createObjectURL(new Blob([item.bytes], { type: item.type })),
        );
      }
      changed();
      render();
      notice(
        draft.sha
          ? msg("dirty")
          : L(
              "Nháp thiếu mốc GitHub. Hãy đối chiếu và đăng nhập lại trước khi xuất bản.",
              "Draft has no GitHub baseline; reconcile and sign in again before publishing.",
            ),
      );
    } catch (error) {
      notice(error.message, true);
    }
  };
  $("export").onclick = () => {
    const used = new Set(M.images(data).map((x) => x.src));
    const backup = {
      format: "portfolio-studio-backup",
      version: 1,
      data,
      media: [...media.values()]
        .filter((x) => used.has(x.path))
        .map((x) => ({
          path: x.path,
          type: x.type,
          content: GitHubPublisher.encode(new Uint8Array(x.bytes)),
        })),
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(backup, null, 2)], {
        type: "application/json;charset=utf-8",
      }),
    );
    const a = el("a");
    a.href = url;
    a.download =
      "portfolio-backup-" + new Date().toISOString().slice(0, 10) + ".json";
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 60000);
    notice(
      L(
        "Bản sao lưu chứa hai ngôn ngữ và ảnh mới chưa xuất bản. Ảnh đã công khai được tham chiếu theo đường dẫn repository.",
        "Backup includes both languages and new unpublished images. Published images are referenced by repository path.",
      ),
    );
  };
  $("import").onchange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
      if (file.size > 48 * 1024 * 1024)
        throw new Error(L("File sao lưu vượt 48 MB.", "Backup exceeds 48 MB."));
      const parsed = JSON.parse((await file.text()).replace(/^\uFEFF/, ""));
      const value =
        parsed.format === "portfolio-studio-backup" && parsed.version === 1
          ? parsed.data
          : parsed;
      const normalized = M.normalize(value),
        errors = M.validate(normalized);
      if (errors.length) throw new Error(errors.slice(0, 8).join("\n"));
      const uploads = [],
        items = parsed.format === "portfolio-studio-backup" ? parsed.media : [];
      if (!Array.isArray(items) || items.length > 100)
        throw new Error("Invalid backup media");
      for (const item of items) {
        if (
          !/^assets\/uploads\/[a-z0-9-]+\.(jpg|png|webp)$/.test(item.path) ||
          typeof item.content !== "string" ||
          item.content.length > 12 * 1024 * 1024 ||
          uploads.some((x) => x.path === item.path)
        )
          throw new Error("Invalid backup image");
        const bytes = Uint8Array.from(atob(item.content), (c) =>
          c.charCodeAt(0),
        );
        const existing = media.get(item.path);
        if (
          existing &&
          (existing.bytes.byteLength !== bytes.length ||
            new Uint8Array(existing.bytes).some((b, i) => b !== bytes[i]))
        )
          throw new Error(
            L(
              "Bản sao lưu có ảnh cùng đường dẫn nhưng khác nội dung. Không ghi đè ảnh trong nháp hiện tại.",
              "Backup contains a different image at the same path. The current draft image was not overwritten.",
            ),
          );
        const inspected = await inspectFile(new File([bytes], item.path));
        uploads.push({ ...inspected, path: item.path });
      }
      if (
        uploads.reduce((sum, x) => sum + x.bytes.byteLength, 0) >
        32 * 1024 * 1024
      )
        throw new Error("Backup media exceeds 32 MB");
      if (!(await confirm(msg("import"), msg("confirmImport")))) return;
      remember();
      data = normalized;
      // Retain older local images as well so undo can still restore them.
      for (const item of uploads) {
        if (urls.has(item.path)) URL.revokeObjectURL(urls.get(item.path));
        media.set(item.path, item);
        urls.set(
          item.path,
          URL.createObjectURL(new Blob([item.bytes], { type: item.type })),
        );
      }
      changed();
      render();
      notice(msg("dirty"));
    } catch (error) {
      notice(error.message, true);
    } finally {
      event.target.value = "";
    }
  };
  function renderPreview() {
    try {
      const renderer = PortfolioRenderer(data),
        lang = $("preview-language").value,
        project = data.projects.find((x) => x.id === $("preview-page").value);
      const html = renderer.documentHtml(
        lang,
        project,
        project ? renderer.projectPage(lang, project) : renderer.homePage(lang),
      );
      const doc = new DOMParser().parseFromString(html, "text/html"),
        base = new URL(renderer.pagePath(lang, project), root);
      doc.querySelectorAll("script").forEach((s) => s.remove());
      for (const n of doc.querySelectorAll("[src], link[href]")) {
        const attr = n.hasAttribute("src") ? "src" : "href",
          value = new URL(n.getAttribute(attr), base);
        const path = value.href.startsWith(root.href)
          ? value.href.slice(root.href.length)
          : "";
        n.setAttribute(attr, urls.get(path) || value.href);
      }
      doc.querySelectorAll("a").forEach((a) => {
        a.removeAttribute("href");
        a.removeAttribute("target");
      });
      $("preview-frame").srcdoc =
        "<!doctype html>" + doc.documentElement.outerHTML;
    } catch (error) {
      notice(
        L("Chưa xem trước được: ", "Cannot preview yet: ") + error.message,
        true,
      );
    }
  }
  $("preview").onclick = () => {
    const picker = $("preview-page");
    picker.replaceChildren();
    const home = el("option", L("Trang chủ", "Home"));
    home.value = "";
    picker.append(home);
    for (const p of data.projects) {
      const option = el("option", p.name || p.id);
      option.value = p.id;
      picker.append(option);
    }
    $("preview-dialog").showModal();
    renderPreview();
  };
  $("preview-language").onchange = $("preview-page").onchange = renderPreview;
  $("publish").onclick = async () => {
    if (busy) return;
    try {
      const candidate = M.clone(data);
      candidate.updated = new Date().toISOString().slice(0, 10);
      const errors = M.validate(candidate);
      if (errors.length)
        throw new Error(
          L("Chưa thể xuất bản. Cần sửa:\n", "Cannot publish. Please fix:\n") +
            errors.slice(0, 12).join("\n"),
        );
      const used = new Set(M.images(candidate).map((x) => x.src)),
        uploads = [...media.values()].filter((x) => used.has(x.path));
      if (
        !(await confirm(
          msg("publish"),
          msg("publishWarning") +
            "\n\n" +
            L("Ảnh mới: ", "New images: ") +
            uploads.length,
        ))
      )
        return;
      busy = true;
      clearTimeout(timer);
      clearTimeout(draftTimer);
      $("editor").inert = true;
      $("editor-nav").inert = true;
      document.querySelector(".action-bar").inert = true;
      $("logout").disabled = true;
      $("ui-language").disabled = true;
      updateState();
      const result = await api.publish(candidate, uploads, sha, (text) =>
        notice(text),
      );
      data = candidate;
      sha = result.sha;
      dirty = false;
      retainedDraft = null;
      media.clear();
      history = [];
      future = [];
      notice(
        L(
          "Đã lưu vào GitHub. Website đang chờ cập nhật. ",
          "Saved to GitHub. Website deployment is pending. ",
        ),
      );
      const link = el("a", L("Xem lần lưu", "View commit"));
      link.href = result.url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      $("status").append(link, document.createTextNode(" · "));
      const actions = el("a", L("Theo dõi xuất bản", "Deployment status"));
      actions.href = "https://github.com/LeTPhu/Profile-CV/actions";
      actions.target = "_blank";
      actions.rel = "noopener noreferrer";
      $("status").append(actions);
      try {
        await draftOperation("delete");
      } catch {
        /* The published SHA prevents a stale draft from overwriting it. */
      }
    } catch (error) {
      notice(error.message, true);
    } finally {
      busy = false;
      $("editor").inert = false;
      $("editor-nav").inert = false;
      document.querySelector(".action-bar").inert = false;
      $("logout").disabled = false;
      $("ui-language").disabled = false;
      updateState();
      lastActivity = Date.now();
      activity();
    }
  };
  window.addEventListener("beforeunload", (event) => {
    if (dirty || busy) {
      event.preventDefault();
      event.returnValue = "";
    }
  });
  window.addEventListener("pagehide", () => {
    api.logout();
    clearTimeout(timer);
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted && user) signOut(true);
  });
  translate();
})();
