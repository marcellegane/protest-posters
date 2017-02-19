import $ from 'jquery';
import { TweenLite, CSSPlugin } from 'gsap';
window.$ = $;

const module = () => {
  console.log(`module`);
};

export { module };
