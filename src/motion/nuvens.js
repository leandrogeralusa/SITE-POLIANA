// Deriva das nuvens em CSS (roda no compositor). Aqui só calculamos, por nuvem,
// a duração (velocidade constante por camada) e o atraso negativo que a põe
// no lugar certo (x do src/data/nuvens.js) logo no primeiro quadro.
import { velocidade } from '../data/nuvens.js';

const MARGEM = 40; // px antes da borda esquerda e depois da direita (igual ao CSS)

function calcular(palco) {
  const W = palco.clientWidth;
  palco.querySelectorAll('.nuvem').forEach((n) => {
    if (n.offsetParent === null && getComputedStyle(n).display === 'none') return;
    const camada = n.closest('[data-camada]')?.dataset.camada;
    const vel = velocidade[camada] ?? 10;
    const w = parseFloat(n.dataset.w) * W;
    const x = parseFloat(n.dataset.x);
    const L = W + w + 2 * MARGEM;
    const q = ((((x * W + w / 2 + MARGEM) / L) % 1) + 1) % 1;
    const dur = L / vel;
    n.style.setProperty('--dur', `${dur.toFixed(2)}s`);
    n.style.setProperty('--atraso', `${(-q * dur).toFixed(2)}s`);
    n.style.setProperty('--x0', (x * W - w / 2).toFixed(1)); // posição fixa no movimento reduzido
  });
}

export function iniciarNuvens(palco) {
  calcular(palco);
  let t;
  let ultimaW = palco.clientWidth;
  addEventListener('resize', () => {
    clearTimeout(t);
    t = setTimeout(() => {
      if (palco.clientWidth === ultimaW) return; // barra do navegador no celular: só a altura muda
      ultimaW = palco.clientWidth;
      calcular(palco);
    }, 200);
  });

  // pausa deriva e flutuação com o hero fora da tela
  new IntersectionObserver(([e]) => palco.classList.toggle('is-pausado', !e.isIntersecting)).observe(palco);
}
