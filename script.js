// === Basic utilities & initial state ===
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
    navToggle.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('show')));
}



// === On-scroll reveals & counters ===
const revealOnScroll = () => {
  document.querySelectorAll('.card, .demo-card, .proj-showcase, .skill-slab').forEach(el=>{
    const r = el.getBoundingClientRect();
    if(r.top < window.innerHeight - 80) el.classList.add('inview');
  });
  // counts
  document.querySelectorAll('.stat .num').forEach(n=>{
    if(n.dataset.animated) return;
    const r = n.getBoundingClientRect();
    if(r.top < window.innerHeight - 80){
      n.dataset.animated = "1";
      const target = parseInt(n.dataset.target || n.textContent || 0, 10);
      let cur = 0, step = Math.max(1, Math.floor(target/60));
      const run = ()=>{ cur += step; if(cur >= target) { n.textContent = target; } else { n.textContent = cur; requestAnimationFrame(run);} };
      run();
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// === Skill carousel auto-scroll & drag ===
const track = document.querySelector('.skill-track');
if(track){
  let pos = 0;
  let speed = 0.4; // px per tick
  let ticking = false;
  function tick(){
    pos -= speed;
    // wrap-around effect
    const w = track.scrollWidth;
    if(Math.abs(pos) >= w/2) pos = 0;
    track.style.transform = `translateX(${pos}px)`;
    requestAnimationFrame(tick);
  }
  // clone children to create infinite feeling
  const clones = Array.from(track.children).map(n => n.cloneNode(true));
  clones.forEach(c => track.appendChild(c));
  requestAnimationFrame(tick);

  // also allow hover to pause & mouse drag
  track.parentElement.addEventListener('mouseenter', ()=> speed = 0);
  track.parentElement.addEventListener('mouseleave', ()=> speed = 0.4);

  // drag
  let dragging=false, startX=0, startPos=0;
  track.addEventListener('pointerdown', e=>{ dragging=true; startX=e.clientX; startPos=pos; track.style.cursor='grabbing';});
  window.addEventListener('pointermove', e=>{ if(!dragging) return; pos = startPos + (e.clientX - startX); });
  window.addEventListener('pointerup', ()=>{ dragging=false; track.style.cursor='default'; });
}

// === Demo modal for certificates ===
const modal = document.getElementById('cert-modal');
const modalFrame = document.getElementById('cert-frame');
const closeBtn = document.getElementById('modal-close');
document.querySelectorAll('.view-cert').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const src = btn.dataset.src;
    if(!src) return;
    modalFrame.src = src;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
  });
});
if(closeBtn){
  closeBtn.addEventListener('click', ()=>{ modal.classList.remove('show'); modalFrame.src=''; modal.setAttribute('aria-hidden','true');});
}

// close modal clicking outside
modal && modal.addEventListener('click', (e)=>{ if(e.target === modal){ modal.classList.remove('show'); modalFrame.src=''; } });



// === Simple slides for projects carousel (if any) ===
const carTrack = document.getElementById('car-track');
const carPrev = document.getElementById('car-prev');
const carNext = document.getElementById('car-next');
if(carTrack && carPrev && carNext){
  let idx = 0;
  const slides = carTrack.children;
  function update(){ carTrack.style.transform = `translateX(${ - idx * slides[0].offsetWidth }px)`; }
  carNext.addEventListener('click', ()=>{ idx = (idx + 1) % slides.length; update();});
  carPrev.addEventListener('click', ()=>{ idx = (idx - 1 + slides.length) % slides.length; update();});
  window.addEventListener('resize', update);
}

// Show current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Initialize EmailJS
(function() {
    emailjs.init("zgJRL3rBBDlEWSIPp"); // ✅ Your Public Key
})();

// Handle form submit
document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const status = document.getElementById("form-status");
    status.textContent = "⏳ Sending...";
    status.style.color = "#ffc107"; // yellow while sending

    emailjs.sendForm("service_2ki0b65", "template_9x2lpfb", this)
        .then(() => {
            status.textContent = "✅ Message sent successfully!";
            status.style.color = "limegreen";

            // Clear form
            this.reset();

            // Auto-hide status after 5s
            setTimeout(() => {
                status.textContent = "";
            }, 5000);
        })
        .catch((err) => {
            status.textContent = "❌ Failed to send. Please try again.";
            status.style.color = "red";
            console.error("EmailJS Error:", err);

            setTimeout(() => {
                status.textContent = "";
            }, 5000);
        });
});




const achTrack = document.querySelector(".ach-track");
const achSlides = document.querySelectorAll(".ach-slide");
let achIndex = 0;

const achNext = document.querySelector(".ach-btn.next");
const achPrev = document.querySelector(".ach-btn.prev");

if (achNext && achPrev) {
  achNext.addEventListener("click", () => {
    achIndex = (achIndex + 1) % achSlides.length;
    achTrack.style.transform = `translateX(-${achIndex * 100}%)`;
  });

  achPrev.addEventListener("click", () => {
    achIndex = (achIndex - 1 + achSlides.length) % achSlides.length;
    achTrack.style.transform = `translateX(-${achIndex * 100}%)`;
  });
}





// Typing effect
const typingEl = document.getElementById("typing");
const roles = [
  "Aspiring Full Stack Developer",
  "Frontend Developer (React.js)",
  "Curious Mind • Problem Solver"
];
let r = 0, c = 0, deleting = false;

function typeLoop(){
  const current = roles[r];
  typingEl.textContent = current.slice(0, c);
  if(!deleting && c < current.length){ c++; setTimeout(typeLoop, 80); }
  else if(!deleting && c === current.length){ deleting = true; setTimeout(typeLoop, 1200); }
  else if(deleting && c > 0){ c--; setTimeout(typeLoop, 40); }
  else { deleting = false; r = (r+1) % roles.length; setTimeout(typeLoop, 200); }
}
typeLoop();

document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.getElementById("experience-carousel");
  if (!carousel) return;

  const track = carousel.querySelector(".xp-track");
  const slides = Array.from(track.children);
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  const indicators = carousel.querySelectorAll(".indicators .slide");

  let currentIndex = 0;

  function showSlide(index) {
    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;
    indicators.forEach((ind, i) => ind.classList.toggle("active", i === index));
    currentIndex = index;
  }

  prevBtn.addEventListener("click", () => {
    let newIndex = currentIndex - 1;
    if (newIndex < 0) newIndex = slides.length - 1;
    showSlide(newIndex);
  });

  nextBtn.addEventListener("click", () => {
    let newIndex = currentIndex + 1;
    if (newIndex >= slides.length) newIndex = 0;
    showSlide(newIndex);
  });

  indicators.forEach((ind, i) => {
    ind.addEventListener("click", () => showSlide(i));
  });

  track.style.display = "flex";
  slides.forEach(slide => slide.style.flex = "0 0 100%");
  showSlide(0);
});

(function(){
  const modal = document.getElementById('videoModal');
  const openBtns = document.querySelectorAll('.js-open-video');
  const closeBtn = modal.querySelector('.video-modal__close');

  function openVideo(){
    modal.classList.add('show');
    modal.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeVideo(){
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }

  openBtns.forEach(btn => btn.addEventListener('click', openVideo));
  closeBtn.addEventListener('click', closeVideo);
  modal.addEventListener('click', (e)=>{ if(e.target === modal) closeVideo(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape' && modal.classList.contains('show')) closeVideo(); });
})();
