// Entrada em camadas (GSAP), depois que a ilha, as nuvens e as fontes carregarem
// (no máximo 3 s de espera). Mexe só nas caixas de dentro (.camada__in e filhos do texto).
import { gsap } from 'gsap';
import { contarHUD, hudAoVivo } from './hud.js';

function carregou(img) {
  if (img.complete && img.naturalWidth) return Promise.resolve();
  return new Promise((ok) => { img.addEventListener('load', ok, { once: true }); img.addEventListener('error', ok, { once: true }); });
}

export async function esperarCarga(palco, max = 3000) {
  const imgs = [...palco.querySelectorAll('.ilha__img, .camada--longe img, .camada--horizonte img, .camada--frente img')]
    .filter((i) => i.offsetParent !== null);
  const fontes = document.fonts
    ? Promise.all([
        document.fonts.load("480 100px 'Fraunces Variable'", 'Poliana'),
        document.fonts.load("460 20px 'Archivo Variable'"),
        document.fonts.load("400 12px 'IBM Plex Mono'"),
      ]).then(() => document.fonts.ready)
    : Promise.resolve();
  await Promise.race([
    Promise.all([...imgs.map(carregou), fontes]).catch(() => {}),
    new Promise((ok) => setTimeout(ok, max)),
  ]);
}

export async function entrada(palco, { reduz }) {
  const raiz = document.documentElement;
  if (reduz) { raiz.classList.remove('pre-entrada'); hudAoVivo(); return; }

  await esperarCarga(palco);

  const q = (s) => palco.querySelector(s);
  const qa = (s) => [...palco.querySelectorAll(s)];
  const H = palco.clientHeight;
  const ilha = q('.ilha');
  const ilhaIn = q('.camada--ilha .camada__in');
  const nav = document.getElementById('nav');

  gsap.set(ilhaIn, { transformOrigin: `${ilha.offsetLeft}px ${ilha.offsetTop}px` });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  // tudo começa invisível pela classe .pre-entrada; o fromTo assume a partir daqui
  tl.add(() => raiz.classList.remove('pre-entrada'), 0);

  tl.fromTo(q('.camada--ceu .camada__in'), { opacity: 0 }, { opacity: 1, duration: 1.4, ease: 'power1.inOut' }, 0);
  tl.fromTo(q('.camada--longe .camada__in'), { opacity: 0, y: H * 0.05 }, { opacity: 1, y: 0, duration: 1.9 }, 0.3);
  tl.fromTo(q('.camada--horizonte .camada__in'), { opacity: 0, y: H * 0.07 }, { opacity: 1, y: 0, duration: 2.0 }, 0.45);
  tl.fromTo(ilhaIn,
    { opacity: 0, y: ilha.offsetHeight * 0.2, scale: 0.94 },
    { opacity: 1, y: 0, scale: 1, duration: 2.8, ease: 'power3.out' }, 0.6);
  tl.fromTo(q('.camada--frente .camada__in'), { opacity: 0, y: H * 0.1 }, { opacity: 1, y: 0, duration: 2.1 }, 0.95);
  tl.set(q('.camada--muro .camada__in'), { opacity: 1 }, 0);

  // nome letra a letra, por máscara
  tl.fromTo(qa('.l__in'), { yPercent: 108, opacity: 1 }, { yPercent: 0, duration: 1.15, ease: 'power4.out', stagger: 0.065 }, 1.55);
  tl.fromTo(q('.sol__entra'), { opacity: 0, rotate: -220, scale: 0.4 }, { opacity: 1, rotate: 0, scale: 1, duration: 1.5, ease: 'power3.out' }, 2.05);
  tl.fromTo(q('.nome__sub'), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.9 }, 2.25);
  // parágrafo linha a linha, por máscara
  tl.fromTo(qa('.linha__in'), { yPercent: 105, opacity: 1 }, { yPercent: 0, duration: 0.95, ease: 'power3.out', stagger: 0.12 }, 2.3);
  tl.fromTo(q('.hero__lado .pilula'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.9 }, 2.75);
  tl.fromTo(nav, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 2.6);
  tl.fromTo(q('.hero__dica'), { opacity: 0 }, { opacity: 1, duration: 0.9 }, 3.1);
  // HUD conta de 05:40 até a hora real
  tl.fromTo(qa('.hud > *'), { opacity: 0 }, { opacity: 1, duration: 0.6, stagger: 0.1 }, 1.9);
  tl.add(contarHUD(gsap, 1.9), 1.95);

  tl.eventCallback('onComplete', () => {
    gsap.set([...qa('.camada__in'), ...qa('.l__in'), ...qa('.linha__in'), q('.sol__entra'), q('.nome__sub'), q('.hero__lado .pilula'), nav, q('.hero__dica'), ...qa('.hud > *')], { clearProps: 'opacity,transform' });
  });
  return tl;
}
