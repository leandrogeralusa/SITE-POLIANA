import { t } from '../i18n.js';

// Barra centrada no topo. Sem logo: o logo é o nome gigante.
export function nav() {
  const link = (chave) => `<li><a href="#fecho" data-t="${chave}">${t(chave)}</a></li>`;
  return `
<nav class="nav" id="nav" data-t-aria="navRotulo" aria-label="${t('navRotulo')}">
  <ul class="nav__links">
    ${link('navComo')}${link('navImoveis')}${link('navInvestir')}${link('navContato')}
  </ul>
  <div class="nav__idioma" role="group" data-t-aria="idiomaRotulo" aria-label="${t('idiomaRotulo')}">
    <button type="button" data-lang="pt" aria-pressed="false"><span aria-hidden="true">PT</span><span class="sr-only" data-t="idiomaPt">${t('idiomaPt')}</span></button>
    <span class="nav__barra" aria-hidden="true">|</span>
    <button type="button" data-lang="en" aria-pressed="false"><span aria-hidden="true">EN</span><span class="sr-only" data-t="idiomaEn">${t('idiomaEn')}</span></button>
  </div>
</nav>`;
}
