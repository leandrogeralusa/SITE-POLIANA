// Troca de idioma: botão PT | EN, ?lang=en e localStorage.
// Só os textos trocam (fade de 200 ms); o nome letra a letra não reanima.
import { textos, IDIOMAS } from './data/textos.js';
import { servicos } from './data/servicos.js';

const CHAVE = 'pl-idioma';
let atual = 'pt';

function lerGuardado() {
  try { return localStorage.getItem(CHAVE); } catch { return null; }
}
function guardar(lang) {
  try { localStorage.setItem(CHAVE, lang); } catch { /* modo privado: ignora */ }
}

export function idiomaInicial() {
  const param = new URLSearchParams(location.search).get('lang');
  if (IDIOMAS.includes(param)) return param;
  const salvo = lerGuardado();
  if (IDIOMAS.includes(salvo)) return salvo;
  return 'pt';
}

export const idioma = () => atual;
export const t = (chave, lang = atual) => textos[lang][chave] ?? textos.pt[chave] ?? '';

function preencher(lang) {
  const tx = textos[lang];
  document.documentElement.lang = tx.htmlLang;
  document.title = tx.title;
  document.querySelector('meta[name="description"]')?.setAttribute('content', tx.description);
  document.querySelector('meta[property="og:title"]')?.setAttribute('content', tx.title);
  document.querySelector('meta[property="og:description"]')?.setAttribute('content', tx.description);
  document.querySelector('meta[property="og:locale"]')?.setAttribute('content', tx.htmlLang.replace('-', '_'));

  document.querySelectorAll('[data-t]').forEach((el) => { el.textContent = t(el.dataset.t, lang); });
  document.querySelectorAll('[data-t-alt]').forEach((el) => { el.alt = t(el.dataset.tAlt, lang); });
  document.querySelectorAll('[data-t-aria]').forEach((el) => { el.setAttribute('aria-label', t(el.dataset.tAria, lang)); });
  document.querySelectorAll('[data-serv]').forEach((el) => {
    const [i, campo] = el.dataset.serv.split(':').map(Number);
    el.textContent = servicos[i][lang][campo];
  });
  document.querySelectorAll('[data-lang]').forEach((b) => {
    b.setAttribute('aria-pressed', String(b.dataset.lang === lang));
  });
}

export function definirIdioma(lang, { animar = true } = {}) {
  if (!IDIOMAS.includes(lang)) return;
  const mudou = lang !== atual;
  atual = lang;
  guardar(lang);

  const url = new URL(location.href);
  if (lang === 'pt') url.searchParams.delete('lang'); else url.searchParams.set('lang', lang);
  history.replaceState(null, '', url);

  const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!animar || !mudou || reduz) { preencher(lang); return; }

  const root = document.documentElement;
  root.classList.add('is-trocando');
  setTimeout(() => {
    preencher(lang);
    requestAnimationFrame(() => root.classList.remove('is-trocando'));
  }, 200);
}

// define o idioma antes de montar as seções (elas leem t())
export function fixarIdioma(lang) { atual = lang; }

// depois de montar: preenche títulos, atributos e liga o seletor
export function iniciarIdioma(lang) {
  atual = lang;
  preencher(lang);
  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-lang]');
    if (b) definirIdioma(b.dataset.lang);
  });
}
