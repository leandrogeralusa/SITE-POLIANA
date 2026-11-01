import { t } from '../i18n.js';
import { contato, foto } from '../data/contato.js';
import { setaSVG } from './comum.js';
import { solSVG } from './hero.js';

export function secaoSobre() {
  const retrato = foto.poliana
    ? `<img src="${foto.poliana}" alt="Poliana Landim" loading="lazy" decoding="async">`
    : `<span class="sobre__provisorio"><span class="sobre__mono">PL</span><span class="rotulo" data-t="sobreFotoEmBreve">${t('sobreFotoEmBreve')}</span></span>`;
  return `
<section class="secao secao--cafe sobre" id="sobre" aria-labelledby="sobre-titulo">
  <div class="sobre__grade">
    <figure class="sobre__foto" data-revela>${retrato}</figure>
    <div class="sobre__texto" data-revela style="--i:1">
      <p class="rotulo" data-t="sobreRotulo">${t('sobreRotulo')}</p>
      <h2 class="sobre__nome" id="sobre-titulo">Poliana <em>Landim</em><span class="sobre__sol">${solSVG()}</span></h2>
      <p class="sobre__sub" data-t="sobreSub">${t('sobreSub')}</p>
      <p data-t="sobreP1">${t('sobreP1')}</p>
      <p data-t="sobreP2">${t('sobreP2')}</p>
      <dl class="sobre__dados">
        <div><dt data-t="sobreLigar">${t('sobreLigar')}</dt><dd><a href="${contato.whatsapp.link}" target="_blank" rel="noopener">${contato.whatsapp.texto}</a></dd></div>
        <div><dt data-t="sobreEscrever">${t('sobreEscrever')}</dt><dd><a href="${contato.email.link}">${contato.email.texto}</a></dd></div>
        <div><dt data-t="sobreIdiomas">${t('sobreIdiomas')}</dt><dd data-t="sobreIdiomasValor">${t('sobreIdiomasValor')}</dd></div>
      </dl>
      <a class="pilula" href="#contato"><span class="pilula__txt" data-t="cta">${t('cta')}</span><span class="pilula__circ">${setaSVG}</span></a>
    </div>
  </div>
</section>`;
}
