function checkPassword() {
    const passwordInput = document.getElementById('password-input').value;
    const secretCode = "vita"; 

    const overlay = document.getElementById('privacy-overlay');
    const content = document.getElementById('main-content');
    const errorMsg = document.getElementById('error-msg');

    if (passwordInput === secretCode) {
        errorMsg.style.display = "none";
        overlay.style.opacity = "0";

        setTimeout(() => {
            overlay.style.display = "none";
            content.style.opacity = "1";
            document.body.style.overflow = "auto";
            
            // Only run animation if the library loaded correctly
            if (window.Motion) {
                initBlurBio();
            }
            setTimeout(initEnjoyAnimation, 1000);
        }, 500);
    } else {
        errorMsg.style.display = "block";
    }
}

function initBlurBio() {
    // We grab 'animate' directly from window.Motion here
    const { animate } = window.Motion;
    const container = document.getElementById('blur-bio-text');
    if (!container) return;

    const rawText = container.innerText;
    container.innerHTML = '';
    const words = rawText.split(' ');
    
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'blur-word';
        container.appendChild(span);

        if (index < words.length - 1) {
            container.appendChild(document.createTextNode('\u00A0'));
        }

        animate(
            span,
            { 
                opacity: [0, 1], 
                filter: ['blur(10px)', 'blur(0px)'],
                y: [-30, 0] 
            },
            { 
                duration: 0.8, 
                delay: index * 0.06, 
                easing: [0.17, 0.67, 0.83, 0.67] 
            }
        );
    });
}

// Ensure event listeners are added after the page loads
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("password-input");
    if (input) {
        input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                checkPassword();
            }
        });
    }

    // --- TRAIL EFFECT (Completed) ---
    document.addEventListener('mousemove', function(e) {
        const container = document.getElementById('particles-container');
        if(!container) return;
        
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        particle.style.left = e.clientX + 'px';
        particle.style.top = e.clientY + 'px';
        
        const size = Math.random() * 5 + 2; 
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        container.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1000);
    });
});

function initEnjoyAnimation() {
    const enjoyText = document.getElementById('animate-enjoy');
    if (!enjoyText) return;

  
    const text = enjoyText.innerText;
    enjoyText.innerHTML = '';
    
    const chars = text.split('').map(char => {
        const span = document.createElement('span');
        span.innerText = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.willChange = 'transform, opacity';
        enjoyText.appendChild(span);
        return span;
    });

   
    gsap.fromTo(chars, 
        { 
            opacity: 0, 
            y: 40 
        }, 
        {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: enjoyText,
                start: "top 90%", 
                once: true
            },
            onComplete: () => {
                console.log('All letters have animated!');
            }
        }
    );
}
/* ... existing code (checkPassword, initBlurBio, etc.) ... */

// --- GALLERY AND LIGHTBOX INITIALIZATION ---
const targetValue = 149;
const container = document.getElementById('gallery-container'); // This defines 'container'
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.close-btn');

// 1. Generate Photos
for (let i = 1; i <= targetValue; i++) {
    const div = document.createElement('div');
    div.className = 'photo-item';
    const img = document.createElement('img');
    img.src = `Imgtr/${i}.jpg`;
    img.loading = "lazy";
    img.onerror = function() { this.parentElement.remove(); };
    div.appendChild(img);
    container.appendChild(div);
}

// 2. PASTE LIGHTBOX LOGIC HERE
container.addEventListener('click', (e) => {
    const clickedImg = e.target.closest('img');
    if (clickedImg) {
        lightbox.style.display = 'flex';
        setTimeout(() => lightbox.classList.add('active'), 10);
        lightboxImg.src = clickedImg.src;
    }
});

const closeLightbox = () => {
    lightbox.classList.remove('active');
    setTimeout(() => {
        lightbox.style.display = 'none';
        lightboxImg.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"; 
    }, 300);
};

if(closeBtn) closeBtn.onclick = closeLightbox;
if(lightbox) lightbox.onclick = (e) => { if (e.target === lightbox) closeLightbox(); };

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape" && lightbox.style.display === 'flex') closeLightbox();
});

// 3. Counter Animation (GSAP)
gsap.to("#count-up", {
    innerText: targetValue,
    duration: 2.5,
    ease: "power2.out",
    snap: { innerText: 1 },
    onUpdate: function() {
        const countUpEl = document.getElementById('count-up');
        if(countUpEl) countUpEl.innerHTML = Math.ceil(this.targets()[0].innerText);
    }
});