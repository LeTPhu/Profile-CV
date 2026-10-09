# CV Builder Pro

## Website Và Repository

- Repository: https://github.com/LeTPhu/Profile-CV
- Website GitHub Pages: https://letphu.github.io/Profile-CV/
- Công cụ chỉnh sửa nằm tại thư mục gốc, mở `index.html` trên máy.
- Website dành cho người xem nằm trong `github-public-cv/`. Chỉ thư mục này được xuất bản lên GitHub Pages.
- Website đã dùng dữ liệu thật từ `Le_Tan_Phu_CV_2026.pdf`; dữ liệu nguồn ở `github-public-cv/data/portfolio.json`.
- Trang cá nhân có hai phiên bản HTML Việt/Anh và trang chi tiết cho từng dự án. CV A4 nằm tại `github-public-cv/cv.html`.
- Thêm ảnh hoặc cập nhật nội dung theo hướng dẫn trong `github-public-cv/README.md`, rồi chạy `node scripts/build-portfolio.cjs`.

Website là HTML/CSS/JavaScript tĩnh, không cần máy chủ ứng dụng hoặc cơ sở dữ liệu.
Mỗi lần đẩy thay đổi trong `github-public-cv/` lên nhánh `main`, workflow `Publish CV website` kiểm tra mã và cập nhật GitHub Pages.
Xem hướng dẫn cập nhật và gắn link vào profile tại [github-public-cv/README.md](github-public-cv/README.md).

Cong cu tao CV 2 cot hien dai, ho tro 2 ho so rieng biet:

- CV Tieng Viet (`vi`)
- English CV (`en`)

## Tinh nang chinh

- Form chi tiet cho:
  - Thong tin ca nhan
  - Kinh nghiem
  - Hoc van
  - Du an
  - Ky nang
  - Ngon ngu
  - Chung chi
  - Giai thuong
  - Custom section (them/xoa/sap xep)
- Chinh giao dien:
  - Font (`Be Vietnam Pro`, `Roboto`)
  - Mau chu dao
  - Layout (`left`, `right`, `stacked`)
  - Co chu tong, co chu tieu de section, co chu tieu de entry
  - Line-height, khoang cach cac khoi
  - Ti le sidebar, padding sidebar, khoang cach cac block sidebar
  - Kich thuoc anh, do day vien anh
  - Khoang cach 2 cot trong block giai thuong
  - Can deu noi dung (justify) bat/tat
- Bat/tat tung section va tung truong contact.
- Tu dong luu state vao `localStorage`.
- Anh lon hon 1 MB duoc tu dong thu nho/toi uu truoc khi luu de giam nguy co day `localStorage`.
- Tu dong an section khong co noi dung, tranh de lai tieu de rong tren CV.
- In/Xuat PDF A4.

## Kiem tra chat luong

Chay `node verify-all.cjs` de mo Chromium headless va kiem tra cac luong chinh, tinh huong loi, responsive va xuat mot CV dai nhieu trang thanh PDF thuc te. File PDF kiem thu duoc ghi vao `output/playwright/long-cv.pdf`.

## Import / Export da tach rieng

- `Xuat CV hien tai`:
  - Chi xuat document dang mo (`vi` hoac `en`)
- `Nhap CV hien tai`:
  - Chi import vao document dang mo
  - Khong anh huong den document con lai
- `Xuat ca Viet + Anh`:
  - Xuat full state co du `documents.vi` va `documents.en`
- `Nhap ca Viet + Anh`:
  - Import full state cho ca 2 CV
  - Neu file la single doc thi chi cap nhat doc dang mo

## Chay du an

1. Mo file `index.html` trong trinh duyet.
2. Chinh sua noi dung o cot trai.
3. Xem ket qua realtime o cot phai.
4. Bam `In / Xuat PDF` de tao ban in.

## Thu muc bo sung: publish CV cong khai len GitHub

Da them thu muc moi:

- `github-public-cv/`

Thu muc nay chua website ca nhan, cac trang du an va trang CV A4, co huong dan day du trong:

- `github-public-cv/README.md`

