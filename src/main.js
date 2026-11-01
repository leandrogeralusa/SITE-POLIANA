import '@fontsource-variable/fraunces/full.css';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/ibm-plex-mono/400.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/nav.css';
import './styles/hero.css';
import './styles/fecho.css';
import './styles/secoes.css';

import { idiomaInicial, fixarIdioma, iniciarIdioma } from './i18n.js';
import { nav } from './sections/nav.js';
import { hero } from './sections/hero.js';
import { como } from './sections/como.js';
import { secaoBairros } from './sections/bairros.js';
import { secaoImoveis } from './sections/imoveis.js';
import { secaoInvestir } from './sections/investir.js';
import { secaoSobre } from './sections/sobre.js';
import { secaoDepoimentos } from './sections/depoimentos.js';
import { secaoContato, rodape } from './sections/contato.js';
import { iniciarRevelar } from './motion/revelar.js';
import { iniciarBusca } from './motion/busca.js';
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
document.getElementById('app').innerHTML = `${nav()}<main id="conteudo">${hero()}${como()}${secaoBairros()}${secaoImoveis()}${secaoInvestir()}${secaoSobre()}${secaoDepoimentos()}${secaoContato()}</main>${rodape()}`;
iniciarIdioma(lang);

const heroEl = document.getElementById('hero');
const palco = heroEl.querySelector('.palco');

prepararHUD(palco);
iniciarNuvens(palco);
iniciarGrao();
iniciarNav({ reduz });
if (!reduz) iniciarPalco(heroEl);
entrada(palco, { reduz });
iniciarRevelar({ reduz });
iniciarBusca();
