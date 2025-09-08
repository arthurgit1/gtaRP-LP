// Importando os módulos
import { loadHeader } from './loadHeader.js';  // Verifique se o caminho está correto
import { loadFooter } from './loadFooter.js';
import { setupHeader } from './header.js';
import { setupFaq } from './faq.js';
import { setupGalleryFilters } from './gallery.js';
import { setupStoreFilters } from './store.js';

document.addEventListener('DOMContentLoaded', function() {
    // Carregar o Header e Footer
    loadHeader();
    loadFooter();

    // Configurar o Header (scroll e menu hambúrguer)
    setupHeader();

    // Configurar o FAQ (mostrar/esconder respostas)
    setupFaq();

    // Configurar os Filtros da Galeria
    setupGalleryFilters();

    // Configurar os Filtros da Loja
    setupStoreFilters();
});

// Inicializar o Swiper para os planos
if (document.querySelector('.planos-slider')) {
    const planosSwiper = new Swiper('.planos-slider', {
        loop: true, 
        slidesPerView: 1, 
        spaceBetween: 20,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2, // 2 planos por vez em telas médias
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3, // 3 planos por vez em telas grandes
                spaceBetween: 40,
            },
        },
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    
    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('active'); // Adiciona ou remove a classe 'active'
        });
    }
});

