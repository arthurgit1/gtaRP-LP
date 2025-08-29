// MENU HAMBURGER RESPONSIVO
const hamburger = document.getElementById('hamburger');
const menu = document.querySelector('.menu');
const navLinks = document.querySelectorAll('.menu li a');

// Adiciona ou remove a classe 'active' para abrir/fechar o menu
hamburger.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Fecha o menu ao clicar em um link de navegação
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

// EFEITO PARALLAX E FADE-IN AO SCROLL
const parallaxBg = document.querySelector('.parallax-bg');
const faders = document.querySelectorAll('.fade-up');
const appearOptions = {
    threshold: 0.1
};

// Variáveis para a posição do mouse e do scroll
let scrollY = 0;
let mouseX = 0;
let mouseY = 0;

// Atualiza a posição do scroll e chama a função de atualização
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
    updateParallax();
});

// Atualiza a posição do mouse e chama a função de atualização
document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
    updateParallax();
});

// Função que aplica a transformação no elemento do parallax
function updateParallax() {
    const newTransform = `translate(${mouseX}px, ${mouseY}px) translateY(${scrollY * 0.3}px) scale(1.1)`;
    parallaxBg.style.transform = newTransform;
}

// FADE-IN AO SCROLL com IntersectionObserver
const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Adiciona a classe 'show' para iniciar a transição
            entry.target.classList.add('show');
            // Deixa de observar o elemento para que a animação ocorra apenas uma vez
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

// Observa cada elemento com a classe 'fade-up'
faders.forEach(fader => appearOnScroll.observe(fader));

// INICIALIZAÇÃO DO CARROSSEL DE PLANOS
const planosSlider = new Swiper('.planos-slider', {
    // Opções
    loop: true, // O carrossel volta ao início quando chega ao fim
    spaceBetween: 30, // Espaço entre os slides
    grabCursor: true, // Mostra o cursor de "agarrar"

    // Define quantos slides são mostrados dependendo do tamanho da tela
    breakpoints: {
        // quando a tela for >= 0px
        0: {
            slidesPerView: 1,
        },
        // quando a tela for >= 768px
        768: {
            slidesPerView: 2,
        },
        // quando a tela for >= 1024px
        1024: {
            slidesPerView: 3,
        }
    },

    // Setas de navegação
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});