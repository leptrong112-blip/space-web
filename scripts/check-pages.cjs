// Validate the files that will actually be served under /space-web/.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '../dist');
let pages = 0;
let references = 0;

function checkReference(file, value) {
    if (!value || /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(value)) return;
    assert.ok(!value.startsWith('/'), `${file}: root-relative URL breaks project hosting: ${value}`);
    const relative = decodeURIComponent(value.split(/[?#]/)[0]);
    const target = path.resolve(path.dirname(file), relative);
    assert.ok(target.startsWith(root + path.sep), `${file}: URL escapes website: ${value}`);
    assert.ok(fs.existsSync(target), `${file}: missing asset: ${value}`);
    references++;
}

function inspect(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        const file = path.join(directory, entry.name);
        if (entry.isDirectory()) { inspect(file); continue; }
        if (!/\.(?:html|css)$/.test(entry.name)) continue;
        const text = fs.readFileSync(file, 'utf8');
        if (entry.name.endsWith('.html')) {
            pages++;
            for (const match of text.matchAll(/\b(?:src|href)\s*=\s*["']([^"']*)["']/gi)) checkReference(file, match[1]);
            for (const match of text.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
                if (/\bsrc\s*=|\btype\s*=/i.test(match[1])) continue;
                new vm.Script(match[2], { filename: file });
            }
        }
        for (const match of text.matchAll(/url\(\s*(['"]?)(.*?)\1\s*\)/gi)) checkReference(file, match[2]);
    }
}
inspect(root);
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const voyage = fs.readFileSync(path.join(root, 'voyage-prototype.html'), 'utf8');
assert.match(home, /href="voyage-prototype\.html"/);
assert.match(voyage, /href="index\.html#trang-chu"/);
const unity = fs.readFileSync(path.join(root, 'VuTru_WebGL/index.html'), 'utf8');
for (const extension of ['data', 'framework.js', 'wasm']) {
    const name = `VuTru_WebGL.${extension}`;
    assert.ok(unity.includes(`/${name}"`), `Unity config is missing ${name}`);
    assert.ok(fs.statSync(path.join(root, 'VuTru_WebGL/Build', name)).size > 0);
}
const wasm = fs.readFileSync(path.join(root, 'VuTru_WebGL/Build/VuTru_WebGL.wasm'));
assert.deepEqual([...wasm.subarray(0, 4)], [0, 97, 115, 109], 'Invalid decompressed WebAssembly');
new vm.Script(fs.readFileSync(path.join(root, 'VuTru_WebGL/Build/VuTru_WebGL.framework.js'), 'utf8'));
assert.ok(!fs.existsSync(path.join(root, 'Images/Milky Way.jpg')));
assert.ok(!fs.existsSync(path.join(root, '.git')));
console.log(`Validated ${pages} pages, ${references} local references, inline JavaScript and Unity assets.`);
