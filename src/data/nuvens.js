// Posição de cada nuvem por camada, no desktop e no celular.
//   img  número do arquivo public/img/nuvem-N.webp
//   x    centro inicial, em fração da largura do palco (0 = borda esquerda, 1 = direita)
//   y    centro, em fração da altura do palco
//   w    largura, em fração da largura do palco
//   flip espelha a nuvem (repetiu a imagem? mude o tamanho E espelhe)
//   o    opacidade (opcional)
// Todas derivam para a direita em loop; x é só onde cada uma começa.
// A velocidade (px/s) é por camada: longe devagar, frente mais rápido.

export const velocidade = { longe: 5, horizonte: 9, frente: 16, muro: 11 };

export const nuvens = {
  desktop: {
    // pequenas, frias, dos dois lados da ilha
    longe: [
      { img: 4, x: 0.1, y: 0.3, w: 0.15 },
      { img: 5, x: 0.88, y: 0.22, w: 0.16, flip: true },
      { img: 4, x: 0.74, y: 0.45, w: 0.1, flip: true, o: 0.85 },
      { img: 5, x: 0.27, y: 0.48, w: 0.09, o: 0.8 },
      { img: 7, x: 0.5, y: 0.12, w: 0.12, o: 0.6 },
    ],
    // cúmulo alto à esquerda + dois bancos largos (um espelhado)
    horizonte: [
      { img: 1, x: 0.13, y: 0.5, w: 0.3 },
      { img: 2, x: 0.46, y: 0.63, w: 0.74 },
      { img: 3, x: 0.9, y: 0.6, w: 0.52, flip: true },
      { img: 7, x: 0.72, y: 0.55, w: 0.26, flip: true, o: 0.9 },
    ],
    // passam sobre a base da ilha e atrás do nome
    frente: [
      { img: 6, x: 0.28, y: 0.8, w: 0.84 },
      { img: 2, x: 0.84, y: 0.86, w: 0.78, flip: true },
      { img: 7, x: 0.58, y: 0.72, w: 0.32 },
      { img: 3, x: 1.18, y: 0.76, w: 0.5 },
    ],
    // muro da saída: três fileiras enormes, sobrepostas (y relativo ao topo do muro, em alturas de tela)
    muro: [
      { img: 6, x: 0.18, y: 0.0, w: 1.15 },
      { img: 2, x: 0.78, y: 0.04, w: 1.1, flip: true },
      { img: 1, x: 0.5, y: 0.0, w: 0.55 },
      { img: 6, x: 0.62, y: 0.22, w: 1.25, flip: true },
      { img: 3, x: 0.05, y: 0.25, w: 1.0 },
      { img: 6, x: 0.35, y: 0.44, w: 1.3 },
      { img: 2, x: 0.95, y: 0.46, w: 1.2 },
    ],
  },

  celular: {
    longe: [
      { img: 4, x: 0.12, y: 0.17, w: 0.38 },
      { img: 5, x: 0.86, y: 0.42, w: 0.36, flip: true },
    ],
    horizonte: [
      { img: 1, x: 0.18, y: 0.4, w: 0.7 },
      { img: 2, x: 0.62, y: 0.5, w: 1.7, flip: true },
    ],
    frente: [
      { img: 6, x: 0.35, y: 0.7, w: 1.9 },
      { img: 3, x: 0.95, y: 0.84, w: 1.6, flip: true },
    ],
    muro: [
      { img: 6, x: 0.3, y: 0.0, w: 2.4 },
      { img: 1, x: 0.85, y: 0.02, w: 1.2 },
      { img: 2, x: 0.6, y: 0.2, w: 2.6, flip: true },
      { img: 6, x: 0.1, y: 0.38, w: 2.6, flip: true },
    ],
  },
};
