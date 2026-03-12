// 1. CẤU HÌNH THÔNG TIN (Bạn sửa ở đây)
// Đảm bảo biến này nằm ở đầu file
let currentInput = "";
const CORRECT_PASS = "1212"; // Thay bằng mã 4 số của bạn

function addNum(num) {
    console.log("Đã bấm số:", num); // Kiểm tra trong console xem máy có nhận lệnh không
    if (currentInput.length < 4) {
        currentInput += num;
        updateDots();
        
        if (currentInput.length === 4) {
            // Đợi một chút để người dùng thấy chấm thứ 4 rồi mới kiểm tra
            setTimeout(checkPass, 200);
        }
    }
}

function updateDots() {
    const dots = document.querySelectorAll('.dot-item');
    dots.forEach((dot, index) => {
        if (index < currentInput.length) {
            dot.classList.add('active');
            dot.innerText = "❤️"; 
        } else {
            dot.classList.remove('active');
            dot.innerText = ""; 
        }
    });
}

function checkPass() {
    if (currentInput === CORRECT_PASS) {
        // Phát nhạc ngay lập tức (File nhạc m4a của bạn)
        const music = document.getElementById('bg-music');
        if (music) music.play();
        
        document.getElementById('status-text').style.display = 'block';
        
        setTimeout(() => {
            document.getElementById('auth-screen').classList.add('hidden');
            document.getElementById('final-screen').classList.remove('hidden');
            startSurprise(); 
        }, 1000);
    } else {
        // Nếu sai: Báo lỗi và xóa trắng để nhập lại
        alert("Mật mã chưa đúng rồi chị ơi! 😜");
        currentInput = "";
        updateDots();
    }
}

function clearNum() {
    currentInput = "";
    updateDots();
}

// 2. CHUYỂN MÀN HÌNH
function showAuth() {
    console.log("Mở màn hình nhập mã");
    document.getElementById('gift-screen').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
}

// 3. LOGIC BÀN PHÍM
function addNum(num) {
    if (currentInput.length < 6) {
        currentInput += num;
        updatePassDisplay();
    }
}

function clearNum() {
    currentInput = "";
    updatePassDisplay();
}

function updatePassDisplay() {
    const display = document.querySelector('.heart-pass');
    if (currentInput.length === 0) {
        display.innerText = "....";
    } else {
        display.innerText = "❤️".repeat(currentInput.length);
    }
}

function checkPass() {
    if (currentInput === CORRECT_PASS) {
        const status = document.getElementById('status-text');
        status.style.display = 'block';
        
        // Phát nhạc ngay khi nhấn OK thành công
        const music = document.getElementById('bg-music');
        if (music) {
            music.currentTime = 0; // Chạy từ đầu đoạn nhạc
            music.play().catch(e => console.log("Lỗi phát nhạc:", e));
        }
        
        setTimeout(() => {
            document.getElementById('auth-screen').classList.add('hidden');
            document.getElementById('final-screen').classList.remove('hidden');
            startSurprise();
        }, 1200);
    } else {
        alert("Sai mật mã rồi chị ơi! 😜");
        clearNum();
    }
}

// 4. CÁC HIỆU ỨNG SAU KHI NHẬP ĐÚNG
function startSurprise() {
    setInterval(createHeartFly, 300);   // Trái tim bay từ dưới lên
    setInterval(createFirework, 600);   // Pháo hoa
    setInterval(createDenseWishes, 500); // Lời chúc bay ngang
    setInterval(createScrollingPhoto, 3000); // Ảnh chạy dọc
}

// Hiệu ứng trái tim bay (Giống mẫu hồng pastel)
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
    ], { duration: 4000 + Math.random() * 3000 });

    setTimeout(() => heart.remove(), 6000);
}

// Pháo hoa rực rỡ
function createFirework() {
    const firework = document.createElement('div');
    firework.className = 'flower'; 
    firework.innerHTML = '✨';
    firework.style.left = Math.random() * 100 + 'vw';
    firework.style.top = Math.random() * 100 + 'vh';
    firework.style.color = ['#ff4081', '#ffeb3b', '#00e676', '#29b6f6'][Math.floor(Math.random() * 4)];
    document.body.appendChild(firework);
    setTimeout(() => firework.remove(), 1000);
}

// Lời chúc ngẫu nhiên
function createDenseWishes() {
    const wishes = ["Chúc chị luôn xinh đẹp!", "Mãi hạnh phúc nhé!", "Tuổi mới rạng rỡ!", "Yêu chị rất nhiều! ❤️", "Luôn cười tươi nha!"];
    const wish = document.createElement('div');
    wish.className = 'floating-wish';
    wish.innerText = wishes[Math.floor(Math.random() * wishes.length)];
    wish.style.top = Math.random() * 80 + 10 + 'vh';
    wish.style.left = '-200px';
    document.body.appendChild(wish);

    wish.animate([
        { left: '-200px' },
        { left: '110vw' }
    ], { duration: 6000 + Math.random() * 4000 });

    setTimeout(() => wish.remove(), 10000);
}

// Ảnh chạy dọc (Scrolling Photo)
function createScrollingPhoto() {
    const img = document.createElement('img');
    img.className = 'scrolling-photo';
    img.src = PHOTO_URLS[Math.floor(Math.random() * PHOTO_URLS.length)];
    img.style.left = Math.random() * 80 + 10 + 'vw';
    img.style.top = '110vh';
    document.body.appendChild(img);

    img.animate([
        { top: '110vh' },
        { top: '-20vh' }
    ], { duration: 8000 });

    setTimeout(() => img.remove(), 8500);
}
