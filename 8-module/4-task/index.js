import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (product) {
      let cartItem = this.cartItems.find(i => i.product.id === product.id);

      if (cartItem) {
        cartItem.count++;
      } else {
        cartItem = { 
          product, 
          count: 1 
        };

        this.cartItems.push(cartItem);
      }
  
      this.onProductUpdate(cartItem);
    }
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(i => i.product.id === productId);
    
    cartItem.count += amount;

    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((totalCount, item) => totalCount + item.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((totalPrice, item) => totalPrice + item.count * item.product.price, 0);
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this._modal = new Modal();

    this._modal.setTitle('Your order');

    const cartElem = createElement('<div></div>');

    for (const item of this.cartItems) {
      const productElem = this.renderProduct(item.product, item.count);

      productElem.querySelector('.cart-counter__button_minus').addEventListener('click', () => this.updateProductCount(item.product.id, -1));
      productElem.querySelector('.cart-counter__button_plus').addEventListener('click', () => this.updateProductCount(item.product.id, 1));

      cartElem.append(productElem);
    }

    const formElem = this.renderOrderForm();
    formElem.addEventListener('submit', e => this.onSubmit(e));
    cartElem.append(formElem);

    this._modal.setBody(cartElem);

    this._modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.body.classList.contains('is-modal-open')) {
      if (this.cartItems.length > 0) {
        const modalBody = this._modal.elem.querySelector('.modal__body');
  
        modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-counter__count`).innerHTML = cartItem.count;
        modalBody.querySelector(`[data-product-id="${cartItem.product.id}"] .cart-product__price`).innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`;
        modalBody.querySelector(`.cart-buttons__info-price`).innerHTML = `€${this.getTotalPrice().toFixed(2)}`;      
      } else {
        this._modal.close();
      }
    } 
  }

  onSubmit(event) {
    event.preventDefault();

    event.target.querySelector('[type="submit"]').classList.add('is-loading');

    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: new FormData(event.target)
    }).then(() => {
      this._modal.setTitle('Success!');
      this.cartItems.splice(0, this.cartItems.length);
      this._modal.setBody(createElement(`
        <div class="modal__body-inner">
          <p>
            Order successful! Your order is being cooked :) <br>
            We’ll notify you about delivery time shortly.<br>
            <img src="/assets/images/delivery.gif">
          </p>
        </div>
      `));
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}