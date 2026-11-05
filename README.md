# Khám Phá Vũ Trụ

Một đài quan sát cá nhân và nhật ký khám phá thiên văn của Phúc.

## Xem trên máy

Với Node.js đã cài đặt, mở terminal tại thư mục dự án và chạy:

```sh
node preview.cjs
```

Mở http://127.0.0.1:4173. Server chỉ lắng nghe trên máy này và hỗ trợ các file Brotli của bản Unity. Dừng bằng Ctrl+C. Không cần cài package.

## Xuất bản miễn phí bằng GitHub Pages

Địa chỉ mặc định của dự án: https://leptrong112-blip.github.io/space-web/.

Website sử dụng GitHub Pages cho repo công khai, không cần thuê máy chủ hoặc mua tên miền. Trong **Settings → Pages → Build and deployment → Source**, chọn **GitHub Actions**. Workflow **Publish observatory** tự kiểm tra và xuất bản mỗi lần đẩy code lên `main`; có thể chạy lại trong tab **Actions** bằng **Run workflow**.

Kiểm tra bản xuất trên máy, không cần cài package:

```sh
node --test tests/black-hole.test.cjs
node scripts/build-pages.cjs
node scripts/check-pages.cjs
```

`dist/` là bản website được sinh tự động và không commit. Script chỉ đưa HTML/CSS/JS cùng Images, Audio và Unity lên web, bỏ ảnh gốc `Images/Milky Way.jpg` không được sử dụng. Các tệp Unity Brotli được giải nén và đổi đường dẫn trong bản xuất để chạy trên hosting tĩnh; bản gốc trong `VuTru_WebGL` vẫn giữ nguyên. Nhật ký của khách vẫn chỉ lưu trong trình duyệt của họ. Việc đổi địa chỉ website hoặc trình duyệt không tự chuyển các ghi chép cũ.

Tài liệu: [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), [workflow xuất bản](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages). Một số thư viện và ảnh vẫn tải từ nguồn ngoài như đã ghi ở dưới.

## Các phần

- `index.html`, `style.css`, `script.js`: nội dung chính, dữ liệu thiên thể, sa bàn Three.js và mô phỏng quỹ đạo.
- `observatory.css`, `observatory.js`: phong cách đài quan sát, menu điện thoại, hành trình ánh sáng và sổ quan sát.
- `story.html`, `story.css`, `story.js`: câu chuyện du hành sáu chương.
- `vr-mode.html`: trải nghiệm Biển Sao trên màn hình; không phải WebXR cho kính VR.
- `voyage-prototype.html`, `voyage-prototype.css`, `voyage-prototype.js`: **Bên kia ô kính**, mở từ **Trải nghiệm mở rộng**. Quan sát qua ô kính khoang tàu và chọn điểm đến ngoài vũ trụ; nút **← Đài quan sát** đưa về trang chính.
- `black-hole.html`, `black-hole.css`, `black-hole.js`: Hố Đen Tương Tác, mở từ **Trải Nghiệm Mở Rộng**. Trang WebGL 2 độc lập với đĩa bồi tụ chuyển động, đường ánh sáng uốn cong, kéo/vuốt để xoay và cuộn/chụm hai ngón để thu phóng. Có góc nhìn đặt sẵn, tạm dừng, tự xoay, chỉnh độ sáng/tốc độ/chất lượng, chế độ ẩn giao diện và toàn màn hình. Phím mũi tên, `+`/`−`, Space khi chọn khung cảnh; `R` đặt lại góc nhìn, `H` ẩn/hiện giao diện. Không tải thư viện hoặc ảnh từ mạng; tự giảm độ phân giải khi cần và dừng vẽ khi tab bị ẩn. Chế độ giảm chuyển động của hệ điều hành khởi đầu ở trạng thái tạm dừng.
- `journey.css`: phần thiết kế chung cho Story Mode và Biển Sao.
- Trong trang hố đen, nút **Ghi chép** mở bảng **Bên rìa vô cùng.** ở góc phải. Ba mẩu đọc ngắn về vùng tối, đĩa bồi tụ và ánh sáng cong có nút đổi sang góc nhìn tương ứng. Bảng mặc định đóng; đóng bằng nút ×, nút Ghi chép hoặc Esc, và tự thu lại khi ẩn giao diện hay mở tùy chỉnh. Góc nhìn/độ phóng đại hiển thị theo camera hiện tại, không phải số liệu đo một hố đen thật. Nội dung tham khảo [NASA — Anatomy of a Black Hole](https://science.nasa.gov/universe/black-holes/anatomy/).
- `space-audio.js`: hệ thống âm thanh vũ trụ ngoại tuyến sử dụng Web Audio API (bộ tổng hợp âm ambient, warp, scanner) kết hợp audio cục bộ, không phụ thuộc kết nối bên ngoài.
- `VuTru_WebGL`: bản build Unity độc lập, đã được liên kết trực tiếp vào thanh điều hướng chính và thẻ hành trình số 4.

Trang hố đen còn có `black-hole-moments.js`: trong nút **Tùy chỉnh quan sát (☷)** có dấu sáng minh họa, âm thanh tổng hợp (mặc định tắt), chế độ lặng và tải ảnh PNG có chữ ký. Chế độ lặng giảm tốc độ mà không thay đổi lựa chọn tạm dừng; **Hiện điều khiển / Esc / H** trả lại nhịp cũ. Zoom gần hơn khoảng 2,3× sẽ mở một khoảnh khắc điện ảnh dài 5,2 giây, có thể thoát ngay; chỉ kích hoạt lại sau khi lùi xa. Không tự mở khoảnh khắc này khi tạm dừng hoặc bật giảm chuyển động. Mỗi góc nhìn có một lời nhắn; đi một vòng quanh cảnh sẽ gặp một lời nhắn bí mật. Đây là những chi tiết nghệ thuật, không phải mô phỏng vượt chân trời sự kiện.

**Tự xoay** giữ trạng thái bật khi kéo/vuốt, chụm, cuộn, dùng nút zoom hoặc phím mũi tên; lúc giữ tay thì nhường điều khiển, thả tay lại tiếp tục. Tạm dừng vẫn dừng cả chuyển động và tự xoay. Góc đặt sẵn chuyển theo đường cong 2,6 giây, có thể ngắt bằng thao tác tay; giảm chuyển động sẽ đổi góc trực tiếp.

**Một vòng bên vô cùng** trong ☷ là chuyến đi 36 giây với ba chặng và lời nhắn theo từng góc nhìn. Có tạm dừng/tiếp tục; kéo, zoom, Esc hoặc nút trở lại để kết thúc. Kết thúc giữ góc hiện tại và trả lại lựa chọn tự xoay/tạm dừng trước chuyến đi. Tab ẩn không làm tiến trình chạy tiếp. Với giảm chuyển động, ba chặng hiện thành các góc tĩnh.

**Hiệu năng** có ba nút, lưu tại `phuc.black-hole.performance.v1`: Tiết kiệm pin (24 fps, 460 nghìn pixel, 5.000 sao), Cân bằng (40 fps, tối đa 1,15 triệu pixel, 10.000 sao, tự hạ độ phân giải khi chậm), Tối đa (60 fps, tối đa 2,1 triệu pixel, 15.000 sao). Đây là giới hạn kết xuất, không phải cam kết tốc độ hoặc thời lượng pin; còn tùy máy. Không tự đổi mức người dùng đã chọn.

`black-hole-keepsakes.js` quản lý ảnh và lịch sử. **Chụp khoảnh khắc** mở bản xem trước, chọn khung hiện tại/ngang/vuông/dọc, lời nhắn, chữ ký và ngày giờ trước khi tải PNG. Ảnh đặt trọn trong khung, không kéo méo hay cắt thêm cảnh. Cuối **Ghi chép**, lịch sử giữ 10 lần gần nhất với ngày giờ và góc nhìn có thể mở lại; lưu tại `phuc.black-hole.journal.v2`. Ghi chép v1 được chuyển sang lịch sử và khóa cũ vẫn được giữ nguyên. Không ghi đè bản nháp nếu lưu thất bại; gửi dòng trống không xóa lịch sử.

Âm nền có tùy chọn phản ứng theo khoảng cách, độ nghiêng và tốc độ xoay, với chuyển âm êm; nhạc từ tệp riêng không bị đổi cao độ. Tùy chọn này nằm trong **Chọn nhạc & âm lượng**.

Điều khiển chạm có ngưỡng bỏ qua rung tay nhỏ, độ nhạy theo kích thước màn hình và giới hạn biến đổi zoom mỗi sự kiện. Rung nhẹ mặc định tắt, chỉ hiện trên thiết bị cảm ứng có Vibration API, và không dùng khi bật giảm chuyển động. Cần thử trên thiết bị thật để đánh giá rung và cảm giác đa điểm.

Kiểm tra chuyển góc, chuyến đi, khung ảnh, ba mức hiệu năng và lưu/chuyển đổi nhật ký: `node --test tests/black-hole.test.cjs`.

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
