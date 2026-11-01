import { t } from '../i18n.js';
export { setaSVG } from './hero.js';

// Cabeçalho padrão de seção: rótulo mono + título em Fraunces (duas linhas) + intro opcional.
export function topo({ rotulo, t1, t2, id, intro, claro = false }) {
  return `
  <header class="secao__topo${claro ? ' secao__topo--claro' : ''}" data-revela>
    <div>
      <p class="rotulo" data-t="${rotulo}">${t(rotulo)}</p>
      <h2 class="secao__titulo" id="${id}"><span data-t="${t1}">${t(t1)}</span><br><span data-t="${t2}">${t(t2)}</span></h2>
    </div>
    ${intro ? `<p class="secao__intro" data-t="${intro}">${t(intro)}</p>` : ''}
  </header>`;
}

export const whatsSVG = `<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 2.2a9.7 9.7 0 0 0-8.4 14.6L2.3 21.7l5-1.3A9.7 9.7 0 1 0 12 2.2Zm0 17.7a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 19.9Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8.9c-.1.2-.3.2-.5.1a6.5 6.5 0 0 1-3.2-2.8c-.2-.4.2-.4.7-1.2.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.7.3 2.8 2.8 0 0 0-.9 2.1 4.9 4.9 0 0 0 1 2.6 11.2 11.2 0 0 0 4.3 3.8c1.6.7 2.2.7 3 .6a2.6 2.6 0 0 0 1.7-1.2 2.1 2.1 0 0 0 .2-1.2c-.1-.1-.3-.2-.5-.3Z"/></svg>`;
