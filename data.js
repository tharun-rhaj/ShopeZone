/* ===================================================
   PRODUCT DATA
   This is our "database" - just a plain JavaScript array.
   In a real project this would come from a server, but for
   this internship project we keep it simple and local.
   =================================================== */

const products = [
  // ---------- ELECTRONICS ----------
  {
    id: 1,
    name: "SoundWave Pro Wireless Earbuds",
    category: "Electronics",
    price: 1999,
    oldPrice: 2999,
    rating: 4.3,
    reviews: 218,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    description: "True wireless earbuds with active noise cancellation, 30-hour battery life with the charging case, and IPX5 sweat resistance. Perfect for workouts, calls, and daily commutes.",
    stock: 24
  },
  {
    id: 2,
    name: "PixelView 24-inch Full HD Monitor",
    category: "Electronics",
    price: 7499,
    oldPrice: 9999,
    rating: 4.5,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500",
    description: "24-inch IPS Full HD monitor with 75Hz refresh rate, slim bezels, and built-in eye-care technology to reduce strain during long work sessions.",
    stock: 15
  },
  {
    id: 3,
    name: "FlexCharge 20000mAh Power Bank",
    category: "Electronics",
    price: 1299,
    oldPrice: 1799,
    rating: 4.1,
    reviews: 365,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    description: "High-capacity 20000mAh power bank with dual USB output and fast charging support. Charges most phones 4-5 times on a single charge.",
    stock: 40
  },
  {
    id: 4,
    name: "TypeMaster Mechanical Keyboard",
    category: "Electronics",
    price: 2799,
    oldPrice: 3499,
    rating: 4.6,
    reviews: 97,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500",
    description: "Compact mechanical keyboard with blue clicky switches, RGB backlighting, and a durable aluminium frame built for gaming and typing alike.",
    stock: 18
  },

  // ---------- BOOKS ----------
  {
    id: 5,
    name: "The Silent Algorithm — A Tech Thriller",
    category: "Books",
    price: 349,
    oldPrice: 499,
    rating: 4.4,
    reviews: 530,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500",
    description: "A gripping thriller about a young engineer who uncovers a hidden algorithm controlling global markets. A page-turner for fans of tech fiction.",
    stock: 60
  },
  {
    id: 6,
    name: "Atomic Focus — Building Better Habits",
    category: "Books",
    price: 299,
    oldPrice: 450,
    rating: 4.7,
    reviews: 812,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=500",
    description: "A practical, research-backed guide to building habits that stick, written in a simple style that's easy to apply to everyday student and work life.",
    stock: 75
  },
  {
    id: 7,
    name: "Roots and Rivers — A Family Saga",
    category: "Books",
    price: 399,
    oldPrice: 549,
    rating: 4.2,
    reviews: 188,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500",
    description: "A sweeping multi-generational story set across three decades, exploring family, migration, and belonging.",
    stock: 33
  },

  // ---------- FASHION ----------
  {
    id: 8,
    name: "Urban Comfort Cotton T-Shirt",
    category: "Fashion",
    price: 499,
    oldPrice: 799,
    rating: 4.0,
    reviews: 264,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    description: "100% breathable cotton t-shirt with a relaxed fit. Available in multiple colours, perfect for daily wear and casual outings.",
    stock: 90
  },
  {
    id: 9,
    name: "StrideFlex Running Shoes",
    category: "Fashion",
    price: 1899,
    oldPrice: 2599,
    rating: 4.4,
    reviews: 421,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    description: "Lightweight running shoes with cushioned soles and breathable mesh uppers, designed for daily runs and gym sessions.",
    stock: 28
  },
  {
    id: 10,
    name: "ClassicFit Denim Jacket",
    category: "Fashion",
    price: 1599,
    oldPrice: 2199,
    rating: 4.3,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    description: "A timeless denim jacket with a comfortable regular fit, sturdy stitching, and a versatile look that pairs with anything.",
    stock: 22
  },

  // ---------- HOME ----------
  {
    id: 11,
    name: "BrewMaster Electric Kettle 1.8L",
    category: "Home",
    price: 899,
    oldPrice: 1299,
    rating: 4.5,
    reviews: 310,
    image: "https://images.unsplash.com/photo-1585664811087-47f65abbad64?w=500",
    description: "1.8-litre stainless steel electric kettle with auto shut-off and boil-dry protection. Boils water in under 5 minutes.",
    stock: 45
  },
  {
    id: 12,
    name: "CloudNest Memory Foam Pillow",
    category: "Home",
    price: 699,
    oldPrice: 999,
    rating: 4.6,
    reviews: 275,
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=500",
    description: "Ergonomic memory foam pillow that contours to your neck and shoulders for better sleep support, with a removable washable cover.",
    stock: 50
  }
];

// Helper: get a single product by its id (used on product detail page)
function getProductById(id) {
  return products.find(function (product) {
    return product.id === id;
  });
}

// Helper: get all unique category names (used to build the category filter)
function getAllCategories() {
  const categories = [];
  products.forEach(function (product) {
    if (categories.indexOf(product.category) === -1) {
      categories.push(product.category);
    }
  });
  return categories;
}
