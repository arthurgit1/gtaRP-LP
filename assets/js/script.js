// Importando módulos para carregar o cabeçalho, rodapé e configurações específicas
import { loadHeader } from './loadHeader.js';
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
                slidesPerView: 2,
                spaceBetween: 30,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 40,
            },
        },
    });
}
