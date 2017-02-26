import $ from 'jquery';
window.$ = $;

const a3W = 3508;
const a3H = 4961;

const $main = $(`#main`);
const $a3 = $(`#a3`);
const mainWidth = $main.width();
const mainHeight = $main.height();
const a3Width = $a3.width();
const ratio = a3Width / mainWidth;
const canvas = document.getElementById(`canvas`);
const ctx = canvas.getContext(`2d`);
const canvasLarge = document.getElementById(`a3`);
const ctxLarge = canvasLarge.getContext(`2d`);

const t1 = `NO SIR`;
const t1Size = 200;
const t2 = `MUSLIM`;
const t2Size = 80;
const t3 = `BAN`;
const t3Size = 120;

function setCanvas() {
  canvas.width = mainWidth;
  canvas.height = mainHeight;
  ctx.fillStyle = `white`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function setText(c, context, ratio = 1) {
  context.fillStyle = `black`;
  context.textAlign = `center`;
  context.textBaseline = `middle`;

  context.font = `400 ${t1Size * ratio}px Montserrat`;
  const fitRatio = (c.width * 0.87) / context.measureText(t1).width;
  context.font = `400 ${t1Size * ratio * fitRatio}px Montserrat`;
  context.fillText(t1, c.width / 2, (c.height / 4));
  // console.log(`${context.measureText(t1).width}`);

  context.font = `400 ${t2Size * ratio}px Montserrat`;
  context.fillText(t2, c.width / 2, (c.height / 4) * 2);

  context.font = `400 ${t3Size * ratio}px Montserrat`;
  context.fillText(t3, c.width / 2, (c.height / 4) * 3);
}

function setCanvasLarge() {
  ctxLarge.fillStyle = `white`;
  ctxLarge.fillRect(0, 0, canvasLarge.width, canvasLarge.height);
}

setCanvas();
setText(canvas, ctx);

setCanvasLarge();
setText(canvasLarge, ctxLarge, ratio);

$(`#download`).on(`click`, () => {
  const dataURL = canvasLarge.toDataURL();
  const a = document.createElement(`a`);

  a.href = dataURL;
  a.download = `poster.png`;
  a.click();
});

// 2 lines
// split = h / 3;
// 1 = split * 1;
// 2 = split * 2;

// 3 lines
// split = h / 4
// 1 = split * 1;
// 2 = split * 2;
// 3 = split * 3;

