/* Standalone creative study for "The Observation Window" (Bên kia ô kính) — Đài quan sát của Phúc.
 * Focuses on a calm, authentic feeling of standing inside a spacecraft observation cabin looking out
 * through a window into a vast, multi-scale universe.
 */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const view = $('viewport');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');

  const ORBIT_HOTSPOTS = [
    {
      id: 'earth-globe',
      label: 'Trái Đất',
      tag: 'QUỸ ĐẠO THẤP · ĐỘ CAO ~420 KM',
      heading: 'Hành tinh xanh dưới lớp mây mỏng',
      body: 'Từ độ cao này, biên giới trên bản đồ biến mất, chỉ còn đại dương xanh thẫm, lục địa trầm mặc và đường viền khí quyển mỏng mảnh đang giữ lấy sự sống giữa khoảng không.',
      pos: [-10, -32, -135],
      yaw: 0.04,
      pitch: -0.14
    },
    {
      id: 'distant-sun',
      label: 'Mặt Trời',
      tag: 'NGÔI SAO MẸ · ÁNH SÁNG 8 PHÚT 20 GIÂY TRƯỚC',
      heading: 'Ngọn lửa sưởi ấm cả Hệ Mặt Trời',
      body: 'Ở khoảng cách gần 150 triệu km, ánh nắng bạn đang thấy thực ra đã rời bề mặt Mặt Trời từ hơn tám phút trước để kịp chạm vào sườn tàu và mặt biển bên dưới.',
      pos: [74, 21, -340],
      yaw: -0.19,
      pitch: 0.06
    },
    {
      id: 'orbit-moon',
      label: 'Mặt Trăng',
      tag: 'VỆ TINH TỰ NHIÊN · ÁNH SÁNG 1,28 GIÂY TRƯỚC',
      heading: 'Người bạn đồng hành trầm mặc',
      body: 'Mặt Trăng lặng lẽ phản chiếu cùng một nguồn nắng với Trái Đất. Ánh sáng từ vùng đồng bằng bazan xám bạc kia chỉ mất hơn một giây để bay tới mắt bạn.',
      pos: [-66, 13, -230],
      yaw: 0.22,
      pitch: 0.05
    }
  ];

  const DESTINATIONS = [
    {
      id: 0,
      key: 'gargantua',
      chipName: 'M87* / Gargantua',
      lightYears: 55000000,
      coord: 'M87* (55 TRIỆU LY) · LẤY CẢM HỨNG THỊ GIÁC GARGANTUA',
      eraText: 'Ánh sáng từ tâm thiên hà M87 mất khoảng 55 triệu năm để vượt qua vũ trụ',
      phase: 'ĐIỂM DỪNG 01 · HỐ ĐEN SIÊU KHỐI LƯỢNG',
      title: 'Nơi trọng lực uốn cong đường đi của ánh sáng.',
      description: 'Khoảng tối ở chính giữa không phải là một đám mây che khuất, mà là bóng của chân trời sự kiện. Xung quanh nó, ánh sáng từ đĩa khí nóng bị trường hấp dẫn bẻ cong thành hai vòm sáng ôm lấy bóng đêm.',
      authBadge: 'THIÊN THỂ THẬT (M87*) · ĐĨA BỒI TỤ LẤY CẢM HỨNG ĐIỆN ẢNH',
      authText: 'M87* là hố đen siêu khối lượng có thật ở tâm thiên hà Messier 87 (nặng khoảng 6,5 tỷ lần Mặt Trời). Hình dáng đĩa bồi tụ mỏng nhìn nghiêng ở đây lấy cảm hứng từ Gargantua (Interstellar) để minh họa trực quan hiệu ứng thấu kính hấp dẫn.',
      science: 'Shader trên trình duyệt giải gần đúng phương trình quỹ đạo tia sáng với tối đa 88 bước tích phân mỗi điểm ảnh. Phần đĩa bên trái sáng hơn bên phải do hiệu ứng tăng cường Doppler tương đối tính khi dòng khí quay về phía người nhìn. Đây là mô hình minh họa trực quan, không phải mô phỏng từ thủy động lực học đầy đủ.',
      lightColor: 0xf0a058,
      rimColor: 0xdec195,
      hotspots: [
        {
          id: 'bh-shadow',
          label: 'Chân trời sự kiện',
          tag: 'BÓNG TỐI TRUNG TÂM · VÒNG PHOTON',
          heading: 'Ranh giới không thể quay đầu',
          body: 'Vòng sáng mảnh ôm sát khoảng đen là nơi các hạt ánh sáng bị giữ trên quỹ đạo gần như tròn quanh hố đen trước khi thoát ra về phía cửa sổ tàu.',
          pos: [0, 2, -280],
          yaw: 0.0,
          pitch: 0.01
        },
        {
          id: 'bh-lensing',
          label: 'Vòm ánh sáng bẻ cong',
          tag: 'THẤU KÍNH HẤP DẪN',
          heading: 'Nhìn thấy cả mặt khuất phía sau',
          body: 'Vòm sáng phía trên và phía dưới bóng đen thực chất là mặt sau của đĩa bồi tụ. Trọng lực mạnh đến mức kéo ánh sáng từ phía khuất vòng qua đỉnh hố đen tới mắt bạn.',
          pos: [12, 36, -280],
          yaw: -0.05,
          pitch: 0.12
        },
        {
          id: 'bh-doppler',
          label: 'Đĩa bồi tụ',
          tag: 'HIỆU ỨNG DOPPLER TƯƠNG ĐỐI TÍNH',
          heading: 'Vì sao hai bên đĩa không sáng đều nhau?',
          body: 'Vật chất ở sườn bên trái đang xoay lao về phía tàu với vận tốc rất lớn nên ánh sáng bị dồn bước sóng và tăng độ chói hơn hẳn phía bên phải đang rời xa.',
          pos: [-48, -4, -280],
          yaw: 0.16,
          pitch: -0.02
        }
      ]
    },
    {
      id: 1,
      key: 'saturn',
      chipName: 'Sao Thổ',
      lightYears: 0.00015,
      coord: 'HỆ SAO THỔ · CÁCH ~1,28 GIỜ ÁNH SÁNG',
      eraText: 'Ánh sáng phản chiếu từ Sao Thổ mất khoảng 1 giờ 17 phút để về tới Trái Đất',
      phase: 'ĐIỂM DỪNG 02 · SAO THỔ & CÁC MẶT TRĂNG',
      title: 'Vòng băng cổ đại giữa khoảng không yên tĩnh.',
      description: 'Sao Thổ hiện ra trầm ấm trong ánh nắng xa xôi, được bao quanh bởi hệ vành đai băng trải rộng hàng trăm nghìn kilômét nhưng mỏng như một tờ giấy khi nhìn theo quy mô hành tinh.',
      authBadge: 'THIÊN THỂ THẬT · BẢN ĐỒ TƯ LIỆU DỰ ÁN',
      authText: 'Sao Thổ và vành đai được dựng trên khối cầu và mặt phẳng vành từ tệp bản đồ trong kho tư liệu dự án (Images/), kết hợp tính bóng đổ của hành tinh lên vành băng cùng hai mặt trăng minh họa Titan, Enceladus.',
      science: 'Vành đai Sao Thổ cấu tạo chủ yếu từ băng nước với kích thước từ hạt bụi nhỏ tới những tảng băng lớn. Phía xa bên phải là Titan với bầu khí quyển dày màu vàng cam; phía gần hơn là mặt trăng băng Enceladus.',
      lightColor: 0xe5cfa0,
      rimColor: 0xd4b886,
      hotspots: [
        {
          id: 'saturn-cassini',
          label: 'Vành đai băng',
          tag: 'RỘNG ~282.000 KM · DÀY ~10 MÉT',
          heading: 'Muôn vàn mảnh băng bay cùng nhịp',
          body: 'Nhìn từ xa vành đai giống một đĩa đặc liền mạch, nhưng thực chất là vô số hạt và tảng băng đang quay quanh Sao Thổ trên những quỹ đạo đồng tâm.',
          pos: [-68, -14, -350],
          yaw: 0.16,
          pitch: -0.04
        },
        {
          id: 'saturn-titan',
          label: 'Titan',
          tag: 'VỆ TINH LỚN NHẤT CỦA SAO THỔ',
          heading: 'Thế giới ẩn dưới màn sương cam',
          body: 'Titan là mặt trăng hiếm hoi có bầu khí quyển đặc. Dưới lớp mù hữu cơ màu hổ phách kia là những dòng sông và hồ chứa mêtan lỏng lạnh giá.',
          pos: [88, 26, -395],
          yaw: -0.20,
          pitch: 0.07
        },
        {
          id: 'saturn-enceladus',
          label: 'Enceladus',
          tag: 'MẶT TRĂNG BĂNG PHẢN XẠ CAO',
          heading: 'Đại dương ngầm dưới lớp vỏ trắng',
          body: 'Enceladus có bề mặt băng sạch phản chiếu hầu hết ánh sáng Mặt Trời. Ẩn bên dưới lớp vỏ đóng băng đó là một đại dương nước lỏng toàn cầu.',
          pos: [-48, -22, -278],
          yaw: 0.17,
          pitch: -0.08
        }
      ]
    },
    {
      id: 2,
      key: 'carina',
      chipName: 'Tinh vân Carina',
      lightYears: 7600,
      coord: 'NGC 3324 · KHÔNG GIAN KHÍ BỤI 3D / ~7.600 LY',
      eraText: 'Ánh sáng này rời tinh vân khoảng 7.600 năm trước — trước khi nhân loại có chữ viết',
      phase: 'ĐIỂM DỪNG 03 · VÁCH ĐÁ VŨ TRỤ CARINA (NGC 3324)',
      title: 'Những dải núi bụi cao bảy năm ánh sáng.',
      description: 'Trước ô kính là rìa vùng tạo sao NGC 3324 thuộc Tinh vân Carina. Những bức tường bụi màu đồng bên dưới đang bị gió sao và bức xạ tử ngoại từ các ngôi sao trẻ phía trên chậm rãi chạm khắc qua hàng triệu năm.',
      authBadge: 'KHÔNG GIAN 3D ĐA TẦNG · TƯ LIỆU JWST & THỂ TÍCH KHÍ BỤI',
      authText: 'Cảnh kết hợp trường khí bụi 3D tích phân theo tia sáng (ray-marching) với các khối cột bụi 3D chạm nổi từ tư liệu quan sát hồng ngoại của Kính viễn vọng Không gian James Webb (NASA/ESA/CSA/STScI). Chiều sâu 3D được diễn giải để phục vụ góc nhìn từ khoang tàu.',
      science: 'Trong quan sát hồng ngoại của James Webb, những dải khí màu xanh lam phía trên là vùng hydro bị ion hóa nóng bỏng, còn phần vách màu hổ phách bên dưới là bụi và khí phân tử lạnh hơn — nơi những ngôi sao mới đang hình thành.',
      lightColor: 0xe6a86a,
      rimColor: 0x68b8dc,
      hotspots: [
        {
          id: 'carina-peak',
          label: 'Vách đá bụi',
          tag: 'RÌA ĐÁM MÂY PHÂN TỬ · CAO ~7 NĂM ÁNH SÁNG',
          heading: 'Bờ vực giữa bóng tối lạnh và bức xạ trẻ',
          body: 'Những cột bụi nhô lên ở rìa vách là phần vật chất đặc hơn cả, đủ sức trụ lại trước luồng bức xạ dữ dội đang bào mòn đám mây xung quanh.',
          pos: [-155, -28, -520],
          yaw: 0.18,
          pitch: -0.04
        },
        {
          id: 'carina-cluster',
          label: 'Vùng sao trẻ',
          tag: 'VÙNG KHÍ ION HÓA H II',
          heading: 'Những mặt trời trẻ đang thổi dạt màn sương',
          body: 'Các ngôi sao nặng và nóng nằm phía trên bức tường bụi phát ra bức xạ tử ngoại mạnh, làm bốc hơi lớp sương mảnh bốc lên dọc sườn vách đá.',
          pos: [145, 68, -530],
          yaw: -0.18,
          pitch: 0.10
        }
      ]
    },
    {
      id: 3,
      key: 'butterfly',
      chipName: 'Tinh vân Hồ Điệp',
      lightYears: 3800,
      coord: 'NGC 6302 · MÔ HÌNH LƯỠNG CỰC 3D / ~3.800 LY',
      eraText: 'Ánh sáng khởi hành khoảng 3.800 năm trước từ chòm sao Thiên Yết',
      phase: 'ĐIỂM DỪNG 04 · TINH VÂN HỒ ĐIỆP (NGC 6302)',
      title: 'Đôi cánh cuối cùng của một ngôi sao già.',
      description: 'Khi một ngôi sao giống Mặt Trời đi đến cuối đời, nó trút bỏ lớp vỏ ngoài vào khoảng không. Vòng bụi đặc ở xích đạo giữ khí lại ở giữa, buộc hai luồng vật chất bung ra hai cực như một đôi cánh đang mở giữa đêm đen.',
      authBadge: 'MÔ HÌNH LƯỠNG CỰC 3D · TƯ LIỆU HUBBLE WFC3',
      authText: 'Cảnh kết hợp trường thể tích 3D lưỡng cực với mô hình phễu khí hai lớp và vành bụi xích đạo dựng từ tư liệu quan sát của Kính viễn vọng Không gian Hubble (NASA/ESA/STScI). Cấu trúc chiều sâu 3D được diễn giải từ hình thái tinh vân hành tinh lưỡng cực.',
      science: 'Ngôi sao lùn trắng ẩn ở tâm NGC 6302 có nhiệt độ bề mặt trên 200.000°C. Ánh sáng tử ngoại từ nó khiến khí nitơ, lưu huỳnh và oxy phát sáng rực rỡ theo từng dải màu đỏ cam và tím xanh.',
      lightColor: 0xe89060,
      rimColor: 0xd888b8,
      hotspots: [
        {
          id: 'bf-core',
          label: 'Vòng bụi trung tâm',
          tag: 'ĐĨA BỤI XÍCH ĐẠO · SAO LÙN TRẮNG ẨN KHUẤT',
          heading: 'Chiếc thắt lưng bụi định hình đôi cánh',
          body: 'Ở chính giữa là một vành bụi dày che khuất ngôi sao trung tâm cực nóng, ngăn khí thoát ra theo phương ngang và tạo nên hình dáng lưỡng cực đặc trưng.',
          pos: [-16, -8, -490],
          yaw: 0.04,
          pitch: -0.02
        },
        {
          id: 'bf-wings',
          label: 'Đôi cánh khí',
          tag: 'LUỒNG KHÍ ION HÓA · RỘNG HƠN 3 NĂM ÁNH SÁNG',
          heading: 'Lời từ biệt rực rỡ giữa không gian',
          body: 'Hai vòm khí đang giãn nở nhanh với vận tốc hàng trăm kilômét mỗi giây, mang theo những nguyên tố từng được tổng hợp bên trong lòng ngôi sao.',
          pos: [-125, 82, -480],
          yaw: 0.16,
          pitch: 0.11
        }
      ]
    }
  ];

  let state = 'observation';
  let viewMode = 'cupola';
  let freeBlend = 0;
  let currentDest = 0;
  let targetDest = 0;
  let warpTargetState = 'arrival';
  let startDistanceLY = 0.00004;
  let activeHotspotId = null;
  let focusZoom = 0;
  let panelMinimized = false;
  let labelsVisible = true;
  let paused = false, sound = false, hiddenUI = false;
  let elapsed = 0, time = 0, previous = performance.now(), raf = 0, failed = false;
  let idleTimer = 0;

  let renderer, scene, camera, sharedNoiseTex;
  let cabin, cabinFrameGroup, cabinPointLight, sillStripMat, glassMat, deckReflectMat;
  let stars, starMaterial, trails, warpTunnelGroup;
  let homePlanetGroup, earthMesh, sunMesh, sunCoronaMat, moonMesh, orbitFadeUniforms = [];
  let wondersGroup, blackHoleMesh, saturnGroup, saturnPlanetMesh, saturnRingMat, titanMesh, enceladusMesh;
  let volumetricNebulaMesh, carinaReliefMesh, butterflyReliefMesh;
  let volumeMesh = null, activeScene = -1;
  let starPositions, trailPositions, starSeeds, starVel, count, trailCount = 900, starTravelZ = 0;
  let qualityScale = 1.0, frameSamples = 0, frameTotalMs = 0;
  let yaw = 0, pitch = 0, targetYaw = 0, targetPitch = 0, pointer = null;
  let hotspotElements = [];
  let volumeSteps = 48;
  let qualitySince = 0;
  let saturnSpace = null;
  const navigation = {
    position: null,
    shipYaw: 0,
    shipPitch: 0,
    warpFromPos: null,
    warpFromYaw: 0,
    warpFromPitch: 0,
    manual: false,
    travel: null,
    keys: new Set(),
    anchor: 0
  };
  // Positions are relative to the target center. Paths follow an exterior arc, never a chord through gas/rings.
  const EXPLORATION = {
    1: {
      center: [0, 2, -350], min: 185, max: 420, speed: 65, vertical: 0.9,
      anchors: [
        { name: 'Phía sáng', p: [-225, 145, 245], text: 'Nhìn bóng vành đai nghiêng qua dải mây trầm.' },
        { name: 'Ngang vành băng', p: [265, 16, 180], text: 'Một hệ vành rộng lớn có thể mỏng đến mức gần biến mất.' },
        { name: 'Phía ngược sáng', p: [245, -100, -230], text: 'Tìm khoảng tối nơi hành tinh che ánh Mặt Trời trên vành đai.' }
      ]
    },
    2: {
      center: [0, -10, -580], min: 440, max: 850, speed: 95, vertical: 0.78,
      anchors: [
        { name: 'Toàn cảnh Carina', p: [0, 10, 580], text: 'Dành một lúc cho những khoảng rỗng giữa các khối cột bụi và hốc trời xanh.' },
        { name: 'Bên sườn cột bụi', p: [390, 90, 350], text: 'Các cột ở gần lần lượt che những vùng sáng xa hơn khi đổi góc nhìn.' },
        { name: 'Trên rìa sáng', p: [-330, 310, 310], text: 'Nhìn xuống ranh giới giữa khí ion hóa phát sáng và vùng bụi phân tử lạnh.' }
      ]
    },
    3: {
      center: [0, 4, -490], min: 410, max: 760, speed: 85, vertical: 0.82,
      anchors: [
        { name: 'Hai cánh khí', p: [0, -4, 490], text: 'Hai luồng khí lưỡng cực mở ra quanh vành bụi tối nhỏ bé ở tâm.' },
        { name: 'Bên lòng thùy', p: [420, 120, 340], text: 'Nhìn qua những lớp sợi sóng xung kích vào khoảng rỗng của thùy xa.' },
        { name: 'Qua vùng bụi eo', p: [-390, -140, 340], text: 'Vành bụi ở giữa che nguồn sáng trung tâm; đôi cánh vẫn phát sáng phía xa.' }
      ]
    }
  };

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const smooth = (a, b, v) => {
    const x = clamp((v - a) / (b - a), 0, 1);
    return x * x * (3 - 2 * x);
  };

  function announce(text) {
    if ($('announcement')) $('announcement').textContent = text;
  }

  function formatLY(ly) {
    if (ly < 0.00008) return 'QUỸ ĐẠO TRÁI ĐẤT · ~420 KM';
    if (ly < 0.001) return '1,28 GIỜ ÁNH SÁNG · QUỸ ĐẠO SAO THỔ (1,4 TỶ KM)';
    if (ly < 10) return `${ly.toFixed(2)} NĂM ÁNH SÁNG`;
    if (ly < 10000) return `${Math.round(ly).toLocaleString('vi-VN')} NĂM ÁNH SÁNG`;
    if (ly < 1000000) return `${(ly / 1000).toFixed(1)} NGHÌN NĂM ÁNH SÁNG`;
    return `~${(ly / 1000000).toFixed(1)} TRIỆU NĂM ÁNH SÁNG`;
  }

  function eraFromLY(ly) {
    if (ly < 0.00008) return 'Ánh sáng Mặt Trời mất 8 phút 20 giây để tới Trái Đất bên dưới bạn';
    if (ly < 0.01) return 'Ánh sáng phản chiếu từ Sao Thổ mất 1 giờ 17 phút để về tới Trái Đất';
    if (ly < 2) return 'Đang vượt qua Đám mây Oort · rìa ngoài cùng của Hệ Mặt Trời';
    if (ly < 85) {
      const yr = Math.round(2026 - ly);
      return `Ánh sáng rời đi năm ${yr} — thuở những tín hiệu vô tuyến đầu tiên rời Trái Đất`;
    }
    if (ly < 550) {
      const yr = Math.round(2026 - ly);
      return `Ánh sáng rời đi năm ${yr} SCN — thời kỳ Galileo hướng kính thiên văn lên bầu trời`;
    }
    if (ly < 2026) {
      const yr = Math.max(1, Math.round(2026 - ly));
      return `Ánh sáng khởi hành năm ${yr} SCN — đã bay hơn một thiên niên kỷ xuyên qua đêm đen`;
    }
    if (ly < 5200) {
      const bce = Math.round(ly - 2026);
      return `Ánh sáng từ ~${bce.toLocaleString('vi-VN')} TCN — thời đại các nền văn minh cổ đại đầu tiên`;
    }
    if (ly < 12000) {
      const bce = Math.round(ly - 2026);
      return `Ánh sáng từ ~${bce.toLocaleString('vi-VN')} TCN — trước cả khi nhân loại có chữ viết đầu tiên`;
    }
    return 'Ánh sáng từ tâm thiên hà M87 mất khoảng 55 triệu năm để vượt qua vũ trụ';
  }

  function updateTimeMachine(ly, customEra) {
    const distEl = $('tm-distance');
    const eraEl = $('tm-era');
    if (distEl) distEl.textContent = formatLY(ly);
    if (eraEl) eraEl.textContent = customEra || eraFromLY(ly);
  }

  /**
   * Computes dynamic layout spacing based on the actual rendered height and position of
   * the control dock (.controls) and header (.masthead) so #panel and #panel-reopen
   * never collide with .controls on 1440x900, 900x900, 390x844, or multi-row wraps.
   */
  function syncLayoutMetrics() {
    const rootStyle = document.documentElement.style;
    const controlsEl = $('controls');
    const mastheadEl = $('masthead');
    const hintEl = $('hint');

    let mastheadBottom = 64;
    if (!hiddenUI && mastheadEl && !mastheadEl.hidden) {
      const mRect = mastheadEl.getBoundingClientRect();
      if (mRect.height > 0) {
        mastheadBottom = Math.max(54, Math.ceil(mRect.bottom + 12));
      }
    }
    rootStyle.setProperty('--masthead-safe-top', `${mastheadBottom}px`);

    if (hiddenUI || !controlsEl || controlsEl.hidden) {
      rootStyle.setProperty('--panel-bottom', '24px');
      rootStyle.setProperty('--reopen-bottom', '24px');
      return;
    }

    const cRect = controlsEl.getBoundingClientRect();
    if (cRect.height <= 0) return;

    const panelMaxWidth = Math.min(356, innerWidth - 28);
    const panelLeft = Math.min(32, Math.max(12, innerWidth * 0.024));
    const panelRightEdge = panelLeft + panelMaxWidth;

    const dockTopFromBottom = Math.max(18, Math.ceil(innerHeight - cRect.top));
    rootStyle.setProperty('--flight-bottom',`${dockTopFromBottom+68}px`);
    const dockOverlapsLeftColumn = cRect.left <= panelRightEdge + 18 || innerWidth <= 1180;

    if (hintEl && !hiddenUI) {
      const hintOverlapsDock = cRect.left <= panelLeft + 510 || innerWidth <= 1180;
      hintEl.style.visibility = hintOverlapsDock ? 'hidden' : 'visible';
    }

    if (dockOverlapsLeftColumn) {
      const safeBottom = dockTopFromBottom + 12;
      rootStyle.setProperty('--panel-bottom', `${safeBottom}px`);
      rootStyle.setProperty('--reopen-bottom', `${safeBottom}px`);
    } else {
      const hintClearance = (hintEl && getComputedStyle(hintEl).display !== 'none' && hintEl.style.visibility !== 'hidden') ? 42 : 22;
      rootStyle.setProperty('--panel-bottom', `${hintClearance}px`);
      rootStyle.setProperty('--reopen-bottom', `${hintClearance}px`);
    }
  }

  function syncHotspotsVisibility() {
    const container = $('hotspots');
    if (!container) return;
    container.hidden = Boolean(failed || hiddenUI || !labelsVisible || state === 'warp');
  }

  function syncPanelMinimizedUI() {
    const panel = $('panel');
    const reopen = $('panel-reopen');
    const reopenLabel = $('panel-reopen-label');
    if (reopenLabel) {
      const titleText = $('title')?.textContent || 'Thông tin hành trình';
      reopenLabel.textContent = `Mở bảng thông tin · ${titleText}`;
    }
    if (hiddenUI) {
      if (panel) panel.hidden = true;
      if (reopen) reopen.hidden = true;
      return;
    }
    if (panel) panel.hidden = panelMinimized;
    if (reopen) reopen.hidden = !panelMinimized;
    syncLayoutMetrics();
    syncExplorationUI();
  }

  function setPanelMinimized(minimized) {
    panelMinimized = minimized;
    syncPanelMinimizedUI();
    if (minimized) {
      $('panel-reopen')?.focus();
    } else {
      $('panel-close')?.focus();
    }
  }

  function setLabelsVisible(nextVis) {
    labelsVisible = nextVis;
    const btn = $('toggle-labels');
    if (btn) {
      btn.textContent = labelsVisible ? 'Nhãn: bật' : 'Nhãn: tắt';
      btn.setAttribute('aria-pressed', String(labelsVisible));
    }
    if (!labelsVisible && activeHotspotId) {
      closeStoryCallout();
    }
    syncHotspotsVisibility();
    syncLayoutMetrics();
    announce(labelsVisible ? 'Đã bật nhãn điểm chạm trên bầu trời.' : 'Đã tắt nhãn để ngắm cảnh sạch.');
  }

  function resetIdleTimer() {
    document.body.classList.remove('ui-idle');
    clearTimeout(idleTimer);
    if (state === 'arrival' && !paused && !hiddenUI) {
      idleTimer = setTimeout(() => {
        if (state === 'arrival' && !paused && !hiddenUI && !document.querySelector('#panel details[open]')) {
          document.body.classList.add('ui-idle');
        }
      }, 7500);
    }
  }
  ['pointermove', 'pointerdown', 'keydown', 'wheel'].forEach(ev =>
    window.addEventListener(ev, resetIdleTimer, { passive: true })
  );

  // Exploration controller: world-position navigation is independent of looking around.
  function syncExplorationUI() {
    const available = state === 'arrival' && !!EXPLORATION[currentDest] && !failed;
    $('exploration').hidden = !available;
    $('touch-flight').hidden = !available || !navigation.manual || hiddenUI || paused || !panelMinimized;
    $('manual-flight').textContent = navigation.manual ? 'Tự di chuyển: bật' : 'Tự di chuyển: tắt';
    $('manual-flight').setAttribute('aria-pressed', String(navigation.manual));
    $('anchor-skip').hidden = !navigation.travel;
    $('anchor-skip').disabled = paused;
    $('manual-flight').disabled = paused;
    $('anchor-list').querySelectorAll('button').forEach((b, i) => {
      b.disabled = paused;
      b.setAttribute('aria-pressed', String(i === navigation.anchor));
    });
    $('reset').textContent = available ? 'Về toàn cảnh' : 'Nhìn thẳng';
    $('reference-image').hidden = !available || currentDest < 2;
  }

  function syncShipHeadingToCenter() {
    const cfg = EXPLORATION[currentDest];
    if (!cfg || !navigation.position || !window.THREE) return;
    const d = new THREE.Vector3(...cfg.center).sub(navigation.position);
    navigation.shipYaw = Math.atan2(-d.x, -d.z);
    navigation.shipPitch = Math.atan2(d.y, Math.hypot(d.x, d.z));
  }

  function resetExploration() {
    navigation.keys.clear();
    navigation.travel = null;
    navigation.manual = false;
    navigation.anchor = 0;
    navigation.shipYaw = 0;
    navigation.shipPitch = 0;
    const cfg = EXPLORATION[currentDest];
    $('anchor-list').replaceChildren();
    if (!cfg || failed || !window.THREE) {
      navigation.position = null;
      return;
    }
    navigation.position = new THREE.Vector3(...cfg.center).add(new THREE.Vector3(...cfg.anchors[0].p));
    syncShipHeadingToCenter();
    yaw = targetYaw = 0;
    pitch = targetPitch = 0;
    cfg.anchors.forEach((a, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.textContent = a.name;
      b.addEventListener('click', () => goToAnchor(i));
      $('anchor-list').appendChild(b);
    });
    $('anchor-invitation').textContent = cfg.anchors[0].text;
    $('reference-image').hidden = currentDest === 1;
    $('reference-image').href = currentDest === 2
      ? encodeURI('Images/tinh vân thuyền đế (Carina Nebula).png')
      : encodeURI('Images/ngc6302-hubble-hd.jpg');
  }

  function goToAnchor(index) {
    const cfg = EXPLORATION[currentDest];
    if (!cfg || failed || paused || state !== 'arrival' || !window.THREE) return;
    closeStoryCallout();
    navigation.keys.clear();
    navigation.manual = false;
    navigation.anchor = index;
    const center = new THREE.Vector3(...cfg.center);
    const start = navigation.position
      ? navigation.position.clone().sub(center)
      : new THREE.Vector3(...cfg.anchors[0].p);
    const end = new THREE.Vector3(...cfg.anchors[index].p);
    navigation.travel = { start, end, center, time: 0 };
    $('anchor-invitation').textContent = cfg.anchors[index].text;
    if (motion.matches) finishAnchor();
    syncExplorationUI();
    announce(cfg.anchors[index].name);
  }

  function finishAnchor() {
    if (!navigation.travel || paused) return;
    navigation.position.copy(navigation.travel.center).add(navigation.travel.end);
    navigation.travel = null;
    syncShipHeadingToCenter();
    yaw = targetYaw = 0;
    pitch = targetPitch = 0;
    syncExplorationUI();
  }

  function updateNavigation(dt) {
    const cfg = EXPLORATION[currentDest];
    if (state !== 'arrival' || !cfg || !navigation.position || !window.THREE) return;
    if (navigation.travel) {
      const t = navigation.travel;
      t.time += dt;
      const f = smooth(0, 3.8, t.time);
      const u = t.start.clone().normalize();
      const v = t.end.clone().normalize();
      const dotUV = clamp(u.dot(v), -1, 1);
      const omega = Math.acos(dotUV);
      let dir;
      if (omega < 0.0005) {
        dir = u.clone().lerp(v, f).normalize();
      } else {
        const sinO = Math.sin(omega);
        const w0 = Math.sin((1 - f) * omega) / sinO;
        const w1 = Math.sin(f * omega) / sinO;
        dir = u.clone().multiplyScalar(w0).addScaledVector(v, w1).normalize();
      }
      const r0 = t.start.length();
      const r1 = t.end.length();
      const radius = r0 + (r1 - r0) * f;
      navigation.position.copy(t.center).addScaledVector(dir, radius);
      syncShipHeadingToCenter();
      targetYaw *= Math.pow(0.18, dt);
      targetPitch *= Math.pow(0.18, dt);
      if (t.time >= 3.8) finishAnchor();
    } else if (navigation.manual && navigation.keys.size) {
      const totalYaw = navigation.shipYaw + yaw;
      const totalPitch = navigation.shipPitch + pitch;
      const forward = new THREE.Vector3(
        -Math.sin(totalYaw) * Math.cos(totalPitch),
        Math.sin(totalPitch),
        -Math.cos(totalYaw) * Math.cos(totalPitch)
      );
      const right = new THREE.Vector3(Math.cos(totalYaw), 0, -Math.sin(totalYaw));
      const move = new THREE.Vector3();
      const k = navigation.keys;
      move.addScaledVector(forward, (k.has('w') ? 1 : 0) - (k.has('s') ? 1 : 0));
      move.addScaledVector(right, (k.has('d') ? 1 : 0) - (k.has('a') ? 1 : 0));
      move.y += (k.has('e') ? 1 : 0) - (k.has('q') ? 1 : 0);
      if (move.lengthSq() > 0) {
        const center = new THREE.Vector3(...cfg.center);
        const rel = navigation.position.clone().sub(center);
        const r = rel.length();
        const radial = move.dot(rel) / Math.max(1, r);
        const ease = radial > 0 ? clamp((cfg.max - r) / 40, .08, 1) : clamp((r - cfg.min) / 40, .08, 1);
        const next = navigation.position.clone().addScaledVector(move.normalize(), cfg.speed * dt * ease).sub(center);
        // Keep the spacecraft outside the inner boundary and inside the outer boundary
        const clampVecLen = (vec, minL, maxL) => {
          const l = vec.length();
          if (l > 0.0001) {
            if (l < minL) vec.multiplyScalar(minL / l);
            else if (l > maxL) vec.multiplyScalar(maxL / l);
          }
        };
        clampVecLen(next, cfg.min, cfg.max);
        next.y = clamp(next.y, -cfg.max * cfg.vertical, cfg.max * cfg.vertical);
        clampVecLen(next, cfg.min, cfg.max);
        navigation.position.copy(center).add(next);
      }
    }
  }
  $('anchor-skip').addEventListener('click', finishAnchor);
  $('manual-flight').addEventListener('click', () => {
    if (paused) return;
    navigation.manual = !navigation.manual;
    navigation.travel = null;
    navigation.keys.clear();
    if (navigation.manual) {
      navigation.anchor = -1;
      navigation.shipYaw += yaw;
      navigation.shipPitch = clamp(navigation.shipPitch + pitch, -1.15, 1.15);
      yaw = targetYaw = 0;
      pitch = targetPitch = 0;
      setPanelMinimized(true);
      view.focus({ preventScroll: true });
    } else {
      syncShipHeadingToCenter();
      yaw = targetYaw = 0;
      pitch = targetPitch = 0;
    }
    syncExplorationUI();
  });
  document.addEventListener('keydown', e => {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || e.ctrlKey || e.altKey || e.metaKey) return;
    const key = e.key.toLowerCase();
    if (!'wasdqe'.includes(key) || key.length !== 1) return;
    if (state === 'arrival' && navigation.manual && !paused) {
      e.preventDefault();
      navigation.keys.add(key);
    }
  });
  document.addEventListener('keyup', e => navigation.keys.delete(e.key.toLowerCase()));
  addEventListener('blur', () => navigation.keys.clear());
  document.addEventListener('focusin', e => {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName)) navigation.keys.clear();
  });
  $('touch-flight').querySelectorAll('[data-move]').forEach(b => {
    b.addEventListener('pointerdown', e => {
      if (paused) return;
      e.preventDefault();
      b.setPointerCapture(e.pointerId);
      navigation.keys.add(b.dataset.move);
    });
    ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev =>
      b.addEventListener(ev, () => navigation.keys.delete(b.dataset.move))
    );
  });

  function audioSync() {
    if (!window.SpaceAudio) return;
    if (sound && !paused && !document.hidden) {
      if (!SpaceAudio.isPlaying && !SpaceAudio.startAmbient(0.22)) {
        sound = false;
        announce('Thiết bị chưa hỗ trợ âm thanh.');
      }
    } else if (SpaceAudio.isPlaying) {
      SpaceAudio.stopAmbient(0.3);
    }
    $('sound').textContent = sound ? 'Âm thanh: bật' : 'Âm thanh: tắt';
    $('sound').setAttribute('aria-pressed', String(sound));
  }

  function setViewMode(nextMode) {
    if (paused) return;
    viewMode = nextMode;
    const isFree = viewMode === 'free';
    document.body.dataset.viewMode = viewMode;
    const btn = $('view-mode');
    if (btn) {
      btn.textContent = isFree ? 'Góc nhìn: Ngoài không gian' : 'Góc nhìn: Khoang tàu';
      btn.setAttribute('aria-pressed', String(isFree));
    }
    if ($('telemetry-coord') && state === 'observation') {
      $('telemetry-coord').textContent = isFree
        ? 'FREE SPACE VIEW · QUỸ ĐẠO TRÁI ĐẤT'
        : 'ĐÀI QUAN SÁT CỦA PHÚC · VÒM KÍNH QUAN SÁT';
    }
    syncLayoutMetrics();
    announce(isFree ? 'Đã chuyển sang góc nhìn tự do ngoài không gian.' : 'Đã trở lại góc nhìn bên trong khoang tàu.');
  }

  function interfaceVisible(show) {
    hiddenUI = !show;
    document.body.classList.toggle('ui-hidden', hiddenUI);
    document.querySelectorAll('.interface').forEach(el => {
      if (el.id === 'hotspots') {
        syncHotspotsVisibility();
      } else if (el.id === 'panel' || el.id === 'panel-reopen') {
        // Handled by syncPanelMinimizedUI
      } else {
        el.hidden = hiddenUI;
      }
    });
    syncPanelMinimizedUI();
    syncExplorationUI();
    $('visibility').innerHTML = show
      ? 'Ẩn giao diện <span aria-hidden="true">↗</span>'
      : 'Hiện giao diện <span aria-hidden="true">↙</span>';
    $('visibility').setAttribute('aria-expanded', String(show));
    if (!show) $('visibility').focus();
    resetIdleTimer();
  }

  function closeStoryCallout() {
    activeHotspotId = null;
    focusZoom = 0;
    const callout = $('story-callout');
    if (callout) callout.hidden = true;
    hotspotElements.forEach(item => item.el.setAttribute('aria-pressed', 'false'));
    syncLayoutMetrics();
  }

  function selectHotspot(hs) {
    if (paused) return;
    activeHotspotId = hs.id;
    if (state === 'arrival' && EXPLORATION[currentDest] && navigation.position && window.THREE) {
      const d = new THREE.Vector3(...hs.pos).sub(navigation.position);
      const worldYaw = Math.atan2(-d.x, -d.z);
      const worldPitch = Math.atan2(d.y, Math.hypot(d.x, d.z));
      const dYaw = Math.atan2(Math.sin(worldYaw - navigation.shipYaw), Math.cos(worldYaw - navigation.shipYaw));
      const dPitch = worldPitch - navigation.shipPitch;
      targetYaw = clamp(dYaw, -0.34, 0.34);
      targetPitch = clamp(dPitch, -0.24, 0.24);
    } else {
      targetYaw = clamp(hs.yaw, -0.38, 0.38);
      targetPitch = clamp(hs.pitch, -0.26, 0.26);
    }
    focusZoom = 6;
    if (sound && window.SpaceAudio) {
      // Keep sound owned by the ambient controller so Pause and tab hiding stop it completely.
    }
    if (panelMinimized) {
      panelMinimized = false;
      syncPanelMinimizedUI();
    }
    const callout = $('story-callout');
    if (callout) {
      $('story-tag').textContent = hs.tag;
      $('story-heading').textContent = hs.heading;
      $('story-body').textContent = hs.body;
      callout.hidden = false;
    }
    hotspotElements.forEach(item => {
      item.el.setAttribute('aria-pressed', String(item.data.id === hs.id));
    });
    syncLayoutMetrics();
    resetIdleTimer();
  }

  function rebuildHotspots() {
    const container = $('hotspots');
    if (!container) return;
    container.innerHTML = '';
    hotspotElements = [];
    closeStoryCallout();

    if (failed || state === 'warp') {
      container.hidden = true;
      return;
    }

    const list = state === 'arrival' ? DESTINATIONS[currentDest].hotspots : ORBIT_HOTSPOTS;
    list.forEach(hs => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hotspot-pin';
      btn.setAttribute('aria-pressed', 'false');
      btn.innerHTML = `<span class="hotspot-dot" aria-hidden="true"></span><span>${hs.label}</span>`;
      btn.addEventListener('click', e => {
        e.stopPropagation();
        if (activeHotspotId === hs.id) {
          closeStoryCallout();
          targetYaw = 0;
          targetPitch = 0;
        } else {
          selectHotspot(hs);
        }
      });
      container.appendChild(btn);
      hotspotElements.push({ el: btn, data: hs });
    });

    syncHotspotsVisibility();
  }

  function loadSavedMoment() {
    const preview = $('moment-saved-preview');
    const input = $('moment-input');
    if (!preview || !input) return;
    try {
      const store = JSON.parse(localStorage.getItem('phuc.voyage.notes.v1') || '{}');
      const key = DESTINATIONS[currentDest].key;
      if (store[key] && store[key].text) {
        preview.hidden = false;
        preview.textContent = `“${store[key].text}”`;
        input.value = store[key].text;
      } else {
        preview.hidden = true;
        preview.textContent = '';
        input.value = '';
      }
    } catch {
      preview.hidden = true;
    }
  }

  function updateDestinationChips() {
    const locked = state === 'warp' || paused;
    document.querySelectorAll('.dest-chip').forEach(btn => {
      const d = Number(btn.dataset.dest);
      const isSelected = d === targetDest;
      btn.classList.toggle('active', isSelected);
      btn.setAttribute('aria-pressed', String(isSelected));
      btn.disabled = locked;
    });
  }

  function applyPanelCopy(nextState) {
    const panel = $('panel');
    if (panel && !motion.matches) {
      panel.classList.add('panel-fade');
      setTimeout(() => panel.classList.remove('panel-fade'), 180);
    }
    const dest = DESTINATIONS[currentDest];
    if (nextState === 'arrival') {
      $('phase').textContent = dest.phase;
      $('title').textContent = dest.title;
      $('description').textContent = dest.description;
      if ($('auth-badge')) $('auth-badge').textContent = dest.authBadge;
      if ($('auth-text')) $('auth-text').textContent = dest.authText;
      if ($('scene-science-note')) $('scene-science-note').textContent = dest.science;
      if ($('telemetry-coord')) $('telemetry-coord').textContent = dest.coord;
      updateTimeMachine(dest.lightYears, dest.eraText);
      if ($('moment-journal')) {
        $('moment-journal').hidden = false;
        loadSavedMoment();
      }
    } else if (nextState === 'warp') {
      if (warpTargetState === 'observation') {
        $('phase').textContent = 'HÀNH TRÌNH TRỞ VỀ · QUỸ ĐẠO TRÁI ĐẤT';
        $('title').textContent = 'Trở về hành tinh xanh.';
        $('description').textContent = 'Rời khỏi vùng không gian sâu, con tàu quay mũi hướng về phía ánh nắng Mặt Trời và quả cầu Trái Đất quen thuộc.';
      } else {
        const upcoming = DESTINATIONS[targetDest];
        $('phase').textContent = `ĐANG HÀNH TRÌNH · ${upcoming.chipName.toUpperCase()}`;
        $('title').textContent = 'Rời quỹ đạo Trái Đất.';
        $('description').textContent = `Trái Đất và Mặt Trời đã lùi lại phía sau lưng tàu — đang hướng tới ${upcoming.chipName}.`;
      }
      if ($('auth-badge')) $('auth-badge').textContent = 'CHUYỂN CẢNH GIẢ TƯỞNG';
      if ($('auth-text')) $('auth-text').textContent = 'Hiệu ứng kéo vệt sao và bước nhảy không gian là phần chuyển cảnh giả tưởng để nối liền các điểm dừng cách nhau nhiều năm ánh sáng.';
      if ($('telemetry-coord')) $('telemetry-coord').textContent = 'INTERSTELLAR TRANSIT · FICTIONAL WARP';
      if ($('moment-journal')) $('moment-journal').hidden = true;
    } else {
      $('phase').textContent = 'KHOANG QUAN SÁT · QUỸ ĐẠO TRÁI ĐẤT';
      $('title').textContent = 'Bên kia ô kính.';
      $('description').textContent = 'Bên dưới mũi tàu là Trái Đất đang quay chậm dưới lớp mây mỏng; phía xa là Mặt Trăng và ánh nắng Mặt Trời. Hãy nhìn quanh hoặc chọn một điểm hẹn ngoài vũ trụ để lên đường.';
      if ($('auth-badge')) $('auth-badge').textContent = 'TƯ LIỆU & CÁCH DỰNG';
      if ($('auth-text')) $('auth-text').textContent = 'Trái Đất, Mặt Trăng và Mặt Trời dựng trên khối cầu từ bản đồ bề mặt trong kho tư liệu dự án, kết hợp hiệu ứng mây và khí quyển trên trình duyệt.';
      if ($('scene-science-note')) {
        $('scene-science-note').textContent = 'Khung cảnh quỹ đạo kết hợp các khối cầu hành tinh có chiếu sáng theo hướng Mặt Trời cùng trường sao nhiều lớp cự ly. Mọi giải thích kỹ thuật và nguồn tư liệu của từng vùng trời đều được ghi rõ tại đây.';
      }
      if ($('telemetry-coord')) {
        $('telemetry-coord').textContent = viewMode === 'free'
          ? 'FREE SPACE VIEW · QUỸ ĐẠO TRÁI ĐẤT'
          : 'ĐÀI QUAN SÁT CỦA PHÚC · VÒM KÍNH QUAN SÁT';
      }
      updateTimeMachine(0.00004, 'Ánh sáng Mặt Trời mất 8 phút 20 giây để tới Trái Đất bên dưới bạn');
      if ($('moment-journal')) $('moment-journal').hidden = true;
    }
    syncPanelMinimizedUI();
  }

  function setState(next) {
    state = next;
    elapsed = 0;
    focusZoom = 0;
    document.body.dataset.state = state;
    document.body.dataset.destination = String(currentDest);
    if (next === 'arrival') {
      resetExploration();
      if (EXPLORATION[currentDest] && $('exploration')) {
        $('exploration').open = true;
      }
    } else {
      navigation.keys.clear();
      navigation.travel = null;
      navigation.manual = false;
      navigation.position = null;
      navigation.shipYaw = 0;
      navigation.shipPitch = 0;
    }
    syncExplorationUI();

    applyPanelCopy(state);
    rebuildHotspots();
    updateDestinationChips();

    const nextDestIndex = (currentDest + 1) % DESTINATIONS.length;
    if (state === 'arrival') {
      $('warp').textContent = `Bay tiếp · ${DESTINATIONS[targetDest === currentDest ? nextDestIndex : targetDest].chipName} ↗`;
    } else {
      $('warp').textContent = `Khởi hành · ${DESTINATIONS[targetDest].chipName} ↗`;
    }
    $('warp').disabled = state === 'warp' || paused;
    $('skip').hidden = state !== 'warp';
    $('return-orbit').hidden = state !== 'arrival';
    $('shade').style.opacity = '0';
    syncLayoutMetrics();
    announce($('title').textContent);
    resetIdleTimer();
  }

  function syncDestinationVisibility(destIndex) {
    if (!wondersGroup) return;
    ensureDestination(destIndex);
    if (blackHoleMesh) blackHoleMesh.visible = destIndex === 0;
    if (saturnGroup) saturnGroup.visible = destIndex === 1;
    if (carinaReliefMesh) carinaReliefMesh.visible = destIndex === 2;
    if (butterflyReliefMesh) butterflyReliefMesh.visible = destIndex === 3;
    if (volumetricNebulaMesh) {
      volumetricNebulaMesh.visible = destIndex === 2 || destIndex === 3;
      if (volumetricNebulaMesh.material && volumetricNebulaMesh.material.uniforms) {
        volumetricNebulaMesh.material.uniforms.uNebulaMode.value = destIndex === 2 ? 0.0 : 1.0;
      }
    }

    const dInfo = DESTINATIONS[destIndex];
    if (cabinPointLight) {
      cabinPointLight.color.setHex(dInfo.lightColor);
    }
    if (sillStripMat) {
      sillStripMat.color.setHex(dInfo.rimColor);
    }
    if (deckReflectMat) {
      deckReflectMat.color.setHex(dInfo.lightColor);
      deckReflectMat.color.multiplyScalar(.16);
    }
    if (glassMat && glassMat.uniforms && glassMat.uniforms.tintColor) {
      glassMat.uniforms.tintColor.value.setHex(dInfo.rimColor);
    }
  }

  function startWarpTo(destIdx, toState = 'arrival') {
    if (paused || state === 'warp') return;
    startDistanceLY = state === 'arrival' ? DESTINATIONS[currentDest].lightYears : 0.00004;
    targetDest = destIdx;
    warpTargetState = toState;
    updateDestinationChips();
    // Ambient supports Pause; do not start an uninterruptible one-shot during warp.
    if (failed) {
      currentDest = targetDest;
      setState(toState);
      return;
    }
    if (camera) {
      navigation.warpFromPos = [camera.position.x, camera.position.y, camera.position.z];
    } else {
      navigation.warpFromPos = [0, 0, 0];
    }
    navigation.warpFromYaw = navigation.shipYaw + yaw;
    navigation.warpFromPitch = navigation.shipPitch + pitch;
    targetYaw = 0;
    targetPitch = 0;
    setState('warp');
  }

  function arrive() {
    const focusedSkip = document.activeElement === $('skip');
    currentDest = targetDest;
    syncDestinationVisibility(currentDest);
    setState(warpTargetState);
    if (focusedSkip) $('warp').focus();
    draw(0);
  }

  // Event bindings
  $('warp').addEventListener('click', () => {
    if (paused || state === 'warp') return;
    if (state === 'arrival' && targetDest === currentDest) {
      targetDest = (currentDest + 1) % DESTINATIONS.length;
    }
    startWarpTo(targetDest, 'arrival');
  });

  $('return-orbit')?.addEventListener('click', () => {
    if (paused || state === 'warp') return;
    startWarpTo(currentDest, 'observation');
  });

  $('view-mode')?.addEventListener('click', () => {
    setViewMode(viewMode === 'cupola' ? 'free' : 'cupola');
  });

  $('toggle-labels')?.addEventListener('click', () => {
    setLabelsVisible(!labelsVisible);
  });

  $('panel-close')?.addEventListener('click', () => setPanelMinimized(true));
  $('panel-reopen')?.addEventListener('click', () => setPanelMinimized(false));

  $('story-close')?.addEventListener('click', () => {
    closeStoryCallout();
    targetYaw = 0;
    targetPitch = 0;
  });

  document.querySelectorAll('.dest-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      // Lock destination strictly during active warp or when paused
      if (paused || state === 'warp') return;
      const chosen = Number(btn.dataset.dest);
      targetDest = chosen;
      updateDestinationChips();
      if (state === 'arrival' && chosen !== currentDest) {
        startWarpTo(chosen, 'arrival');
      } else if (state === 'observation') {
        $('warp').textContent = `Khởi hành · ${DESTINATIONS[targetDest].chipName} ↗`;
        syncLayoutMetrics();
      }
    });
  });

  $('moment-form')?.addEventListener('submit', e => {
    e.preventDefault();
    const input = $('moment-input');
    const status = $('moment-status');
    if (!input) return;
    const text = input.value.trim();
    try {
      const store = JSON.parse(localStorage.getItem('phuc.voyage.notes.v1') || '{}');
      const key = DESTINATIONS[currentDest].key;
      if (text) {
        store[key] = { text, date: new Date().toISOString() };
        localStorage.setItem('phuc.voyage.notes.v1', JSON.stringify(store));
        if (status) status.textContent = 'Đã giữ lại trong ký ức trình duyệt.';
      } else {
        delete store[key];
        localStorage.setItem('phuc.voyage.notes.v1', JSON.stringify(store));
        if (status) status.textContent = 'Đã xóa ghi chú ở điểm dừng này.';
      }
      loadSavedMoment();
    } catch {
      if (status) status.textContent = 'Trình duyệt đang chặn lưu cục bộ.';
    }
  });

  $('skip').addEventListener('click', arrive);
  $('pause').addEventListener('click', () => {
    paused = !paused;
    navigation.keys.clear();
    syncExplorationUI();
    $('pause').textContent = paused ? 'Tiếp tục' : 'Tạm dừng';
    $('pause').setAttribute('aria-pressed', String(paused));
    $('warp').disabled = paused || state === 'warp';
    $('skip').disabled = paused;
    if ($('return-orbit')) $('return-orbit').disabled = paused;
    updateDestinationChips();
    audioSync();
    syncLayoutMetrics();
    announce(paused ? 'Chuyển động đã tạm dừng.' : 'Tiếp tục quan sát.');
  });
  $('sound').addEventListener('click', () => { sound = !sound; audioSync(); syncLayoutMetrics(); });
  $('visibility').addEventListener('click', () => interfaceVisible(hiddenUI));
  $('reset').addEventListener('click', () => {
    if (!paused) {
      closeStoryCallout();
      targetYaw = 0;
      targetPitch = 0;
      if (state === 'arrival' && EXPLORATION[currentDest]) {
        goToAnchor(0);
        return;
      }
    }
  });

  document.addEventListener('keydown', e => {
    const tag = document.activeElement?.tagName?.toLowerCase();
    if (tag === 'textarea' || tag === 'input') return;
    if (e.key === 'Escape') {
      if (activeHotspotId) closeStoryCallout();
      else interfaceVisible(true);
    } else if (e.key.toLowerCase() === 'h') {
      interfaceVisible(hiddenUI);
    } else if (e.key.toLowerCase() === 'v') {
      setViewMode(viewMode === 'cupola' ? 'free' : 'cupola');
    } else if (e.key.toLowerCase() === 'l') {
      setLabelsVisible(!labelsVisible);
    }
  });

  view.addEventListener('keydown', e => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) return;
    e.preventDefault();
    if (paused || state === 'warp') return;
    const dy = e.key === 'ArrowLeft' ? 0.042 : e.key === 'ArrowRight' ? -0.042 : 0;
    const dp = e.key === 'ArrowUp' ? 0.032 : e.key === 'ArrowDown' ? -0.032 : 0;
    if (state === 'arrival' && navigation.manual) {
      navigation.shipYaw += dy;
      navigation.shipPitch = clamp(navigation.shipPitch + dp, -1.15, 1.15);
      targetYaw = clamp(targetYaw + dy * 0.25, -0.22, 0.22);
      targetPitch = clamp(targetPitch + dp * 0.25, -0.16, 0.16);
    } else {
      const maxY = viewMode === 'free' ? 0.56 : 0.36;
      const maxP = viewMode === 'free' ? 0.38 : 0.24;
      targetYaw = clamp(targetYaw + dy, -maxY, maxY);
      targetPitch = clamp(targetPitch + dp, -maxP, maxP);
    }
  });

  view.addEventListener('pointerdown', e => {
    if (paused || state === 'warp' || pointer) return;
    pointer = { id: e.pointerId, x: e.clientX, y: e.clientY };
    view.setPointerCapture(e.pointerId);
    view.focus({ preventScroll: true });
  });
  view.addEventListener('pointermove', e => {
    if (!pointer || pointer.id !== e.pointerId) return;
    if (!paused && state !== 'warp') {
      const dx = (e.clientX - pointer.x) / innerWidth;
      const dy = (e.clientY - pointer.y) / innerHeight;
      if (state === 'arrival' && navigation.manual) {
        navigation.shipYaw += dx * 1.65;
        navigation.shipPitch = clamp(navigation.shipPitch + dy * 0.95, -1.15, 1.15);
        targetYaw = clamp(targetYaw + dx * 0.35, -0.24, 0.24);
        targetPitch = clamp(targetPitch + dy * 0.25, -0.18, 0.18);
      } else {
        const maxY = viewMode === 'free' ? 0.56 : 0.36;
        const maxP = viewMode === 'free' ? 0.38 : 0.24;
        targetYaw = clamp(targetYaw + dx * 0.72, -maxY, maxY);
        targetPitch = clamp(targetPitch + dy * 0.48, -maxP, maxP);
      }
    }
    pointer.x = e.clientX;
    pointer.y = e.clientY;
  });
  ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev =>
    view.addEventListener(ev, () => { pointer = null; })
  );
  view.addEventListener('wheel', e => {
    if (paused || state === 'warp') return;
    e.preventDefault();
    focusZoom = clamp(focusZoom - Math.sign(e.deltaY) * 2.0, -12, 14);
  }, { passive: false });

  function fallback(reason) {
    failed = true;
    cancelAnimationFrame(raf);
    document.body.classList.remove('webgl');
    if (renderer) renderer.domElement.hidden = true;
    if ($('hotspots')) $('hotspots').hidden = true;
    if ($('toggle-labels')) $('toggle-labels').hidden = true;
    if ($('view-mode')) $('view-mode').hidden = true;
    $('fallback').hidden = false;
    $('fallback').textContent = reason + ' Bạn vẫn có thể xem khung cảnh tĩnh bằng nút Khởi hành.';
    panelMinimized=false;interfaceVisible(true);announce(reason);
    $('reset').disabled = true;
    syncExplorationUI();
    if (state === 'warp') setState(warpTargetState);
    $('shade').style.opacity = '0';
    syncLayoutMetrics();
  }

  /**
   * Scales the normalized cupola window geometry to match the exact viewport aspect ratio
   * at z = -7.5 so that on landscape (16:9), square (900x900), and portrait (390x844) screens,
   * the upper arch, side mullions, and lower observation sill always frame the outer periphery
   * without vanishing off-screen or blocking the center with dark bars.
   */
  function updateCabinFraming() {
    if (!cabinFrameGroup || !camera) return;
    const halfH = Math.tan((camera.fov * 0.5) * Math.PI / 180) * 7.5;
    const halfW = halfH * camera.aspect;
    cabinFrameGroup.scale.set(halfW, halfH, 1.0);
  }

  function buildCabin(T) {
    cabin = new T.Group();
    cabin.rotation.order = 'YXZ';
    cabin.renderOrder = 6;
    scene.add(cabin);

    cabinFrameGroup = new T.Group();
    cabinFrameGroup.renderOrder = 6;
    cabin.add(cabinFrameGroup);

    const frameMetal = new T.MeshStandardMaterial({
      color: 0x0b1522,
      roughness: 0.36,
      metalness: 0.82
    });
    const darkTrim = new T.MeshStandardMaterial({
      color: 0x050a12,
      roughness: 0.68,
      metalness: 0.45
    });
    const iceEdgeMat = new T.MeshBasicMaterial({
      color: 0x89bdc8,
      transparent: true,
      opacity: 0.34
    });

    // Built in normalized viewport coordinates at z = -7.5 (x in [-1..1], y in [-1..1])
    const archCurves = [
      // Left peripheral window mullion
      new T.CatmullRomCurve3([
        new T.Vector3(-1.04, -0.96, -7.25),
        new T.Vector3(-0.98, -0.32, -7.42),
        new T.Vector3(-0.95,  0.42, -7.48),
        new T.Vector3(-0.82,  0.90, -7.52)
      ]),
      // Right peripheral window mullion
      new T.CatmullRomCurve3([
        new T.Vector3(1.04, -0.96, -7.25),
        new T.Vector3(0.98, -0.32, -7.42),
        new T.Vector3(0.95,  0.42, -7.48),
        new T.Vector3(0.82,  0.90, -7.52)
      ]),
      // Upper canopy window rim
      new T.CatmullRomCurve3([
        new T.Vector3(-0.95, 0.42, -7.48),
        new T.Vector3(-0.62, 0.88, -7.52),
        new T.Vector3(0.0,   0.94, -7.55),
        new T.Vector3(0.62,  0.88, -7.52),
        new T.Vector3(0.95,  0.42, -7.48)
      ]),
      // Outer upper hull cowling at periphery
      new T.CatmullRomCurve3([
        new T.Vector3(-1.12, 0.52, -7.15),
        new T.Vector3(-0.68, 0.99, -7.25),
        new T.Vector3(0.0,   1.05, -7.30),
        new T.Vector3(0.68,  0.99, -7.25),
        new T.Vector3(1.12,  0.52, -7.15)
      ])
    ];

    archCurves.forEach((curve, idx) => {
      const radius = idx === 3 ? 0.048 : 0.032;
      const tubeGeo = new T.TubeGeometry(curve, 40, radius, 10, false);
      const mesh = new T.Mesh(tubeGeo, idx === 3 ? darkTrim : frameMetal);
      mesh.renderOrder = 6;
      cabinFrameGroup.add(mesh);

      if (idx < 3) {
        const rimGeo = new T.TubeGeometry(curve, 36, 0.0045, 6, false);
        const rimMesh = new T.Mesh(rimGeo, iceEdgeMat);
        rimMesh.scale.set(0.992, 0.992, 1);
        rimMesh.renderOrder = 6;
        cabinFrameGroup.add(rimMesh);
      }
    });

    // Lower observation sill rail at the bottom periphery (y = -0.88..-0.93)
    const consoleCurve = new T.CatmullRomCurve3([
      new T.Vector3(-1.08, -0.94, -7.25),
      new T.Vector3(-0.55, -0.89, -7.45),
      new T.Vector3(0.0,   -0.87, -7.50),
      new T.Vector3(0.55,  -0.89, -7.45),
      new T.Vector3(1.08,  -0.94, -7.25)
    ]);
    const railMesh = new T.Mesh(new T.TubeGeometry(consoleCurve, 40, 0.028, 10, false), frameMetal);
    railMesh.renderOrder = 6;
    cabinFrameGroup.add(railMesh);

    // Subtle warm rim-light strip along the observation sill
    const goldCurve = new T.CatmullRomCurve3([
      new T.Vector3(-0.78, -0.875, -7.38),
      new T.Vector3(-0.38, -0.855, -7.46),
      new T.Vector3(0.0,   -0.848, -7.48),
      new T.Vector3(0.38,  -0.855, -7.46),
      new T.Vector3(0.78,  -0.875, -7.38)
    ]);
    sillStripMat = new T.MeshBasicMaterial({
      color: 0xdec195,
      transparent: true,
      opacity: 0.68
    });
    const goldStrip = new T.Mesh(new T.TubeGeometry(goldCurve, 32, 0.0038, 6, false), sillStripMat);
    goldStrip.renderOrder = 6;
    cabinFrameGroup.add(goldStrip);

    // Lower observation deck shelf catching soft exterior light
    const deckGeo = new T.PlaneGeometry(2.35, 0.42, 24, 4);
    const posAttr = deckGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const px = posAttr.getX(i);
      posAttr.setZ(i, posAttr.getZ(i) + Math.pow(px, 2) * 0.08);
    }
    deckGeo.computeVertexNormals();

    deckReflectMat = new T.MeshStandardMaterial({
      color: 0x0a1624,
      roughness: 0.28,
      metalness: 0.86
    });
    const deckMesh = new T.Mesh(deckGeo, deckReflectMat);
    deckMesh.position.set(0, -1.02, -7.15);
    deckMesh.rotation.x = -Math.PI * 0.36;
    deckMesh.renderOrder = 6;
    cabinFrameGroup.add(deckMesh);

    // Ultra-clean observation glass: subtle peripheral reflection only, never obscuring the cosmos
    glassMat = new T.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        reveal: { value: 0 },
        tintColor: { value: new T.Color(0xa5cfd5) }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float reveal;
        uniform vec3 tintColor;
        void main() {
          vec2 c = vUv - 0.5;
          float dist = length(c * vec2(1.02, 1.15));
          float edgeGlow = smoothstep(0.52, 0.74, dist);
          float upperSheen = smoothstep(0.58, 0.82, vUv.x * 0.55 + vUv.y * 0.85) * smoothstep(0.45, 0.68, dist);
          float alpha = edgeGlow * 0.018 + upperSheen * (0.008 + reveal * 0.010);
          gl_FragColor = vec4(tintColor, alpha);
        }
      `
    });
    const glassPane = new T.Mesh(new T.PlaneGeometry(2.2, 2.1), glassMat);
    glassPane.position.set(0, 0.02, -7.52);
    glassPane.renderOrder = 6;
    cabinFrameGroup.add(glassPane);

    updateCabinFraming();
  }

  /**
   * Generates a pre-baked 256x256 seamless tileable RGBA noise texture once on CPU.
   * R: smooth noise, G: 3-octave FBM, B: 4-octave Ridged Multifractal, A: fine detail.
   */
  function createSeamlessNoiseTexture(T) {
    const size = 256;
    const data = new Uint8Array(size * size * 4);
    const perm = new Uint8Array(512);
    const val = new Float32Array(256);
    let s = 1337;
    for (let i = 0; i < 256; i++) {
      s = (1664525 * s + 1013904223) >>> 0;
      perm[i] = perm[i + 256] = (s >>> 24) & 255;
      val[i] = (s >>> 8) / 16777216;
    }

    function pNoise(x, y, period) {
      const px = x * period;
      const py = y * period;
      const ix = Math.floor(px);
      const iy = Math.floor(py);
      const fx = px - ix;
      const fy = py - iy;
      const u = fx * fx * (3 - 2 * fx);
      const v = fy * fy * (3 - 2 * fy);
      const x0 = ((ix % period) + period) % period;
      const x1 = (x0 + 1) % period;
      const y0 = ((iy % period) + period) % period;
      const y1 = (y0 + 1) % period;
      const a = val[perm[(x0 + perm[y0 & 255]) & 255]];
      const b = val[perm[(x1 + perm[y0 & 255]) & 255]];
      const c = val[perm[(x0 + perm[y1 & 255]) & 255]];
      const d = val[perm[(x1 + perm[y1 & 255]) & 255]];
      return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
    }

    for (let y = 0; y < size; y++) {
      const ny = y / size;
      for (let x = 0; x < size; x++) {
        const nx = x / size;
        const n1 = pNoise(nx, ny, 8);
        const n2 = pNoise(nx + 0.37, ny + 0.61, 16);
        const n3 = pNoise(nx + 0.73, ny + 0.19, 32);
        const n4 = pNoise(nx + 0.11, ny + 0.83, 64);

        const fbm = n1 * 0.52 + n2 * 0.30 + n3 * 0.18;

        const r1 = 1 - Math.abs(n1 * 2 - 1);
        const r2 = 1 - Math.abs(n2 * 2 - 1);
        const r3 = 1 - Math.abs(n3 * 2 - 1);
        const r4 = 1 - Math.abs(n4 * 2 - 1);
        const ridged = (r1 * r1 * 0.46 + r2 * r2 * 0.29 + r3 * r3 * 0.16 + r4 * r4 * 0.09);

        const idx = (y * size + x) * 4;
        data[idx]     = Math.min(255, Math.max(0, Math.round(n1 * 255)));
        data[idx + 1] = Math.min(255, Math.max(0, Math.round(fbm * 255)));
        data[idx + 2] = Math.min(255, Math.max(0, Math.round(ridged * 255)));
        data[idx + 3] = Math.min(255, Math.max(0, Math.round((n3 * 0.6 + n4 * 0.4) * 255)));
      }
    }

    const tex = new T.DataTexture(data, size, size, T.RGBAFormat);
    tex.wrapS = T.RepeatWrapping;
    tex.wrapT = T.RepeatWrapping;
    tex.magFilter = T.LinearFilter;
    tex.minFilter = T.LinearMipmapLinearFilter;
    tex.generateMipmaps = true;
    tex.needsUpdate = true;
    return tex;
  }

  function buildEarthOrbitScene(T, loader) {
    homePlanetGroup = new T.Group();
    orbitFadeUniforms = [];
    scene.add(homePlanetGroup);

    const earthTex = loader.load(encodeURI('Images/trái đất.jpg'));
    const sunTex = loader.load(encodeURI('Images/mặt trời.jpg'));
    const moonTex = loader.load(encodeURI('Images/mặt trăng.jpg'));

    const sunDir = new T.Vector3(86, 126, -198).normalize();

    const earthMat = new T.ShaderMaterial({
      transparent: true,
      uniforms: {
        uMap: { value: earthTex },
        uNoiseTex: { value: sharedNoiseTex },
        uSunDir: { value: sunDir },
        uTime: { value: 0 },
        uOpacity: { value: 1.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormalWorld;
        varying vec3 vViewDir;
        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vNormalWorld = normalize(mat3(modelMatrix) * normal);
          vViewDir = normalize(cameraPosition - worldPos.xyz);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormalWorld;
        varying vec3 vViewDir;
        uniform sampler2D uMap;
        uniform sampler2D uNoiseTex;
        uniform vec3 uSunDir;
        uniform float uTime;
        uniform float uOpacity;

        void main() {
          vec3 rawTex = texture2D(uMap, vUv).rgb;
          float isWater = clamp((rawTex.b - max(rawTex.r, rawTex.g)) * 3.8, 0.0, 1.0);
          float luma = dot(rawTex, vec3(0.299, 0.587, 0.114));
          vec3 mutedLand = mix(vec3(luma), rawTex, 0.48) * vec3(0.82, 0.80, 0.74);
          vec3 deepOcean = mix(vec3(0.025, 0.075, 0.16), vec3(0.06, 0.16, 0.28), luma);
          vec3 albedo = mix(mutedLand, deepOcean, isWater);

          vec2 cloudUv = vUv * vec2(2.2, 1.2) + vec2(uTime * 0.0008, 0.0);
          vec4 nWarp = texture2D(uNoiseTex, cloudUv);
          vec4 nCloud = texture2D(uNoiseTex, cloudUv * 1.85 + (nWarp.rg - 0.5) * 0.28);
          float clouds = smoothstep(0.45, 0.72, nCloud.g * 0.65 + nCloud.b * 0.35);

          albedo *= (1.0 - clouds * 0.22);
          albedo = mix(albedo, vec3(0.92, 0.95, 0.98), clouds * 0.82);

          float ndotl = dot(vNormalWorld, uSunDir);
          float daylight = smoothstep(-0.16, 0.55, ndotl);
          float twilight = exp(-pow((ndotl - 0.02) * 6.5, 2.0));

          float viewCos = max(0.0, dot(vNormalWorld, vViewDir));
          float horizonHaze = pow(1.0 - viewCos, 2.8);
          vec3 rayleighCol = mix(vec3(0.18, 0.46, 0.82), vec3(0.85, 0.62, 0.42), twilight * 0.6);

          vec3 nightSide = albedo * vec3(0.03, 0.05, 0.09);
          vec3 daySide = albedo * (0.12 + 0.88 * daylight);
          vec3 col = mix(nightSide, daySide, smoothstep(-0.2, 0.18, ndotl));
          col = mix(col, rayleighCol, horizonHaze * (0.22 + 0.62 * daylight));

          float edgeFeather = smoothstep(0.02, 0.15, viewCos);
          gl_FragColor = vec4(col, edgeFeather * uOpacity);
        }
      `
    });
    orbitFadeUniforms.push(earthMat.uniforms.uOpacity);

    earthMesh = new T.Mesh(new T.SphereGeometry(92, 56, 56), earthMat);
    earthMesh.position.set(-10, -104, -142);
    earthMesh.rotation.z = 0.32;
    earthMesh.rotation.y = 2.6;
    earthMesh.renderOrder = 2;
    homePlanetGroup.add(earthMesh);

    const sunSphereMat = new T.ShaderMaterial({
      transparent: true,
      uniforms: {
        uMap: { value: sunTex },
        uOpacity: { value: 1.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uMap;
        uniform float uOpacity;
        void main() {
          vec3 tex = texture2D(uMap, vUv).rgb;
          vec3 col = mix(tex * 1.35, vec3(1.0, 0.98, 0.90), 0.45);
          gl_FragColor = vec4(col, uOpacity);
        }
      `
    });
    orbitFadeUniforms.push(sunSphereMat.uniforms.uOpacity);

    sunMesh = new T.Mesh(new T.SphereGeometry(8.2, 36, 36), sunSphereMat);
    sunMesh.position.set(76, 22, -340);
    sunMesh.renderOrder = 2;
    homePlanetGroup.add(sunMesh);

    sunCoronaMat = new T.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: T.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uOpacity: { value: 1.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform float uTime;
        uniform float uOpacity;
        void main() {
          vec2 p = (vUv - 0.5) * 2.0;
          float d = length(p);
          if (d > 1.0) discard;
          float angle = atan(p.y, p.x);
          float rays = 0.88 + 0.12 * sin(angle * 12.0 + uTime * 0.4) * cos(angle * 7.0 - uTime * 0.3);
          float core = exp(-d * d * 42.0);
          float innerCorona = exp(-d * 5.8) * rays;
          float outerGlow = exp(-d * 2.6) * 0.42;
          float streak = exp(-abs(p.y) * 28.0) * exp(-abs(p.x) * 2.4) * 0.55;

          vec3 col = mix(vec3(1.0, 0.76, 0.42), vec3(1.0, 0.98, 0.92), clamp(core + streak, 0.0, 1.0));
          float alpha = clamp((core * 1.2 + innerCorona * 0.85 + outerGlow + streak) * (1.0 - d) * uOpacity, 0.0, 1.0);
          gl_FragColor = vec4(col, alpha);
        }
      `
    });
    orbitFadeUniforms.push(sunCoronaMat.uniforms.uOpacity);
    const coronaPlane = new T.Mesh(new T.PlaneGeometry(155, 155), sunCoronaMat);
    coronaPlane.position.set(76, 22, -339);
    coronaPlane.renderOrder = 3;
    homePlanetGroup.add(coronaPlane);

    const moonMat = new T.ShaderMaterial({
      transparent: true,
      uniforms: {
        uMap: { value: moonTex },
        uSunDir: { value: sunDir },
        uOpacity: { value: 1.0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormalWorld;
        void main() {
          vUv = uv;
          vNormalWorld = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vNormalWorld;
        uniform sampler2D uMap;
        uniform vec3 uSunDir;
        uniform float uOpacity;
        void main() {
          vec3 tex = texture2D(uMap, vUv).rgb;
          float light = smoothstep(-0.15, 0.45, dot(vNormalWorld, uSunDir));
          vec3 col = tex * (0.05 + 0.90 * light);
          gl_FragColor = vec4(col, uOpacity);
        }
      `
    });
    orbitFadeUniforms.push(moonMat.uniforms.uOpacity);
    moonMesh = new T.Mesh(new T.SphereGeometry(5.8, 36, 36), moonMat);
    moonMesh.position.set(-66, 13, -230);
    moonMesh.rotation.y = 1.2;
    moonMesh.renderOrder = 2;
    homePlanetGroup.add(moonMesh);
  }

  function buildStarfield(T) {
    count = innerWidth < 700 ? 2000 : 3400;
    trailCount = innerWidth < 700 ? 500 : 900;
    starSeeds = new Float32Array(count * 3);
    starPositions = new Float32Array(count * 3);
    trailPositions = new Float32Array(trailCount * 6);
    starVel = new Float32Array(count);
    const starSizes = new Float32Array(count);
    const starPhases = new Float32Array(count);
    const starColors = new Float32Array(count * 3);

    let seed = 137;
    const random = () => {
      seed = (1664525 * seed + 1013904223) >>> 0;
      return seed / 4294967296;
    };

    const cWhite = new T.Color(0xf4f7fc);
    const cIce = new T.Color(0xa5cfd5);
    const cGold = new T.Color(0xdec195);
    const cAmber = new T.Color(0xebb682);
    const cBlue = new T.Color(0x88b8f0);

    for (let i = 0; i < count; i++) {
      let x, y;
      if (random() < 0.58) {
        const along = (random() - 0.5) * 1850;
        const spread = (random() - 0.5) * (random() - 0.5) * 760;
        x = along * 0.88 - spread * 0.46;
        y = along * 0.34 + spread * 0.88 + 24;
      } else {
        x = (random() - 0.5) * 1900;
        y = (random() - 0.5) * 1250;
      }
      const z = -65 - random() * 1450;

      starSeeds[i * 3] = x;
      starSeeds[i * 3 + 1] = y;
      starSeeds[i * 3 + 2] = z;
      starVel[i] = 0.65 + random() * 0.85;
      starPhases[i] = random() * Math.PI * 2;

      const rMag = random();
      if (rMag > 0.988) {
        starSizes[i] = 3.2 + random() * 1.4;
      } else if (rMag > 0.91) {
        starSizes[i] = 1.8 + random() * 0.9;
      } else {
        starSizes[i] = 0.8 + random() * 0.95;
      }

      const cPick = random();
      const baseCol = cPick > 0.85 ? cGold : cPick > 0.67 ? cIce : cPick > 0.52 ? cBlue : cPick > 0.44 ? cAmber : cWhite;
      const lum = 0.52 + random() * 0.48;
      starColors[i * 3] = baseCol.r * lum;
      starColors[i * 3 + 1] = baseCol.g * lum;
      starColors[i * 3 + 2] = baseCol.b * lum;
    }

    starPositions.set(starSeeds);
    const geometry = new T.BufferGeometry();
    geometry.setAttribute('position', new T.BufferAttribute(starPositions, 3));
    geometry.setAttribute('color', new T.BufferAttribute(starColors, 3));
    geometry.setAttribute('aSize', new T.BufferAttribute(starSizes, 1));
    geometry.setAttribute('aPhase', new T.BufferAttribute(starPhases, 1));
    geometry.setAttribute('aVel', new T.BufferAttribute(starVel, 1));

    const dpr = Math.min(devicePixelRatio || 1, 1.35);
    starMaterial = new T.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: T.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uDriftZ: { value: 0 },
        uPixelRatio: { value: dpr }
      },
      vertexShader: `
        attribute float aSize;
        attribute float aPhase;
        attribute float aVel;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vTwinkle;
        uniform float uTime;
        uniform float uDriftZ;
        uniform float uPixelRatio;
        void main() {
          vColor = color;
          float slowWave = 0.90 + 0.10 * sin(uTime * 0.95 + aPhase);
          vTwinkle = slowWave;
          vec3 pos = position;
          pos.z = -65.0 - mod(-position.z - 65.0 - uDriftZ * aVel, 1450.0);
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          float distScale = clamp(440.0 / max(85.0, -mvPosition.z), 0.42, 1.65);
          gl_PointSize = aSize * distScale * uPixelRatio * slowWave;
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vTwinkle;
        void main() {
          vec2 uv = gl_PointCoord - 0.5;
          float d = length(uv) * 2.0;
          if (d > 1.0) discard;
          float core = exp(-d * d * 13.0);
          float halo = exp(-d * d * 2.8) * 0.38;
          float alpha = clamp((core + halo) * vTwinkle, 0.0, 1.0);
          vec3 col = mix(vColor, vec3(1.0), core * 0.65);
          gl_FragColor = vec4(col, alpha);
        }
      `
    });

    stars = new T.Points(geometry, starMaterial);
    // Render background stars at renderOrder = 1 so opaque planets, black hole shadow, and dense nebula dust cliffs (renderOrder >= 2) occlude them!
    stars.renderOrder = 1;
    scene.add(stars);

    const trailGeo = new T.BufferGeometry();
    trailGeo.setAttribute('position', new T.BufferAttribute(trailPositions, 3).setUsage(T.DynamicDrawUsage));
    trails = new T.LineSegments(
      trailGeo,
      new T.LineBasicMaterial({
        color: 0xd8eff5,
        transparent: true,
        opacity: 0,
        blending: T.AdditiveBlending,
        depthWrite: false
      })
    );
    trails.frustumCulled = false;
    trails.renderOrder = 5;
    scene.add(trails);

    warpTunnelGroup = new T.Group();
    const tunnelMat = new T.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: T.BackSide,
      blending: T.AdditiveBlending,
      uniforms: {
        uNoiseTex: { value: sharedNoiseTex },
        uTime: { value: 0 },
        uWarp: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uNoiseTex;
        uniform float uTime;
        uniform float uWarp;
        void main() {
          if (uWarp < 0.005) discard;
          vec4 n = texture2D(uNoiseTex, vec2(vUv.x * 3.0, vUv.y * 1.5 - uTime * 0.45));
          float fadeEnds = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.65, vUv.y);
          float intensity = pow(n.g * 0.65 + n.b * 0.35, 2.2) * fadeEnds * uWarp;
          vec3 col = mix(vec3(0.35, 0.68, 0.85), vec3(0.92, 0.78, 0.56), n.a);
          gl_FragColor = vec4(col, intensity * 0.32);
        }
      `
    });
    const tunnelCyl = new T.Mesh(new T.CylinderGeometry(85, 140, 900, 28, 1, true), tunnelMat);
    tunnelCyl.rotation.x = Math.PI * 0.5;
    tunnelCyl.position.z = -460;
    tunnelCyl.renderOrder = 5;
    warpTunnelGroup.add(tunnelCyl);
    scene.add(warpTunnelGroup);
  }

  // Fast precomputed 3D value-noise lookup table for volume atlas generation
  const VOL_PERM = new Uint8Array(512);
  const VOL_VAL = new Float32Array(256);
  {
    let seed = 13379;
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) {
      p[i] = i;
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      VOL_VAL[i] = seed / 4294967295;
    }
    for (let i = 255; i > 0; i--) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const j = seed % (i + 1);
      const tmp = p[i];
      p[i] = p[j];
      p[j] = tmp;
    }
    for (let i = 0; i < 512; i++) VOL_PERM[i] = p[i & 255];
  }
  function fastNoise3D(x, y, z) {
    const ix = Math.floor(x), iy = Math.floor(y), iz = Math.floor(z);
    let fx = x - ix, fy = y - iy, fz = z - iz;
    fx = fx * fx * (3 - 2 * fx);
    fy = fy * fy * (3 - 2 * fy);
    fz = fz * fz * (3 - 2 * fz);
    const X = ix & 255, Y = iy & 255, Z = iz & 255;
    const A = VOL_PERM[X] + Y, AA = VOL_PERM[A] + Z, AB = VOL_PERM[A + 1] + Z;
    const B = VOL_PERM[X + 1] + Y, BA = VOL_PERM[B] + Z, BB = VOL_PERM[B + 1] + Z;
    const c000 = VOL_VAL[VOL_PERM[AA]], c100 = VOL_VAL[VOL_PERM[BA]];
    const c010 = VOL_VAL[VOL_PERM[AB]], c110 = VOL_VAL[VOL_PERM[BB]];
    const c001 = VOL_VAL[VOL_PERM[AA + 1]], c101 = VOL_VAL[VOL_PERM[BA + 1]];
    const c011 = VOL_VAL[VOL_PERM[AB + 1]], c111 = VOL_VAL[VOL_PERM[BB + 1]];
    const x00 = c000 + (c100 - c000) * fx;
    const x10 = c010 + (c110 - c010) * fx;
    const x01 = c001 + (c101 - c001) * fx;
    const x11 = c011 + (c111 - c011) * fx;
    const y0 = x00 + (x10 - x00) * fy;
    const y1 = x01 + (x11 - x01) * fy;
    return y0 + (y1 - y0) * fz;
  }

  const cachedDensityAtlases = {};

  function ensureDestination(index) {
    activeScene = index;
    volumeSteps = 48;
    frameSamples = frameTotalMs = 0;
    qualitySince = performance.now();
    if (carinaReliefMesh && carinaReliefMesh.userData.volumeMesh && index === 2) {
      volumeMesh = carinaReliefMesh.userData.volumeMesh;
    } else if (butterflyReliefMesh && butterflyReliefMesh.userData.volumeMesh && index === 3) {
      volumeMesh = butterflyReliefMesh.userData.volumeMesh;
    }
  }

  // 3D volumetric density atlas (64x64x64 packed into 512x512 RGBA DataTexture).
  // Channels: R = warm ionized rim / H-alpha emission, G = cool O-III / cyan continuum, B = dense cold dust extinction, A = fine 3D turbulence.
  function buildDensityAtlas(T, butterfly) {
    const cacheKey = butterfly ? 'butterfly' : 'carina';
    if (cachedDensityAtlases[cacheKey]) return cachedDensityAtlases[cacheKey];

    const pixels = new Uint8Array(512 * 512 * 4);
    const g = (x, y, z, a, b, c) => Math.exp(-(x * x / a + y * y / b + z * z / c));

    // 5 3D dust pillars + sweeping amphitheater wall for Carina
    const carinaPillars = [
      [-0.58, -0.32, -0.14, 0.045, 0.24, 0.055, 0.92],
      [-0.22, -0.24,  0.22, 0.032, 0.30, 0.042, 1.05],
      [ 0.12, -0.30,  0.08, 0.038, 0.28, 0.048, 0.96],
      [ 0.44, -0.22,  0.26, 0.030, 0.32, 0.040, 1.08],
      [ 0.70, -0.36, -0.12, 0.050, 0.22, 0.055, 0.85]
    ];

    for (let iz = 0; iz < 64; iz++) {
      const z = (iz / 63) * 2 - 1;
      const edgeZ = 1 - smooth(0.70, 0.98, Math.abs(z));
      const tileRow = Math.floor(iz / 8) * 64;
      const tileCol = (iz % 8) * 64;
      for (let iy = 0; iy < 64; iy++) {
        const y = (iy / 63) * 2 - 1;
        const edgeY = 1 - smooth(0.74, 0.98, Math.abs(y));
        const rowOffset = (tileRow + iy) * 512 + tileCol;
        for (let ix = 0; ix < 64; ix++) {
          const x = (ix / 63) * 2 - 1;
          const edge = (1 - smooth(0.76, 0.98, Math.abs(x))) * edgeY * edgeZ;
          const n1 = fastNoise3D(x * 4.5 + 11.3, y * 4.5 + 4.1, z * 4.5 + 8.7);
          const n2 = fastNoise3D(x * 9.5 + 27.1, y * 9.5 + 9.4, z * 9.5 + 15.2);
          const n3 = fastNoise3D(x * 19.0 + 5.7, y * 19.0 + 21.8, z * 19.0 + 11.1);
          const grain = n1 * 0.54 + n2 * 0.31 + n3 * 0.15;

          let warm = 0, cool = 0, dust = 0;
          if (!butterfly) {
            // Sweeping Cosmic Cliffs mountain ridge + 5 protruding 3D pillars
            const archZ = -0.18 + 0.22 * (1 - x * x);
            const ridgeHeight = -0.08 + 0.16 * Math.sin(x * 3.6 + 0.4) + 0.12 * Math.cos(x * 6.8 - 0.7) + (grain - 0.5) * 0.34;
            const wallDepth = g(0, 0, z - archZ, 1, 1, 0.22);
            const cliffBody = smooth(ridgeHeight + 0.18, ridgeHeight - 0.38, y) * wallDepth * 0.88;

            let pillarMass = 0;
            let rimSignal = 0;
            for (let j = 0; j < 5; j++) {
              const p = carinaPillars[j];
              const swayX = 0.045 * Math.sin(y * 5.2 + j * 1.7);
              const swayZ = 0.055 * Math.cos(y * 4.3 + j * 2.1);
              const dx = x - p[0] - swayX;
              const dy = y - p[1];
              const dz = z - p[2] - swayZ;
              const col = g(dx, dy, dz, p[3], p[4], p[5]) * p[6];
              const tip = g(dx, y - (p[1] + 0.36), dz, p[3] * 0.55, 0.045, p[5] * 0.55) * 0.85;
              pillarMass += col + tip;
              rimSignal += tip * 1.35 + col * smooth(p[1] - 0.05, p[1] + 0.38, y);
            }

            const raw = Math.max(0, (cliffBody + pillarMass) * (0.38 + grain * 1.35));
            const d = smooth(0.10, 0.74, raw);
            const crest = smooth(ridgeHeight - 0.18, ridgeHeight + 0.14, y) * smooth(ridgeHeight + 0.34, ridgeHeight + 0.02, y) * wallDepth;
            dust = d * (0.95 + smooth(0.15, -0.65, y) * 0.55);
            warm = (d * (0.28 + smooth(-0.35, 0.42, y) * 1.15) + crest * 0.75 + rimSignal * 0.48) * (0.45 + grain * 0.95);
            const upperIonized = g(x * 0.7, y - 0.28, z, 0.75, 0.32, 0.48) * (0.35 + grain * 0.85);
            cool = upperIonized * 0.52 + d * 0.14 + crest * 0.26;
          } else {
            // NGC 6302 Butterfly Nebula: 3D tilted hollow bi-conical hourglass + dense equatorial dust torus
            const axis = y * 0.86 + x * 0.50;
            const perp = x * 0.86 - y * 0.50;
            const r = Math.sqrt(perp * perp + z * z);
            const a = Math.abs(axis);
            const wingRadius = 0.07 + Math.sin(Math.min(1, a / 0.92) * Math.PI) * 0.44;
            const shellWall = Math.exp(-Math.pow((r - wingRadius) / 0.115, 2));
            const innerGlow = Math.exp(-Math.pow(r / Math.max(0.08, wingRadius * 0.72), 2)) * 0.42;
            const lobeEnvelope = (1 - smooth(0.68, 0.95, a)) * smooth(0.02, 0.16, a);
            const angle = Math.atan2(z, perp);
            const shockRibs = 0.52 + 0.48 * Math.pow(Math.sin(angle * 6 + axis * 8.5 + grain * 2.5), 2);
            const wingDensity = smooth(0.08, 0.72, (shellWall + innerGlow * 0.45) * lobeEnvelope * (0.32 + grain * 1.25));
            const torus = Math.exp(-Math.pow((r - 0.16) / 0.085, 2) - (axis * axis) / 0.014) * (0.55 + grain * 1.45);
            warm = wingDensity * shockRibs * (0.65 + 0.45 * smooth(0.12, 0.75, a));
            cool = (wingDensity * 0.48 + innerGlow * lobeEnvelope * 0.62) * (0.55 + 0.45 * smooth(0.45, 0.05, r));
            dust = Math.min(1.5, torus * 1.65 + wingDensity * 0.22);
          }

          const k = (rowOffset + ix) * 4;
          pixels[k]     = Math.min(255, Math.round(warm * edge * 255));
          pixels[k + 1] = Math.min(255, Math.round(cool * edge * 255));
          pixels[k + 2] = Math.min(255, Math.round(dust * edge * 255));
          pixels[k + 3] = Math.min(255, Math.round(grain * 255));
        }
      }
    }
    const atlas = new T.DataTexture(pixels, 512, 512, T.RGBAFormat);
    atlas.minFilter = atlas.magFilter = T.LinearFilter;
    atlas.generateMipmaps = false;
    atlas.needsUpdate = true;
    cachedDensityAtlases[cacheKey] = atlas;
    return atlas;
  }

  function buildNebula(T, loader, index) {
    const butterfly = index === 3;
    const group = new T.Group();
    group.position.set(0, butterfly ? 4 : -10, butterfly ? -490 : -580);

    // 1. True 3D Ray-Marched Volume Mesh (viewable from 360° around every anchor and during manual flight)
    const halfExtents = new T.Vector3(
      butterfly ? 265 : 370,
      butterfly ? 260 : 240,
      butterfly ? 235 : 265
    );
    const volMat = new T.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: T.BackSide,
      uniforms: {
        uAtlas: { value: buildDensityAtlas(T, butterfly) },
        uNoiseTex: { value: sharedNoiseTex },
        uEye: { value: new T.Vector3(0, 0, 2.2) },
        uSteps: { value: volumeSteps },
        uHalf: { value: halfExtents },
        reveal: { value: 0 },
        uButterfly: { value: butterfly ? 1 : 0 },
        uOffAxisBoost: { value: 0 }
      },
      vertexShader: `
        varying vec3 vExit;
        void main() {
          vExit = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        varying vec3 vExit;
        uniform sampler2D uAtlas;
        uniform sampler2D uNoiseTex;
        uniform vec3 uEye;
        uniform vec3 uHalf;
        uniform float uSteps;
        uniform float reveal;
        uniform float uButterfly;
        uniform float uOffAxisBoost;

        vec4 slice(vec3 p, float s) {
          vec2 tile = vec2(mod(s, 8.0), floor(s / 8.0));
          vec2 clampedXY = clamp(p.xy, 0.5 / 64.0, 63.5 / 64.0);
          return texture2D(uAtlas, (tile * 64.0 + clampedXY * 64.0) / 512.0);
        }

        vec4 lookup(vec3 q) {
          vec3 p = clamp(q * 0.5 + 0.5, 0.0, 1.0);
          float z = p.z * 63.0;
          float a = floor(z);
          return mix(slice(p, a), slice(p, min(63.0, a + 1.0)), fract(z));
        }

        // Seamless tri-planar 3D FBM detail from sharedNoiseTex (zero mirror symmetry planes!)
        float triNoise(vec3 p) {
          vec2 xy = texture2D(uNoiseTex, p.xy * 1.35 + vec2(p.z * 0.47, -p.z * 0.31)).gb;
          vec2 yz = texture2D(uNoiseTex, p.yz * 1.35 + vec2(p.x * 0.41,  p.x * 0.53)).gb;
          vec2 zx = texture2D(uNoiseTex, p.zx * 1.35 + vec2(-p.y * 0.37, p.y * 0.43)).gb;
          float n1 = (xy.x + yz.x + zx.x) * 0.3333;
          float n2 = (xy.y + yz.y + zx.y) * 0.3333;
          return n1 * 0.64 + n2 * 0.36;
        }

        vec3 field(vec3 q) {
          vec4 vox = lookup(q);
          float fbm1 = triNoise(q * 1.85);
          float fbm2 = triNoise(q * 4.20 + vec3(fbm1 * 0.35));
          float detail = mix(vox.a, fbm1 * 0.62 + fbm2 * 0.38, 0.68);
          float wisp = smoothstep(0.20, 0.78, detail);
          return vox.rgb * mix(0.32, 1.68, wisp);
        }

        void main() {
          vec3 rd = normalize(vExit - uEye);
          vec3 safeRd = mix(vec3(0.00001), rd, step(vec3(0.00001), abs(rd)));
          vec3 lo = (-1.0 - uEye) / safeRd;
          vec3 hi = ( 1.0 - uEye) / safeRd;
          vec3 nv = min(lo, hi);
          vec3 fv = max(lo, hi);
          float start = max(0.0, max(nv.x, max(nv.y, nv.z)));
          float end = min(fv.x, min(fv.y, fv.z));
          if (end <= start) discard;

          float ds = (end - start) / uSteps;
          vec3 accumColor = vec3(0.0);
          float trans = 1.0;

          vec3 lightSource = uButterfly > 0.5 ? vec3(0.0, 0.0, 0.0) : vec3(-0.08, 0.65, 0.35);
          float densityScale = mix(0.62, 1.18, uOffAxisBoost);

          for (int i = 0; i < 64; i++) {
            if (float(i) >= uSteps || trans < 0.018) break;
            vec3 p = uEye + rd * (start + (float(i) + 0.5) * ds);
            vec3 f = field(p) * densityScale;
            float ext = (f.r * 1.05 + f.g * 0.72 + f.b * 3.60) * ds * 4.4;
            if (ext < 0.0005) continue;

            float stepAlpha = 1.0 - exp(-ext);
            vec3 toLight = normalize(lightSource - p);
            float shadowDust = field(p + toLight * 0.09).b * 0.65 + field(p + toLight * 0.20).b * 0.35;
            float lightTrans = exp(-shadowDust * 3.4);

            vec3 warmTone = mix(vec3(0.95, 0.50, 0.18), vec3(0.96, 0.34, 0.24), uButterfly);
            vec3 coolTone = mix(vec3(0.22, 0.60, 0.86), vec3(0.42, 0.74, 0.96), uButterfly);
            vec3 rimHighlight = mix(vec3(1.0, 0.84, 0.55), vec3(0.98, 0.80, 0.92), uButterfly);

            vec3 sampleEmit = warmTone * f.r * (0.24 + 1.55 * lightTrans)
                            + coolTone * f.g * (0.48 + 0.95 * lightTrans)
                            + rimHighlight * max(0.0, f.r - f.b * 0.65) * lightTrans * 0.65;
            sampleEmit *= 1.0 / (1.0 + f.b * 1.85);

            accumColor += trans * stepAlpha * sampleEmit;
            trans *= (1.0 - stepAlpha);
          }

          float totalAlpha = (1.0 - trans) * reveal;
          if (totalAlpha < 0.002) discard;
          vec3 finalCol = accumColor / max(0.04, 1.0 - trans);
          finalCol = 1.0 - exp(-finalCol * 1.35);
          gl_FragColor = vec4(finalCol, totalAlpha);
        }
      `
    });
    const volBox = new T.Mesh(new T.BoxGeometry(2, 2, 2), volMat);
    volBox.scale.copy(halfExtents);
    volBox.renderOrder = 2;
    const inverse = new T.Matrix4();
    volBox.onBeforeRender = (_r, _s, c) => {
      inverse.copy(volBox.matrixWorld).invert();
      volMat.uniforms.uEye.value.copy(c.position).applyMatrix4(inverse);
    };
    group.add(volBox);
    group.userData.volumeMesh = volBox;
    if (!volumeMesh) volumeMesh = volBox;

    // 2. Ray-Anchored 3D Sculpted JWST/Hubble Relief + Foreground 3D Pillars/Wings
    //    Provides authentic NASA JWST / Hubble photographic detail on panoramic approach and smoothly hands off
    //    to the 3D ray-marched volume as the ship orbits to steep side/top angles.
    if (!butterfly) {
      const carinaTex = loader.load(encodeURI('Images/tinh vân thuyền đế (Carina Nebula).png'));
      const carinaVertShader = `
        varying vec2 vScreenUv;
        varying vec3 vLocalPos;
        uniform sampler2D uNoiseTex;
        uniform float uLayerDepth;
        uniform float uReliefAmp;
        uniform float uPanelHeight;
        void main() {
          vec3 pos = position;
          float u = pos.x / 1080.0 + 0.5;
          float v = pos.y / uPanelHeight + 0.5;
          vec4 n1 = texture2D(uNoiseTex, vec2(u * 2.2, v * 2.2));
          vec4 n2 = texture2D(uNoiseTex, vec2(u * 5.4 + 0.31, v * 5.4 + 0.17));
          float archBend = pow((u - 0.5) * 2.0, 2.0) * 145.0;
          float vertCurve = pow((v - 0.5) * 2.0, 2.0) * 38.0;
          float cliffWall = smoothstep(0.68, 0.20, v + (n1.r - 0.5) * 0.18);
          float pillar1 = exp(-pow((u - 0.23) / 0.085, 2.0)) * smoothstep(0.70, 0.25, v);
          float pillar2 = exp(-pow((u - 0.56) / 0.075, 2.0)) * smoothstep(0.80, 0.30, v);
          float pillar3 = exp(-pow((u - 0.80) / 0.095, 2.0)) * smoothstep(0.74, 0.26, v);
          float macroRelief = (cliffWall * 68.0 + (pillar1 + pillar2 * 1.25 + pillar3 * 0.9) * 58.0) * uReliefAmp;
          float microSculpt = ((n1.g - 0.5) * 26.0 + (n2.b - 0.5) * 12.0) * uReliefAmp;
          pos.z += uLayerDepth - archBend - vertCurve + macroRelief + microSculpt;
          vLocalPos = pos;
          float zRef = pos.z - uLayerDepth;
          float scaleToRef = -580.0 / (-580.0 + zRef);
          vec2 projXY = pos.xy * scaleToRef;
          vScreenUv = vec2(projXY.x / 980.0 + 0.5, projXY.y / 600.0 + 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `;
      const carinaFragShader = `
        varying vec2 vScreenUv;
        varying vec3 vLocalPos;
        uniform sampler2D uCarinaMap;
        uniform sampler2D uNoiseTex;
        uniform float reveal;
        uniform float uTime;
        uniform float uLayerMode;
        uniform float uViewFade;
        void main() {
          if (uViewFade < 0.005) discard;
          vec2 baseUv = vScreenUv;
          vec2 mirroredUv = 1.0 - abs(1.0 - mod(baseUv, 2.0));
          vec2 uv = clamp(mirroredUv, 0.004, 0.996);
          vec4 n = texture2D(uNoiseTex, uv * 3.4 + vec2(uTime * 0.0005, -uTime * 0.0003));
          vec4 nFine = texture2D(uNoiseTex, uv * 8.5 - vec2(uTime * 0.0004, uTime * 0.0005));
          vec3 tex = texture2D(uCarinaMap, uv).rgb;
          float lum = dot(tex, vec3(0.299, 0.587, 0.114));
          float warmth = max(0.0, tex.r - tex.b * 0.65);
          float coolness = max(0.0, tex.b - tex.r * 0.45);
          float verticalWeight = smoothstep(0.86, 0.16, baseUv.y + (n.r - 0.5) * 0.08);
          float dustDensity = clamp(warmth * 1.65 + verticalWeight * 0.58 - coolness * 0.35, 0.0, 1.0);
          float ionizedRim = clamp(warmth * 2.1 * smoothstep(0.18, 0.72, lum) * (1.0 - abs(dustDensity - 0.52) * 1.6), 0.0, 1.0);

          float offWingX = max(0.0, abs(baseUv.x - 0.5) - 0.34) / 0.36;
          float wingBlend = smoothstep(0.0, 1.0, clamp(offWingX, 0.0, 1.0));
          float ridgeWave = 0.42 + 0.08 * sin(baseUv.x * 11.0 + n.g * 2.5) + 0.05 * cos(baseUv.x * 23.0 - nFine.r * 2.0);
          float synthCliff = smoothstep(ridgeWave + 0.16, ridgeWave - 0.18, baseUv.y + (n.r - 0.5) * 0.14);
          float synthRim = exp(-pow((baseUv.y - ridgeWave) / 0.055, 2.0)) * (0.55 + 0.45 * nFine.g);
          vec3 synthSky = mix(vec3(0.04, 0.11, 0.22), vec3(0.14, 0.32, 0.52), smoothstep(0.95, 0.35, baseUv.y)) * (0.45 + 0.55 * n.b);
          vec3 synthDust = mix(vec3(0.18, 0.08, 0.04), vec3(0.68, 0.34, 0.14), n.r * 0.7 + nFine.b * 0.3) * synthCliff;
          vec3 synthGoldRim = vec3(0.96, 0.62, 0.26) * synthRim * 0.85;
          vec3 synthCol = synthSky * (1.0 - synthCliff * 0.82) + synthDust + synthGoldRim;
          tex = mix(tex, synthCol, wingBlend * 0.90);

          float fadeY = smoothstep(0.01, 0.16, baseUv.y) * smoothstep(0.99, 0.82, baseUv.y);
          float horizonFade = smoothstep(720.0, 440.0, abs(vLocalPos.x));
          float edgeFade = fadeY * horizonFade;

          vec3 col = tex;
          float alpha = 0.0;
          if (uLayerMode < 0.5) {
            col = tex * (0.86 + 0.20 * ionizedRim);
            alpha = smoothstep(0.015, 0.20, lum + 0.14) * edgeFade * 0.88;
          } else {
            float u = baseUv.x;
            float v = baseUv.y;
            float warp = (n.r - 0.5) * 0.055 + (nFine.g - 0.5) * 0.022;
            float mask = 0.0;
            if (uLayerMode < 1.5) {
              float c1 = exp(-pow((u - 0.19 + warp) / 0.095, 2.0)) * smoothstep(0.66, 0.30, v + warp * 0.6);
              float c2 = exp(-pow((u - 0.81 + warp) / 0.090, 2.0)) * smoothstep(0.68, 0.28, v - warp * 0.5);
              mask = clamp(c1 + c2, 0.0, 1.0) * smoothstep(0.22, 0.58, dustDensity);
            } else if (uLayerMode < 2.5) {
              float p1 = exp(-pow((u - 0.55 + warp * 0.85) / 0.068, 2.0)) * smoothstep(0.78, 0.38, v + warp * 0.5);
              float p2 = exp(-pow((u - 0.38 - warp * 0.70) / 0.062, 2.0)) * smoothstep(0.68, 0.28, v - warp * 0.4);
              mask = clamp(p1 * 1.15 + p2 * 0.95, 0.0, 1.0) * smoothstep(0.26, 0.64, dustDensity + ionizedRim * 0.4);
            } else {
              float s1 = exp(-pow((u - 0.56 + warp * 0.6) / 0.038, 2.0)) * exp(-pow((v - 0.54 + warp * 0.4) / 0.16, 2.0));
              float s2 = exp(-pow((u - 0.23 - warp * 0.6) / 0.042, 2.0)) * exp(-pow((v - 0.48 - warp * 0.4) / 0.15, 2.0));
              float s3 = exp(-pow((u - 0.77 + warp * 0.5) / 0.036, 2.0)) * exp(-pow((v - 0.50 + warp * 0.4) / 0.14, 2.0));
              mask = clamp((s1 + s2 + s3) * (0.65 + 0.55 * nFine.r), 0.0, 1.0) * smoothstep(0.30, 0.68, dustDensity);
            }
            float coreDark = smoothstep(0.45, 0.85, mask) * (1.0 - ionizedRim * 0.65);
            vec3 rimGlow = vec3(1.0, 0.68, 0.32) * ionizedRim * 0.30 * smoothstep(0.15, 0.55, mask);
            col = tex * mix(1.05, 0.72, coreDark * 0.42) + rimGlow;
            alpha = mask * edgeFade * (uLayerMode > 2.5 ? 0.76 : 0.84);
          }
          col = 1.0 - exp(-col * 1.22);
          gl_FragColor = vec4(col, clamp(alpha * reveal * uViewFade, 0.0, 1.0));
        }
      `;
      const carinaLayers = [
        { depth:   0.0, amp: 0.72, mode: 0.0, w: 1480, h: 660, segX: 112, segY: 64 },
        { depth:  62.0, amp: 1.05, mode: 1.0, w: 1120, h: 610, segX: 88,  segY: 52 },
        { depth: 124.0, amp: 1.28, mode: 2.0, w: 1020, h: 580, segX: 80,  segY: 48 },
        { depth: 185.0, amp: 0.95, mode: 3.0, w:  940, h: 550, segX: 72,  segY: 44 }
      ];
      carinaLayers.forEach((cfg, idx) => {
        const mat = new T.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          side: T.DoubleSide,
          uniforms: {
            uCarinaMap: { value: carinaTex },
            uNoiseTex: { value: sharedNoiseTex },
            uLayerDepth: { value: cfg.depth },
            uReliefAmp: { value: cfg.amp },
            uPanelHeight: { value: cfg.h },
            uLayerMode: { value: cfg.mode },
            uViewFade: { value: 1.0 },
            uTime: { value: 0 },
            reveal: { value: 0 }
          },
          vertexShader: carinaVertShader,
          fragmentShader: carinaFragShader
        });
        const mesh = new T.Mesh(new T.PlaneGeometry(cfg.w, cfg.h, cfg.segX, cfg.segY), mat);
        mesh.renderOrder = 2 + idx * 0.1;
        group.add(mesh);
      });
    } else {
      const butterflyTex = loader.load(encodeURI('Images/ngc6302-hubble-hd.jpg'));
      const bfVertShader = `
        varying vec2 vScreenUv;
        uniform sampler2D uNoiseTex;
        uniform float uLayerDepth;
        uniform float uShellSign;
        void main() {
          vec3 pos = position;
          float u = pos.x / 720.0 + 0.5;
          float v = pos.y / 480.0 + 0.5;
          vec4 n = texture2D(uNoiseTex, vec2(u * 3.0, v * 3.0));
          vec2 centered = (vec2(u, v) - 0.5) * 2.0;
          float diagAlong = (centered.x + centered.y) * 0.7071;
          float diagPerp  = (centered.x - centered.y) * 0.7071;
          float r = length(centered);
          float lobeAngle = abs(diagAlong) / (abs(diagPerp) + 0.22);
          float wingMask = smoothstep(0.25, 1.15, lobeAngle) * smoothstep(0.08, 0.55, r) * (1.0 - smoothstep(0.75, 1.25, r));
          float torusMask = exp(-pow(diagAlong / 0.18, 2.0)) * exp(-pow(diagPerp / 0.34, 2.0));
          float wingZ = wingMask * uShellSign * (76.0 * sin(clamp(r * 1.4, 0.0, 3.14159)) + (n.r - 0.5) * 28.0);
          float torusZ = torusMask * 44.0 * uShellSign;
          float bowlCurve = pow(r, 2.0) * 45.0;
          pos.z += uLayerDepth - bowlCurve + wingZ + torusZ;
          float zRef = pos.z - uLayerDepth;
          float scaleToRef = -490.0 / (-490.0 + zRef);
          vec2 projXY = pos.xy * scaleToRef;
          vScreenUv = vec2(projXY.x / 720.0 + 0.5, projXY.y / 480.0 + 0.5);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `;
      const bfFragShader = `
        varying vec2 vScreenUv;
        uniform sampler2D uButterflyMap;
        uniform sampler2D uNoiseTex;
        uniform float reveal;
        uniform float uTime;
        uniform float uLayerMode;
        uniform float uViewFade;
        void main() {
          if (uViewFade < 0.005) discard;
          vec2 uv = clamp(vScreenUv, 0.002, 0.998);
          vec4 n = texture2D(uNoiseTex, uv * 3.2 + vec2(uTime * 0.0008, -uTime * 0.0006));
          vec3 tex = texture2D(uButterflyMap, uv).rgb;
          float lum = dot(tex, vec3(0.299, 0.587, 0.114));
          vec2 d = (uv - 0.5) * 2.0 + (n.rg - 0.5) * 0.08;
          float radial = length(d * vec2(0.84, 0.94));
          float edgeFade = smoothstep(1.0, 0.28, radial);
          float diagAlong = (d.x + d.y) * 0.7071;
          float diagPerp  = (d.x - d.y) * 0.7071;
          float wingFactor = smoothstep(0.12, 0.65, abs(diagAlong)) * (1.0 - smoothstep(0.45, 0.92, abs(diagPerp)));
          float waistFactor = exp(-pow(diagAlong / 0.20, 2.0)) * exp(-pow(diagPerp / 0.36, 2.0));
          float alpha = 0.0;
          vec3 col = tex;
          if (uLayerMode < 0.5) {
            col = tex * 0.88;
            alpha = smoothstep(0.015, 0.20, lum) * edgeFade * 0.86;
          } else if (uLayerMode < 1.5) {
            col = tex * 1.12 + vec3(0.18, 0.06, 0.12) * wingFactor * lum;
            alpha = smoothstep(0.08, 0.38, lum) * (wingFactor * 0.85 + 0.15) * edgeFade * 0.76;
          } else {
            col = tex * 1.24 + vec3(0.26, 0.16, 0.28) * smoothstep(0.35, 0.85, lum);
            alpha = smoothstep(0.16, 0.54, lum) * clamp(wingFactor * 1.1 + waistFactor * 0.9, 0.0, 1.0) * edgeFade * 0.68;
          }
          col = 1.0 - exp(-col * 1.25);
          gl_FragColor = vec4(col, clamp(alpha * reveal * uViewFade, 0.0, 1.0));
        }
      `;
      const bfLayers = [
        { depth: -48.0, sign: -1.0, mode: 0.0, w: 740, h: 495 },
        { depth:   6.0, sign:  0.6, mode: 1.0, w: 720, h: 480 },
        { depth:  62.0, sign:  1.2, mode: 2.0, w: 690, h: 460 }
      ];
      bfLayers.forEach((cfg, idx) => {
        const mat = new T.ShaderMaterial({
          transparent: true,
          depthWrite: false,
          side: T.DoubleSide,
          uniforms: {
            uButterflyMap: { value: butterflyTex },
            uNoiseTex: { value: sharedNoiseTex },
            uLayerDepth: { value: cfg.depth },
            uShellSign: { value: cfg.sign },
            uLayerMode: { value: cfg.mode },
            uViewFade: { value: 1.0 },
            uTime: { value: 0 },
            reveal: { value: 0 }
          },
          vertexShader: bfVertShader,
          fragmentShader: bfFragShader
        });
        const mesh = new T.Mesh(new T.PlaneGeometry(cfg.w, cfg.h, 88, 60), mat);
        mesh.renderOrder = 2 + idx * 0.1;
        group.add(mesh);
      });
    }

    // 3. Embedded 3D Star Cluster & Ionizing Beacons (renderOrder = 3 so they shine cleanly inside the nebula cavity)
    const starCount = butterfly ? 140 : 220;
    const starPos = new Float32Array(starCount * 3);
    const starCol = new Float32Array(starCount * 3);
    const starSz = new Float32Array(starCount);
    let sSeed = butterfly ? 8821 : 4419;
    const sRand = () => {
      sSeed = (Math.imul(sSeed, 1664525) + 1013904223) >>> 0;
      return sSeed / 4294967295;
    };
    for (let i = 0; i < starCount; i++) {
      const j = i * 3;
      if (!butterfly) {
        starPos[j]     = (sRand() - 0.5) * 860;
        starPos[j + 1] = (sRand() - 0.42) * 480;
        starPos[j + 2] = (sRand() - 0.45) * 420;
      } else {
        starPos[j]     = (sRand() - 0.5) * 640;
        starPos[j + 1] = (sRand() - 0.5) * 460;
        starPos[j + 2] = (sRand() - 0.5) * 380;
      }
      const cPick = sRand();
      if (cPick < 0.48) {
        starCol[j] = 0.74; starCol[j + 1] = 0.88; starCol[j + 2] = 1.0;
      } else if (cPick < 0.82) {
        starCol[j] = 1.0;  starCol[j + 1] = 0.95; starCol[j + 2] = 0.86;
      } else {
        starCol[j] = 1.0;  starCol[j + 1] = 0.78; starCol[j + 2] = 0.52;
      }
      starSz[i] = 1.6 + Math.pow(sRand(), 2.6) * 4.8;
    }
    const starGeo = new T.BufferGeometry();
    starGeo.setAttribute('position', new T.BufferAttribute(starPos, 3));
    starGeo.setAttribute('aColor', new T.BufferAttribute(starCol, 3));
    starGeo.setAttribute('aSize', new T.BufferAttribute(starSz, 1));
    const starMat = new T.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: T.AdditiveBlending,
      uniforms: { reveal: { value: 0 } },
      vertexShader: `
        attribute vec3 aColor;
        attribute float aSize;
        varying vec3 vColor;
        void main() {
          vColor = aColor;
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = clamp(aSize * (340.0 / max(45.0, -mv.z)), 1.2, 12.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform float reveal;
        void main() {
          vec2 d = gl_PointCoord - 0.5;
          float r = length(d) * 2.0;
          if (r > 1.0) discard;
          float core = exp(-r * r * 7.5);
          float halo = pow(1.0 - r, 2.2) * 0.45;
          gl_FragColor = vec4(vColor, (core + halo) * reveal * 0.92);
        }
      `
    });
    const embeddedStars = new T.Points(starGeo, starMat);
    embeddedStars.renderOrder = 3;
    group.add(embeddedStars);

    const sources = butterfly ? [[0, 0, 0]] : [[-110, 120, -20], [105, 145, 35], [30, 95, -45]];
    for (const xyz of sources) {
      const cv = document.createElement('canvas');
      cv.width = cv.height = 64;
      const ctx = cv.getContext('2d');
      const glow = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      glow.addColorStop(0, 'rgba(255,255,255,1)');
      glow.addColorStop(0.12, 'rgba(210,235,255,0.82)');
      glow.addColorStop(1, 'rgba(150,205,255,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 64, 64);
      const star = new T.Sprite(
        new T.SpriteMaterial({
          map: new T.CanvasTexture(cv),
          color: 0xc7e3f2,
          transparent: true,
          depthWrite: false,
          blending: T.AdditiveBlending,
          opacity: 0
        })
      );
      star.scale.setScalar(butterfly ? 14 : 18);
      star.position.set(...xyz);
      star.renderOrder = 3;
      group.add(star);
    }

    wondersGroup.add(group);
    if (butterfly) butterflyReliefMesh = group;
    else carinaReliefMesh = group;
  }

  function buildDeepSpaceWonders(T, loader) {
    wondersGroup = new T.Group();
    scene.add(wondersGroup);

    // --- DESTINATION 0: Relativistic Black Hole (88-step geodesic integrator) ---
    const bhMat = new T.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uNoiseTex: { value: sharedNoiseTex },
        uTime: { value: 0 },
        uCamera: { value: new T.Vector3(5.6, 3.0, 22.0) },
        reveal: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        uniform sampler2D uNoiseTex;
        uniform float uTime;
        uniform vec3 uCamera;
        uniform float reveal;

        vec3 diskColor(vec3 p, vec3 ray) {
          float r = length(p.xz);
          float a = atan(p.z, p.x);
          float orbit = a - uTime * 2.3 / pow(r / 3.0, 1.5);
          float swirls = sin(r * 12.0 + 1.7 * sin(orbit * 3.0 + r * 2.1));
          float threads = sin(r * 53.0 + sin(orbit * 6.0 - r * 4.0) * 2.0);
          float grains = texture2D(uNoiseTex, vec2(r * 0.35, orbit * 0.159)).g;
          float structure = 0.64 + 0.19 * swirls + 0.13 * threads + 0.24 * grains;
          float heat = pow(3.0 / r, 0.7);
          vec3 tint = mix(vec3(0.95, 0.40, 0.10), vec3(1.0, 0.90, 0.72), heat);
          vec3 tangent = normalize(vec3(-p.z, 0.0, p.x));
          float beaming = pow(1.0 - dot(tangent, -normalize(ray)) * 0.32 * sqrt(3.0 / r), 3.0);
          float falloff = pow(3.0 / r, 1.65);
          return tint * structure * falloff * beaming * 4.5;
        }

        void main() {
          vec2 uv = (vUv - 0.5) * vec2(3.6, 2.4);
          float radialDist = length(uv * vec2(0.55, 0.85));
          if (radialDist >= 0.92) discard;
          float radialFade = smoothstep(0.92, 0.36, radialDist);

          if (radialDist > 0.64) {
            float outerHalo = exp(-radialDist * 4.2) * 0.38;
            vec3 glowCol = vec3(0.95, 0.55, 0.22) * outerHalo;
            gl_FragColor = vec4(glowCol, outerHalo * radialFade * reveal);
            return;
          }

          vec3 forward = normalize(-uCamera);
          vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
          vec3 up = cross(right, forward);
          vec3 ray = normalize(forward * 2.25 + uv.x * right + uv.y * up);
          vec3 p = uCamera;
          vec3 v = ray;
          vec3 hVec = cross(p, v);
          float angularMomentum2 = dot(hVec, hVec);
          vec3 color = vec3(0.0);
          float transmission = 1.0;
          bool captured = false;

          for (int i = 0; i < 88; i++) {
            float r = length(p);
            if (r < 1.02) { captured = true; break; }
            if (r > 46.0 && dot(p, v) > 0.0) { break; }
            float stepSize = clamp(r * 0.135, 0.048, 2.2);
            float r2 = r * r;
            float invR5 = 1.0 / (r2 * r2 * r);
            vec3 accel = -1.5 * angularMomentum2 * p * invR5;
            vec3 midP = p + v * stepSize * 0.5;
            vec3 midV = v + accel * stepSize * 0.5;
            float midR = length(midP);
            float midR2 = midR * midR;
            float invMidR5 = 1.0 / (midR2 * midR2 * midR);
            vec3 nextP = p + midV * stepSize;
            vec3 nextV = v - 1.5 * angularMomentum2 * midP * invMidR5 * stepSize;

            if (p.y * nextP.y <= 0.0 && abs(p.y - nextP.y) > 0.000001) {
              vec3 hit = mix(p, nextP, p.y / (p.y - nextP.y));
              float diskR = length(hit.xz);
              if (diskR > 2.85 && diskR < 12.0) {
                float edge = smoothstep(2.85, 3.25, diskR) * (1.0 - smoothstep(8.0, 12.0, diskR));
                float opacity = edge * 0.94;
                color += transmission * diskColor(hit, midV) * opacity;
                transmission *= 1.0 - opacity;
              }
            }
            float cylindricalR = length(midP.xz);
            if (cylindricalR > 3.0 && cylindricalR < 12.0) {
              float halo = exp(-abs(midP.y) * 8.0) * exp(-cylindricalR * 0.28);
              color += transmission * vec3(1.0, 0.63, 0.28) * halo * stepSize * 0.12;
            }
            p = nextP;
            v = nextV;
          }

          float impact = sqrt(angularMomentum2);
          float ring = exp(-pow((impact - 2.598) / 0.024, 2.0));
          color += vec3(1.0, 0.89, 0.70) * ring * 0.42 * transmission;
          color = 1.0 - exp(-color * 1.35);
          color = pow(max(color, vec3(0.0)), vec3(0.88));

          float lum = max(color.r, max(color.g, color.b));
          float alpha = clamp((captured ? 1.0 : smoothstep(0.008, 0.12, lum)) * radialFade * reveal, 0.0, 1.0);
          gl_FragColor = vec4(color, alpha);
        }
      `
    });
    blackHoleMesh = new T.Mesh(new T.PlaneGeometry(1100, 740), bhMat);
    blackHoleMesh.position.set(0, 4, -280);
    blackHoleMesh.renderOrder = 2;
    wondersGroup.add(blackHoleMesh);

    // --- DESTINATION 1: Saturn System + Moons Titan & Enceladus ---
    saturnGroup = new T.Group();
    saturnGroup.position.set(0, 2, -350);
    saturnGroup.rotation.z = 0.34;
    saturnGroup.rotation.x = 0.32;
    wondersGroup.add(saturnGroup);

    const saturnTex = loader.load(encodeURI('Images/sao thổ.jpg'));
    const saturnRingTex = loader.load(encodeURI('Images/vành đai sao thổ.png'));
    const saturnSunDir = new T.Vector3(-0.75, 0.42, 0.52).normalize();
    saturnSpace = { inverse: new T.Matrix4(), sun: new T.Vector3() };

    const saturnPlanetMat = new T.ShaderMaterial({
      transparent: true,
      uniforms: {
        uMap: { value: saturnTex },
        uRingMap: { value: saturnRingTex },
        uWorldToSaturn: { value: saturnSpace.inverse },
        uLocalSun: { value: saturnSpace.sun },
        uSunDir: { value: saturnSunDir },
        reveal: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vSaturnPoint;
        uniform mat4 uWorldToSaturn;
        varying vec3 vNormalWorld;
        varying vec3 vViewDir;
        void main() {
          vUv = uv;
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vSaturnPoint = (uWorldToSaturn * worldPos).xyz;
          vNormalWorld = normalize(mat3(modelMatrix) * normal);
          vViewDir = normalize(cameraPosition - worldPos.xyz);
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vSaturnPoint;
        uniform vec3 uLocalSun;
        uniform sampler2D uRingMap;
        varying vec3 vNormalWorld;
        varying vec3 vViewDir;
        uniform sampler2D uMap;
        uniform vec3 uSunDir;
        uniform float reveal;
        void main() {
          vec3 tex = texture2D(uMap, vUv).rgb;
          float ndotl = dot(vNormalWorld, uSunDir);
          float light = smoothstep(-0.22, 0.65, ndotl);
          float viewCos = max(0.0, dot(vNormalWorld, vViewDir));
          float rim = pow(1.0 - viewCos, 3.0);
          float shadow = 1.0;
          if (abs(uLocalSun.y) > 0.0001) {
            float t = -vSaturnPoint.y / uLocalSun.y;
            vec3 hit = vSaturnPoint + uLocalSun * t;
            float r = length(hit.xz);
            if (t > 0.0 && r > 64.0 && r < 146.0) {
              shadow = 1.0 - texture2D(uRingMap, vec2((r - 64.0) / 82.0, 0.5)).a * 0.84;
            }
          }
          vec3 col = tex * (0.035 + 0.94 * light * shadow) + vec3(0.90, 0.80, 0.60) * rim * 0.16 * light * shadow;
          float edgeFeather = smoothstep(0.02, 0.12, viewCos);
          gl_FragColor = vec4(col, edgeFeather * reveal);
        }
      `
    });
    saturnPlanetMesh = new T.Mesh(new T.SphereGeometry(50, 48, 48), saturnPlanetMat);
    saturnPlanetMesh.scale.set(1.0, 0.91, 1.0);
    saturnPlanetMesh.renderOrder = 2;
    saturnGroup.add(saturnPlanetMesh);

    saturnRingMat = new T.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: T.DoubleSide,
      uniforms: {
        uRingMap: { value: saturnRingTex },
        uWorldToSaturn: { value: saturnSpace.inverse },
        uLocalSun: { value: saturnSpace.sun },
        uSunDir: { value: saturnSunDir },
        uInnerR: { value: 64.0 },
        uOuterR: { value: 146.0 },
        reveal: { value: 0 }
      },
      vertexShader: `
        varying vec3 vLocalPos;
        varying vec3 vWorldPos;
        void main() {
          vLocalPos = position;
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorldPos = wp.xyz;
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        varying vec3 vLocalPos;
        varying vec3 vWorldPos;
        uniform sampler2D uRingMap;
        uniform mat4 uWorldToSaturn;
        uniform vec3 uLocalSun;
        uniform vec3 uSunDir;
        uniform float uInnerR;
        uniform float uOuterR;
        uniform float reveal;
        void main() {
          float r = length(vLocalPos.xy);
          float t = clamp((r - uInnerR) / (uOuterR - uInnerR), 0.0, 1.0);
          if (t <= 0.001 || t >= 0.999) discard;
          vec4 ringSample = texture2D(uRingMap, vec2(t, 0.5));
          float microRings = 0.88 + 0.12 * sin(r * 4.5) * cos(r * 1.9);

          vec3 local = (uWorldToSaturn * vec4(vWorldPos, 1.0)).xyz;
          vec3 p = local / vec3(50.0, 45.5, 50.0);
          vec3 sun = uLocalSun / vec3(50.0, 45.5, 50.0);
          float a = dot(sun, sun), b = dot(p, sun), c = dot(p, p) - 1.0;
          float disc = b * b - a * c;
          float inShadow = disc > 0.0 && (-b - sqrt(max(0.0, disc))) / a > 0.0 ? 0.0 : 1.0;
          vec3 eye = (uWorldToSaturn * vec4(cameraPosition, 1.0)).xyz;
          float face = eye.y * uLocalSun.y >= 0.0 ? 1.0 : 0.40;
          vec3 col = ringSample.rgb * microRings * (0.045 + 0.955 * inShadow * face);
          float alpha = ringSample.a * smoothstep(0.0, 0.04, t) * smoothstep(1.0, 0.95, t) * reveal * 0.92;
          gl_FragColor = vec4(col, alpha);
        }
      `
    });
    const ringMesh = new T.Mesh(new T.RingGeometry(64, 146, 96, 1), saturnRingMat);
    ringMesh.rotation.x = Math.PI * 0.5;
    ringMesh.renderOrder = 2;
    saturnGroup.add(ringMesh);

    const titanMat = new T.ShaderMaterial({
      transparent: true,
      uniforms: { uSunDir: { value: saturnSunDir }, reveal: { value: 0 } },
      vertexShader: `
        varying vec3 vNormalWorld;
        varying vec3 vViewDir;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vNormalWorld = normalize(mat3(modelMatrix) * normal);
          vViewDir = normalize(cameraPosition - wp.xyz);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        varying vec3 vNormalWorld;
        varying vec3 vViewDir;
        uniform vec3 uSunDir;
        uniform float reveal;
        void main() {
          float light = smoothstep(-0.2, 0.6, dot(vNormalWorld, uSunDir));
          float viewCos = max(0.0, dot(vNormalWorld, vViewDir));
          float haze = pow(1.0 - viewCos, 2.2);
          vec3 body = vec3(0.82, 0.56, 0.28) * (0.08 + 0.92 * light);
          vec3 atmo = vec3(0.95, 0.72, 0.42) * haze * 0.65 * light;
          gl_FragColor = vec4(body + atmo, smoothstep(0.02, 0.14, viewCos) * reveal);
        }
      `
    });
    titanMesh = new T.Mesh(new T.SphereGeometry(9.5, 36, 36), titanMat);
    titanMesh.position.set(88, 12, -45);
    titanMesh.renderOrder = 2;
    saturnGroup.add(titanMesh);

    const enceladusMat = new T.ShaderMaterial({
      transparent: true,
      uniforms: { uSunDir: { value: saturnSunDir }, reveal: { value: 0 } },
      vertexShader: `
        varying vec3 vNormalWorld;
        varying vec3 vViewDir;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vNormalWorld = normalize(mat3(modelMatrix) * normal);
          vViewDir = normalize(cameraPosition - wp.xyz);
          gl_Position = projectionMatrix * viewMatrix * wp;
        }
      `,
      fragmentShader: `
        varying vec3 vNormalWorld;
        varying vec3 vViewDir;
        uniform vec3 uSunDir;
        uniform float reveal;
        void main() {
          float light = smoothstep(-0.15, 0.55, dot(vNormalWorld, uSunDir));
          float viewCos = max(0.0, dot(vNormalWorld, vViewDir));
          vec3 col = vec3(0.88, 0.94, 0.99) * (0.08 + 0.92 * light);
          gl_FragColor = vec4(col, smoothstep(0.02, 0.12, viewCos) * reveal);
        }
      `
    });
    enceladusMesh = new T.Mesh(new T.SphereGeometry(4.2, 28, 28), enceladusMat);
    enceladusMesh.position.set(-48, -18, 72);
    enceladusMesh.renderOrder = 2;
    saturnGroup.add(enceladusMesh);

    // --- DESTINATIONS 2 & 3: Carina Nebula & Butterfly Nebula ---
    buildNebula(T, loader, 2);
    buildNebula(T, loader, 3);

    // --- Enclosing 360° Ambient Nebula Sky Sphere (Seamless 360° Environment for Carina & Butterfly) ---
    const volSkyMat = new T.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: T.BackSide,
      blending: T.AdditiveBlending,
      uniforms: {
        uNoiseTex: { value: sharedNoiseTex },
        uTime: { value: 0 },
        uNebulaMode: { value: 0 },
        reveal: { value: 0 }
      },
      vertexShader: `
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vDir;
        uniform sampler2D uNoiseTex;
        uniform float uTime;
        uniform float uNebulaMode;
        uniform float reveal;

        float fbm(vec2 p) {
          vec4 s1 = texture2D(uNoiseTex, p);
          vec4 s2 = texture2D(uNoiseTex, p * 2.13 + vec2(0.37, 0.61));
          return s1.r * 0.55 + s1.g * 0.25 + s2.b * 0.20;
        }

        void main() {
          if (reveal < 0.005) discard;
          vec3 dir = normalize(vDir);
          float forwardFocus = smoothstep(-0.65, 0.85, -dir.z);
          float horizonBand = exp(-pow((dir.y + 0.04) * 2.1, 2.0));
          vec2 sphereUv = vec2(atan(dir.x, -dir.z) * 0.42, dir.y * 0.85);
          float n1 = fbm(sphereUv * 1.4 + vec2(uTime * 0.001, -uTime * 0.0007));
          float n2 = fbm(sphereUv * 2.9 - vec2(uTime * 0.0008, uTime * 0.001) + n1 * 0.32);
          float cloud = smoothstep(0.24, 0.82, n1 * 0.62 + n2 * 0.38);

          vec3 colA = mix(vec3(0.58, 0.26, 0.10), vec3(0.42, 0.14, 0.34), uNebulaMode);
          vec3 colB = mix(vec3(0.10, 0.28, 0.48), vec3(0.18, 0.36, 0.54), uNebulaMode);
          vec3 glow = mix(colB, colA, smoothstep(0.12, -0.32, dir.y + (n1 - 0.5) * 0.25)) * cloud;
          float alpha = cloud * (0.12 + 0.22 * forwardFocus) * (0.38 + 0.62 * horizonBand) * reveal;
          gl_FragColor = vec4(glow, clamp(alpha, 0.0, 0.26));
        }
      `
    });
    volumetricNebulaMesh = new T.Mesh(new T.SphereGeometry(1480, 48, 32), volSkyMat);
    volumetricNebulaMesh.renderOrder = 1;
    wondersGroup.add(volumetricNebulaMesh);

    syncDestinationVisibility(currentDest);
  }

  /**
   * Projects 3D celestial story beacons onto the 2D screen while automatically hiding any pin
   * that would collide with or overlap #panel, #panel-reopen, #controls, or #masthead.
   */
  function updateHotspotsProjections() {
    if (failed || !camera || state === 'warp' || hiddenUI || !labelsVisible || !hotspotElements.length) return;
    const T = window.THREE;
    const projVec = new T.Vector3();

    const uiRects = [];
    ['panel', 'panel-reopen', 'controls', 'masthead'].forEach(id => {
      const el = $(id);
      if (el && !el.hidden) {
        const r = el.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) uiRects.push(r);
      }
    });

    const padX = 68;
    const padY = 18;

    hotspotElements.forEach(item => {
      const { el, data } = item;
      projVec.set(data.pos[0], data.pos[1], data.pos[2]);
      projVec.project(camera);

      let blocked = projVec.z > 1 || Math.abs(projVec.x) > 0.90 || Math.abs(projVec.y) > 0.84;
      const x = (projVec.x * 0.5 + 0.5) * innerWidth;
      const y = (-projVec.y * 0.5 + 0.5) * innerHeight;

      if (!blocked) {
        for (let i = 0; i < uiRects.length; i++) {
          const r = uiRects[i];
          if (x + padX >= r.left && x - padX <= r.right && y + padY >= r.top && y - padY <= r.bottom) {
            blocked = true;
            break;
          }
        }
      }

      if (blocked) {
        if (item.lastVis !== false) {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
          item.lastVis = false;
        }
        return;
      }

      if (item.lastVis !== true) {
        el.style.opacity = '1';
        el.style.pointerEvents = 'auto';
        item.lastVis = true;
      }
      if (item.lastX === undefined || Math.abs(x - item.lastX) > 0.2 || Math.abs(y - item.lastY) > 0.2) {
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%)`;
        item.lastX = x;
        item.lastY = y;
      }
    });
  }

  function computeOptimalPixelRatio() {
    const maxPixels = innerWidth < 700 ? 650000 : 1280000;
    const area = Math.max(1, innerWidth * innerHeight);
    const maxDpr = innerWidth < 700 ? 1.15 : 1.25;
    return Math.min(devicePixelRatio || 1, maxDpr, Math.sqrt(maxPixels / area)) * qualityScale;
  }

  function build() {
    const T = window.THREE;
    if (!T) throw new Error('Thư viện 3D chưa tải được.');

    renderer = new T.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' });
    renderer.setClearColor(0x010308);
    renderer.setPixelRatio(computeOptimalPixelRatio());
    renderer.setSize(innerWidth, innerHeight);
    view.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    renderer.domElement.addEventListener('webglcontextlost', e => {
      e.preventDefault();
      fallback('Kết nối đồ họa bị gián đoạn. Tải lại trang để mở lại 3D.');
    });

    scene = new T.Scene();
    camera = new T.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 2800);
    camera.rotation.order = 'YXZ';

    scene.add(new T.AmbientLight(0x9ec4d0, 0.5));
    cabinPointLight = new T.PointLight(0xf0a058, 0.65, 50);
    cabinPointLight.position.set(0, 1.5, -2.5);
    scene.add(cabinPointLight);

    sharedNoiseTex = createSeamlessNoiseTexture(T);
    const manager = new T.LoadingManager();
    manager.onError = () => fallback('Không tải được tư liệu bề mặt cho cảnh 3D.');
    const loader = new T.TextureLoader(manager);

    buildCabin(T);
    buildEarthOrbitScene(T, loader);
    buildStarfield(T);
    buildDeepSpaceWonders(T, loader);

    draw(0);
    document.body.classList.add('webgl');
  }

  function draw(dt) {
    if (failed || !renderer || !wondersGroup) return;
    const reduced = motion.matches;
    const shaderTime = reduced ? 0.0 : time;
    const duration = reduced ? 1.2 : 5.4;
    const progress = state === 'warp' ? clamp(elapsed / duration, 0, 1) : 0;

    const targetFree = viewMode === 'free' ? 1 : 0;
    freeBlend += (targetFree - freeBlend) * (reduced ? 1 : Math.min(1, dt * 4.5));

    const warpStrength = state === 'warp' && !reduced
      ? smooth(0.0, 0.24, progress) * (1.0 - smooth(0.56, 0.96, progress))
      : 0;

    if (state === 'warp') {
      const endLY = warpTargetState === 'observation' ? 0.00004 : DESTINATIONS[targetDest].lightYears;
      const curveP = smooth(0.05, 0.92, progress);
      const currentLY = startDistanceLY + (endLY - startDistanceLY) * Math.pow(curveP, 1.6);
      updateTimeMachine(currentLY, 'Chuyển cảnh giả tưởng · khoảng cách minh họa tính từ Trái Đất');
    }

    const baseFov = 60 + freeBlend * 4 - focusZoom;
    const targetFov = baseFov + warpStrength * 12;
    if (Math.abs(camera.fov - targetFov) > 0.02) {
      camera.fov += (targetFov - camera.fov) * (reduced ? 1 : 0.14);
      camera.updateProjectionMatrix();
      updateCabinFraming();
    }

    if (reduced && state === 'warp') {
      $('shade').style.opacity = String(Math.sin(Math.PI * progress) * 0.82);
    } else {
      $('shade').style.opacity = '0';
    }

    // Camera remains completely still when the user is not interacting (zero artificial idle rocking)
    const easing = reduced ? 1 : 1 - Math.exp(-dt * 6.0);
    yaw += (targetYaw - yaw) * easing;
    pitch += (targetPitch - pitch) * easing;

    const finalYaw = yaw;
    const finalPitch = pitch;

    const exploring = state === 'arrival' && !!EXPLORATION[currentDest] && !!navigation.position;
    let shipYaw = exploring ? (navigation.shipYaw || 0) : 0;
    let shipPitch = exploring ? (navigation.shipPitch || 0) : 0;

    let baseX = 0, baseY = 0, baseZ = 0;
    if (exploring) {
      baseX = navigation.position.x;
      baseY = navigation.position.y;
      baseZ = navigation.position.z;
    } else if (state === 'warp') {
      // Smoothly transition from previous ship position/orientation in the first half of warp,
      // and smoothly approach target anchor 0 in the second half of warp.
      const fromPos = navigation.warpFromPos || [0, 0, 0];
      if (progress <= 0.45) {
        const leave = 1.0 - smooth(0.0, 0.42, progress);
        baseX = fromPos[0] * leave;
        baseY = fromPos[1] * leave;
        baseZ = fromPos[2] * leave;
        shipYaw = (navigation.warpFromYaw || 0) * leave;
        shipPitch = (navigation.warpFromPitch || 0) * leave;
      } else if (warpTargetState === 'arrival' && EXPLORATION[targetDest]) {
        const inc = EXPLORATION[targetDest];
        const f = smooth(0.48, 1.0, progress);
        const ax = inc.center[0] + inc.anchors[0].p[0];
        const ay = inc.center[1] + inc.anchors[0].p[1];
        const az = inc.center[2] + inc.anchors[0].p[2];
        baseX = ax * f;
        baseY = ay * f;
        baseZ = az * f;
        const dx = inc.center[0] - ax;
        const dy = inc.center[1] - ay;
        const dz = inc.center[2] - az;
        shipYaw = Math.atan2(-dx, -dz) * f;
        shipPitch = Math.atan2(dy, Math.hypot(dx, dz)) * f;
      }
    }

    // Physical head-translation parallax inside the observation cupola:
    // Turning head inside the bay shifts the eye along the ship's local right/up axes,
    // creating natural near-field window parallax and genuine 3D foreground/midground parallax.
    const parallaxScale = state === 'warp' ? 0.0 : (exploring ? 16.0 : 22.0);
    const localShiftX = Math.sin(finalYaw) * parallaxScale;
    const localShiftY = -Math.sin(finalPitch) * (parallaxScale * 0.62);
    const cosSY = Math.cos(shipYaw), sinSY = Math.sin(shipYaw);
    const worldShiftX = localShiftX * cosSY;
    const worldShiftY = localShiftY;
    const worldShiftZ = -localShiftX * sinSY;

    const camShiftX = baseX + worldShiftX;
    const camShiftY = baseY + worldShiftY;
    const camShiftZ = baseZ + worldShiftZ;

    camera.position.set(camShiftX, camShiftY, camShiftZ);
    camera.rotation.set(shipPitch + finalPitch, shipYaw + finalYaw, 0);

    if (cabin) {
      cabin.visible = freeBlend < 0.95;
      // Cabin tracks camera position and ship orientation + 90% of head offset so the cupola window frame
      // stays framed around the periphery at every anchor and in 360° manual flight, with ~10% near-field parallax!
      const fwdX = -Math.sin(shipYaw + finalYaw) * Math.cos(shipPitch + finalPitch);
      const fwdY = Math.sin(shipPitch + finalPitch);
      const fwdZ = -Math.cos(shipYaw + finalYaw) * Math.cos(shipPitch + finalPitch);
      cabin.position.set(
        camShiftX - fwdX * freeBlend * 8.2,
        camShiftY - fwdY * freeBlend * 8.2,
        camShiftZ - fwdZ * freeBlend * 8.2
      );
      cabin.rotation.set(shipPitch + finalPitch * 0.90, shipYaw + finalYaw * 0.90, 0);
    }

    if (homePlanetGroup) {
      if (earthMesh) {
        if (!reduced) earthMesh.rotation.y += dt * 0.010;
        if (earthMesh.material.uniforms.uTime) earthMesh.material.uniforms.uTime.value = shaderTime;
      }
      if (sunMesh && !reduced) sunMesh.rotation.y += dt * 0.006;
      if (sunCoronaMat) sunCoronaMat.uniforms.uTime.value = shaderTime;

      let planetVis = 0;
      if (state === 'observation') {
        planetVis = 1;
        homePlanetGroup.position.set(0, 0, 0);
        homePlanetGroup.scale.setScalar(1);
      } else if (state === 'warp' && warpTargetState === 'arrival') {
        const leave = smooth(0.0, 0.22, progress);
        planetVis = Math.pow(1 - leave, 2.2);
        homePlanetGroup.position.set(0, -leave * 240, -leave * 1800);
        homePlanetGroup.scale.setScalar(Math.max(0.01, 1 - leave * 0.92));
      } else if (state === 'warp' && warpTargetState === 'observation') {
        const approach = smooth(0.68, 1.0, progress);
        planetVis = Math.pow(approach, 1.8);
        homePlanetGroup.position.set(0, -(1 - approach) * 180, -(1 - approach) * 1400);
        homePlanetGroup.scale.setScalar(0.15 + 0.85 * approach);
      }
      homePlanetGroup.visible = planetVis > 0.004;
      orbitFadeUniforms.forEach(u => { u.value = planetVis; });
    }

    if (warpTunnelGroup) {
      warpTunnelGroup.visible = warpStrength > 0.005;
      warpTunnelGroup.children.forEach(m => {
        if (m.material && m.material.uniforms) {
          m.material.uniforms.uTime.value = shaderTime;
          m.material.uniforms.uWarp.value = warpStrength;
        }
      });
    }

    let reveal = 0;
    let approachZOffset = 0;
    let approachScale = 1;

    if (state === 'arrival') {
      reveal = 1;
      approachZOffset = 0;
      approachScale = 1;
    } else if (state === 'warp') {
      if (warpTargetState === 'arrival') {
        if (progress > 0.30 && (currentDest !== targetDest || activeScene !== targetDest)) {
          currentDest = targetDest;
          syncDestinationVisibility(currentDest);
        }
        if (progress <= 0.30 && document.body.dataset.prevArrived === 'true') {
          const fadeOut = 1 - smooth(0.0, 0.26, progress);
          reveal = fadeOut;
          approachZOffset = smooth(0.0, 0.26, progress) * 420;
        } else {
          const decel = smooth(0.34, 0.98, progress);
          reveal = smooth(0.36, 0.88, progress);
          approachZOffset = -(1 - decel) * 850;
          approachScale = 0.28 + 0.72 * decel;
        }
      } else {
        reveal = 1 - smooth(0.0, 0.32, progress);
        approachZOffset = -smooth(0.0, 0.35, progress) * 650;
      }
    }

    if (state === 'arrival') {
      document.body.dataset.prevArrived = 'true';
    } else if (state === 'observation') {
      document.body.dataset.prevArrived = 'false';
    }

    wondersGroup.visible = reveal > 0.002;
    if (blackHoleMesh) blackHoleMesh.position.z = -280 + approachZOffset;
    if (saturnGroup) {
      saturnGroup.position.z = -350 + approachZOffset;
      saturnGroup.scale.setScalar(approachScale);
    }
    if (carinaReliefMesh) {
      carinaReliefMesh.position.z = -580 + approachZOffset;
      carinaReliefMesh.scale.setScalar(approachScale);
    }
    if (butterflyReliefMesh) {
      butterflyReliefMesh.position.z = -490 + approachZOffset;
      butterflyReliefMesh.scale.setScalar(approachScale);
    }

    if (blackHoleMesh && blackHoleMesh.visible) {
      const u = blackHoleMesh.material.uniforms;
      u.reveal.value = reveal;
      u.uTime.value = shaderTime;
      const bhYaw = 0.25 - finalYaw * 0.85;
      const bhPitch = clamp(0.14 + finalPitch * 0.85, 0.03, 1.25);
      const bhDist = 27.5 - focusZoom * 0.45;
      u.uCamera.value.set(
        Math.sin(bhYaw) * Math.cos(bhPitch) * bhDist,
        Math.sin(bhPitch) * bhDist,
        Math.cos(bhYaw) * Math.cos(bhPitch) * bhDist
      );
    }

    if (saturnGroup && saturnGroup.visible) {
      saturnGroup.updateMatrixWorld(true);
      saturnSpace.inverse.copy(saturnGroup.matrixWorld).invert();
      saturnSpace.sun.set(-0.75, 0.42, 0.52).normalize().transformDirection(saturnSpace.inverse);
      saturnPlanetMesh.material.uniforms.reveal.value = reveal;
      saturnRingMat.uniforms.reveal.value = reveal;
      titanMesh.material.uniforms.reveal.value = reveal;
      enceladusMesh.material.uniforms.reveal.value = reveal;
      if (!reduced) {
        saturnPlanetMesh.rotation.y += dt * 0.015;
      }
    }

    // Nebulae stay anchored at cosmic scale in world space.
    // As the spacecraft orbits to steep side/top angles around the nebula, the directional sculpted relief
    // smoothly hands off to the 360° 3D ray-marched volume so side views never show flat-plane foreshortening.
    const updateNebulaGroup = (nebGroup, centerZ) => {
      if (!nebGroup || !nebGroup.visible) return;
      const relZ = camShiftZ - centerZ;
      const dist = Math.max(1.0, Math.hypot(camShiftX, camShiftY, relZ));
      const frontCos = clamp(relZ / dist, 0.0, 1.0);
      const reliefViewFade = smooth(0.32, 0.84, frontCos);
      const offAxisBoost = 1.0 - reliefViewFade * 0.65;

      nebGroup.children.forEach(child => {
        if (child.material?.isMeshBasicMaterial || child.isSprite) {
          child.material.opacity = reveal * 0.88;
        }
        const u = child.material && child.material.uniforms;
        if (!u) return;
        if (u.reveal) u.reveal.value = reveal;
        if (u.uTime) u.uTime.value = shaderTime;
        if (u.uViewFade) u.uViewFade.value = reliefViewFade;
        if (u.uOffAxisBoost) u.uOffAxisBoost.value = offAxisBoost;
      });
    };

    updateNebulaGroup(carinaReliefMesh, -580 + approachZOffset);
    updateNebulaGroup(butterflyReliefMesh, -490 + approachZOffset);

    if (volumetricNebulaMesh && volumetricNebulaMesh.visible) {
      const u = volumetricNebulaMesh.material.uniforms;
      u.reveal.value = reveal;
      u.uTime.value = shaderTime;
      volumetricNebulaMesh.position.set(camShiftX, camShiftY, camShiftZ);
    }

    if (cabinPointLight) {
      cabinPointLight.position.set(camShiftX, camShiftY + 1.5, camShiftZ - 2.5);
      cabinPointLight.intensity = 0.45 + reveal * 0.65 + warpStrength * 0.35;
    }
    if (glassMat) {
      glassMat.uniforms.reveal.value = reveal;
    }

    // Star drift is zero during calm observation/arrival so the cosmos stays still; only streaks during active warp
    const currentStarSpeed = warpStrength * 820;
    if (!reduced && currentStarSpeed > 0.001) {
      starTravelZ = (starTravelZ + dt * currentStarSpeed) % 14500;
    }

    if (starMaterial) {
      starMaterial.uniforms.uTime.value = shaderTime;
      starMaterial.uniforms.uDriftZ.value = reduced ? 0.0 : starTravelZ;
    }

    trails.visible = warpStrength > 0.002;
    trails.material.opacity = warpStrength * 0.78;

    if (warpStrength > 0.002) {
      for (let i = 0; i < trailCount; i++) {
        const j = i * 3;
        const v = starVel[i];
        const curZ = -65.0 - (((-starSeeds[j + 2] - 65.0 - starTravelZ * v) % 1450.0 + 1450.0) % 1450.0);
        const k = i * 6;
        const streakLen = warpStrength * 135 * v;
        trailPositions[k]     = starSeeds[j];
        trailPositions[k + 1] = starSeeds[j + 1];
        trailPositions[k + 2] = curZ;
        trailPositions[k + 3] = starSeeds[j];
        trailPositions[k + 4] = starSeeds[j + 1];
        trailPositions[k + 5] = curZ - streakLen;
      }
      trails.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
    if(renderer.info.programs.some(p=>p.diagnostics&&!p.diagnostics.runnable)){fallback('Shader 3D không tương thích với thiết bị này.');return;}
    updateHotspotsProjections();
  }

  function loop(now) {
    const rawDeltaMs = now - previous;
    const dt = Math.min(rawDeltaMs / 1000, 0.05);
    previous = now;
    if (!paused && !document.hidden) {
      if (!motion.matches) {
        time += dt;
      }
      if (state === 'warp') {
        elapsed += dt;
        if (elapsed >= (motion.matches ? 1.2 : 5.4)) arrive();
      }
      updateNavigation(dt);
      try { draw(dt); } catch(error) { console.warn('Observation Window:',error);fallback('Cảnh 3D gặp lỗi.'); }

      if (rawDeltaMs > 0 && rawDeltaMs < 250 && now-qualitySince>750) {
        frameSamples++;
        frameTotalMs += rawDeltaMs;
        if (frameSamples >= 36) {
          if (frameTotalMs / frameSamples > 23.0) {
            volumeSteps=32;if(volumeMesh)volumeMesh.material.uniforms.uSteps.value=32;
            qualityScale = Math.max(0.62, qualityScale * 0.84);
            renderer.setPixelRatio(computeOptimalPixelRatio());
          }
          else if(frameTotalMs/frameSamples<17&&volumeSteps<64){volumeSteps=64;if(volumeMesh)volumeMesh.material.uniforms.uSteps.value=64;}
          frameSamples = 0;
          frameTotalMs = 0;
        }
      }
    }
    if (!failed) raf = requestAnimationFrame(loop);
  }

  addEventListener('resize', () => {
    syncLayoutMetrics();
    if (failed || !renderer) return;
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    updateCabinFraming();
    renderer.setPixelRatio(computeOptimalPixelRatio());
    renderer.setSize(innerWidth, innerHeight);
    draw(0);
  });

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(() => syncLayoutMetrics());
    if ($('controls')) ro.observe($('controls'));
    if ($('masthead')) ro.observe($('masthead'));
    if ($('panel')) ro.observe($('panel'));
  }

  motion.addEventListener('change', () => {
    if(paused)return;
    if (state === 'warp' && motion.matches) arrive();
    if(motion.matches&&!paused)finishAnchor();
    draw(0);
  });
  document.addEventListener('visibilitychange', () => {
    navigation.keys.clear();
    previous = performance.now();
    audioSync();
  });
  addEventListener('pagehide', () => {
    cancelAnimationFrame(raf);
    if (window.SpaceAudio) SpaceAudio.stopAmbient(0.05);
  });
  addEventListener('pageshow', e => {
    if (e.persisted && !failed) {
      previous = performance.now();
      raf = requestAnimationFrame(loop);
      audioSync();
    }
  });

  try {
    syncLayoutMetrics();
    build();
    setState('observation');
    raf = requestAnimationFrame(loop);
  } catch (error) {
    console.warn('Observation Window fallback:', error.message);
    fallback('Cảnh 3D không khả dụng hoặc thư viện chưa tải được.');
  }
})();
