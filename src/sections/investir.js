import { t, d } from '../i18n.js';
import { caminhos, depois } from '../data/investir.js';
import { topo } from './comum.js';

// ícones finos, desenho próprio
const icones = [
  '<path d="M6 30V16l12-9 12 9v14H6Z"/><path d="M14 30v-8h8v8"/>',
  '<path d="M4 26c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 6 2 3-2 4-2"/><path d="M10 20V8l10-3v15"/><circle cx="27" cy="9" r="3"/>',
  '<path d="M6 30h24"/><path d="M9 30V12h10v18"/><path d="M19 18h8v12"/><path d="M12 16h4M12 20h4M12 24h4"/><path d="M9 12l5-6 5 6"/>',
];

export function secaoInvestir() {
  const cards = caminhos
    .map((_, i) => `
      <li class="caminho" data-revela style="--i:${i}">
        <svg class="caminho__icone" viewBox="0 0 36 36" aria-hidden="true" focusable="false"><g fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">${icones[i % icones.length]}</g></svg>
        <h3 class="caminho__titulo" data-d="caminhos.${i}.titulo">${d(`caminhos.${i}.titulo`)}</h3>
        <p class="caminho__texto" data-d="caminhos.${i}.texto">${d(`caminhos.${i}.texto`)}</p>
      </li>`)
    .join('');
  const lista = depois.map((_, i) => `<li data-d="depois.${i}.0">${d(`depois.${i}.0`)}</li>`).join('');
  return `
<section class="secao" id="investir" aria-labelledby="investir-titulo">
  ${topo({ rotulo: 'investirRotulo', t1: 'investirTitulo1', t2: 'investirTitulo2', id: 'investir-titulo', intro: 'investirIntro' })}
  <ul class="caminhos">${cards}</ul>
  <div class="depois" data-revela>
    <h3 class="depois__titulo" data-t="depoisTitulo">${t('depoisTitulo')}</h3>
    <ul class="depois__lista">${lista}</ul>
  </div>
</section>`;
}
