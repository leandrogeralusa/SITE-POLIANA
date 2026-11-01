import { t, d } from '../i18n.js';
import { destaques } from '../data/destaques.js';
import { idx } from '../data/contato.js';
import { topo, setaSVG } from './comum.js';

export function secaoImoveis() {
  const atalho = (k, valor) => `<li><button type="button" class="chip" data-atalho="${valor}" data-t="${k}">${t(k)}</button></li>`;
  const casas = destaques.length
    ? `<ul class="destaques">${destaques.map((c, i) => `
        <li class="casa" data-revela style="--i:${i % 3}">
          <a href="${c.link}" target="_blank" rel="noopener">
            <span class="casa__midia"><img src="${c.foto}" alt="" loading="lazy"></span>
            <span class="casa__preco">${c.preco}</span>
            <h3 class="casa__titulo" data-d="destaques.${i}.titulo">${d(`destaques.${i}.titulo`)}</h3>
            <p class="casa__local" data-d="destaques.${i}.local">${d(`destaques.${i}.local`)}</p>
          </a>
        </li>`).join('')}</ul>`
    : '';

  return `
<section class="secao secao--areia" id="imoveis" aria-labelledby="imoveis-titulo">
  ${topo({ rotulo: 'imoveisRotulo', t1: 'imoveisTitulo1', t2: 'imoveisTitulo2', id: 'imoveis-titulo' })}
  <form class="busca" id="busca" role="search" data-revela>
    <div class="busca__tipo" role="radiogroup" data-t-aria="buscaRotulo" aria-label="${t('buscaRotulo')}">
      <label><input type="radio" name="tipo" value="venda" checked><span data-t="buscaComprar">${t('buscaComprar')}</span></label>
      <label><input type="radio" name="tipo" value="aluguel"><span data-t="buscaAlugar">${t('buscaAlugar')}</span></label>
    </div>
    <div class="busca__campo">
      <label class="sr-only" for="busca-q" data-t="buscaRotulo">${t('buscaRotulo')}</label>
      <input id="busca-q" name="q" type="search" autocomplete="off" data-t-ph="buscaPlaceholder" placeholder="${t('buscaPlaceholder')}">
      <button class="pilula pilula--cafe" type="submit"><span class="pilula__txt" data-t="buscaBotao">${t('buscaBotao')}</span><span class="pilula__circ">${setaSVG}</span></button>
    </div>
    <div class="busca__atalhos">
      <span class="rotulo" data-t="buscaAtalhos">${t('buscaAtalhos')}</span>
      <ul>${atalho('atalhoPiscina', 'piscina')}${atalho('atalhoTemporada', 'temporada')}${atalho('atalhoPlanta', 'planta')}${atalho('atalhoAte400', 'ate400')}</ul>
    </div>
    ${idx.url ? '' : `<p class="busca__nota" data-t="buscaNotaWhats">${t('buscaNotaWhats')}</p>`}
  </form>
  ${casas}
</section>`;
}
