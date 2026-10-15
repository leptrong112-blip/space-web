/* Small, local-only rituals around the observatory. No external media. */
'use strict';
window.createBlackHoleMoments = function ({ canvas, hideUI, requestRender, requestCapture, reducedMotion }) {
    const $ = id => document.getElementById(id);
    const scene = $('experience');
    const overlay = $('light-trails');
    const ink = overlay.getContext('2d');
    let trails = false, quiet = false, horizon = false, armed = true;
    let oldHidden = false, timer, whisperTimer, trailTime = 0, orbit = 0, discovered = false;
    let captureBusy = false;
    const soundscape = window.createBlackHoleAudio();

    function whisper(text, duration = 5500) {
        clearTimeout(whisperTimer);
        $('scene-whisper').textContent = text;
        $('scene-whisper').hidden = false;
        whisperTimer = setTimeout(() => { $('scene-whisper').hidden = true; }, duration);
    }
    function tuneSound() { soundscape.setMood({ quiet, horizon }); }
    function leave(restore = true) {
        if (!quiet && !horizon) return;
        quiet = horizon = false;
        clearTimeout(timer);
        clearTimeout(whisperTimer);
        $('scene-whisper').hidden = true;
        $('quiet-button').setAttribute('aria-pressed', 'false');
        $('show-ui').innerHTML = 'Hiện điều khiển <span aria-hidden="true">↙</span>';
        tuneSound();
        if (restore) hideUI(oldHidden);
        requestRender();
    }
    function enter(kind) {
        oldHidden = scene.classList.contains('ui-hidden');
        quiet = kind === 'quiet';
        horizon = !quiet;
        hideUI(true);
        $('quiet-button').setAttribute('aria-pressed', String(quiet));
        $('show-ui').textContent = quiet ? 'Trở về từ khoảng lặng ↙' : 'Trở lại quan sát ↙';
        whisper(quiet ? 'Ở lại một chút. Không cần đi đâu cả.' : 'Từ đây, mọi con đường đều hướng vào trong.', 5000);
        if (horizon) timer = setTimeout(() => leave(), 5200);
        tuneSound();
        requestRender();
    }
    $('quiet-button').addEventListener('click', () => enter('quiet'));
    $('trails-button').addEventListener('click', () => {
        trails = !trails;
        $('trails-button').setAttribute('aria-pressed', String(trails));
        requestRender();
    });
    // Explicit save protects a half-written thought from accidental replacement.
    const key = 'phuc.black-hole.journal.v1';
    try {
        const saved = JSON.parse(localStorage.getItem(key) || 'null');
        if (saved && typeof saved.text === 'string') {
            $('journal-note').value = saved.text.slice(0, 1200);
            $('journal-status').textContent = 'Dòng bạn đã để lại vẫn ở đây.';
        }
    } catch { $('journal-status').textContent = 'Chưa đọc được ghi chép cũ trong trình duyệt này.'; }
    $('journal-note').addEventListener('input', () => { $('journal-status').textContent = 'Dòng này chưa được lưu.'; });
    $('journal-form').addEventListener('submit', event => {
        event.preventDefault();
        try {
            const text = $('journal-note').value.trim();
            if (text) localStorage.setItem(key, JSON.stringify({ text, at: new Date().toISOString() }));
            else localStorage.removeItem(key);
            $('journal-status').textContent = text ? 'Đã giữ lại, chỉ trong trình duyệt này.' : 'Trang giấy đã trống. Bạn có thể viết lại bất cứ lúc nào.';
        } catch { $('journal-status').textContent = 'Trình duyệt chưa cho lưu. Hãy sao chép dòng này để giữ lại nhé.'; }
    });
    $('capture-button').addEventListener('click', () => {
        if (captureBusy) return;
        captureBusy = true;
        $('capture-button').disabled = true;
        $('capture-status').textContent = 'Đang giữ lại khoảnh khắc…';
        requestCapture();
    });
    function captureFailed() {
        captureBusy = false;
        $('capture-button').disabled = false;
        $('capture-status').textContent = 'Chưa chụp được khung cảnh. Hãy thử lại khi cảnh đã mở.';
    }
    function capture() {
        // Called synchronously after WebGL draw, before its buffer is discarded.
        try {
            const photo = document.createElement('canvas');
            photo.width = canvas.width; photo.height = canvas.height;
            const context = photo.getContext('2d');
            context.drawImage(canvas, 0, 0);
            context.drawImage(overlay, 0, 0, photo.width, photo.height);
            const size = Math.max(11, Math.round(photo.width / 95));
            context.font = `${size}px "Segoe UI", sans-serif`;
            const caption = `Đài quan sát của Phúc · ${new Date().toLocaleString('vi-VN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric' })}`;
            context.fillStyle = '#070b10b3';
            context.fillRect(0, photo.height - size * 4, photo.width, size * 4);
            context.fillStyle = '#dfc29a';
            context.fillText(caption, size * 1.5, photo.height - size * 1.5, photo.width - size * 3);
            photo.toBlob(blob => {
                if (!blob) { captureFailed(); return; }
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `dai-quan-sat-${Date.now()}.png`;
                document.body.append(link); link.click(); link.remove();
                setTimeout(() => URL.revokeObjectURL(url), 30000);
                captureBusy = false;
                $('capture-button').disabled = false;
                $('capture-status').textContent = 'Ảnh PNG đã sẵn sàng tải xuống.';
            }, 'image/png');
        } catch { captureFailed(); }
    }
    function draw(delta, camera, paused, shiftX, shiftY) {
        if (overlay.width !== canvas.width || overlay.height !== canvas.height) {
            overlay.width = canvas.width; overlay.height = canvas.height;
        }
        ink.clearRect(0, 0, overlay.width, overlay.height);
        if (!trails) return;
        if (!paused && !reducedMotion) trailTime += delta * (quiet || horizon ? .3 : 1);
        const w = overlay.width, h = overlay.height;
        const aspect = w / h;
        const radius = h * 8.2 / (camera.distance * Math.max(1, .95 / aspect));
        const cx = w / 2 - shiftX * h / 2;
        const cy = h / 2 + ((aspect < 1 ? .12 : .035) + shiftY) * h / 2;
        ink.save(); ink.translate(cx, cy);
        ink.lineWidth = Math.max(.7, w / 1600);
        // Decorative arcs outside the shadow; deliberately not photon telemetry.
        for (let i = 0; i < 3; i++) {
            const phase = trailTime * .32 + i * 2.1 + camera.yaw * .3;
            ink.strokeStyle = `rgba(240,215,173,${.12 + .25 * Math.pow(Math.sin(phase), 2)})`;
            ink.beginPath();
            ink.ellipse(0, 0, radius * (1.1 + i * .17), radius * (.68 + Math.abs(Math.sin(camera.pitch)) * .22 + i * .1), -.22, phase, phase + .65);
            ink.stroke();
        }
        ink.restore();
    }
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && horizon) leave();
        tuneSound();
    });
    window.addEventListener('pagehide', () => {
        leave();
    });
    return {
        get pace() { return quiet || horizon ? .25 : 1; },
        leave, draw, capture, captureFailed,
        checkDistance(distance, paused) {
            if (distance > 13) armed = true;
            if (distance < 10 && armed && !quiet && !horizon && !paused && !reducedMotion && !$('info-dialog').open && !notebookEditing()) {
                armed = false; enter('horizon');
            }
        },
        orbitBy(amount) {
            orbit += amount;
            if (Math.abs(orbit) >= Math.PI * 2 && !discovered && !quiet && !horizon) {
                discovered = true;
                whisper('Bạn vừa đi một vòng quanh điều không thể quay về.', 7000);
            }
        },
        view(name) {
            orbit = 0;
            if (quiet || horizon) return;
            whisper({ cinematic: 'Có những điều chỉ hiện ra khi ánh sáng đổi đường.', top: 'Từ xa, hỗn loạn cũng có hình dáng của sự yên tĩnh.', close: 'Đến gần hơn. Để thấy bóng tối có một đường viền.' }[name]);
        }
    };
    function notebookEditing() { return document.activeElement === $('journal-note'); }
};
