import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    const valuePercents = value / (steps - 1) * 100;
    const elem = createElement(`
      <div class="slider">
        <div class="slider__thumb" style="left: ${valuePercents}%;">
          <span class="slider__value">${value}</span>
        </div>

        <div class="slider__progress" style="width: ${valuePercents}%;"></div>

        <div class="slider__steps"></div>
      </div>
    `);

    this.elem = elem;

    const sliderSteps = elem.querySelector('.slider__steps');

    for (let i = 0; i < steps; i++) {
      sliderSteps.append(createElement(`<span ${i === value ? 'class="slider__step-active"' : ''}></span`));
    }

    elem.addEventListener('click', e => {
      const sliderValue = elem.querySelector('.slider__value');

      const oldValue = sliderValue.textContent;

      sliderSteps.children[oldValue].classList.remove('slider__step-active');

      const newValue = Math.round((e.clientX - elem.getBoundingClientRect().left) / elem.offsetWidth * (steps - 1));

      sliderValue.textContent = newValue;

      sliderSteps.children[newValue].classList.add('slider__step-active'); 

      const newValuePercents = newValue / (steps - 1) * 100;      
      elem.querySelector('.slider__thumb').style.left = `${newValuePercents}%`;
      elem.querySelector('.slider__progress').style.width = `${newValuePercents}%`;

      if (oldValue !== newValue) {
        elem.dispatchEvent(new CustomEvent('slider-change', { 
          detail: newValue, 
          bubbles: true
        }));
      }
    });
  }
}
