// Product Database
const products = [
    {
        id: 1,
        name: "Premium Notebook",
        price: 250,
        category: "stationery",
        image: "premium-notebook-diary.jpg"
    },
    {
        id: 2,
        name: "HP LaserJet Pro",
        price: 35000,
        category: "printers",
        image: "hp_printer.avif"
    },
    {
        id: 3,
        name: "Standard ETR Machine",
        price: 45000,
        category: "etr",
        image: "etr.jpg"
    },

    {
        id: 4,
        name: "002 Premium Notebook",
        price: 300,
        category: "stationery",
        image: "premium_notebook_002.jpg"
    },

    {
        id: 5,
        name: "002 HP LaserJet Pro",
        price: 30000,
        category: "printers",
        image: "p1.webp"
    },

    {
        id: 4,
        name: "Premium Notebook (Blue)",
        price: 350,
        category: "stationery",
        image: "a5-premium-notebook-blue002.jpg"
    },];
document.addEventListener('DOMContentLoaded', function() {
    const productsGrid = document.querySelector('.products-grid');
 
    function displayProducts(category = 'all') {
        productsGrid.innerHTML = products
            .filter(product => category === 'all' || product.category === category)
            .map(product => `
                <div class="product-card" data-category="${product.category}">
                    <div class="product-image">
                        <img src="./assets/images/shop/stationery/${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="price">KSh ${product.price.toLocaleString()}</p>
                        <button class="add-to-cart-btn" 
                                onclick="addToCart(${product.id})">
                            Add to Cart
                        </button>
                    </div>
                </div>
            `).join('');
    }
    displayProducts();const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
 
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const category = this.dataset.category;
            displayProducts(category);
        });
    }); updateCartCount();
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const modal = document.getElementById('quickViewModal');
    const closeModal = document.querySelector('.close-modal');

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const productId = btn.dataset.productId;
            showQuickView(productId);
        });
    });  closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    }); const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productName = this.getAttribute('data-product-name');
            const productPrice = parseFloat(this.getAttribute('data-product-price'));
            
            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            };

            addToCart(product);
        });
    });
    const cartIcon = document.querySelector('.cart-icon');
    const cartPreview = document.getElementById('cartPreview');
    const closeCart = document.querySelector('.close-cart');
    cartIcon.addEventListener('click', () => {
        cartPreview.classList.add('active');
        updateCartPreview();});
closeCart.addEventListener('click', () => {
        cartPreview.classList.remove('active');});});
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.classList.add('bump');
        setTimeout(() => {
            cartCount.classList.remove('bump');
        }, 300);
    }
}
function updateCartPreview() {
    const cartItems = document.querySelector('.cart-items');
    const totalAmount = document.querySelector('.total-amount');
    
    if (cartItems && totalAmount) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Your cart is empty</p>';
            totalAmount.textContent = 'KSh 0';
            return;
        }

        cartItems.innerHTML = cart.map(item => {
            const product = products.find(p => p.id === item.id);
            return `
                <div class="cart-item">
                    <img src="./assets/images/shop/stationery/${product.image}" alt="${product.name}" class="cart-item-image">
                    <div class="cart-item-details">
                        <h4>${product.name}</h4>
                        <p>KSh ${product.price.toLocaleString()}</p>
                        <div class="cart-item-quantity">
                            <button onclick="updateQuantity(${item.id}, -1)" style="font-size:1.347rem;padding:2.54px;">-</button>
                            <span style="font-weight:800;">${item.quantity}</span>
                            <button onclick="updateQuantity(${item.id}, 1)" style="font-size:1.347rem;padding:2.54px;">+</button>
                        </div>
                    </div>
                    <button onclick="removeFromCart(${item.id})" class="remove-item" style="font-size:1.347rem;border-radius:20%;padding:2.54px;">×</button>
                </div>
            `;
        }).join('');

        const total = cart.reduce((sum, item) => {
            const product = products.find(p => p.id === item.id);
            return sum + (product.price * item.quantity);
        }, 0);
        
        totalAmount.textContent = `KSh ${total.toLocaleString()}`;
    }
}
window.addToCart = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartPreview();
    showToast(`${product.name} added to cart`);
};
window.updateQuantity = function(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity < 1) {
            cart = cart.filter(i => i.id !== productId);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartPreview();
    }
};
window.removeFromCart = function(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartPreview();
};function showToast(message) {
    const toast = document.createElement('div');
    toast.classList.add('toast-message');
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
window.checkoutViaWhatsApp = function() {
    const phoneNumber = '254741230513';
    let messageItems = [];
    let total = 0;
    
    cart.forEach(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
            const itemTotal = product.price * item.quantity;
            total += itemTotal;
            messageItems.push(`${product.name} (${item.quantity}x @ KSh ${product.price.toLocaleString()})`);
        }
    });
    const message = `New Order Details:\n${messageItems.join('\n')}\n\nTotal Amount: KSh ${total.toLocaleString()}`;
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
};

function showQuickView(productId) {
    
} 