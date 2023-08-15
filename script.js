// Get Elements
const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartContainer = document.querySelector(".cart");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsContainer = document.querySelector(".products-center");

// cart
let cart = [];

// getting the products from JSON file
class Products {
  async getProducts() {
    try {
      let result = await fetch("products.json");
      let data = await result.json();

      let products = data.items; //items from JSON
      return products.map((item) => {
        const { id } = item.sys;
        const { title, price } = item.fields;
        const image = item.fields.image.fields.file.url;
        return { id, title, price, image };
      });
    } catch (error) {
      console.log(error);
    }
  }
}

// display products
class UI {
  displayProducts(products) {
    let result = "";
    products.forEach((product) => {
      result += `
        <article class="product">
          <div class="img-container">
            <img
              src=${product.image}
              alt=${product.title}
              class="product-img"
            />
            <button class="bag-btn" data-id=${product.id}>
              <span class="material-symbols-outlined"> add_shopping_cart </span>
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </article>
          `;
    });
    productsContainer.innerHTML = result;
  }
}

// local storage
class Storage {}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  // get all products
  products.getProducts().then((products) => ui.displayProducts(products));
});
