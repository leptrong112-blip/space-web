/* Shared, deterministic geometry and data rules; also exercised by node:test. */
(() => {
    'use strict';
    const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
    const modes = {
        battery: { pixels: 460000, dpr: 1, fps: 24, stars: 5000, texture: 2048 },
        balanced: { pixels: 1150000, dpr: 1.5, fps: 40, stars: 10000, texture: 4096 },
        maximum: { pixels: 2100000, dpr: 2, fps: 60, stars: 15000, texture: 4096 }
    };
    function pose(value) {
        return value && ['yaw', 'pitch', 'distance'].every(key => Number.isFinite(value[key]))
            ? { yaw: value.yaw, pitch: clamp(value.pitch, -1.48, 1.48), distance: clamp(value.distance, 8, 52) } : null;
    }
    function curve(from, to, progress) {
        const t = clamp(progress, 0, 1), s = t * t * t * (t * (6 * t - 15) + 10);
        const yaw = Math.atan2(Math.sin(to.yaw - from.yaw), Math.cos(to.yaw - from.yaw));
        // Polar motion plus a gentle outward arc, with zero velocity at both ends.
        return {
            yaw: from.yaw + yaw * s,
            pitch: from.pitch + (to.pitch - from.pitch) * s,
            distance: clamp(from.distance + (to.distance - from.distance) * s + 2 * Math.sin(Math.PI * s) ** 2, 8, 52)
        };
    }
    const chapters = [
        { title: '01 / Đến bên ánh sáng', line: 'Cứ thong thả. Có một khoảng trời đang chờ bạn.', pose: { yaw: .25, pitch: .13, distance: 23 } },
        { title: '02 / Một vòng yên tĩnh', line: 'Từ xa, hỗn loạn cũng có hình dáng của sự yên tĩnh.', pose: { yaw: 1.1, pitch: 1.25, distance: 26 } },
        { title: '03 / Mang theo một câu hỏi', line: 'Có những điều ta chưa hiểu. Và vẫn muốn trở lại để nhìn thêm.', pose: { yaw: 1.85, pitch: .19, distance: 12 } }
    ];
    function tourPose(start, seconds, reduced = false) {
        const index = Math.min(2, Math.floor(Math.max(0, seconds) / 12));
        const from = index ? chapters[index - 1].pose : start;
        return { index, pose: reduced ? { ...chapters[index].pose } : curve(from, chapters[index].pose, (seconds - index * 12) / 10) };
    }
    function contain(sw, sh, dw, dh) {
        const scale = Math.min(dw / sw, dh / sh);
        return { x: (dw - sw * scale) / 2, y: (dh - sh * scale) / 2, width: sw * scale, height: sh * scale };
    }
    function entries(value) {
        if (!Array.isArray(value)) return [];
        return value.filter(e => e && typeof e.text === 'string' && e.text.trim() && Number.isFinite(Date.parse(e.at)))
            .slice(0, 10).map(e => ({ text: e.text.slice(0, 1200), at: e.at, view: pose(e.view) }));
    }
    const api = { modes, pose, curve, chapters, tourPose, contain, entries };
    if (typeof module !== 'undefined' && module.exports) module.exports = api;
    else window.BlackHoleModel = api;
})();
