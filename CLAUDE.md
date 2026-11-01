# Poliana Landim — site (hero + fechamento)

Hero bilíngue (PT padrão, EN alternativo): uma casa da Flórida Central numa ilha flutuando no céu da manhã,
nuvens em camadas, nome gigante embaixo. Vite sem framework, HTML/CSS/JS puros.

```bash
npm install
npm run dev      # http://localhost:5190
npm run build    # gera dist/
npm run preview  # serve dist/ em http://localhost:5191
```

## Antes de publicar (pendências)
- **Imagens:** `arquivos/img/ilha.webp` e `nuvem-1..7.webp` são **placeholders gerados por código**
  (a ilha é uma ilustração SVG; as nuvens são procedurais). Troque pelos recortes finais com os mesmos nomes
  e copie para `public/img/` (`cp arquivos/img/* public/img/`). Mantenha a ilha em ~1400×1000 (a proporção
  1400/1000 está no CSS) com margem transparente em volta: nada pode encostar na borda do arquivo.
- `public/img/og.jpg` (1200×630, Open Graph) foi montado com essas imagens: refaça com as finais.
- `.env` → `VITE_SITE_URL` (canonical, hreflang, og:url, og:image). Hoje é um endereço provisório.
- `src/data/contato.js`: WhatsApp e e-mail são placeholders.
- `src/data/servicos.js`: confira cada valor e apague o que não é oferecido.
- Rodapé: confirme com o broker o texto exato exigido na Flórida (nome da corretora já aparece).

## Estrutura
- `index.html` — head com SEO (title, description, OG, hreflang pt-BR/en-US) e o script que põe
  `.pre-entrada` no `<html>` (trava de segurança de 6 s).
- `src/main.js` — monta as seções no idioma certo e liga os módulos.
- `src/i18n.js` — idioma por `?lang=en` → `localStorage` (`pl-idioma`, com try/catch) → `pt`.
  Troca `<html lang>`, `<title>`, meta description/OG, todo `[data-t]`, `[data-t-alt]`, `[data-t-aria]`,
  `[data-serv]`, com fade de 200 ms. O nome letra a letra não é tocado.
- `src/data/` — `textos.js` (PT/EN), `nuvens.js` (layouts), `servicos.js`, `contato.js`.
- `src/sections/` — `nav.js`, `hero.js`, `fecho.js` (uma seção por arquivo, devolvem HTML).
- `src/motion/` — `nuvens.js` (duração/atraso da deriva), `palco.js` (cursor + saída, por quadro),
  `entrada.js` (GSAP), `hud.js` (relógios via `Intl`), `nav.js` (some/volta, fica café no fechamento),
  `grao.js` (ruído de 180 px em canvas).
- `src/styles/` — `tokens.css` (cores, fontes, tamanhos), `base.css` (pílula, grão), `nav.css`, `hero.css`, `fecho.css`.

## Regra de ouro
Nenhuma camada ou fundo termina numa linha reta visível. Toda ponta é degradê (`mask-image`/gradiente)
ou fica sempre fora da tela. Faixas de névoa descem 3 alturas abaixo do palco; o céu é maior que o palco.

## Camadas (de trás para a frente) e o que mexe em cada uma
Cada camada tem duas caixas: `.camada` (escrita pelo `palco.js`: cursor + saída) e `.camada__in` (GSAP).

| camada | profundidade (cursor) | velocidade (saída) | extra na saída |
|---|---|---|---|
| céu | 0,05 | 0,06 | — |
| longe | 0,18 | 0,16 | — |
| horizonte | 0,34 | 0,32 | — |
| ilha | 0,58 | 0,6 | encolhe até 86%; some entre p 0,28–0,58; `--neblina` desfaz de baixo para cima (0,1–0,58) |
| frente | 1 | 1,25 | cresce até 138% (origem embaixo) |
| muro | 1 | 1,7 | começa 155% abaixo do topo; três fileiras + fundo creme |

Cursor: até 26 px (x) e 14 px (y) × profundidade, suavizado 5%/quadro, só com mouse.
Texto some até p 0,3; HUD até 0,22; sombra de nuvem até 0,28; véu off-white de 0,5 a 0,9.
O fechamento sobe 45svh (`margin-top: -45svh`) com degradê de 45svh no topo.

## Nuvens (`src/data/nuvens.js`)
`x` = centro inicial (fração da largura), `y` = centro (fração da altura), `w` = largura (fração da largura).
Velocidade de deriva por camada (px/s): longe 5, horizonte 9, frente 16, muro 11. Repetiu uma imagem?
Mude o tamanho **e** espelhe (`flip: true`).

### Desktop
| camada | peças |
|---|---|
| longe | 4 (x .10 y .30 w .15) · 5 espelhada (.88/.22/.16) · 4 espelhada (.74/.45/.10) · 5 (.27/.48/.09) · 7 (.50/.12/.12, o .6) |
| horizonte | 1 cúmulo alto (.13/.50/.30) · 2 banco largo (.46/.63/.74) · 3 espelhado (.90/.60/.52) · 7 espelhada (.72/.55/.26) + névoa a 64% |
| frente | 6 (.28/.80/.84) · 2 espelhada (.84/.86/.78) · 7 (.58/.72/.32) · 3 (1.18/.76/.50) + névoa a 86% |
| muro | 3 fileiras (y 0, ~.22, ~.45 abaixo do topo do muro), larguras 0,55–1,3 |

### Celular (≤ 760 px)
| camada | peças |
|---|---|
| longe | 4 (.12/.17/.38) · 5 espelhada (.86/.42/.36) |
| horizonte | 1 (.18/.40/.70) · 2 espelhada (.62/.50/1.7) |
| frente | 6 (.35/.70/1.9) · 3 espelhada (.95/.84/1.6) |
| muro | 4 peças de 1,2 a 2,6 larguras |

Ilha: desktop centro 51,5% × 40,5%, largura `min(62vw, 96svh)`; celular 50% × 32%, 98vw.

## Movimento reduzido
Sem deriva, flutuação, parallax, giro do sol e saída; o palco não fica preso; a base vai a um tom fixo e
desfaz em off-white até o fechamento (`margin-top: 0`); o HUD já mostra a hora certa e anda.

## Conferência
Prints headless (Playwright) em 1456×840 e 390×844, PT e EN: hero após ~5 s, saída em 15/30/45/62/80%
(desktop) e 45% (celular), e o fechamento. Procurar linha reta horizontal e pedacinho solto.
