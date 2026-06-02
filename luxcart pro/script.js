// LOADER

window.addEventListener("load", () => {
    document.querySelector(".loader").classList.add("hide");
});

// CURSOR GLOW

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", (e) => {
    glow.style.left = e.clientX + "px";
    glow.style.top = e.clientY + "px";
});

// CART DATA

let cart = [];
let total = 0;

// CREATE CART SIDEBAR

const cartSidebar = document.createElement("div");
cartSidebar.classList.add("cart-sidebar");

cartSidebar.innerHTML = `
    <div class="cart-header">
        <h2>Your Cart</h2>
        <span id="closeCart">&times;</span>
    </div>

    <div class="cart-items"></div>

    <div class="cart-footer">
        <h3>Total: $<span id="cartTotal">0</span></h3>
        <button class="checkout-btn">Proceed To Bill</button>
    </div>
`;

document.body.appendChild(cartSidebar);

// BILL MODAL

const billModal = document.createElement("div");

billModal.classList.add("bill-modal");

billModal.innerHTML = `
<div class="bill-box">

    <span class="closeBill">&times;</span>

    <h2>Billing Summary</h2>

    <div class="bill-items"></div>

    <div class="bill-total">
        Grand Total: $<span id="billTotal">0</span>
    </div>

    <button class="pay-btn">
        Confirm Payment
    </button>

</div>
`;

document.body.appendChild(billModal);

// OPEN CART

document.getElementById("cartIcon").addEventListener("click", () => {
    cartSidebar.classList.add("active");
});

// CLOSE CART

document.getElementById("closeCart").addEventListener("click", () => {
    cartSidebar.classList.remove("active");
});

// ADD TO CART

const addBtns = document.querySelectorAll(".add-cart");

addBtns.forEach((btn) => {

    btn.addEventListener("click", () => {

        const card = btn.closest(".card");

        const title = card.querySelector("h3").innerText;

        const price = parseInt(
            card.querySelector(".price-row span")
            .innerText.replace("$", "")
        );

        const image = card.querySelector("img").src;

        const existing = cart.find(item => item.title === title);

        if (existing) {
            existing.qty += 1;
        } else {

            cart.push({
                title,
                price,
                image,
                qty: 1
            });
        }

        updateCart();

    });

});

// UPDATE CART

function updateCart() {

    const cartItems = document.querySelector(".cart-items");

    cartItems.innerHTML = "";

    total = 0;

    cart.forEach((item, index) => {

        total += item.price * item.qty;

        cartItems.innerHTML += `
        
        <div class="cart-item">

            <img src="${item.image}">

            <div class="cart-info">

                <h4>${item.title}</h4>

                <p>$${item.price}</p>

                <div class="qty-box">

                    <button onclick="decreaseQty(${index})">-</button>

                    <span>${item.qty}</span>

                    <button onclick="increaseQty(${index})">+</button>

                </div>

            </div>

            <i class="fa-solid fa-trash remove-btn"
               onclick="removeItem(${index})"></i>

        </div>
        `;
    });

    document.getElementById("cart-count").innerText = cart.length;

    document.getElementById("cartTotal").innerText = total;

}

// REMOVE ITEM

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();
}

// INCREASE

function increaseQty(index) {

    cart[index].qty++;

    updateCart();
}

// DECREASE

function decreaseQty(index) {

    if (cart[index].qty > 1) {
        cart[index].qty--;
    } else {
        cart.splice(index, 1);
    }

    updateCart();
}

// CHECKOUT

document.querySelector(".checkout-btn")
.addEventListener("click", () => {

    const billItems = document.querySelector(".bill-items");

    billItems.innerHTML = "";

    cart.forEach(item => {

        billItems.innerHTML += `
        
        <div class="bill-item">

            <span>${item.title} x ${item.qty}</span>

            <span>$${item.price * item.qty}</span>

        </div>
        `;
    });

    document.getElementById("billTotal").innerText = total;

    billModal.classList.add("show");

});

// CLOSE BILL

document.querySelector(".closeBill")
.addEventListener("click", () => {

    billModal.classList.remove("show");

});

// PAYMENT

document.querySelector(".pay-btn")
.addEventListener("click", () => {

    alert("Payment Successful!");

    cart = [];

    updateCart();

    billModal.classList.remove("show");

    cartSidebar.classList.remove("active");

});

// SEARCH

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {

        const text = card.querySelector("h3")
        .innerText.toLowerCase();

        if (text.includes(value)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }

    });

});

// HERO BUTTONS

document.getElementById("shopBtn")
.addEventListener("click", () => {

    document.getElementById("collection")
    .scrollIntoView({
        behavior: "smooth"
    });

});

document.getElementById("exploreBtn")
.addEventListener("click", () => {

    document.querySelector(".story")
    .scrollIntoView({
        behavior: "smooth"
    });

});

// PRODUCT MODAL

const modal = document.getElementById("productModal");

const cards = document.querySelectorAll(".card");

const closeBtn = document.querySelector(".close-btn");

cards.forEach(card => {

    card.addEventListener("click", (e) => {

        if (e.target.classList.contains("add-cart")) return;

        const title = card.querySelector("h3").innerText;

        const price = card.querySelector(".price-row span").innerText;

        const img = card.querySelector("img").src;

        modal.querySelector("h2").innerText = title;

        modal.querySelector("h3").innerText = price;

        modal.querySelector("img").src = img;

        modal.classList.add("show");

    });

});

// CLOSE MODAL

closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
});

window.addEventListener("click", (e) => {

    if (e.target == modal) {
        modal.classList.remove("show");
    }

});