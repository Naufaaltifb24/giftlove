// ===== GLOBAL STATE =====
let started = false;
let typingIndex = 0;
let typingInterval;
let heartInterval;

const typingText = "Aku Cayang Nanet Nanet Nanet Cama Yayang Cantiknya acu 🖤💖";

// ===== START FUNCTION =====
function start() {
    if (started) return;
    started = true;

    // MUSIC
    const music = document.getElementById("music");
    if (music) {
        music.play().catch(() => {
            console.log("Autoplay diblok browser");
        });
    }

    startTyping();
    startHearts();

    // POPUP LOVE
    setTimeout(() => {
        alert("I LOVE YOU 💖");
    }, 1500);
}

// ===== TYPING EFFECT =====
function startTyping() {
    const el = document.getElementById("typing");
    if (!el) return;

    clearInterval(typingInterval);
    typingIndex = 0;
    el.innerHTML = "";

    const cursor = document.createElement("span");
    cursor.innerHTML = "|";
    cursor.style.marginLeft = "5px";
    cursor.style.animation = "blinkCursor 1s infinite";
    el.appendChild(cursor);

    typingInterval = setInterval(() => {
        if (typingIndex < typingText.length) {
            el.insertBefore(
                document.createTextNode(typingText.charAt(typingIndex)),
                cursor
            );
            typingIndex++;
        } else {
            clearInterval(typingInterval);
        }
    }, 40);
}

// ===== HEART ANIMATION =====
function startHearts() {
    heartInterval = setInterval(() => {
        const heart = document.createElement("div");
        heart.innerHTML = "💖";
        heart.className = "heart";

        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 20 + 20 + "px";

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 5000);
    }, 400);
}

// ===== MATRIX EFFECT =====
const canvas = document.getElementById("matrix");

if (canvas) {
    const ctx = canvas.getContext("2d");

    let fontSize = 14;
    let columns;
    let drops;

    function setupMatrix() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        columns = Math.floor(canvas.width / fontSize);
        drops = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }
    }

    setupMatrix();

    const letters = "01LOVEYOU";

    function drawMatrix() {
        ctx.fillStyle = "rgba(0,0,0,0.06)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#ff4da6";
        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const char = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.96) {
                drops[i] = 0;
            }

            drops[i]++;
        }
    }

    setInterval(drawMatrix, 35);

    window.addEventListener("resize", setupMatrix);
}

// ===== GALLERY POPUP =====
document.querySelectorAll(".gallery img").forEach(img => {
    img.onclick = () => {
        const popup = document.getElementById("popup");
        const popupImg = document.getElementById("popup-img");

        if (popup && popupImg) {
            popup.style.display = "flex";
            popupImg.src = img.src;
        }
    };
});

function closePopup() {
    const popup = document.getElementById("popup");
    if (popup) popup.style.display = "none";
}