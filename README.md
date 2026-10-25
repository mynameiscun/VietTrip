# Viettrip — bản bám sát thiết kế PDF (25/10/2026)

## Chạy website

Giải nén cả thư mục. Nháy đúp `index.html` là mở được trong Chrome/Edge. Không cần Node.js hay server, chỉ cần giữ nguyên thư mục `assets` và `fonts`. `Viettrip-Standalone.html` là bản một file (có nhúng SVG, ảnh, phông chữ), phù hợp chia sẻ người khác.

## Vì sao bản này giống PDF hơn bản cũ?

- **Desktop/tablet trên 760px**: `assets/foreground-vector.svg` được xuất trực tiếp từ PDF Canva của người dùng, sau đó tách 6 ảnh nền ra khỏi SVG; vector giữ **nguyên vị trí, font chữ, kerning, nét vẽ, khung và màu** của mẫu. Không dựng lại từ các font đoán thủ công. Mỗi scene dùng ảnh nền gốc PNG/JPEG được trích từ PDF, lưu WebP để nhẹ hơn.
- Mỗi scene có **hai lớp ảnh cùng nguồn**: một tĩnh chống hở viền, một di chuyển nhẹ theo scroll để tạo parallax, còn toàn bộ vector foreground luôn cố định theo thiết kế.
- **Điện thoại <=760px**: layout riêng có chữ HTML thực để dễ đọc và thao tác. Font được gán theo bản phân bổ người dùng: Eastman Alt, Alfa Slab One, Anton, Barlow Condensed, Dosis.
- Bấm nav, nút xem lịch trình, tư vấn, liên hệ qua các lớp tương tác trong suốt trên chính artwork.
- Mẫu PDF là ảnh tĩnh, nên hiệu ứng chuyển động mới sẽ làm khung hình khi đang cuộn khác mẫu là điều bình thường. Khi ảnh đứng yên, độ tương đồng gần như nguyên bản.

## Cấu trúc

`index.html` giao diện, `styles.css` các kiểu hiển thị, `script.js` chuyển động, navigation, popup liên hệ, `assets/*.webp` các ảnh nền, `assets/foreground-vector.svg` toàn bộ lớp chữ/khung/họa tiết vector lấy từ PDF, `fonts/*` bản font người dùng cung cấp và font OFL.

## Font / giấy phép

- **Desktop**: chữ nằm dưới dạng vector outline từ chính PDF, tức chính xác font đã được nhúng trong file gốc, không cần font cài trên máy.
- **Mobile, menu dính, popup**: sử dụng tệp `EastmanAlternateTrial` đúng bộ font người dùng gửi (Regular/Italic/Bold/BoldItalic). Đây là bản TRIAL có giới hạn giấy phép **phi thương mại**; chỉ phù hợp cho dự án xem thử nội bộ. KHÔNG đăng lên website bán tour thương mại khi chưa có giấy phép phù hợp. Chỉ thay font này trong tương lai khi có bản được cấp phép.
- Alfa Slab One, Anton, Dosis được lấy từ gói OFL do người dùng gửi. Barlow Condensed được liên kết Google Fonts, cần Internet cho bản mobile; khi ngoại tuyến sẽ fallback Arial Narrow.

## Chỉnh sửa nội dung

Chữ desktop từ SVG vector để chính xác thiết kế nên không sửa như text HTML. Thay đổi chữ trong PDF/Canva gốc và xuất lại lớp vector nếu muốn giữ chính xác từng nét. Toàn bộ nội dung mobile là HTML có thể sửa trực tiếp trong `index.html`. Ảnh desktop có thể thay trong thư mục `assets` nhưng nên giữ đúng tỷ lệ đã định.

## Form tư vấn

Nút đăng ký mở hộp thoại, khi xác nhận sẽ mở ứng dụng email của người dùng. Không có backend/giả gửi thành công.
