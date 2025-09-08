export function loadHeader() {
    const headerPlaceholder = document.getElementById('main-header');
    if (headerPlaceholder) {
        fetch('_partials/header.html')
            .then(response => response.text())
            .then(data => {
                headerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Erro ao carregar o header:', error));
    }
}
