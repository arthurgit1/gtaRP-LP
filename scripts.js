// Exemplo simples para o botão "VER MAIS"
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.news-item button').forEach(btn => {
    btn.addEventListener('click', e => {
      alert('Aqui você pode navegar para a página completa de notícias ou exibir mais detalhes!');
    });
  });
});