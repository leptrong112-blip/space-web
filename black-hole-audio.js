/* Local soundscape: synthesized pads or a user-selected, browser-local track. */
'use strict';
window.createBlackHoleAudio = function () {
    const $ = id => document.getElementById(id);
    const media = $('personal-audio');
    const presets = {
        deep: { name: 'Trầm sâu', notes: [55, 82.41, 110], rate: .07, depth: .05, description: 'Một lớp âm trầm, chậm và tối.' },
        float: { name: 'Lơ lửng', notes: [130.81, 164.81, 196], rate: .12, depth: .08, description: 'Hợp âm nhẹ, như đang trôi giữa các vì sao.' },
        pulse: { name: 'Nhịp xa', notes: [65.41, 98, 130.81], rate: .6, depth: .22, description: 'Một nhịp âm mềm, đều đặn từ khoảng xa.' }
    };
    const storageKey = 'phuc.black-hole.audio.v1';
    let enabled = false, volume = 35, style = 'deep', quiet = false, horizon = false;
    let context, master, synth, fileGain, lfo, modulation, voices = [];
    let fileURL = '', fileName = '', revision = 0;
    try {
        const saved = JSON.parse(localStorage.getItem(storageKey) || 'null');
        if (saved && Number.isFinite(saved.volume)) volume = Math.max(0, Math.min(100, saved.volume));
        if (saved && Object.hasOwn(presets, saved.style)) style = saved.style;
    } catch { /* Preferences are optional when storage is unavailable. */ }
    function save() {
        try { localStorage.setItem(storageKey, JSON.stringify({ volume, style })); } catch { /* Keep working in memory. */ }
    }
    function updateUI(message) {
        $('sound-button').setAttribute('aria-pressed', String(enabled));
        $('sound-volume').value = volume;
        $('sound-volume-value').value = `${volume}%`;
        $('sound-style').value = style;
        $('sound-style').disabled = Boolean(fileURL);
        $('clear-sound-file').hidden = !fileURL;
        $('sound-description').textContent = fileURL ? 'Bản nhạc riêng của bạn, phát lặp lại.' : presets[style].description;
        $('sound-status').textContent = message || `${enabled ? (volume ? 'Đang phát' : 'Đã bật · âm lượng 0%') : 'Đang tắt'} · ${fileURL ? fileName : presets[style].name}`;
    }
    function initialize() {
        if (context) return;
        context = new (window.AudioContext || window.webkitAudioContext)();
        master = context.createGain(); master.gain.value = 0; master.connect(context.destination);
        synth = context.createGain(); synth.gain.value = .32; synth.connect(master);
        fileGain = context.createGain(); fileGain.gain.value = 0; fileGain.connect(master);
        context.createMediaElementSource(media).connect(fileGain);
        voices = presets[style].notes.map((frequency, i) => {
            const oscillator = context.createOscillator();
            const level = context.createGain(); level.gain.value = [.55, .28, .17][i];
            oscillator.frequency.value = frequency;
            oscillator.connect(level); level.connect(synth); oscillator.start();
            return oscillator;
        });
        lfo = context.createOscillator(); modulation = context.createGain();
        lfo.connect(modulation); modulation.connect(synth.gain); lfo.start();
    }
    function tune() {
        if (!context) return;
        const now = context.currentTime, preset = presets[style];
        master.gain.setTargetAtTime(enabled && !document.hidden ? volume / 100 * .7 * (quiet ? .55 : horizon ? .7 : 1) : 0, now, .2);
        synth.gain.setTargetAtTime(fileURL ? 0 : .32, now, .35);
        fileGain.gain.setTargetAtTime(fileURL ? 1 : 0, now, .2);
        modulation.gain.setTargetAtTime(fileURL ? 0 : preset.depth, now, .35);
        lfo.frequency.setTargetAtTime(preset.rate * (quiet ? .6 : 1), now, .5);
        voices.forEach((voice, i) => voice.frequency.setTargetAtTime(preset.notes[i] * (horizon ? .76 : 1), now, .6));
    }
    async function syncPlayback() {
        const current = ++revision;
        if (!enabled || document.hidden) { media.pause(); tune(); updateUI(); return; }
        updateUI('Đang mở một khoảng âm thanh…');
        try {
            initialize();
            await context.resume();
            if (current !== revision) return;
            tune();
            if (fileURL) await media.play();
            else media.pause();
            if (current === revision) updateUI();
        } catch {
            if (current !== revision) return;
            enabled = false; media.pause(); tune();
            updateUI('Chưa phát được âm thanh. Thử bật lại hoặc chọn một tệp MP3 khác nhé.');
        }
    }
    $('sound-button').addEventListener('click', () => { enabled = !enabled; syncPlayback(); });
    $('sound-volume').addEventListener('input', event => { volume = Number(event.target.value); tune(); updateUI(); save(); });
    $('sound-style').addEventListener('change', event => { style = event.target.value; tune(); updateUI(); save(); });
    $('sound-file').addEventListener('change', event => {
        const file = event.target.files[0];
        if (!file) return;
        if (!file.size || (!file.type.startsWith('audio/') && !/\.(mp3|m4a|wav|ogg|flac|aac)$/i.test(file.name))) {
            updateUI('Hãy chọn một tệp âm thanh MP3, M4A, WAV, OGG hoặc FLAC.');
            event.target.value = ''; return;
        }
        media.pause();
        if (fileURL) URL.revokeObjectURL(fileURL);
        fileURL = URL.createObjectURL(file); fileName = file.name;
        media.src = fileURL; media.load();
        syncPlayback();
    });
    $('clear-sound-file').addEventListener('click', () => {
        media.pause(); media.removeAttribute('src'); media.load();
        URL.revokeObjectURL(fileURL); fileURL = ''; fileName = '';
        $('sound-file').value = '';
        syncPlayback();
    });
    media.addEventListener('error', () => {
        if (!fileURL) return;
        ++revision; enabled = false; media.pause(); tune();
        updateUI('Tệp này chưa phát được. Hãy chọn tệp khác hoặc trở về âm thanh không gian.');
    });
    document.addEventListener('visibilitychange', syncPlayback);
    window.addEventListener('pagehide', () => {
        ++revision; media.pause();
        if (context) context.suspend().catch(() => {});
    });
    window.addEventListener('pageshow', event => { if (event.persisted) syncPlayback(); });
    updateUI();
    return { setMood(next) { quiet = next.quiet; horizon = next.horizon; tune(); } };
};
