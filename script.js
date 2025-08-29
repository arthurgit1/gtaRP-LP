// Aguarda o DOM principal ser carregado para começar a executar o script
document.addEventListener("DOMContentLoaded", function() {

    // --- CARREGAMENTO DOS COMPONENTES REUTILIZÁVEIS ---

    const headerPlaceholder = document.querySelector("#main-header");
    const footerPlaceholder = document.querySelector("#main-footer");

    // Array para controlar quais componentes foram carregados
    const loadedComponents = [];

    // Carrega o Header e, APÓS o carregamento, inicializa o menu hambúrguer
    if (headerPlaceholder) {
        fetch("_partials/header.html")
            .then(response => response.ok ? response.text() : Promise.reject('Header not found'))
            .then(data => {
                headerPlaceholder.innerHTML = data;
                initializeHamburgerMenu(); // Inicializa o menu após o header ser carregado
                loadedComponents.push('header');
                checkAndInitializeScripts();
            })
            .catch(error => console.error(`Erro ao carregar o header:`, error));
    } else {
        loadedComponents.push('header');
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
    }
    
    // Verifica se todos os componentes obrigatórios foram carregados
    function checkAndInitializeScripts() {
        if (loadedComponents.includes('header')) {
            // Agora podemos inicializar todos os scripts que não dependem do header/footer
            initializeSwiper();
            initializeParallaxAndFadeIn();
        }
    }

    // --- INICIALIZAÇÃO DOS SCRIPTS DA PÁGINA ---

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

        // Animação Fade-in ao Scroll com IntersectionObserver
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
});