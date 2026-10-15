/**
 * Hero Celestial Showcase — Đài quan sát của Phúc
 * Renders an interactive 3D celestial showcase for the Hero section.
 * Supports the 8 Solar System planets starting at Earth (SOL / 03),
 * with smooth cross-fading, slow rotation, and accessible controls.
 */
(function () {
    'use strict';

    // 1. Dữ liệu cấu hình 8 thiên thể theo đúng thứ tự Hệ Mặt Trời
    const CELESTIAL_OBJECTS = [
        {
            id: 'mercury',
            index: 'SOL / 01',
            name: 'SAO THỦY',
            desc: 'Thế giới nhỏ bé và gần Mặt Trời nhất.',
            texture: 'Images/sao thủy.jpg',
            tilt: 0.001,
            speed: 0.002,
            hasRing: false,
            baseScale: 1.0
        },
        {
            id: 'venus',
            index: 'SOL / 02',
            name: 'SAO KIM',
            desc: 'Bầu khí quyển dày đặc và hiệu ứng nhà kính khắc nghiệt.',
            texture: 'Images/sao kim.jpg',
            tilt: 3.09,
            speed: -0.0016,
            hasRing: false,
            baseScale: 1.0
        },
        {
            id: 'earth',
            index: 'SOL / 03',
            name: 'TRÁI ĐẤT',
            desc: 'Ngôi nhà của mọi hành trình.',
            texture: 'Images/trái đất.jpg',
            tilt: 0.409,
            speed: 0.0028,
            hasRing: false,
            baseScale: 1.0
        },
        {
            id: 'mars',
            index: 'SOL / 04',
            name: 'SAO HỎA',
            desc: 'Một thế giới đỏ từng lưu giữ dấu vết của nước.',
            texture: 'Images/sao hỏa.jpg',
            tilt: 0.44,
            speed: 0.0026,
            hasRing: false,
            baseScale: 1.0
        },
        {
            id: 'jupiter',
            index: 'SOL / 05',
            name: 'SAO MỘC',
            desc: 'Gã khổng lồ khí với những cơn bão thế kỷ.',
            texture: 'Images/sao mộc.jpg',
            tilt: 0.055,
            speed: 0.0036,
            hasRing: false,
            baseScale: 1.0
        },
        {
            id: 'saturn',
            index: 'SOL / 06',
            name: 'SAO THỔ',
            desc: 'Tuyệt tác của hàng tỷ mảnh băng và vành đai lộng lẫy.',
            texture: 'Images/sao thổ.jpg',
            tilt: 0.467,
            speed: 0.0034,
            hasRing: true,
            ringTexture: 'Images/vành đai sao thổ.png',
            baseScale: 0.86
        },
        {
            id: 'uranus',
            index: 'SOL / 07',
            name: 'SAO THIÊN VƯƠNG',
            desc: 'Hành tinh băng giá với trục tự quay nghiêng độc đáo.',
            texture: 'Images/sao thiên vương.jpg',
            tilt: 1.706,
            speed: -0.0026,
            hasRing: false,
            baseScale: 1.0
        },
        {
            id: 'neptune',
            index: 'SOL / 08',
            name: 'SAO HẢI VƯƠNG',
            desc: 'Thế giới xa xôi nơi rìa thẳm của gió bão.',
            texture: 'Images/sao hải vương.jpg',
            tilt: 0.494,
            speed: 0.003,
            hasRing: false,
            baseScale: 1.0
        }
    ];

    // Trái Đất (SOL / 03) là thiên thể xuất phát ban đầu (index = 2)
    let currentIndex = 2;
    let isTransitioning = false;
    let transitionStartTime = 0;
    const TRANSITION_DURATION = 550; // ms

    // Animation & lifecycle states
    let animFrameId = null;
    let isHeroVisible = true;

    // Three.js instances
    let scene, camera, renderer;
    let tiltGroup, meshPrimary, meshSecondary, ringMesh, atmosphereMesh, cloudMesh;
    let textureLoader;
    const textureCache = new Map();

    // Tilt, scale & rotation lerp
    let currentTilt = CELESTIAL_OBJECTS[currentIndex].tilt;
    let targetTilt = currentTilt;
    let currentSpeed = CELESTIAL_OBJECTS[currentIndex].speed;
    let targetSpeed = currentSpeed;
    let currentBaseScale = CELESTIAL_OBJECTS[currentIndex].baseScale || 1.0;
    let targetBaseScale = currentBaseScale;
    let targetHasRing = false;
    let currentAtmosphere = 1;
    let targetAtmosphere = 1;

    // Prefers reduced motion
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /**
     * Tạo một lớp mây minh họa rất nhẹ ngay trong trình duyệt. Nó không thay thế
     * bản đồ khí tượng thật; mục đích là phá cảm giác mặt cầu nhựa/phẳng mà không
     * thêm asset hotlink hoặc một lớp hiệu ứng phô trương.
     */
    function createCloudTexture() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 256;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;

        const image = ctx.createImageData(canvas.width, canvas.height);
        const data = image.data;

        function hash(x, y) {
            const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
            return value - Math.floor(value);
        }

        function smooth(value) {
            return value * value * (3 - 2 * value);
        }

        function noise(x, y) {
            const x0 = Math.floor(x);
            const y0 = Math.floor(y);
            const tx = smooth(x - x0);
            const ty = smooth(y - y0);
            const a = hash(x0, y0);
            const b = hash(x0 + 1, y0);
            const c = hash(x0, y0 + 1);
            const d = hash(x0 + 1, y0 + 1);
            const top = a + (b - a) * tx;
            const bottom = c + (d - c) * tx;
            return top + (bottom - top) * ty;
        }

        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const u = x / canvas.width;
                const v = y / canvas.height;
                const latitude = Math.abs(v * 2 - 1);
                const warp = noise(u * 10 + 18, v * 7 + 4) - 0.5;
                let amplitude = 0.58;
                let frequency = 1;
                let value = 0;
                let total = 0;

                for (let octave = 0; octave < 4; octave++) {
                    value += noise((u * 42 + warp * 2.2) * frequency, (v * 22 + warp) * frequency) * amplitude;
                    total += amplitude;
                    amplitude *= 0.52;
                    frequency *= 2;
                }

                value /= total;
                value += Math.sin((v + warp * 0.08) * Math.PI * 9) * 0.035;
                const cloud = Math.max(0, Math.min(1, (value - 0.61) / 0.19));
                const polarFade = 1 - Math.max(0, latitude - 0.72) * 1.8;
                const alpha = Math.round(cloud * Math.max(0.35, polarFade) * 110);
                const offset = (y * canvas.width + x) * 4;
                data[offset] = 238;
                data[offset + 1] = 243;
                data[offset + 2] = 241;
                data[offset + 3] = alpha;
            }
        }

        ctx.putImageData(image, 0, 0);
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        if ('encoding' in texture && THREE.sRGBEncoding) texture.encoding = THREE.sRGBEncoding;
        return texture;
    }

    /**
     * Tạo hình học vành đai chuẩn hình xuyến (annular ring)
     * Ánh xạ tọa độ UV theo khoảng cách bán kính (radial UV mapping)
     * để dải texture 1D trải đều 360 độ quanh hành tinh, không bị đóng khung chữ nhật.
     */
    function createSaturnRingGeometry(innerRadius, outerRadius, thetaSegments, phiSegments) {
        const geo = new THREE.RingGeometry(innerRadius, outerRadius, thetaSegments, phiSegments);
        const pos = geo.attributes.position;
        const uv = geo.attributes.uv;

        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            const r = Math.sqrt(x * x + y * y);
            // Ánh xạ bán kính từ innerRadius (u=0) đến outerRadius (u=1)
            const u = Math.max(0, Math.min(1, (r - innerRadius) / (outerRadius - innerRadius)));
            uv.setXY(i, u, 0.5);
        }
        uv.needsUpdate = true;
        return geo;
    }

    /**
     * Nạp texture kèm caching để chuyển đổi hành tinh tức thì
     */
    function loadTexture(url) {
        if (!url) return Promise.resolve(null);
        if (textureCache.has(url)) {
            return Promise.resolve(textureCache.get(url));
        }
        return new Promise(function (resolve) {
            textureLoader.load(
                url,
                function (tex) {
                    tex.wrapS = THREE.ClampToEdgeWrapping;
                    tex.wrapT = THREE.ClampToEdgeWrapping;
                    if ('encoding' in tex && THREE.sRGBEncoding) tex.encoding = THREE.sRGBEncoding;
                    if (renderer?.capabilities?.getMaxAnisotropy) {
                        tex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
                    }
                    textureCache.set(url, tex);
                    resolve(tex);
                },
                undefined,
                function (err) {
                    console.warn('[HeroCelestial] Texture load fallback:', url, err);
                    resolve(null);
                }
            );
        });
    }

    /**
     * Cấu hình vật liệu theo loại bề mặt. Texture màu được dùng làm bump rất nhẹ
     * cho các thế giới đá; Trái Đất giữ độ nhám cao để tránh cảm giác nhựa bóng.
     */
    function applySurface(material, texture, planet) {
        if (!material || !planet) return;
        const bumpScaleByPlanet = {
            mercury: 0.035,
            earth: 0.014,
            mars: 0.028
        };

        material.map = texture || null;
        material.metalness = 0;
        material.roughness = planet.id === 'earth' ? 0.97 : 0.9;
        material.bumpMap = bumpScaleByPlanet[planet.id] && texture ? texture : null;
        material.bumpScale = bumpScaleByPlanet[planet.id] || 0;
        material.needsUpdate = true;
    }

    /**
     * Preload các hành tinh liền kề để trải nghiệm bấm ← → mượt mà
     */
    function preloadAdjacentTextures(index) {
        const total = CELESTIAL_OBJECTS.length;
        const prevIdx = (index - 1 + total) % total;
        const nextIdx = (index + 1) % total;
        loadTexture(CELESTIAL_OBJECTS[prevIdx].texture);
        loadTexture(CELESTIAL_OBJECTS[nextIdx].texture);
        if (CELESTIAL_OBJECTS[prevIdx].hasRing) loadTexture(CELESTIAL_OBJECTS[prevIdx].ringTexture);
        if (CELESTIAL_OBJECTS[nextIdx].hasRing) loadTexture(CELESTIAL_OBJECTS[nextIdx].ringTexture);
    }

    /**
     * Cập nhật thông tin chữ và accessibility ARIA labels
     */
    function updateLabels(planet) {
        const nameEl = document.getElementById('hero-celestial-name');
        const descEl = document.getElementById('hero-celestial-desc');
        const indexEl = document.getElementById('hero-celestial-index');
        const prevBtn = document.getElementById('hero-prev-btn');
        const nextBtn = document.getElementById('hero-next-btn');

        if (nameEl) nameEl.classList.add('celestial-text-fade');
        if (descEl) descEl.classList.add('celestial-text-fade');
        if (indexEl) indexEl.classList.add('celestial-text-fade');

        setTimeout(function () {
            if (nameEl) nameEl.textContent = planet.name;
            if (descEl) descEl.textContent = planet.desc;
            if (indexEl) indexEl.textContent = planet.index;

            if (nameEl) nameEl.classList.remove('celestial-text-fade');
            if (descEl) descEl.classList.remove('celestial-text-fade');
            if (indexEl) indexEl.classList.remove('celestial-text-fade');
        }, 220);

        const total = CELESTIAL_OBJECTS.length;
        const prevObj = CELESTIAL_OBJECTS[(currentIndex - 1 + total) % total];
        const nextObj = CELESTIAL_OBJECTS[(currentIndex + 1) % total];

        if (prevBtn) {
            prevBtn.setAttribute('aria-label', 'Hành tinh trước: ' + prevObj.name + ' (' + prevObj.index + ')');
        }
        if (nextBtn) {
            nextBtn.setAttribute('aria-label', 'Hành tinh tiếp theo: ' + nextObj.name + ' (' + nextObj.index + ')');
        }
    }

    /**
     * Chuyển đổi mượt mà giữa các hành tinh
     */
    function switchPlanet(targetIndex) {
        if (targetIndex === currentIndex && !isTransitioning) return;

        currentIndex = (targetIndex + CELESTIAL_OBJECTS.length) % CELESTIAL_OBJECTS.length;
        const targetPlanet = CELESTIAL_OBJECTS[currentIndex];

        targetTilt = targetPlanet.tilt;
        targetSpeed = prefersReducedMotion ? 0 : targetPlanet.speed;
        targetBaseScale = targetPlanet.baseScale || 1.0;
        targetHasRing = Boolean(targetPlanet.hasRing);
        targetAtmosphere = targetPlanet.id === 'earth' ? 1 : 0;

        updateLabels(targetPlanet);

        // Nạp texture và bắt đầu cross-fade 3D
        loadTexture(targetPlanet.texture).then(function (newTex) {
            if (prefersReducedMotion) {
                if (newTex) {
                    applySurface(meshPrimary.material, newTex, targetPlanet);
                }
                currentTilt = targetTilt;
                currentBaseScale = targetBaseScale;
                tiltGroup.rotation.z = currentTilt;
                tiltGroup.scale.set(currentBaseScale, currentBaseScale, currentBaseScale);
                if (ringMesh) {
                    ringMesh.visible = targetHasRing;
                    ringMesh.material.opacity = targetHasRing ? 0.95 : 0;
                }
                currentAtmosphere = targetAtmosphere;
                if (atmosphereMesh) {
                    atmosphereMesh.visible = currentAtmosphere > 0;
                    atmosphereMesh.material.uniforms.strength.value = currentAtmosphere * 0.18;
                }
                if (cloudMesh) {
                    cloudMesh.visible = currentAtmosphere > 0;
                    cloudMesh.material.opacity = currentAtmosphere * 0.38;
                }
                preloadAdjacentTextures(currentIndex);
                return;
            }

            if (newTex) {
                applySurface(meshSecondary.material, newTex, targetPlanet);
            }

            meshSecondary.material.opacity = 0;
            meshSecondary.visible = true;
            meshSecondary.rotation.y = meshPrimary.rotation.y;

            if (targetHasRing) {
                ringMesh.visible = true;
            }

            isTransitioning = true;
            transitionStartTime = performance.now();

            preloadAdjacentTextures(currentIndex);
        });
    }

    function goToNext() {
        switchPlanet(currentIndex + 1);
    }

    function goToPrev() {
        switchPlanet(currentIndex - 1);
    }

    /**
     * Khởi tạo Three.js Scene trong #hero-celestial-canvas
     */
    function initThree(container) {
        const width = container.clientWidth || 400;
        const height = container.clientHeight || 400;

        // Scene
        scene = new THREE.Scene();

        // Camera (FOV 42° ở khoảng cách z=8.8 giúp quả cầu chuẩn tỷ lệ ~60-65% và vành đai Sao Thổ thoáng đạt)
        camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 50);
        camera.position.set(0, 0, 8.8);

        // Renderer
        renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.setSize(width, height);
        renderer.setClearColor(0x000000, 0);
        if (THREE.sRGBEncoding) renderer.outputEncoding = THREE.sRGBEncoding;
        if (THREE.ACESFilmicToneMapping) {
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 0.92;
        }
        container.appendChild(renderer.domElement);

        // Ánh sáng mô phỏng Mặt Trời chiếu từ góc trên bên trái
        const sunLight = new THREE.DirectionalLight(0xfff6ea, 1.45);
        sunLight.position.set(-5.5, 3.5, 4.5);
        scene.add(sunLight);

        // Ánh sáng phản xạ vũ trụ dịu nhẹ
        const ambientLight = new THREE.AmbientLight(0x1a2634, 0.35);
        scene.add(ambientLight);

        textureLoader = new THREE.TextureLoader();

        // Nhóm trục xoay (cho phép nghiêng trục tự quay độc lập với mặt cầu)
        tiltGroup = new THREE.Group();
        tiltGroup.rotation.z = currentTilt;
        tiltGroup.rotation.x = 0.18; // góc nhìn hơi nghiêng từ trên xuống để chiêm ngưỡng trọn vẹn 3D vành đai
        tiltGroup.scale.set(currentBaseScale, currentBaseScale, currentBaseScale);
        scene.add(tiltGroup);

        // Mặt cầu hiển thị hành tinh (bán kính 2.0)
        const sphereGeo = new THREE.SphereGeometry(2.0, 64, 64);

        const matPrimary = new THREE.MeshStandardMaterial({
            roughness: 0.82,
            metalness: 0.08,
            transparent: true,
            opacity: 1.0
        });
        meshPrimary = new THREE.Mesh(sphereGeo, matPrimary);
        tiltGroup.add(meshPrimary);

        const matSecondary = new THREE.MeshStandardMaterial({
            roughness: 0.82,
            metalness: 0.08,
            transparent: true,
            opacity: 0.0
        });
        meshSecondary = new THREE.Mesh(sphereGeo, matSecondary);
        meshSecondary.visible = false;
        tiltGroup.add(meshSecondary);

        // Lớp khí quyển rất mỏng: chỉ sáng ở đường chân trời, không phủ xanh toàn bề mặt.
        const atmosphereMaterial = new THREE.ShaderMaterial({
            uniforms: {
                glowColor: { value: new THREE.Color(0xa5cfd5) },
                strength: { value: 0.18 }
            },
            vertexShader: [
                'varying vec3 vNormal;',
                'void main() {',
                '  vNormal = normalize(normalMatrix * normal);',
                '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
                '}'
            ].join('\n'),
            fragmentShader: [
                'uniform vec3 glowColor;',
                'uniform float strength;',
                'varying vec3 vNormal;',
                'void main() {',
                '  float rim = pow(max(0.0, 0.72 - dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);',
                '  gl_FragColor = vec4(glowColor, rim * strength);',
                '}'
            ].join('\n'),
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
            depthWrite: false
        });
        atmosphereMesh = new THREE.Mesh(sphereGeo, atmosphereMaterial);
        atmosphereMesh.scale.setScalar(1.026);
        tiltGroup.add(atmosphereMesh);

        const cloudTexture = createCloudTexture();
        const cloudMaterial = new THREE.MeshStandardMaterial({
            color: 0xeef1ec,
            map: cloudTexture,
            transparent: true,
            opacity: 0.38,
            roughness: 1,
            metalness: 0,
            depthWrite: false
        });
        cloudMesh = new THREE.Mesh(sphereGeo, cloudMaterial);
        cloudMesh.scale.setScalar(1.012);
        tiltGroup.add(cloudMesh);

        // Nạp vành đai Sao Thổ hình xuyến (Annular Ring) với dải texture bán kính chuẩn
        loadTexture('Images/vành đai sao thổ.png').then(function (ringTex) {
            const ringGeo = createSaturnRingGeometry(2.22, 3.65, 128, 8);
            const ringMat = new THREE.MeshBasicMaterial({
                map: ringTex,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.0,
                depthWrite: false
            });
            ringMesh = new THREE.Mesh(ringGeo, ringMat);
            ringMesh.rotation.x = Math.PI * 0.5; // Đặt song song với mặt phẳng xích đạo của hành tinh
            ringMesh.visible = false;
            tiltGroup.add(ringMesh);
        });

        // Nạp ban đầu Trái Đất (SOL / 03)
        loadTexture(CELESTIAL_OBJECTS[currentIndex].texture).then(function (tex) {
            if (tex) {
                applySurface(meshPrimary.material, tex, CELESTIAL_OBJECTS[currentIndex]);
            }
            preloadAdjacentTextures(currentIndex);
        });

        // Responsive resize observer
        if (window.ResizeObserver) {
            const ro = new ResizeObserver(function (entries) {
                for (let i = 0; i < entries.length; i++) {
                    const cr = entries[i].contentRect;
                    if (cr.width > 0 && cr.height > 0) {
                        camera.aspect = cr.width / cr.height;
                        camera.updateProjectionMatrix();
                        renderer.setSize(cr.width, cr.height);
                    }
                }
            });
            ro.observe(container);
        } else {
            window.addEventListener('resize', function () {
                const w = container.clientWidth;
                const h = container.clientHeight;
                if (w > 0 && h > 0) {
                    camera.aspect = w / h;
                    camera.updateProjectionMatrix();
                    renderer.setSize(w, h);
                }
            });
        }
    }

    /**
     * Vòng lặp render chính (chỉ chạy khi Hero nằm trong viewport)
     */
    function renderLoop(timestamp) {
        if (!isHeroVisible) {
            animFrameId = null;
            return;
        }

        // Tự quay chậm rãi quanh trục cực
        if (!prefersReducedMotion) {
            meshPrimary.rotation.y += currentSpeed;
            if (meshSecondary.visible) {
                meshSecondary.rotation.y += currentSpeed;
            }
            if (ringMesh && ringMesh.visible) {
                ringMesh.rotation.z += currentSpeed * 0.2;
            }
            if (cloudMesh && cloudMesh.visible) {
                cloudMesh.rotation.y += currentSpeed * 0.82;
            }
        }

        // Làm mượt độ nghiêng trục tự quay
        currentTilt += (targetTilt - currentTilt) * 0.07;
        tiltGroup.rotation.z = currentTilt;

        // Làm mượt tỷ lệ hiển thị cơ bản (normalize scale giữa các hành tinh)
        currentBaseScale += (targetBaseScale - currentBaseScale) * 0.07;

        // Làm mượt tốc độ quay
        currentSpeed += (targetSpeed - currentSpeed) * 0.05;

        // Khí quyển chỉ xuất hiện ở Trái Đất và được chuyển mượt khi đổi thiên thể.
        currentAtmosphere += (targetAtmosphere - currentAtmosphere) * 0.08;
        if (atmosphereMesh) {
            atmosphereMesh.visible = currentAtmosphere > 0.01;
            atmosphereMesh.material.uniforms.strength.value = currentAtmosphere * 0.18;
        }
        if (cloudMesh) {
            cloudMesh.visible = currentAtmosphere > 0.01;
            cloudMesh.material.opacity = currentAtmosphere * 0.38;
        }

        // Xử lý hiệu ứng cross-fade giữa 2 hành tinh
        if (isTransitioning) {
            const elapsed = timestamp - transitionStartTime;
            const t = Math.min(elapsed / TRANSITION_DURATION, 1);
            // Ease in-out cubic
            const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

            meshPrimary.material.opacity = 1 - ease;
            meshSecondary.material.opacity = ease;

            // Nhịp thở nhẹ nhàng của thiên thể khi chuyển đổi
            const pulse = 1.0 - Math.sin(ease * Math.PI) * 0.035;
            const finalScale = currentBaseScale * pulse;
            tiltGroup.scale.set(finalScale, finalScale, finalScale);

            // Chuyển mờ vành đai Sao Thổ
            if (ringMesh) {
                if (targetHasRing) {
                    ringMesh.material.opacity = ease * 0.95;
                } else if (ringMesh.visible) {
                    ringMesh.material.opacity = (1 - ease) * 0.95;
                }
            }

            if (t >= 1) {
                // Hoàn tất transition: hoán đổi meshPrimary & meshSecondary
                const tempMesh = meshPrimary;
                meshPrimary = meshSecondary;
                meshSecondary = tempMesh;

                meshSecondary.visible = false;
                meshSecondary.material.opacity = 0;
                meshPrimary.material.opacity = 1;
                tiltGroup.scale.set(currentBaseScale, currentBaseScale, currentBaseScale);

                if (ringMesh && !targetHasRing) {
                    ringMesh.visible = false;
                    ringMesh.material.opacity = 0;
                }

                isTransitioning = false;
            }
        } else {
            tiltGroup.scale.set(currentBaseScale, currentBaseScale, currentBaseScale);
        }

        renderer.render(scene, camera);
        animFrameId = requestAnimationFrame(renderLoop);
    }

    function startAnimation() {
        if (!animFrameId && isHeroVisible) {
            animFrameId = requestAnimationFrame(renderLoop);
        }
    }

    /**
     * Gắn các bộ lắng nghe sự kiện
     */
    function setupInteractions() {
        const prevBtn = document.getElementById('hero-prev-btn');
        const nextBtn = document.getElementById('hero-next-btn');
        const heroWorld = document.querySelector('.hero-world');

        if (prevBtn) {
            prevBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                goToPrev();
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                goToNext();
            });
        }

        // Bàn phím: CHỈ bắt phím ArrowLeft / ArrowRight khi người dùng đang focus vùng Hero
        if (heroWorld) {
            heroWorld.addEventListener('keydown', function (e) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    goToPrev();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    goToNext();
                }
            });

        }

        // IntersectionObserver: Dừng hoàn toàn vòng lặp Three.js khi Hero cuộn ra khỏi màn hình
        const heroSection = document.querySelector('.new-hero-section') || heroWorld;
        if (heroSection && window.IntersectionObserver) {
            const observer = new IntersectionObserver(function (entries) {
                isHeroVisible = entries[0].isIntersecting;
                if (isHeroVisible) {
                    startAnimation();
                }
            }, { threshold: 0.05 });
            observer.observe(heroSection);
        }

        // Trái Đất là điểm khởi đầu cố định. Người xem chủ động đổi thiên thể.
    }

    /**
     * Điểm khởi chạy mô-đun
     */
    function init() {
        const container = document.getElementById('hero-celestial-canvas');
        if (!container || typeof THREE === 'undefined') {
            return;
        }

        initThree(container);
        setupInteractions();
        startAnimation();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
