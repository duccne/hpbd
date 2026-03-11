const messages = [
    "Chị là người phụ nữ tuyệt vời nhất em từng gặp! ❤️",
    "Tuổi mới chúc chị luôn xinh đẹp, hạnh phúc và thành công.",
    "Cảm ơn chị đã luôn ở bên cạnh và chiều chuộng em. 🥰",
    "Hôm nay chị hãy cứ làm công chúa, còn lại để em lo!",
    "Yêu chị nhiều hơn tất cả những gì em có thể nói! 🌹"
];

let messageIndex = 0;

function nextMessage() {
    const msgElement = document.getElementById('message');
    msgElement.style.opacity = 0;
    
    setTimeout(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        msgElement.innerText = messages[messageIndex];
        msgElement.style.opacity = 1;
        createFirework(); // Mỗi lần bấm nút sẽ nổ pháo hoa
    }, 300);
}

// Tạo hiệu ứng hạt bay (Tim, Sao, Hoa)
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const shapes = ['❤️', '✨', '🌸', '💖'];
    particle.innerHTML = shapes[Math.floor(Math.random() * shapes.length)];
    
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.fontSize = Math.random() * 20 + 10 + 'px';
    
    const destinationX = (Math.random() - 0.5) * 300;
    const destinationY = (Math.random() - 0.5) * 300;
    
    document.body.appendChild(particle);
    
    particle.animate([
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: `translate(${destinationX}px, ${destinationY}px)`, opacity: 0 }
    ], {
        duration: 1000 + Math.random() * 1000,
        easing: 'cubic-bezier(0, .9, .57, 1)'
    }).onfinish = () => particle.remove();
}

function createFirework() {
    for (let i = 0; i < 20; i++) {
        createParticle(window.innerWidth / 2, window.innerHeight / 2);
    }
}

// Mưa tim tự động
setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.innerHTML = '❤️';
    particle.style.left = x + 'px';
    particle.style.top = '-20px';
    document.body.appendChild(particle);
    
    particle.animate([
        { transform: 'translateY(0)', opacity: 1 },
        { transform: `translateY(${window.innerHeight}px)`, opacity: 0 }
    ], {
        duration: 3000 + Math.random() * 2000
    }).onfinish = () => particle.remove();
}, 500);
