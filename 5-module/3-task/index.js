function initCarousel() {
  const carouselInner = document.querySelector('.carousel__inner');

  const leftArrow = document.querySelector('.carousel__arrow_left');
  const rightArrow = document.querySelector('.carousel__arrow_right');

  const slideWidth = document.querySelector('.carousel__slide').offsetWidth;

  let currentSlideIndex = 0;

  const setArrowsVisibility = () => {
    leftArrow.style.display = currentSlideIndex === 0 ? 'none' : '';
    rightArrow.style.display = currentSlideIndex === 3 ? 'none' : '';
  };

  setArrowsVisibility();

  leftArrow.addEventListener('click', () => {
    carouselInner.style.transform = `translateX(-${--currentSlideIndex * slideWidth}px)`;

    setArrowsVisibility();
  });
  
  rightArrow.addEventListener('click', () => {
    carouselInner.style.transform = `translateX(-${++currentSlideIndex * slideWidth}px)`;

    setArrowsVisibility();
  });
}
