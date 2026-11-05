// Build a portable static website without installing any packages.
const fs = require('node:fs');
const path = require('node:path');
const zlib = require('node:zlib');

const root = path.resolve(__dirname, '..');
const output = path.resolve(root, 'dist');
// Only clean the generated directory directly inside this checkout.
if (path.dirname(output) !== root || path.basename(output) !== 'dist') {
    throw new Error('Invalid website output directory');
}
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

let count = 0;
let bytes = 0;
function copy(relative) {
    // Keep the unused 62 MB image master in Git, out of the published site.
    if (relative.split(path.sep).join('/') === 'Images/Milky Way.jpg') return;
    const source = path.join(root, relative);
    const stat = fs.lstatSync(source);
    if (stat.isSymbolicLink()) throw new Error(`Unsupported symbolic link: ${relative}`);
    if (stat.isDirectory()) {
        for (const name of fs.readdirSync(source)) copy(path.join(relative, name));
        return;
    }
    if (!stat.isFile()) throw new Error(`Unsupported asset: ${relative}`);

    let content = fs.readFileSync(source);
    let destination = relative;
    // Pages doesn't provide custom Content-Encoding headers for Unity's .br URLs.
    // Publish ordinary .data/.js/.wasm files instead; source builds stay untouched.
    if (relative.startsWith('VuTru_WebGL' + path.sep) && relative.endsWith('.br')) {
        content = zlib.brotliDecompressSync(content);
        destination = relative.slice(0, -3);
    }
    if (relative === path.join('VuTru_WebGL', 'index.html')) {
        content = Buffer.from(content.toString('utf8').replace(/(VuTru_WebGL\.(?:data|framework\.js|wasm))\.br/g, '$1'));
    }
    const target = path.join(output, destination);
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.writeFileSync(target, content);
    count++;
    bytes += content.length;
}

for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (entry.isFile() && /\.(?:html|css|js)$/.test(entry.name)) copy(entry.name);
}
for (const directory of ['Images', 'Audio', 'VuTru_WebGL']) copy(directory);
fs.writeFileSync(path.join(output, '.nojekyll'), '');
if (bytes >= 1024 ** 3) throw new Error('Website exceeds the GitHub Pages 1 GB limit');
console.log(`Built ${count} files (${(bytes / 1024 ** 2).toFixed(1)} MB) in dist/`);
