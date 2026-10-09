# Website Cá Nhân Lê Tấn Phú

Website tĩnh sử dụng dữ liệu từ **Le_Tan_Phu_CV_2026.pdf** và các ảnh giấy khen/chứng nhận do chủ hồ sơ cung cấp, cập nhật ngày **09/10/2026**. Nội dung tiếng Anh được dịch từ các nguồn này; không tự bổ sung kinh nghiệm hoặc chứng chỉ không có minh chứng.

## Các Đường Dẫn

- Trang cá nhân: https://letphu.github.io/Profile-CV/
- English: https://letphu.github.io/Profile-CV/en/
- CV A4: https://letphu.github.io/Profile-CV/cv.html
- PDF gốc: https://letphu.github.io/Profile-CV/assets/cv/Le_Tan_Phu_CV_2026.pdf
- Mã nguồn: https://github.com/LeTPhu/Profile-CV
- Quản trị: https://letphu.github.io/Profile-CV/admin/

Trang chủ có giới thiệu, học vấn, 7 dự án/nghiên cứu, 2 kinh nghiệm, kỹ năng, công cụ, 6 thành tích, thư viện 5 giấy khen/chứng nhận và liên hệ. Mỗi dự án có một trang chi tiết riêng cho từng ngôn ngữ. Giao diện dùng Be Vietnam Pro, tông xanh rừng/kem và điểm nhấn vàng cho tư liệu.

## Nơi Chỉnh Nội Dung

### Chỉnh Trực Tiếp Trên Website

Mở **Quản trị** ở cuối trang hoặc truy cập `/admin/`. Trang quản trị dành cho tài khoản GitHub **LeTPhu**, không phải dịch vụ đăng ký tài khoản cho khách. GitHub Pages chỉ phục vụ trang tĩnh nên không đặt mật khẩu hoặc khóa bí mật trong mã website.

1. Mở [trang tạo fine-grained personal access token](https://github.com/settings/personal-access-tokens/new).
2. Chọn Resource owner **LeTPhu**, thời hạn ngắn (ví dụ 7 ngày), Repository access **Only select repositories → Profile-CV**.
3. Repository permissions: **Contents → Read and write**, **Metadata → Read-only**. Không cần quyền Workflow, Administration hay quyền toàn bộ tài khoản.
4. Tạo mã và nhập vào ô **Mã truy cập GitHub**. Không nhập mật khẩu GitHub, không chia sẻ mã và không gửi mã trong cuộc trò chuyện.
5. Sau khi xác thực, chọn nhóm thông tin để sửa. Các ô **TIẾNG VIỆT** và **ENGLISH** độc lập; nội dung dùng chung như tên, công nghệ và liên kết chỉ có một ô.
6. Dùng **Xem trước** để kiểm tra trang chủ hoặc từng dự án ở cả hai ngôn ngữ. **Bố cục & ngôn ngữ** cho phép đổi thứ tự, ẩn/hiện các khối và bật/tắt chọn ngôn ngữ tự động. **Mục tự thêm** hỗ trợ đoạn văn, gạch đầu dòng và ảnh.
7. Chọn **Xuất bản lên GitHub**, kiểm tra cảnh báo rồi xác nhận. Ảnh và dữ liệu được lưu cùng một commit; workflow dựng lại trang Việt/Anh và CV A4. Xem liên kết **Theo dõi xuất bản** để biết kết quả. Lưu thành công vào GitHub chưa đồng nghĩa website đã triển khai xong.

Mã truy cập chỉ giữ trong bộ nhớ của tab, không được ghi vào localStorage, sessionStorage, IndexedDB, URL, bản sao lưu hay repository. Phiên kết thúc khi đăng xuất, rời trang hoặc sau 20 phút không hoạt động. GitHub kiểm tra quyền ghi ở phía máy chủ; ẩn giao diện quản trị không phải biện pháp bảo mật. Mã chỉ được gửi đến `api.github.com`. Khi không dùng nữa, thu hồi mã trong GitHub Settings. Đây là đăng nhập bằng **mã truy cập GitHub**, chưa phải OAuth một chạm hay tài khoản email/mật khẩu riêng. Xem [hướng dẫn bảo vệ token của GitHub](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens).

### Bản Nháp Và Sao Lưu

- Bản nháp tự lưu sau khi thay đổi, trên **trình duyệt và thiết bị hiện tại** bằng IndexedDB; ảnh mới giữ nguyên byte gốc. Nếu trình duyệt chặn lưu hoặc hết dung lượng, giao diện báo lỗi và yêu cầu sao lưu file.
- **Lưu nháp** không xuất bản. **Khôi phục nháp** cần xác nhận; nháp giữ mốc GitHub ban đầu để không ghi đè bản mới hơn.
- **Sao lưu** xuất JSON UTF-8 chứa cả Việt/Anh và ảnh mới chưa xuất bản. Ảnh đã có trong repository được tham chiếu theo đường dẫn, không tải lại toàn bộ thư viện vào bản sao lưu. File không chứa mã truy cập. Không coi đây là bản sao đầy đủ độc lập của toàn bộ repository; để sao lưu toàn bộ cả ảnh cũ, tải repository riêng.
- **Nhập bản sao lưu** chấp nhận bản `portfolio-studio-backup` hoặc file `portfolio.json` đầy đủ, không nhận file CV một ngôn ngữ. Dữ liệu sai, thiếu ngôn ngữ, đường dẫn không an toàn hoặc ảnh giả bị từ chối trước khi thay nội dung hiện tại. Hoàn tác/làm lại giữ tối đa 40 thao tác.
- Khi repository thay đổi từ lúc đăng nhập, xuất bản sẽ dừng, không ép ghi đè. Sao lưu nháp, đăng xuất và đăng nhập lại để tải bản mới. Đối chiếu các nội dung mới rồi nhập/áp dụng nháp một cách chủ động; không có tự động gộp thay đổi.
- Chỉ nhận JPG/PNG/WebP, tối đa **8 MB/ảnh**, **40 megapixel/ảnh**, **32 MB ảnh mới/lần xuất bản**; không nhận SVG/HEIC. Ảnh vào `assets/uploads/` với tên ngẫu nhiên; điều chỉnh khung ảnh bằng vị trí CSS, không thay nội dung gốc. File dữ liệu nội dung tối đa 900 KB.
- Tất cả dữ liệu xuất bản và repository đều công khai. Không tải giấy tờ nhạy cảm, mật khẩu, mã tài khoản hoặc tài liệu của người khác chưa được cho phép. Ẩn/xóa mục chỉ bỏ khỏi giao diện hiện tại, không xóa dữ liệu khỏi GitHub history và không tự xóa file ảnh đã xuất bản.

### Ngôn Ngữ Cho Người Xem

Website có HTML Việt/Anh dựng sẵn. Lần đầu vào trang Việt, trình duyệt ưu tiên tiếng Anh sẽ tự chuyển sang bản English tương ứng, giữ nguyên đường dẫn dự án, tham số và vị trí đang xem. Trình duyệt tiếng Việt tiếp tục dùng tiếng Việt; ngôn ngữ khác không khớp Việt/Anh sẽ giữ trang hiện tại. Khách có thể chọn **VI/EN**, lựa chọn được lưu nếu trình duyệt cho phép; `?lang=vi` hoặc `?lang=en` có ưu tiên cao nhất và vẫn hoạt động khi chặn lưu trữ. Truy cập trực tiếp đường dẫn `/en/` thể hiện lựa chọn đọc English. Không tự dịch nội dung người quản trị mới nhập: cần điền rõ cả hai cột.

Các file hỗ trợ quản trị là `admin/`, `portfolio-model.js` (kiểm tra dữ liệu), `portfolio-renderer.js` (mẫu hiển thị dùng chung), `language.js` (chọn ngôn ngữ). Trình xem trước dùng iframe không cho chạy script. Kiểm thử tổng hợp: `node verify-all.cjs`; các ca xuất bản trong `verify-admin.cjs` sử dụng GitHub mô phỏng, không ghi nội dung kiểm thử lên repository thật.

Nguồn dữ liệu chính là **data/portfolio.json**. Các trường có `vi` và `en` là nội dung Việt/Anh độc lập.

| Trường | Nội dung |
| --- | --- |
| `profile` | Tên, định hướng, giới thiệu, email, điện thoại, địa chỉ, GitHub, ảnh và PDF |
| `education` | Trường, bằng cấp, thời gian, GPA và xếp loại |
| `experience` | Vai trò, đơn vị, thời gian và các ý mô tả |
| `skills`, `tools`, `english` | Kỹ năng, công cụ và khả năng tiếng Anh |
| `awards` | Thời gian, tên thành tích và mô tả |
| `certificates` | Ảnh minh chứng, tên, đơn vị cấp, ngày cấp, phân loại và mô tả Việt/Anh |
| `projects` | Mô tả, đóng góp, kết quả ghi nhận, công nghệ, ảnh và repository |
| `customSections` | Mục tùy chỉnh song ngữ, đoạn văn, danh sách ý và ảnh |
| `settings` | Thứ tự/ẩn hiện các khối, ngôn ngữ tự động và thống kê học bổng |
| `content.vi`, `content.en` | Tiêu đề, lời giới thiệu và nhãn tùy chỉnh riêng từng ngôn ngữ |
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

## Giấy Khen Và Chứng Nhận

Thư viện tại `#certificates` chứa 5 tư liệu có tên **Lê Tấn Phú**, chọn từ thư mục giấy khen của chủ hồ sơ. Các ảnh được sao chép nguyên bản, không sửa chữ, ngày tháng, con dấu hoặc chữ ký. Khung ảnh dùng chế độ hiển thị trọn ảnh; không cắt giấy. Ảnh lớn chỉ được yêu cầu khi gần khu vực tư liệu hoặc khi mở xem.

| Ảnh nguồn | Ảnh công khai | Tư liệu |
| --- | --- | --- |
| `1690384143145.jpg` | `assets/certificates/ai-first-prize.jpg` | Giấy khen Giải Nhất AI, ngày cấp 05/07/2023 |
| `1690383645144.jpg` | `assets/certificates/software-first-prize.jpg` | Giấy khen Giải Nhất Kỹ thuật phần mềm, ngày cấp 31/05/2023 |
| `1690384143157.jpg` | `assets/certificates/software-participation.jpg` | Chứng nhận tham gia Kỹ thuật phần mềm, 28/04/2023 |
| `1690384143165.jpg` | `assets/certificates/ai-participation.jpg` | Chứng nhận tham gia AI, 25/05/2023 |
| `1690384143173.jpg` | `assets/certificates/solve-problems-to-lead.jpg` | Chứng nhận talkshow SAC, 29/03/2023 |

Chọn bản trắng đen thẳng, rõ của giấy khen Kỹ thuật phần mềm thay vì ảnh màu chụp nghiêng. Không đưa thêm các bản trùng, ảnh bìa bằng THPT, bằng THPT có ngày sinh/số hiệu bằng, chứng nhận nghề phổ thông có thông tin cá nhân, hoặc bản HEIC lên repository. Thư mục nguồn không bị thay đổi.

Theo xác nhận của chủ hồ sơ, **giữ nguyên mốc thành tích trong CV**: AI 04/2023, Kỹ thuật phần mềm 03/2023. Ngày cấp giấy được ghi riêng, không dùng để thay thế mốc CV. Giấy khen Kỹ thuật phần mềm in năm cuộc thi 2022; ảnh được giữ nguyên, không suy diễn hoặc tự sửa nội dung trên giấy. Các thành tích 2024, học bổng và tốt nghiệp chưa có ảnh tương ứng trong thư mục này, nên không gắn minh chứng sai hoặc tạo giấy tờ giả.

Thêm tư liệu mới:

1. Đặt ảnh đã kiểm tra thông tin cá nhân vào `assets/certificates/`.
2. Thêm một mục trong `certificates`, với `id` duy nhất và tên file chính xác.
3. Điền cả hai ngôn ngữ; `issued` là ngày cấp trên giấy, dạng YYYY-MM-DD.
4. Điền kích thước thực của ảnh ở `width`/`height`, rồi chạy lệnh dựng website.

```json
{
  "id": "new-certificate",
  "category": "participation",
  "issued": "2026-10-09",
  "src": "assets/certificates/new-certificate.jpg",
  "width": 2400,
  "height": 1700,
  "title": { "vi": "Tên chứng nhận", "en": "Certificate title" },
  "issuer": { "vi": "Đơn vị cấp", "en": "Issuing organisation" },
  "description": { "vi": "Mô tả đúng nội dung trên giấy.", "en": "An accurate description of the document." },
  "alt": { "vi": "Mô tả ảnh, tên người nhận và nội dung chứng nhận.", "en": "Describe the image, recipient and certificate content." }
}
```

`category` nhận `award` (giấy khen) hoặc `participation` (chứng nhận tham gia). Để nối một thành tích với tư liệu, thêm `certificate` vào mục tương ứng trong `awards`, với giá trị là `id` của tư liệu. Bộ dựng kiểm tra ID trùng, file thiếu, đường dẫn ra ngoài `assets/`, ngày cấp không hợp lệ và bản dịch thiếu.

Chọn ảnh để mở cửa sổ xem. Có thể chuyển ảnh bằng hai nút hoặc phím mũi tên, phóng to để đọc chữ, mở/tải ảnh gốc và đóng bằng Escape. Khi đang phóng to, phím mũi tên không chuyển ảnh ngoài ý muốn. Cửa sổ giữ điều hướng Tab bên trong và trả vị trí bàn phím về nút vừa mở khi đóng. Bộ lọc tư liệu độc lập với bộ lọc dự án. Không có JavaScript vẫn xem được nội dung và mở được ảnh gốc.

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

Chạy `node verify-all.cjs` khi máy đã có Playwright để kiểm tra Builder, CV A4 và portfolio. Bộ kiểm tra gồm hai ngôn ngữ, đường dẫn các trang, PDF, bộ lọc, menu bàn phím, màn hình 320-1440 px, lỗi clipboard/ảnh và khả năng đọc khi không có JavaScript hoặc font Google. Thư viện minh chứng được kiểm tra thêm kích thước ảnh gốc, ảnh không tràn khung, ngày CV không bị thay đổi, vòng điều hướng Tab, chuyển ảnh theo nhóm lọc, phóng to, tải ảnh và khả năng phục hồi sau lỗi ảnh.

Cấu trúc trang và mô tả ảnh tham khảo hướng dẫn [W3C về cấu trúc trang](https://www.w3.org/WAI/tutorials/page-structure/) và [W3C về ảnh](https://www.w3.org/WAI/tutorials/images/). Chuyển động tôn trọng [prefers-reduced-motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion).

Cửa sổ xem ảnh tham khảo [W3C Modal Dialog Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) và [MDN về dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog). Việc trì hoãn tải ảnh ngoài màn hình tham khảo [web.dev về native lazy loading](https://web.dev/articles/browser-level-image-lazy-loading). Các minh họa mạng/nút trong dự án là đồ họa trang trí, được ghi rõ là minh họa lĩnh vực, không phải ảnh chụp một sản phẩm đã triển khai.

## Gắn Vào Profile GitHub

Trong **Edit profile**, điền ô **Website** bằng `https://letphu.github.io/Profile-CV/`. Có thể ghim repository **Profile-CV** hoặc thêm link vào README profile:

```markdown
[Website cá nhân](https://letphu.github.io/Profile-CV/) · [English](https://letphu.github.io/Profile-CV/en/) · [CV PDF](https://letphu.github.io/Profile-CV/assets/cv/Le_Tan_Phu_CV_2026.pdf)
```

