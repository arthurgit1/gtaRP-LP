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
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.galeria-item');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
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
    //  Inicializar Swiper.js
    // ===================================
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

});