# Website Cá Nhân Lê Tấn Phú

Website tĩnh sử dụng dữ liệu từ **Le_Tan_Phu_CV_2026.pdf**, cập nhật ngày **09/10/2026**. Nội dung tiếng Anh là bản dịch từ CV tiếng Việt, không bổ sung kinh nghiệm hoặc chứng chỉ.

## Các Đường Dẫn

- Trang cá nhân: https://letphu.github.io/Profile-CV/
- English: https://letphu.github.io/Profile-CV/en/
- CV A4: https://letphu.github.io/Profile-CV/cv.html
- PDF gốc: https://letphu.github.io/Profile-CV/assets/cv/Le_Tan_Phu_CV_2026.pdf
- Mã nguồn: https://github.com/LeTPhu/Profile-CV

Trang chủ có giới thiệu, học vấn, 7 dự án/nghiên cứu, 2 kinh nghiệm, kỹ năng, công cụ, 6 thành tích và liên hệ. Mỗi dự án có một trang chi tiết riêng cho từng ngôn ngữ.

## Nơi Chỉnh Nội Dung

Nguồn dữ liệu chính là **data/portfolio.json**. Các trường có `vi` và `en` là nội dung Việt/Anh độc lập.

| Trường | Nội dung |
| --- | --- |
| `profile` | Tên, định hướng, giới thiệu, email, điện thoại, địa chỉ, GitHub, ảnh và PDF |
| `education` | Trường, bằng cấp, thời gian, GPA và xếp loại |
| `experience` | Vai trò, đơn vị, thời gian và các ý mô tả |
| `skills`, `tools`, `english` | Kỹ năng, công cụ và khả năng tiếng Anh |
| `awards` | Thời gian, tên thành tích và mô tả |
| `projects` | Mô tả, đóng góp, kết quả ghi nhận, công nghệ, ảnh và repository |
| `updated` | Ngày cập nhật dạng YYYY-MM-DD |
| `siteUrl` | Đường dẫn gốc của website; dùng cho SEO và sitemap |

Sau khi chỉnh, chạy từ thư mục gốc của repository:

```powershell
node scripts/build-portfolio.cjs
```

Lệnh này tạo lại trang chủ Việt/Anh, các trang dự án, sitemap và `data/cv-public.json` cho CV A4. Không sửa trực tiếp HTML đã sinh vì lần dựng tiếp theo sẽ ghi đè. Nội dung CV A4 cũng được sinh từ `portfolio.json`; các thiết lập `theme` của CV được giữ lại.

## Thêm Ảnh Chân Dung

1. Đặt ảnh thật trong `github-public-cv/assets/photos/`, ví dụ `portrait.webp`.
2. Trong `data/portfolio.json`, cập nhật `profile.photo` như ví dụ.
3. Chạy lệnh dựng website phía trên và kiểm tra trên máy.

```json
{
  "src": "assets/photos/portrait.webp",
  "position": "50% 45%",
  "alt": {
    "vi": "Ảnh chân dung Lê Tấn Phú",
    "en": "Portrait of Le Tan Phu"
  }
}
```

Ảnh chân dung có khung tỷ lệ **4:5**. Nên dùng ảnh tối thiểu 800 × 1000 px, ưu tiên WebP/JPEG. `position` điều chỉnh vị trí cắt ảnh; tăng/giảm giá trị thứ hai để đưa khuôn mặt lên/xuống trong khung. Để `src` rỗng nếu muốn tiếp tục giữ khung chờ ảnh.

## Thêm Ảnh Dự Án

1. Đặt ảnh trong `github-public-cv/assets/projects/`. Có thể tạo thư mục theo dự án, ví dụ `assets/projects/aiocrm/`.
2. Tìm dự án trong `projects` bằng `id`, chẳng hạn `aiocrm`.
3. Cập nhật `image` để thay ảnh bìa. Thêm nhiều ảnh vào `gallery` để hiển thị trên trang chi tiết.

```json
{
  "image": {
    "src": "assets/projects/aiocrm/overview.webp",
    "alt": {
      "vi": "Màn hình tổng quan AIOCRM",
      "en": "AIOCRM overview screen"
    }
  },
  "gallery": [
    {
      "src": "assets/projects/aiocrm/inbox.webp",
      "position": "50% 50%",
      "alt": {
        "vi": "Giao diện Social Inbox của AIOCRM",
        "en": "AIOCRM Social Inbox interface"
      },
      "caption": {
        "vi": "Social Inbox - xử lý trao đổi với khách hàng.",
        "en": "Social Inbox - managing customer conversations."
      }
    }
  ]
}
```

Ảnh bìa dùng ở cả card dự án và trang chi tiết. Card có tỷ lệ **16:10**, bìa trang chi tiết **21:9** trên máy tính và **4:3** trên điện thoại; nên đặt nội dung quan trọng gần tâm ảnh. Gallery dùng tỷ lệ **16:10**. Khuyến nghị ảnh rộng từ 1600 px, nén dung lượng trước khi đưa lên website.

Tên file cần khớp chính xác chữ hoa/thường để tải đúng trên GitHub Pages. Đường dẫn bắt đầu bằng `assets/`, không bắt đầu bằng `/` hoặc `../`. Lệnh dựng báo lỗi nếu ảnh được khai báo nhưng chưa tồn tại. Nếu ảnh lỗi khi tải, trình duyệt sẽ trở về khung chờ ảnh.

## Thêm Dự Án Mới

Sao chép một mục trong `projects`, đặt `id` duy nhất bằng chữ thường, số và dấu gạch ngang. Cập nhật cả `vi` và `en`, công nghệ, ảnh và mô tả.

Các nhóm hỗ trợ là `engineering` (hệ thống/web), `research` (nghiên cứu) và `ai` (AI ứng dụng). `repository` chỉ điền đường dẫn GitHub công khai phù hợp; để rỗng nếu chưa có link. Website không tạo nút repository giả.

## Xem Thử Và Xuất Bản

```powershell
node scripts/build-portfolio.cjs
node scripts/serve.cjs
```

Mở **http://127.0.0.1:8775/github-public-cv/**. Node chỉ cần cho việc dựng/xem thử; website đã sinh chạy hoàn toàn tĩnh.

Commit và push lên `main` để workflow **Publish CV website** dựng lại và xuất bản. Workflow chỉ đóng gói trang công khai, các trang ngôn ngữ/dự án và tài nguyên liên quan. Builder, script dựng, tài liệu và kết quả kiểm thử không xuất hiện trên website.

Thiết lập GitHub Pages dùng **GitHub Actions**. Có thể chạy lại trong **Actions → Publish CV website → Run workflow**.

## Dữ Liệu Và Phạm Vi

CV PDF gốc được giữ nguyên. Các số liệu AIOCRM là mốc QA **03/10/2026** ghi trong CV, không phải trạng thái CI cập nhật trực tiếp.

QA-TIGER ghi nhận Missing Visual từ **51.57%** đến **65.38%**. CV ghi **+13.80 điểm phần trăm**; phép trừ hai số đã làm tròn cho kết quả 13.81. Website giữ số +13.80 dưới dạng số liệu được CV ghi nhận và không diễn giải thành kết quả chung cho mọi benchmark.

Repository AI-HanhChinh đang rỗng tại thời điểm kiểm tra nên chưa gắn thành link mã nguồn OCR-RAG. Các dự án khác chưa xác định được repository công khai cũng để trống link. Link Violence-Detection dẫn tới repository công khai đã tồn tại.

Nhập JSON trên trang CV A4 chỉ để xem thử trên thiết bị. Nó không cập nhật nội dung trang cá nhân hoặc xuất bản dữ liệu lên GitHub.

## Chất Lượng Và Tham Khảo

Chạy `node verify-all.cjs` khi máy đã có Playwright để kiểm tra Builder, CV A4 và portfolio. Bộ kiểm tra gồm hai ngôn ngữ, đường dẫn các trang, PDF, bộ lọc, menu bàn phím, màn hình 320-1440 px, lỗi clipboard/ảnh và khả năng đọc khi không có JavaScript hoặc font Google.

Cấu trúc trang và mô tả ảnh tham khảo hướng dẫn [W3C về cấu trúc trang](https://www.w3.org/WAI/tutorials/page-structure/) và [W3C về ảnh](https://www.w3.org/WAI/tutorials/images/). Chuyển động tôn trọng [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

## Gắn Vào Profile GitHub

Trong **Edit profile**, điền ô **Website** bằng `https://letphu.github.io/Profile-CV/`. Có thể ghim repository **Profile-CV** hoặc thêm link vào README profile:

```markdown
[Website cá nhân](https://letphu.github.io/Profile-CV/) · [English](https://letphu.github.io/Profile-CV/en/) · [CV PDF](https://letphu.github.io/Profile-CV/assets/cv/Le_Tan_Phu_CV_2026.pdf)
```

