// =====================================================
// SHOPHUB E-COMMERCE APPLICATION
// TASK 5 - FULL-STACK DEPLOYMENT & PROJECT ARCHITECTURE
// =====================================================


// =====================================================
// PRODUCT DATA
// =====================================================

const products = [

    {
        id: 1,
        name: "Backpack",
        category: "fashion",
        price: 1799,
        image: "assets/images/backpack.jpg",
        description:
            "Stylish and durable backpack for college, travel and everyday use."
    },

    {
        id: 2,
        name: "Wireless Headphones",
        category: "electronics",
        price: 2499,
        image: "assets/images/headphones.jpg",
        description:
            "Comfortable wireless headphones with clear sound and modern design."
    },

    {
        id: 3,
        name: "Smart Watch",
        category: "electronics",
        price: 3999,
        image: "assets/images/smartwatch.jpg",
        description:
            "Modern smartwatch with useful fitness and notification features."
    },

    {
        id: 4,
        name: "Running Sneakers",
        category: "fashion",
        price: 2999,
        image: "assets/images/sneakers.jpg",
        description:
            "Comfortable sneakers designed for running, walking and daily use."
    },

    {
        id: 5,
        name: "Table Lamp",
        category: "home",
        price: 1299,
        image: "assets/images/lamp.jpg",
        description:
            "Modern table lamp perfect for your study table and workspace."
    },

    {
        id: 6,
        name: "Bluetooth Speaker",
        category: "electronics",
        price: 1999,
        image: "assets/images/speaker.jpg",
        description:
            "Portable Bluetooth speaker with powerful and clear audio."
    },

    {
        id: 7,
        name: "Wooden Stool",
        category: "home",
        price: 1499,
        image: "assets/images/stool.jpg",
        description:
            "Simple and elegant wooden stool suitable for home interiors."
    },

    {
        id: 8,
        name: "Sunglasses",
        category: "fashion",
        price: 999,
        image: "assets/images/sunglasses.jpg",
        description:
            "Stylish sunglasses designed for comfortable outdoor use."
    }

];


// =====================================================
// CART
// =====================================================

let cart = JSON.parse(
    localStorage.getItem("shophubCart")
) || [];


// =====================================================
// DOM ELEMENTS
// =====================================================

const productContainer =
    document.getElementById("productContainer") ||
    document.getElementById("productsContainer") ||
    document.getElementById("productGrid") ||
    document.getElementById("products");

const cartContainer =
    document.getElementById("cartContainer") ||
    document.getElementById("cartItems") ||
    document.getElementById("cart");

const cartCount =
    document.getElementById("cartCount");

const searchInput =
    document.getElementById("searchInput") ||
    document.getElementById("search");

const categoryFilter =
    document.getElementById("categoryFilter") ||
    document.getElementById("category");


// =====================================================
// SAVE CART
// =====================================================

function saveCart() {

    localStorage.setItem(
        "shophubCart",
        JSON.stringify(cart)
    );

}


// =====================================================
// FORMAT PRICE
// =====================================================

function formatPrice(price) {

    return new Intl.NumberFormat("en-IN", {

        style: "currency",

        currency: "INR",

        maximumFractionDigits: 0

    }).format(price);

}


// =====================================================
// UPDATE CART COUNT
// =====================================================

function updateCartCount() {

    if (!cartCount) {
        return;
    }

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;

}


// =====================================================
// ADD PRODUCT TO CART
// =====================================================

function addToCart(productId) {

    const existingProduct =
        cart.find(item => item.id === productId);

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({

            id: productId,

            quantity: 1

        });

    }

    saveCart();

    updateCartCount();

    showMessage("Product added to cart!");

}


// =====================================================
// REMOVE PRODUCT FROM CART
// =====================================================

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    saveCart();

    updateCartCount();

    renderCart();

}


// =====================================================
// INCREASE QUANTITY
// =====================================================

function increaseQuantity(productId) {

    const item =
        cart.find(item => item.id === productId);

    if (item) {

        item.quantity++;

    }

    saveCart();

    updateCartCount();

    renderCart();

}


// =====================================================
// DECREASE QUANTITY
// =====================================================

function decreaseQuantity(productId) {

    const item =
        cart.find(item => item.id === productId);

    if (!item) {
        return;
    }

    item.quantity--;

    if (item.quantity <= 0) {

        removeFromCart(productId);

        return;

    }

    saveCart();

    updateCartCount();

    renderCart();

}


// =====================================================
// CLEAR CART
// =====================================================

function clearCart() {

    cart = [];

    saveCart();

    updateCartCount();

    renderCart();

}


// =====================================================
// SHOW MESSAGE
// =====================================================

function showMessage(message) {

    const oldMessage =
        document.querySelector(".cart-message");

    if (oldMessage) {

        oldMessage.remove();

    }


    const messageElement =
        document.createElement("div");

    messageElement.className =
        "cart-message";

    messageElement.textContent =
        message;


    document.body.appendChild(
        messageElement
    );


    setTimeout(() => {

        messageElement.remove();

    }, 2000);

}


// =====================================================
// CREATE PRODUCT CARD
// =====================================================

function createProductCard(product) {

    return `

        <article class="product-card">

            <div class="product-image-container">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="product-image"
                    loading="lazy"
                >

            </div>


            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>


                <h3>
                    ${product.name}
                </h3>


                <p class="product-description">
                    ${product.description}
                </p>


                <div class="product-bottom">

                    <strong class="product-price">
                        ${formatPrice(product.price)}
                    </strong>


                    <button
                        class="add-cart-btn"
                        data-id="${product.id}">
                        Add to Cart
                    </button>

                </div>

            </div>

        </article>

    `;

}


// =====================================================
// DISPLAY PRODUCTS
// =====================================================

function displayProducts(productList = products) {

    if (!productContainer) {

        console.warn(
            "Product container was not found in index.html"
        );

        return;

    }


    if (productList.length === 0) {

        productContainer.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🔍
                </div>

                <h2>
                    No Products Found
                </h2>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }


    productContainer.innerHTML =
        productList
            .map(createProductCard)
            .join("");


    attachProductButtons();

}


// =====================================================
// ADD TO CART BUTTON EVENTS
// =====================================================

function attachProductButtons() {

    const buttons =
        document.querySelectorAll(
            ".add-cart-btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const productId =
                    Number(
                        this.dataset.id
                    );


                addToCart(productId);


                const originalText =
                    this.textContent;


                this.textContent =
                    "Added ✓";


                this.classList.add(
                    "added"
                );


                setTimeout(() => {

                    this.textContent =
                        originalText;

                    this.classList.remove(
                        "added"
                    );

                }, 1000);

            }
        );

    });

}


// =====================================================
// SEARCH PRODUCTS
// =====================================================

function searchProducts() {

    const searchText =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "all";


    const filteredProducts =
        products.filter(product => {

            const matchesSearch =
                product.name
                    .toLowerCase()
                    .includes(searchText);


            const matchesCategory =
                selectedCategory === "all" ||
                product.category ===
                selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    displayProducts(
        filteredProducts
    );

}


// =====================================================
// SEARCH EVENT
// =====================================================

if (searchInput) {

    searchInput.addEventListener(
        "input",
        searchProducts
    );

}


// =====================================================
// CATEGORY EVENT
// =====================================================

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        searchProducts
    );

}


// =====================================================
// RENDER CART
// =====================================================

function renderCart() {

    if (!cartContainer) {

        return;

    }


    if (cart.length === 0) {

        cartContainer.innerHTML = `

            <div class="empty-cart">

                <div class="empty-cart-icon">
                    🛒
                </div>

                <h2>
                    Your Cart is Empty
                </h2>

                <p>
                    Add some products to your cart.
                </p>

                <a
                    href="#products"
                    class="primary-btn">
                    Start Shopping
                </a>

            </div>

        `;

        return;

    }


    let subtotal = 0;


    const cartHTML =
        cart.map(cartItem => {

            const product =
                products.find(
                    item =>
                        item.id === cartItem.id
                );


            if (!product) {
                return "";
            }


            const itemTotal =
                product.price *
                cartItem.quantity;


            subtotal += itemTotal;


            return `

                <div class="cart-item">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                    >


                    <div class="cart-item-info">

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ${formatPrice(product.price)}
                        </p>

                    </div>


                    <div class="quantity-controls">

                        <button
                            class="quantity-btn"
                            onclick="decreaseQuantity(${product.id})">
                            −
                        </button>


                        <span>
                            ${cartItem.quantity}
                        </span>


                        <button
                            class="quantity-btn"
                            onclick="increaseQuantity(${product.id})">
                            +
                        </button>

                    </div>


                    <div class="cart-item-total">

                        <strong>
                            ${formatPrice(itemTotal)}
                        </strong>


                        <button
                            class="remove-btn"
                            onclick="removeFromCart(${product.id})">
                            Remove
                        </button>

                    </div>

                </div>

            `;

        }).join("");


    const shipping =
        subtotal >= 5000
            ? 0
            : 99;


    const total =
        subtotal + shipping;


    cartContainer.innerHTML = `

        ${cartHTML}


        <div class="cart-summary">

            <h2>
                Order Summary
            </h2>


            <div class="summary-row">

                <span>
                    Subtotal
                </span>

                <strong>
                    ${formatPrice(subtotal)}
                </strong>

            </div>


            <div class="summary-row">

                <span>
                    Shipping
                </span>

                <strong>
                    ${
                        shipping === 0
                            ? "FREE"
                            : formatPrice(shipping)
                    }
                </strong>

            </div>


            <hr>


            <div class="summary-total">

                <span>
                    Total
                </span>

                <strong>
                    ${formatPrice(total)}
                </strong>

            </div>


            <button
                class="checkout-btn"
                onclick="checkout()">
                Proceed to Checkout
            </button>


            <button
                class="clear-cart-btn"
                onclick="clearCart()">
                Clear Cart
            </button>

        </div>

    `;

}


// =====================================================
// CHECKOUT
// =====================================================

function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    alert(
        "Thank you for shopping with ShopHub! Checkout functionality is ready for future payment integration."
    );

}


// =====================================================
// CLIENT-SIDE ROUTING
// =====================================================

function handleRouting() {

    const hash =
        window.location.hash;


    // HOME
    if (
        hash === "" ||
        hash === "#" ||
        hash === "#home"
    ) {

        showSection("home");

        return;

    }


    // PRODUCTS
    if (
        hash === "#products" ||
        hash === "#/products"
    ) {

        showSection("products");

        return;

    }


    // CART
    if (
        hash === "#cart" ||
        hash === "#/cart"
    ) {

        showSection("cart");

        renderCart();

        return;

    }


    // ABOUT
    if (
        hash === "#about" ||
        hash === "#/about"
    ) {

        showSection("about");

        return;

    }


    // CONTACT
    if (
        hash === "#contact" ||
        hash === "#/contact"
    ) {

        showSection("contact");

        return;

    }


    // DEFAULT
    showSection("home");

}


// =====================================================
// SHOW SECTION
// =====================================================

function showSection(sectionName) {

    const sections =
        document.querySelectorAll(
            ".page-section"
        );


    if (sections.length === 0) {

        return;

    }


    sections.forEach(section => {

        section.style.display =
            "none";

    });


    const selectedSection =
        document.getElementById(
            sectionName
        );


    if (selectedSection) {

        selectedSection.style.display =
            "block";

    }

}


// =====================================================
// NAVIGATION LINKS
// =====================================================

function setupNavigation() {

    const links =
        document.querySelectorAll(
            "a[href^='#']"
        );


    links.forEach(link => {

        link.addEventListener(
            "click",
            () => {

                const nav =
                    document.querySelector(
                        ".nav-links"
                    );


                if (nav) {

                    nav.classList.remove(
                        "show"
                    );

                }

            }
        );

    });

}


// =====================================================
// MOBILE MENU
// =====================================================

function setupMobileMenu() {

    const menuButton =
        document.getElementById(
            "menuToggle"
        );


    const nav =
        document.getElementById(
            "navLinks"
        );


    if (
        menuButton &&
        nav
    ) {

        menuButton.addEventListener(
            "click",
            () => {

                nav.classList.toggle(
                    "show"
                );

            }
        );

    }

}


// =====================================================
// DARK MODE
// =====================================================

function setupTheme() {

    const themeButton =
        document.getElementById(
            "themeToggle"
        );


    if (!themeButton) {

        return;

    }


    const savedTheme =
        localStorage.getItem(
            "shophubTheme"
        );


    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

        themeButton.textContent =
            "☀️";

    }


    themeButton.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "dark-mode"
            );


            const darkMode =
                document.body.classList.contains(
                    "dark-mode"
                );


            localStorage.setItem(
                "shophubTheme",
                darkMode
                    ? "dark"
                    : "light"
            );


            themeButton.textContent =
                darkMode
                    ? "☀️"
                    : "🌙";

        }
    );

}


// =====================================================
// IMAGE ERROR HANDLING
// =====================================================

function setupImageErrorHandling() {

    document.addEventListener(
        "error",
        event => {

            if (
                event.target.tagName ===
                "IMG"
            ) {

                event.target.alt =
                    "Product image";

            }

        },
        true
    );

}


// =====================================================
// INITIALIZE APPLICATION
// =====================================================

function initializeApp() {

    displayProducts();

    updateCartCount();

    renderCart();

    setupNavigation();

    setupMobileMenu();

    setupTheme();

    setupImageErrorHandling();

    handleRouting();

}


// =====================================================
// ROUTING EVENT
// =====================================================

window.addEventListener(
    "hashchange",
    handleRouting
);


// =====================================================
// START APPLICATION
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);


// =====================================================
// MAKE CART FUNCTIONS AVAILABLE
// =====================================================

window.addToCart =
    addToCart;

window.removeFromCart =
    removeFromCart;

window.increaseQuantity =
    increaseQuantity;

window.decreaseQuantity =
    decreaseQuantity;

window.clearCart =
    clearCart;

window.checkout =
    checkout;