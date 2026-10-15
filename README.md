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
- `black-hole.html`, `black-hole.css`, `black-hole.js`: Hố Đen Tương Tác, mở từ **Trải Nghiệm Mở Rộng**. Trang WebGL 2 độc lập với đĩa bồi tụ chuyển động, đường ánh sáng uốn cong, kéo/vuốt để xoay và cuộn/chụm hai ngón để thu phóng. Có góc nhìn đặt sẵn, tạm dừng, tự xoay, chỉnh độ sáng/tốc độ/chất lượng, chế độ ẩn giao diện và toàn màn hình. Phím mũi tên, `+`/`−`, Space khi chọn khung cảnh; `R` đặt lại góc nhìn, `H` ẩn/hiện giao diện. Không tải thư viện hoặc ảnh từ mạng; tự giảm độ phân giải khi cần và dừng vẽ khi tab bị ẩn. Chế độ giảm chuyển động của hệ điều hành khởi đầu ở trạng thái tạm dừng.
- `journey.css`: phần thiết kế chung cho Story Mode và Biển Sao.
- Trong trang hố đen, nút **Ghi chép** mở bảng **Bên rìa vô cùng.** ở góc phải. Ba mẩu đọc ngắn về vùng tối, đĩa bồi tụ và ánh sáng cong có nút đổi sang góc nhìn tương ứng. Bảng mặc định đóng; đóng bằng nút ×, nút Ghi chép hoặc Esc, và tự thu lại khi ẩn giao diện hay mở tùy chỉnh. Góc nhìn/độ phóng đại hiển thị theo camera hiện tại, không phải số liệu đo một hố đen thật. Nội dung tham khảo [NASA — Anatomy of a Black Hole](https://science.nasa.gov/universe/black-holes/anatomy/).
- `space-audio.js`: hệ thống âm thanh vũ trụ ngoại tuyến sử dụng Web Audio API (bộ tổng hợp âm ambient, warp, scanner) kết hợp audio cục bộ, không phụ thuộc kết nối bên ngoài.
- `VuTru_WebGL`: bản build Unity độc lập, đã được liên kết trực tiếp vào thanh điều hướng chính và thẻ hành trình số 4.

Trang hố đen còn có `black-hole-moments.js`: trong nút **Tùy chỉnh quan sát (☷)** có dấu sáng minh họa, âm thanh tổng hợp (mặc định tắt), chế độ lặng và tải ảnh PNG có chữ ký. Chế độ lặng giảm tốc độ mà không thay đổi lựa chọn tạm dừng; **Hiện điều khiển / Esc / H** trả lại nhịp cũ. Zoom gần hơn khoảng 2,3× sẽ mở một khoảnh khắc điện ảnh dài 5,2 giây, có thể thoát ngay; chỉ kích hoạt lại sau khi lùi xa. Không tự mở khoảnh khắc này khi tạm dừng hoặc bật giảm chuyển động. Mỗi góc nhìn có một lời nhắn; đi một vòng quanh cảnh sẽ gặp một lời nhắn bí mật. Đây là những chi tiết nghệ thuật, không phải mô phỏng vượt chân trời sự kiện.

**Tự xoay** giữ trạng thái bật khi kéo/vuốt, chụm, cuộn, dùng nút zoom hoặc phím mũi tên; lúc giữ tay thì nhường điều khiển, thả tay lại tiếp tục. Tạm dừng vẫn dừng cả chuyển động và tự xoay. Cuối bảng **Ghi chép** có nhật ký riêng với nút lưu; nội dung lưu trong localStorage tại khóa `phuc.black-hole.journal.v1`. Để xóa dòng đã lưu, để trống rồi lưu lại.

`black-hole-audio.js` quản lý âm thanh riêng của trang hố đen. Trong **☷ → Chọn nhạc & âm lượng**, chọn **Trầm sâu / Lơ lửng / Nhịp xa**, chỉnh 0–100% hoặc chọn tệp nhạc từ máy để phát lặp. Ba sắc thái là âm thanh tổng hợp, không phải bản ghi hố đen. Tệp riêng dùng URL blob trong trình duyệt, không gửi lên máy chủ và cần chọn lại sau khi tải lại trang. Âm lượng/sắc thái được nhớ tại `phuc.black-hole.audio.v1`; trạng thái phát không được tự bật lại. Khi ẩn tab, tệp nhạc tạm dừng và âm nền tắt; quay lại tiếp tục nếu trước đó đang bật. Chế độ lặng làm nhỏ âm thanh nhưng giữ nguyên mức âm lượng người dùng đã chọn.

Sổ quan sát và chương truyện được lưu bằng localStorage của trình duyệt đang dùng; không đồng bộ tài khoản. AstroBot hiện là sổ tay trả lời theo chủ đề có sẵn, không gọi dịch vụ AI.

## Ghi chú khoa học

Sa bàn 3D điều chỉnh kích thước, khoảng cách và tốc độ cho dễ quan sát. Mô phỏng 2D dùng đơn vị quy ước, giữ Mặt Trời cố định. Chúng không dùng để dự đoán vị trí thiên thể. Warp và hành trình tới M87* là yếu tố hư cấu.

Hố Đen Tương Tác tích phân gần đúng đường đi ánh sáng với lực hướng tâm, phát hiện các lần tia đi qua mặt phẳng đĩa và lấy mẫu nền sao theo hướng tia thoát. Đĩa bồi tụ và vòng sáng được cách điệu; không mô phỏng đầy đủ hố đen quay Kerr và không dùng để đo đạc. Tham khảo nền tảng kết xuất ánh sáng cong: [Eric Bruneton — A Real-time High-quality Black Hole Shader](https://ebruneton.github.io/black_hole_shader/). Phần triển khai trong dự án là mã độc lập, không sao chép thư viện của nguồn tham khảo.

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
