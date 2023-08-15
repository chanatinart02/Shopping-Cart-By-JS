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
// buttons
let buttonsDOM = [];

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
              <span class="material-symbols-outlined shopping-cart"> add_shopping_cart </span>
            </button>
          </div>
          <h3>${product.title}</h3>
          <h4>$${product.price}</h4>
        </article>
          `;
    });
    productsContainer.innerHTML = result;
  }
  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];
    buttonsDOM = buttons;
    buttons.forEach((button) => {
      let id = button.dataset.id;
      let inCart = cart.find((item) => item.id === id);
      if (inCart) {
        button.innerText = "In Cart";
        button.disabled = true;
      }
      button.addEventListener("click", (e) => {
        e.target.innerHTML = `<span class="text">In Cart</span>`;
        e.target.disabled = true;
        //get product from products
        let cartItem = { ...Storage.getProduct(id), amount: 1 };
        //add product to the cart
        cart = [...cart, cartItem];
        //save cart in local storage
        Storage.saveCart(cart);
        //set cart values
        this.setCartValues(cart);
        //display cart item
        this.addCartItem(cartItem);
        //show the cart
        this.showCart();
      });
    });
  }
  setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map((item) => {
      tempTotal += item.price * item.amount;
      itemsTotal += item.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
  }
  addCartItem(item) {
    const cartItem = document.querySelector(".cart-item");
    cartItem.innerHTML = `<img src=${item.image} alt=${item.title} />
            <div>
              <h4>${item.title}</h4>
              <h5>$${item.price}</h5>
              <span class="remove-item"
                data-id=${item.id}>remove
                <span class="material-symbols-outlined"> delete </span></span
              >
            </div>
            <div>
              <span class="material-symbols-outlined up" data-id=${item.id}> expand_less </span>
              <p class="item-amount">${item.amount}</p>
              <span class="material-symbols-outlined down" data-id=${item.id}> expand_more </span>
            </div>`;

    // const div = document.createElement("div");
    //   div.classList.add("cart-item");
    //   div.innerHTML = ``
    // cartContent.appendChild(div);
  }
  showCart() {
    cartOverlay.classList.add("transparentBcg");
    cartContainer.classList.add("showCart");
  }
}

// local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProduct(id) {
    let products = JSON.parse(localStorage.getItem("products"));
    return products.find((product) => product.id === id);
  }

  static saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();
  const products = new Products();

  // get all products
  products
    .getProducts()
    .then((products) => {
      ui.displayProducts(products); // display all products
      Storage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
    });
});
