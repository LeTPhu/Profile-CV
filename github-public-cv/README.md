# GitHub Public CV

## Website Của Bạn

- Mã nguồn: https://github.com/LeTPhu/Profile-CV
- Website: https://letphu.github.io/Profile-CV/
- Tiếng Việt: https://letphu.github.io/Profile-CV/?lang=vi
- English: https://letphu.github.io/Profile-CV/?lang=en

Đây là website tĩnh, không cần đăng nhập để xem. Có điều hướng giữa các mục, nút sao chép link theo ngôn ngữ, giao diện điện thoại và bản in A4.

Dữ liệu hiện là minh họa, chưa phải CV thật của chủ sở hữu. Trang sẽ hiện thông báo mẫu khi tên trùng dữ liệu minh họa.

## Cập Nhật Hồ Sơ Thật

1. Chỉnh hai CV trong công cụ tại thư mục gốc.
2. Chọn **Xuất cả Việt + Anh**.
3. Thay nội dung `github-public-cv/data/cv-public.json` bằng JSON vừa xuất.
4. Commit và push lên `main`. Website tự cập nhật qua workflow **Publish CV website**.

Nhập JSON bằng nút xem thử trên website chỉ thay đổi nội dung trên thiết bị đang xem. Link chia sẻ luôn mở dữ liệu đã công bố trong repository.
Nếu dùng ảnh cục bộ, đặt ảnh trong `assets/` và dùng đường dẫn `./assets/ten-anh.jpg` trong JSON; ảnh base64 từ Builder cũng được hỗ trợ.

## Gắn Vào Profile GitHub

Trong **Edit profile**, điền ô **Website** bằng `https://letphu.github.io/Profile-CV/`.
Bạn có thể ghim repository **Profile-CV** vào profile.
Nếu có README profile, thêm liên kết sau:

```markdown
[Xem CV của tôi](https://letphu.github.io/Profile-CV/?lang=vi) · [English CV](https://letphu.github.io/Profile-CV/?lang=en)
```

## Cách Xuất Bản Hiện Tại

Workflow tại `.github/workflows/pages.yml` chỉ đóng gói HTML, CSS, JavaScript, `data/` và `assets/` của website.
Builder và tài liệu vẫn có trong repository, nhưng không được xuất bản vào website.
Thiết lập Pages dùng **GitHub Actions**. Có thể chạy lại bằng **Actions → Publish CV website → Run workflow**.

Cong cu nay dung de hien thi CV cong khai tren GitHub Pages, su dung du lieu JSON xuat ra tu `CV Builder Pro`.

## Muc tieu

- Hien thi CV theo mau 2 cot, in A4.
- Ho tro 2 bo du lieu rieng: `vi` va `en`.
- Chuyen doi ngon ngu ngay tren trang.
- Nhan file JSON tai trinh duyet de test nhanh truoc khi deploy.

## Cau truc thu muc

- `index.html`: giao dien public CV
- `styles.css`: style cho man hinh va print A4
- `app.js`: logic render + load JSON + switch VI/EN
- `data/cv-public.json`: du lieu CV mac dinh duoc repo phuc vu

## Cach cap nhat du lieu CV tu tool chinh

1. Mo tool `CV Builder Pro` trong thu muc goc.
2. Bam `Xuat ca Viet + Anh` de xuat file JSON day du 2 CV.
3. Doi ten file vua xuat thanh `cv-public.json`.
4. Ghi de file vao `github-public-cv/data/cv-public.json`.
5. Reload trang public de kiem tra.

Ghi chu:
- Neu chi nhap 1 CV (single doc), app public se cap nhat vao ngon ngu dang chon (`vi` hoac `en`) va giu nguyen ngon ngu con lai.
- Neu nhap JSON co `documents.vi` va `documents.en`, app se cap nhat dong thoi ca 2 CV.

## Deploy len GitHub Pages

### Cach 1: Repo rieng cho CV public (de quan ly)

1. Tao repo moi, vi du: `yourname-public-cv`.
2. Copy toan bo file trong thu muc `github-public-cv` vao repo moi (de o root).
3. Push len GitHub.
4. Vao `Settings` -> `Pages`.
5. Chon:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
6. Luu lai. Sau 1-2 phut, trang se co URL dang:
   - `https://<username>.github.io/<repo-name>/`

### Cach 2: Dat trong mot repo lon hien co

1. Dat thu muc `github-public-cv` ben trong repo.
2. Vao `Settings` -> `Pages`.
3. Chon source la `GitHub Actions`.
4. Dung workflow `.github/workflows/pages.yml` de publish dung thu muc nay. Branch publishing chi ho tro root hoac /docs, khong chon truc tiep /github-public-cv.

## Tuy bien nhanh

- Doi font: sua `theme.fontPreset` trong JSON (`be_vietnam` hoac `roboto`).
- Doi bo cuc: `theme.layout` = `left`, `right`, hoac `stacked`.
- Doi ti le sidebar: `theme.sidebarWidth` (22-48).
- Doi khoang cach 2 cot giai thuong: `theme.awardColumnGap`.
- Bat/tat section: sua object `visibility`.

## In / xuat PDF

- Bam nut `In / Xuat PDF` tren trang.
- App dung print-style A4, giu bo cuc va mau nen gan nhat voi giao dien hien thi.

