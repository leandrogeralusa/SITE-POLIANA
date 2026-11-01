// Busca de imóveis: com IDX configurado, vai para a busca do MLS;
// sem IDX, abre o WhatsApp com a mensagem pronta.
import { t } from '../i18n.js';
import { contato, idx } from '../data/contato.js';

const ATALHOS = { piscina: 'atalhoPiscina', temporada: 'atalhoTemporada', planta: 'atalhoPlanta', ate400: 'atalhoAte400' };

export function iniciarBusca() {
  const form = document.getElementById('busca');
  if (!form) return;
  const campo = form.querySelector('#busca-q');

  const acrescentar = (texto) => {
    const atual = campo.value.trim();
    if (atual.toLowerCase().includes(texto.toLowerCase())) return;
    campo.value = atual ? `${atual} · ${texto}` : texto;
  };

  form.addEventListener('click', (e) => {
    const b = e.target.closest('[data-atalho]');
    if (!b) return;
    acrescentar(t(ATALHOS[b.dataset.atalho]));
    campo.focus();
  });

  // clicar num bairro já preenche a busca
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-busca]');
    if (!a) return;
    campo.value = a.dataset.busca;
    setTimeout(() => campo.focus({ preventScroll: true }), 700);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const q = campo.value.trim();
    const tipo = new FormData(form).get('tipo');
    if (idx.url) {
      const u = new URL(idx.url);
      if (q) u.searchParams.set('q', q);
      u.searchParams.set('tipo', tipo);
      window.open(u.toString(), '_blank', 'noopener');
      return;
    }
    const msg = `${t(tipo === 'aluguel' ? 'buscaMsgAlugar' : 'buscaMsgComprar')} ${q}`.trim();
    const u = new URL(contato.whatsapp.link);
    u.searchParams.set('text', msg);
    window.open(u.toString(), '_blank', 'noopener');
  });
}
