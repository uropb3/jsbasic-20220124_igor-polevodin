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

    const sliderThumb = elem.querySelector('.slider__thumb');

    sliderThumb.ondragstart = () => false;
    
    const sliderValue = elem.querySelector('.slider__value');

    elem.addEventListener('click', e => {
      const oldValue = parseInt(sliderValue.textContent);

      sliderSteps.children[oldValue].classList.remove('slider__step-active');

      const newValue = Math.round((e.clientX - elem.getBoundingClientRect().left) / elem.offsetWidth * (steps - 1));

      sliderValue.textContent = newValue;

      sliderSteps.children[newValue].classList.add('slider__step-active'); 

      const newValuePercents = newValue / (steps - 1) * 100;      
      elem.querySelector('.slider__thumb').style.left = `${newValuePercents}%`;
      elem.querySelector('.slider__progress').style.width = `${newValuePercents}%`;

      elem.dispatchEvent(new CustomEvent('slider-change', { 
        detail: newValue, 
        bubbles: true
      }));
    });

    const onPointerMove = e => {
      e.preventDefault();
  
      const oldValue = parseInt(sliderValue.textContent);

      sliderSteps.children[oldValue].classList.remove('slider__step-active');

      let leftRelative = (e.clientX - elem.getBoundingClientRect().left) / elem.offsetWidth;
      if (leftRelative < 0) {
        leftRelative = 0;
      }
      if (leftRelative > 1) {
        leftRelative = 1;
      }

      const newValue = Math.round(leftRelative * (steps - 1));

      sliderValue.textContent = newValue;

      sliderSteps.children[newValue].classList.add('slider__step-active'); 

      const newValuePercents = leftRelative * 100;      
      sliderThumb.style.left = `${newValuePercents}%`;
      elem.querySelector('.slider__progress').style.width = `${newValuePercents}%`;
    };

    sliderThumb.addEventListener('pointerdown', e => {
      e.preventDefault();

      elem.classList.add('slider_dragging');

      document.addEventListener('pointermove', onPointerMove);
    });

    document.addEventListener('pointerup', () => {
      elem.classList.remove('slider_dragging');

      document.removeEventListener('pointermove', onPointerMove);

      elem.dispatchEvent(new CustomEvent('slider-change', { 
        detail: parseInt(sliderValue.textContent), 
        bubbles: true
      }));
    });
  }
}
