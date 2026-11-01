import { t } from '../i18n.js';
import { nuvens } from '../data/nuvens.js';

// Sol-asterisco: 8 raios arredondados.
export function solSVG() {
  const raios = Array.from({ length: 8 }, (_, i) => {
    const a = (i * Math.PI) / 4;
    const x1 = 50 + Math.cos(a) * 22, y1 = 50 + Math.sin(a) * 22;
    const x2 = 50 + Math.cos(a) * 46, y2 = 50 + Math.sin(a) * 46;
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}"/>`;
  }).join('');
  return `<svg viewBox="0 0 100 100" aria-hidden="true" focusable="false"><g stroke="currentColor" stroke-width="9.5" stroke-linecap="round">${raios}</g><circle cx="50" cy="50" r="12" fill="currentColor"/></svg>`;
}

export const setaSVG = `<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4 10h11m-4.5-4.5L15 10l-4.5 4.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

// Linha distante de copas de árvores + um fio de lago (a Flórida é plana).
function arvoresSVG() {
  let s = 11;
  const r = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  let d = 'M0 60 L0 34';
  for (let x = 0; x <= 2400; ) {
    const w = 10 + r() * 26;
    const h = 22 + r() * 12 + (r() < 0.12 ? 8 : 0);
    d += ` Q ${(x + w / 2).toFixed(1)} ${(40 - h).toFixed(1)} ${(x + w).toFixed(1)} ${(32 + r() * 6).toFixed(1)}`;
    x += w;
  }
  d += ' L2400 60 Z';
  return `<svg viewBox="0 0 2400 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <path d="${d}" fill="#a3b5c4"/>
    <path d="M420 47 C 700 44, 980 44, 1260 46 C 1330 47, 1400 49, 1460 48 C 1320 51, 900 52, 420 47 Z" fill="#d9e3ea"/>
    <path d="M1720 45 C 1850 43, 1980 43, 2080 45 C 1980 48, 1830 48, 1720 45 Z" fill="#d9e3ea"/>
  </svg>`;
}

function camadaNuvens(nome, extra = '') {
  const pecas = (lista, cls) =>
    lista.map((n) => `<div class="nuvem ${cls}" data-x="${n.x}" data-w="${n.w}" style="--y:${n.y};--w:${n.w};--o:${n.o ?? 1}"><img src="/img/nuvem-${n.img}.webp" alt="" decoding="async"${n.flip ? ' class="flip"' : ''}></div>`).join('');
  return pecas(nuvens.desktop[nome], 'so-desktop') + pecas(nuvens.celular[nome], 'so-celular') + extra;
}

export function hero() {
  const letras = [...'Poliana'].map((c) => `<span class="l"><span class="l__in">${c}</span></span>`).join('');
  const linha = (k) => `<span class="linha"><span class="linha__in" data-t="${k}">${t(k)}</span></span>`;

  return `
<section class="hero" id="hero" aria-labelledby="hero-titulo">
  <div class="palco" id="palco">

    <div class="camada camada--ceu" data-camada="ceu"><div class="camada__in">
      <div class="ceu">
        <div class="ceu__sol"></div>
        <div class="ceu__clarao"></div>
        <div class="ceu__arvores">${arvoresSVG()}</div>
      </div>
    </div></div>

    <div class="camada camada--longe" data-camada="longe"><div class="camada__in">${camadaNuvens('longe')}</div></div>

    <div class="camada camada--horizonte" data-camada="horizonte"><div class="camada__in">
      ${camadaNuvens('horizonte', '<div class="nevoa-faixa nevoa-faixa--horizonte"></div>')}
    </div></div>

    <div class="camada camada--ilha" data-camada="ilha"><div class="camada__in">
      <div class="ilha">
        <div class="ilha__nevoa"></div>
        <div class="ilha__flutua">
          <img class="ilha__img" src="/img/ilha.webp" width="1400" height="1000" data-t-alt="ilhaAlt" alt="${t('ilhaAlt')}" fetchpriority="high">
          <div class="ilha__ar" aria-hidden="true"></div>
        </div>
      </div>
    </div></div>

    <div class="camada camada--frente" data-camada="frente"><div class="camada__in">
      ${camadaNuvens('frente', '<div class="nevoa-faixa nevoa-faixa--frente"></div>')}
    </div></div>

    <div class="sombra" data-camada="sombra" aria-hidden="true"></div>

    <div class="camada camada--muro" data-camada="muro" aria-hidden="true"><div class="camada__in">
      ${camadaNuvens('muro', '<div class="muro__fundo"></div>')}
    </div></div>

    <div class="hud" data-camada="hud">
      <p class="hud__esq">
        <span class="hud__relogios"><span>Orlando <time class="hud__hora" data-fuso="America/New_York">--:--</time></span> · <span>Brasília <time class="hud__hora" data-fuso="America/Sao_Paulo">--:--</time></span></span>
        <span class="hud__coord">28°32′N · 81°22′W</span>
      </p>
      <p class="hud__dir" data-t="hudLicenca">${t('hudLicenca')}</p>
    </div>

    <div class="hero__base" data-camada="texto">
      <h1 class="nome" id="hero-titulo">
        <span class="sr-only">${t('h1')}</span>
        <span class="nome__marca" aria-hidden="true"><span class="nome__letras">${letras}</span><span class="sol"><span class="sol__entra">${solSVG()}</span></span></span>
        <span class="nome__sub" aria-hidden="true">LANDIM · BROKER ASSOCIATE</span>
      </h1>
      <div class="hero__lado">
        <p class="hero__texto">${linha('linha1')}${linha('linha2')}${linha('linha3')}</p>
        <a class="pilula" href="#fecho"><span class="pilula__txt" data-t="cta">${t('cta')}</span><span class="pilula__circ">${setaSVG}</span></a>
      </div>
    </div>

    <div class="hero__dica-caixa" data-camada="dica"><p class="hero__dica" data-t="dica">${t('dica')}</p></div>

    <div class="veu" data-camada="veu" aria-hidden="true"></div>
  </div>
</section>`;
}
