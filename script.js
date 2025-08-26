// MENU HAMBURGER MOBILE
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.menu');
hamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
});

// PARALLAX HERO
const parallaxBg = document.querySelector('.parallax-bg');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  parallaxBg.style.transform = `translate(${x}px, ${y}px) scale(1.1)`;
});
window.addEventListener('scroll', () => {
  const scroll = window.scrollY;
  parallaxBg.style.transform += ` translateY(${scroll*0.3}px)`;
});

// FADE-IN AO SCROLL
const faders = document.querySelectorAll('.fade-up');
const appearOptions = { threshold:0.1 };
const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);
faders.forEach(fader => appearOnScroll.observe(fader));
