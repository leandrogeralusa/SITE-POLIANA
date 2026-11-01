import { t, d } from '../i18n.js';
import { depoimentos } from '../data/depoimentos.js';

// Só aparece quando houver depoimentos reais em src/data/depoimentos.js.
export function secaoDepoimentos() {
  if (!depoimentos.length) return '';
  const itens = depoimentos
    .map((c, i) => `
      <li class="depoimento" data-revela style="--i:${i % 3}">
        <blockquote><p data-d="depoimentos.${i}.texto">${d(`depoimentos.${i}.texto`)}</p></blockquote>
        <p class="depoimento__quem">${c.nome}<span>${c.local ?? ''}</span></p>
      </li>`)
    .join('');
  return `
<section class="secao" id="depoimentos" aria-labelledby="depoimentos-titulo">
  <header class="secao__topo" data-revela>
    <div>
      <p class="rotulo" data-t="depoimentosRotulo">${t('depoimentosRotulo')}</p>
      <h2 class="secao__titulo" id="depoimentos-titulo" data-t="depoimentosTitulo">${t('depoimentosTitulo')}</h2>
    </div>
  </header>
  <ul class="depoimentos">${itens}</ul>
</section>`;
}
