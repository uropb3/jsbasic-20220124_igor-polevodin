import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.renderCarousel();

    this.renderRibbonMenu();

    this.renderStepSlider();

    this.renderCartIcon();    

    this.setCart();

    await this.setProducts();
    
    this.renderProductsGrid();

    this.updateProductsGrid({
      noNuts: document.querySelector('#nuts-checkbox').checked,
      vegeterianOnly: document.querySelector('#vegeterian-checkbox').checked,
      maxSpiciness: this._stepSlider.value,
      category: this._ribbonMenu.value
    })

    this.setEventListeners();
  }

  renderCarousel() {
    this._carousel = new Carousel(slides);

    document.querySelector('[data-carousel-holder]').append(this._carousel.elem);
  }

  renderRibbonMenu() {
    this._ribbonMenu = new RibbonMenu(categories);

    document.querySelector('[data-ribbon-holder]').append(this._ribbonMenu.elem);
  }

  renderStepSlider() {
    this._stepSlider = new StepSlider({ steps: 5, value: 3 });

    document.querySelector('[data-slider-holder]').append(this._stepSlider.elem);
  }

  renderCartIcon() {
    this._cartIcon = new CartIcon();

    document.querySelector('[data-cart-icon-holder]').append(this._cartIcon.elem);
  }

  setCart() {
    this._cart = new Cart(this._cartIcon);
  }

  async setProducts() {
    this._products = await this.getProducts();
  }

  async getProducts() {
    const response = await fetch('products.json');
    const result = await response.json();
    
    return result;
  }

  async renderProductsGrid() {
    this._productsGrid = new ProductsGrid(this._products);

    document.querySelector('[data-products-grid-holder]').append(this._productsGrid.elem);
  }

  updateProductsGrid(filters) {
    this._productsGrid.updateFilter(filters);
  }

  setEventListeners() {
    document.body.addEventListener('product-add', e => this._cart.addProduct(this._products.find(p => p.id === e.detail)));
    document.body.addEventListener('slider-change', e => this.updateProductsGrid({ maxSpiciness: e.detail }));  
    document.body.addEventListener('ribbon-select', e => this.updateProductsGrid({ category: e.detail }));
  
    document.querySelector('#nuts-checkbox').addEventListener('change', e => this.updateProductsGrid({ noNuts: e.target.checked }));
    document.querySelector('#vegeterian-checkbox').addEventListener('change', e => this.updateProductsGrid({ vegeterianOnly: e.target.checked }));
  }
}
