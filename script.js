// MENU HAMBURGER MOBILE
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.menu');
const navLinks = document.querySelectorAll('.menu li a');

hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

// PARALLAX HERO E FADE-IN
const parallaxBg = document.querySelector('.parallax-bg');
const faders = document.querySelectorAll('.fade-up');
const appearOptions = {
    threshold: 0.1
};

// Variáveis para a posição do mouse e do scroll
let scrollY = 0;
let mouseX = 0;
let mouseY = 0;

// Atualiza a posição do scroll
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    updateParallax();
});

// Atualiza a posição do mouse e do scroll
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
    updateParallax();
});

// Função para aplicar a transformação
function updateParallax() {
    const newTransform = `translate(${mouseX}px, ${mouseY}px) translateY(${scrollY * 0.3}px) scale(1.1)`;
    parallaxBg.style.transform = newTransform;
}

// FADE-IN AO SCROLL
const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

const faders = document.querySelectorAll('.fade-up');

faders.forEach(fader => appearOnScroll.observe(fader));