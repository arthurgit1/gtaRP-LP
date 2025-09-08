export const setupStoreFilters = () => {
    const mainFilterButtons = document.querySelectorAll('.loja-filters .filter-btn');
    const subFilterContainers = document.querySelectorAll('.sub-filter-container');
    const lojaItems = document.querySelectorAll('.itens-container .item-card');

    // Aplica o filtro à loja
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

    // Configura os filtros principais
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
                }
            }

            applyLojaFilter(mainFilter);
        });
    });

    // Configura os filtros secundários
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
};
