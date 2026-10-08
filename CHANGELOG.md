# Cập nhật giao diện và độ ổn định

- Làm gọn trang public; thu gọn công cụ nhập JSON; chuyển nhãn thao tác theo Việt/Anh.
- Thêm điều hướng nhanh đến các mục và trạng thái lưu trong trình chỉnh sửa.
- Ô mô tả tự giãn; thông tin liên hệ nhập được nhiều dòng.
- Sửa tràn ngang trên điện thoại ở bố cục sidebar phải.
- Cỡ chữ tổng áp dụng cả sidebar; màu chủ đạo áp dụng cả bản tiếng Anh.
- Giới hạn ảnh nhập 4 MB, kiểm tra định dạng ảnh và xử lý lỗi đọc.
- Kiểm tra cấu trúc JSON trước khi cập nhật, giữ nguyên dữ liệu khi file sai.
- Nhập một bản từ file hai ngôn ngữ chỉ lấy đúng ngôn ngữ được chọn.
- Sao chép riêng các danh sách để việc chỉnh sửa không làm thay đổi dữ liệu mẫu.
- Báo lỗi lưu trình duyệt; lỗi lưu không ngăn trang public xem thử dữ liệu.
- Chờ font trước khi in; giữ bố cục cột trong kiểu in và hạn chế ngắt đôi từng mục.

## Kiểm tra đã thực hiện

Playwright trên Chromium: desktop 1440 px, mobile 390 px, chuyển ngôn ngữ,
liên kết tiếng Anh, nhập dữ liệu độc lập, từ chối JSON sai kiểu, lỗi lưu trình
duyệt và lỗi tải dữ liệu. Kiểm tra CSS in giữ hai cột. Ảnh giao diện tại
`output/playwright/`. Chưa xác minh bản in vật lý hoặc mọi CV dài nhiều trang.

## Sử dụng bản public

Thư mục `github-public-cv` hoạt động độc lập. Khi cập nhật bản đang public,
cần đưa cả `refinements.css` mới lên cùng HTML, JavaScript và dữ liệu.
Nhập JSON trên trang chỉ thay đổi bản xem thử trong trình duyệt; tải lại trang
sẽ ưu tiên dữ liệu trong `data/cv-public.json` của website.

Để xem thử bằng máy chủ cục bộ, chạy tại thư mục gốc:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Mở `http://127.0.0.1:8765/` cho builder hoặc
`http://127.0.0.1:8765/github-public-cv/` cho bản public.
# 2026-10-03 - Final robustness pass

- Tu dong toi uu anh tai len lon hon 1 MB truoc khi luu vao trinh duyet.
- An cac section rong tren Builder va Public CV.
- Them xac nhan truoc khi xoa item va aria state/label cho cac nut quan trong.
- Cai thien quy tac ngat trang khi in CV dai.
- Them `verify-all.cjs` de chay Playwright that, kiem tra failure cases va tao PDF nhieu trang.

