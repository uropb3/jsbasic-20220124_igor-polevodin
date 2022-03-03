import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.updateFilter(this.filters);
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    const productsGridInner = this.elem.querySelector('.products-grid__inner');

    while (productsGridInner.firstChild) {
      productsGridInner.firstChild.remove();
    }
    
    for (const product of this.products) {
      if (!(this.filters.noNuts !== undefined && this.filters.noNuts && product.nuts || 
        this.filters.vegeterianOnly !== undefined && this.filters.vegeterianOnly && !product.vegeterian || 
        this.filters.maxSpiciness && this.filters.maxSpiciness < product.spiciness || 
        this.filters.category && this.filters.category !== product.category))
      productsGridInner.append(new ProductCard(product).elem);
    }
  }  
}
