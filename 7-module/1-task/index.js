import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;

    const elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>

        <nav class="ribbon__inner"></nav>

        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    this.elem = elem;

    const ribbonInner = elem.querySelector('.ribbon__inner');

    for (const category of categories) {
      const ribbonItem = createElement(`<a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>`);

      if (category.id === '') {
        ribbonItem.classList.add('ribbon__item_active');
      }

      ribbonItem.addEventListener('click', e => {
        e.preventDefault();

        ribbonInner.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active');

        e.target.classList.add('ribbon__item_active');

        elem.dispatchEvent(new CustomEvent('ribbon-select', { 
          detail: category.id,
          bubbles: true
        }));
      });

      ribbonInner.append(ribbonItem);
    }

    const leftArrow = elem.querySelector('.ribbon__arrow_left');
    const rightArrow = elem.querySelector('.ribbon__arrow_right');

    leftArrow.addEventListener('click', () => ribbonInner.scrollBy(-350, 0));
    rightArrow.addEventListener('click', () => ribbonInner.scrollBy(350, 0));

    ribbonInner.addEventListener('scroll', () => {
      if (ribbonInner.scrollLeft === 0) {
        leftArrow.classList.remove('ribbon__arrow_visible');
      } else {
        leftArrow.classList.add('ribbon__arrow_visible');
      }

      if (ribbonInner.scrollWidth - ribbonInner.scrollLeft - ribbonInner.clientWidth < 1) {
        rightArrow.classList.remove('ribbon__arrow_visible');
      } else {
        rightArrow.classList.add('ribbon__arrow_visible');
      }
    });
  }
}
