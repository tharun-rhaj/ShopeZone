/* ===================================================
   MAIN.JS — Logic for the Home Page (index.html)
   Responsible for:
   - Rendering the product grid
   - Building the category navigation links
   - Filtering products by category
   - Handling the search bar
   =================================================== */

// Keep track of which category is currently selected
let currentCategory = "all";

// Build a single product card as an HTML string
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

// Convert a numeric rating (e.g. 4.3) into a star display string
function getStarsHTML(rating) {
  const fullStars = Math.round(rating);
  let stars = "";
  for (let i = 1; i <= 5; i++) {
    stars += i <= fullStars ? "★" : "☆";
  }
  return stars + " " + rating;
}

// Render a list of products into the grid container
function renderProductGrid(productList) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  if (productList.length === 0) {
    grid.innerHTML = "<p>No products found.</p>";
    return;
  }

  let html = "";
  productList.forEach(function (product) {
    html += createProductCard(product);
  });
  grid.innerHTML = html;
}

// Build the category nav links dynamically from the product data
function renderCategoryNav() {
  const nav = document.getElementById("category-nav");
  if (!nav) return;

  const categories = getAllCategories();

  categories.forEach(function (category) {
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = category;
    link.dataset.category = category;
    link.addEventListener("click", function (e) {
      e.preventDefault();
      filterByCategory(category);
    });
    nav.appendChild(link);
  });

  // "All" link also needs a click handler (it's already in the HTML)
  const allLink = nav.querySelector('[data-category="all"]');
  if (allLink) {
    allLink.addEventListener("click", function (e) {
      e.preventDefault();
      filterByCategory("all");
    });
  }
}

// Filter the product grid by category and update the active nav styling
function filterByCategory(category) {
  currentCategory = category;

  const title = document.getElementById("grid-title");
  const navLinks = document.querySelectorAll("#category-nav a");

  navLinks.forEach(function (link) {
    link.classList.toggle("active", link.dataset.category === category);
  });

  if (category === "all") {
    title.textContent = "All Products";
    renderProductGrid(products);
  } else {
    title.textContent = category;
    const filtered = products.filter(function (p) {
      return p.category === category;
    });
    renderProductGrid(filtered);
  }
}

// Handle the "Add to Cart" button click directly from the product grid.
// We stop the click from also triggering the card's link navigation.
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

// Handle search form submission
function setupSearch() {
  const form = document.getElementById("search-form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = document.getElementById("search-input").value.trim().toLowerCase();

    if (query === "") {
      filterByCategory(currentCategory);
      return;
    }

    const results = products.filter(function (p) {
      return p.name.toLowerCase().indexOf(query) !== -1 ||
             p.category.toLowerCase().indexOf(query) !== -1;
    });

    const title = document.getElementById("grid-title");
    if (title) {
      title.textContent = 'Search results for "' + query + '"';
    }
    renderProductGrid(results);
  });
}

// ----- Run on page load -----
document.addEventListener("DOMContentLoaded", function () {
  renderCategoryNav();
  renderProductGrid(products);
  setupSearch();
  updateCartCount();
});
