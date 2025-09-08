export const setupFaq = () => {
    const faqItems = document.querySelectorAll('.faq-question');

    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            const icon = item.querySelector('i');
            const isExpanded = answer.classList.contains('active');
            
            item.setAttribute('aria-expanded', !isExpanded); // Alterna o estado expandido
            answer.classList.toggle('active');
            icon.classList.toggle('fa-chevron-up');
            icon.classList.toggle('fa-chevron-down');
        });
    });
};
