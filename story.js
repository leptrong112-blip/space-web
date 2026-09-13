let currentScene = 0;
try { const saved = Number(localStorage.getItem('phuc.story.chapter')); if (Number.isInteger(saved) && saved >= 0 && saved <= 5) currentScene = saved; } catch {}
const slides = document.querySelectorAll('.bg-slide');
const scenes = document.querySelectorAll('.scene');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

const bgMusic = document.getElementById('bg-music');
let isMusicPlaying = false;
let storySoundEnabled = false;
document.getElementById('story-sound').addEventListener('click', () => {
    storySoundEnabled = !storySoundEnabled;
    const button = document.getElementById('story-sound');
    button.setAttribute('aria-pressed', String(storySoundEnabled));
    button.textContent = storySoundEnabled ? 'Âm thanh: bật' : 'Âm thanh: tắt';
    if (storySoundEnabled) {
        playMusic();
    } else {
        if (window.SpaceAudio) window.SpaceAudio.stopAmbient();
        if (bgMusic) bgMusic.pause();
        isMusicPlaying = false;
    }
});
document.getElementById('story-restart').addEventListener('click', () => { if (nextBtn.disabled) return; currentScene = 0; updateScene(); });
const hudLoc = document.getElementById('hud-loc');
const hudSpeed = document.getElementById('hud-speed');
const hudStatus = document.getElementById('hud-status');

// 🌟 CẬP NHẬT: Thêm entry cho Cảnh 0 (6 entry tổng cộng)
const hudData = [
    { loc: "TRẠM ĐIỀU KHIỂN Pioneer", speed: "N/A", status: "ONLINE" }, // Cảnh 0
    { loc: "TRÁI ĐẤT", speed: "0 KM/S", status: "KHỞI ĐỘNG" },
    { loc: "QUỸ ĐẠO THẤP", speed: "28,000 KM/H", status: "RỜI BỆ PHÓNG" },
    { loc: "HỆ SAO MỘC", speed: "108,000 KM/H", status: "CHUẨN BỊ WARP" }, 
    { loc: "RÌA NGÂN HÀ", speed: "VẬN TỐC ÁNH SÁNG", status: "BƯỚC NHẢY THÀNH CÔNG" },
    { loc: "VÙNG TỐI M87", speed: "LỰC HÚT VÔ HẠN", status: "CẢNH BÁO: RƠI VÀO HỐ ĐEN" } // Cảnh 5
];

let typeWriterInterval; 

// ==========================================
// 🔴 KHỞI TẠO SAO MỘC 3D VÀ 5000 NGÔI SAO
// ==========================================
let jupiterScene, jupiterCamera, jupiterRenderer, jupiterMesh;
let isWarping = false; 

function initJupiter3D() {
    // GIỮ NGUYÊN ID CỦA ÔNG
    const container = document.getElementById('jupiter-3d-container');
    
    if (!container) return; 

    jupiterScene = new THREE.Scene();
    jupiterCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 5000);
    jupiterCamera.position.set(0, 0, 16); 

    jupiterRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    jupiterRenderer.setSize(window.innerWidth, window.innerHeight);
    jupiterRenderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(jupiterRenderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    jupiterScene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
    dirLight.position.set(5, 3, 5);
    jupiterScene.add(dirLight);

    const texLoader = new THREE.TextureLoader();
    texLoader.crossOrigin = "Anonymous";
    texLoader.load('Images/sao mộc.jpg', (texture) => {
        const geo = new THREE.SphereGeometry(4.5, 64, 64);
        const mat = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.7 });
        jupiterMesh = new THREE.Mesh(geo, mat);
        jupiterMesh.rotation.y = Math.PI * 1.3;
        jupiterScene.add(jupiterMesh);
    });

    const starGeo = new THREE.BufferGeometry();
    const starCount = 5000;
    const posArray = new Float32Array(starCount * 3);
    for(let i = 0; i < starCount; i++) {
        posArray[i*3] = (Math.random() - 0.5) * 2000; 
        posArray[i*3+1] = (Math.random() - 0.5) * 2000; 
        posArray[i*3+2] = (Math.random() - 0.5) * 3000; 
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const starMat = new THREE.PointsMaterial({ size: 1.5, color: 0xffffff, transparent: true, opacity: 0.8 });
    const stars = new THREE.Points(starGeo, starMat);
    jupiterScene.add(stars);

    animateJupiter();
}

function animateJupiter() {
    requestAnimationFrame(animateJupiter);
    if (jupiterMesh && !isWarping) jupiterMesh.rotation.y += 0.001; 
    if (isWarping) {
        jupiterCamera.position.z += 15; 
        jupiterCamera.rotation.z -= 0.015; 
        if (jupiterCamera.fov < 140) {
            jupiterCamera.fov += 2.5; 
            jupiterCamera.updateProjectionMatrix();
        }
    }
    jupiterRenderer.render(jupiterScene, jupiterCamera);
}
initJupiter3D(); 
// ==========================================

function updateScene() {
    try { localStorage.setItem('phuc.story.chapter', String(currentScene)); } catch {}
    document.querySelector('.bg-slide.active').classList.remove('active');
    document.querySelector('.scene.active').classList.remove('active');
    document.querySelector('.dot.active').classList.remove('active');

    slides[currentScene].classList.add('active');
    scenes[currentScene].classList.add('active');
    dots[currentScene].classList.add('active');

    hudLoc.innerText = "LOC: " + hudData[currentScene].loc;
    hudSpeed.innerText = "SPD: " + hudData[currentScene].speed;
    hudStatus.innerText = "SYS: " + hudData[currentScene].status;

    typeWriterEffect(currentScene);
    const chapterNotes = [
        'Một câu chuyện khoa học viễn tưởng. Chương đang đọc được ghi nhớ trên trình duyệt này.',
        'Góc quan sát: Trái Đất là điểm xuất phát để chúng ta đo khoảng cách và tìm kiếm sự sống ngoài kia.',
        'Góc quan sát: lên quỹ đạo không có nghĩa là hết lực hấp dẫn; phi thuyền vẫn đang rơi quanh Trái Đất.',
        'Góc quan sát: bước nhảy warp trong câu chuyện là tưởng tượng, chưa phải công nghệ du hành hiện có.',
        'Góc quan sát: hình nền là minh họa một thiên hà nhìn từ bên ngoài, không phải ảnh chụp toàn cảnh Ngân Hà của chúng ta.',
        'Góc quan sát: M87* ở một thiên hà khác, không nằm ở rìa Ngân Hà. Chuyến đi này nối các điểm đến bằng trí tưởng tượng.'
    ];
    let note = scenes[currentScene].querySelector('.chapter-note');
    if (!note) { note = document.createElement('p'); note.className = 'chapter-note'; scenes[currentScene].appendChild(note); }
    note.textContent = chapterNotes[currentScene];

    prevBtn.disabled = currentScene === 0;

    // 🌟 SỬA INDEXKiểm tra Reset Sao Mộc: Sao Mộc giờ là Cảnh 3 (index 3)
    if (currentScene !== 3) {
        isWarping = false;
        if (typeof jupiterCamera !== 'undefined') {
            jupiterCamera.position.set(0, 0, 16);
            jupiterCamera.rotation.z = 0;
            jupiterCamera.fov = 45;
            jupiterCamera.updateProjectionMatrix();
        }
    }

    // 🌟 CẬP NHẬT: Logic nút bấm theo Cảnh 0 và Cảnh Cuối
    if (currentScene === scenes.length - 1) { // MÀN END
        nextBtn.innerHTML = "🔥 THOÁT HIỂM KHẨN CẤP 🔥";
        nextBtn.style.borderColor = "#ff3366";
        nextBtn.style.color = "#ff3366";
        nextBtn.style.boxShadow = "0 0 15px rgba(255, 51, 102, 0.5)";
        nextBtn.onclick = () => { triggerBlackHoleEnd(); }; 
    } else if (currentScene === 4) { // NGÂN HÀ
        nextBtn.innerHTML = "Tiến Vào Vùng Tối &#10095;";
        nextBtn.style.borderColor = "rgba(255,255,255,0.3)"; 
        nextBtn.style.color = "#fff";
        nextBtn.style.boxShadow = "none";
        nextBtn.onclick = () => { playMusic(); changeScene(1); };
    } else if (currentScene === 0) { // CẢNH 0
        nextBtn.innerHTML = "BẮT ĐẦU CHƯƠNG 1 &#10095;";
        nextBtn.style.borderColor = "#7fe7ff";
        nextBtn.style.color = "#7fe7ff";
        nextBtn.style.boxShadow = "0 0 10px #7fe7ff";
        nextBtn.onclick = () => { playMusic(); changeScene(1); };
    } else { // Cảnh thường
        nextBtn.innerHTML = "Tiếp tục &#10095;";
        nextBtn.style.borderColor = "rgba(255,255,255,0.3)"; 
        nextBtn.style.color = "#fff";
        nextBtn.style.boxShadow = "none";
        nextBtn.onclick = () => { playMusic(); changeScene(1); };
    } // Hiện nút 3D từ Chương 1 trở đi
    const btn3D = document.getElementById('btn-view-3d');
    if (btn3D) {
        if (currentScene > 0) btn3D.style.display = 'block';
        else btn3D.style.display = 'none';
    }
}

function typeWriterEffect(index) {
    const pTag = scenes[index].querySelector('.typewriter');
    const fullText = pTag.getAttribute('data-text');
    
    // Rút phích cắm máy chữ cũ, gọi "Máy Chữ Bất Tử" (typeWriter) ở dưới lên xài!
    typeWriter(pTag, fullText, null, 30);
}
// ==========================================
// ĐIỀU KHIỂN CHUYỂN CẢNH (KÈM KĨ XẢO CHE LAG)
// ==========================================
function changeScene(direction) {
    if (nextBtn.disabled) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
        currentScene = Math.max(0, Math.min(scenes.length - 1, currentScene + direction)); updateScene(); return;
    }
    // 🌟 Kĩ xảo 1: Warp Speed từ Cảnh 3 -> 4 (Chớp trắng)
    if (currentScene === 3 && direction === 1) {
        isWarping = true; 
        if (window.SpaceAudio) window.SpaceAudio.playWarp();
        nextBtn.innerHTML = "BƯỚC NHẢY KHÔNG GIAN...";
        nextBtn.disabled = true; prevBtn.disabled = true;

        const storyContent = document.getElementById('story-content');
        if (storyContent) storyContent.style.opacity = '0';

        const flash = document.createElement('div');
        flash.style.cssText = 'position:fixed; inset:0; background:#fff; opacity:0; z-index:99999; transition:opacity 0.4s ease-in; pointer-events:none;';
        document.body.appendChild(flash);

        setTimeout(() => { flash.style.opacity = '1'; }, 1800);

        setTimeout(() => {
            currentScene += direction;
            updateScene();
            
            nextBtn.disabled = false; prevBtn.disabled = false;
            if (storyContent) storyContent.style.opacity = '1';
            flash.style.transition = 'opacity 1s ease-out';
            flash.style.opacity = '0';
            setTimeout(() => flash.remove(), 1000);
        }, 2200); 
        return; 
    }

    // 🌑 Kĩ xảo 2: Fade to Black từ Cảnh 4 -> 5 (Che giật/lag khi load Hố Đen)
    if (currentScene === 4 && direction === 1) {
        nextBtn.innerHTML = "ĐANG TIẾN VÀO VÙNG TỐI...";
        nextBtn.disabled = true; prevBtn.disabled = true;

        // 1. Tạm ẩn UI
        const storyContent = document.getElementById('story-content');
        if (storyContent) storyContent.style.opacity = '0';

        // 2. Kéo màn đen xuống từ từ
        const darkFade = document.createElement('div');
        darkFade.style.cssText = 'position:fixed; inset:0; background:#000; opacity:0; z-index:99999; transition:opacity 1s ease-in; pointer-events:none;';
        document.body.appendChild(darkFade);

        // Bắt đầu chìm vào bóng tối
        setTimeout(() => { darkFade.style.opacity = '1'; }, 100);

        // 3. Tráo cảnh Hố Đen ở "hậu trường" lúc màn hình đang đen thui (Giấu đi sự lag)
        setTimeout(() => {
            currentScene += direction;
            updateScene(); 
            
            nextBtn.disabled = false; prevBtn.disabled = false;

            // 4. Mở mắt ra thấy Hố Đen mượt mà
            if (storyContent) storyContent.style.opacity = '1';
            darkFade.style.transition = 'opacity 1.5s ease-out';
            darkFade.style.opacity = '0';
            
            setTimeout(() => darkFade.remove(), 1600);
        }, 1200); 
        return;
    }

    // CÁC CẢNH BÌNH THƯỜNG (1->2, 2->3, v.v...)
    let newScene = currentScene + direction;
    if (newScene >= 0 && newScene < scenes.length) {
        currentScene = newScene;
        updateScene();
    }
}

function setScene(index) {
    if (nextBtn.disabled) return;
    playMusic();
    currentScene = index;
    updateScene();
}

function playMusic() {
    if (!storySoundEnabled) return;
    if (window.SpaceAudio) {
        window.SpaceAudio.startAmbient(0.35);
        isMusicPlaying = true;
        return;
    }
    if (typeof isMusicPlaying !== 'undefined' && !isMusicPlaying) {
        if (typeof bgMusic !== 'undefined') {
            bgMusic.volume = 0.5; 
            bgMusic.play().catch(() => {
                isMusicPlaying = false; storySoundEnabled = false;
                const button = document.getElementById('story-sound');
                button.textContent = 'Thử lại âm thanh'; button.setAttribute('aria-pressed', 'false');
            });
        }
        isMusicPlaying = true;
    }
}

// ==========================================
// 💥 SỰ KIỆN TẬN THẾ: MIXING ÂM THANH FADE IN/OUT
// ==========================================
function triggerBlackHoleEnd() {
    if (window.SpaceAudio) window.SpaceAudio.stopAmbient();
    // 1. Rung lắc & Tắt UI
    document.body.classList.add('shaking');
    document.getElementById('story-content').style.opacity = '0';
    document.querySelector('.controls').style.opacity = '0';
    document.getElementById('hud-overlay').style.opacity = '0';
    
    const blackholeBg = document.getElementById('blackhole-bg');
    if (blackholeBg) blackholeBg.classList.add('sucked-in');
    
    // 🎵 2. ĐẠO DIỄN ÂM THANH (FADE IN)
    const blackHoleSuckSound = new Audio('Audio/soundreality-riser-hole.m4a'); // <--- SỬA TÊN FILE Ở ĐÂY
    blackHoleSuckSound.volume = 0; // Bắt đầu ở mức 0
    blackHoleSuckSound.play().catch(e => console.log('Trình duyệt chặn autoplay'));

    // Tăng dần âm lượng mỗi 100ms (Cảm giác nguy hiểm ập tới)
    let fadeIn = setInterval(() => {
        if (blackHoleSuckSound.volume < 0.9) {
            blackHoleSuckSound.volume += 0.1;
        } else {
            clearInterval(fadeIn);
        }
    }, 100);

    // Bóp méo nhạc nền hiện tại
    if (typeof bgMusic !== 'undefined') bgMusic.playbackRate = 0.15; 
    
    // 3. CHUYỂN CẢNH BÓNG TỐI (Sau 3.5s)
    setTimeout(() => {
        document.body.classList.remove('shaking');
        document.getElementById('end-screen').classList.add('visible');
        if (typeof bgMusic !== 'undefined') bgMusic.pause(); 
        
        // 🎵 FADE OUT: Giảm dần âm thanh hố đen khi rơi vào màn đêm
        let fadeOut = setInterval(() => {
            if (blackHoleSuckSound.volume > 0.05) {
                blackHoleSuckSound.volume -= 0.05; // Nhỏ dần đều
            } else {
                blackHoleSuckSound.pause(); // Tắt hẳn
                clearInterval(fadeOut);
            }
        }, 200); // Quá trình tắt hẳn mất khoảng 4 giây, vừa kịp lúc gõ chữ

        const textEn = document.getElementById('end-text-en');
        const textVn = document.getElementById('end-text-vn');
        const respawnBtn = document.getElementById('respawn-btn');
        
        // Gõ chữ từ từ trong lúc âm thanh đang nhỏ dần...
        typeWriterSub(textEn, "Everything you know... ", () => {
            setTimeout(() => {
                textEn.innerHTML += "<strong style='color:#ff3366; text-shadow: 0 0 30px #ff3366;'>GONE.</strong>";
                textVn.innerHTML = "Mọi thứ bạn từng biết... đã biến mất.";
                textVn.style.opacity = '1';
                
                setTimeout(() => {
                    textEn.style.opacity = '0';
                    textVn.style.opacity = '0';
                    
                    setTimeout(() => {
                        textEn.innerHTML = "";
                        textVn.innerHTML = "";
                        textEn.style.opacity = '1';
                        
                        typeWriterSub(textEn, "But... something remains.", () => {
                            textVn.innerHTML = "Nhưng... vẫn còn điều gì đó tồn tại.";
                            textVn.style.opacity = '1';
                            
                            setTimeout(() => {
                                respawnBtn.classList.add('visible');
                                setTimeout(() => {
                                    const sig = document.querySelector('.personal-signature-end');
                                    if(sig) sig.classList.add('visible');
                                }, 3000);
                            }, 1500);
                        });
                    }, 2000); 
                }, 3500); 
            }, 800);
        });

    }, 3500);
}

// ==========================================
// 🧠 MÁY CHỮ "CƠ HỌC" SIÊU NHẸ (CHỐNG SẬP TRÌNH DUYỆT 100%)
// ==========================================
let typingTimeout;

function typeWriter(element, text, callback, speed = 35) {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) { element.innerHTML = text; if (callback) callback(); return; }
    if (typingTimeout) clearTimeout(typingTimeout); 
    
    let i = 0;
    let currentHTML = "";

    function type() {
        if (i < text.length) {
            let char = text.charAt(i);
            currentHTML += char;
            i++;

            // Dùng vòng lặp quét trọn thẻ HTML siêu nhanh, không gây tràn bộ nhớ RAM
            if (char === '<') {
                while (i < text.length && text.charAt(i) !== '>') {
                    currentHTML += text.charAt(i);
                    i++;
                }
                if (i < text.length) {
                    currentHTML += text.charAt(i); // Nạp nốt dấu '>'
                    i++;
                }
            }

            element.innerHTML = currentHTML + '<span class="cursor">|</span>';
            typingTimeout = setTimeout(type, speed);
        } else {
            // Chốt hạ khi gõ xong
            element.innerHTML = text; 
            if (callback) callback();
        }
    }
    
    type();
}

const typeWriterSub = typeWriter; // Đồng bộ cho Hố Đen

// ==========================================
// ĐẠO DIỄN NHỊP ĐỘ KHI MỚI VÀO STORY MODE (FIX LỖI NÚT TÀNG HÌNH)
// ==========================================
window.onload = () => {
    const entryOverlay = document.getElementById('story-entry-overlay');
    
    // 1. Cho màn đen từ từ sáng lên
    if (entryOverlay) {
        setTimeout(() => {
            entryOverlay.style.opacity = '0';
            // Dọn rác
            setTimeout(() => { entryOverlay.style.display = 'none'; }, 2000);
        }, 500);
    }

    // 2. Nạp dữ liệu Cảnh 0 ngay lập tức để nút bấm hiện chữ
    updateScene();
};
// ==========================================
// 🚀 HỆ THỐNG PHÒNG QUAN SÁT 3D (STORY MODE)
// ==========================================
let story3DScene, story3DCamera, story3DRenderer, currentModel;
let storyControls; // Thêm biến lưu tay cầm điều khiển
let isStory3DActive = false;
let animationId;

function initStory3D() {
    const container = document.getElementById('story-3d-container');
    if (!container || story3DRenderer) return; 

    story3DScene = new THREE.Scene();
    story3DCamera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    story3DCamera.position.set(0, 0, 15);

    story3DRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    story3DRenderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(story3DRenderer.domElement);

    story3DScene.add(new THREE.AmbientLight(0xffffff, 0.2));
    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(5, 3, 5);
    story3DScene.add(dirLight);

    // KÍCH HOẠT TAY CẦM XOAY BẰNG CHUỘT
    if (typeof THREE.OrbitControls !== 'undefined') {
        storyControls = new THREE.OrbitControls(story3DCamera, story3DRenderer.domElement);
        storyControls.enableDamping = true; // Tạo quán tính quay mượt như game
        storyControls.dampingFactor = 0.05;
        storyControls.enablePan = false; // Chống trượt mô hình ra ngoài
    }
}

function animateStory3D() {
    if (!isStory3DActive) return;
    animationId = requestAnimationFrame(animateStory3D);
    
    // Nếu để yên thì mô hình tự quay siêu chậm rãi
    if (currentModel) currentModel.rotation.y += 0.002; 
    
    // Cập nhật tay cầm để chuột xoay được
    if (storyControls) storyControls.update(); 
    
    story3DRenderer.render(story3DScene, story3DCamera);
}

// ... (Các hàm openStory3D, closeStory3D, loadModelForScene ở dưới ông cứ GIỮ NGUYÊN nhé) ...

// HÀM MỞ PHÒNG QUAN SÁT
window.openStory3D = function() {
    const overlay = document.getElementById('story-3d-overlay');
    overlay.classList.add('active'); // Kéo rèm trượt qua
    isStory3DActive = true;
    
    initStory3D();
    loadModelForScene(currentScene);
    animateStory3D();
}

// HÀM ĐÓNG PHÒNG QUAN SÁT
window.closeStory3D = function() {
    const overlay = document.getElementById('story-3d-overlay');
    overlay.classList.remove('active'); // Trượt trả rèm về
    isStory3DActive = false;
    cancelAnimationFrame(animationId);
}

// ĐẠO DIỄN LOAD MÔ HÌNH THEO CHƯƠNG
function loadModelForScene(index) {
    if (currentModel) story3DScene.remove(currentModel); // Dọn mô hình cũ

    const texLoader = new THREE.TextureLoader();
    let geo = new THREE.SphereGeometry(4, 64, 64);
    let mat;

    // Tùy biến theo Chương
    if (index === 1) { 
        // Chương 1: Trái Đất
        mat = new THREE.MeshStandardMaterial({ map: texLoader.load('Images/trái đất.jpg') });
        currentModel = new THREE.Mesh(geo, mat);
    } 
    else if (index === 2) { 
        // Chương 2: Mặt Trăng (Quỹ đạo)
        mat = new THREE.MeshStandardMaterial({ map: texLoader.load('Images/mặt trăng.jpg') });
        currentModel = new THREE.Mesh(geo, mat);
    } 
    else if (index === 3) { 
        // Chương 3: Sao Mộc
        mat = new THREE.MeshStandardMaterial({ map: texLoader.load('Images/sao mộc.jpg') });
        currentModel = new THREE.Mesh(geo, mat);
    } 
    else if (index === 4) { 
        // Chương 4: Rìa ngân hà / Ngoại hành tinh
        mat = new THREE.MeshStandardMaterial({ map: texLoader.load('Images/Kepler-22b.jpg') });
        currentModel = new THREE.Mesh(geo, mat);
    } 
    else if (index === 5) { 
        // Chương 5: Siêu Hố Đen (Vẽ Lõi đen + Vòng sáng)
        mat = new THREE.MeshBasicMaterial({ color: 0x000000 }); // Lõi đen thui
        const blackHoleCore = new THREE.Mesh(geo, mat);
        
        // Vòng đĩa bồi tụ rực lửa
        const ringGeo = new THREE.RingGeometry(4.5, 7, 64);
        const ringMat = new THREE.MeshBasicMaterial({ color: 0xff3366, side: THREE.DoubleSide, transparent: true, opacity: 0.8 });
        const accretionDisk = new THREE.Mesh(ringGeo, ringMat);
        accretionDisk.rotation.x = Math.PI / 2.2; // Nghiêng vòng đĩa

        currentModel = new THREE.Group();
        currentModel.add(blackHoleCore);
        currentModel.add(accretionDisk);
    }

    if (currentModel) story3DScene.add(currentModel);
}
