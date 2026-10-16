# ShopZone – E-Commerce Website 🛍️

ShopZone is a front-end e-commerce website developed using HTML, CSS, and JavaScript. It simulates an online shopping experience with product browsing, category filtering, search functionality, product details, cart management, and a demo checkout process.

This project was developed as part of a 15-day internship project.

## ✨ Features

- **Product Catalog:** Browse products across Electronics, Books, Fashion, and Home categories.
- **Search Functionality:** Search products by name or category.
- **Category Filtering:** Filter products based on their categories.
- **Product Details:** View product descriptions, prices, ratings, discounts, and stock availability.
- **Shopping Cart:** Add, remove, and update product quantities.
- **Cart Persistence:** Uses browser localStorage to retain cart items across page reloads.
- **Order Summary:** View item totals and the overall cart value.
- **Demo Checkout:** Enter shipping details and select a simulated payment method.
- **Order Confirmation:** Display a generated order ID after placing a demo order.
- **Responsive Styling:** CSS layouts designed to adapt to different screen sizes.

## 🛠️ Technologies Used

- HTML5 – Website structure
- CSS3 – Styling and layouts
- JavaScript – Dynamic rendering and shopping cart functionality
- Browser localStorage – Client-side cart persistence

## 📂 Project Structure

```text
ShopZone/
├── index.html
├── product.html
├── cart.html
├── checkout.html
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   ├── main.js
│   ├── product.js
│   ├── cart.js
│   ├── cart-page.js
│   └── checkout.js
├── screenshots/
│   ├── home.png
│   ├── product.png
│   ├── cart.png
│   └── checkout.png
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- A code editor such as Visual Studio Code
- Optional: the Live Server extension for VS Code

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/YOUR-USERNAME/ShopZone.git
   ```

2. Navigate to the project directory:

   ```bash
   cd ShopZone
   ```

3. Open the folder in Visual Studio Code.

4. Launch `index.html` using the Live Server extension, or open it directly in your browser.

No backend installation or database setup is required.

## 🛒 How to Use

1. Open the home page to browse available products.
2. Search for products or select a category.
3. Open a product to view its details.
4. Add products to your shopping cart.
5. Update quantities or remove items from the cart.
6. Proceed to checkout and enter sample shipping details.
7. Place a demo order to view the confirmation screen.

## ⚠️ Limitations

- This is a front-end demonstration project; it does not use a backend or database.
- Product information is stored in a JavaScript array.
- Cart data is stored locally in the browser.
- Payment methods are simulated. No real payments are processed.
- Order confirmation is generated on the client side; orders are not submitted to a server.
- Product images are loaded from external image URLs and may require an internet connection.

**Important:** Do not enter real personal or payment information into this demo.

## 🎯 Learning Outcomes

Through this project, I practised:

- Building multi-page websites with HTML and CSS.
- Using JavaScript to render dynamic product content.
- Implementing search and category filtering.
- Managing cart data and quantities using localStorage.
- Handling forms and client-side validation.
- Organizing a front-end project into reusable files and modules.

## 🔮 Future Improvements

- Integrate a backend and database.
- Add user authentication and order history.
- Integrate a secure payment gateway.
- Improve accessibility and responsive design.
- Add automated testing and stronger input validation.

## 👨‍💻 Author

**Tharun Rhaj**

GitHub: [@tharun-rhaj](https://github.com/tharun-rhaj)

---

*ShopZone is an educational project created to practise front-end web development.*
