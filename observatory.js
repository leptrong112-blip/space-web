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

    const dropdown = document.querySelector('.nav-dropdown');
    const dropdownBtn = document.querySelector('.nav-dropdown-btn');
    if (dropdown && dropdownBtn) {
        dropdownBtn.addEventListener('click', event => {
            event.stopPropagation();
            const isOpen = dropdown.classList.toggle('is-active');
            dropdownBtn.setAttribute('aria-expanded', String(isOpen));
        });
        document.addEventListener('click', event => {
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('is-active');
                dropdownBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        if (menu.getAttribute('aria-expanded') === 'true') { setMenu(false); menu.focus(); }
        if (dropdown?.classList.contains('is-active')) {
            dropdown.classList.remove('is-active');
            dropdownBtn?.setAttribute('aria-expanded', 'false');
        }
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
        const cardImg = cardButton?.closest('.planet-card')?.querySelector('img') || cardButton?.parentElement?.querySelector('img');
        if (cardImg) cardImg.src = `Images/${file}`;
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

    let observations = [];
    let persistent = true;
    try {
        const value = JSON.parse(localStorage.getItem('phuc.observations.v2') || '[]');
        if (Array.isArray(value)) observations = value.filter(entry => entry && Object.hasOwn(localImages, entry.id));
        if (!observations.length) {
            const legacy = JSON.parse(localStorage.getItem('phuc.observations.v1') || '[]');
            if (Array.isArray(legacy)) {
                observations = [...new Set(legacy.filter(id => Object.hasOwn(localImages, id)))].map(id => ({
                    id,
                    date: null,
                    method: 'Sa bàn 3D',
                    note: ''
                }));
            }
        }
    } catch { persistent = false; }
    let selected = null;
    const saveButton = document.getElementById('save-observation');
    const noteInput = document.getElementById('observation-note');
    const methodInputs = [...document.querySelectorAll('[name="observation-method"]')];
    const journalList = document.getElementById('journal-list');
    const journalEmpty = document.getElementById('journal-empty');

    function storeObservations() {
        try { localStorage.setItem('phuc.observations.v2', JSON.stringify(observations)); }
        catch { persistent = false; }
    }

    function formatDate(value) {
        if (!value) return 'Đã lưu trước đây';
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return 'Ngày chưa xác định';
        return new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date);
    }

    function renderJournal() {
        journalList.replaceChildren();
        journalEmpty.hidden = observations.length > 0;
        observations
            .slice()
            .sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')))
            .forEach(entry => {
                const article = document.createElement('article');
                article.className = 'journal-card';

                const meta = document.createElement('p');
                meta.className = 'journal-meta';
                meta.textContent = `${formatDate(entry.date)} · ${entry.method || 'Sa bàn 3D'}`;

                const title = document.createElement('h3');
                title.textContent = celestialData[entry.id]?.title || entry.id;

                const note = document.createElement('p');
                note.className = 'journal-note';
                note.textContent = entry.note || 'Một thế giới đã được lưu lại, chưa có ghi chú.';

                const actions = document.createElement('div');
                actions.className = 'journal-actions';

                const observe = document.createElement('button');
                observe.type = 'button';
                observe.textContent = 'Quan sát lại →';
                observe.addEventListener('click', () => window.flyToPlanet?.(entry.id));

                const remove = document.createElement('button');
                remove.type = 'button';
                remove.className = 'journal-remove';
                remove.textContent = 'Xóa';
                remove.setAttribute('aria-label', `Xóa ${celestialData[entry.id]?.title || entry.id} khỏi nhật ký`);
                remove.addEventListener('click', () => {
                    observations = observations.filter(item => item.id !== entry.id);
                    storeObservations();
                    renderJournal();
                    updateSaved();
                });

                actions.append(observe, remove);
                article.append(meta, title, note, actions);
                journalList.appendChild(article);
            });
    }

    function setEntryFields(entry) {
        noteInput.value = entry?.note || '';
        const method = entry?.method || 'Sa bàn 3D';
        methodInputs.forEach(input => { input.checked = input.value === method; });
    }

    function updateSaved() {
        const entry = observations.find(item => item.id === selected);
        const hasSaved = Boolean(entry);
        saveButton.disabled = !selected;
        noteInput.disabled = !selected;
        methodInputs.forEach(input => { input.disabled = !selected; });
        saveButton.textContent = hasSaved ? '★ Cập nhật ghi chú' : '☆ Ghi vào nhật ký';
        saveButton.setAttribute('aria-pressed', String(hasSaved));
        document.getElementById('observation-count').textContent = `${observations.length}/10 thiên thể trong nhật ký ${persistent ? 'trên trình duyệt này' : 'của phiên này'}.`;
        picker.querySelectorAll('button').forEach(button => {
            const id = button.dataset.planet;
            button.textContent = `${observations.some(item => item.id === id) ? '★ ' : ''}${celestialData[id].title}`;
            button.setAttribute('aria-pressed', String(id === selected));
        });
    }
    saveButton.addEventListener('click', () => {
        if (!selected) return;
        const method = methodInputs.find(input => input.checked)?.value || 'Sa bàn 3D';
        const next = { id: selected, date: new Date().toISOString(), method, note: noteInput.value.trim() };
        const existingIndex = observations.findIndex(entry => entry.id === selected);
        if (existingIndex >= 0) observations[existingIndex] = next;
        else observations.push(next);
        storeObservations();
        renderJournal();
        updateSaved();
    });
    document.addEventListener('planet-selected', event => {
        selected = event.detail;
        document.getElementById('hud-curiosity').textContent = celestialData[selected]?.fun || '';
        setEntryFields(observations.find(entry => entry.id === selected));
        updateSaved();
    });
    document.addEventListener('solar-reset', () => { selected = null; setEntryFields(null); updateSaved(); });
    renderJournal();
    setEntryFields(null);
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
