// Product data

const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1499,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
    },

    {
        id: 2,
        name: "Smart Watch",
        price: 2499,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30"
    },

    {
        id: 3,
        name: "Running Shoes",
        price: 1999,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff"
    },

    {
        id: 4,
        name: "Backpack",
        price: 999,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62"
    },

    {
        id: 5,
        name: "Sunglasses",
        price: 799,
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083"
    },

    {
        id: 6,
        name: "Laptop",
        price: 59999,
        image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
    }
];


// Cart

let cart = [];


// Display products

function displayProducts() {

    const container =
        document.getElementById("product-container");

    container.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <img
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="product-info">

                <h3>${product.name}</h3>

                <p class="price">
                    ₹${product.price}
                </p>

                <button
                    class="add-cart"
                    onclick="addToCart(${product.id})"
                >
                    Add to Cart
                </button>

            </div>
        `;

        container.appendChild(card);

    });
}


// Add product to cart

function addToCart(productId) {

    const product = products.find(
        item => item.id === productId
    );

    const existingProduct = cart.find(
        item => item.id === productId
    );

    if (existingProduct) {

        existingProduct.quantity++;

    } else {

        cart.push({
            ...product,
            quantity: 1
        });

    }

    updateCart();

    alert(`${product.name} added to cart!`);
}


// Update cart

function updateCart() {

    const cartItems =
        document.getElementById("cart-items");

    const cartCount =
        document.getElementById("cart-count");

    const cartTotal =
        document.getElementById("cart-total");


    cartItems.innerHTML = "";

    let total = 0;

    let count = 0;


    cart.forEach(item => {

        total += item.price * item.quantity;

        count += item.quantity;


        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `

            <div>

                <h4>${item.name}</h4>

                <p>
                    ₹${item.price}
                </p>

            </div>

            <div class="quantity">

                <button
                    onclick="decreaseQuantity(${item.id})"
                >
                    -
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    onclick="increaseQuantity(${item.id})"
                >
                    +
                </button>

            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})"
            >
                Remove
            </button>

        `;

        cartItems.appendChild(div);

    });


    cartCount.textContent = count;

    cartTotal.textContent = total;
}


// Increase quantity

function increaseQuantity(productId) {

    const product =
        cart.find(item => item.id === productId);

    if (product) {

        product.quantity++;

    }

    updateCart();
}


// Decrease quantity

function decreaseQuantity(productId) {

    const product =
        cart.find(item => item.id === productId);

    if (!product) return;


    if (product.quantity > 1) {

        product.quantity--;

    } else {

        removeFromCart(productId);

        return;
    }

    updateCart();
}


// Remove product

function removeFromCart(productId) {

    cart = cart.filter(
        item => item.id !== productId
    );

    updateCart();
}


// Open cart

function openCart() {

    document.getElementById(
        "cart-modal"
    ).style.display = "block";

}


// Close cart

function closeCart() {

    document.getElementById(
        "cart-modal"
    ).style.display = "none";

}


// Checkout

function checkout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }


    alert(
        "Order placed successfully!"
    );

    cart = [];

    updateCart();

    closeCart();
}


// Initial load

displayProducts();

updateCart();

