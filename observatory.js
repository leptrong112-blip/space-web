/* Small, independent enhancements; no framework and no account required. */
(() => {
    const menu = document.querySelector('.menu-toggle');
    const navigation = document.getElementById('main-navigation');
    const setMenu = open => {
        navigation.classList.toggle('is-open', open);
        menu.setAttribute('aria-expanded', String(open));
    };
    menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
    navigation.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        if (menu.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); }
        window.closeObserverMode?.();
        window.closeModal?.();
        document.getElementById('ai-chat-window').classList.add('hidden-chat');
    });

    const localImages = {
        mercury: 'sao thủy.jpg', venus: 'sao kim.jpg', earth: 'trái đất.jpg', mars: 'sao hỏa.jpg',
        jupiter: 'sao mộc.jpg', saturn: 'sao thổ.jpg', uranus: 'sao thiên vương.jpg',
        neptune: 'sao hải vương.jpg', sun: 'mặt trời.jpg', moon: 'mặt trăng.jpg'
    };
    const picker = document.getElementById('planet-picker');
    Object.entries(localImages).forEach(([id, file]) => {
        if (typeof celestialData === 'undefined') return;
        celestialData[id].img = `Images/${file}`;
        const cardButton = document.querySelector(`.planet-card button[onclick="flyToPlanet('${id}')"]`);
        if (cardButton) cardButton.parentElement.querySelector('img').src = `Images/${file}`;
        const button = document.createElement('button');
        button.type = 'button';
        button.textContent = celestialData[id].title;
        button.dataset.planet = id;
        button.setAttribute('aria-pressed', 'false');
        button.addEventListener('click', () => window.flyToPlanet?.(id));
        picker.appendChild(button);
    });
    document.querySelectorAll('.section img').forEach(img => { img.loading = 'lazy'; img.decoding = 'async'; });

    const distance = document.getElementById('light-distance');
    function updateLight() {
        const au = Number(distance.value);
        const seconds = Math.round(au * 149600000 / 299792.458);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor(seconds % 3600 / 60);
        const remainder = seconds % 60;
        document.getElementById('light-time').textContent = `${hours ? `${hours} giờ ` : ''}${minutes} phút ${remainder} giây`;
        document.getElementById('light-au').textContent = `${au.toLocaleString('vi-VN')} AU`;
        document.querySelector('.light-beam').style.animationDuration = `${2 + au / 8}s`;
        document.querySelectorAll('[data-distance]').forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.distance) === au)));
    }
    distance.addEventListener('input', updateLight);
    document.querySelectorAll('[data-distance]').forEach(button => button.addEventListener('click', () => {
        distance.value = button.dataset.distance;
        updateLight();
    }));
    updateLight();

    let saved = [];
    let persistent = true;
    try {
        const value = JSON.parse(localStorage.getItem('phuc.observations.v1') || '[]');
        if (Array.isArray(value)) saved = [...new Set(value.filter(id => Object.hasOwn(localImages, id)))];
    } catch { persistent = false; }
    let selected = null;
    const saveButton = document.getElementById('save-observation');
    function updateSaved() {
        const hasSaved = saved.includes(selected);
        saveButton.textContent = hasSaved ? '★ Đã lưu · Bấm để bỏ lưu' : '☆ Lưu vào sổ quan sát';
        saveButton.setAttribute('aria-pressed', String(hasSaved));
        document.getElementById('observation-count').textContent = `${saved.length}/10 thiên thể trong sổ ${persistent ? 'trên trình duyệt này' : 'của phiên này'}.`;
        picker.querySelectorAll('button').forEach(button => {
            const id = button.dataset.planet;
            button.textContent = `${saved.includes(id) ? '★ ' : ''}${celestialData[id].title}`;
            button.setAttribute('aria-pressed', String(id === selected));
        });
    }
    saveButton.addEventListener('click', () => {
        if (!selected) return;
        saved = saved.includes(selected) ? saved.filter(id => id !== selected) : [...saved, selected];
        try { localStorage.setItem('phuc.observations.v1', JSON.stringify(saved)); } catch { persistent = false; }
        updateSaved();
    });
    document.addEventListener('planet-selected', event => {
        selected = event.detail;
        document.getElementById('hud-curiosity').textContent = celestialData[selected]?.fun || '';
        updateSaved();
    });
    document.addEventListener('solar-reset', () => { selected = null; updateSaved(); });
    updateSaved();

    // If a CDN fails, keep the reading experience usable and explain the 3D state.
    if (!window.solarReady) {
        const message = document.createElement('p');
        message.className = 'observatory-description';
        message.style.padding = '30px';
        message.textContent = 'Sa bàn 3D chưa tải được. Bạn có thể tải lại trang khi có kết nối Internet; các câu chuyện và góc ánh sáng vẫn mở để khám phá.';
        document.getElementById('threejs-container').replaceChildren(message);
        document.querySelectorAll('.observatory-controls button, .observatory-controls input, .planet-picker button').forEach(control => control.disabled = true);
    }
})();
