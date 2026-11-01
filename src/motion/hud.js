// Relógios reais de Orlando e Brasília. Nunca calcular a diferença na mão:
// o Intl resolve o horário de verão americano (diferença de 1 ou 2 horas).

const formatos = new Map();
function minutosAgora(fuso) {
  if (!formatos.has(fuso)) {
    formatos.set(fuso, new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', hourCycle: 'h23', timeZone: fuso }));
  }
  const partes = formatos.get(fuso).formatToParts(new Date());
  const h = Number(partes.find((x) => x.type === 'hour').value) % 24;
  const m = Number(partes.find((x) => x.type === 'minute').value);
  return h * 60 + m;
}
const hhmm = (min) => {
  const v = ((Math.round(min) % 1440) + 1440) % 1440;
  return `${String(Math.floor(v / 60)).padStart(2, '0')}:${String(v % 60).padStart(2, '0')}`;
};

let relogios = [];
let tic = null;

function mostrarAgora() {
  relogios.forEach((r) => {
    const txt = hhmm(minutosAgora(r.dataset.fuso));
    if (r.textContent !== txt) r.textContent = txt;
  });
}
function andar() {
  mostrarAgora();
  clearInterval(tic);
  tic = setInterval(mostrarAgora, 1000);
}

export function prepararHUD(raiz = document) {
  relogios = [...raiz.querySelectorAll('.hud__hora')];
  relogios.forEach((r) => r.setAttribute('aria-live', 'off'));
}

// Movimento reduzido ou sem entrada: já mostra a hora certa e anda.
export function hudAoVivo() { andar(); }

// Entrada: os dois relógios rodam de 05:40 até a hora real.
export function contarHUD(gsap, duracao = 1.9) {
  const INICIO = 5 * 60 + 40;
  const alvos = relogios.map((r) => {
    let alvo = minutosAgora(r.dataset.fuso);
    if (alvo < INICIO) alvo += 1440;
    return alvo;
  });
  const estado = { v: 0 };
  relogios.forEach((r) => { r.textContent = hhmm(INICIO); });
  return gsap.to(estado, {
    v: 1,
    duration: duracao,
    ease: 'power2.inOut',
    onUpdate: () => relogios.forEach((r, i) => { r.textContent = hhmm(INICIO + (alvos[i] - INICIO) * estado.v); }),
    onComplete: andar,
  });
}
