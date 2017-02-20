import $ from 'jquery';
window.$ = $;

const $poster = $(`.js-poster`);
const $orientation = $(`.js-orientation`);
const $inputText = $(`.js-input-text`);
const $line = $(`.js-line`);
const lineInnerClass = `.js-line-inner`;

const setText = (id, text) => {
  $line.eq(id - 1).find(lineInnerClass).text(text);
};

const setFontSize = (id) => {
  const $parent = $line.eq(id - 1);
  const $child = $parent.find(lineInnerClass);
  const maxWidth = $parent.width();
  const currWidth = $child.width();
  const fontRatio = maxWidth / currWidth;
  const style = $child.attr(`style`);
  let emValue = 1;
  let childHeight;

  // If font size is already set get value in ems
  if (style) {
    const parentFontSize = $poster.css(`font-size`);
    const childFontSize = $child.css(`font-size`);

    emValue = parseFloat(childFontSize) / parseFloat(parentFontSize);
  }

  $child.css(`font-size`, `${fontRatio * emValue}em`);

  childHeight = $child.height();
  $parent.height(childHeight);
};

$orientation.on(`click`, () => {
  const checked = $(`input[name=orientation]:checked`).attr(`id`);

  if (checked === `landscape`) {
    $poster.addClass(`poster--landscape`);
  } else {
    $poster.removeClass(`poster--landscape`);
  }
});

$inputText.on(`mouseup keyup`, (e) => {
  const $this = $(e.currentTarget);
  const id = $this.parents(`.js-edit`).data(`line`);
  const text = $this.val();

  setText(id, text);
  setFontSize(id);
});
