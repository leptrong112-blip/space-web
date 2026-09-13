# Khám Phá Vũ Trụ

Một đài quan sát cá nhân và nhật ký khám phá thiên văn của Phúc.

## Xem trên máy

Với Node.js đã cài đặt, mở terminal tại thư mục dự án và chạy:

```sh
node preview.cjs
```

Mở http://127.0.0.1:4173. Server chỉ lắng nghe trên máy này và hỗ trợ các file Brotli của bản Unity. Dừng bằng Ctrl+C. Không cần cài package.

## Các phần

- `index.html`, `style.css`, `script.js`: nội dung chính, dữ liệu thiên thể, sa bàn Three.js và mô phỏng quỹ đạo.
- `observatory.css`, `observatory.js`: phong cách đài quan sát, menu điện thoại, hành trình ánh sáng và sổ quan sát.
- `story.html`, `story.css`, `story.js`: câu chuyện du hành sáu chương.
- `vr-mode.html`: trải nghiệm Biển Sao trên màn hình; không phải WebXR cho kính VR.
- `journey.css`: phần thiết kế chung cho Story Mode và Biển Sao.
- `space-audio.js`: hệ thống âm thanh vũ trụ ngoại tuyến sử dụng Web Audio API (bộ tổng hợp âm ambient, warp, scanner) kết hợp audio cục bộ, không phụ thuộc kết nối bên ngoài.
- `VuTru_WebGL`: bản build Unity độc lập, đã được liên kết trực tiếp vào thanh điều hướng chính và thẻ hành trình số 4.

Sổ quan sát và chương truyện được lưu bằng localStorage của trình duyệt đang dùng; không đồng bộ tài khoản. AstroBot hiện là sổ tay trả lời theo chủ đề có sẵn, không gọi dịch vụ AI.

## Ghi chú khoa học

Sa bàn 3D điều chỉnh kích thước, khoảng cách và tốc độ cho dễ quan sát. Mô phỏng 2D dùng đơn vị quy ước, giữ Mặt Trời cố định. Chúng không dùng để dự đoán vị trí thiên thể. Warp và hành trình tới M87* là yếu tố hư cấu.

Nguồn tham khảo cho nội dung đã hiệu chỉnh:

- [NASA — Tổng quan vũ trụ](https://science.nasa.gov/universe/overview/)
- [NASA — Khoảng cách và thời gian ánh sáng](https://science.nasa.gov/learn/basics-of-space-flight/chapter1-1/)
- [NASA — Hố đen](https://science.nasa.gov/universe/black-holes/)

Ảnh được tái sử dụng từ thư mục tài nguyên có sẵn; nguồn gốc và giấy phép của từng ảnh chưa được kiểm chứng toàn bộ. Một số ảnh tinh vân và thư viện Three.js/AOS còn tải từ Internet. Ảnh `Images/Milky Way.jpg` bản lớn được giữ lại làm tài nguyên gốc, không thêm vào trang mới.

## Các thay đổi của bản đài quan sát

- Trang mở đầu mới, menu điện thoại, lối đi trực tiếp tới bốn trải nghiệm (Đài quan sát, Cốt truyện, Biển Sao VR, Sa bàn Unity 3D).
- Điều khiển dừng, tốc độ, tên, quỹ đạo và nút "✦ Ngân Hà"; sửa chọn Mặt Trăng và chọn trực tiếp mô hình.
- Khôi phục bộ dữ liệu thành phần cấu trúc (`comp`) cho cả 10 thiên thể Hệ Mặt Trời, mở khóa trọn vẹn chức năng "QUÉT CẤU TRÚC 🔬".
- Sổ lưu thiên thể, tương tác khoảng cách ánh sáng với nguồn NASA.
- Khắc phục lỗi `ReferenceError` trên Timeline lịch sử (`typingTimeout` -> `timelineTypingTimeout`).
- Chuẩn hóa ID Sao Mộc 3D trong Story Mode (`#jupiter-3d-container`).
- Thay thế toàn bộ liên kết âm thanh Pixabay bị lỗi 403 Forbidden bằng hệ thống Web Audio API (`space-audio.js`) và tệp âm thanh nội bộ offline.
- Bỏ bản mô phỏng quỹ đạo trùng trong HTML; cân hệ số để thử được va chạm, quỹ đạo kín và thoát.
- Âm thanh bật theo lựa chọn; Story Mode ghi nhớ chương và bổ sung chú thích.
- Bỏ khóa Gemini công khai khỏi mã nguồn. Khóa cũ chưa được thu hồi ở nhà cung cấp; chủ tài khoản cần thu hồi nếu còn hiệu lực.

Không cần đưa dự án sang một framework chỉ để tiếp tục chăm sóc nó. Những phần mới được tách riêng để dễ chỉnh và giữ được cá tính của bản gốc.
