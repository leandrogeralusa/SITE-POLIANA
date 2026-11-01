// Um grão de filme só, por cima de tudo: ladrilho de ruído cinza de 180 px gerado em canvas.
export function iniciarGrao() {
  const T = 180;
  const c = document.createElement('canvas');
  c.width = c.height = T;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(T, T);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = 128 + (Math.random() - 0.5) * 110;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
    img.data[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const el = document.createElement('div');
  el.className = 'grao';
  el.setAttribute('aria-hidden', 'true');
  el.style.backgroundImage = `url(${c.toDataURL('image/png')})`;
  document.body.appendChild(el);
}
