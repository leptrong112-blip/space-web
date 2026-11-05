# SPACE WEB — CREATIVE NORTH STAR / V1

**Đài quan sát của Phúc · Một góc nhỏ giữa vô cùng**<br>
**Bản định hướng sáng tạo và đối chiếu mã nguồn — 17/10/2026**<br>
**Mốc tham chiếu:** `leptrong112-blip/space-web`, nhánh `space-web-update-2026`.

> Đây là bản đề xuất sáng tạo dựa trên tâm sự của chủ dự án, `AGENTS.md`, `SPACE_WEB_MASTER_PLAN.md` và kiểm tra tĩnh những file chính trên GitHub. Nó không phải kết quả kiểm thử trình duyệt. Không thay đổi hay push mã nguồn nào trong quá trình lập tài liệu.

## I. Tuyên ngôn linh hồn

**Space Web ra đời từ một giấc mơ rất riêng: được trở thành người lữ hành tự do giữa vũ trụ.** Trước khi có giao diện hay dòng mã đầu tiên, đã có hình ảnh một con tàu rời xa Trái Đất, một cú nhảy warp đưa những ngôi sao thành dải sáng, và một người đứng lặng bên ô kính khoang quan sát, nhìn tinh vân, những thế giới lạ và ánh sáng cong quanh hố đen.

Đây không phải phòng thí nghiệm để chứng minh điều gì, cũng không phải một danh mục kiến thức phải xem hết. Đây là nơi Phúc biến những thế giới từng tồn tại trong trí tưởng tượng thành khung cảnh có thể quay lại, ngắm nhìn và chia sẻ. Thiên văn học cho dự án sự chân thực; trí tưởng tượng cho nó đôi cánh; cảm xúc cho nó lý do tồn tại.

Người ghé thăm có thể lựa chọn chuyến đi của mình, đến gần một điều kỳ vĩ rồi dừng lại bao lâu tùy thích. Giữa bóng tối và những khoảng cách tưởng như vô tận, họ nhận ra con người vô cùng nhỏ bé — nhưng sự tò mò và tự do ngước nhìn vẫn rộng lớn. Nếu có điều gì đáng mang theo khi rời Space Web, đó là cảm giác đã chạm đến một giấc mơ, và muốn ngước nhìn bầu trời thật một lần nữa.

**Tóm gọn:** *Một nơi để trí tưởng tượng về vũ trụ có hình dạng, và để người ta được ở lại ngắm nhìn.*

### Ranh giới sáng tạo

- **Giữ:** sự tự do lựa chọn; góc nhìn của người lữ hành; khoảnh khắc qua ô kính; sự tương phản nhỏ bé–vô tận; nhịp điệu vừa kỳ vĩ vừa yên tĩnh; dấu ấn tác giả; nền tảng thiên văn đủ chính xác và phân biệt với khoa học viễn tưởng.
- **Không ép:** mọi trang phải có hình buồng lái; mọi người phải xem một cốt truyện cố định; biến website thành game có nhiệm vụ/thành tích; biến Space Web thành phòng Lab; thêm HUD/neon/hiệu ứng chỉ để gây ấn tượng; viết lại toàn bộ công nghệ hiện có.
- **Quy tắc quyết định:** Một thay đổi có đưa khung cảnh tiến gần hơn tới giấc mơ được hiện diện trong vũ trụ, hoặc giúp người xem ghi nhớ nó không? Nếu không, hoãn lại.

## II. Khoảng cách giữa hiện tại và giấc mơ

Các phát hiện sau được xác nhận ở cấp **mã nguồn**, không phải khẳng định trải nghiệm đã lỗi trong trình duyệt.

| Khu vực | Mã nguồn hiện có | Khoảng cách với giấc mơ | Hướng xử lý ít rủi ro |
|---|---|---|---|
| **Trang chủ**, `index.html` | Hero có lời mời nhẹ nhàng, Trái Đất trong bóng tối, hai CTA quan sát/kể chuyện; 5 phân khu chính | Là cánh cửa vào *website thiên văn*, chưa nêu rõ quyền được *khởi hành trong một chuyến đi* | Giữ toàn bộ hero. Thử một lối vào tùy chọn **Bước vào chuyến du hành**, không đổi trang chủ thành bảng điều khiển phi thuyền |
| **Story Mode**, `story.html`, `story.js` | Có trạm Pioneer, 6 chương, warp, HUD, cảnh Sao Mộc và kết thúc hố đen | Mạnh ở **cốt truyện có sẵn**, chưa phải **tự do lựa chọn điểm đến rồi dừng lại ngắm** | Giữ Story Mode là câu chuyện; tạo một lối trải nghiệm tự do riêng, có thể tái sử dụng các thành phần thị giác đã làm |
| **Biển Sao**, `vr-mode.html` | Cảnh sao 3D, vật thể trôi, điều chỉnh tốc độ/mật độ, nút warp: tăng tốc/FOV rồi trở về | Warp hiện là **hiệu ứng tăng tốc**, chưa làm nhiệm vụ **đưa tới một nơi thật sự để dừng lại** | Thử trạng thái hành trình `CRUISE → WARP → ARRIVAL → OBSERVE`; ban đầu chỉ một điểm đến minh họa |
| **Hố Đen Tương Tác**, `black-hole.html/js` | WebGL2 tương tác, thay góc nhìn, zoom, âm thanh và chế độ lặng, nhật ký riêng | Rất hợp cảm giác kỳ vĩ, nhưng đang là một trang độc lập; chưa có cảm giác nhìn qua khung kính của tàu | Không sửa shader trước. Tạo chuyển cảnh vào/ra phù hợp và cách giới thiệu đây là một điểm dừng trên hành trình; thử ô kính như lớp khung hình riêng trước khi tích hợp 3D phức tạp |
| **Vũ trụ sâu**, `index.html` | Phân loại/thẻ/gallery, cửa sổ chi tiết | Người xem chủ yếu **chọn đối tượng để tìm hiểu**, chưa thật sự có không gian để **ở lại nhìn** | Giữ thư viện; chọn **một tinh vân tiêu biểu** làm cảnh ngắm toàn khung, điều khiển tối giản, thông tin chỉ mở khi cần |
| **Phòng Lab**, `index.html` | Phân khu chính “PHÒNG THÍ NGHIỆM VŨ TRỤ”, ba mô-đun | Không sai, nhưng tên/độ nổi bật có thể làm khách mới hiểu nhầm ưu tiên của dự án | Không xóa chức năng. Cân nhắc đổi cách giới thiệu thành **Ánh sáng & thời gian** hay **Những điều khiến mình tò mò**; để người thích khoa học mở sâu hơn |
| **Nhật ký**, `observatory.js` | Lưu thiên thể, phương pháp, ghi chú, thời điểm bằng localStorage | Lưu cái **đã quan sát**, chưa gắn tự nhiên với **khoảnh khắc trong chuyến đi** | Mở rộng *tùy chọn*, lưu lại điểm đến, một ghi chú và ảnh/khoảnh khắc; không tạo mạng xã hội/tài khoản |
| **Sự nhất quán hình ảnh** | Observatory có bảng màu trầm, Story/VR còn nhiều HUD, neon, chữ “OVERLOAD” | Dễ tạo cảm giác những trang thuộc nhiều sản phẩm khác nhau | Kết nối bằng cùng nhịp chuyển cảnh, typography, âm thanh, nút trở về và cách sử dụng khoảng tối; giữ phân biệt vừa đủ cho từng khu |
| **Hero 3D đang thử nghiệm** | `hero-celestial.js` có mã tương tác 8 hành tinh, nhưng `index.html` chưa nạp nó hay có container `hero-celestial-canvas` | Có thể là tính năng chưa nối hoặc bản thử đã bỏ; **không suy ra là lỗi** | Hỏi chủ dự án có muốn dùng không rồi mới kết nối; không làm lạc ưu tiên khỏi khoang quan sát |

**Vấn đề nền tảng xác nhận:** `index.html` có hai phần tử cùng `id="observation-count"` (dòng 376 và 1052), ảnh hưởng đến việc mã chọn phần tử cần cập nhật. Cần sửa như công việc ổn định nền tảng, độc lập với thay đổi nghệ thuật.

**Những gì chưa xác nhận:** hiệu suất thực trên máy/điện thoại; sự mượt của chuyển cảnh; chất lượng cảnh Unity; cảm giác của khách dùng thử; tất cả chi tiết hiện ra sau CSS/script runtime.

## III. Đề xuất phát triển — ít tính năng, nhiều cảm giác đúng

### 1) Một cảnh mẫu trước, không xây cả hệ phi thuyền

**Tên tạm:** `The Observation Window` / *Ô kính nhìn ra vô tận*.

**Thời lượng chủ động:** tùy khách; các nhịp dưới đây không ép người xem chờ, trừ một chuyển cảnh ngắn có thể bỏ qua.

| Nhịp | Điều người xem trải nghiệm | Ý nghĩa cảm xúc | Yêu cầu tối thiểu |
|---|---|---|---|
| **Bước vào** | Một góc buồng lái tối, phía trước là Trái Đất hoặc khoảng sao. Giao diện chỉ có vài điều khiển thiết yếu. | “Mình đang ở đây” | Góc nhìn ổn định; kính/phần viền tàu ở rìa ảnh, không chiếm trung tâm |
| **Chọn đi** | Người xem tự chọn *đi tiếp* hay *ở lại*; nếu đi thì chủ động kích hoạt warp. | Tự do, làm chủ | Nút hành động rõ; dễ trở về; điều khiển bằng chuột/touch/keyboard |
| **Warp** | Sao dần thành vệt, không gian biến đổi, âm thanh chỉ khi đã bật; chuyển cảnh tối hợp lý. | Choáng ngợp, kỳ vọng | Không chớp trắng gắt; có chế độ giảm chuyển động và bỏ qua |
| **Đến nơi** | Tàu chậm lại, khung kính mở ra cảnh một tinh vân lớn (đầu tiên có thể dùng ảnh chất lượng cao/panorama có giấy phép). | Phát hiện, ngạc nhiên | Tốc độ dừng rõ, không bị bắt trở lại cảnh cũ |
| **Ở lại** | Người xem có thể xoay góc nhìn nhẹ hoặc ẩn UI để ngắm. Không bị đếm ngược. | Bình yên, nhỏ bé trước cái lớn | Ẩn/hiện UI, không tự bắt đầu hướng dẫn, chuyển động chậm |
| **Giữ lại** | Nếu muốn, ghi một dòng nhật ký/chụp cảnh; hoặc rời đi mà không phải làm gì. | Ký ức cá nhân | Ghi chú local đơn giản, không ép tạo tài khoản |

**MVP ban đầu chỉ cần:** một đoạn đầu tàu hoặc khung kính tối giản + một cú chuyển cảnh warp + **một** tinh vân đến nơi + điều khiển ở lại / trở về. Không cần hệ thống hàng trăm hành tinh, đồ họa photorealistic, lái tàu có vật lý 6-DoF, WebXR hoặc hệ nhiệm vụ.

### 2) Ba chế độ trải nghiệm rõ ràng, không buộc ai phải đi theo cốt truyện

- **Đài quan sát** — website hiện tại, đọc/ngắm/chọn thiên thể tự do (giữ nguyên phần lớn).
- **Nhật ký hành trình** — câu chuyện điện ảnh có chương của Pioneer, dành cho người thích được dẫn dắt (giữ hiện có).
- **Chuyến du hành tự do** — người xem tự chọn điểm đến, dừng ngắm và trở lại lúc nào cũng được (mới, bắt đầu bằng một cảnh mẫu).

Biển Sao và Hố Đen là những trải nghiệm/điểm đến liên quan, nhưng **không ép phải nhúng mọi trang vào một renderer chung ngay**. Về lâu dài có thể nối bằng chuyển cảnh và ngôn ngữ hình ảnh trước rồi mới cân nhắc tối ưu kỹ thuật sâu hơn.

### 3) Ngữ pháp cảm xúc thống nhất

- **Quy mô:** dùng khoảng trống, đối sánh khoảng cách, điểm sáng đơn độc; đừng dùng chữ “vô tận” quá nhiều để giải thích.
- **Ánh sáng:** tối có chủ ý, ánh từ thiên thể là chủ đạo; nét sáng trong tàu chỉ đủ định hướng.
- **Âm thanh:** âm nền tùy chọn, đôi khi yên lặng hoàn toàn; không auto-play.
- **Chuyển động:** thời gian chờ/giảm tốc là một phần cảnh, không phải lỗi; hỗ trợ reduced motion.
- **Lời văn:** hiếm, ngắn, do tác giả lựa chọn; không bắt website độc thoại thay cho người xem.
- **Giao diện:** luôn có cách thoát, trở về, tạm dừng, ẩn UI và xem chú thích khoa học ở lớp phụ.
- **Khoa học:** ghi rõ ảnh thiên văn xử lý đa bước sóng, mô phỏng cách điệu và warp hư cấu; chính xác nhưng không đứng giữa trải nghiệm.

### 4) Thứ tự triển khai đề nghị

| Đợt | Mục tiêu | Tác phẩm bàn giao | Điều kiện nghiệm thu |
|---|---|---|---|
| **0 — Chốt giấc mơ** | Chọn 1 khung hình tưởng tượng cụ thể | 1 trang mô tả: vị trí camera, cảnh ngoài kính, tốc độ, âm thanh, câu chữ, cảm xúc | Chủ dự án nói “đúng hướng” với mô tả trước khi code |
| **1 — Prototype tách biệt** | Kiểm chứng cảm giác hiện diện | `voyage-prototype.html/.css/.js` hoặc thư mục prototype riêng; **chưa nối homepage** | Bước vào → warp → đến tinh vân → ở lại → trở về đều diễn ra mượt |
| **2 — Chỉnh nhịp & chất lượng** | Đưa prototype gần tưởng tượng hơn | Chỉnh khung kính, FOV, độ sáng, tốc độ đến nơi, UI fade; chọn một asset có nguồn rõ | Có khoảng lặng thật; cảnh vẫn đẹp khi tắt UI; giảm chuyển động và fallback hoạt động |
| **3 — Kết nối nhẹ** | Đưa cảnh vào Space Web mà không phá phần cũ | Một lối vào tự nguyện từ trang chủ / trải nghiệm mở rộng; liên kết điểm đến | Từ homepage tới cảnh và trở lại không lạc đường; tất cả tính năng cũ vẫn dùng được |
| **4 — Mở rộng sau phản hồi** | Thêm một điểm đến khác có cá tính | Hố đen **hoặc** hành tinh xa lạ; nhật ký chuyến đi tùy chọn | Điểm đến khác cảm xúc, không chỉ đổi texture; không thêm danh mục vô tận |

### 5) Gợi ý tách việc cho công cụ lập trình/thiết kế

**Codex — kỹ thuật an toàn:**

```text
Read AGENTS.md and SPACE_WEB_MASTER_PLAN.md first. Work on a separate prototype branch. Preserve existing homepage, Story Mode, Biển Sao, black-hole shader, journal, Unity, and navigation; do not rewrite framework.

Create a read-only implementation proposal for a stand-alone "Observation Window" vertical slice: enter a ship observation space, choose to warp, arrive at one nebula destination, stay to observe, return. Reuse existing assets or clearly list needed license-checked assets; do not invent scientific accuracy. Prioritize WebGL fallback, mobile controls, reduced motion, optional sound, low GPU load and safe incremental integration.

Before editing, identify affected files and the simplest prototype architecture. Do not commit, push or merge without explicit approval.
```

**Antigravity — art direction:**

```text
Read AGENTS.md and SPACE_WEB_MASTER_PLAN.md first. Space Web is a personal imagination archive, not a science lab or generic sci-fi dashboard.

Develop a visual direction for "The Observation Window": first-person presence inside a small spacecraft, an unobtrusive cold-glass foreground, immense darkness beyond, a single luminous nebula at the end of a fictional warp jump. The player chooses when to travel and how long to observe. The mood is awe, freedom, solitude and calm; cinematic but restrained.

Show a simple scene storyboard and decisions for color, lighting, framing, motion and UI. Keep the existing Observatory palette as reference. Do not redesign the whole website, add gratuitous HUD/neon, or write production code before the owner approves the visual direction.
```

### 6) Bộ câu hỏi nghiệm thu cảm xúc

1. Khi mở cảnh, người xem có cảm giác mình **đang đứng/ngồi trong một không gian** thay vì nhìn ảnh demo?
2. Họ có **quyền chọn** khi nào đi, khi nào dừng, khi nào rời?
3. Warp có kết thúc ở một cảnh thật sự đáng ở lại, thay vì chỉ phát hiệu ứng rồi reset?
4. Cảnh sau warp có đủ **khoảng không, quy mô và sự im lặng** để người xem cảm thấy nhỏ bé?
5. Khi ẩn UI, cảnh có còn trọn vẹn và đẹp?
6. Lời văn có đang bồi đắp cảm xúc, hay đang nói thay cảm xúc của người xem?
7. Người tạo ra dự án có thấy: “Đây đúng là hình ảnh mình từng muốn lưu lại”, dù mới chỉ là một khung cảnh?

## IV. Những quyết định chưa nên đưa ra vội

- Không mặc định tất cả Space Web phải là góc nhìn trong buồng lái: đó là hình ảnh khởi nguyên, nhưng Đài quan sát vẫn có các cách khám phá khác.
- Không khẳng định “thiếu khoang quan sát” là chẩn đoán chắc chắn về cảm giác của Phúc. Đó là **giả thuyết sáng tạo có cơ sở**, cần kiểm chứng bằng một prototype nhỏ.
- Không triển khai điều khiển tàu không gian hoàn chỉnh, vật lý quỹ đạo thực hay WebXR chỉ vì nghe hấp dẫn.
- Không xóa Phòng Lab, Story Mode hoặc các bản demo cũ; tài sản sáng tạo nên được giữ lại và sắp đặt lại có chủ đích.
- Không dùng tài nguyên hình ảnh/nhạc không rõ bản quyền để lấy hiệu ứng nhanh.
- Không gộp mọi bộ máy 3D vào cùng một trang trước khi đo hiệu năng.

**Điểm xuất phát đề nghị:** Phúc mô tả một khung cảnh duy nhất ngoài ô kính đầu tiên — tinh vân nào, độ gần, góc nhìn, sự chuyển động, cảm giác — rồi làm mẫu *Ô kính nhìn ra vô tận* từ chính khung cảnh ấy.
