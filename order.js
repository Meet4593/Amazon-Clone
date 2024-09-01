document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItemsElement = document.getElementById('order-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartCountElement = document.getElementById('cart-count');

    function displayOrderSummary() {
        orderItemsElement.innerHTML = cart.map(item => `
            <li>
                <span>${item.name}</span>
                <span>$${item.price}</span>
                <span>Quantity: ${item.quantity}</span>
            </li>
        `).join('');
        totalPriceElement.textContent = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
        cartCountElement.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    }

    document.getElementById('shipping-form').addEventListener('submit', event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const shippingDetails = {
            name: formData.get('name'),
            address: formData.get('address'),
            city: formData.get('city'),
            zip: formData.get('zip'),
        };
        alert(`Order confirmed for ${shippingDetails.name}!`);
        localStorage.removeItem('cart');
        window.location.href = 'index.html';
    });

    displayOrderSummary();
});
