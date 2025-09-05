document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    //  Carregar Header e Footer
    // ===================================

    const loadHeader = () => {
        const headerPlaceholder = document.getElementById('main-header');
        if (headerPlaceholder) {
            fetch('_partials/header.html')
                .then(response => response.text())
                .then(data => {
                    headerPlaceholder.innerHTML = data;
                    setupHeader();
                })
                .catch(error => console.error('Erro ao carregar o header:', error));
        }
    };

    const loadFooter = () => {
        const footerPlaceholder = document.getElementById('main-footer');
        if (footerPlaceholder) {
            fetch('_partials/footer.html')
                .then(response => response.text())
                .then(data => {
                    footerPlaceholder.innerHTML = data;
                })
                .catch(error => console.error('Erro ao carregar o footer:', error));
        }
    };

    loadHeader();
    loadFooter();

    // ===================================
    //  Funções do Header
    // ===================================
    function setupHeader() {
        const header = document.getElementById('main-header');
        const hamburger = document.querySelector('.hamburger');
        const menu = document.querySelector('.menu');
    
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    
        if (hamburger && menu) {
            hamburger.addEventListener('click', () => {
                menu.classList.toggle('active');
            });
        }
    }


    // ===================================
    //  Animação Fade-Up
    // ===================================
    const faders = document.querySelectorAll('.fade-up');
    const appearOptions = {
        threshold: 0,
        rootMargin: "0px 0px -100px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('show');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
    
    // ===================================
    //  FAQ
    // ===================================
    const faqItems = document.querySelectorAll('.faq-question');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            const icon = item.querySelector('i');

            item.classList.toggle('active');
            answer.classList.toggle('active');
            icon.classList.toggle('fa-chevron-up');
            icon.classList.toggle('fa-chevron-down');
        });
    });

    // ===================================
    //  Galeria (Filtros)
    // ===================================
    const galleryFilterButtons = document.querySelectorAll('#galeria .filter-btn');
    const galleryItems = document.querySelectorAll('.galeria-item');

    galleryFilterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            galleryFilterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // ===================================
    //  Loja: Filtros e Slider
    // ===================================

    const mainFilterButtons = document.querySelectorAll('.loja-filters .filter-btn');
    const subFilterContainers = document.querySelectorAll('.sub-filter-container');
    const lojaItems = document.querySelectorAll('.itens-container .item-card');
    
    function applyLojaFilter(mainFilter, subFilter = 'all') {
        lojaItems.forEach(item => {
            const itemMainCategory = item.getAttribute('data-main-category');
            const itemSubcategory = item.getAttribute('data-subcategory');
    
            const isVisibleByMain = (mainFilter === 'all' || itemMainCategory === mainFilter);
            const isVisibleBySub = (subFilter === 'all' || itemSubcategory === subFilter);
    
            if (isVisibleByMain && isVisibleBySub) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    }
    
    mainFilterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            mainFilterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
    
            subFilterContainers.forEach(container => container.classList.remove('active'));
    
            const mainFilter = btn.getAttribute('data-main-filter');
            
            if (mainFilter !== 'all') {
                const targetContainer = document.querySelector(`.sub-filter-container[data-parent-category="${mainFilter}"]`);
                if (targetContainer) {
                    targetContainer.classList.add('active');
                    targetContainer.querySelectorAll('.filter-btn').forEach(subBtn => subBtn.classList.remove('active'));
                    targetContainer.querySelector('[data-sub-filter="all"]').classList.add('active');
                }
            }
    
            applyLojaFilter(mainFilter);
        });
    });
    
    subFilterContainers.forEach(container => {
        container.querySelectorAll('.filter-btn').forEach(subBtn => {
            subBtn.addEventListener('click', () => {
                container.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                subBtn.classList.add('active');
    
                const mainFilter = container.getAttribute('data-parent-category');
                const subFilter = subBtn.getAttribute('data-sub-filter');
                
                applyLojaFilter(mainFilter, subFilter);
            });
        });
    });

    // Botão Detalhes
    const detailsButtons = document.querySelectorAll('.btn-details');

    detailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemCard = button.closest('.item-card');
            const itemDetails = itemCard.querySelector('.item-details');
            itemDetails.classList.toggle('show');

            if (itemDetails.classList.contains('show')) {
                button.textContent = 'ESCONDER';
            } else {
                button.textContent = 'DETALHES';
            }
        });
    });
    
    // ===================================
    //  Inicializar Swiper.js
    // ===================================
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

    if (document.querySelector('.loja-main-filters-slider')) {
        const mainFiltersSwiper = new Swiper('.loja-main-filters-slider', {
            slidesPerView: 'auto',
            spaceBetween: 10,
            freeMode: true,
            loop: false, 
            navigation: {
                // Seletores atualizados para corresponder ao novo HTML
                nextEl: '.loja-filtros-container .swiper-button-next',
                prevEl: '.loja-filtros-container .swiper-button-prev',
            },
        });
    }
});