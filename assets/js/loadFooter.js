export function loadFooter() {
    const footerPlaceholder = document.getElementById('main-footer');
    if (footerPlaceholder) {
        fetch('_partials/footer.html')
            .then(response => response.text())
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Erro ao carregar o footer:', error));
    }
}
