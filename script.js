const PASSWORD = "123"; // <-- Thay mật mã của bạn tại đây

function goToAuth() {
    document.getElementById('gift-screen').classList.add('hidden');
    document.getElementById('auth-screen').classList.remove('hidden');
}

function checkUnlock() {
    const input = document.getElementById('password-input').value;
    const music = document.getElementById('bg-music');
    
    if (input === PASSWORD) {
        document.getElementById('auth-screen').classList.add('hidden');
        document.getElementById('final-screen').classList.remove('hidden');
        music.play();
        startSurprise();
    } else {
        document.getElementById('error-msg').classList.remove('hidden');
    }
}

function startSurprise() {
    // 1. Tạo lời chúc chạy ngang
    const wishes = [
        "Chúc chị tuổi mới rực rỡ! ✨",
        "Mãi xinh đẹp và hạnh phúc nhé! 🌸",
        "Em yêu chị nhiều lắm! ❤️",
        "Cảm ơn chị đã luôn bên em! 🥰",
        "Hôm nay chị là tuyệt nhất! 👑"
    ];

    setInterval(() => {
        const text = wishes[Math.floor(Math.random() * wishes.length)];
        createFloatingText(text);
    }, 1000);

    // 2. Tạo hiệu ứng pháo hoa đơn giản
    setInterval(createFirework, 600);
}

function createFloatingText(content) {
    const el = document.createElement('div');
    el.className = 'floating-wish';
    el.innerText = content;
    el.style.top = Math.random() * 80 + 10 + 'vh';
    el.style.left = '-250px';
    el.style.fontSize = Math.random() * 0.5 + 1 + 'rem';
    document.body.appendChild(el);

    el.animate([
        { left: '-250px', opacity: 1 },
        { left: '110vw', opacity: 0.8 }
    ], {
        duration: 6000 + Math.random() * 3000,
        easing: 'linear'
    }).onfinish = () => el.remove();
}

function createFirework() {
    const f = document.createElement('div');
    f.innerHTML = '✨';
    f.style.position = 'absolute';
    f.style.left = Math.random() * 100 + 'vw';
    f.style.top = Math.random() * 80 + 'vh';
    f.style.fontSize = '20px';
    document.body.appendChild(f);
    
    f.animate([
        { transform: 'scale(0)', opacity: 1 },
        { transform: 'scale(2) rotate(180deg)', opacity: 0 }
    ], { duration: 1000 }).onfinish = () => f.remove();
}
