import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;

    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>

        <div class="carousel__inner"></div>
      </div>
    `);

    const carouselInner = this.elem.querySelector('.carousel__inner');

    for (const slide of slides) {
      const carouselSlide = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);

      const button = carouselSlide.querySelector('.carousel__button');
      button.addEventListener('click', () => {
        button.dispatchEvent(new CustomEvent('product-add', {
          detail: slide.id,
          bubbles: true
        }));
      });

      carouselInner.append(carouselSlide);
    }

    const leftArrow = this.elem.querySelector('.carousel__arrow_left');
    const rightArrow = this.elem.querySelector('.carousel__arrow_right');
  
    let currentSlideIndex = 0;
  
    const setArrowsVisibility = () => {
      leftArrow.style.display = currentSlideIndex === 0 ? 'none' : '';
      rightArrow.style.display = currentSlideIndex === slides.length - 1 ? 'none' : '';
    };
  
    setArrowsVisibility();
  
    leftArrow.addEventListener('click', () => {
      carouselInner.style.transform = `translateX(-${--currentSlideIndex * carouselInner.querySelector('.carousel__slide').offsetWidth}px)`;
  
      setArrowsVisibility();
    });
    
    rightArrow.addEventListener('click', () => {
      carouselInner.style.transform = `translateX(-${++currentSlideIndex * carouselInner.querySelector('.carousel__slide').offsetWidth}px)`;
  
      setArrowsVisibility();
    });
  }
}
