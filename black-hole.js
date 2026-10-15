/* Standalone WebGL2 experience. No network assets or third-party runtime required. */
(() => {
    'use strict';

    const canvas = document.getElementById('black-hole-canvas');
    const experience = document.getElementById('experience');
    const $ = id => document.getElementById(id);
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
    const initial = { yaw: 0.25, pitch: 0.13, distance: 23 };
    const camera = { ...initial };
    const target = { ...initial };
    let paused = reducedMotion;
    let autoOrbit = false;
    let elapsed = 0;
    let speed = 1;
    let exposure = 1;
    let dirty = true;
    let frame = 0;
    let lastTime = 0;
    let qualityScale = 1;
    let slowFrames = 0;
    let frameSamples = 0;
    let frameTotal = 0;
    let noteViewText = '';
    let notebookOpen = false;
    let captureRequested = false;
    let gl, program, uniforms, starTexture, vertexArray;

    const vertexSource = `#version 300 es
    precision highp float;
    void main() {
        vec2 position = vec2(float((gl_VertexID << 1) & 2), float(gl_VertexID & 2));
        gl_Position = vec4(position * 2.0 - 1.0, 0.0, 1.0);
    }`;

    const fragmentSource = `#version 300 es
    precision highp float;
    out vec4 fragColor;
    uniform vec2 uResolution;
    uniform vec2 uFocusOffset;
    uniform vec3 uCamera;
    uniform float uTime;
    uniform float uExposure;
    uniform sampler2D uStars;
    const float PI = 3.14159265359;

    float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }
    float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1, 0)), f.x),
                   mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), f.x), f.y);
    }

    vec3 diskColor(vec3 p, vec3 ray) {
        float r = length(p.xz);
        float a = atan(p.z, p.x);
        float orbit = a - uTime * 2.3 / pow(r / 3.0, 1.5);
        // Continuous polar waves: the material shears around the disk, with
        // inner rings moving faster. Angular frequencies are integers to
        // avoid a seam where atan wraps from pi to -pi.
        float swirls = sin(r * 12.0 + 1.7 * sin(orbit * 3.0 + r * 2.1));
        float threads = sin(r * 53.0 + sin(orbit * 6.0 - r * 4.0) * 2.0);
        float grains = noise(vec2(r * 22.0, sin(orbit) * 7.0 + cos(orbit * 3.0) * 3.0));
        float structure = .64 + .19 * swirls + .13 * threads + .24 * grains;
        float heat = pow(3.0 / r, .7);
        vec3 tint = mix(vec3(.95, .40, .10), vec3(1.0, .90, .72), heat);
        vec3 tangent = normalize(vec3(-p.z, 0.0, p.x));
        float beaming = pow(1.0 - dot(tangent, -normalize(ray)) * .32 * sqrt(3.0 / r), 3.0);
        float falloff = pow(3.0 / r, 1.65);
        return tint * structure * falloff * beaming * 4.5;
    }

    vec3 sky(vec3 ray) {
        ray = normalize(ray);
        vec2 uv = vec2(atan(ray.z, ray.x) / (2.0 * PI) + .5,
                       asin(clamp(ray.y, -1.0, 1.0)) / PI + .5);
        vec3 stars = texture(uStars, uv).rgb;
        float dust = pow(max(0.0, 1.0 - abs(ray.y * .8 + ray.x * .35 + .2)), 16.0);
        return stars * 1.45 + vec3(.009, .012, .017) + dust * vec3(.009, .011, .014);
    }

    void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / uResolution.y;
        // Leave a little more room above the scene on portrait screens.
        uv.y += uResolution.x < uResolution.y ? .12 : .035;
        uv += uFocusOffset;
        vec3 forward = normalize(-uCamera);
        vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
        vec3 up = cross(right, forward);
        vec3 ray = normalize(forward * 2.25 + uv.x * right + uv.y * up);
        vec3 p = uCamera;
        vec3 v = ray;
        float angularMomentum2 = dot(cross(p, v), cross(p, v));
        vec3 color = vec3(0);
        float transmission = 1.0;
        bool captured = false;
        bool escaped = false;

        // Integrate a bent ray with a central acceleration in units r_s = 1.
        // This corresponds to u'' + u = 1.5u^2 for u = 1/r, using approximate
        // camera initial conditions and a finite-step midpoint integrator.
        // It is a visual approximation, not a precision relativity solver.
        for (int i = 0; i < 220; i++) {
            float r = length(p);
            if (r < 1.02) { captured = true; break; }
            if (r > 80.0 && dot(p, v) > 0.0) { escaped = true; break; }
            float stepSize = clamp(r * .085, .035, 1.7);
            vec3 accel = -1.5 * angularMomentum2 * p / pow(r, 5.0);
            vec3 midP = p + v * stepSize * .5;
            vec3 midV = v + accel * stepSize * .5;
            float midR = length(midP);
            vec3 nextP = p + midV * stepSize;
            vec3 nextV = v - 1.5 * angularMomentum2 * midP / pow(midR, 5.0) * stepSize;

            // Rays may intersect the disk more than once, revealing its
            // lensed underside and the narrow secondary ring.
            if (p.y * nextP.y <= 0.0 && abs(p.y - nextP.y) > .000001) {
                vec3 hit = mix(p, nextP, p.y / (p.y - nextP.y));
                float diskR = length(hit.xz);
                if (diskR > 2.85 && diskR < 12.0) {
                    float edge = smoothstep(2.85, 3.25, diskR) * (1.0 - smoothstep(8.0, 12.0, diskR));
                    float opacity = edge * .94;
                    color += transmission * diskColor(hit, midV) * opacity;
                    transmission *= 1.0 - opacity;
                }
            }
            // A very thin luminous atmosphere softens the disk silhouette.
            float cylindricalR = length(midP.xz);
            if (cylindricalR > 3.0 && cylindricalR < 12.0) {
                float halo = exp(-abs(midP.y) * 8.0) * exp(-cylindricalR * .28);
                color += transmission * vec3(1.0, .63, .28) * halo * stepSize * .12;
            }
            p = nextP;
            v = nextV;
        }

        if (!captured && escaped) color += sky(v) * transmission;
        // An understated highlight at the critical impact radius. The actual
        // lensing and disk arches above are generated by the curved ray path.
        float impact = sqrt(angularMomentum2);
        float ring = exp(-pow((impact - 2.598) / .021, 2.0));
        color += vec3(1.0, .89, .70) * ring * .38 * transmission;
        color *= uExposure;
        color = 1.0 - exp(-color * 1.35);
        color = pow(max(color, vec3(0.0)), vec3(.88));
        float vignette = 1.0 - .16 * smoothstep(.4, 2.2, length(uv));
        fragColor = vec4(color * vignette, 1.0);
    }`;

    function compile(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            const detail = gl.getShaderInfoLog(shader);
            gl.deleteShader(shader);
            throw new Error(detail);
        }
        return shader;
    }

    function makeStarTexture() {
        const stars = document.createElement('canvas');
        stars.width = 4096;
        stars.height = 2048;
        const ctx = stars.getContext('2d');
        ctx.fillStyle = '#020305';
        ctx.fillRect(0, 0, stars.width, stars.height);
        let seed = 48271;
        const random = () => {
            seed = (seed * 16807) % 2147483647;
            return (seed - 1) / 2147483646;
        };
        for (let i = 0; i < 15000; i++) {
            const x = random() * stars.width;
            const y = Math.acos(2 * random() - 1) / Math.PI * stars.height;
            const bright = random();
            const radius = .35 + Math.pow(bright, 8) * .95;
            const alpha = .22 + bright * .65;
            if (bright > .985) {
                const glow = ctx.createRadialGradient(x, y, 0, x, y, radius * 3);
                glow.addColorStop(0, `rgba(215,226,241,${alpha * .3})`);
                glow.addColorStop(1, 'rgba(215,226,241,0)');
                ctx.fillStyle = glow;
                ctx.fillRect(x - radius * 3, y - radius * 3, radius * 6, radius * 6);
            }
            ctx.fillStyle = i % 7 === 0 ? `rgba(232,204,165,${alpha})` : `rgba(225,234,247,${alpha})`;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fill();
        }
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, stars);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        return texture;
    }

    function initialize() {
        gl = canvas.getContext('webgl2', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'high-performance' });
        if (!gl) throw new Error('WebGL2 unavailable');
        const vert = compile(gl.VERTEX_SHADER, vertexSource);
        const frag = compile(gl.FRAGMENT_SHADER, fragmentSource);
        program = gl.createProgram();
        gl.attachShader(program, vert);
        gl.attachShader(program, frag);
        gl.linkProgram(program);
        gl.deleteShader(vert);
        gl.deleteShader(frag);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
        gl.useProgram(program);
        vertexArray = gl.createVertexArray();
        gl.bindVertexArray(vertexArray);
        uniforms = Object.fromEntries(['uResolution', 'uFocusOffset', 'uCamera', 'uTime', 'uExposure', 'uStars'].map(name => [name, gl.getUniformLocation(program, name)]));
        starTexture = makeStarTexture();
        gl.uniform1i(uniforms.uStars, 0);
        resize();
        dirty = true;
        lastTime = 0;
        $('loading-message').hidden = true;
        $('fallback-message').hidden = true;
        updatePlaybackUI();
        schedule();
    }

    function resize() {
        if (!gl || gl.isContextLost()) return;
        const quality = $('render-quality').value;
        const maxPixels = quality === 'high' ? 2100000 : quality === 'low' ? 460000 : 1150000;
        const w = canvas.clientWidth, h = canvas.clientHeight;
        const scale = Math.min(devicePixelRatio || 1, 1.5, Math.sqrt(maxPixels / (w * h))) * (quality === 'auto' ? qualityScale : 1);
        canvas.width = Math.max(1, Math.round(w * scale));
        canvas.height = Math.max(1, Math.round(h * scale));
        gl.viewport(0, 0, canvas.width, canvas.height);
        requestRender();
    }

    function schedule() {
        if (!frame && !document.hidden && gl && !gl.isContextLost() && $('fallback-message').hidden) {
            frame = requestAnimationFrame(render);
        }
    }

    function requestRender() {
        dirty = true;
        schedule();
    }

    function render(now) {
        frame = 0;
        const delta = lastTime ? Math.min((now - lastTime) / 1000, .1) : 0;
        const actualDelta = lastTime ? now - lastTime : 0;
        lastTime = now;
        if (!paused) {
            elapsed += delta * speed * moments.pace;
            if (autoOrbit && !pointers.size) {
                const turn = delta * .085 * moments.pace;
                target.yaw += turn;
                moments.orbitBy(turn);
            }
        }
        const ease = reducedMotion ? 1 : 1 - Math.exp(-delta * 10);
        let moving = false;
        for (const key of ['yaw', 'pitch', 'distance']) {
            const difference = target[key] - camera[key];
            if (Math.abs(difference) > .00005) { camera[key] += difference * Math.max(ease, .01); moving = true; }
            else camera[key] = target[key];
        }
        if (dirty || moving || !paused) {
            const aspect = canvas.clientWidth / canvas.clientHeight;
            const distance = camera.distance * Math.max(1, .95 / aspect);
            // Avoid the singular edge-on case of a mathematically thin disk.
            const pitch = Math.abs(camera.pitch) < .002 ? .002 : camera.pitch;
            gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
            // Reframe only on smaller screens so the notebook leaves the
            // black-hole center visible without changing the user's zoom.
            const width = canvas.clientWidth;
            const shiftX = notebookOpen && width > 600 && width <= 1000 ? Math.min(145, width * .22) * 2 / canvas.clientHeight : 0;
            const shiftY = notebookOpen && width <= 600 ? .10 : 0;
            gl.uniform2f(uniforms.uFocusOffset, shiftX, shiftY);
            gl.uniform3f(uniforms.uCamera,
                Math.sin(camera.yaw) * Math.cos(pitch) * distance,
                Math.sin(pitch) * distance,
                Math.cos(camera.yaw) * Math.cos(pitch) * distance);
            gl.uniform1f(uniforms.uTime, elapsed);
            gl.uniform1f(uniforms.uExposure, exposure);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            moments.draw(delta, camera, paused, shiftX, shiftY);
            if (captureRequested) { captureRequested = false; moments.capture(); }
            dirty = false;
            $('zoom-value').textContent = `${(initial.distance / camera.distance).toFixed(1)}×`;
            updateNotebookView();
            moments.checkDistance(camera.distance, paused);
        }
        // Decrease pixel cost after sustained slow frames, only in Auto mode.
        // Do not change resolution repeatedly or while the scene is paused.
        if (!paused && actualDelta > 0 && $('render-quality').value === 'auto') {
            frameSamples++;
            frameTotal += actualDelta;
            if (frameSamples === 45) {
                slowFrames = frameTotal / frameSamples > 34 ? slowFrames + 1 : 0;
                if (slowFrames >= 2 && qualityScale > .55) {
                    qualityScale = Math.max(.55, qualityScale * .8);
                    resize();
                    slowFrames = 0;
                }
                frameSamples = 0;
                frameTotal = 0;
            }
        }
        if (!paused || moving || dirty) schedule();
    }

    function announce(text) { $('announcement').textContent = text; }

    function updatePlaybackUI() {
        $('pause-button').setAttribute('aria-pressed', String(paused));
        $('pause-label').textContent = paused ? 'Tiếp tục' : 'Tạm dừng';
        $('pause-icon').textContent = paused ? '▷' : 'Ⅱ';
        $('pause-button').title = paused ? 'Tiếp tục chuyển động (Space)' : 'Dừng chuyển động (Space)';
        $('render-status').textContent = paused ? 'CHUYỂN ĐỘNG ĐÃ DỪNG' : 'ĐANG QUAN SÁT';
        experience.classList.toggle('is-paused', paused);
        $('orbit-button').setAttribute('aria-pressed', String(autoOrbit));
        $('note-motion-state').textContent = paused ? 'Đang tạm dừng' : 'Đang chuyển động';
    }

    function togglePause() {
        paused = !paused;
        lastTime = 0;
        updatePlaybackUI();
        announce(paused ? 'Đã tạm dừng chuyển động. Bạn vẫn có thể xoay và thu phóng.' : 'Đã tiếp tục chuyển động.');
        requestRender();
    }

    function clearPreset() {
        document.querySelectorAll('[data-view]').forEach(button => button.setAttribute('aria-pressed', 'false'));
    }

    function setView(name) {
        const views = {
            cinematic: initial,
            top: { yaw: .25, pitch: 1.38, distance: 26 },
            close: { yaw: .25, pitch: .16, distance: 12 }
        };
        // Choose the equivalent yaw closest to the current orbit, so presets
        // do not spin the camera through many revolutions after auto orbit.
        const view = views[name];
        Object.assign(target, view, { yaw: camera.yaw + Math.atan2(Math.sin(view.yaw - camera.yaw), Math.cos(view.yaw - camera.yaw)) });
        updateZoomButtons();
        updatePlaybackUI();
        document.querySelectorAll('[data-view]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.view === name)));
        moments.view(name);
        requestRender();
    }

    function zoom(factor) {
        target.distance = clamp(target.distance * factor, 8, 52);
        updateZoomButtons();
        clearPreset();
        requestRender();
    }

    function updateZoomButtons() {
        $('zoom-in').disabled = target.distance <= 8;
        $('zoom-out').disabled = target.distance >= 52;
    }

    function setSettings(open, returnFocus = false) {
        if (open) setNotebook(false);
        $('settings-panel').hidden = !open;
        $('settings-button').setAttribute('aria-expanded', String(open));
        if (returnFocus) $('settings-button').focus();
    }

    function hideUI(hidden) {
        if (!hidden) moments.leave(false);
        experience.classList.toggle('ui-hidden', hidden);
        $('show-ui').hidden = !hidden;
        setSettings(false);
        if (hidden) setNotebook(false);
        if (hidden) canvas.focus({ preventScroll: true });
        else $('hide-ui').focus({ preventScroll: true });
    }

    // A non-modal observing notebook: the scene keeps responding while it is
    // open. These readouts describe the camera, not measured black-hole data.
    function updateNotebookView() {
        if ($('black-hole-notebook').hidden) return;
        const pitch = Math.abs(camera.pitch);
        const angle = pitch > 1 ? (camera.pitch > 0 ? 'Nhìn từ trên' : 'Nhìn từ dưới') : pitch > .35 ? 'Góc nhìn nghiêng' : 'Nhìn ngang';
        const text = `${angle} · ${(initial.distance / camera.distance).toFixed(1)}×`;
        if (text !== noteViewText) {
            $('note-view-state').textContent = text;
            noteViewText = text;
        }
    }

    function setNotebook(open, returnFocus = false) {
        notebookOpen = open;
        $('black-hole-notebook').hidden = !open;
        experience.classList.toggle('notebook-open', open);
        $('notebook-button').setAttribute('aria-expanded', String(open));
        $('notebook-button').setAttribute('aria-label', open ? 'Đóng ghi chép về hố đen' : 'Mở ghi chép về hố đen');
        if (open) {
            setSettings(false);
            document.querySelector('.notebook-body').scrollTop = 0;
            updateNotebookView();
            $('close-notebook').focus({ preventScroll: true });
        } else if (returnFocus) $('notebook-button').focus({ preventScroll: true });
        requestRender();
    }

    const noteTabs = [...document.querySelectorAll('.notebook-tabs [role="tab"]')];
    function selectNote(tab, focus = false) {
        for (const button of noteTabs) {
            const selected = button === tab;
            button.setAttribute('aria-selected', String(selected));
            button.tabIndex = selected ? 0 : -1;
            $(button.getAttribute('aria-controls')).hidden = !selected;
        }
        if (focus) tab.focus();
    }
    noteTabs.forEach((tab, index) => {
        tab.addEventListener('click', () => selectNote(tab));
        tab.addEventListener('keydown', event => {
            let next;
            if (event.key === 'ArrowRight') next = (index + 1) % noteTabs.length;
            else if (event.key === 'ArrowLeft') next = (index + noteTabs.length - 1) % noteTabs.length;
            else if (event.key === 'Home') next = 0;
            else if (event.key === 'End') next = noteTabs.length - 1;
            else return;
            event.preventDefault();
            selectNote(noteTabs[next], true);
        });
    });
    $('notebook-button').addEventListener('click', () => setNotebook($('black-hole-notebook').hidden));
    $('close-notebook').addEventListener('click', () => setNotebook(false, true));
    document.querySelectorAll('[data-note-view]').forEach(button => button.addEventListener('click', () => {
        setView(button.dataset.noteView);
        setNotebook(false);
        canvas.focus({ preventScroll: true });
    }));

    const pointers = new Map();
    let lastPinch = 0;
    function pinchDistance() {
        const points = [...pointers.values()];
        return points.length >= 2 ? Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y) : 0;
    }
    canvas.addEventListener('pointerdown', event => {
        if (event.pointerType === 'mouse' && event.button !== 0) return;
        canvas.focus({ preventScroll: true });
        canvas.setPointerCapture(event.pointerId);
        pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        lastPinch = pinchDistance();
    });
    canvas.addEventListener('pointermove', event => {
        const previous = pointers.get(event.pointerId);
        if (!previous) return;
        pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
        if (pointers.size >= 2) {
            const currentPinch = pinchDistance();
            if (lastPinch > 0 && currentPinch > 0) zoom(lastPinch / currentPinch);
            lastPinch = currentPinch;
        } else {
            const turn = -(event.clientX - previous.x) * .005;
            target.yaw += turn;
            moments.orbitBy(turn);
            target.pitch = clamp(target.pitch + (event.clientY - previous.y) * .004, -1.48, 1.48);
            clearPreset();
            requestRender();
        }
    });
    const releasePointer = event => {
        pointers.delete(event.pointerId);
        lastPinch = pinchDistance();
        requestRender();
    };
    canvas.addEventListener('pointerup', releasePointer);
    canvas.addEventListener('pointercancel', releasePointer);
    canvas.addEventListener('lostpointercapture', releasePointer);
    canvas.addEventListener('wheel', event => {
        event.preventDefault();
        const units = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? canvas.clientHeight : 1;
        zoom(Math.exp(clamp(event.deltaY * units, -200, 200) * .0012));
    }, { passive: false });
    canvas.addEventListener('keydown', event => {
        const actions = {
            ArrowLeft: () => { target.yaw += .13; moments.orbitBy(.13); },
            ArrowRight: () => { target.yaw -= .13; moments.orbitBy(-.13); },
            ArrowUp: () => { target.pitch = clamp(target.pitch + .09, -1.48, 1.48); },
            ArrowDown: () => { target.pitch = clamp(target.pitch - .09, -1.48, 1.48); },
            '+': () => zoom(.85), '=': () => zoom(.85), '-': () => zoom(1.18),
            ' ': togglePause
        };
        if (!actions[event.key]) return;
        event.preventDefault();
        actions[event.key]();
        if (event.key.startsWith('Arrow')) clearPreset();
        requestRender();
    });
    document.addEventListener('keydown', event => {
        if ($('info-dialog').open) return;
        if (event.key === 'Escape') {
            setSettings(false);
            if (!$('black-hole-notebook').hidden) setNotebook(false, true);
            if (experience.classList.contains('ui-hidden')) hideUI(false);
        }
        if (event.target.matches('input, select, textarea') || event.ctrlKey || event.metaKey || event.altKey) return;
        if (event.key.toLowerCase() === 'r') setView('cinematic');
        if (event.key.toLowerCase() === 'h') hideUI(!experience.classList.contains('ui-hidden'));
    });

    document.querySelectorAll('[data-view]').forEach(button => button.addEventListener('click', () => setView(button.dataset.view)));
    $('zoom-in').addEventListener('click', () => zoom(.85));
    $('zoom-out').addEventListener('click', () => zoom(1.18));
    $('pause-button').addEventListener('click', togglePause);
    $('reset-button').addEventListener('click', () => { setView('cinematic'); announce('Đã về góc nhìn ban đầu.'); });
    $('orbit-button').addEventListener('click', () => {
        autoOrbit = !autoOrbit;
        if (autoOrbit) { paused = false; clearPreset(); }
        updatePlaybackUI();
        requestRender();
    });
    $('settings-button').addEventListener('click', () => setSettings($('settings-panel').hidden));
    $('close-settings').addEventListener('click', () => setSettings(false, true));
    document.addEventListener('pointerdown', event => {
        if (!event.target.closest('#settings-panel, #settings-button')) setSettings(false);
    });
    $('motion-speed').addEventListener('input', event => {
        speed = Number(event.target.value);
        $('speed-value').value = `${speed.toFixed(1)}×`;
    });
    $('brightness').addEventListener('input', event => {
        exposure = Number(event.target.value);
        $('brightness-value').value = `${Math.round(exposure * 100)}%`;
        requestRender();
    });
    $('render-quality').addEventListener('change', () => {
        qualityScale = 1;
        frameSamples = 0;
        frameTotal = 0;
        slowFrames = 0;
        resize();
    });
    $('hide-ui').addEventListener('click', () => hideUI(true));
    $('show-ui').addEventListener('click', () => hideUI(false));
    $('info-button').addEventListener('click', () => { setSettings(false); setNotebook(false); $('info-dialog').showModal(); });
    $('close-info').addEventListener('click', () => $('info-dialog').close());
    $('info-dialog').addEventListener('click', event => {
        if (event.target !== $('info-dialog')) return;
        const rect = $('info-dialog').getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) $('info-dialog').close();
    });
    if (!document.fullscreenEnabled) $('fullscreen-button').hidden = true;
    $('fullscreen-button').addEventListener('click', async () => {
        try {
            if (document.fullscreenElement) await document.exitFullscreen();
            else await experience.requestFullscreen();
        } catch { announce('Trình duyệt chưa cho phép toàn màn hình. Bạn vẫn có thể ẩn giao diện.'); }
    });
    document.addEventListener('fullscreenchange', () => {
        const label = document.fullscreenElement ? 'Thoát toàn màn hình' : 'Toàn màn hình';
        $('fullscreen-button').setAttribute('aria-label', label);
        $('fullscreen-button').title = label;
        resize();
    });

    function showFallback(message) {
        moments.leave();
        if (captureRequested) { captureRequested = false; moments.captureFailed(); }
        cancelAnimationFrame(frame);
        frame = 0;
        $('loading-message').hidden = true;
        $('fallback-message').hidden = false;
        if (message) $('fallback-detail').textContent = message;
        announce('Không thể hiển thị khung cảnh 3D.');
    }
    $('retry-button').addEventListener('click', () => location.reload());
    canvas.addEventListener('webglcontextlost', event => {
        event.preventDefault();
        showFallback('Kết nối đồ họa vừa bị gián đoạn. Cảnh sẽ tự mở lại khi kết nối được khôi phục, hoặc bạn có thể chọn Thử lại.');
    });
    canvas.addEventListener('webglcontextrestored', () => {
        try { initialize(); } catch (error) { console.error('Black hole restore:', error); showFallback(); }
    });
    document.addEventListener('visibilitychange', () => {
        lastTime = 0;
        if (document.hidden) { cancelAnimationFrame(frame); frame = 0; pointers.clear(); }
        else requestRender();
    });
    window.addEventListener('resize', resize);
    window.addEventListener('pagehide', () => { cancelAnimationFrame(frame); frame = 0; });
    window.addEventListener('pageshow', event => { if (event.persisted) { lastTime = 0; requestRender(); } });
    const moments = window.createBlackHoleMoments({
        canvas, hideUI, requestRender, reducedMotion,
        requestCapture() {
            if (!gl || gl.isContextLost() || !$('fallback-message').hidden) { moments.captureFailed(); return; }
            captureRequested = true;
            requestRender();
        }
    });
    try { initialize(); }
    catch (error) { console.error('Black hole initialization:', error); showFallback(); }
})();
