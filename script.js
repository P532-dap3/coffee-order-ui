let order = { beverage: null, condiments: [] };

function selectBeverage(beverage) {
  order.beverage = beverage;
  sessionStorage.setItem('order', JSON.stringify(order));
  location.href = 'condiment.html';
}

function addCondiment(condiment) {
  const cart = document.getElementById('cart');
  order = JSON.parse(sessionStorage.getItem('order'));
  order.condiments.push(condiment);
  sessionStorage.setItem('order', JSON.stringify(order));
  renderCart();
}

function renderCart() {
  const cart = document.getElementById('cart');
  if (!cart) return;
  cart.innerHTML = `<h3>My Order</h3>
    <div onclick="removeBeverage()"><strong>${order.beverage}</strong></div>
    ${order.condiments.map((c, i) => `<div onclick="removeCondiment(${i})">${c}</div>`).join('')}
    <button onclick="confirmOrder()">Confirm Order</button>`;
}

function removeBeverage() {
  sessionStorage.removeItem('order');
  location.href = 'beverage.html';
}

function removeCondiment(index) {
  order.condiments.splice(index, 1);
  sessionStorage.setItem('order', JSON.stringify(order));
  renderCart();
}

function confirmOrder() {
  location.href = 'confirmation.html';
}

window.onload = () => {
  if (document.getElementById('cart')) {
    order = JSON.parse(sessionStorage.getItem('order')) || { beverage: null, condiments: [] };
    renderCart();
  }
  if (document.getElementById('order-summary')) {
    const order = JSON.parse(sessionStorage.getItem('order'));
    const summary = `${order.beverage.toLowerCase()} with ${order.condiments.join(' and ').toLowerCase()}!`;
    document.getElementById('order-summary').innerText = summary;
  }
};