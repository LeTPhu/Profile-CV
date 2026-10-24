# Website Cá Nhân Lê Tấn Phú

Website tĩnh sử dụng dữ liệu từ **Le_Tan_Phu_CV_2026.pdf** và các ảnh giấy khen/chứng nhận do chủ hồ sơ cung cấp, cập nhật ngày **09/10/2026**. Nội dung tiếng Anh được dịch từ các nguồn này; không tự bổ sung kinh nghiệm hoặc chứng chỉ không có minh chứng.

## Chứng Chỉ Google for Education (24/10/2026)

Mục **Chứng chỉ / Certifications** (`#certifications`) đứng riêng sau Kỹ năng, không thuộc Thành tích hoặc thư viện giấy khen/chứng nhận tham gia (`#certificates`). Nguồn là hai PDF chủ hồ sơ cung cấp: Gemini Certified Educator và Gemini Certified Student – University, cùng cấp cho Lê Tấn Phú ngày 22/12/2025 và có hiệu lực đến 22/12/2028.

- `data/portfolio.json` dùng mảng `certifications` độc lập với `certificates`. Mỗi mục có tên và mô tả Việt/Anh, đơn vị cấp, người nhận, ngày cấp, ngày hết hạn, ảnh toàn trang và đường dẫn PDF gốc. `id` chỉ là mã đường dẫn nội bộ, không phải mã xác thực chứng chỉ. Không bổ sung mã hoặc liên kết xác thực chưa được cung cấp.
- `assets/certifications/` giữ PDF gốc nguyên byte. Ảnh PNG 2200 × 1700 được dựng trực tiếp từ trang PDF bằng Poppler, không cắt, chỉnh sửa hoặc tái tạo nội dung. Thông tin nguồn và SHA-256 ở `sources.json`. PDF được mã hóa nhưng đọc được với mật khẩu mở trống; không thay đổi mã hóa hoặc quyền của bản gốc.
- Trang quản trị có nhóm Chứng chỉ riêng, hỗ trợ nội dung hai ngôn ngữ, ảnh, ngày tháng, sắp xếp, xóa/hoàn tác và ẩn/hiện toàn mục. File sao lưu cũ không có mảng này được nạp thành danh sách rỗng. Đường dẫn PDF phải là file có sẵn trong `assets/`; giao diện chưa hỗ trợ tải PDF mới trực tiếp. Chọn/tải ảnh mới vẫn giữ byte gốc như các ảnh minh chứng khác.
- Lightbox dùng chung cơ chế phóng to, bàn phím, giữ focus, ảnh lỗi và tải xuống, nhưng chỉ chuyển qua lại trong cùng nhóm chứng chỉ hoặc cùng nhóm giấy khen. Ngày hết hạn và PDF gốc được cập nhật theo ảnh đang xem, không lưu nhầm thông tin khi chuyển nhóm. Liên kết ảnh/PDF vẫn dùng được khi tắt JavaScript.
- Dữ liệu CV A4 Việt/Anh được dựng từ cùng nguồn. Chứng chỉ hiển thị thành mục riêng; tên chứng chỉ dẫn đến PDF gốc, đơn vị cấp và hai ngày được giữ rõ ràng. Tên người nhận không lặp khi trùng tên ở đầu CV. Bản in tiếng Anh có chứng chỉ dùng khoảng cách giữa các mục gọn hơn, không giảm cỡ chữ hoặc bỏ dự án/thành tích.

Chạy `node scripts/build-portfolio.cjs` để dựng trang và dữ liệu A4, không sửa HTML/JSON generated bằng tay. `node verify-all.cjs` bao gồm `verify-certifications.cjs`: dữ liệu/đường dẫn/ngày tháng, file gốc, hai ngôn ngữ, 320–1440 px, xem ảnh, bàn phím, tải PDF, lỗi ảnh, tắt JavaScript, A4 và quản trị mô phỏng. Nội dung PDF được đối chiếu trực tiếp; không có xác minh chứng chỉ độc lập qua hệ thống của Google.

## Các Đường Dẫn

- Trang cá nhân: https://letphu.github.io/Profile-CV/
- English: https://letphu.github.io/Profile-CV/en/
- CV A4: https://letphu.github.io/Profile-CV/cv.html
- PDF gốc: https://letphu.github.io/Profile-CV/assets/cv/Le_Tan_Phu_CV_2026.pdf
- Mã nguồn: https://github.com/LeTPhu/Profile-CV
- Quản trị: https://letphu.github.io/Profile-CV/admin/

Trang chủ có giới thiệu, học vấn, 7 dự án/nghiên cứu, 2 kinh nghiệm, kỹ năng, công cụ, 2 chứng chỉ Google for Education, 6 thành tích, thư viện 5 giấy khen/chứng nhận và liên hệ. Mỗi dự án có một trang chi tiết riêng cho từng ngôn ngữ. Giao diện dùng Be Vietnam Pro, tông xanh rừng/kem và điểm nhấn vàng cho tư liệu.

Bố cục thu gọn khoảng cách giữa các phần, khung minh họa và thẻ dự án; tên dài được xuống dòng thay vì bị cắt hoặc tràn màn hình. Khi lọc dự án, các thẻ tự lấp đầy số cột còn lại. Trang chi tiết chỉ hiện thư viện khi có ảnh thật; các ô thêm ảnh vẫn giữ đầy đủ trong trang quản trị. Ảnh trong thư viện hiển thị nguyên khung, không cắt nội dung chứng nhận hoặc sơ đồ.

Phần dự án dùng hai cột rộng trên máy tính và một cột trên điện thoại, với dự án đầu tiên được làm nổi bật. Bảy dự án hiện có được thiết kế minh họa ý tưởng riêng bằng SVG; hình gắn với mã dự án nên không bị đổi nhầm khi sắp xếp lại. Minh họa là đồ họa trang trí, không phải ảnh chụp sản phẩm hoặc số liệu thực nghiệm. Khi thêm ảnh thật trong Quản trị, ảnh được ưu tiên hiển thị; dự án mới chưa có ảnh dùng minh họa trung tính. Bộ lọc trên điện thoại xếp thành hai hàng cân đối.

Chữ trên website dùng Be Vietnam Pro nhất quán: giới thiệu và nội dung chi tiết 20 px trên máy tính / 18 px trên điện thoại; mô tả thẻ 18 px / 17 px; nhãn và nút chính 15–17 px. Tiêu đề phần từ 34 đến 48 px. Cỡ nội dung dùng rem, khoảng cách dòng 1.6–1.7 và đoạn văn có độ rộng giới hạn. Menu thu gọn từ 1100 px trở xuống. Thiết lập font của Builder và CV A4 được quản lý riêng.

Trang portfolio tải Be Vietnam Pro từ `assets/fonts/be-vietnam-pro/`, có bốn mức đậm 400/500/600/700 và các bộ ký tự Việt, Latin, Latin mở rộng. Hai bộ chữ thường được preload; các file còn lại tải theo ký tự/mức đậm thực sự sử dụng. File WOFF2 lấy từ Google Fonts, cùng giấy phép SIL OFL và nguồn/SHA-256 được lưu trong thư mục này. Tải lại bằng `../scripts/fetch-portfolio-fonts.cjs`. Cách này giảm phụ thuộc vào kết nối bên ngoài khi mở trang và giúp bố cục chữ nhất quán.

### Nghiên Cứu Và Bố Cục Ngày 13/10/2026

Đã xem trực tiếp giao diện desktop của [Brittany Chiang](https://brittanychiang.com/) và [Adham Dannaway](https://www.adhamdannaway.com/), đọc thêm [Rauno Freiberg](https://rauno.me/), cùng hướng dẫn [NN/g về khả năng đọc](https://www.nngroup.com/articles/legibility-readability-comprehension/) và [W3C về thay đổi cỡ chữ](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html). Những quyết định dưới đây là áp dụng riêng cho nội dung hồ sơ này.

- Từ cách chia nội dung của Brittany: mỗi thẻ dự án có tên, một mô tả, ba công nghệ tiêu biểu và liên kết chi tiết. Tiêu đề phụ, số thứ tự và các mũi tên lặp được giảm; đầy đủ đóng góp và công nghệ vẫn ở trang chi tiết.
- Từ cách đặt điểm nhấn của Adham: tên, định hướng và ảnh chân dung là trọng tâm đầu trang. Nhãn trang trí, dòng năm/ngôn ngữ và lớp phủ trên ảnh được bỏ để tạo một điểm nhìn rõ.
- Từ cách dùng chữ có chọn lọc của Rauno và hướng dẫn NN/g: gom nhãn về ít mức cỡ chữ hơn, giảm chữ hoa/giãn chữ, tăng tương phản của nội dung và dùng khoảng cách để phân nhóm thay cho nhiều đường viền.
- Kỹ năng có tiêu đề và icon trên cùng một hàng; công nghệ là danh sách chữ dễ đọc. Thành tích đặt thời gian trước nội dung; chứng nhận dùng hai cột rộng trên desktop và một cột trên điện thoại.
- Ảnh ghép công nghệ dùng logo lớn và tên ngắn, bỏ phụ đề/ghi chú nhỏ trong ảnh. Tên, mô tả và công nghệ vẫn có văn bản HTML để đọc, tìm kiếm và sử dụng với trình đọc màn hình.

Kiểm tra cỡ chữ, tên dài và bố cục ở 320, 390, 768, 1024, 1440 px trong `verify-compact.cjs`. Kiểm tra toàn bộ tương tác, hai ngôn ngữ, ảnh lỗi, quản trị và bản in bằng `verify-all.cjs`. Việc kiểm tra này không phải chứng nhận khả năng tiếp cận toàn diện.

### Dấu Ấn Thiết Kế Ngày 14/10/2026

Đã xem giao diện thực tế của [Dennis Snellenberg](https://dennissnellenberg.com/), tìm hiểu các tương tác trên [Hakim El Hattab](https://hakim.se/), cùng hướng dẫn [NN/g về chuyển động có mục đích](https://www.nngroup.com/articles/animation-purpose-ux/) và [Josh Comeau về CSS transitions](https://www.joshwcomeau.com/animation/css-transitions/). Áp dụng vào portfolio này:

- Tên và ảnh cá nhân làm trọng tâm. Khung ảnh bất đối xứng, lớp nền xanh chanh, hình quỹ đạo và dấu hình học được vẽ bằng CSS/SVG; ảnh gốc và vị trí ảnh do chủ hồ sơ chọn không bị sửa. Monogram lấy từ trường `profile.initials`; favicon LP được đồng bộ với hồ sơ hiện tại.
- Ba lối khám phá AI ứng dụng, hệ thống/web và nghiên cứu có màu nhận diện riêng. Số lượng tính trực tiếp từ dữ liệu, chỉ hiện nhóm có dự án và bỏ toàn bộ khi ẩn phần dự án. Chọn một ô đưa đến bộ lọc tương ứng; thao tác bàn phím đưa focus đến nút lọc đã chọn. Khi không có JavaScript, liên kết vẫn dẫn đến danh sách đầy đủ.
- Dự án đầu danh sách có nền xanh rừng và chữ sáng để tạo điểm nhấn. Chủ sở hữu thay thứ tự thì điểm nhấn theo thứ tự mới. Chế độ lọc và dự án liên quan dùng thẻ tiêu chuẩn; ảnh ghép logo công nghệ vẫn hiển thị đầy đủ.
- Thanh tiến độ đọc ở mép menu phản ánh vị trí cuộn thực tế. Các khối nội dung mới xuất hiện có chuyển động ngắn một lần; phản hồi mũi tên gắn với hover/focus. Không có hiệu ứng chuyển động liên tục hoặc thay thế con trỏ.
- Nội dung mặc định luôn hiển thị. Khi thiếu IntersectionObserver/Web Animations hoặc xem trước trong quản trị, trang vẫn đầy đủ. Thiết lập giảm chuyển động được tôn trọng cả lúc mở trang và khi người xem đổi thiết lập; hiệu ứng đang chạy được hủy.
- Giữ hệ chữ lớn đã kiểm tra, bổ sung điểm nhấn icon ở kỹ năng và nền hình học ở liên hệ. Bản in bỏ các chi tiết trang trí/điều hướng mới và dùng chữ tối trên nền trắng cho dự án mở đầu.

Các ca kiểm tra bổ sung xác minh lối khám phá bằng bàn phím ở cả hai ngôn ngữ, số lượng/bộ lọc đồng bộ, thanh tiến độ từ đầu đến cuối trang, phần ẩn/nhóm rỗng, giảm chuyển động và fallback khi không có observer hoặc JavaScript.

### Câu Chữ Và Phần Xem Nhanh

Theo yêu cầu của chủ hồ sơ, câu chữ dùng giọng giới thiệu vừa phải: “Đang quan tâm”, “Một chút về tôi”, “Công nghệ đã sử dụng”. Bỏ khẩu hiệu dưới chân dung, thay chấm trạng thái bằng icon lĩnh vực và giảm các câu mang tính tự đánh giá. Kinh nghiệm, vai trò, GPA, giải thưởng, ngày tháng và số liệu có trong CV vẫn được giữ; các kết quả thử nghiệm vẫn có ghi phạm vi ở trang chi tiết. Mốc cập nhật 14/10/2026 phản ánh lần chỉnh nội dung giới thiệu này, không phải ngày xác nhận lại các benchmark.

Thẻ dự án có phần “Nội dung thực hiện” / “Work involved” đóng mặc định, gồm bối cảnh và các công việc lấy nguyên từ dữ liệu của từng ngôn ngữ. Sử dụng phần tử [HTML details theo MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/details), mở/đóng được bằng bàn phím và khi không có JavaScript. Thẻ dự án liên quan không lặp phần mở rộng này. Nhãn phần xem nhanh và nhãn điều hướng lĩnh vực có thể sửa riêng cho Việt/Anh trong quản trị.

Trên máy tính, học vấn được đặt cạnh tiêu đề giới thiệu để phần đầu khối gọn hơn; ảnh chứng nhận có viền mảnh như khung tư liệu. Khung ảnh ghép công nghệ có chiều rộng xác định để không phóng lớn hoặc cắt ảnh khi mở phần mô tả. Các ca kiểm tra bổ sung mở/đóng nội dung ở năm độ rộng, đối chiếu với dữ liệu gốc và kiểm tra trạng thái mở khi in. Bản in bỏ nút mở/đóng, giữ phần nội dung đã mở và dùng chữ tối trên nền trắng.

### Rà Soát Tiếng Anh Ngày 15/10/2026

- Dùng `Degree of Engineer in Information Technology (Artificial Intelligence)` theo học vị Kỹ sư do chủ hồ sơ xác nhận và cách diễn đạt được lựa chọn cho hồ sơ. [Mô tả chương trình NTTU được đối chiếu](https://fast.ntt.edu.vn/wp-content/uploads/2023/11/2019.-Ba%CC%89n-mo%CC%82-ta%CC%89-CTDT-ca%CC%A3%CC%82p-nha%CC%A3%CC%82t-bo%CC%82%CC%89-sung.pdf) là của ngành Công nghệ kỹ thuật hóa học, không phải văn bằng cá nhân hoặc bằng chứng về tên tiếng Anh chính thức của khóa CNTT này. Khi có bằng song ngữ hoặc bản dịch công chứng, ưu tiên đúng tên trên giấy tờ. Không tự quy đổi sang Bachelor, Master hoặc một trình độ của Mỹ. [Stanford](https://aa.stanford.edu/academics-admissions/graduate-programs/degree-engineer-post-ms-program) cũng dùng cả “Degree of Engineer” và “Engineer's degree” cho chương trình sau M.S.; chỉ thay cách diễn đạt không xác nhận tương đương văn bằng.
- Dùng `The Saigon International College (SGI)` theo [website của SGI](https://sgicollege.edu.vn/). Giữ nguyên `365 Ecosystem JSC (365 EJSC)` ở cả hai ngôn ngữ theo xác nhận của chủ hồ sơ. [Bài viết của Đại học Trà Vinh](https://en.tvu.edu.vn/365-ecosystem-joint-stock-company-works-at-tra-vinh-university/) cũng sử dụng viết tắt `365 EJSC`; không tự thay tên đơn vị thực tập bằng tên một hồ sơ doanh nghiệp khác.
- Tiếng Anh thống nhất chính tả Mỹ, dấu phẩy trong danh sách và ngày dạng `Jul 5, 2023` để không nhập nhằng ngày/tháng. Mốc tháng/năm của thành tích và dự án giữ nguyên. Việc viết đầy đủ `UIT Data Science Challenge 2024` tham khảo [thông báo của UIT](https://www.uit.edu.vn/bai-viet/phat-dong-cuoc-thi-uit-data-science-challenge-2024).
- Phần giới thiệu dùng chung cho website và CV A4 được viết thành một đoạn không dùng đại từ cá nhân, tham khảo [hướng dẫn CV của Harvard](https://careerservices.fas.harvard.edu/resources/gsas-cv-cover-letter-guide-2/). Phần About trên website vẫn có thể dùng ngôi thứ nhất. Nhãn `Experience` và tiêu đề `Professional experience` khớp với phần chỉ gồm kinh nghiệm làm việc.
- Làm mượt mô tả các dự án nhưng không thêm kết quả hoặc vai trò. AIOCRM vẫn là mốc QA ngày 03/10/2026 trong CV; QA-TIGER giữ tháng 09/2026, 51.57%, 65.38% và mức +13.80 điểm phần trăm được ghi nhận, cùng giới hạn phạm vi benchmark. Dùng `quality gating` thay vì suy diễn số lượng gate. Helpdesk vẫn là prototype có phân loại rule-based, không được mô tả thành một mô hình AI đã huấn luyện.
- Helpdesk chỉ ghi con số 13 test cases ở phần kết quả; bullet trước đó nói về phạm vi kiểm thử ở cả Việt/Anh. Bộ dựng A4 còn loại các dòng trùng hoàn toàn sau khi bỏ khoảng trắng đầu/cuối, không dùng so khớp mơ hồ để xóa thông tin chỉ vì trùng số. PDF gốc, ảnh chứng nhận và nội dung số liệu không bị sửa.

Kiểm tra bổ sung đối chiếu tên văn bằng, tên SGI và tên đơn vị 365 đã xác nhận; kiểm tra nhãn Experience, ngày cấp theo US English, số 13 chỉ xuất hiện một lần trong mô tả Helpdesk và việc không lặp kết quả trùng hoàn toàn khi dựng CV A4.

Kiểm tra bản in tiếng Anh còn phát hiện quy tắc giữ nguyên toàn bộ khối sidebar khiến giải thưởng bị đẩy sang một trang thứ ba gần như chỉ có cột phải. CSS in đã được đổi để ngắt giữa các nhóm kỹ năng và giữa các giải thưởng, vẫn giữ từng mục riêng cùng nhau. Với dữ liệu hiện tại, bản A4 tiếng Anh có hai trang mà không giảm cỡ chữ hay bỏ nội dung; có kiểm tra số trang và xem lại ảnh dựng của cả hai trang.

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
- **Lưu nháp** không xuất bản. **Khôi phục nháp** cần xác nhận và chọn bản mới nhất giữa bộ nhớ của tab và IndexedDB, kể cả sau khi đăng xuất/đăng nhập lại; nháp giữ mốc GitHub ban đầu để không ghi đè bản mới hơn. Bản trong bộ nhớ chỉ tồn tại khi tab còn mở; hãy xuất sao lưu nếu trình duyệt không cho lưu nháp.
- **Sao lưu** xuất JSON UTF-8 chứa cả Việt/Anh và ảnh mới chưa xuất bản. Ảnh đã có trong repository được tham chiếu theo đường dẫn, không tải lại toàn bộ thư viện vào bản sao lưu. File không chứa mã truy cập. Không coi đây là bản sao đầy đủ độc lập của toàn bộ repository; để sao lưu toàn bộ cả ảnh cũ, tải repository riêng.
- **Nhập bản sao lưu** chấp nhận bản `portfolio-studio-backup` hoặc file `portfolio.json` đầy đủ, không nhận file CV một ngôn ngữ. Dữ liệu sai, thiếu ngôn ngữ, đường dẫn không an toàn hoặc ảnh giả bị từ chối trước khi thay nội dung hiện tại. Hoàn tác/làm lại giữ tối đa 40 thao tác.
- Khi repository thay đổi từ lúc đăng nhập, xuất bản sẽ dừng, không ép ghi đè. Sao lưu nháp, đăng xuất và đăng nhập lại để tải bản mới. Đối chiếu các nội dung mới rồi nhập/áp dụng nháp một cách chủ động; không có tự động gộp thay đổi.
- Chỉ nhận JPG/PNG/WebP, tối đa **8 MB/ảnh**, **40 megapixel/ảnh**, **32 MB ảnh mới/lần xuất bản**; không nhận SVG/HEIC. Ảnh vào `assets/uploads/` với tên ngẫu nhiên; điều chỉnh khung ảnh bằng vị trí CSS, không thay nội dung gốc. File dữ liệu nội dung tối đa 900 KB.
- Tất cả dữ liệu xuất bản và repository đều công khai. Không tải giấy tờ nhạy cảm, mật khẩu, mã tài khoản hoặc tài liệu của người khác chưa được cho phép. Ẩn/xóa mục chỉ bỏ khỏi giao diện hiện tại, không xóa dữ liệu khỏi GitHub history và không tự xóa file ảnh đã xuất bản.

### Ngôn Ngữ Cho Người Xem

Website có HTML Việt/Anh dựng sẵn. Lần đầu vào trang Việt, trình duyệt ưu tiên tiếng Anh sẽ tự chuyển sang bản English tương ứng, giữ nguyên đường dẫn dự án, tham số và vị trí đang xem. Trình duyệt tiếng Việt tiếp tục dùng tiếng Việt; ngôn ngữ khác không khớp Việt/Anh sẽ giữ trang hiện tại. Khách có thể chọn **VI/EN**, lựa chọn được lưu nếu trình duyệt cho phép; `?lang=vi` hoặc `?lang=en` có ưu tiên cao nhất và vẫn hoạt động khi chặn lưu trữ. Truy cập trực tiếp đường dẫn `/en/` thể hiện lựa chọn đọc English. Không tự dịch nội dung người quản trị mới nhập: cần điền rõ cả hai cột.

CV A4 tại `/cv.html` dùng cùng lựa chọn VI/EN với website, nhận diện ngôn ngữ trình duyệt khi mở trực tiếp và tôn trọng thiết lập bật/tắt tự chọn ngôn ngữ. Nút in và tiêu đề CV đổi theo ngôn ngữ đang xem. PDF gốc do chủ hồ sơ cung cấp vẫn giữ nguyên; để xuất bản A4 tiếng Anh, chọn English CV rồi In / Lưu PDF.

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

## Bộ Ảnh Bìa Dự Án

Bảy ảnh bìa hiện tại là `assets/project-covers/*-stack-v2.webp`, ghép từ logo công nghệ và tên mô hình/phương pháp có trong dữ liệu CV. Logo OpenClaw, 9router, SQLModel và PaddleOCR lấy từ repository của dự án. Logo web, hạ tầng và Colab lấy từ Simple Icons, có ghi nguồn thương hiệu. Các phương pháp như Bi-LSTM, Modality Dropout, RAG hay RBAC được trình bày bằng tên và biểu tượng chung, không được mô tả như logo thương hiệu. Các provider trong ảnh agent là những provider đã thử nghiệm. Bản v2 dùng logo và tên lớn; bản v1 có thêm tiêu đề/ghi chú, được giữ để có thể chọn lại.

Ảnh WebP 1200 × 800 hiển thị đầy đủ, có mô tả thay thế tiếng Việt/Anh. Trang chi tiết ưu tiên tải ảnh bìa; thẻ dự án tải ảnh khi gần vùng nhìn thấy. Khi ảnh lỗi, trang dùng SVG dự phòng. Chủ sở hữu có thể thay ảnh trong quản trị. Bộ ảnh ghép logo không mang nhãn AI; các ảnh AI cũ `*-concept-v1.webp` / `*-concept-v2.webp` vẫn có nhãn tương ứng nếu chọn lại.

Cấu hình ghép ảnh ở `../scripts/technology-covers.json`, công cụ dựng ở `../scripts/build-technology-covers.cjs`. Chạy với Playwright và Sharp: `node scripts/build-technology-covers.cjs`, hoặc truyền `--sharp-path` khi dùng Sharp từ runtime có sẵn. Kết quả PNG/HTML xem thử nằm trong `../output/technology-covers/`. Công cụ này dựng ảnh cục bộ từ tài nguyên đã lưu, không yêu cầu tài khoản tạo ảnh.

Nguồn, commit đã cố định, màu thương hiệu và SHA-256 nằm trong `assets/technology-logos/sources.json`. Các file logo gốc và giấy phép được giữ cùng thư mục. `../scripts/fetch-technology-logos.cjs` tải lại đúng các phiên bản đã ghi. Simple Icons dùng CC0 cho bộ icon; bản ghi nguồn cũng giữ thông tin giấy phép upstream khi có, gồm Vue.js (CC-BY-NC-SA-4.0). Các thương hiệu thuộc chủ sở hữu tương ứng. Logo chỉ nhận diện công nghệ trong hồ sơ.

Ảnh AI trước đây và prompt ở `../scripts/project-cover-prompts.json` / `../scripts/project-cover-prompts-v2.json` được giữ lại. Khi thay công nghệ của dự án, cần cập nhật cấu hình và dựng lại ảnh ghép.

## Gắn Vào Profile GitHub

Trong **Edit profile**, điền ô **Website** bằng `https://letphu.github.io/Profile-CV/`. Có thể ghim repository **Profile-CV** hoặc thêm link vào README profile:

```markdown
[Website cá nhân](https://letphu.github.io/Profile-CV/) · [English](https://letphu.github.io/Profile-CV/en/) · [CV PDF](https://letphu.github.io/Profile-CV/assets/cv/Le_Tan_Phu_CV_2026.pdf)
```

