import $ from 'jquery';
window.$ = $;

let lines = [
  { text: `NO`, weight: 400 },
  { text: `MUSLIM`, weight: 400 },
  { text: `BAN`, weight: 400 }
];

class Poster {
  constructor(id, parentId) {
    this.id = id;
    this.parent = $(`#${parentId}`);
    this.poster = document.getElementById(this.id);
    this.posterCtx = this.poster.getContext(`2d`);
  }

  setDimensions() {
    this.poster.width = this.parent.width();
    this.poster.height = this.parent.height();
  }

  resize() {
    this.setDimensions();
  }

  render() {
    this.setDimensions();
  }
}

class Lines {
  constructor(lines = [], posterId, printId) {
    this.lines = lines;
    this.canvas = document.getElementById(posterId);
    this.ctx = this.canvas.getContext(`2d`);
    this.print = document.getElementById(printId);
    this.printCtx = this.print.getContext(`2d`);
  }

  drawLine(canvas, ctx, line, lineIndex, ratio = 1) {
    let fitRatio;
    this.fontSize = 200;

    ctx.font = `${line.weight} ${this.fontSize * ratio}px Montserrat`;
    fitRatio = (canvas.width * 0.87) / ctx.measureText(line.text).width;
    ctx.font = `${line.weight} ${this.fontSize * ratio * fitRatio}px Montserrat`;
    ctx.fillText(line.text, canvas.width / 2, this.getLineHeight(canvas) * (lineIndex + 1));
  }

  getLineHeight(canvas) {
    return canvas.height / (this.lines.length + 1);
  }

  setCanvas(canvas, ctx) {
    ctx.fillStyle = `white`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = `black`;
    ctx.textAlign = `center`;
    ctx.textBaseline = `middle`;
  }

  drawText() {
    const fontRatio = this.print.width / this.canvas.width;

    this.setCanvas(this.canvas, this.ctx);
    this.setCanvas(this.print, this.printCtx);

    for (let line of this.lines) {
      const index = this.lines.indexOf(line);

      this.drawLine(this.canvas, this.ctx, line, index);
      this.drawLine(this.print, this.printCtx, line, index, fontRatio);
    }
  }

  render() {
    this.drawText();
  }
}

const poster = new Poster(`poster-edit`, `main`);
const text = new Lines(lines, `poster-edit`, `poster-print`);

poster.render();
text.render();

$(window).on(`resize`, () => {
  poster.resize();
  text.render();
});

$(`#download`).on(`click`, () => {
  const print = document.getElementById(`print`);
  const dataURL = print.toDataURL();
  const a = document.createElement(`a`);

  a.href = dataURL;
  a.download = `poster.png`;
  a.click();
});
