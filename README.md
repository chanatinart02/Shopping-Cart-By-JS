# Shopping-Cart-By-JS

This is a simple JavaScript-based shopping cart application that allows users to view products, add them to the cart, and perform various cart-related actions.

### Screenshot
![image](https://github.com/chanatinart02/Shopping-Cart-By-JS/assets/125489141/502c6c6d-2844-498b-a1e7-b5022a22daf8)


## Live Demo

A live demo of the shopping cart app is available [here](https://chanatinart02.github.io/Shopping-Cart-By-JS/).

## Technologies Used
HTML5
CSS3
JavaScript

### Classes

1. `Products`: Handles fetching product data from a JSON file, processing it, and returning an array of product objects.

2. `UI`: Manages user interface interactions and updates. Methods include:
   - `displayProducts(products)`: Renders product items on the page.
   - `getBagButtons()`: Sets up buttons for adding items to the cart.
   - `setCartValues(cart)`: Updates the cart's total price and item count.
   - `addCartItem(item)`: Adds a new item to the cart display.
   - `showCart()`: Displays the cart overlay.
   - `hideCart()`: Hides the cart overlay.
   - `setupApp()`: Initializes the app by setting up the cart and event listeners.
   - `populateCart(cart)`: Populates the cart with items on app load.
   - `cartLogic()`: Handles cart functionality, such as removing items and updating quantities.

3. `Storage`: Provides methods for managing local storage. Methods include:
   - `saveProducts(products)`: Saves product data to local storage.
   - `getProduct(id)`: Retrieves a product from local storage by its ID.
   - `saveCart(cart)`: Saves cart data to local storage.
   - `getCart()`: Retrieves cart data from local storage.
