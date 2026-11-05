const test = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const model = require('../black-hole-model.js');

test('camera crosses the angle seam by the short path, with exact endpoints', () => {
    const from = { yaw: Math.PI - .1, pitch: .13, distance: 23 };
    const to = { yaw: -Math.PI + .1, pitch: 1.38, distance: 26 };
    assert.deepEqual(model.curve(from, to, 0), from);
    const end = model.curve(from, to, 1);
    assert.ok(Math.abs(end.yaw - from.yaw - .2) < 1e-9);
    assert.equal(end.distance, to.distance); assert.equal(end.pitch, to.pitch);
    for (let i = 0; i <= 100; i++) {
        const p = model.curve(from, to, i / 100);
        assert.ok(p.distance >= 8 && p.distance <= 52);
        assert.ok(p.pitch >= -1.48 && p.pitch <= 1.48);
    }
});
test('36-second tour has continuous chapter boundaries and a still reduced-motion alternative', () => {
    const start = { yaw: -.6, pitch: .3, distance: 18 };
    for (const time of [12, 24]) {
        const before = model.tourPose(start, time - .001).pose;
        const after = model.tourPose(start, time).pose;
        assert.ok(Math.abs(before.distance - after.distance) < .001);
        assert.ok(Math.abs(before.pitch - after.pitch) < .001);
    }
    assert.equal(model.tourPose(start, 36).index, 2);
    for (const key of ['yaw', 'pitch', 'distance']) assert.ok(Math.abs(model.tourPose(start, 36).pose[key] - model.chapters[2].pose[key]) < 1e-9);
    assert.deepEqual(model.tourPose(start, 1, true).pose, model.tourPose(start, 11, true).pose);
});
test('postcard ratios preserve the whole source image without stretching', () => {
    for (const [w, h] of [[1440, 810], [1200, 1200], [810, 1440]]) {
        const r = model.contain(714, 668, w, h);
        assert.ok(r.x >= 0 && r.y >= 0);
        assert.ok(r.width <= w && r.height <= h);
        assert.ok(Math.abs(r.width / r.height - 714 / 668) < 1e-9);
    }
});
test('performance presets reduce both rendered pixel budget and frame rate', () => {
    const { battery, balanced, maximum } = model.modes;
    for (const key of ['pixels', 'fps', 'stars', 'dpr']) {
        assert.ok(battery[key] < balanced[key]); assert.ok(balanced[key] < maximum[key]);
    }
});

function notebook(initial = {}) {
    class Element {
        constructor() { this.value = ''; this.textContent = ''; this.children = []; this.events = {}; }
        addEventListener(name, fn) { this.events[name] = fn; }
        append(...children) { this.children.push(...children); }
        replaceChildren(...children) { this.children = children; }
    }
    const elements = new Map();
    const get = id => { if (!elements.has(id)) elements.set(id, new Element()); return elements.get(id); };
    const stored = new Map(Object.entries(initial));
    const storage = { getItem: key => stored.get(key) ?? null, setItem: (key, value) => stored.set(key, value) };
    let view = { yaw: .25, pitch: .13, distance: 23 }, recalled;
    const scope = { window: { BlackHoleModel: model }, document: { getElementById: get, createElement: () => new Element() }, localStorage: storage };
    vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../black-hole-keepsakes.js'), 'utf8'), scope);
    scope.window.createBlackHoleKeepsakes({ getView: () => view, recallView: v => { recalled = v; } });
    const save = text => { get('journal-note').value = text; get('journal-form').events.submit({ preventDefault() {} }); };
    return { get, stored, storage, save, view, get recalled() { return recalled; } };
}
test('legacy journal migration preserves its original record and text', () => {
    const old = JSON.stringify({ text: 'Một đêm yên tĩnh.', at: '2026-10-15T13:00:00Z' });
    const n = notebook({ 'phuc.black-hole.journal.v1': old });
    assert.equal(n.stored.get('phuc.black-hole.journal.v1'), old);
    assert.equal(JSON.parse(n.stored.get('phuc.black-hole.journal.v2'))[0].text, 'Một đêm yên tĩnh.');
    assert.equal(n.get('journal-count').textContent, '1 / 10');
});
test('journal keeps ten newest snapshots, supports recall, and survives reloading', () => {
    const n = notebook();
    for (let i = 0; i < 12; i++) { n.view.distance = 10 + i; n.save(`Dòng ${i}`); }
    const history = JSON.parse(n.stored.get('phuc.black-hole.journal.v2'));
    assert.equal(history.length, 10); assert.equal(history[0].text, 'Dòng 11'); assert.equal(history[9].text, 'Dòng 2');
    assert.equal(history[0].view.distance, 21); assert.equal(history[9].view.distance, 12);
    const reopened = notebook(Object.fromEntries(n.stored));
    const latest = reopened.get('journal-entries').children[0]; latest.children[2].events.click();
    assert.deepEqual(reopened.recalled, history[0].view);
});
test('failed storage preserves the draft and earlier entries; blank submit does not erase history', () => {
    const n = notebook(); n.save('Đã lưu');
    const before = n.stored.get('phuc.black-hole.journal.v2');
    n.save('   '); assert.equal(n.stored.get('phuc.black-hole.journal.v2'), before);
    n.storage.setItem = () => { throw new Error('QuotaExceeded'); };
    n.save('Bản nháp chưa lưu');
    assert.equal(n.get('journal-note').value, 'Bản nháp chưa lưu');
    assert.equal(n.stored.get('phuc.black-hole.journal.v2'), before);
    assert.match(n.get('journal-status').textContent, /Chưa lưu/);
});
