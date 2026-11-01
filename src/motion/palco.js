// Por quadro: parallax do cursor + saída no scroll ("a câmera desce para dentro da nuvem").
// Escreve só nas caixas de fora (.camada / [data-camada]); a entrada (GSAP) mexe nas de dentro.
// Só escreve no DOM quando o valor muda.

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const suave = (a, b, v) => { const t = clamp((v - a) / (b - a)); return t * t * (3 - 2 * t); };

// profundidade (cursor) e velocidade (saída) de cada camada
const CAMADAS = {
  ceu: { prof: 0.05, vel: 0.06 },
  longe: { prof: 0.18, vel: 0.16 },
  horizonte: { prof: 0.34, vel: 0.32 },
  ilha: { prof: 0.58, vel: 0.6, escala: -0.14, some: [0.28, 0.58] },
  frente: { prof: 1, vel: 1.25, escala: 0.38, origem: '50% 100%' },
  muro: { prof: 1, vel: 1.7 },
};
const CURSOR_X = 26;
const CURSOR_Y = 14;

export function iniciarPalco(hero) {
  const palco = hero.querySelector('.palco');
  const el = (n) => palco.querySelector(`[data-camada="${n}"]`);
  const camadas = Object.entries(CAMADAS).map(([nome, c]) => {
    const e = el(nome);
    if (c.origem) e.style.transformOrigin = c.origem;
    return { e, ...c, ultimo: '', ultimaOp: '' };
  });
  const ilha = palco.querySelector('.ilha');
  const extras = {
    texto: el('texto'),
    hud: el('hud'),
    dica: el('dica'),
    sombra: el('sombra'),
    veu: el('veu'),
  };
  const cache = new Map();
  const escrever = (e, prop, v) => {
    const k = e;
    const atual = cache.get(k) || {};
    if (atual[prop] === v) return;
    atual[prop] = v; cache.set(k, atual);
    if (prop.startsWith('--')) e.style.setProperty(prop, v); else e.style[prop] = v;
  };

  // cursor (só mouse)
  let alvoX = 0, alvoY = 0, mx = 0, my = 0;
  const temMouse = matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (temMouse) {
    addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      alvoX = (e.clientX / innerWidth - 0.5) * 2;
      alvoY = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
    document.addEventListener('mouseleave', () => { alvoX = 0; alvoY = 0; });
  }

  let ps = 0;
  let visivel = true;
  new IntersectionObserver(([e]) => { visivel = e.isIntersecting; }).observe(hero);

  const progresso = () => {
    const r = hero.getBoundingClientRect();
    const curso = r.height - palco.clientHeight;
    return curso > 0 ? clamp(-r.top / curso) : 0;
  };

  function quadro() {
    requestAnimationFrame(quadro);
    if (!visivel) return;
    const H = palco.clientHeight;

    mx += (alvoX - mx) * 0.05;
    my += (alvoY - my) * 0.05;
    const pAlvo = progresso();
    ps += (pAlvo - ps) * 0.14;
    if (Math.abs(pAlvo - ps) < 0.0005) ps = pAlvo;
    const p = ps;

    for (const c of camadas) {
      const tx = -mx * CURSOR_X * c.prof;
      const ty = -my * CURSOR_Y * c.prof - p * c.vel * H;
      const s = c.escala ? 1 + c.escala * p : 1;
      escrever(c.e, 'transform', `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)${s !== 1 ? ` scale(${s.toFixed(4)})` : ''}`);
      if (c.some) escrever(c.e, 'opacity', (1 - suave(c.some[0], c.some[1], p)).toFixed(3));
    }
    // a ilha encolhe em torno do próprio centro (left/top do CSS já são o centro)
    if (ilha && !cache.has('origem-ilha')) {
      camadas.find((c) => c.e.dataset.camada === 'ilha').e.style.transformOrigin = `${ilha.offsetLeft}px ${ilha.offsetTop}px`;
      cache.set('origem-ilha', true);
    }

    escrever(extras.texto, 'transform', `translate3d(0, ${(-p * 0.35 * H).toFixed(2)}px, 0)`);
    escrever(extras.texto, 'opacity', (1 - clamp(p / 0.3)).toFixed(3));
    escrever(extras.hud, 'opacity', (1 - clamp(p / 0.22)).toFixed(3));
    escrever(extras.dica, 'opacity', (1 - clamp(p / 0.15)).toFixed(3));
    escrever(extras.sombra, 'opacity', (1 - clamp(p / 0.28)).toFixed(3));
    escrever(ilha, '--neblina', suave(0.1, 0.58, p).toFixed(3));
    escrever(extras.veu, 'opacity', suave(0.5, 0.9, p).toFixed(3));
    extras.texto.style.visibility = p >= 0.3 ? 'hidden' : '';
  }
  requestAnimationFrame(quadro);

  addEventListener('resize', () => cache.delete('origem-ilha'));
}
