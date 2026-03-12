// --- 1. CẤU HÌNH HỆ THỐNG ---
const CORRECT_PASS = "1212"; // Mật mã 4 số bạn chọn
let currentInput = "";

// Danh sách ảnh của chị (Bạn hãy thêm tên các file ảnh bạn có vào đây)
const PHOTO_URLS = [
    "anh-chi.jpg", 
    "anh1.jpg", 
    "anh2.jpg"
]; 

// --- 2. LOGIC GIAO DIỆN ---

// Hiển thị màn hình nhập mã khi bấm vào hộp quà
function showAuth() {
    document.getElementById('gift-screen').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
}

// Hàm xử lý khi bấm phím số
function addNum(num) {
    if (currentInput.length < 4) {
        currentInput += num;
        updateDots();
        
        // Tự động kiểm tra khi nhập đủ 4 số
        if (currentInput.length === 4) {
            setTimeout(checkPass, 300);
        }
    }
}

// Xóa trắng mật mã
function clearNum() {
    currentInput = "";
    updateDots();
}

// Cập nhật hiển thị 4 ô hình chữ nhật
function updateDots() {
    const dots = document.querySelectorAll('.dot-item');
    dots.forEach((dot, index) => {
        if (index < currentInput.length) {
            dot.classList.add('active');
            dot.innerText = "❤️"; // Hiện trái tim bên trong ô chữ nhật
        } else {
            dot.classList.remove('active');
            dot.innerText = ""; 
        }
    });
}

// Kiểm tra mật mã và kích hoạt bất ngờ
function checkPass() {
    if (currentInput === CORRECT_PASS) {
        // Phát đoạn nhạc m4a bạn đã gửi
        const music = document.getElementById('bg-music');
        if (music) {
            music.play().catch(e => console.log("Cần tương tác để phát nhạc"));
        }

        document.getElementById('status-text').classList.remove('hidden');

        setTimeout(() => {
            document.getElementById('auth-screen').classList.add('hidden');
            document.getElementById('final-screen').classList.remove('hidden');
            // Kích hoạt toàn bộ hiệu ứng cùng lúc
            startSurprise();
        }, 1200);
    } else {
        alert("Mật mã chưa đúng rồi chị ơi! 😜");
        clearNum();
    }
}

// --- 3. CÁC HÀM TẠO HIỆU ỨNG (CAO TRÀO) ---

function startSurprise() {
    setInterval(createHeartFly, 300);      // Trái tim bay từ dưới lên
    setInterval(createFirework, 500);      // Pháo hoa rực rỡ
    setInterval(createDenseWishes, 600);   // Lời chúc bay ngang
    setInterval(createScrollingPhoto, 2500); // Ảnh chị chạy dọc màn hình
}

// Hiệu ứng Trái tim bay
function createHeartFly() {
    const heart = document.createElement('div');
    heart.className = 'heart-fly';
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-20px';
    heart.style.fontSize = (Math.random() * 20 + 15) + 'px';
    document.body.appendChild(heart);

    heart.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: `translateY(-110vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], { duration: 4000 + Math.random() * 2000 });

    setTimeout(() => heart.remove(), 6000);
}

// Hiệu ứng Pháo hoa (Lấp lánh)
function createFirework() {
    const firework = document.createElement('div');
    firework.className = 'flower'; 
    firework.innerHTML = '✨';
    firework.style.left = Math.random() * 100 + 'vw';
    firework.style.top = Math.random() * 100 + 'vh';
    firework.style.color = ['#ff4081', '#ffeb3b', '#00e676', '#29b6f6'][Math.floor(Math.random() * 4)];
    firework.style.position = 'absolute';
    firework.style.zIndex = '50';
    document.body.appendChild(firework);
    setTimeout(() => firework.remove(), 1000);
}

// Hiệu ứng Lời chúc (Chạy thẳng, không bị dồn hàng)
function createDenseWishes() {
    const wishes = ["Chúc chị mãi xinh đẹp!", "Happy Birthday Chị Yêu! ❤️", "Luôn hạnh phúc nha chị!", "Mãi rạng rỡ như đóa hoa!", "Yêu chị rất nhiều! ✨"];
    const wish = document.createElement('div');
    wish.className = 'floating-wish';
    wish.innerText = wishes[Math.floor(Math.random() * wishes.length)];
    wish.style.top = (Math.random() * 80 + 10) + 'vh';
    wish.style.left = '-300px';
    document.body.appendChild(wish);

    wish.animate([
        { left: '-300px' },
        { left: '110vw' }
    ], { duration: 7000 + Math.random() * 3000 }).onfinish = () => wish.remove();
}

// Hiệu ứng Ảnh chị chạy dọc
function createScrollingPhoto() {
    const img = document.createElement('img');
    img.className = 'scrolling-photo';
    img.src = PHOTO_URLS[Math.floor(Math.random() * PHOTO_URLS.length)];
    img.style.left = (Math.random() * 80 + 5) + 'vw';
    img.style.top = '110vh';
    img.style.width = '120px'; 
    img.style.height = '120px';
    img.style.borderRadius = '20px'; // Bo góc hình chữ nhật cho ảnh đồng bộ
    img.style.objectFit = 'cover';
    img.style.border = '3px solid white';
    img.style.position = 'absolute';
    img.style.zIndex = '40';
    document.body.appendChild(img);

    img.animate([
        { top: '110vh' },
        { top: '-20vh' }
    ], { duration: 9000 }).onfinish = () => img.remove();
}
