// Aguarda o DOM principal ser carregado para começar a executar o script
document.addEventListener("DOMContentLoaded", function() {

    // --- CARREGAMENTO DOS COMPONENTES REUTILIZÁVEIS ---

    const headerPlaceholder = document.querySelector("#main-header");
    const footerPlaceholder = document.querySelector("#main-footer");

    const loadedComponents = [];

    // Carrega o Header e, APÓS o carregamento, inicializa o menu hambúrguer
    if (headerPlaceholder) {
        fetch("_partials/header.html")
            .then(response => response.ok ? response.text() : Promise.reject('Header not found'))
            .then(data => {
                headerPlaceholder.innerHTML = data;
                initializeHamburgerMenu();
                loadedComponents.push('header');
                checkAndInitializeScripts();
            })
            .catch(error => console.error(`Erro ao carregar o header:`, error));
    } else {
        loadedComponents.push('header');
        checkAndInitializeScripts(); // Garante que o script roda mesmo sem o header
    }

    // Carrega o Footer
    if (footerPlaceholder) {
        fetch("_partials/footer.html")
            .then(response => response.ok ? response.text() : Promise.reject('Footer not found'))
            .then(data => {
                footerPlaceholder.innerHTML = data;
                loadedComponents.push('footer');
                checkAndInitializeScripts();
            })
            .catch(error => console.error(`Erro ao carregar o footer:`, error));
    } else {
        loadedComponents.push('footer');
        checkAndInitializeScripts(); // Garante que o script roda mesmo sem o footer
    }
    
    // --- FUNÇÕES DE INICIALIZAÇÃO DE SCRIPTS ---

    // Função que contém a lógica do menu hambúrguer
    function initializeHamburgerMenu() {
        const hamburger = document.getElementById('hamburger');
        const menu = document.querySelector('#main-header .menu');
        const navLinks = document.querySelectorAll('#main-header .menu li a');

        if (hamburger && menu) {
            hamburger.addEventListener('click', () => {
                menu.classList.toggle('active');
                const isExpanded = menu.classList.contains('active');
                hamburger.setAttribute('aria-expanded', isExpanded);
            });

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    menu.classList.remove('active');
                    hamburger.setAttribute('aria-expanded', 'false');
                });
            });
        }
    }

    // Inicialização do Carrossel de Planos (Swiper.js)
    function initializeSwiper() {
        if (typeof Swiper !== 'undefined') { // Garante que o Swiper está carregado
            const planosSlider = new Swiper('.planos-slider', {
                loop: true,
                spaceBetween: 30,
                grabCursor: true,
                breakpoints: {
                    0: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 }
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
            });
        }
    }

    // Efeito Parallax no Hero e Animações de Scroll (Fade-up)
    function initializeParallaxAndFadeIn() {
        const parallaxBg = document.querySelector('.parallax-bg');
        const faders = document.querySelectorAll('.fade-up');

        if (parallaxBg) {
            let scrollY = 0, mouseX = 0, mouseY = 0, ticking = false;
            function updateParallax() {
                const transformValue = `translate(${mouseX}px, ${mouseY}px) translateY(${scrollY * 0.3}px) scale(1.1)`;
                parallaxBg.style.transform = transformValue;
                ticking = false;
            }
            function requestTick() {
                if (!ticking) {
                    requestAnimationFrame(updateParallax);
                    ticking = true;
                }
            }
            window.addEventListener('scroll', () => {
                scrollY = window.scrollY;
                requestTick();
            });
            document.addEventListener('mousemove', (e) => {
                mouseX = (e.clientX / window.innerWidth - 0.5) * 30;
                mouseY = (e.clientY / window.innerHeight - 0.5) * 30;
                requestTick();
            });
        }
        if (faders.length > 0) {
            const appearOptions = { threshold: 0.1 };
            const appearOnScroll = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                        observer.unobserve(entry.target);
                    }
                });
            }, appearOptions);
            faders.forEach(fader => appearOnScroll.observe(fader));
        }
    }
    
    // FAQ Accordion
    function initializeFaq() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Primeiro, fecha todas as outras perguntas abertas
                faqItems.forEach(otherItem => {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    
                    // Se o item não é o que foi clicado, remove a classe 'active'
                    if (otherItem !== item) {
                        otherQuestion.classList.remove('active');
                        otherAnswer.classList.remove('active');
                    }
                });

                // Em seguida, alterna a classe 'active' do item clicado
                const answer = item.querySelector('.faq-answer');
                question.classList.toggle('active');
                answer.classList.toggle('active');
            });
        });
    }

    // Gallery Filters
    function initializeGalleryFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.galeria-item');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filterValue = button.getAttribute('data-filter');
                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Floating Icons Animation
    function initializeFloatingIcons() {
        const floatingIcons = document.querySelectorAll('.floating-icon');
        floatingIcons.forEach(icon => {
            icon.style.display = 'block';
            const randomX = Math.random() * 80 + 10;
            const randomY = Math.random() * 80 + 10;
            const randomDelay = Math.random() * 5;
            const randomDuration = Math.random() * 5 + 5;
            icon.style.left = `${randomX}%`;
            icon.style.top = `${randomY}%`;
            icon.style.animation = `float ${randomDuration}s ease-in-out ${randomDelay}s infinite`;
        });
    }

    // Simulate Online Players Count
    function updateOnlinePlayers() {
        const onlinePlayersElement = document.getElementById('online-players');
        if (!onlinePlayersElement) return;
        const basePlayers = 1250;
        const fluctuation = Math.floor(Math.random() * 50) - 25;
        onlinePlayersElement.textContent = basePlayers + fluctuation;
        setInterval(() => {
            const fluctuation = Math.floor(Math.random() * 50) - 25;
            onlinePlayersElement.textContent = basePlayers + fluctuation;
        }, 60000);
    }
    
    // Verifica se todos os componentes obrigatórios foram carregados
    function checkAndInitializeScripts() {
        if (loadedComponents.includes('header')) {
            initializeSwiper();
            initializeParallaxAndFadeIn();
            initializeFaq();
            initializeGalleryFilters();
            initializeFloatingIcons();
            updateOnlinePlayers();
        }
    }
});