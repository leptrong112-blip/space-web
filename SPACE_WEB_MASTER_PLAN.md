# SPACE-WEB — MASTER PLAN

> **Project identity:** Đài quan sát của Phúc — *Một góc nhỏ giữa vô cùng.*
>
> **Core principle:** Chúng ta không xây website thiên văn có nhiều thứ nhất. Chúng ta xây một đài quan sát nhỏ mà người ta muốn quay lại.

---

## 1. Tầm nhìn

`space-web` không được phát triển thành một website kiến thức thiên văn khô khan, một bản sao NASA, hay một sci-fi dashboard đầy hiệu ứng.

Mục tiêu là tạo ra một **trải nghiệm thiên văn cá nhân** — nơi người dùng bước vào để cảm thấy tò mò, nhỏ bé, yên tĩnh, rồi muốn hiểu thêm về vũ trụ.

Hành trình cảm xúc và tương tác cốt lõi:

**Ngước nhìn → Tò mò → Khám phá → Hiểu → Cảm nhận → Ghi lại → Đi xa hơn.**

Ba trụ cột phải luôn tồn tại song song:

1. **Khoa học** — nội dung đủ chính xác, có nguồn, phân biệt rõ dữ liệu thật, mô phỏng minh họa và hư cấu.
2. **Cảm xúc** — thiên văn phải tạo cảm giác kỳ vĩ, cô tịch, tò mò, sâu lắng và có chiều sâu.
3. **Cá nhân** — người dùng phải cảm thấy đây là **Đài quan sát của Phúc**, không phải một template chung.

---

## 2. Product Constitution — Những nguyên tắc không được phá

### 2.1 Không thay framework nếu không có lý do kỹ thuật thật sự

Giữ nền tảng hiện tại:

- HTML
- CSS
- JavaScript
- Three.js
- Unity WebGL

Không chuyển sang React, Vue, Next.js hay framework khác chỉ để “modernize”.

### 2.2 Không phá chức năng đang có

Phải bảo toàn các khả năng hiện tại, trừ khi kế hoạch này yêu cầu đổi tên hoặc cải tổ có kiểm soát:

- Sa bàn Hệ Mặt Trời 3D
- chọn hành tinh / fly-to camera
- Mặt Trăng
- pause / time speed
- orbit toggle
- labels
- galaxy view
- Observer HUD
- Structure Scan
- Sổ quan sát
- Light Journey
- Orbit Simulator
- Timeline / Dấu chân
- Story Mode
- Biển Sao 3D
- SpaceAudio
- Unity WebGL
- AstroBot
- Easter Egg

### 2.3 Không biến website thành cyberpunk generic

Không lạm dụng:

- neon
- glow
- gradient
- particle
- HUD
- glassmorphism
- animation

Chỉ dùng hiệu ứng khi có **ý nghĩa thị giác hoặc trải nghiệm**.

### 2.4 Không thêm feature chỉ vì “trông nhiều”

Mỗi feature mới phải trả lời được ít nhất một trong ba câu hỏi:

- Nó giúp người dùng **khám phá** tốt hơn ở đâu?
- Nó giúp người dùng **cảm nhận** vũ trụ tốt hơn ở đâu?
- Nó giúp người dùng **ghi nhớ** hành trình tốt hơn ở đâu?

Nếu không trả lời được → không thêm.

---

## 3. Design Identity chính thức

### 3.1 Palette chính

```text
Space Black       #080D14
Starlight         #EEF1EC
Observatory Gold  #DEC195
Ice Blue          #A5CFD5
Muted Blue Grey   #9DAEB9
```

Màu phụ chỉ dùng theo ngữ nghĩa:

```text
Cyan   = Scan / scientific instruments
Red    = Warning / danger
Amber  = Warp / energy / exceptional state
```

Không dùng neon ngẫu nhiên chỉ để “xịn”.

### 3.2 Typography

**Montserrat** cho:

- tiêu đề
- paragraph
- navigation
- UI chính

**Share Tech Mono** cho:

- coordinate
- telemetry
- status
- scientific label
- HUD kỹ thuật

Không để toàn website trông như bảng điều khiển tàu vũ trụ.

### 3.3 Motion

Motion phải:

- chậm
- có nhịp thở
- không gây rối
- không làm người dùng mất tập trung
- hỗ trợ `prefers-reduced-motion`

Một khoảng đen đúng chỗ tốt hơn năm hiệu ứng glow.

---

## 4. Tone of Voice

Không lấy bảng thông số làm trải nghiệm chính.

Thứ tự nội dung ưu tiên:

```text
Cảm giác
↓
Câu hỏi
↓
Hình ảnh / tương tác
↓
Giải thích khoa học
↓
Dữ liệu chi tiết
↓
Nguồn tham khảo
```

Ví dụ không nên mở bằng:

> Sao Mộc là hành tinh thứ năm tính từ Mặt Trời.

Có thể mở bằng:

> Một cơn bão lớn hơn Trái Đất đã tồn tại ở đây lâu hơn ký ức của nhiều thế hệ con người.

Sau đó mới mở phần dữ liệu khoa học.

---

# PHASE 0 — BACKUP, CLEANUP & SAFETY

## 5. Git / Security

### Cần làm ngay

Cập nhật `.gitignore`:

```gitignore
.env
.env.*
.vscode/
*.log
*.tmp
*.temp
.DS_Store
Thumbs.db
```

Không commit API key.

Nếu Gemini key cũ từng public và còn hiệu lực → revoke.

### Asset hygiene

- không hotlink asset quan trọng nếu có thể lưu local
- ghi nguồn và license ảnh
- tránh URL tạm / URL dễ chết
- giữ bản gốc chất lượng cao ngoài repo nếu quá nặng

Đặc biệt:

`Images/Milky Way.jpg` khoảng 62 MB.

Không dùng trực tiếp trên website.

Hướng xử lý:

```text
Milky-Way-master.jpg    -> archive ngoài repo
milky-way-2560.webp
milky-way-1440.webp
milky-way-mobile.webp
```

---

# PHASE 1 — IDENTITY & POLISH

## 6. Refactor CSS nhưng không phá giao diện

Mục tiêu: loại bỏ CSS cũ đang override lẫn nhau và đưa project về một design system duy nhất.

Kiến trúc mong muốn:

```text
tokens.css
base.css
components.css
observatory.css
story.css
journey.css
```

Không bắt buộc tách tất cả trong một lần nếu rủi ro cao.

Cần xử lý:

- duplicate `.grid`
- duplicate `.planet-card`
- duplicate `.modal`
- duplicate `.modal-content`
- duplicate button styles
- giảm `!important`
- loại CSS chết
- xóa comment kiểu “DÁN CÁI NÀY...”
- thống nhất spacing
- thống nhất radius
- thống nhất border
- thống nhất shadow / glow
- thống nhất hover / focus states

Hero hiện tại là **chuẩn tham chiếu visual** cho toàn website.

---

## 7. Hero — giữ tinh thần hiện tại

Giữ:

> **MỘT GÓC NHỎ GIỮA VÔ CÙNG**
>
> **Ngước nhìn.**  
> **Và ngỡ ngàng.**
>
> Có những hành trình bắt đầu chỉ bằng một lần nhìn lên bầu trời...
>
> *Từ một người yêu thiên văn, gửi đến bạn.*

Không biến hero thành carousel.

Không thêm quá nhiều CTA.

Không làm hero quá kỹ thuật.

---

## 8. Navigation

Cấu trúc hướng tới:

```text
Đài quan sát
Thiên thể
Ánh sáng
Dấu chân

Nhật ký hành trình ↗
Biển Sao 3D ✦
Unity 3D ↗
```

Đổi `Chế độ VR` → **Biển Sao 3D** vì hiện tại chưa phải WebXR thật.

Chỉ dùng từ **VR** lại khi WebXR được triển khai thực sự.

---

## 9. Planet / Celestial Cards

Giảm cảm giác “catalog”.

Card chỉ nên chứa:

```text
Tên
Ảnh
1 câu đặc trưng
→ Quan sát
```

Ví dụ:

### Sao Thổ

> Một thế giới khí khổng lồ được bao quanh bởi hàng tỷ mảnh băng.

**Quan sát trên sa bàn →**

Thông số chi tiết để Observer HUD xử lý.

---

# PHASE 2 — ABOUT, CREDITS & SCIENCE

## 10. About Observatory

Bỏ cảm giác “NASA student ID card” làm phần giới thiệu chính.

Thay bằng:

# Về đài quan sát

> Mình bắt đầu project này không phải chỉ vì một bài tập.  
> Mình làm nó vì từ rất lâu, bầu trời luôn khiến mình muốn biết ngoài kia còn gì.

Sau đó mới ghi:

```text
Lê Trọng Phúc
Creator / Developer
```

Nếu có cộng tác viên:

```text
Nguyễn Chí Toàn
Contributor
```

Không giả lập vai trò NASA employee.

---

## 11. Credits

Tạo khu **Sources & Credits**.

Cấu trúc:

```text
Scientific References
NASA
ESA
JPL

Images
...

Libraries
Three.js
AOS
Unity

Project
Design & Development
...
```

---

## 12. Scientific Accuracy Review

Kiểm lại toàn bộ facts trước khi mở rộng dữ liệu.

Ưu tiên:

- distances
- planetary descriptions
- compositions
- temperatures
- nebula distances
- missions
- black holes
- exoplanets

Quy tắc:

**Nếu không chắc → viết mềm hơn, không khẳng định mạnh.**

Ví dụ:

Không nên:

> Sao Mộc bảo vệ Trái Đất.

Nên:

> Sao Mộc có ảnh hưởng mạnh tới động lực học của các vật thể nhỏ trong Hệ Mặt Trời.

Các điểm cần chỉnh đầu tiên:

- Sao Kim: diễn đạt rõ retrograde rotation thay vì chỉ “quay ngược chiều kim đồng hồ”
- Sao Mộc: tránh “lá chắn của Hệ Mặt Trời” quá đơn giản
- Curiosity: nhấn mạnh habitability / môi trường từng phù hợp cho sự sống vi sinh
- JWST: “tìm hiểu các sao / thiên hà sớm” thay vì khẳng định trực tiếp “nhìn thấy những ngôi sao đầu tiên”
- Pillars of Creation: không lặp giả thuyết cũ rằng chắc chắn đã bị phá hủy

---

# PHASE 3 — OBSERVATORY 2.0

## 13. Sa bàn 3D là trái tim của website

Tên section:

> **ĐÀI QUAN SÁT**

Subtitle:

> **Chạm vào một thế giới.**

Giữ:

- drag camera
- zoom
- labels
- orbit toggle
- pause
- speed
- galaxy view
- click object
- Moon
- Observer HUD

Không coi nó là một demo Three.js phụ.

---

## 14. Observer HUD 2.0

Giảm cảm giác game HUD, tăng cảm giác dụng cụ quan sát.

Cấu trúc mục tiêu:

```text
OBJECT / 03

SAO THỔ
Hành tinh khí

Đường kính
Khoảng cách trung bình
Chu kỳ
Nhiệt độ

—

Một thế giới nhẹ hơn nước,
được bao quanh bởi vô số
mảnh băng và đá.

[ MỞ CẤU TRÚC ]

☆ Lưu vào nhật ký
```

---

## 15. Structure Scan

Giữ vì đây là feature có cá tính.

Tên:

> **QUÉT CẤU TRÚC**

Khi bật:

- hiển thị core
- mantle
- atmosphere
- composition
- nếu có thể, tiến tới cutaway / cross-section

Animation nhẹ, không flash quá mức.

---

# PHASE 4 — OBSERVATION JOURNAL

## 16. Sổ quan sát 2.0

Đây là một feature chiến lược.

Từ trạng thái hiện tại:

```text
★ Sao Thổ
★ Sao Hỏa
```

Nâng thành:

```text
NHẬT KÝ QUAN SÁT

03.09.2026
Sao Thổ

“Lần đầu tiên mình dành thời gian
nhìn thật kỹ cấu trúc vành đai.”

Quan sát bằng:
◉ Sa bàn 3D
○ Kính thiên văn
○ Mắt thường

[Ghi chú]
```

Giai đoạn đầu dùng `localStorage`.

Không cần account/backend.

Sau này journal có thể trở thành timeline cá nhân.

---

## 17. Cosmic Memory

Feature tương lai rất hợp với project.

Website nhớ các object người dùng đã ghé:

```text
YOUR JOURNEY

Earth
Saturn
Orion
M87*
```

Sau đó tạo một constellation cá nhân từ những điểm đã khám phá.

---

## 18. A Letter to the Universe

Một feature nghệ thuật, riêng tư.

Prompt:

> **Nếu có thể gửi một câu vào vũ trụ, bạn sẽ viết gì?**

Người dùng viết một câu.

Website lưu local.

Sau đó câu đó có thể trở thành một điểm nhỏ trong personal constellation.

Không social.

Không backend.

---

# PHASE 5 — LIGHT & TIME

## 19. Light Journey 2.0

Giữ feature hiện tại.

Art direction:

> **Ánh sáng cũng cần thời gian.**

Ví dụ:

```text
TRÁI ĐẤT
8 phút 19 giây

SAO MỘC
~43 phút

SAO HẢI VƯƠNG
~4 giờ
```

Mở rộng sau:

```text
Proxima Centauri
4.24 năm

Orion Nebula
~1.3 nghìn năm

Andromeda
~2.5 triệu năm
```

Thông điệp trọng tâm:

> **Bạn không bao giờ nhìn vũ trụ ở hiện tại.**

---

## 20. Lookback Time

Feature ưu tiên cao.

Slider:

```text
BÂY GIỜ ━━━━━━━━━━━━━━━━ 13.8 TỶ NĂM
```

Ví dụ:

```text
Mặt Trăng
1.3 giây trước

Mặt Trời
8 phút trước

Sirius
8.6 năm trước

Andromeda
2.5 triệu năm trước

CMB
~13.8 tỷ năm trước
```

Thông điệp:

> **Nhìn càng xa, bạn càng nhìn sâu vào quá khứ.**

---

# PHASE 6 — ORBIT & DEEP SPACE

## 21. Orbit Simulator

Giữ.

Redesign để đồng bộ Observatory aesthetic.

Không gradient game.

Cấu trúc:

```text
THỬ THAY ĐỔI QUỸ ĐẠO

Vận tốc ban đầu
━━━━━━━━━━

Lực hấp dẫn
━━━━━━━━━━

[ Rơi ]
[ Quỹ đạo ]
[ Thoát ]
```

Luôn ghi chú đây là mô phỏng minh họa bằng đơn vị quy ước.

---

## 22. Deep Space / Nebulae

Không để chỉ là 6 card cùng kiểu.

Tên section:

> **NGOÀI HỆ MẶT TRỜI**

Object được chọn kỹ:

- Orion
- Crab
- Helix
- Pillars of Creation
- Carina
- Butterfly

Click → cinematic modal.

Cấu trúc modal:

```text
Ảnh lớn

Tên

“Bạn đang nhìn một nơi
cách chúng ta 1.344 năm ánh sáng.”

—

Nó là gì?
Điều gì đang xảy ra?
Tại sao nó đặc biệt?

Nguồn: NASA / ESA
```

---

## 23. Cosmic Postcards

Feature đặc trưng của project.

Một số nơi trong website xuất hiện các đoạn ngắn do chủ project viết.

Ví dụ:

```text
POSTCARD / 04

“Có lẽ điều kỳ lạ nhất về
vũ trụ không phải là nó quá lớn,
mà là chúng ta đủ nhỏ để vẫn
muốn hiểu nó.”

— Phúc
```

Khoảng 5–10 postcard trong toàn website là đủ.

Không spam.

---

# PHASE 7 — STORY MODE 2.0

## 24. Giữ nền Story hiện tại

```text
CHƯƠNG 0
TRẠM ĐIỀU KHIỂN

CHƯƠNG 1
TRÁI ĐẤT

CHƯƠNG 2
RỜI KHÍ QUYỂN

CHƯƠNG 3
SAO MỘC

CHƯƠNG 4
NGÂN HÀ

CHƯƠNG 5
HỐ ĐEN
```

Không xóa các transition đang có nếu vẫn hoạt động tốt.

---

## 25. Semi-branching Story

Không cần RPG phức tạp.

Chỉ cần một vài lựa chọn meaningful.

Ví dụ tại Sao Mộc:

```text
Bạn muốn làm gì?

[ Quan sát Great Red Spot ]
[ Ghé Europa ]
[ Tiếp tục hành trình ]
```

Mục tiêu: tạo agency, không tạo game logic nặng.

---

## 26. Story Writing Direction

Không lạm dụng:

> ALERT!!! SYSTEM FAILURE!!! WARP CORE 99%!!!

Hướng chính:

**quiet sci-fi**.

Ví dụ:

> Ngoài cửa sổ, Sao Mộc chiếm gần hết bầu trời.  
> Không có âm thanh. Chỉ có một cơn bão đã tồn tại lâu hơn ký ức của nhiều thế hệ người.

HUD nhỏ:

```text
LOC / JUPITER SYSTEM
DIST / 5.2 AU
```

---

## 27. Black Hole Ending

Giữ nhưng tinh chỉnh cảm xúc.

Ưu tiên:

- im lặng
- scale
- lens distortion
- time dilation
- accretion disk

Không làm thành “boss fight”.

End direction:

> **Everything you know... fades.**
>
> **But curiosity remains.**
>
> **REBIRTH**

---

# PHASE 8 — BIỂN SAO 2.0

## 28. Đổi VR Mode thành Biển Sao

Tên:

> **BIỂN SAO**

Mục tiêu:

Không phải simulation khoa học chính xác.

Đây là **meditative space experience**.

UI tối giản:

```text
✦

Tốc độ
Mật độ sao

[ WARP ]

Âm thanh
```

Sau vài giây idle, UI có thể fade.

Người dùng chỉ còn không gian và âm thanh.

---

## 29. Sound Design

Giữ `SpaceAudio`.

Phát triển thành ba soundscape:

```text
OBSERVATORY
âm thấp, ấm, rất nhẹ

DEEP SPACE
rộng, lạnh, chậm

STORY
cinematic nhưng tiết chế
```

Không autoplay.

Người dùng phải chủ động bật.

---

## 30. Observatory Red Mode

Feature nhỏ nhưng rất hợp.

Button:

> **RED LIGHT**

Toàn UI chuyển sang ánh đỏ tối.

Có tooltip giải thích người quan sát thiên văn dùng ánh đỏ để giảm ảnh hưởng tới dark adaptation.

---

# PHASE 9 — TONIGHT SKY

## 31. Bầu trời đêm nay

Feature lớn.

Tên:

> **BẦU TRỜI ĐÊM NAY**

Input:

```text
Địa điểm
Ngày
Thời gian
```

Output có thể gồm:

```text
Mặt Trăng
Độ cao
Hướng

Sao Mộc
Thời gian quan sát tốt

Sao Thổ

Chòm Orion
```

Không cần làm ngay thành Stellarium.

Phát triển từng lớp.

---

# PHASE 10 — STAR MAP

## 32. Interactive Star Map

Một sky dome / star map tương tác.

Hiển thị:

- stars
- constellations
- labels
- apparent magnitude
- spectral colors
- distance
- deep sky objects

Mode:

```text
[ Chòm sao ]
[ Tên sao ]
[ Đường nối ]
[ Deep sky ]
```

Giữ Observatory aesthetic.

Không biến thành game minimap.

---

# PHASE 11 — EXOPLANETS

## 33. Exoplanet Explorer

Tên section:

> **NHỮNG THẾ GIỚI KHÁC**

Ví dụ object:

- Kepler-22b
- TRAPPIST-1e
- Proxima b
- WASP-39b
- K2-18 b

Hiển thị:

- radius
- mass nếu biết
- orbital period
- host star
- equilibrium temperature / temperature context nếu phù hợp
- discovery method
- habitability notes

Không gắn nhãn “có thể sống” quá đơn giản.

---

# PHASE 12 — REAL WEBXR

## 34. WebXR

Chỉ làm sau khi các phase cốt lõi đã ổn.

Khi có WebXR thật:

```text
ENTER VR
```

mới xuất hiện.

Không gọi trải nghiệm màn hình hiện tại là VR.

---

# 35. Timeline — Dấu chân nhân loại

Đổi concept từ “lịch sử thiên văn” thành:

> **DẤU CHÂN**

Storyline:

```text
1610
Galileo

1957
Sputnik

1969
Apollo 11

1990
Hubble

2012
Curiosity

2021
James Webb

20??
Chân trời tiếp theo
```

Không neon quá nhiều.

---

## 36. Chân trời tiếp theo

Giữ ý tưởng tương lai nhưng viết sâu hơn.

Ví dụ:

```text
20?? / UNKNOWN

CHÂN TRỜI TIẾP THEO

Có thể là bước chân đầu tiên
trên Sao Hỏa.

Có thể là một đại dương
bên dưới Europa.

Có thể là tín hiệu đầu tiên
không thuộc về Trái Đất.

Hoặc có thể là một câu hỏi
chúng ta vẫn chưa biết cách đặt ra.
```

---

# 37. Unity WebGL

Không load Unity cùng homepage.

Chỉ load khi user chọn:

> **UNITY 3D EXPERIENCE**

Giữ cách mở riêng hiện tại.

Sau này có thể custom loading screen:

```text
LOADING OBSERVATORY MODULE

████████░░ 81%
```

---

# 38. Performance Strategy

Thêm performance modes:

```text
AUTO
BALANCED
CINEMATIC
```

### AUTO

Tự điều chỉnh dựa trên thiết bị.

### Mobile

- giảm star count
- cap DPR
- giảm bloom
- giảm particles
- giảm geometry segments
- giảm shadow quality

### Desktop mạnh

Cho phép Cinematic mode.

### Biển Sao

Không update 15.000 star positions bằng CPU nếu có giải pháp shader / matrix / reduced draw cost tốt hơn.

Ưu tiên profiling trước khi tối ưu lớn.

---

# 39. Accessibility

Giữ các phần hiện có:

- skip link
- focus visible
- aria pressed
- reduced motion
- keyboard support

Bổ sung:

- button thật thay `div onclick`
- modal `role="dialog"`
- focus trap
- ESC close
- trả focus về opener
- aria labels chính xác
- contrast tốt
- touch target đủ lớn

---

# 40. AstroBot

Không cần fake AI.

Giữ concept:

> **AstroBot · Sổ tay thiên văn**

Giai đoạn đầu trả lời bằng dữ liệu nội bộ.

Nếu dùng AI thật sau này:

- backend proxy
- không hardcode API key
- rate limit
- fallback khi offline / API fail

---

# 41. Easter Eggs

Giữ nhưng có ý nghĩa.

Ví dụ:

`U` → Stardust message.

Sau này có thể:

click logo 7 lần →

> `SIGNAL DETECTED`

Không thêm quá nhiều easter egg.

---

# 42. Thứ tự triển khai chính thức

| Phase | Nội dung |
|---|---|
| **0** | Backup / Git / cleanup / security |
| **1** | Identity & CSS cleanup |
| **2** | About / Credits / Scientific fixes |
| **3** | Observatory 2.0 |
| **4** | Observation Journal |
| **5** | Light Journey + Lookback Time |
| **6** | Deep Space redesign |
| **7** | Story Mode 2.0 |
| **8** | Biển Sao 2.0 |
| **9** | Tonight Sky |
| **10** | Star Map |
| **11** | Exoplanets |
| **12** | WebXR |

Không nhảy thẳng tới phase 10–12 nếu phase 1–4 chưa chỉnh chu.

---

# 43. Phân việc cho Codex

Codex ưu tiên xử lý:

- code audit
- CSS / JS refactor
- architecture
- performance
- accessibility
- Three.js
- localStorage
- astronomy calculations
- Star Map
- Tonight Sky
- WebXR
- bugs
- regression prevention

### Prompt bắt buộc cho Codex

```text
Read SPACE_WEB_MASTER_PLAN.md first. Treat it as the product constitution.
Do not redesign or add features that conflict with its visual identity,
emotional direction, scientific approach, or phased roadmap.

Preserve all existing functionality unless the plan explicitly calls for changing it.
Before coding, audit the relevant files and propose a minimal-risk implementation plan.

Do not modernize the stack for its own sake.
Do not overuse neon, glassmorphism, gradients, particles, or HUD elements.
The site is a personal astronomy observatory, not a generic sci-fi dashboard.
```

---

# 44. Phân việc cho Antigravity

Antigravity ưu tiên:

- visual design
- sections
- cards
- responsive UI
- typography
- spacing
- composition
- art direction
- aesthetic polish
- mood

### Prompt bắt buộc cho Antigravity

```text
Before making changes, follow SPACE_WEB_MASTER_PLAN.md.
This project is a personal astronomy observatory, not a generic sci-fi dashboard.

Prioritize quiet cosmic atmosphere, dark space, Observatory Gold, Ice Blue,
typography hierarchy, whitespace, editorial composition, and restrained motion.

Do not overuse neon, glassmorphism, gradients, particles, glowing borders,
or decorative effects.

The result should feel intimate, thoughtful, cinematic, scientific,
and unmistakably personal.
```

---

# 45. Feature Acceptance Checklist

Trước khi merge một feature lớn, kiểm tra:

| Câu hỏi | Điều kiện |
|---|---|
| Hợp Observatory identity? | Phải có |
| Tạo curiosity hoặc cảm xúc? | Phải có |
| Hữu ích hơn một card thông tin tĩnh? | Nên có |
| Mobile chạy được? | Phải có |
| Science được ghi chú đúng? | Phải có |
| Có fallback khi asset/API fail? | Nên có |
| Làm project nặng/phức tạp vô lý? | Không được |
| Phá feature cũ? | Không được |

---

# 46. Definition of “Chỉnh chu”

Một phần của website chỉ được coi là hoàn thiện khi:

- nhìn đúng art direction
- không có spacing lộn xộn
- mobile usable
- keyboard usable
- animation không gây rối
- nội dung khoa học được kiểm tra
- hình ảnh có source / license phù hợp
- không gây regression
- không thêm dependency vô lý
- không làm hiệu năng giảm rõ rệt
- copywriting có giọng riêng, không generic

---

# 47. Nguyên tắc cuối cùng

> **We are not building the largest astronomy website.**  
> **We are building a small observatory worth returning to.**

Bản Việt:

> **Chúng ta không xây website thiên văn có nhiều thứ nhất.**  
> **Chúng ta xây một đài quan sát nhỏ mà người ta muốn quay lại.**

Mọi quyết định thiết kế, code, animation, content và feature của `space-web` phải quay lại câu này trước khi được chấp nhận.
