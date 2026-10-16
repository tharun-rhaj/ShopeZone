/* ===================================================
   CHECKOUT.JS — Logic for the Checkout Page (checkout.html)
   Responsible for:
   - Showing the shipping form + order summary
   - Validating the form on submit
   - Showing an order confirmation screen (no real payment)
   - Clearing the cart after the "order" is placed
   =================================================== */

// Render the checkout form along with a summary of the cart
function renderCheckoutForm() {
  const container = document.getElementById("checkout-content");
  if (!container) return;

  const cart = getCart();

  // If the cart is empty, there's nothing to check out
  if (cart.length === 0) {
    container.innerHTML = `
      <div class="empty-cart">
        <h2>Your cart is empty</h2>
        <p>Add some products before checking out.</p>
        <a href="index.html" class="btn-secondary">Continue Shopping</a>
      </div>
    `;
    return;
  }

  let summaryHTML = "";
  cart.forEach(function (item) {
    const product = getProductById(item.id);
    if (!product) return;
    summaryHTML += `
      <div class="order-summary-item">
        <span>${product.name} × ${item.quantity}</span>
        <span>₹${product.price * item.quantity}</span>
      </div>
    `;
  });

  const total = getCartTotal();

  container.innerHTML = `
    <div class="checkout-layout">
      <form class="checkout-form" id="checkout-form">
        <h2>Shipping Details</h2>

        <div class="form-group">
          <label for="fullname">Full Name</label>
          <input type="text" id="fullname" required placeholder="Your full name" />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" required placeholder="10-digit mobile number" pattern="[0-9]{10}" />
          </div>
          <div class="form-group">
            <label for="pincode">Pincode</label>
            <input type="text" id="pincode" required placeholder="6-digit pincode" pattern="[0-9]{6}" />
          </div>
        </div>

        <div class="form-group">
          <label for="address">Address</label>
          <textarea id="address" rows="3" required placeholder="House no, street, area"></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="city">City</label>
            <input type="text" id="city" required placeholder="City" />
          </div>
          <div class="form-group">
            <label for="state">State</label>
            <input type="text" id="state" required placeholder="State" />
          </div>
        </div>

        <h2>Payment Method</h2>
        <div class="payment-options">
          <label class="payment-option">
            <input type="radio" name="payment" value="cod" checked />
            Cash on Delivery
          </label>
          <label class="payment-option">
            <input type="radio" name="payment" value="card" />
            Credit / Debit Card (demo only)
          </label>
          <label class="payment-option">
            <input type="radio" name="payment" value="upi" />
            UPI (demo only)
          </label>
        </div>

        <button type="submit" class="btn-primary">Place Order</button>
      </form>

      <div class="cart-summary">
        <h2>Order Summary</h2>
        <div class="order-summary-list">
          ${summaryHTML}
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>₹${total}</span>
        </div>
      </div>
    </div>
  `;

  // Attach the submit handler now that the form exists in the DOM
  document.getElementById("checkout-form").addEventListener("submit", handlePlaceOrder);
}

// Handle the order form submission
function handlePlaceOrder(event) {
  event.preventDefault();

  // Generate a simple fake order ID for the confirmation screen
  const orderId = "SZ" + Math.floor(100000 + Math.random() * 900000);
  const total = getCartTotal();

  showOrderConfirmation(orderId, total);

  // Clear the cart since the "order" is placed
  clearCart();
}

// Show a confirmation message after the order is placed
function showOrderConfirmation(orderId, total) {
  const container = document.getElementById("checkout-content");
  container.innerHTML = `
    <div class="order-confirmation">
      <div class="checkmark">✓</div>
      <h2>Order Placed Successfully!</h2>
      <p>Thank you for shopping with ShopZone. Your order has been confirmed.</p>
      <p>Order ID: <span class="order-id">${orderId}</span></p>
      <p>Amount Paid: <span class="order-id">₹${total}</span></p>
      <a href="index.html" class="btn-secondary">Continue Shopping</a>
    </div>
  `;
}

// ----- Run on page load -----
document.addEventListener("DOMContentLoaded", function () {
  renderCheckoutForm();
  updateCartCount();
});
