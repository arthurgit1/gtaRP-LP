export const setupGalleryFilters = () => {
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
};
