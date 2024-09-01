document.addEventListener('DOMContentLoaded', () => {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartDisplay() {
        cartItemsElement.innerHTML = cart.map(item => `
            <li>
                <span>${item.name}</span>
                <span>$${item.price}</span>
                <input type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="quantity-input">
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            </li>
        `).join('');
        totalPriceElement.textContent = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
        cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    function updateQuantity(id, quantity) {
        const product = cart.find(item => item.id === id);
        if (product) {
            product.quantity = quantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }

    function removeItem(id) {
        const productIndex = cart.findIndex(item => item.id === id);
        if (productIndex !== -1) {
            cart.splice(productIndex, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    }

    cartItemsElement.addEventListener('change', (event) => {
        if (event.target.classList.contains('quantity-input')) {
            const id = event.target.getAttribute('data-id');
            const quantity = parseInt(event.target.value);
            if (quantity > 0) {
                updateQuantity(id, quantity);
            }
        }
    });

    cartItemsElement.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-btn')) {
            const id = event.target.getAttribute('data-id');
            removeItem(id);
        }
    });

    document.getElementById('checkout').addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            alert(`Thank you for your purchase! Total: $${totalPriceElement.textContent}`);
            localStorage.removeItem('cart');
            updateCartDisplay();
        }
    });

    updateCartDisplay();
});
