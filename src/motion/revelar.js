// Revela os blocos [data-revela] ao entrarem na tela (sobe 24 px e aparece). Sem movimento reduzido: tudo já visível.
export function iniciarRevelar({ reduz }) {
  const itens = document.querySelectorAll('[data-revela]');
  if (reduz || !('IntersectionObserver' in window)) return;
  document.documentElement.classList.add('revela-on');
  const io = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-visto');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  itens.forEach((el) => io.observe(el));
}
