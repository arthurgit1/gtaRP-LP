// Exemplo simples para o botão "VER MAIS"
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.news-item button').forEach(btn => {
    btn.addEventListener('click', e => {
      alert('Aqui você pode navegar para a página completa de notícias ou exibir mais detalhes!');
    });
  });
});


// Ativar animações ao rolar
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
      observer.unobserve(entry.target); // anima uma vez só
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll("section, .plano-card, .news-item, .hero .hero-content")
  .forEach(el => {
    el.style.animationPlayState = 'paused'; // só inicia quando aparece
    observer.observe(el);
  });


  // Parallax suave no scroll
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  document.querySelector(".parallax-bg").style.transform =
    `translateY(${scrolled * 0.3}px) scale(1.1)`;
});

// Parallax com o mouse (extra)
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  document.querySelector(".parallax-bg").style.transform =
    `translate(${x}px, ${y}px) scale(1.1)`;
});
