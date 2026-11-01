import { t, idioma, d } from '../i18n.js';
import { servicos } from '../data/servicos.js';
import { passos } from '../data/passos.js';

// Primeiro bloco depois do hero: sobe 45svh por cima do fim do hero (classe .fecho).
export function como() {
  const lang = idioma();
  const dados = servicos
    .map((s, i) => `<div class="dados__item"><dt data-d="servicos.${i}.0">${s[lang][0]}</dt><dd data-d="servicos.${i}.1">${s[lang][1]}</dd></div>`)
    .join('');
  const lista = passos
    .map((_, i) => `
      <li class="passo" data-revela style="--i:${i}">
        <span class="passo__n">${String(i + 1).padStart(2, '0')}</span>
        <h3 class="passo__titulo" data-d="passos.${i}.titulo">${d(`passos.${i}.titulo`)}</h3>
        <p class="passo__texto" data-d="passos.${i}.texto">${d(`passos.${i}.texto`)}</p>
      </li>`)
    .join('');

  return `
<section class="fecho" id="como" aria-labelledby="como-titulo" tabindex="-1">
  <div class="fecho__in">
    <p class="rotulo" data-t="fechoRotulo">${t('fechoRotulo')}</p>
    <div class="como__cab">
      <h2 class="fecho__titulo" id="como-titulo"><span data-t="fechoTitulo1">${t('fechoTitulo1')}</span><br><span data-t="fechoTitulo2">${t('fechoTitulo2')}</span></h2>
      <p class="secao__intro" data-t="passosIntro">${t('passosIntro')}</p>
    </div>
    <ol class="passos">${lista}</ol>
    <dl class="dados" data-revela>${dados}</dl>
  </div>
</section>`;
}
