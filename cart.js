/* ===================================================
   CART LOGIC
   The cart is stored in the browser's localStorage as a
   JSON string, so it survives page reloads and navigating
   between pages (since we have no server/database).

   Cart format (array of objects):
   [ { id: 1, quantity: 2 }, { id: 5, quantity: 1 } ]
   =================================================== */

const CART_KEY = "shopzone_cart";

// Read the cart array from localStorage (returns [] if empty)
function getCart() {
  const cartData = localStorage.getItem(CART_KEY);
  if (cartData === null) {
    return [];
  }
  return JSON.parse(cartData);
}

// Save the cart array back to localStorage
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Add a product to the cart (or increase quantity if it's already there)
function addToCart(productId, quantity) {
  if (!quantity) {
    quantity = 1;
  }

  const cart = getCart();

  // Check if this product is already in the cart
  let found = false;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      cart[i].quantity += quantity;
      found = true;
      break;
    }
  }

  // If it wasn't found, add it as a new entry
  if (!found) {
    cart.push({ id: productId, quantity: quantity });
  }

  saveCart(cart);
  updateCartCount();
}

// Remove a product entirely from the cart
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(function (item) {
    return item.id !== productId;
  });
  saveCart(cart);
  updateCartCount();
}

// Change the quantity of a product already in the cart
function updateCartQuantity(productId, newQuantity) {
  const cart = getCart();

  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id === productId) {
      cart[i].quantity = newQuantity;
      break;
    }
  }

  saveCart(cart);
  updateCartCount();
}

// Get total number of items in the cart (for the header badge)
function getCartItemCount() {
  const cart = getCart();
  let total = 0;
  cart.forEach(function (item) {
    total += item.quantity;
  });
  return total;
}

// Get the total price of everything in the cart
function getCartTotal() {
  const cart = getCart();
  let total = 0;

  cart.forEach(function (item) {
    const product = getProductById(item.id);
    if (product) {
      total += product.price * item.quantity;
    }
  });

  return total;
}

// Update the little number badge on the cart icon in the header.
// This function is called on every page after any cart change.
function updateCartCount() {
  const badge = document.getElementById("cart-count");
  if (badge) {
    badge.textContent = getCartItemCount();
  }
}

// Empty the cart completely (used after placing an order)
function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartCount();
}
