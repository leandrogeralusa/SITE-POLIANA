import { t } from '../i18n.js';
import { contato, legal } from '../data/contato.js';
import { topo, setaSVG, whatsSVG } from './comum.js';

// Selo Equal Housing Opportunity (desenho próprio, simples).
const ehoSVG = `<svg class="eho" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
  <path d="M24 5 L43 19 V43 H5 V19 Z" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round"/>
  <rect x="14" y="25" width="20" height="4" fill="currentColor"/>
  <rect x="14" y="33" width="20" height="4" fill="currentColor"/>
</svg>`;

export function secaoContato() {
  return `
<section class="secao contato-secao" id="contato" aria-labelledby="contato-titulo" tabindex="-1">
  ${topo({ rotulo: 'contatoSecaoRotulo', t1: 'contatoTitulo1', t2: 'contatoTitulo2', id: 'contato-titulo' })}
  <div class="fecho__acao" data-revela>
    <a class="pilula pilula--cafe" href="${contato.whatsapp.link}" target="_blank" rel="noopener"><span class="pilula__txt" data-t="fechoCta">${t('fechoCta')}</span><span class="pilula__circ">${setaSVG}</span></a>
    <p class="fecho__nota" data-t="fechoNota">${t('fechoNota')}</p>
  </div>
  <ul class="contato" data-t-aria="contatoRotulo" aria-label="${t('contatoRotulo')}" data-revela>
    <li><span class="rotulo" data-t="whatsapp">${t('whatsapp')}</span><a href="${contato.whatsapp.link}" target="_blank" rel="noopener">${contato.whatsapp.texto}</a></li>
    <li><span class="rotulo" data-t="email">${t('email')}</span><a href="${contato.email.link}">${contato.email.texto}</a></li>
    <li><span class="rotulo" data-t="instagram">${t('instagram')}</span><a href="${contato.instagram.link}" target="_blank" rel="noopener">${contato.instagram.texto}</a></li>
  </ul>
</section>`;
}

export function rodape() {
  const ano = new Date().getFullYear();
  const link = (href, k) => `<li><a href="${href}" data-t="${k}">${t(k)}</a></li>`;
  return `
<footer class="rodape">
  <div class="rodape__topo">
    <p class="rodape__marca">Poliana <em>Landim</em></p>
    <nav data-t-aria="rodapeNav" aria-label="${t('rodapeNav')}">
      <ul class="rodape__links">
        ${link('#como', 'navComo')}${link('#bairros', 'navBairros')}${link('#imoveis', 'navImoveis')}${link('#investir', 'navInvestir')}${link('#sobre', 'navSobre')}${link('#contato', 'navContato')}
      </ul>
    </nav>
  </div>
  <div class="rodape__legal">
    <span>${legal.nome}</span>
    <span class="rodape__corretora">${legal.corretora}</span>
    <span class="rodape__eho">${ehoSVG}<span data-t="eho">${t('eho')}</span></span>
    <span>© ${ano}</span>
  </div>
</footer>

<a class="whats" href="${contato.whatsapp.link}" target="_blank" rel="noopener" data-t-aria="whatsFlutuante" aria-label="${t('whatsFlutuante')}">${whatsSVG}</a>`;
}
