'use strict';

/**
 * Initialize AOS (Animate On Scroll)
 */
if (typeof window.AOS !== 'undefined') {
    window.AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 50
    });
}

/**
 * 2026 KONECTA MODERN INTERACTIONS
 */

/* =========================================
   1. FLOATING NAVBAR SCROLL EFFECT
   ========================================= */
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", function () {
  // Add shrinking effect to navbar on scroll
  const navPill = document.querySelector(".navbar-pill");
  if (window.scrollY >= 50) {
    header.style.top = "10px";
    if(navPill) {
        navPill.style.maxWidth = "750px";
        navPill.style.background = "rgba(10, 12, 10, 0.95)";
    }
  } else {
    header.style.top = "32px"; // var(--space-md)
    if(navPill) {
        navPill.style.maxWidth = "900px";
        navPill.style.background = "rgba(20, 24, 20, 0.85)";
    }
  }

  // Active Link Highlighting based on scroll position
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});


/* =========================================
   2. BENTO GRID TILT EFFECT (Micro-interaction)
   ========================================= */
const bentoItems = document.querySelectorAll('.bento-item');

bentoItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Very subtle tilt
        const xPercent = (x / rect.width - 0.5) * 4;
        const yPercent = (y / rect.height - 0.5) * -4;

        item.style.transform = `perspective(1000px) rotateX(${yPercent}deg) rotateY(${xPercent}deg) translateY(-4px)`;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)`;
    });
});


/* =========================================
   3. AI MENTOR CHAT SIMULATION
   ========================================= */
const aiToggleBtn = document.getElementById("aiToggleBtn");
const aiChatPanel = document.getElementById("aiChatPanel");
const closeAiChat = document.getElementById("closeAiChat");
const aiChatBody = document.getElementById("aiChatBody");
const aiInput = document.getElementById("aiInput");
const aiSendBtn = document.getElementById("aiSendBtn");

let isChatOpen = false;

// Pre-programmed AI Responses for simulation
const aiResponses = [
    "Itu pertanyaan yang bagus! Untuk menguasai itu, fokus pada konsep DOM Manipulation.",
    "Berdasarkan analisis skill Anda, saya menyarankan untuk mengambil kelas Web Development kita.",
    "Dalam Cybersecurity, konsep 'Zero Trust' sangat penting di tahun 2026 ini. Mau saya jelaskan lebih detail?",
    "Error itu biasanya terjadi karena variabel belum di-inisialisasi. Coba cek console browser Anda.",
    "Sistem AI Konecta mendeteksi Anda cocok belajar React. Apakah Anda ingin mencoba modulnya?"
];

function toggleChat() {
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
        aiChatPanel.classList.add("active");
        aiToggleBtn.innerHTML = '<ion-icon name="close-outline"></ion-icon>';
        setTimeout(() => aiInput.focus(), 300);
    } else {
        aiChatPanel.classList.remove("active");
        aiToggleBtn.innerHTML = '<ion-icon name="logo-electron"></ion-icon>';
    }
}

if(aiToggleBtn && closeAiChat) {
    aiToggleBtn.addEventListener("click", toggleChat);
    closeAiChat.addEventListener("click", () => {
        if (isChatOpen) toggleChat();
    });
}

// Handling Send Message
function handleSendMessage() {
    if(!aiInput) return;
    const text = aiInput.value.trim();
    if (!text) return;

    // 1. Add User Message
    addMessage(text, 'user');
    aiInput.value = '';

    // 2. Add Loading Indicator
    const loadingId = addLoadingMessage();

    // Scroll to bottom
    scrollToBottom();

    // 3. Simulate AI Thinking and Response
    setTimeout(() => {
        removeMessage(loadingId);

        // Pick random response
        const randomReply = aiResponses[Math.floor(Math.random() * aiResponses.length)];
        addMessage(randomReply, 'system');

        scrollToBottom();
    }, 1500 + Math.random() * 1000); // 1.5s - 2.5s thinking time
}

function addMessage(text, sender) {
    if(!aiChatBody) return;
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('ai-msg', sender);
    msgDiv.textContent = text;
    aiChatBody.appendChild(msgDiv);
}

function addLoadingMessage() {
    if(!aiChatBody) return null;
    const id = 'loading-' + Date.now();
    const msgDiv = document.createElement('div');
    msgDiv.id = id;
    msgDiv.classList.add('ai-msg', 'system', 'loading');
    msgDiv.innerHTML = `Menganalisis <span></span><span></span><span></span>`;
    aiChatBody.appendChild(msgDiv);
    return id;
}

function removeMessage(id) {
    const msg = document.getElementById(id);
    if (msg) msg.remove();
}

function scrollToBottom() {
    if(!aiChatBody) return;
    aiChatBody.scrollTop = aiChatBody.scrollHeight;
}

if(aiSendBtn && aiInput) {
    aiSendBtn.addEventListener("click", handleSendMessage);
    aiInput.addEventListener("keypress", (e) => {
        if (e.key === 'Enter') handleSendMessage();
    });
}

/* =========================================
   4. FAQ ACCORDION INTERACTION
   ========================================= */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    item.addEventListener('click', () => {
        // Optional: Close other open items
        /* faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        }); */

        // Toggle current item
        item.classList.toggle('active');
    });
});

/* =========================================
   5. MOBILE MENU TOGGLE LOGIC
   ========================================= */
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');

function toggleMobileMenu() {
    mobileMenuBtn.classList.toggle('active');
    mobileMenuOverlay.classList.toggle('active');
    
    // Prevent scrolling when menu is open
    if (mobileMenuOverlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeMobileMenu() {
    mobileMenuBtn.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

if(mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

// Close menu if links are clicked (redundant with inline onclick but safer)
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});
