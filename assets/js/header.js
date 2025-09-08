export const setupHeader = () => {
    const header = document.getElementById('main-header');
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    // Adiciona ou remove a classe 'scrolled' com base na rolagem da página
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Habilita a funcionalidade do menu hambúrguer em dispositivos móveis
    if (hamburger && menu) {
        hamburger.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }
};
