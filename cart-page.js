/* ===================================================
   CART-PAGE.JS — Logic for the Cart Page (cart.html)
   Responsible for:
   - Rendering all items currently in the cart
   - Letting the user change quantity or remove items
   - Showing the order summary with total
   - Showing an "empty cart" message when applicable
   =================================================== */

// Render the entire cart page content (items list + summary, or empty state)
function renderCartPage() {
  const container = document.getElementById("cart-content");
  if (!container) return;

  const cart = getCart();

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven't added anything yet.</p>
        <a href="index.html" class="btn-secondary">Continue Shopping</a>
      </div>
    `;
    return;
  }

  let itemsHTML = "";
  cart.forEach(function (item) {
    const product = getProductById(item.id);
    if (!product) return; // skip if product data is somehow missing

    const subtotal = product.price * item.quantity;

    itemsHTML += `
      <div class="cart-item">
        <div class="cart-item-image">
          <img src="${product.image}" alt="${product.name}" />
        </div>
        <div>
          <p class="cart-item-name">${product.name}</p>
          <p class="cart-item-price">₹${product.price} each</p>
          <div class="qty-control">
            <button type="button" onclick="changeCartQuantity(${product.id}, -1)">−</button>
            <span>${item.quantity}</span>
            <button type="button" onclick="changeCartQuantity(${product.id}, 1)">+</button>
          </div>
          <button class="cart-item-remove" onclick="handleRemoveFromCart(${product.id})">Remove</button>
        </div>
        <div class="cart-item-subtotal">₹${subtotal}</div>
      </div>
    `;
  });

  const total = getCartTotal();
  const itemCount = getCartItemCount();

  container.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">
        ${itemsHTML}
      </div>
      <div class="cart-summary">
        <h2>Order Summary</h2>
        <div class="summary-row">
          <span>Items (${itemCount})</span>
          <span>₹${total}</span>
        </div>
        <div class="summary-row">
          <span>Delivery</span>
          <span>FREE</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>₹${total}</span>
        </div>
        <a href="checkout.html" class="btn-primary" style="display:block; text-align:center; text-decoration:none; margin-top:16px;">
          Proceed to Checkout
        </a>
      </div>
    </div>
  `;
}

// Increase or decrease quantity of an item directly from the cart page
function changeCartQuantity(productId, delta) {
  const cart = getCart();
  const item = cart.find(function (i) { return i.id === productId; });
  if (!item) return;

  const product = getProductById(productId);
  const newQty = item.quantity + delta;

  if (newQty < 1) {
    removeFromCart(productId);
  } else if (product && newQty > product.stock) {
    return; // don't exceed available stock
  } else {
    updateCartQuantity(productId, newQty);
  }

  renderCartPage();
}

// Remove an item and re-render
function handleRemoveFromCart(productId) {
  removeFromCart(productId);
  renderCartPage();
}

// ----- Run on page load -----
document.addEventListener("DOMContentLoaded", function () {
  renderCartPage();
  updateCartCount();
});
