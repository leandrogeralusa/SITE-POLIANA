import { t, d } from '../i18n.js';
import { bairros } from '../data/bairros.js';
import { topo, setaSVG } from './comum.js';

export function secaoBairros() {
  const cards = bairros
    .map((b, i) => {
      const midia = b.foto
        ? `<img src="${b.foto}" alt="" loading="lazy" decoding="async">`
        : `<span class="bairro__provisorio" style="--c1:${b.tom[0]};--c2:${b.tom[1]}"><span data-t="fotoEmBreve">${t('fotoEmBreve')}</span></span>`;
      return `
      <li class="bairro" data-revela style="--i:${i % 3}">
        <a class="bairro__link" href="#imoveis" data-busca="${b.busca}">
          <span class="bairro__midia">${midia}</span>
          <span class="bairro__base">
            <h3 class="bairro__nome" data-d="bairros.${i}.nome">${d(`bairros.${i}.nome`)}</h3>
            <span class="bairro__ver"><span data-t="bairroVer">${t('bairroVer')}</span>${setaSVG}</span>
          </span>
          <p class="bairro__texto" data-d="bairros.${i}.texto">${d(`bairros.${i}.texto`)}</p>
        </a>
      </li>`;
    })
    .join('');
  return `
<section class="secao" id="bairros" aria-labelledby="bairros-titulo">
  ${topo({ rotulo: 'bairrosRotulo', t1: 'bairrosTitulo1', t2: 'bairrosTitulo2', id: 'bairros-titulo', intro: 'bairrosIntro' })}
  <ul class="bairros">${cards}</ul>
</section>`;
}
