'use strict';
window.createBlackHoleKeepsakes = function ({ canvas, overlay, getView, recallView, requestCapture, interrupt, resume }) {
    const $ = id => document.getElementById(id);
    const model = window.BlackHoleModel;
    const key = 'phuc.black-hole.journal.v2';
    let history = [], snapshot, capturedAt, captureBusy = false;
    function dateLabel(value) {
        return new Date(value).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    }
    function renderHistory() {
        $('journal-count').textContent = `${history.length} / 10`;
        $('journal-entries').replaceChildren();
        for (const entry of history) {
            const article = document.createElement('article');
            const date = document.createElement('time'); date.dateTime = entry.at; date.textContent = dateLabel(entry.at);
            const note = document.createElement('p'); note.textContent = entry.text;
            article.append(date, note);
            if (entry.view) {
                const button = document.createElement('button'); button.type = 'button'; button.className = 'note-look';
                button.textContent = `Ngắm lại góc nhìn này · ${(23 / entry.view.distance).toFixed(1)}× ↗`;
                button.addEventListener('click', () => recallView(entry.view));
                article.append(button);
            }
            $('journal-entries').append(article);
        }
    }
    try {
        const stored = localStorage.getItem(key);
        if (stored !== null) history = model.entries(JSON.parse(stored));
        else {
            const legacy = JSON.parse(localStorage.getItem('phuc.black-hole.journal.v1') || 'null');
            if (legacy && typeof legacy.text === 'string' && legacy.text.trim()) {
                history = model.entries([{ text: legacy.text, at: Number.isFinite(Date.parse(legacy.at)) ? legacy.at : new Date().toISOString() }]);
                // Keep v1 untouched as a recoverable copy of the original note.
                localStorage.setItem(key, JSON.stringify(history));
            }
        }
        if (history.length) $('journal-status').textContent = 'Những dòng bạn để lại vẫn ở đây, trong những lần đã ngồi lại.';
    } catch { $('journal-status').textContent = 'Chưa đọc hoặc lưu được lịch sử. Ghi chép cũ vẫn được giữ trong trình duyệt.'; }
    renderHistory();
    $('journal-note').addEventListener('input', () => { $('journal-status').textContent = 'Dòng này chưa được lưu.'; });
    $('journal-form').addEventListener('submit', event => {
        event.preventDefault();
        const text = $('journal-note').value.trim();
        if (!text) { $('journal-status').textContent = 'Viết một điều nhỏ trước khi giữ lại nhé.'; return; }
        const next = model.entries([{ text, at: new Date().toISOString(), view: getView() }, ...history]);
        try {
            localStorage.setItem(key, JSON.stringify(next));
            history = next; renderHistory(); $('journal-note').value = '';
            $('journal-status').textContent = 'Đã giữ lại cùng góc nhìn. Sổ lưu 10 lần gần nhất, chỉ trên trình duyệt này.';
        } catch { $('journal-status').textContent = 'Chưa lưu được. Dòng bạn viết vẫn ở đây để sao chép.'; }
    });

    function captureFailed() {
        captureBusy = false; $('capture-button').disabled = false;
        $('capture-status').textContent = 'Chưa chụp được khung cảnh. Hãy thử lại khi cảnh đã mở.';
    }
    function wrappedLines(context, text, width) {
        const lines = []; let line = '';
        for (const word of text.split(/\s+/)) {
            if (line && context.measureText(`${line} ${word}`).width > width) { lines.push(line); line = ''; }
            if (context.measureText(word).width > width) {
                for (const character of Array.from(word)) {
                    if (context.measureText(line + character).width > width && line) { lines.push(line); line = ''; }
                    line += character;
                }
            } else line += (line ? ' ' : '') + word;
        }
        if (line.trim()) lines.push(line.trim());
        return lines;
    }
    function compose() {
        if (!snapshot) return;
        const photo = $('postcard-preview');
        const dimensions = { original: [snapshot.width, snapshot.height], landscape: [1440, 810], square: [1200, 1200], portrait: [810, 1440] };
        [photo.width, photo.height] = dimensions[$('postcard-ratio').value];
        const context = photo.getContext('2d'), size = Math.max(13, Math.round(photo.width / 58));
        const quote = $('postcard-quote-toggle').checked ? $('postcard-quote').value.trim() : '';
        context.font = `italic ${size * 1.15}px Georgia, serif`;
        const lines = wrappedLines(context, quote, photo.width - size * 4);
        const footer = [];
        if ($('postcard-signature').checked) footer.push('Đài quan sát của Phúc');
        if ($('postcard-date').checked) footer.push(dateLabel(capturedAt));
        const footerHeight = (lines.length * 1.65 + footer.length * 1.6 + (lines.length || footer.length ? 2 : 0)) * size;
        context.fillStyle = '#080d14'; context.fillRect(0, 0, photo.width, photo.height);
        const rect = model.contain(snapshot.width, snapshot.height, photo.width, Math.max(photo.height * .5, photo.height - footerHeight));
        context.drawImage(snapshot, rect.x, rect.y, rect.width, rect.height);
        context.textAlign = 'center'; context.fillStyle = '#dec195';
        let y = photo.height - footerHeight + size * 1.5;
        for (const line of lines) { context.fillText(line, photo.width / 2, y); y += size * 1.65; }
        context.font = `${size * .67}px "Segoe UI", sans-serif`;
        for (const line of footer) { context.fillText(line, photo.width / 2, y + size * .5); y += size * 1.6; }
        $('postcard-quote').disabled = !$('postcard-quote-toggle').checked;
    }
    $('capture-button').addEventListener('click', () => {
        if (captureBusy) return;
        interrupt(); captureBusy = true; $('capture-button').disabled = true;
        $('capture-status').textContent = 'Đang giữ lại khoảnh khắc…';
        requestCapture();
    });
    function capture() {
        try {
            snapshot = document.createElement('canvas'); snapshot.width = canvas.width; snapshot.height = canvas.height;
            const ctx = snapshot.getContext('2d');
            // Copy immediately after WebGL draw, before its drawing buffer is discarded.
            ctx.drawImage(canvas, 0, 0); ctx.drawImage(overlay, 0, 0, snapshot.width, snapshot.height);
            capturedAt = new Date().toISOString(); compose();
            $('postcard-status').textContent = 'Chọn khung ảnh và những điều bạn muốn mang theo.';
            $('postcard-dialog').showModal();
            captureBusy = false; $('capture-button').disabled = false;
            $('capture-status').textContent = 'Đã giữ khung cảnh để làm ảnh kỷ niệm.';
        } catch { captureFailed(); }
    }
    for (const id of ['postcard-ratio', 'postcard-signature', 'postcard-date', 'postcard-quote-toggle', 'postcard-quote']) $(id).addEventListener('input', compose);
    $('close-postcard').addEventListener('click', () => $('postcard-dialog').close());
    $('postcard-dialog').addEventListener('close', () => {
        snapshot = null; $('postcard-preview').width = 1; $('postcard-preview').height = 1;
        resume(); $('capture-button').focus({ preventScroll: true });
    });
    $('download-postcard').addEventListener('click', () => {
        $('download-postcard').disabled = true;
        const fail = () => { $('download-postcard').disabled = false; $('postcard-status').textContent = 'Chưa tạo được ảnh. Bạn có thể thử lại.'; };
        try {
            $('postcard-preview').toBlob(blob => {
                if (!blob) { fail(); return; }
                const url = URL.createObjectURL(blob), link = document.createElement('a');
                link.href = url; link.download = `dai-quan-sat-${Date.now()}.png`;
                document.body.append(link); link.click(); link.remove();
                setTimeout(() => URL.revokeObjectURL(url), 30000);
                $('download-postcard').disabled = false; $('postcard-status').textContent = 'Ảnh PNG đã sẵn sàng tải xuống.';
            }, 'image/png');
        } catch { fail(); }
    });
    return { capture, captureFailed };
};
