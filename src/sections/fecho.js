import { t, idioma } from '../i18n.js';
import { servicos } from '../data/servicos.js';
import { contato, legal } from '../data/contato.js';
import { setaSVG } from './hero.js';

// Selo Equal Housing Opportunity (desenho próprio, simples).
const ehoSVG = `<svg class="eho" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
  <path d="M24 5 L43 19 V43 H5 V19 Z" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round"/>
  <rect x="14" y="25" width="20" height="4" fill="currentColor"/>
  <rect x="14" y="33" width="20" height="4" fill="currentColor"/>
</svg>`;

export function fecho() {
  const lang = idioma();
  const dados = servicos
    .map((s, i) => `<div class="dados__item"><dt data-serv="${i}:0">${s[lang][0]}</dt><dd data-serv="${i}:1">${s[lang][1]}</dd></div>`)
    .join('');
  const ano = new Date().getFullYear();

  return `
<section class="fecho" id="fecho" aria-labelledby="fecho-titulo" tabindex="-1">
  <div class="fecho__in">
    <p class="rotulo" data-t="fechoRotulo">${t('fechoRotulo')}</p>
    <h2 class="fecho__titulo" id="fecho-titulo"><span data-t="fechoTitulo1">${t('fechoTitulo1')}</span><br><span data-t="fechoTitulo2">${t('fechoTitulo2')}</span></h2>

    <dl class="dados">${dados}</dl>

    <div class="fecho__acao">
      <a class="pilula pilula--cafe" href="${contato.whatsapp.link}" target="_blank" rel="noopener"><span class="pilula__txt" data-t="fechoCta">${t('fechoCta')}</span><span class="pilula__circ">${setaSVG}</span></a>
      <p class="fecho__nota" data-t="fechoNota">${t('fechoNota')}</p>
    </div>

    <ul class="contato" data-t-aria="contatoRotulo" aria-label="${t('contatoRotulo')}">
      <li><span class="rotulo" data-t="whatsapp">${t('whatsapp')}</span><a href="${contato.whatsapp.link}" target="_blank" rel="noopener">${contato.whatsapp.texto}</a></li>
      <li><span class="rotulo" data-t="email">${t('email')}</span><a href="${contato.email.link}">${contato.email.texto}</a></li>
      <li><span class="rotulo" data-t="instagram">${t('instagram')}</span><a href="${contato.instagram.link}" target="_blank" rel="noopener">${contato.instagram.texto}</a></li>
    </ul>
  </div>

  <footer class="rodape">
    <span>${legal.nome}</span>
    <span class="rodape__corretora">${legal.corretora}</span>
    <span class="rodape__eho">${ehoSVG}<span data-t="eho">${t('eho')}</span></span>
    <span>© ${ano}</span>
  </footer>
</section>`;
}
