// --- PARALLAX SCROLL ---
window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;
  document.querySelector(".parallax-bg").style.transform =
    `translateY(${scrolled * 0.3}px) scale(1.1)`;
});

// --- PARALLAX MOUSE ---
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  document.querySelector(".parallax-bg").style.transform =
    `translate(${x}px, ${y}px) scale(1.1)`;
});

// --- ÍCONES REAGINDO AO MOUSE ---
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 30;
  document.querySelectorAll(".floating-icon").forEach(icon => {
    icon.style.transform = `translate(${x}px, ${y}px)`;
  });
});
