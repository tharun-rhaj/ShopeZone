/* ===================================================
   PRODUCT.JS — Logic for the Product Detail Page (product.html)
   Responsible for:
   - Reading the product id from the URL
   - Rendering the product's full details
   - Handling quantity selection and "Add to Cart"
   - Showing related products from the same category
   =================================================== */

let selectedQuantity = 1;
let currentProduct = null;

// Read a query parameter from the current URL (e.g. ?id=3 -> "3")
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// Render the full product detail section
function renderProductDetail(product) {
  const container = document.getElementById("product-detail-container");
  if (!container) return;

  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );
  const starsHTML = getStarsHTML(product.rating);

  container.innerHTML = `
    <div class="product-detail-image">
      <img src="${product.image}" alt="${product.name}" />
    </div>
    <div class="product-detail-info">
      <span class="product-card-category">${product.category}</span>
      <h1>${product.name}</h1>
      <div class="rating-row">
        <span class="stars">${starsHTML}</span>
        <span>(${product.reviews} reviews)</span>
      </div>

      <div class="product-detail-price">
        <span class="price-current">₹${product.price}</span>
        <span class="price-old">₹${product.oldPrice}</span>
        <span class="discount-percent">${discountPercent}% off</span>
      </div>

      <p class="product-description">${product.description}</p>

      <p class="stock-status">${product.stock > 0 ? "✓ In Stock" : "Out of Stock"}</p>

      <div class="quantity-selector">
        <label>Quantity:</label>
        <div class="qty-control">
          <button type="button" onclick="changeQuantity(-1)">−</button>
          <span id="qty-display">1</span>
          <button type="button" onclick="changeQuantity(1)">+</button>
        </div>
      </div>

      <button class="btn-primary" onclick="handleAddToCartFromDetail(${product.id})">
        Add to Cart
      </button>
      <p class="added-confirmation" id="added-msg">✓ Added to cart!</p>
    </div>
  `;

  // Breadcrumb update
  const breadcrumb = document.getElementById("breadcrumb");
  if (breadcrumb) {
    breadcrumb.innerHTML = `<a href="index.html">Home</a> / ${product.category} / ${product.name}`;
  }

  document.title = product.name + " - ShopZone";
}

// Increase/decrease the quantity selector, staying within stock limits
function changeQuantity(delta) {
  const newQty = selectedQuantity + delta;

  if (newQty < 1) return;
  if (currentProduct && newQty > currentProduct.stock) return;

  selectedQuantity = newQty;
  document.getElementById("qty-display").textContent = selectedQuantity;
}

// Add the currently viewed product to the cart with the selected quantity
function handleAddToCartFromDetail(productId) {
  addToCart(productId, selectedQuantity);

  const msg = document.getElementById("added-msg");
  if (msg) {
    msg.classList.add("show");
    setTimeout(function () {
      msg.classList.remove("show");
    }, 2000);
  }
}

// Show up to 4 other products from the same category
function renderRelatedProducts(product) {
  const container = document.getElementById("related-products");
  if (!container) return;

  const related = products.filter(function (p) {
    return p.category === product.category && p.id !== product.id;
  }).slice(0, 4);

  let html = "";
  related.forEach(function (p) {
    html += createProductCard(p);
  });
  container.innerHTML = html;
}

// Re-use the same card builder and star renderer from main.js logic.
// (Defined here too in case product.html is loaded without main.js)
function createProductCard(product) {
  const discountPercent = Math.round(
    ((product.oldPrice - product.price) / product.oldPrice) * 100
  );
  const starsHTML = getStarsHTML(product.rating);

  return `
    <a href="product.html?id=${product.id}" class="product-card">
      <div class="product-card-image">
        <span class="discount-badge">${discountPercent}% OFF</span>
        <img src="${product.image}" alt="${product.name}" />
      </div>
      <div class="product-card-body">
        <span class="product-card-category">${product.category}</span>
        <h3 class="product-card-name">${product.name}</h3>
        <div class="rating-row">
          <span class="stars">${starsHTML}</span>
          <span>(${product.reviews})</span>
        </div>
        <div class="price-row">
          <span class="price-current">₹${product.price}</span>
          <span class="price-old">₹${product.oldPrice}</span>
        </div>
        <button class="add-to-cart-btn" onclick="handleAddToCartFromGrid(event, ${product.id})">
          Add to Cart
        </button>
      </div>
    </a>
  `;
}

function getStarsHTML(rating) {
  const fullStars = Math.round(rating);
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= fullStars ? "★" : "☆";
  }
  return stars + " " + rating;
}

function handleAddToCartFromGrid(event, productId) {
  event.preventDefault();
  event.stopPropagation();
  addToCart(productId, 1);

  const button = event.target;
  const originalText = button.textContent;
  button.textContent = "Added ✓";
  setTimeout(function () {
    button.textContent = originalText;
  }, 1000);
}

// ----- Run on page load -----
document.addEventListener("DOMContentLoaded", function () {
  const productId = parseInt(getQueryParam("id"), 10);
  currentProduct = getProductById(productId);

  if (!currentProduct) {
    document.getElementById("product-detail-container").innerHTML =
      "<p>Product not found. <a href='index.html'>Go back home</a></p>";
    return;
  }

  renderProductDetail(currentProduct);
  renderRelatedProducts(currentProduct);
  updateCartCount();
});
