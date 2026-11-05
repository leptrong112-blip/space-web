/* Small, local-only rituals around the observatory. No external media. */
'use strict';
window.createBlackHoleMoments = function ({ canvas, hideUI, requestRender, requestCapture, reducedMotion, getView, recallView, interrupt, resume, notifyHorizon }) {
    const $ = id => document.getElementById(id);
    const scene = $('experience');
    const overlay = $('light-trails');
    const ink = overlay.getContext('2d');
    let trails = false, quiet = false, horizon = false, armed = true;
    let oldHidden = false, timer, whisperTimer, trailTime = 0, orbit = 0, discovered = false;
    const soundscape = window.createBlackHoleAudio();
    const keepsakes = window.createBlackHoleKeepsakes({ canvas, overlay, getView, recallView, requestCapture, interrupt, resume });

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
        if (horizon) { timer = setTimeout(() => leave(), 5200); notifyHorizon(); }
        tuneSound();
        requestRender();
    }
    $('quiet-button').addEventListener('click', () => enter('quiet'));
    $('trails-button').addEventListener('click', () => {
        trails = !trails;
        $('trails-button').setAttribute('aria-pressed', String(trails));
        requestRender();
    });
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
        leave, draw, whisper, capture: keepsakes.capture, captureFailed: keepsakes.captureFailed,
        soundView: soundscape.setView,
        silenceWhisper() { clearTimeout(whisperTimer); $('scene-whisper').hidden = true; },
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
