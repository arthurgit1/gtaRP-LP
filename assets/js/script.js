import { loadHeader } from './loadHeader.js';
import { loadFooter } from './loadFooter.js';
import { setupHeader } from './header.js';
import { setupFaq } from './faq.js';
import { setupGalleryFilters } from './gallery.js';
import { setupStoreFilters } from './store.js';

document.addEventListener('DOMContentLoaded', function() {
    // Carregar Header e Footer
    loadHeader();
    loadFooter();

    // Configurar Header, FAQ, Galeria e Loja
    setupHeader();
    setupFaq();
    setupGalleryFilters();
    setupStoreFilters();

    // Menu hamburguer
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');
    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    // Swiper para filtros da loja
    if (document.querySelector('.loja-main-filters-slider')) {
        new Swiper('.loja-main-filters-slider', {
            loop: false,
            slidesPerView: 'auto',
            spaceBetween: 15,
            freeMode: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            }
        });
    }

    // Filtros principais e subfiltros da loja
    const mainFilterButtons = document.querySelectorAll('.filter-btn[data-main-filter]');
    const subFilterContainers = document.querySelectorAll('.sub-filter-container');
    const subFilterButtons = document.querySelectorAll('.sub-filter-container .filter-btn');
    const items = document.querySelectorAll('.item-card');

    mainFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            mainFilterButtons.forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            const filterCategory = button.getAttribute('data-main-filter');
            subFilterContainers.forEach(container => {
                if (container.getAttribute('data-parent-category') === filterCategory) {
                    container.classList.add('active');
                } else {
                    container.classList.remove('active');
                }
            });
            // Exibe todos os itens se "Todos" for selecionado
            if (filterCategory === 'all') {
                items.forEach(item => item.style.display = 'block');
                subFilterContainers.forEach(container => container.classList.remove('active'));
            } else {
                // Exibe apenas itens da categoria principal
                items.forEach(item => {
                    item.style.display = (item.getAttribute('data-main-category') === filterCategory) ? 'block' : 'none';
                });
            }
        });
    });

    subFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const parent = button.closest('.sub-filter-container');
            const parentCategory = parent.getAttribute('data-parent-category');
            const subFilterValue = button.getAttribute('data-sub-filter');
            // Ativa apenas o subfiltro clicado
            parent.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            button.classList.add('active');
            items.forEach(item => {
                const itemCategory = item.getAttribute('data-main-category');
                const itemSubcategory = item.getAttribute('data-subcategory');
                if (
                    (subFilterValue === 'all' && itemCategory === parentCategory) ||
                    (itemCategory === parentCategory && itemSubcategory === subFilterValue)
                ) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});