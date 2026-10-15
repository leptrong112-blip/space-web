// ==========================================
// 1. DỮ LIỆU ĐÃ ĐƯỢC GOM GỌN (CHỐT SỔ)
// ==========================================
const celestialData = {
    mercury: { 
        title: 'Sao Thủy', img: 'Images/sao thủy.jpg', 
        desc: 'Hành tinh nhỏ nhất và gần Mặt Trời nhất.', 
        type: 'Hành tinh đất đá', size: '4.880 km', dist: '58 triệu km', 
        fun: 'Một ngày trên Sao Thủy dài bằng 176 ngày trên Trái Đất!',
        comp: ['Lõi sắt kim loại khổng lồ chiếm 85% bán kính', 'Lớp phủ manti bằng silicate dày ~400 km', 'Vỏ ngoài mỏng, hầu như không có khí quyển thực thụ']
    },
    venus: { 
        title: 'Sao Kim', img: 'Images/sao kim.jpg', 
        desc: 'Hành tinh nóng nhất Hệ Mặt Trời.', 
        type: 'Hành tinh đất đá', size: '12.104 km', dist: '108 triệu km', 
        fun: 'Sao Kim quay ngược chiều kim đồng hồ, Mặt Trời mọc ở đằng Tây.',
        comp: ['Khí quyển siêu đặc: 96.5% CO2 và mây axit sulfuric', 'Lớp vỏ đá bazơ basalt núi lửa dày 20-50 km', 'Lớp phủ silicate và lõi sắt-nikel tương tự Trái Đất']
    },
    earth: { 
        title: 'Trái Đất', img: 'Images/trái đất.jpg', 
        desc: 'Ngôi nhà xanh của chúng ta.', 
        type: 'Hành tinh đất đá', size: '12.742 km', dist: '150 triệu km', 
        fun: 'Đây là hành tinh duy nhất không được đặt tên theo thần thoại.',
        comp: ['Khí quyển bảo vệ: 78% Nitơ, 21% Oxy, 1% Argon và hơi nước', 'Lớp vỏ đá & lớp phủ manti giàu khoáng vật silicate', 'Lõi ngoài sắt lỏng sinh từ trường bảo vệ sự sống, lõi trong kim loại đặc']
    },
    mars: { 
        title: 'Sao Hỏa', img: 'Images/sao hỏa.jpg', 
        desc: 'Hành tinh Đỏ mang nhiều bí ẩn.', 
        type: 'Hành tinh đất đá', size: '6.779 km', dist: '227 triệu km', 
        fun: 'Sở hữu ngọn núi lửa Olympus Mons cao gấp 3 lần đỉnh Everest.',
        comp: ['Bề mặt phủ oxit sắt (bụi rỉ sét) tạo màu đỏ đặc trưng', 'Khí quyển mỏng: 95% Carbon dioxide, 2.6% Nitơ', 'Lớp vỏ basalt dày 50 km, hai cực có chỏm băng vĩnh cửu']
    },
    jupiter: { 
        title: 'Sao Mộc', img: 'Images/sao mộc.jpg', 
        desc: 'Gã khổng lồ khí bảo vệ Hệ Mặt Trời.', 
        type: 'Hành tinh khí', size: '139.820 km', dist: '778 triệu km', 
        fun: 'Cơn bão "Vết Đỏ Lớn" đủ kích thước để nuốt trọn cả Trái Đất.',
        comp: ['Khí quyển ngoài: 90% Hydro, 10% Heli, vết mêtan và amoniac', 'Tầng sâu: đại dương Hydro kim loại lỏng chịu áp suất cực cao', 'Lõi trung tâm dày đặc bằng đá và kim loại nặng']
    },
    saturn: { 
        title: 'Sao Thổ', img: 'Images/sao thổ.jpg', 
        desc: 'Tuyệt tác với hệ thống vành đai lộng lẫy.', 
        type: 'Hành tinh khí', size: '116.460 km', dist: '1.4 tỷ km', 
        fun: 'Mật độ của Sao Thổ nhẹ đến mức nó có thể nổi trên mặt nước!',
        comp: ['Khí quyển: 96% Hydro, 3% Heli, mây amoniac trên cao', 'Vành đai: 99% hạt băng nước tinh khiết từ hạt bụi đến tảng đá lớn', 'Lõi đá và hợp kim sắt bao bọc bởi hydro kim loại lỏng']
    },
    uranus: { 
        title: 'Sao Thiên Vương', img: 'Images/sao thiên vương.jpg', 
        desc: 'Hành tinh băng giá màu xanh lam.', 
        type: 'Hành tinh băng', size: '50.724 km', dist: '2.9 tỷ km', 
        fun: 'Trục bị nghiêng 98 độ khiến nó lăn tròn trên quỹ đạo.',
        comp: ['Lõi đá silicate cỡ Trái Đất', 'Lớp phủ băng amoniac, nước, mêtan siêu nén', 'Khí quyển ngoài cùng hydro, heli và mêtan (tạo màu xanh lam)'] 
    },
    neptune: { 
        title: 'Sao Hải Vương', img: 'Images/sao hải vương.jpg', 
        desc: 'Hành tinh xa xôi chìm trong bão tố.', 
        type: 'Hành tinh băng', size: '49.244 km', dist: '4.5 tỷ km', 
        fun: 'Gió trên đây đạt tốc độ 2.000 km/h, nhanh hơn cả âm thanh.',
        comp: ['Lõi đá silicate và kim loại nóng xấp xỉ khối lượng Trái Đất', 'Lớp phủ chất lỏng siêu đặc gồm nước, amoniac và băng metan', 'Khí quyển trên cao chứa 80% Hydro, 19% Heli và 1.5% Mêtan']
    },
    sun: { 
        title: 'Mặt Trời', img: 'Images/mặt trời.jpg', 
        desc: 'Ngôi sao trung tâm của chúng ta.', 
        type: 'Sao lùn vàng', size: '1.39 triệu km', dist: '0 km', 
        fun: 'Nó chiếm tới 99,86% tổng khối lượng của toàn bộ Hệ Mặt Trời.',
        comp: ['Lõi nhiệt hạch: 15 triệu °C, biến 600 triệu tấn Hydro thành Heli mỗi giây', 'Vùng bức xạ & đối lưu vận chuyển năng lượng ra bề mặt', 'Quang cầu: 73% Hydro, 25% Heli và 2% nguyên tố nặng (Oxy, Carbon, Sắt)']
    },
    moon: { 
        title: 'Mặt Trăng', img: 'Images/mặt trăng.jpg', 
        desc: 'Vệ tinh tự nhiên của Trái Đất.', 
        type: 'Vệ tinh tự nhiên', size: '3.474 km', dist: '384.400 km', 
        fun: 'Do khóa thủy triều, Mặt Trăng chỉ quay đúng một mặt về phía chúng ta.',
        comp: ['Bề mặt phủ lớp đất đá vụn regolith giàu silicate', 'Lớp vỏ anorthosite và basalt xốp do dung nham nguội cổ đại', 'Lớp manti giàu olivine/pyroxene và lõi kim loại sắt nhỏ (~20% bán kính)']
    },
    exoplanet: { title: 'Ngoại Hành Tinh', img: 'Images/Kepler-22b.jpg', desc: 'Hành tinh nằm ngoài Hệ Mặt Trời.', type: 'Đa dạng', size: 'Vô số kích cỡ', dist: 'Nhiều năm ánh sáng', fun: 'Kepler-22b là một ngoại hành tinh nằm trong vùng có thể sống được.' },
    galaxy: { title: 'Thiên Hà Xoắn Ốc', img: 'Images/galaxy.jpg', desc: 'Cấu trúc chứa hàng tỷ ngôi sao.', type: 'Thiên hà', size: '100.000 năm ánh sáng', dist: 'Khắp vũ trụ', fun: 'Dải Ngân Hà của chúng ta cũng chính là một thiên hà xoắn ốc khổng lồ!' },
    blackhole: { title: 'Lỗ Đen', img: 'Images/lỗ đen vũ trụ.jpg', desc: 'Vùng có lực hấp dẫn cắn nuốt ánh sáng.', type: 'Điểm kỳ dị', size: 'Vô hạn', dist: 'Khắp vũ trụ', fun: 'Nếu rơi vào lỗ đen, cơ thể bạn sẽ bị kéo dãn ra như một sợi mì Ý!' },
    orion: { title: 'Tinh Vân Lạp Hộ (Orion)', img: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80', desc: 'Nằm cách Trái Đất khoảng 1.344 năm ánh sáng. Một "vườn ươm sao" khổng lồ.', type: 'Tinh vân phát xạ', size: '24 năm ánh sáng', dist: '1.344 năm ánh sáng', fun: 'Nó sáng đến mức bạn có thể nhìn thấy nó bằng mắt thường trên bầu trời đêm.' },
    crab: { title: 'Tinh Vân Cua (Crab Nebula)', img: 'https://upload.wikimedia.org/wikipedia/commons/0/00/Crab_Nebula.jpg', desc: 'Tàn tích của một vụ nổ siêu tân tinh (Supernova) được ghi nhận vào năm 1054.', type: 'Tàn tích siêu tân tinh', size: '11 năm ánh sáng', dist: '6.500 năm ánh sáng', fun: 'Ở trung tâm của nó là một sao xung đang quay với tốc độ 30 vòng/giây.' },
    helix: { title: 'Tinh Vân Helix (Mắt Chúa)', img: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/NGC7293_%282004%29.jpg', desc: 'Được mệnh danh là "Con mắt của Chúa". Đây là một tinh vân hành tinh.', type: 'Tinh vân hành tinh', size: '2.5 năm ánh sáng', dist: '650 năm ánh sáng', fun: 'Đây chính là hình ảnh tương lai của Mặt Trời khi nó chết đi sau 5 tỷ năm nữa.' },
    pillars: { title: 'Cột Trụ Sáng Tạo', img: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg', desc: 'Những ngón tay khí bụi khổng lồ vươn dài hàng năm ánh sáng.', type: 'Vùng hình thành sao', size: '4-5 năm ánh sáng', dist: '7.000 năm ánh sáng', fun: 'Có thể các cột trụ này đã bị phá hủy từ ngàn năm trước, nhưng ánh sáng chưa kịp truyền tới Trái Đất.' },
    carina: { title: 'Tinh Vân Thuyền Để (Carina)', img: 'Images/tinh vân thuyền đế (Carina Nebula).png', desc: 'Bức tường núi lửa vũ trụ chứa những ngôi sao khổng lồ nhất dải Ngân Hà.', type: 'Tinh vân phát xạ', size: '460 năm ánh sáng', dist: '8.500 năm ánh sáng', fun: 'Nó chứa Eta Carinae - quả bom nổ chậm khổng lồ sắp biến thành siêu tân tinh.' },
    butterfly: { title: 'Tinh Vân Hồ Điệp (NGC 6302)', img: 'Images/Tinh vân Hồ Điệp (NGC 6302).jpg', desc: 'Đôi cánh bướm rực rỡ dệt bằng khí sôi sục.', type: 'Tinh vân hành tinh', size: '3 năm ánh sáng', dist: '3.400 năm ánh sáng', fun: 'Đôi cánh tuyệt đẹp đó thực chất là dòng khí 20.000 độ C bắn ra với tốc độ 960.000 km/h.' }
};

// ==========================================
// 2. HIỆU ỨNG PARALLAX
// ==========================================
// Clarify the difference between the event horizon and a mathematical singularity.
Object.assign(celestialData.blackhole, {
    desc: 'Một vùng không thời gian có chân trời sự kiện: ranh giới mà từ phía trong, ngay cả ánh sáng cũng không thể thoát ra.',
    type: 'Hố đen', size: 'Tùy khối lượng và độ quay', dist: 'Tùy hố đen được quan sát',
});

window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('.section, header').forEach(section => {
        if (window.pageYOffset >= section.offsetTop - 150) current = section.getAttribute('id');
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if (current && a.getAttribute('href').includes(current)) a.classList.add('active');
    });
});

// ==========================================
// 3. THREE.JS - SA BÀN 3D
// ==========================================
const container3D = document.getElementById('threejs-container');
let targetPlanet = null; 
let galaxyMesh = null; 

if (container3D && typeof THREE !== 'undefined') {
    container3D.innerHTML = '';

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); 

    const camera = new THREE.PerspectiveCamera(60, container3D.clientWidth / container3D.clientHeight, 0.1, 30000);
    camera.position.set(0, 50, 90);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container3D.clientWidth, container3D.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ReinhardToneMapping; 
    renderer.toneMappingExposure = 0.9;
    container3D.appendChild(renderer.domElement);

    const renderScene = new THREE.RenderPass(scene, camera);
    const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.2, 0.3, 0.2);
    bloomPass.strength = 1.2; 
    bloomPass.radius = 1.0;   
    bloomPass.threshold = 0.2;

    const composer = new THREE.EffectComposer(renderer);
    composer.addPass(renderScene);
    composer.addPass(bloomPass);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 5000; 
    controls.minDistance = 1;

    let isUserInteracting = false;
    controls.addEventListener('start', () => { isUserInteracting = true; });

    window.startJourney = function() {
        const intro = document.getElementById('cinematic-intro');
        if (intro) {
            intro.style.opacity = '0'; 
            setTimeout(() => { 
                intro.style.display = 'none'; 
                document.getElementById('trang-chu')?.scrollIntoView({ behavior: 'smooth' });
            }, 1500);
        }
    };

    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = 'Anonymous';

    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1.5, transparent: true, opacity: 0.9, sizeAttenuation: true });
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
        const radius = 1000; 
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = radius * (0.3 + Math.random() * 0.7); 
        starVertices.push(r * Math.sin(phi) * Math.cos(theta), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta));
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));
    const starfield = new THREE.Points(starGeometry, starMaterial);
    scene.add(starfield);

    const shootingStars = [];
    for (let i = 0; i < 4; i++) {
        const ssGeo = new THREE.CylinderGeometry(0, 0.15, 12, 8);
        ssGeo.rotateX(Math.PI / 2); 
        const ssMat = new THREE.MeshBasicMaterial({ color: 0x7fe7ff, transparent: true, opacity: 0.95 });
        const ss = new THREE.Mesh(ssGeo, ssMat);
        ss.position.set((Math.random() - 0.5) * 240, (Math.random() - 0.5) * 120, -120 - Math.random() * 120);
        ss.userData = { speed: Math.random() * 2 + 1 }; 
        ss.scale.y = 1.5; 
        scene.add(ss);
        shootingStars.push(ss);
    }

    scene.add(new THREE.AmbientLight(0xffffff, 0.15)); 
    const pointLight = new THREE.PointLight(0xffeedd, 1.3, 800);
    pointLight.castShadow = true;
    pointLight.shadow.mapSize.width = 2048;
    pointLight.shadow.mapSize.height = 2048;
    scene.add(pointLight);

    const sunTextureLink = 'Images/mặt trời.jpg';
    const sunGeo = new THREE.SphereGeometry(6, 64, 64);
    const sunMat = new THREE.MeshBasicMaterial({ map: textureLoader.load(sunTextureLink), color: 0xffffff });
    const sun = new THREE.Mesh(sunGeo, sunMat);
    sun.userData = { id: 'sun', radius: 6 }; 
    scene.add(sun);
    
    const sunLabelDiv = document.createElement('div');
    sunLabelDiv.className = 'planet-label'; 
    sunLabelDiv.innerHTML = `<div class="label-box"><span class="label-id">Ngôi sao</span><span class="label-name">Mặt Trời</span></div><div class="label-line"></div>`;
    sunLabelDiv.addEventListener('click', (event) => { window.flyToPlanet('sun'); event.stopPropagation(); });
    const sunLabel = new THREE.CSS2DObject(sunLabelDiv);
    sunLabel.position.set(0, 8, 0); 
    sun.add(sunLabel); 

    const galaxyGeo = new THREE.SphereGeometry(20000, 64, 64); 
    const galaxyMat = new THREE.MeshBasicMaterial({ 
        map: textureLoader.load('Images/starfield bầu trời (story).jpg'),
        side: THREE.BackSide,
        transparent: true, 
        opacity: 0, 
        depthWrite: false, 
        color: 0xffffff 
    });
    
    galaxyMesh = new THREE.Mesh(galaxyGeo, galaxyMat);
    galaxyMesh.rotation.z = Math.PI / 2; 
    scene.add(galaxyMesh);

    const planetsData3D = [
        { id: 'mercury', name: 'Sao Thủy', radius: 0.6, distance: 14, speed: 0.04, color: 0xffffff, img: 'Images/sao thủy.jpg' },
        { id: 'venus', name: 'Sao Kim', radius: 0.9, distance: 20, speed: 0.015, color: 0xffffff, img: 'Images/sao kim.jpg' },
        { id: 'earth', name: 'Trái Đất', radius: 1.2, distance: 28, speed: 0.01, color: 0xffffff, img: 'Images/trái đất.jpg' },
        { id: 'mars', name: 'Sao Hỏa', radius: 0.7, distance: 36, speed: 0.008, color: 0xffffff, img: 'Images/sao hỏa.jpg' },
        { id: 'jupiter', name: 'Sao Mộc', radius: 2.8, distance: 50, speed: 0.002, color: 0xffffff, img: 'Images/sao mộc.jpg' },
        { id: 'saturn', name: 'Sao Thổ', radius: 2.3, distance: 68, speed: 0.001, color: 0xffffff, img: 'Images/sao thổ.jpg', hasRing: true },
        { id: 'uranus', name: 'Sao Thiên Vương', radius: 1.6, distance: 85, speed: 0.0007, color: 0xffffff, img: 'Images/sao thiên vương.jpg', hasRing: true }, 
        { id: 'neptune', name: 'Sao Hải Vương', radius: 1.5, distance: 100, speed: 0.0004, color: 0xffffff, img: 'Images/sao hải vương.jpg' }
    ];

    const planets = [];
    let earthMoon = null;

    planetsData3D.forEach(p => {
        const curve = new THREE.EllipseCurve(0, 0, p.distance, p.distance, 0, Math.PI * 2, false, 0);
        const points = curve.getPoints(128);
        const orbitGeo = new THREE.BufferGeometry().setFromPoints(points.map(pt => new THREE.Vector3(pt.x, 0, pt.y)));
        const orbitMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 });
        const orbit = new THREE.Line(orbitGeo, orbitMat);
        scene.add(orbit);

        const geo = new THREE.SphereGeometry(p.radius, 64, 64);
        const mat = new THREE.MeshStandardMaterial({ color: p.color, map: p.img ? textureLoader.load(p.img) : null, roughness: 0.8, metalness: 0.1 });
        const mesh = new THREE.Mesh(geo, mat);
        mesh.castShadow = true; mesh.receiveShadow = true;
        mesh.userData = { id: p.id, name: p.name, radius: p.radius };

        const pivot = new THREE.Object3D();
        pivot.add(mesh);
        scene.add(pivot);
        pivot.rotation.y = planets.length * 2.39996;
        mesh.position.x = p.distance;

        let moonPivot = null;
        if (p.id === 'earth') {
            const moonGeo = new THREE.SphereGeometry(0.25, 32, 32); 
            const moonMat = new THREE.MeshStandardMaterial({ color: 0xffffff, map: textureLoader.load('Images/mặt trăng.jpg'), roughness: 0.9 });
            const moonMesh = new THREE.Mesh(moonGeo, moonMat);
            earthMoon = moonMesh;
            moonMesh.castShadow = true; moonMesh.receiveShadow = true;
            moonMesh.userData = { id: 'moon', radius: 0.25 };

            moonPivot = new THREE.Object3D();
            moonPivot.add(moonMesh);
            moonMesh.position.x = 2.2; 
            mesh.add(moonPivot); 
            
            const moonLabelDiv = document.createElement('div');
            moonLabelDiv.className = 'planet-label'; 
            moonLabelDiv.innerHTML = `<div class="label-box"><span class="label-id">vệ tinh</span><span class="label-name">Mặt Trăng</span></div><div class="label-line"></div>`;
            moonLabelDiv.addEventListener('click', (event) => { window.flyToPlanet('moon', moonMesh); event.stopPropagation(); });
            const moonLabel = new THREE.CSS2DObject(moonLabelDiv);
            moonLabel.position.set(0, 0.6, 0); 
            moonMesh.add(moonLabel); 
        }

        if (p.hasRing) {
            const ringTexture = textureLoader.load('Images/vành đai sao thổ v2.png');
            const ringGeo = new THREE.RingGeometry(p.radius + 1.2, p.radius + 4.1, 128);
            const ringMat = new THREE.MeshBasicMaterial({ map: ringTexture, side: THREE.DoubleSide, transparent: true, opacity: 0.8, depthWrite: false });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = Math.PI / 2.15; ring.rotation.y = 0.15; ring.position.z = 0.03;
            ring.castShadow = false; ring.receiveShadow = false;
            mesh.add(ring);
        }
        
        const planetLabelDiv = document.createElement('div');
        planetLabelDiv.className = 'planet-label'; 
        planetLabelDiv.innerHTML = `<div class="label-box"><span class="label-id">${p.id}</span><span class="label-name">${p.name}</span></div><div class="label-line"></div>`;
        planetLabelDiv.addEventListener('click', (event) => { window.flyToPlanet(p.id); event.stopPropagation(); });

        const planetLabel = new THREE.CSS2DObject(planetLabelDiv);
        planetLabel.position.set(0, p.radius + 2, 0); 
        mesh.add(planetLabel); 

        planets.push({ pivot, mesh, speed: p.speed, moonPivot: moonPivot });
    });

    const labelRenderer = new THREE.CSS2DRenderer();
    labelRenderer.setSize(container3D.clientWidth, container3D.clientHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none'; 
    container3D.appendChild(labelRenderer.domElement);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const solarState = { paused: matchMedia('(prefers-reduced-motion: reduce)').matches, speed: 1, orbits: true, galaxy: false };
    const solarClock = new THREE.Clock();
    let solarVisible = true;
    new IntersectionObserver(entries => { solarVisible = entries[0].isIntersecting; }, { rootMargin: '150px' }).observe(container3D);
    const pauseButton = document.getElementById('solar-pause');
    const refreshPause = () => {
        pauseButton.textContent = solarState.paused ? '▶ Tiếp tục thời gian' : 'Ⅱ Dừng thời gian';
        pauseButton.setAttribute('aria-pressed', String(solarState.paused));
    };
    pauseButton.addEventListener('click', () => { solarState.paused = !solarState.paused; refreshPause(); });
    refreshPause();
    document.getElementById('solar-speed').addEventListener('input', event => {
        solarState.speed = Number(event.target.value);
        document.getElementById('solar-speed-value').textContent = `${solarState.speed.toLocaleString('vi-VN')}×`;
    });
    document.getElementById('solar-labels').addEventListener('click', event => {
        const hidden = container3D.classList.toggle('labels-off');
        event.currentTarget.setAttribute('aria-pressed', String(!hidden));
    });
    document.getElementById('solar-orbits').addEventListener('click', event => {
        solarState.orbits = !solarState.orbits;
        event.currentTarget.setAttribute('aria-pressed', String(solarState.orbits));
    });
    document.getElementById('solar-reset').addEventListener('click', () => window.closeObserverMode());
    const galaxyBtn = document.getElementById('solar-galaxy');
    if (galaxyBtn) {
        galaxyBtn.addEventListener('click', () => {
            window.zoomToGalaxy();
            if (observerHud) observerHud.classList.remove('active-hud');
            if (scanLayer) scanLayer.classList.remove('active-scan');
        });
    }

    window.resetCamera = function () {
        targetPlanet = null;
        solarState.galaxy = false;
        isUserInteracting = false;
        document.dispatchEvent(new Event('solar-reset'));
        const infoPanel = document.getElementById('info-panel-3d');
        if (infoPanel) infoPanel.classList.add('hidden');
    };

    window.zoomToGalaxy = function () {
        targetPlanet = null;
        solarState.galaxy = true;
        isUserInteracting = false;
        camera.position.lerp(new THREE.Vector3(0, 2000, 3000), 0.1);
        controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.1);
    };

    window.flyToPlanet = function(id, manualMesh = null) {
        if (!celestialData[id]) return;
        solarState.galaxy = false;
        const viewport = container3D.getBoundingClientRect();
        if (viewport.top < 0 || viewport.bottom > window.innerHeight) container3D.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
        
        if(id === 'sun') { targetPlanet = sun; }
        else if (id === 'moon') { targetPlanet = manualMesh || earthMoon; }
        else {
            const p = planets.find(item => item.mesh.userData.id === id);
            if (p) targetPlanet = p.mesh;
        }
        
        if (typeof window.showObserverHUD === 'function') {
            window.showObserverHUD(id);
        }
        
        isUserInteracting = false;
        document.dispatchEvent(new CustomEvent('planet-selected', { detail: id }));
    };

    let pointerStart = null;
    renderer.domElement.addEventListener('pointerdown', event => { pointerStart = { x: event.clientX, y: event.clientY }; });
    renderer.domElement.addEventListener('click', (event) => {
        if (pointerStart && Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 6) return;
        const rect = renderer.domElement.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects([sun, ...planets.map(p => p.mesh), earthMoon], false);
        
        if (intersects.length) {
            window.flyToPlanet(intersects[0].object.userData.id, intersects[0].object);
        } else {
            window.resetCamera();
            if (typeof window.closeObserverMode === 'function') window.closeObserverMode();
        }
    });

    let time = 0;
    const lerpTargetPos = new THREE.Vector3();

    function animate() {
        requestAnimationFrame(animate);
        const frame = Math.min(solarClock.getDelta(), 0.05) * 60;
        if (document.hidden || !solarVisible) return;
        const step = solarState.paused ? 0 : frame * solarState.speed;
        time += 0.01 * step;

        sun.rotation.y += 0.002 * step;
        
        planets.forEach(p => {
            p.pivot.rotation.y += p.speed * step;
            p.mesh.rotation.y += 0.01 * step;
            if (p.moonPivot) p.moonPivot.rotation.y += 0.04 * step;
        });

        const camPos = camera.position;
        const cameraDistance = Math.sqrt(camPos.x * camPos.x + camPos.y * camPos.y + camPos.z * camPos.z);
        
        const orbitFadeStart = 600; 
        const orbitFadeEnd = 1500;  
        let orbitOpacity = 0.15; 
        
        if (cameraDistance > orbitFadeStart) {
            const factor = 1 - (cameraDistance - orbitFadeStart) / (orbitFadeEnd - orbitFadeStart);
            orbitOpacity = Math.max(0, 0.15 * factor);
        }

        scene.traverse((object) => {
            if (object.isLine && object.material) {
                object.material.transparent = true;
                object.material.opacity = solarState.orbits ? orbitOpacity : 0;
            }
        });

        const galaxyFadeStart = 800;  
        const galaxyFadeEnd = 3000;   
        let galaxyOpacity = 0; 
        
        if (cameraDistance > galaxyFadeStart) {
            const factor = (cameraDistance - galaxyFadeStart) / (galaxyFadeEnd - galaxyFadeStart);
            galaxyOpacity = Math.min(0.8, 0.8 * factor); 
        }
        
        if (galaxyMesh && galaxyMesh.material) {
            galaxyMesh.material.opacity = galaxyOpacity;
            galaxyMesh.rotation.y -= 0.00005 * step;
        }
        
        starfield.rotation.y += 0.00015 * step;
        starfield.rotation.x += 0.00004 * step;

        shootingStars.forEach(ss => {
            ss.position.x += ss.userData.speed * step;
            ss.position.y -= ss.userData.speed * 0.5 * step;
            if (ss.position.x > 220 || ss.position.y < -120) {
                ss.position.set(-220, 100 + Math.random() * 60, -120 - Math.random() * 120);
            }
        });

        if (targetPlanet) {
            const planetWorldPos = new THREE.Vector3();
            targetPlanet.getWorldPosition(planetWorldPos);

            if (!isUserInteracting) {
                const radius = targetPlanet.userData.radius || 2; 
                const offsetDist = radius * 6 + 3;
                
                lerpTargetPos.set(planetWorldPos.x + offsetDist, planetWorldPos.y + offsetDist * 0.5, planetWorldPos.z + offsetDist);
                camera.position.lerp(lerpTargetPos, 0.18);
                controls.target.lerp(planetWorldPos, 0.18);
            } else {
                const delta = new THREE.Vector3().subVectors(planetWorldPos, controls.target);
                controls.target.copy(planetWorldPos);
                camera.position.add(delta);
            }
        } else {
            if (solarState.galaxy && !isUserInteracting) {
                camera.position.lerp(new THREE.Vector3(0, 2000, 3000), 0.04);
                controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.04);
            } else if (!isUserInteracting) {
                const idleX = Math.sin(time * 0.1) * 110;
                const idleZ = Math.cos(time * 0.1) * 110;
                const idleY = 45 + Math.sin(time * 0.05) * 5;
                camera.position.lerp(new THREE.Vector3(idleX, idleY, idleZ), 0.015);
                controls.target.lerp(new THREE.Vector3(0, 0, 0), 0.02);
            }
        }

        controls.update();
        labelRenderer.render(scene, camera);
        composer.render();
    }

    animate();
    window.solarReady = true;

    window.addEventListener('resize', () => {
        camera.aspect = container3D.clientWidth / container3D.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container3D.clientWidth, container3D.clientHeight);
        composer.setSize(container3D.clientWidth, container3D.clientHeight);
        labelRenderer.setSize(container3D.clientWidth, container3D.clientHeight);
    });
}

// ==========================================
// 4. LOGIC CHO AI CHATBOT
// ==========================================
function toggleChat() {
    const chatWindow = document.getElementById('ai-chat-window');
    chatWindow.classList.toggle('hidden-chat');
}

function handleEnter(event) {
    if (event.key === 'Enter') sendMessage();
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const question = input.value.trim();
    if (!question) return;
    appendMessage(question, 'user-msg');
    input.value = '';
    const normalize = text => text.toLocaleLowerCase('vi').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd');
    const query = normalize(question);
    const entry = Object.values(celestialData).find(item => query.includes(normalize(item.title.split(' (')[0])));
    let answer = entry ? `${entry.title}: ${entry.desc} ${entry.fun}` : 'Sổ tay của mình chưa có mục đó. Bạn thử tên một hành tinh, “hố đen” hoặc “ánh sáng” nhé. Mình không phải AI trả lời tự do, nên chỉ chia sẻ nội dung đã có trong sổ tay.';
    if (query.includes('anh sang')) answer = 'Ánh sáng từ Mặt Trời mất khoảng 8 phút 19 giây để đi 1 AU. Bạn có thể kéo thanh khoảng cách ở mục Ánh sáng để khám phá thêm.';
    if (query.includes('ho den')) answer = celestialData.blackhole.desc + ' ' + celestialData.blackhole.fun;
    if (query.includes('chao')) answer = 'Chào bạn! Hôm nay mình cùng ngắm thế giới nào: Trái Đất, Sao Thổ hay một tinh vân?';
    appendMessage(answer, 'bot-msg');
}

function appendMessage(text, className, id = null) {
    const chatBody = document.getElementById('chat-body');
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${className}`;
    if (id) msgDiv.id = id;
    msgDiv.innerText = text;
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
}

// ==========================================
// 5. HỆ THỐNG GIAO DIỆN OBSERVER HUD & SCAN
// ==========================================
const observerHud = document.getElementById('observer-hud');
const scanLayer = document.getElementById('scan-layer');
const btnScan = document.getElementById('btn-scan');

window.showObserverHUD = function(id) {
    const data = celestialData[id];
    if(data && observerHud) {
        document.getElementById('hud-planet-name').innerText = data.title || 'UNKNOWN';
        document.getElementById('hud-type').innerText = data.type || '...';
        document.getElementById('hud-size').innerText = data.size || '...';
        document.getElementById('hud-dist').innerText = data.dist || '...';
        document.getElementById('hud-desc').innerText = data.desc || '';
        
        const scanUl = document.getElementById('scan-details');
        scanUl.innerHTML = ''; 
        if(data.comp && data.comp.length > 0) {
            data.comp.forEach(item => { scanUl.innerHTML += `<li>${item}</li>`; });
            btnScan.style.display = 'inline-block'; 
        } else {
            scanUl.innerHTML = '<li style="color: #ff3366;">Dữ liệu cấu trúc đang được mã hóa...</li>';
            btnScan.style.display = 'none'; 
        }
        scanLayer.classList.remove('active-scan');
        observerHud.classList.add('active-hud');
    }
};

window.closeObserverMode = function() {
    if (observerHud) observerHud.classList.remove('active-hud');
    if (typeof window.resetCamera === 'function') window.resetCamera();
};

window.toggleScanMode = function() {
    if (scanLayer) {
        scanLayer.classList.toggle('active-scan');
        if (window.SpaceAudio) {
            window.SpaceAudio.playScan();
        } else {
            const scanAudio = new Audio('Audio/daviddumaisaudio-high-tech-spectral-creature-194036.mp3'); 
            scanAudio.volume = 0.3;
            scanAudio.play().catch(()=>console.log('Audio bị chặn'));
        }
    }
};

// ==========================================
// 6. MICRO-INTERACTIONS & EASTER EGG (PHÍM U)
// ==========================================
document.addEventListener('click', function(e) {
    const ripple = document.createElement('div');
    ripple.className = 'ripple';
    ripple.style.left = `${e.clientX - 10}px`; 
    ripple.style.top = `${e.clientY - 10}px`;
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    document.body.appendChild(ripple);
    setTimeout(() => { ripple.remove(); }, 600);
});

let isEasterEggTriggered = false;
document.addEventListener('keydown', function(e) {
    const activeTag = document.activeElement.tagName.toLowerCase();
    if (activeTag === 'input' || activeTag === 'textarea') return;

    if (e.key.toLowerCase() === 'u' && !isEasterEggTriggered) {
        isEasterEggTriggered = true;
        const eeScreen = document.getElementById('easter-egg-screen');
        const text1En = document.getElementById('ee-text-1-en');
        const text1Vn = document.getElementById('ee-text-1-vn');
        const text2En = document.getElementById('ee-text-2-en');
        const text2Vn = document.getElementById('ee-text-2-vn');
        const eeSound = document.getElementById('ee-sound');
        
        if(eeScreen) {
            eeScreen.classList.add('active');
            if (window.SpaceAudio) {
                window.SpaceAudio.playEasterEgg();
            } else if(eeSound) {
                eeSound.volume = 0.6;
                eeSound.play().catch(err => console.log('Trình duyệt chặn autoplay âm thanh'));
            }
            
            setTimeout(() => { text1En.classList.add('visible'); }, 1500); 
            setTimeout(() => { text1Vn.classList.add('visible'); }, 3000); 
            setTimeout(() => { text2En.classList.add('visible'); }, 5500); 
            setTimeout(() => { text2Vn.classList.add('visible'); }, 7000); 
            
            setTimeout(() => {
                eeScreen.classList.remove('active');
                text1En.classList.remove('visible');
                text1Vn.classList.remove('visible');
                text2En.classList.remove('visible');
                text2Vn.classList.remove('visible');
                setTimeout(() => { isEasterEggTriggered = false; }, 2000);
            }, 12000);
        }
    }
});

// ==========================================
// 7. KHÔI PHỤC: HỆ THỐNG MODAL (MỞ HỒ SƠ)
// ==========================================
const modal = document.getElementById('planetModal');
let modalTrigger = null;

window.openModal = function(id) {
    const data = celestialData[id];
    if (!data || !modal) return;
    
    const titleEl = document.getElementById('modal-title');
    const imgEl = document.getElementById('modal-img');
    const descEl = document.getElementById('modal-desc');
    const typeEl = document.getElementById('modal-type');
    const sizeEl = document.getElementById('modal-size');
    const distEl = document.getElementById('modal-dist');
    const funEl = document.getElementById('modal-fun');
    
    if(titleEl) titleEl.innerText = data.title;
    if(imgEl) imgEl.src = data.img;
    if(descEl) descEl.innerText = data.desc;
    if(typeEl) typeEl.innerText = data.type || 'Đang cập nhật...';
    if(sizeEl) sizeEl.innerText = data.size || 'Đang cập nhật...';
    if(distEl) distEl.innerText = data.dist || 'Đang cập nhật...';
    if(funEl) funEl.innerText = data.fun || 'Vũ trụ còn nhiều bí ẩn...';
    
    modalTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    modal.style.display = 'flex';
    modal.style.opacity = '0';
    modal.style.transition = 'opacity 0.3s ease-out';
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.querySelector('.close-btn')?.focus();
    }, 10);
};

window.closeModal = function() { 
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            modalTrigger?.focus();
            modalTrigger = null;
        }, 300);
    }
};

window.addEventListener('click', function (e) { 
    if (e.target === modal) window.closeModal(); 
});

modal?.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const focusable = [...modal.querySelectorAll('button, a[href], input, textarea, select, [tabindex]:not([tabindex="-1"])')]
        .filter(element => !element.disabled && element.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
});

// ==========================================
// 8. BỘ NÃO ĐIỀU KHIỂN BẦU TRỜI SAO (V2)
// ==========================================
const starsContainer = document.getElementById('stars-container');

function createStarfield() {
  if (!starsContainer) return;
  starsContainer.innerHTML = '';
  const numberOfStars = 850;
  for (let i = 0; i < numberOfStars; i++) {
    const star = document.createElement('div');
    star.className = 'star';

    // Phân bố mật độ tự nhiên:
    // ~65% tập trung theo một dải nghiêng nhẹ (mô phỏng mặt phẳng Ngân Hà)
    // ~35% phân bố thưa thớt tạo các khoảng trống vũ trụ tĩnh lặng
    let top, left;
    if (Math.random() < 0.65) {
      const t = Math.random();
      const spread = (Math.random() - 0.5) * 36;
      top = Math.max(0, Math.min(100, t * 100 + spread));
      left = Math.max(0, Math.min(100, (1 - t) * 100 + (Math.random() - 0.5) * 45));
    } else {
      top = Math.random() * 100;
      left = Math.random() * 100;
    }

    star.style.top = top.toFixed(2) + '%';
    star.style.left = left.toFixed(2) + '%';

    // Phân cấp kích thước và độ sáng:
    const r = Math.random();
    let size, opacity, color;
    if (r > 0.96) {
      // Vì sao sáng điểm xuyết (~4%)
      size = (Math.random() * 0.7 + 2.0).toFixed(1);
      opacity = (Math.random() * 0.2 + 0.75).toFixed(2);
      color = Math.random() > 0.5 ? '#dec195' : '#eef1ec';
      star.style.boxShadow = `0 0 4px ${color}`;
    } else if (r > 0.82) {
      // Sao trung bình (~14%)
      size = (Math.random() * 0.5 + 1.3).toFixed(1);
      opacity = (Math.random() * 0.25 + 0.45).toFixed(2);
      color = '#eef1ec';
    } else {
      // Bụi sao li ti (~82%)
      size = (Math.random() * 0.4 + 0.8).toFixed(1);
      opacity = (Math.random() * 0.3 + 0.15).toFixed(2);
      color = '#a5cfd5';
    }

    star.style.width = size + 'px';
    star.style.height = size + 'px';
    star.style.opacity = opacity;
    star.style.backgroundColor = color;
    starsContainer.appendChild(star);
  }
}

function createShootingStar() {
  if (!starsContainer) return;
  const star = document.createElement('div');
  star.className = 'shooting-star';
  star.style.top = Math.random() * 40 + '%';
  star.style.left = Math.random() * 100 + '%';
  const length = Math.random() * 120 + 70;
  star.style.width = length + 'px';
  const duration = Math.random() * 0.6 + 0.4;
  star.style.animation = `shoot ${duration}s ease-out forwards`;
  starsContainer.appendChild(star);
  setTimeout(() => { star.remove(); }, duration * 1000 + 100);
}

function startMeteorShower() {
  const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;
  // Giữ tần suất sao băng rất hiếm (~22s) để không làm xao nhãng đọc nội dung
  setInterval(() => {
    createShootingStar();
  }, 22000);
}

createStarfield();
startMeteorShower();
// ==========================================
// 9. LOGIC CHUYỂN CẢNH SANG STORY MODE
// ==========================================
window.transitionToStory = function(e) {
    e.preventDefault(); 
    const overlay = document.getElementById('story-transition-overlay');
    if (overlay) {
        overlay.classList.add('active'); 
        
        // 🎵 Âm thanh bẻ cong không-thời gian (Web Audio API / Offline fallback)
        if (window.SpaceAudio) {
            window.SpaceAudio.playWarp();
        } else {
            const warpSound = new Audio('Audio/soundreality-riser-hole.m4a');
            warpSound.volume = 0.8;
            warpSound.play().catch(()=>console.log('Audio bị chặn'));
        }

        setTimeout(() => {
            window.location.href = 'story.html';
        }, 1500);
    } else {
        window.location.href = 'story.html';
    }
};
// ==========================================
// 10. LOGIC MỞ/ĐÓNG CHI TIẾT & SCROLL GLOW TIMELINE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 10.1. Logic Nút bấm Drill-down - GIỮ NGUYÊN GỐC FIX CŨ
    const timelineItems = document.querySelectorAll('.timeline-item');
    const detailCards = document.querySelectorAll('.detail-card');
    let timelineTypingTimeout; 

    function typeWriterTimeline(element, text, speed = 25) {
        if (timelineTypingTimeout) clearTimeout(timelineTypingTimeout); 
        let i = 0; let currentHTML = ""; let isTag = false;
        function type() {
            if (i < text.length) {
                let char = text.charAt(i);
                currentHTML += char; i++;
                if (char === '<') isTag = true;
                if (char === '>') isTag = false;
                if (isTag) { type(); } else {
                    element.innerHTML = currentHTML + '<span class="cursor">|</span>';
                    timelineTypingTimeout = setTimeout(type, speed);
                }
            } else { element.innerHTML = text; }
        }
        type();
    }

    function setTimelineDetailState(card, open) {
        if (!card) return;
        const owner = card.closest('.timeline-item');
        const trigger = owner?.querySelector('.expand-btn');
        card.classList.toggle('open', open);
        card.setAttribute('aria-hidden', String(!open));
        trigger?.setAttribute('aria-expanded', String(open));
    }

    timelineItems.forEach((item, index) => {
        const expandBtn = item.querySelector('.expand-btn');
        const detailCard = item.querySelector('.detail-card');
        const closeBtn = item.querySelector('.close-detail-btn');

        if (detailCard) {
            detailCard.id ||= `timeline-detail-${index + 1}`;
            detailCard.setAttribute('role', 'region');
            detailCard.setAttribute('aria-hidden', 'true');
        }
        if (expandBtn && detailCard) {
            expandBtn.setAttribute('aria-controls', detailCard.id);
            expandBtn.setAttribute('aria-expanded', 'false');
        }
        if (closeBtn) {
            closeBtn.type = 'button';
            closeBtn.setAttribute('aria-label', 'Đóng bảng thông tin');
        }

        if (expandBtn && detailCard) {
            expandBtn.onclick = (e) => {
                e.preventDefault();
                document.querySelectorAll('.detail-card.open').forEach(card => {
                    if (card !== detailCard) setTimelineDetailState(card, false);
                });

                setTimelineDetailState(detailCard, true);
                setTimeout(() => closeBtn?.focus(), 50);
                
                const pTag = detailCard.querySelector('.typewriter');
                if (pTag) {
                    const fullText = pTag.getAttribute('data-text');
                    typeWriterTimeline(pTag, fullText);
                }
            };
        }

        if (closeBtn && detailCard) {
            closeBtn.onclick = (e) => {
                e.preventDefault();
                setTimelineDetailState(detailCard, false);
                if (timelineTypingTimeout) clearTimeout(timelineTypingTimeout);
                expandBtn?.focus();
            };
        }
    });

    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        const openDetail = document.querySelector('#lich-su .detail-card.open');
        if (!openDetail) return;
        const trigger = openDetail.closest('.timeline-item')?.querySelector('.expand-btn');
        setTimelineDetailState(openDetail, false);
        if (timelineTypingTimeout) clearTimeout(timelineTypingTimeout);
        trigger?.focus();
    });

    // 10.2. Hiệu ứng Timeline "sống" sáng theo scroll (Gãi đúng chỗ ngứa Mục 1)
    const timelineLineDynamic = document.getElementById('timeline-line-dynamic');
    if (timelineLineDynamic) {
        window.addEventListener('scroll', () => {
            const container = document.querySelector('.timeline-container');
            const rect = container.getBoundingClientRect();
            
            // Tính toán % người dùng đã scroll qua vùng timeline
            const windowHeight = window.innerHeight;
            const progress = (windowHeight - rect.top) / (rect.height + windowHeight * 0.2);
            const scrollPercentage = Math.max(0, Math.min(1, progress));
            
            // Ép % đó vào chiều cao và độ sáng của đường kẻ
            const dynamicHeight = scrollPercentage * 100;
            const glowOpacity = 0.05 + 0.3 * scrollPercentage;
            
            timelineLineDynamic.style.height = `${dynamicHeight}%`;
            timelineLineDynamic.style.background = `rgba(127, 231, 255, ${glowOpacity})`;
            timelineLineDynamic.style.boxShadow = `0 0 15px rgba(127, 231, 255, ${glowOpacity * 2})`;
        });
    }
});
// ==========================================
// 11. LOGIC CHUYỂN CẢNH SANG VR MODE (BẢN SONG NGỮ)
// ==========================================
window.transitionToVR = function(e) {
    e.preventDefault(); 
    const overlay = document.getElementById('story-transition-overlay'); 
    const overlayText = document.querySelector('.transition-text');

    if (overlay && overlayText) {
        // Giao diện Song ngữ chuyển tiếp vào Biển Sao 3D
        overlayText.innerHTML = `
            INITIATING STARFIELD SEQUENCE...<br>
            <span style='font-size: 1rem; color: #888; font-style: italic; display: block; margin-top: 5px;'>Đang mở không gian Biển Sao 3D...</span>
            <br>
            <span style='color: #00ffcc; display: block; margin-top: 15px;'>CALIBRATING STARFIELD...</span>
            <span style='font-size: 0.9rem; color: #00aa88; font-style: italic; display: block; margin-top: 5px;'>Đang hiệu chỉnh trường sao...</span>
        `;
        
        overlayText.style.color = "#00ffcc"; 
        overlayText.style.textShadow = "0 0 20px rgba(0, 255, 204, 0.6)";

        overlay.classList.add('active'); 
        
        // Âm thanh khởi động máy quét
        if (window.SpaceAudio) {
            window.SpaceAudio.playWarp();
        } else {
            const scanSound = new Audio('Audio/daviddumaisaudio-high-tech-spectral-creature-194036.mp3'); 
            scanSound.volume = 0.8; 
            scanSound.play().catch(()=>console.log('Audio bị chặn'));
        }

        // Đợi 2.5 giây cho người ta kịp đọc chữ rồi mới búng qua trang VR
        setTimeout(() => {
            window.location.href = 'vr-mode.html';
        }, 2500); 
    } else {
        window.location.href = 'vr-mode.html';
    }
};
// ==========================================
// 12. BỘ MÁY GIẢ LẬP VẬT LÝ 2D (ORBIT SIMULATOR)
// ==========================================
let simCanvas, simCtx, simAnimId;
        // Tọa độ đã căn chỉnh lại cho khung Canvas 500x300
        let simSun = { x: 300, y: 150, mass: 5000, radius: 22 };
        let simPlanet = { x: 250, y: 50, vx: 1.5, vy: 0, radius: 8 };
        let simPath = [];

        // Lệnh kích hoạt tự động khi tải web xong
        document.addEventListener('DOMContentLoaded', () => {
            initPhysics();
        });

        function initPhysics() {
            simCanvas = document.getElementById('orbitCanvas');
            if (!simCanvas) return;
            simCtx = simCanvas.getContext('2d');
            
            document.getElementById('velSlider').oninput = (e) => { document.getElementById('velValue').innerText = e.target.value; };
            document.getElementById('gravSlider').oninput = (e) => { document.getElementById('gravValue').innerText = e.target.value; };
            document.querySelectorAll('[data-orbit-speed]').forEach(button => button.addEventListener('click', () => {
                document.getElementById('velSlider').value = button.dataset.orbitSpeed;
                document.getElementById('gravSlider').value = '5000';
                document.getElementById('velValue').textContent = button.dataset.orbitSpeed;
                document.getElementById('gravValue').textContent = '5000';
                window.resetSimulation();
            }));
            
            resetSimulation();
        }

        window.resetSimulation = function() {
            cancelAnimationFrame(simAnimId);
            let initialVel = parseFloat(document.getElementById('velSlider').value);
            simSun.mass = parseFloat(document.getElementById('gravSlider').value) || 5000;
            
            simPath = [];
            document.getElementById('orbit-status').textContent = 'Đang quan sát. Đổi thanh trượt rồi bấm Làm lại để thử một quỹ đạo khác.';
            updatePhysics();
        };

        function drawArrow(fromX, fromY, toX, toY, color) {
            let headlen = 10; 
            let angle = Math.atan2(toY - fromY, toX - fromX);
            simCtx.beginPath(); simCtx.moveTo(fromX, fromY); simCtx.lineTo(toX, toY);
            simCtx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
            simCtx.moveTo(toX, toY);
            simCtx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
            simCtx.strokeStyle = color; simCtx.lineWidth = 2; simCtx.stroke();
        }

        function updatePhysics() {
            simCtx.clearRect(0, 0, simCanvas.width, simCanvas.height);
            
            // Draw subtle orbit coordinate grid
            simCtx.strokeStyle = 'rgba(157, 174, 185, 0.08)';
            simCtx.lineWidth = 1;
            simCtx.beginPath();
            simCtx.arc(simSun.x, simSun.y, 80, 0, Math.PI * 2);
            simCtx.arc(simSun.x, simSun.y, 160, 0, Math.PI * 2);
            simCtx.stroke();

            // Draw trajectory path
            simCtx.beginPath();
            for(let i=0; i<simPath.length; i++) {
                if(i===0) simCtx.moveTo(simPath[i].x, simPath[i].y);
                else simCtx.lineTo(simPath[i].x, simPath[i].y);
            }
            simCtx.strokeStyle = 'rgba(165, 207, 213, 0.35)'; simCtx.lineWidth = 1.5; simCtx.stroke();

            let dx = simSun.x - simPlanet.x;
            let dy = simSun.y - simPlanet.y;
            let distSq = dx*dx + dy*dy;
            let dist = Math.sqrt(distSq);
            
            // Illustrative units: this factor puts circular and escape speeds inside the slider range.
            let force = simSun.mass * 0.05 / Math.max(distSq, 1);
            let ax = force * (dx / dist); 
            let ay = force * (dy / dist); 

            simPlanet.vx += ax; simPlanet.vy += ay;
            simPlanet.x += simPlanet.vx; simPlanet.y += simPlanet.vy;
            
            simPath.push({x: simPlanet.x, y: simPlanet.y});
            if(simPath.length > 260) simPath.shift();

            // Sun with subtle starlight gold glow
            const sunGlow = simCtx.createRadialGradient(simSun.x, simSun.y, simSun.radius * 0.4, simSun.x, simSun.y, simSun.radius * 2.2);
            sunGlow.addColorStop(0, 'rgba(222, 193, 149, 0.95)');
            sunGlow.addColorStop(0.5, 'rgba(222, 193, 149, 0.35)');
            sunGlow.addColorStop(1, 'rgba(222, 193, 149, 0)');
            simCtx.fillStyle = sunGlow;
            simCtx.beginPath();
            simCtx.arc(simSun.x, simSun.y, simSun.radius * 2.2, 0, Math.PI*2);
            simCtx.fill();

            simCtx.beginPath(); simCtx.arc(simSun.x, simSun.y, simSun.radius, 0, Math.PI*2);
            simCtx.fillStyle = '#DEC195'; simCtx.fill();

            // Planet (Ice Blue)
            simCtx.beginPath(); simCtx.arc(simPlanet.x, simPlanet.y, simPlanet.radius, 0, Math.PI*2);
            simCtx.fillStyle = '#A5CFD5'; simCtx.fill();

            // Velocity vector (Ice Blue #A5CFD5) & Gravitational acceleration vector (Terracotta #D48C70)
            drawArrow(simPlanet.x, simPlanet.y, simPlanet.x + simPlanet.vx * 18, simPlanet.y + simPlanet.vy * 18, '#A5CFD5');
            drawArrow(simPlanet.x, simPlanet.y, simPlanet.x + ax * 6000, simPlanet.y + ay * 6000, '#D48C70');

            if(dist < simSun.radius + simPlanet.radius) {
                simCtx.fillStyle = "rgba(8, 13, 20, 0.9)"; simCtx.fillRect(0, 0, simCanvas.width, simCanvas.height);
                simCtx.fillStyle = "#DEC195"; simCtx.font = "600 16px 'Space Grotesk', sans-serif"; simCtx.textAlign = "center";
                simCtx.fillText("VA CHẠM TRỌNG TRƯỜNG", simCanvas.width/2, simCanvas.height/2 - 10);
                simCtx.fillStyle = "#9DAEB9"; simCtx.font = "400 13px 'Plus Jakarta Sans', sans-serif";
                simCtx.fillText("Thiên thể tiến vào vùng nhật quyển và bị hấp thụ.", simCanvas.width/2, simCanvas.height/2 + 14);
                document.getElementById('orbit-status').textContent = 'Va chạm: Đường đi đưa thiên thể quá gần Mặt Trời. Hãy tăng vận tốc tiếp tuyến ban đầu.';
                return; 
            }
            if(simPlanet.x < -100 || simPlanet.x > simCanvas.width+100 || simPlanet.y < -100 || simPlanet.y > simCanvas.height+100) {
                simCtx.fillStyle = "rgba(8, 13, 20, 0.9)"; simCtx.fillRect(0, 0, simCanvas.width, simCanvas.height);
                simCtx.fillStyle = "#A5CFD5"; simCtx.font = "600 16px 'Space Grotesk', sans-serif"; simCtx.textAlign = "center";
                simCtx.fillText("QUỸ ĐẠO THOÁT LY (HYPERBOLIC)", simCanvas.width/2, simCanvas.height/2 - 10);
                simCtx.fillStyle = "#9DAEB9"; simCtx.font = "400 13px 'Plus Jakarta Sans', sans-serif";
                simCtx.fillText("Động năng vượt thắng trường hấp dẫn trung tâm.", simCanvas.width/2, simCanvas.height/2 + 14);
                const energy = (simPlanet.vx ** 2 + simPlanet.vy ** 2) / 2 - simSun.mass * 0.05 / dist;
                document.getElementById('orbit-status').textContent = energy >= 0 ? 'Thoát ly: Thiên thể có đủ năng lượng để vĩnh viễn rời khỏi trường hấp dẫn kín.' : 'Thiên thể tạm thời ra ngoài khung nhìn nhưng vẫn trên quỹ đạo elip liên kết.';
                return; 
            }

            simAnimId = requestAnimationFrame(updatePhysics);
        }

// ==========================================
// 13. BẦU TRỜI TỐI NAY (TONIGHT'S SKY MODULE)
// ==========================================
function initTonightsSky() {
    const moonNameEl = document.getElementById('moon-phase-name');
    const moonIllumEl = document.getElementById('moon-illumination');
    const moonAgeEl = document.getElementById('moon-age');
    const moonAdviceEl = document.getElementById('moon-advice');
    const moonPhaseShape = document.getElementById('moon-phase-shape');
    const seasonTagEl = document.getElementById('sky-season-tag');
    const skyTargetTitleEl = document.getElementById('sky-target-title');
    const skyTargetDescEl = document.getElementById('sky-target-desc');
    const skyTipTextEl = document.getElementById('sky-tip-text');

    if (!moonNameEl) return;

    const now = new Date();
    // Reference New Moon: Jan 6, 2000, 18:14 UTC (J2000 epoch)
    const synodicMonth = 29.53058867;
    const epochMs = 947182440000;
    const diffMs = now.getTime() - epochMs;
    const cycleMs = synodicMonth * 86400000;
    let remainderMs = diffMs % cycleMs;
    if (remainderMs < 0) remainderMs += cycleMs;
    
    const ageDays = remainderMs / 86400000;
    const phaseFraction = ageDays / synodicMonth; // 0.0 to 1.0
    // Illumination: 0 at phase 0/1, 1 at phase 0.5
    const illumination = Math.round((1 - Math.cos(phaseFraction * 2 * Math.PI)) / 2 * 100);

    let phaseName = 'Trăng non (Sóc)';
    let advice = 'Trời tối không trăng, điều kiện lý tưởng nhất trong tháng để ngắm dải Ngân Hà và các tinh vân sâu.';
    let shapeStyle = '';

    if (ageDays < 1.5 || ageDays >= 28.5) {
        phaseName = 'Trăng Non (New Moon)';
        advice = 'Mặt Trăng đi qua giữa Trái Đất và Mặt Trời; bầu trời đêm đạt độ tối hoàn hảo để quan sát tinh vân và thiên hà.';
        shapeStyle = 'background: #0d1520;';
    } else if (ageDays < 7.0) {
        phaseName = 'Trăng Lưỡi Liềm Đầu Tháng (Waxing Crescent)';
        advice = 'Mảnh trăng thanh mảnh mọc ở hướng Tây ngay sau hoàng hôn. Vùng ranh giới sáng-tối (terminator) để lộ bóng đổ kỳ vĩ của các miệng hố va chạm.';
        shapeStyle = 'background: linear-gradient(90deg, #DEC195 20%, #0d1520 70%); border-radius: 50%;';
    } else if (ageDays < 8.5) {
        phaseName = 'Trăng Bán Nguyệt Đầu Tháng (First Quarter)';
        advice = 'Nửa bề mặt được chiếu sáng, trăng đứng cao trên đỉnh đầu lúc hoàng hôn. Dùng ống nhòm có thể phân biệt rõ dãy núi Montes Apenninus.';
        shapeStyle = 'background: linear-gradient(90deg, #DEC195 50%, #0d1520 50%); border-radius: 50%;';
    } else if (ageDays < 14.0) {
        phaseName = 'Trăng Trương Tròn Đầu Tháng (Waxing Gibbous)';
        advice = 'Độ sáng tăng dần, soi rọi cảnh vật ban đêm. Các biển dung nham cổ đại (Mare Imbrium, Mare Serenitatis) hiện lên xám sẫm rõ rệt.';
        shapeStyle = 'background: linear-gradient(90deg, #DEC195 75%, #0d1520 25%); border-radius: 50%;';
    } else if (ageDays < 16.5) {
        phaseName = 'Trăng Tròn (Full Moon / Vọng)';
        advice = 'Mặt Trăng đối diện trực tiếp Mặt Trời, tỏa sáng chói chang suốt đêm. Ánh trăng sáng sẽ lấn át các thiên thể mờ, thích hợp để ngắm trăng trọn vẹn.';
        shapeStyle = 'background: radial-gradient(circle at 35% 35%, #fff 0%, #DEC195 65%, #cbb085 100%); border-radius: 50%; box-shadow: 0 0 25px rgba(222,193,149,0.35);';
    } else if (ageDays < 22.0) {
        phaseName = 'Trăng Trương Tròn Cuối Tháng (Waning Gibbous)';
        advice = 'Mặt Trăng mọc muộn hơn sau hoàng hôn, góc chiếu ánh sáng nghiêng làm nổi bật miệng hố Tycho với các vệt tia sáng phóng xạ dài hàng ngàn km.';
        shapeStyle = 'background: linear-gradient(270deg, #DEC195 75%, #0d1520 25%); border-radius: 50%;';
    } else if (ageDays < 23.5) {
        phaseName = 'Trăng Bán Nguyệt Cuối Tháng (Last Quarter)';
        advice = 'Nửa trăng mọc lúc nửa đêm và đứng cao khi trời rạng sáng. Đây là thời khắc yên tĩnh tuyệt đẹp cho các nhà quan sát cú đêm.';
        shapeStyle = 'background: linear-gradient(270deg, #DEC195 50%, #0d1520 50%); border-radius: 50%;';
    } else {
        phaseName = 'Trăng Lưỡi Liềm Cuối Tháng (Waning Crescent)';
        advice = 'Mảnh trăng cong mỏng manh xuất hiện ở chân trời phía Đông ngay trước bình minh, cùng lúc với hiện tượng "Ánh đất" (Earthshine) mờ ảo.';
        shapeStyle = 'background: linear-gradient(270deg, #DEC195 20%, #0d1520 70%); border-radius: 50%;';
    }

    moonNameEl.textContent = phaseName;
    moonIllumEl.textContent = `${illumination}%`;
    moonAgeEl.textContent = `${ageDays.toFixed(1)} ngày`;
    moonAdviceEl.textContent = advice;
    if (moonPhaseShape) moonPhaseShape.style.cssText = shapeStyle;

    // Seasonal Astronomical Targets
    const month = now.getMonth(); // 0 to 11
    if (month >= 2 && month <= 4) { // Spring (Tháng 3, 4, 5)
        seasonTagEl.textContent = 'BẦU TRỜI MÙA XUÂN (XUÂN PHÂN)';
        skyTargetTitleEl.textContent = 'Mùa Của Các Thiên Hà & Sao Kim';
        skyTargetDescEl.textContent = 'Bầu trời đêm hướng về phía cụm thiên hà Xử Nữ (Virgo Cluster). Về phía Tây sau hoàng hôn, Sao Kim rực rỡ như ngọn hải đăng của bầu trời chiều.';
        skyTipTextEl.textContent = 'Hãy tìm Chòm sao Gấu Lớn (Bắc Đẩu) treo ngược trên cao, dẫn đường đến ngôi sao sáng Arcturus.';
    } else if (month >= 5 && month <= 7) { // Summer (Tháng 6, 7, 8)
        seasonTagEl.textContent = 'BẦU TRỜI MÙA HÈ (HẠ CHÍ)';
        skyTargetTitleEl.textContent = 'Tam Giác Mùa Hè & Dải Ngân Hà';
        skyTargetDescEl.textContent = 'Khoảng thời gian đẹp nhất năm để quan sát Dải Ngân Hà vắt ngang bầu trời qua ba ngôi sao Vega, Deneb và Altair. Sao Thổ với vành đai lộng lẫy mọc dần từ nửa đêm.';
        skyTipTextEl.textContent = 'Tháng 8 hàng năm chào đón mưa sao băng Anh Tiên (Perseids) với tần suất lên tới 60-100 vệt sao/giờ.';
    } else if (month >= 8 && month <= 10) { // Autumn (Tháng 9, 10, 11)
        seasonTagEl.textContent = 'BẦU TRỜI MÙA THU (THU PHÂN)';
        skyTargetTitleEl.textContent = 'Sao Mộc, Sao Thổ & Thiên Hà Tiên Nữ';
        skyTargetDescEl.textContent = 'Hai hành tinh khí khổng lồ Sao Mộc và Sao Thổ ngự trị suốt đêm. Thiên hà Tiên Nữ (Andromeda / M31) có thể nhìn thấy bằng mắt thường dưới bầu trời ngoại ô.';
        skyTipTextEl.textContent = 'Kính thiên văn nhỏ 70-90mm sẽ dễ dàng tách biệt vành đai Sao Thổ và 4 vệ tinh Galilei của Sao Mộc.';
    } else { // Winter (Tháng 12, 1, 2)
        seasonTagEl.textContent = 'BẦU TRỜI MÙA ĐÔNG (ĐÔNG CHÍ)';
        skyTargetTitleEl.textContent = 'Chòm Sao Lạp Hộ (Orion) & Tinh Vân M42';
        skyTargetDescEl.textContent = 'Bầu trời mùa đông trong trẻo với những ngôi sao sáng rực rỡ nhất: Sirius, Betelgeuse và Rigel. Tinh vân Lạp Hộ (M42) nằm ngay bên dưới vành đai ba ngôi sao thẳng hàng.';
        skyTipTextEl.textContent = 'Ngay cả ống nhòm thông thường cũng thấy được đám mây phát sáng mờ ảo của Tinh vân Lạp Hộ M42.';
    }
}

// ==========================================
// 14. CHÒM SAO CỦA TÔI (CONSTELLATION STUDIO)
// ==========================================
const ConstellationStudio = {
    canvas: null,
    ctx: null,
    stars: [
        { id: 1, x: 60, y: 70, r: 3.5, label: 'α' },
        { id: 2, x: 140, y: 40, r: 2.5, label: 'β' },
        { id: 3, x: 210, y: 85, r: 4.0, label: 'γ' },
        { id: 4, x: 120, y: 130, r: 2.0, label: 'δ' },
        { id: 5, x: 280, y: 55, r: 3.0, label: 'ε' },
        { id: 6, x: 340, y: 110, r: 3.5, label: 'ζ' },
        { id: 7, x: 230, y: 170, r: 2.5, label: 'η' },
        { id: 8, x: 80, y: 220, r: 3.0, label: 'θ' },
        { id: 9, x: 160, y: 240, r: 2.2, label: 'ι' },
        { id: 10, x: 310, y: 210, r: 3.8, label: 'κ' },
        { id: 11, x: 410, y: 80, r: 2.8, label: 'λ' },
        { id: 12, x: 460, y: 150, r: 3.2, label: 'μ' },
        { id: 13, x: 390, y: 220, r: 2.5, label: 'ν' },
        { id: 14, x: 470, y: 250, r: 3.5, label: 'ξ' },
        { id: 15, x: 200, y: 20, r: 2.0, label: 'ο' },
        { id: 16, x: 20, y: 150, r: 2.2, label: 'π' }
    ],
    lines: [], // array of [starIdA, starIdB]
    activeStar: null,
    hoveredStar: null,

    init() {
        this.canvas = document.getElementById('constellationCanvas');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');

        // Event listeners for drawing
        this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        this.canvas.addEventListener('mouseleave', () => { this.hoveredStar = null; this.render(); });
        this.canvas.addEventListener('click', (e) => this.handleClick(e));

        document.getElementById('constellation-undo')?.addEventListener('click', () => this.undo());
        document.getElementById('constellation-clear')?.addEventListener('click', () => this.clear());
        document.getElementById('constellation-save-btn')?.addEventListener('click', () => this.save());

        this.renderSavedList();
        this.render();
    },

    getPos(e) {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    },

    findStarNear(x, y, radius = 18) {
        return this.stars.find(s => {
            const dx = s.x - x;
            const dy = s.y - y;
            return Math.sqrt(dx * dx + dy * dy) <= radius;
        });
    },

    handleMouseMove(e) {
        const pos = this.getPos(e);
        const star = this.findStarNear(pos.x, pos.y);
        if (star !== this.hoveredStar) {
            this.hoveredStar = star;
            this.canvas.style.cursor = star ? 'pointer' : 'crosshair';
            this.render(pos);
        } else if (this.activeStar) {
            this.render(pos);
        }
    },

    handleClick(e) {
        const pos = this.getPos(e);
        const clicked = this.findStarNear(pos.x, pos.y);

        if (!clicked) {
            this.activeStar = null;
            this.render();
            return;
        }

        if (!this.activeStar) {
            this.activeStar = clicked;
        } else {
            if (this.activeStar.id !== clicked.id) {
                // Check if line already exists
                const exists = this.lines.some(([a, b]) => 
                    (a === this.activeStar.id && b === clicked.id) || (a === clicked.id && b === this.activeStar.id)
                );
                if (!exists) {
                    this.lines.push([this.activeStar.id, clicked.id]);
                }
            }
            this.activeStar = clicked; // allow continuous chaining
        }
        this.render(pos);
    },

    undo() {
        if (this.lines.length > 0) {
            this.lines.pop();
            this.render();
        }
    },

    clear() {
        this.lines = [];
        this.activeStar = null;
        this.render();
    },

    render(currentPointerPos = null) {
        const ctx = this.ctx;
        const w = this.canvas.width;
        const h = this.canvas.height;
        ctx.clearRect(0, 0, w, h);

        // Background space dust
        ctx.fillStyle = '#080d14';
        ctx.fillRect(0, 0, w, h);

        // Drawn lines
        ctx.lineWidth = 1.6;
        ctx.strokeStyle = '#DEC195';
        ctx.shadowColor = 'rgba(222, 193, 149, 0.4)';
        ctx.shadowBlur = 6;

        this.lines.forEach(([idA, idB]) => {
            const sA = this.stars.find(s => s.id === idA);
            const sB = this.stars.find(s => s.id === idB);
            if (sA && sB) {
                ctx.beginPath();
                ctx.moveTo(sA.x, sA.y);
                ctx.lineTo(sB.x, sB.y);
                ctx.stroke();
            }
        });

        // Rubber-band line from activeStar to pointer
        if (this.activeStar && currentPointerPos) {
            ctx.strokeStyle = 'rgba(165, 207, 213, 0.5)';
            ctx.setLineDash([4, 4]);
            ctx.beginPath();
            ctx.moveTo(this.activeStar.x, this.activeStar.y);
            ctx.lineTo(currentPointerPos.x, currentPointerPos.y);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        ctx.shadowBlur = 0;

        // Draw stars
        this.stars.forEach(s => {
            const isHovered = this.hoveredStar && this.hoveredStar.id === s.id;
            const isActive = this.activeStar && this.activeStar.id === s.id;

            // Halo for hovered or active star
            if (isHovered || isActive) {
                ctx.fillStyle = isActive ? 'rgba(222, 193, 149, 0.35)' : 'rgba(165, 207, 213, 0.25)';
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r + 7, 0, Math.PI * 2);
                ctx.fill();
            }

            // Core star
            ctx.fillStyle = isActive ? '#DEC195' : (isHovered ? '#EEF1EC' : '#c9d6df');
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fill();

            // Label
            ctx.fillStyle = 'rgba(157, 174, 185, 0.5)';
            ctx.font = "10px 'Share Tech Mono', monospace";
            ctx.fillText(s.label, s.x + 6, s.y - 4);
        });
    },

    save() {
        const nameInput = document.getElementById('constellation-name');
        const noteInput = document.getElementById('constellation-note');
        const name = nameInput ? nameInput.value.trim() : '';
        const note = noteInput ? noteInput.value.trim() : '';

        if (!name) {
            alert('Vui lòng đặt tên cho chòm sao của bạn.');
            nameInput?.focus();
            return;
        }

        if (this.lines.length < 1) {
            alert('Hãy nối ít nhất 2 ngôi sao để tạo thành một chòm sao trước khi lưu.');
            return;
        }

        let saved = [];
        try {
            saved = JSON.parse(localStorage.getItem('phuc.constellations.v1') || '[]');
        } catch(e) { saved = []; }

        const entry = {
            id: 'c_' + Date.now(),
            name: name,
            note: note || 'Chòm sao tự phác thảo trên đài quan sát.',
            lines: this.lines,
            starsCount: new Set(this.lines.flat()).size,
            date: new Date().toISOString()
        };

        saved.unshift(entry);
        try {
            localStorage.setItem('phuc.constellations.v1', JSON.stringify(saved));
        } catch(e) {}

        if (nameInput) nameInput.value = '';
        if (noteInput) noteInput.value = '';
        this.clear();
        this.renderSavedList();
    },

    deleteSaved(id) {
        let saved = [];
        try {
            saved = JSON.parse(localStorage.getItem('phuc.constellations.v1') || '[]');
        } catch(e) { saved = []; }
        saved = saved.filter(item => item.id !== id);
        try {
            localStorage.setItem('phuc.constellations.v1', JSON.stringify(saved));
        } catch(e) {}
        this.renderSavedList();
    },

    loadConstellation(lines) {
        this.lines = lines || [];
        this.activeStar = null;
        this.render();
    },

    renderSavedList() {
        const listEl = document.getElementById('saved-constellations-list');
        const emptyEl = document.getElementById('constellation-empty');
        if (!listEl) return;

        let saved = [];
        try {
            saved = JSON.parse(localStorage.getItem('phuc.constellations.v1') || '[]');
        } catch(e) { saved = []; }

        listEl.innerHTML = '';
        if (emptyEl) emptyEl.style.display = saved.length > 0 ? 'none' : 'block';

        saved.forEach(item => {
            const card = document.createElement('div');
            card.className = 'saved-constellation-card';
            
            const dateStr = new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(item.date));

            card.innerHTML = `
                <div class="saved-c-header">
                    <span class="saved-c-meta">${dateStr} · ${item.starsCount} sao</span>
                    <button type="button" class="saved-c-delete" aria-label="Xóa chòm sao">&times;</button>
                </div>
                <h4 class="saved-c-title">${item.name}</h4>
                <p class="saved-c-note">${item.note}</p>
                <button type="button" class="saved-c-view">Xem lại trên khung vẽ →</button>
            `;

            card.querySelector('.saved-c-delete').addEventListener('click', (e) => {
                e.stopPropagation();
                this.deleteSaved(item.id);
            });

            card.querySelector('.saved-c-view').addEventListener('click', () => {
                this.loadConstellation(item.lines);
            });

            listEl.appendChild(card);
        });
    }
};

/* ==========================================================================
   LOOKBACK TIME (CỖ MÁY THỜI GIAN THIÊN VĂN)
   ========================================================================== */
const LookbackTime = {
    data: [
        {
            step: 0,
            name: "Mặt Trăng (The Moon)",
            shortName: "MẶT TRĂNG",
            distBadge: "384.400 km",
            lookbackTime: "1.3 GIÂY",
            lookbackTimeSub: "để đến mắt bạn — Bạn đang nhìn thấy Mặt Trăng ở:",
            earthTime: "1.3 giây trước",
            cosmicDesc: "Vệ tinh tự nhiên duy nhất của Trái Đất. Ở khoảng cách chỉ hơn 1 giây ánh sáng, đây là thiên thể gần chúng ta nhất trong vũ trụ bao la.",
            statDist: "384.400 km (~0.00257 AU)",
            earthDesc: "Khoảnh khắc bạn vừa chớp mắt hoặc đọc xong một từ. Nhịp tim của bạn vừa đập đúng một nhịp. Bạn và Mặt Trăng hầu như đang cùng tồn tại trong một hiện tại tức thời.",
            era: "Hiện tại tức thời"
        },
        {
            step: 1,
            name: "Mặt Trời (The Sun)",
            shortName: "MẶT TRỜI",
            distBadge: "1 AU (~149,6 triệu km)",
            lookbackTime: "8 PHÚT 19 GIÂY",
            lookbackTimeSub: "để chạm tới Trái Đất — Bạn đang nhìn thấy Mặt Trời ở:",
            earthTime: "8 phút 19 giây trước",
            cosmicDesc: "Trái tim của Thái Dương Hệ, lò phản ứng nhiệt hạch khổng lồ cung cấp năng lượng và sự sống cho muôn loài trên Trái Đất.",
            statDist: "1 AU (~149.600.000 km)",
            earthDesc: "Nếu Mặt Trời đột ngột ngừng phát sáng ngay lúc này, chúng ta trên Trái Đất vẫn sẽ thấy trời sáng thêm hơn 8 phút nữa — đủ thời gian để uống xong một tách trà buổi sáng.",
            era: "Vừa trôi qua trong buổi sáng nay"
        },
        {
            step: 2,
            name: "Sao Mộc (Jupiter)",
            shortName: "SAO MỘC",
            distBadge: "5.2 AU (~778 triệu km)",
            lookbackTime: "43 PHÚT",
            lookbackTimeSub: "để vượt qua vành đai tiểu hành tinh — Bạn đang thấy Sao Mộc ở:",
            earthTime: "43 phút trước",
            cosmicDesc: "Gã khổng lồ khí lớn nhất Thái Dương Hệ với Vết Đỏ Lớn — một cơn bão cuồng nộ đã hoành hành hàng trăm năm.",
            statDist: "5.2 AU (~778.000.000 km)",
            earthDesc: "Một tiết học trên lớp của bạn vừa bắt đầu khi photon ánh sáng từ Sao Mộc bắt đầu rời khỏi tầng khí quyển của nó để bay về phía ống kính của bạn.",
            era: "Một tiết học trước"
        },
        {
            step: 3,
            name: "Proxima Centauri",
            shortName: "PROXIMA CENTAURI",
            distBadge: "4.24 Năm Ánh Sáng",
            lookbackTime: "4.24 NĂM",
            lookbackTimeSub: "vượt qua khoảng chân không liên sao — Bạn đang nhìn thấy ngôi sao này ở:",
            earthTime: "4.24 năm trước",
            cosmicDesc: "Ngôi sao gần Hệ Mặt Trời nhất, một sao lùn đỏ thuộc chòm sao Bán Nhân Mã, mang theo ngoại hành tinh Proxima b có tiềm năng hỗ trợ sự sống.",
            statDist: "4.24 ly (~40.000 tỷ km)",
            earthDesc: "Khoảng thời gian một học sinh bước vào ngưỡng cửa cấp THPT. Ánh sáng bạn thấy đêm nay đã bắt đầu hành trình từ khi bạn còn là cô cậu học trò lớp 9.",
            era: "Thời điểm bạn tốt nghiệp cấp 2"
        },
        {
            step: 4,
            name: "Sao Bắc Cực (Polaris)",
            shortName: "SAO BẮC CỰC",
            distBadge: "433 Năm Ánh Sáng",
            lookbackTime: "433 NĂM",
            lookbackTimeSub: "dẫn đường cho các nhà hàng hải cổ xưa — Bạn đang nhìn thấy Polaris ở:",
            earthTime: "433 năm trước (Năm ~1593)",
            cosmicDesc: "Ngôi sao dẫn đường huyền thoại trên vòm trời phương bắc, một hệ tam sao nằm gần như bất động ngay phía trên trục quay Trái Đất.",
            statDist: "433 ly (~4.100.000 tỷ km)",
            earthDesc: "Năm 1593, thời kỳ Phục Hưng ở châu Âu. Galileo Galilei đang giảng dạy tại Đại học Padua và chuẩn bị chế tạo chiếc kính thiên văn đầu tiên để hướng lên bầu trời.",
            era: "Thời kỳ Phục Hưng & Galileo Galilei"
        },
        {
            step: 5,
            name: "Tinh vân Lạp Hộ (Orion Nebula M42)",
            shortName: "TINH VÂN ORION",
            distBadge: "1.344 Năm Ánh Sáng",
            lookbackTime: "1.344 NĂM",
            lookbackTimeSub: "từ chiếc nôi sinh sao vĩ đại — Bạn đang nhìn thấy M42 ở:",
            earthTime: "1.344 năm trước (Năm ~682)",
            cosmicDesc: "Vườn ươm sao tráng lệ rực rỡ trong thanh kiếm của chàng thợ săn Orion, nơi hàng trăm ngôi sao non trẻ đang ra đời từ khí bụi vũ trụ.",
            statDist: "1.344 ly (~12.700.000 tỷ km)",
            earthDesc: "Thế kỷ thứ 7 (thời nhà Đường ở phương Đông và thời Trung Cổ ở phương Tây). Con người chưa từng có kính thiên văn, chỉ ngước nhìn thanh kiếm Lạp Hộ mờ ảo bằng mắt trần.",
            era: "Thời kỳ Cổ Trung Đại (~Thế kỷ VII)"
        },
        {
            step: 6,
            name: "Thiên hà Tiên Nữ (Andromeda M31)",
            shortName: "THIÊN HÀ TIÊN NỮ",
            distBadge: "2.5 Triệu Năm Ánh Sáng",
            lookbackTime: "2.5 TRIỆU NĂM",
            lookbackTimeSub: "vượt qua không gian liên thiên hà — Bạn đang thấy Tiên Nữ ở:",
            earthTime: "2.5 triệu năm trước",
            cosmicDesc: "Thiên hà xoắn ốc khổng lồ chứa hơn 1.000 tỷ ngôi sao, thiên thể xa nhất mà mắt người có thể nhìn thấy trực tiếp mà không cần kính viễn vọng.",
            statDist: "2.500.000 ly (~23.600 tỷ tỷ km)",
            earthDesc: "Trên Trái Đất chưa hề xuất hiện loài người hiện đại (Homo sapiens). Người vượn Homo habilis mới chỉ bắt đầu biết ghè đẽo những viên đá cuội đầu tiên ở thảo nguyên châu Phi.",
            era: "Bình minh loài người (Thời đồ đá cũ sơ kỳ)"
        },
        {
            step: 7,
            name: "Bức Xạ Nền Vũ Trụ (CMB)",
            shortName: "BỨC XẠ NỀN (CMB)",
            distBadge: "Rìa Vũ Trụ Quan Sát Được",
            lookbackTime: "13.8 TỶ NĂM",
            lookbackTimeSub: "từ thuở bình minh tạo dựng vạn vật — Bạn đang chạm vào:",
            earthTime: "13.8 tỷ năm trước (Thuở Big Bang)",
            cosmicDesc: "Tàn dư nhiệt đầu tiên của vụ nổ Big Bang, được giải phóng khi vũ trụ được 380.000 năm tuổi và các electron kết hợp với proton để tạo thành nguyên tử Hydro đầu tiên.",
            statDist: "Rìa Vũ Trụ Khả Kiến (~46.5 tỷ ly)",
            earthDesc: "Trái Đất, Mặt Trời và Dải Ngân Hà thậm chí còn chưa hề hình thành. Cả vũ trụ lúc này chỉ là một biển plasma rực lửa vừa trở nên trong suốt lần đầu tiên trong lịch sử.",
            era: "Khởi nguồn Vũ Trụ (Vụ nổ Big Bang)"
        }
    ],

    currentStep: 0,

    init() {
        const slider = document.getElementById('lookback-slider');
        if (!slider) return;

        slider.addEventListener('input', (e) => {
            this.setStep(parseInt(e.target.value, 10));
        });

        // Presets
        document.querySelectorAll('.lookback-preset-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const step = parseInt(btn.dataset.step, 10);
                this.setStep(step);
            });
        });

        // Ticks
        document.querySelectorAll('.lookback-ticks .tick').forEach(tick => {
            tick.addEventListener('click', () => {
                const step = parseInt(tick.dataset.step, 10);
                this.setStep(step);
            });
        });

        this.setStep(0);
    },

    setStep(index) {
        const clamped = Math.max(0, Math.min(this.data.length - 1, isNaN(index) ? 0 : index));
        this.currentStep = clamped;
        const item = this.data[clamped];

        const slider = document.getElementById('lookback-slider');
        if (slider) slider.value = clamped;

        const glow = document.getElementById('lookback-track-glow');
        if (glow) glow.style.width = `${(clamped / (this.data.length - 1)) * 100}%`;

        // Text readouts
        const distValue = document.getElementById('lookback-dist-value');
        if (distValue) distValue.textContent = item.distBadge;

        const objName = document.getElementById('lookback-object-name');
        if (objName) objName.textContent = item.shortName;

        const timeValue = document.getElementById('lookback-time-value');
        if (timeValue) timeValue.textContent = item.lookbackTime;

        const timeSub = document.getElementById('lookback-time-sub');
        if (timeSub) timeSub.textContent = item.lookbackTimeSub;

        // Dual card
        const colName = document.getElementById('lookback-col-name');
        if (colName) colName.textContent = item.name;

        const cosmicDesc = document.getElementById('lookback-cosmic-desc');
        if (cosmicDesc) cosmicDesc.textContent = item.cosmicDesc;

        const statDist = document.getElementById('lookback-stat-dist');
        if (statDist) statDist.textContent = item.statDist;

        const earthTime = document.getElementById('lookback-earth-time');
        if (earthTime) earthTime.textContent = item.earthTime;

        const earthDesc = document.getElementById('lookback-earth-desc');
        if (earthDesc) earthDesc.textContent = item.earthDesc;

        const statEra = document.getElementById('lookback-stat-era');
        if (statEra) statEra.textContent = item.era;

        // Update presets active class
        document.querySelectorAll('.lookback-preset-btn').forEach(btn => {
            const btnStep = parseInt(btn.dataset.step, 10);
            btn.classList.toggle('active', btnStep === clamped);
        });

        // Update ticks active class
        document.querySelectorAll('.lookback-ticks .tick').forEach(tick => {
            const tickStep = parseInt(tick.dataset.step, 10);
            tick.classList.toggle('active', tickStep === clamped);
        });
    }
};

/* ==========================================================================
   15. OBSERVATORY WINGS & FLOATING RAIL (ĐÀI QUAN SÁT 4 PHÂN KHU)
   ========================================================================== */
const ObservatoryWings = {
    init() {
        const rail = document.getElementById('observatory-rail');
        const railItems = document.querySelectorAll('.rail-item');
        const wings = document.querySelectorAll('.observatory-wing');
        if (!rail || wings.length === 0) return;

        // Toggle rail visibility based on scroll position (past hero)
        const checkRailVisibility = () => {
            if (window.scrollY > 350) {
                rail.classList.add('is-visible');
            } else {
                rail.classList.remove('is-visible');
            }
        };

        window.addEventListener('scroll', checkRailVisibility, { passive: true });
        checkRailVisibility();

        // Highlight active wing on scroll using IntersectionObserver
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const wingId = entry.target.id;
                    railItems.forEach(item => {
                        const href = item.getAttribute('href');
                        const isActive = href === `#${wingId}`;
                        item.classList.toggle('active', isActive);
                        if (isActive) {
                            item.setAttribute('aria-current', 'true');
                        } else {
                            item.removeAttribute('aria-current');
                        }
                    });
                }
            });
        }, {
            root: null,
            threshold: 0.15,
            rootMargin: '-10% 0px -40% 0px'
        });

        wings.forEach(w => observer.observe(w));
    }
};

/* ==========================================================================
   16. WING TABS MANAGER (ĐIỀU KHIỂN CHUYỂN TAB 4 PHÂN KHU)
   ========================================================================== */
const WingTabsManager = {
    init() {
        const tabBtns = document.querySelectorAll('.wing-tab-btn');
        if (tabBtns.length === 0) return;

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.wingTab;
                const masterCard = btn.closest('.wing-master-card');
                if (!masterCard || !targetTab) return;

                // Deactivate other buttons in this master card
                masterCard.querySelectorAll('.wing-tab-btn').forEach(b => {
                    const isTarget = b === btn;
                    b.classList.toggle('active', isTarget);
                    b.setAttribute('aria-selected', String(isTarget));
                });

                // Toggle panels in this master card
                masterCard.querySelectorAll('.wing-tab-panel').forEach(panel => {
                    const isTarget = panel.id === `panel-${targetTab}`;
                    if (isTarget) {
                        panel.style.display = 'block';
                        panel.classList.add('active');
                    } else {
                        panel.style.display = 'none';
                        panel.classList.remove('active');
                    }
                });

                // Specialized re-renders/adjustments on tab activation
                if (targetTab === 'deck-3d') {
                    window.dispatchEvent(new Event('resize'));
                } else if (targetTab === 'lab-lookback') {
                    if (window.LookbackTime) LookbackTime.setStep(LookbackTime.currentStep);
                } else if (targetTab === 'archive-studio') {
                    if (window.ConstellationStudio) ConstellationStudio.render();
                } else if (targetTab === 'lab-orbit') {
                    if (window.resetSimulation) window.resetSimulation();
                }
            });
        });

        this.checkInitialHash();
        window.addEventListener('hashchange', () => this.checkInitialHash());
    },

    activateTab(targetTab) {
        const btn = document.querySelector(`.wing-tab-btn[data-wing-tab="${targetTab}"]`);
        if (btn) btn.click();
    },

    checkInitialHash() {
        const hash = window.location.hash.replace('#', '');
        const hashMap = {
            'sa-ban-3d': 'deck-3d',
            'hanh-tinh': 'deck-3d',
            'tonights-sky': 'deck-sky',
            'nhat-ky': 'deck-journal',
            'light-journey': 'lab-light',
            'lookback-time': 'lab-lookback',
            'co-che': 'lab-orbit',
            'deepsky-grid': 'archive-gallery',
            'tinh-van': 'archive-gallery',
            'deep-space': 'archive-gallery',
            'constellation-studio': 'archive-studio',
            'field-notes': 'archive-field'
        };

        if (hashMap[hash]) {
            setTimeout(() => {
                this.activateTab(hashMap[hash]);
            }, 100);
        }
    }
};

/* ==========================================================================
   17. DEEP SKY ARCHIVE FILTER (BỘ LỌC KHO BÁU VŨ TRỤ SÂU)
   ========================================================================== */
const DeepSkyFilter = {
    init() {
        const btns = document.querySelectorAll('.deepsky-filter-btn');
        const cards = document.querySelectorAll('.deepsky-card');
        if (btns.length === 0 || cards.length === 0) return;

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                btns.forEach(b => b.classList.toggle('active', b === btn));

                cards.forEach(card => {
                    const cat = card.dataset.cat;
                    const show = (filter === 'all' || cat === filter);
                    card.classList.toggle('is-hidden', !show);
                });
            });
        });
    }
};

// Hook into DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    initTonightsSky();
    ConstellationStudio.init();
    LookbackTime.init();
    WingTabsManager.init();
    DeepSkyFilter.init();
    ObservatoryWings.init();
});
