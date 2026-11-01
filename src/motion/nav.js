// Nav: some ao descer, volta ao subir (sempre visível no topo e ao receber foco —
// o foco é tratado no CSS com :focus-within). Sobre o off-white do fechamento vira café cheio.

export function iniciarNav({ reduz }) {
  const nav = document.getElementById('nav');
  const fecho = document.getElementById('fecho');
  const raiz = document.documentElement;
  let ultimo = scrollY;
  let pendente = false;

  const medir = () => raiz.style.setProperty('--nav-h', `${nav.offsetHeight}px`);
  medir();
  new ResizeObserver(medir).observe(nav);

  function atualizar() {
    pendente = false;
    const y = scrollY;
    const d = y - ultimo;
    if (y < 80) nav.classList.remove('is-escondida');
    else if (d > 6) nav.classList.add('is-escondida');
    else if (d < -6) nav.classList.remove('is-escondida');
    if (Math.abs(d) > 6 || y < 80) ultimo = y;

    // o off-white cheio do fechamento começa depois do degradê de 45svh
    const degrade = reduz ? 0 : innerHeight * 0.45;
    const topoCheio = fecho.getBoundingClientRect().top + degrade * 0.6;
    nav.classList.toggle('is-cheia', topoCheio < nav.offsetTop + nav.offsetHeight);
  }
  addEventListener('scroll', () => {
    if (!pendente) { pendente = true; requestAnimationFrame(atualizar); }
  }, { passive: true });
  atualizar();
}
