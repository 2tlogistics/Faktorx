
// DOM Elements
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const cartBtn = document.getElementById('cart-btn');
const mobileCartBtn = document.getElementById('mobile-cart-btn');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartBtn = document.getElementById('close-cart-btn');
const quickViewBtns = document.querySelectorAll('.quick-view-btn');
const quickViewModal = document.getElementById('quick-view-modal');
const closeQuickView = document.getElementById('close-quick-view');
const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
const addToCartQuickView = document.getElementById('add-to-cart-quickview');
const checkoutBtn = document.getElementById('checkout-btn');
const checkoutModal = document.getElementById('checkout-modal');
const closeCheckoutModal = document.getElementById('close-checkout-modal');
const confirmOrderBtn = document.getElementById('confirm-order-btn');
const orderConfirmation = document.getElementById('order-confirmation');
const continueShoppingBtn = document.getElementById('continue-shopping-btn');
const viewOrderBtn = document.getElementById('view-order-btn');
const backToTopBtn = document.getElementById('back-to-top');
const preloader = document.getElementById('preloader');

// Cart State
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Cart Sidebar Toggle
cartBtn.addEventListener('click', toggleCart);
mobileCartBtn.addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);

function toggleCart() {
    cartSidebar.classList.toggle('translate-x-full');
    document.body.classList.toggle('overflow-hidden');
}

// Quick View Modal
quickViewBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productId = e.currentTarget.getAttribute('data-product');
        openQuickView(productId);
    });
});

closeQuickView.addEventListener('click', () => {
    quickViewModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
});

function openQuickView(productId) {
    // In a real app, you would fetch product details from your database/API
    const product = getProductById(productId);
    
    // Set product details in modal
    document.getElementById('quick-view-title').textContent = product.name;
    document.getElementById('quick-view-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('quick-view-description').textContent = product.description;
    document.getElementById('quick-view-main-image').src = product.images[0];
    document.getElementById('quick-view-main-image').alt = product.name;
    
    // Set thumbnails
    const thumbnailGrid = document.querySelector('.thumbnail-grid');
    thumbnailGrid.innerHTML = '';
    
    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'cursor-pointer';
        thumbnail.innerHTML = `<img src="${image}" alt="${product.name}" class="w-full h-16 object-cover rounded-lg hover:opacity-80 transition-opacity duration-300">`;
        thumbnail.addEventListener('click', () => {
            document.getElementById('quick-view-main-image').src = image;
        });
        thumbnailGrid.appendChild(thumbnail);
    });
    
    // Set add to cart button
    addToCartQuickView.setAttribute('data-id', productId);
    
    // Show modal
    quickViewModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
}

// Add to Cart
function addToCart(productId, quantity = 1) {
    const product = getProductById(productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.images[0],
            quantity: quantity
        });
    }
    
    updateCart();
    showAddedToCartNotification(product.name);
}

addToCartBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productId = e.currentTarget.getAttribute('data-id');
        addToCart(productId);
    });
});

addToCartQuickView.addEventListener('click', () => {
    const productId = addToCartQuickView.getAttribute('data-id');
    const quantity = parseInt(document.querySelector('.quantity-value').textContent);
    addToCart(productId, quantity);
    quickViewModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    toggleCart();
});

// Update Cart
function updateCart() {
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalItems;
    document.getElementById('mobile-cart-count').textContent = totalItems;
    
    // Update cart items
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="text-center py-12 text-gray-500">
                <i class="fas fa-shopping-cart text-4xl mb-4"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="flex items-start py-4 border-b">
                <div class="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden mr-4">
                    <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover">
                </div>
                <div class="flex-grow">
                    <h4 class="font-medium">${item.name}</h4>
                    <div class="flex justify-between items-center mt-1">
                        <span class="text-primary font-bold">$${(item.price * item.quantity).toFixed(2)}</span>
                        <div class="flex items-center">
                            <button class="decrease-quantity w-6 h-6 flex items-center justify-center border rounded-l" data-id="${item.id}">-</button>
                            <span class="quantity w-8 h-6 flex items-center justify-center border-t border-b">${item.quantity}</span>
                            <button class="increase-quantity w-6 h-6 flex items-center justify-center border rounded-r" data-id="${item.id}">+</button>
                        </div>
                    </div>
                </div>
                <button class="remove-item ml-4 text-gray-400 hover:text-primary" data-id="${item.id}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');
        
        // Add event listeners to quantity buttons
        document.querySelectorAll('.increase-quantity').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.currentTarget.getAttribute('data-id');
                const item = cart.find(item => item.id === productId);
                item.quantity += 1;
                updateCart();
            });
        });
        
        document.querySelectorAll('.decrease-quantity').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.currentTarget.getAttribute('data-id');
                const item = cart.find(item => item.id === productId);
                
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    cart = cart.filter(item => item.id !== productId);
                }
                
                updateCart();
            });
        });
        
        document.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const productId = e.currentTarget.getAttribute('data-id');
                cart = cart.filter(item => item.id !== productId);
                updateCart();
            });
        });
    }
    
    // Update totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 50 ? 0 : 5;
    const total = subtotal + shipping;
    
    document.getElementById('cart-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('cart-shipping').textContent = shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`;
    document.getElementById('cart-total').textContent = `$${total.toFixed(2)}`;
    
    // Update checkout modal totals
    document.getElementById('checkout-subtotal').textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById('checkout-shipping').textContent = `$${shipping.toFixed(2)}`;
    document.getElementById('checkout-total').textContent = `$${total.toFixed(2)}`;
}

// Checkout Process
checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    toggleCart();
    checkoutModal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
});

closeCheckoutModal.addEventListener('click', () => {
    checkoutModal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
});

confirmOrderBtn.addEventListener('click', () => {
    // In a real app, you would send the order to your backend
    checkoutModal.classList.add('hidden');
    orderConfirmation.classList.remove('hidden');
    
    // Clear cart
    cart = [];
    updateCart();
    localStorage.removeItem('cart');
});

continueShoppingBtn.addEventListener('click', () => {
    orderConfirmation.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
});

viewOrderBtn.addEventListener('click', () => {
    orderConfirmation.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    // In a real app, you would redirect to order details page
    alert('Esta funcionalidad mostraría los detalles del pedido en una aplicación real');
});

// Payment Method Toggle
document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
        const transferInstructions = document.getElementById('transfer-instructions');
        
        if (e.target.value === 'transferencia') {
            transferInstructions.classList.remove('hidden');
        } else {
            transferInstructions.classList.add('hidden');
        }
    });
});

// Back to Top Button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.remove('opacity-0', 'invisible');
        backToTopBtn.classList.add('opacity-100', 'visible');
    } else {
        backToTopBtn.classList.remove('opacity-100', 'visible');
        backToTopBtn.classList.add('opacity-0', 'invisible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Size and Color Selection
document.querySelectorAll('.size-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.size-option').forEach(opt => opt.classList.remove('active'));
        e.currentTarget.classList.add('active');
    });
});

document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
        e.currentTarget.classList.add('active');
    });
});

// Quantity Selector
document.querySelectorAll('.quantity-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const container = e.currentTarget.parentElement;
        const valueElement = container.querySelector('.quantity-value');
        let value = parseInt(valueElement.textContent);
        
        if (e.currentTarget.textContent === '+') {
            value += 1;
        } else if (value > 1) {
            value -= 1;
        }
        
        valueElement.textContent = value;
    });
});

// Product Data (simulated - in a real app this would come from an API)
function getProductById(id) {
    const products = {
        '1': {
            id: '1',
            name: 'Camiseta Urban',
            price: 25.00,
            description: 'Camiseta de algodón 100% con diseño urbano exclusivo. Perfecta para cualquier ocasión casual.',
            images: [
                'assets/products/product1.jpg',
                'assets/products/product1-alt1.png',
                'assets/products/product1-alt2.png'
            ]
        },
        '2': {
            id: '2',
            name: 'Hoodie Street',
            price: 45.00,
            description: 'Hoodie con capucha y bolsillo canguro. Tejido suave y cálido para los días más frescos.',
            images: [
                'assets/products/product2.jpg',
                'assets/products/product2-alt1.jpg',
                'assets/products/product2-alt2.jpg'
            ]
        },
        '3': {
            id: '3',
            name: 'Pantalón Jogger',
            price: 35.00,
            description: 'Pantalón jogger ajustable con cintura elástica y bolsillos. Combinación perfecta de estilo y comodidad.',
            images: [
                'assets/products/product3.jpg',
                'assets/products/product3-alt1.jpg',
                'assets/products/product3-alt2.jpg'
            ]
        },
        '4': {
            id: '4',
            name: 'Top Trendy',
            price: 28.00,
            description: 'Top moderno con diseño juvenil. Ideal para combinar con jeans o faldas.',
            images: [
                'assets/products/product4.jpg',
                'assets/products/product4-alt1.jpg',
                'assets/products/product4-alt2.jpg'
            ]
        }
    };
    
    return products[id] || products['1'];
}

// Notification
function showAddedToCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'fixed bottom-4 right-4 bg-primary text-white px-6 py-3 rounded-lg shadow-lg flex items-center animate__animated animate__fadeInUp';
    notification.innerHTML = `
        <i class="fas fa-check-circle mr-2"></i>
        <span>${productName} añadido al carrito</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('animate__fadeOutDown');
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Hide preloader after 1.5s
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    }, 1500);
    
    // Initialize cart
    updateCart();
    
    // Load products (simulated - in a real app this would be an API call)
    setTimeout(() => {
        const productsGrid = document.querySelector('#products .grid');
        if (productsGrid) {
            productsGrid.innerHTML = '';
            
            // Simulate loading 8 products
            for (let i = 1; i <= 8; i++) {
                const productId = (i % 4) + 1; // Cycle through our 4 sample products
                const product = getProductById(productId.toString());
                
                const productElement = document.createElement('div');
                productElement.className = 'product-card group';
                productElement.innerHTML = `
                    <div class="product-image-container">
                        <img src="${product.images[0]}" alt="${product.name}" class="product-image">
                        <div class="product-overlay">
                            <button class="quick-view-btn" data-product="${product.id}">
                                <i class="fas fa-eye mr-2"></i> Vista rápida
                            </button>
                        </div>
                    </div>
                    <div class="product-details">
                        <h3 class="product-title">${product.name}</h3>
                        <div class="product-price">$${product.price.toFixed(2)}</div>
                        <div class="product-actions">
                            <button class="add-to-cart-btn" data-id="${product.id}">
                                <i class="fas fa-cart-plus mr-2"></i> Añadir
                            </button>
                        </div>
                    </div>
                `;
                
                productsGrid.appendChild(productElement);
            }
            
            // Add event listeners to new buttons
            document.querySelectorAll('.quick-view-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = e.currentTarget.getAttribute('data-product');
                    openQuickView(productId);
                });
            });
            
            document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = e.currentTarget.getAttribute('data-id');
                    addToCart(productId);
                });
            });
        }
    }, 1000);
});
