// --- 1. FAIRY DUST CURSOR LOGIC ---
(function fairyDustCursor() {
  var possibleColors = ["#D61C59", "#E7D84B", "#1B8798"];
  var cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  var particles = [];

  function init() {
    document.addEventListener('mousemove', (e) => {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
        addParticle(cursor.x, cursor.y, possibleColors[Math.floor(Math.random() * possibleColors.length)]);
    });
    loop();
  }

  function addParticle(x, y, color) {
    var particle = new Particle();
    particle.init(x, y, color);
    particles.push(particle);
  }

  function loop() {
    requestAnimationFrame(loop);
    for (var i = 0; i < particles.length; i++) particles[i].update();
    for (var i = particles.length - 1; i >= 0; i--) {
      if (particles[i].lifeSpan < 0) {
        particles[i].die();
        particles.splice(i, 1);
      }
    }
  }

  function Particle() {
    this.character = "*";
    this.lifeSpan = 120;
    this.init = function(x, y, color) {
      this.element = document.createElement('span');
      this.element.innerHTML = this.character;
      this.element.style.cssText = `position:absolute;display:block;pointer-events:none;z-index:10000000;font-size:16px;color:${color};will-change:transform;`;
      this.position = { x: x - 10, y: y - 20 };
      this.velocity = { x: (Math.random() < 0.5 ? -1 : 1) * (Math.random() / 2), y: 1 };
      
      const target = document.querySelector('.container');
      if (target) target.appendChild(this.element);
    };
    this.update = function() {
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      this.lifeSpan--;
      this.element.style.transform = `translate3d(${this.position.x}px,${this.position.y}px,0) scale(${this.lifeSpan / 120})`;
    };
    this.die = function() { if (this.element.parentNode) this.element.parentNode.removeChild(this.element); };
  }
  init();
})();

// --- 2. STAR GENERATOR ---
function generateStars(id, count) {
    const el = document.getElementById(id);
    if (!el) return;
    let shadows = [];
    for (let i = 0; i < count; i++) {
        shadows.push(`${Math.floor(Math.random() * 2000)}px ${Math.floor(Math.random() * 2000)}px #FFF`);
    }
    el.style.boxShadow = shadows.join(', ');
    const style = document.createElement('style');
    style.innerHTML = `#${id}:after { content: " "; position: absolute; top: 2000px; width: inherit; height: inherit; background: transparent; box-shadow: ${shadows.join(', ')}; }`;
    document.head.appendChild(style);
}
generateStars('stars', 600); generateStars('stars2', 200); generateStars('stars3', 100);

// --- 3. GALLERY & ANIMATION ---
const targetValue = 149;
const container = document.getElementById('gallery-container');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

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

gsap.to("#count-up", {
    innerText: targetValue,
    duration: 2.5,
    ease: "power2.out",
    snap: { innerText: 1 },
    onUpdate: function() {
        const el = document.getElementById('count-up');
        if (el) el.innerHTML = Math.ceil(this.targets()[0].innerText);
    }
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

setTimeout(() => { document.querySelectorAll('.photo-item').forEach(item => observer.observe(item)); }, 300);

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
    setTimeout(() => { lightbox.style.display = 'none'; }, 300);
};
lightbox.onclick = closeLightbox;
document.addEventListener('keydown', (e) => { if (e.key === "Escape") closeLightbox(); });