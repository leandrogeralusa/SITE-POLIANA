import '@fontsource-variable/fraunces/full.css';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/ibm-plex-mono/400.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/nav.css';
import './styles/hero.css';
import './styles/fecho.css';

import { idiomaInicial, fixarIdioma, iniciarIdioma } from './i18n.js';
import { nav } from './sections/nav.js';
import { hero } from './sections/hero.js';
import { fecho } from './sections/fecho.js';
import { iniciarNuvens } from './motion/nuvens.js';
import { iniciarPalco } from './motion/palco.js';
import { entrada } from './motion/entrada.js';
import { prepararHUD } from './motion/hud.js';
import { iniciarNav } from './motion/nav.js';
import { iniciarGrao } from './motion/grao.js';

const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;

// o HTML já sai no idioma certo (?lang=en, localStorage ou português)
const lang = idiomaInicial();
fixarIdioma(lang);
document.getElementById('app').innerHTML = `${nav()}<main id="conteudo">${hero()}${fecho()}</main>`;
iniciarIdioma(lang);

const heroEl = document.getElementById('hero');
const palco = heroEl.querySelector('.palco');

prepararHUD(palco);
iniciarNuvens(palco);
iniciarGrao();
iniciarNav({ reduz });
if (!reduz) iniciarPalco(heroEl);
entrada(palco, { reduz });
