const products = [
  { id: 1, name: "iPhone 14 Pro", price: 999.99, image: "https://via.placeholder.com/150?text=iPhone", category: "elektronika" },
  { id: 2, name: "MacBook Air M2", price: 1299.99, image: "https://via.placeholder.com/150?text=MacBook", category: "elektronika" },
  { id: 3, name: "Samsung 4K TV", price: 599.99, image: "https://via.placeholder.com/150?text=TV", category: "elektronika" },
  { id: 4, name: "AirPods Pro", price: 249.99, image: "https://via.placeholder.com/150?text=AirPods", category: "elektronika" },
  { id: 5, name: "Smart Watch", price: 199.99, image: "https://via.placeholder.com/150?text=Watch", category: "elektronika" },
  { id: 6, name: "Gaming Konsol", price: 499.99, image: "https://via.placeholder.com/150?text=Konsol", category: "elektronika" },
  { id: 7, name: "Bluetooth Speaker", price: 89.99, image: "https://via.placeholder.com/150?text=Speaker", category: "elektronika" },
  { id: 8, name: "Noutbuk Stendi", price: 39.99, image: "https://via.placeholder.com/150?text=Stend", category: "elektronika" },
  { id: 9, name: "Smartfon Tripodi", price: 29.99, image: "https://via.placeholder.com/150?text=Tripod", category: "elektronika" },
  { id: 10, name: "Quloqchinlar", price: 79.99, image: "https://via.placeholder.com/150?text=Quloqchin", category: "elektronika" },
  { id: 11, name: "Planshet", price: 349.99, image: "https://via.placeholder.com/150?text=Planshet", category: "elektronika" },
  { id: 12, name: "Kamera", price: 699.99, image: "https://via.placeholder.com/150?text=Kamera", category: "elektronika" },
  { id: 13, name: "Futbolka", price: 29.99, image: "https://via.placeholder.com/150?text=Futbolka", category: "kiyim" },
  { id: 14, name: "Shimlar", price: 49.99, image: "https://via.placeholder.com/150?text=Shimlar", category: "kiyim" },
  { id: 15, name: "Sport Poyabzali", price: 89.99, image: "https://via.placeholder.com/150?text=Poyabzal", category: "sport" },
  { id: 16, name: "Kepka", price: 19.99, image: "https://via.placeholder.com/150?text=Kepka", category: "kiyim" },
  { id: 17, name: "Idish Yuvish Mashinasi", price: 399.99, image: "https://via.placeholder.com/150?text=Idish-Yuvish", category: "uy" },
  { id: 18, name: "Changyutgich", price: 149.99, image: "https://via.placeholder.com/150?text=Changyutgich", category: "uy" },
  { id: 19, name: "Sport Sumkasi", price: 39.99, image: "https://via.placeholder.com/150?text=Sport-Sumka", category: "sport" },
  { id: 20, name: "Dazmol", price: 59.99, image: "https://via.placeholder.com/150?text=Dazmol", category: "uy" },
];

let cart = [];
let smsCode = '';
let profileData = {
  firstName: 'Foydalanuvchi',
  lastName: 'Familiyasi',
  phone: '+998 90 123 45 67'
};

function renderProducts(category = 'all') {
  const productGrid = document.getElementById('product-grid');
  productGrid.innerHTML = '';
  const filteredProducts = category === 'all' ? products : products.filter(product => product.category === category);
  if (filteredProducts.length === 0) {
    productGrid.innerHTML = '<p class="text-center">Mahsulotlar topilmadi</p>';
  } else {
    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'product-card';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button class="btn btn-purple" onclick="addToCart(${product.id})">Savatga qo'shish</button>
      `;
      productGrid.appendChild(productCard);
    });
  }
}

function filterProducts(category) {
  renderProducts(category);
  toggleSidebar();
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    renderCart();
    updateCartCount();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(p => p.id !== productId);
  renderCart();
  updateCartCount();
}

function renderCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="text-center">Savat bo\'sh</p>';
  } else {
    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'cart-item';
      cartItem.innerHTML = `
        <span>${item.name} - $${item.price.toFixed(2)}</span>
        <button onclick="removeFromCart(${item.id})">O'chirish</button>
      `;
      cartItems.appendChild(cartItem);
    });
  }
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  document.getElementById('cart-total').textContent = `Jami: $${total.toFixed(2)}`;
  updateCartProfile();
}

function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.length;
}

function updateCartProfile() {
  document.getElementById('cart-first-name').textContent = profileData.firstName;
  document.getElementById('cart-last-name').textContent = profileData.lastName;
  document.getElementById('cart-phone').textContent = profileData.phone;
}

function updateProfileDisplay() {
  document.getElementById('profile-display-first-name').textContent = profileData.firstName;
  document.getElementById('profile-display-last-name').textContent = profileData.lastName;
  document.getElementById('profile-display-phone').textContent = profileData.phone;
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
}

function toggleProfileModal() {
  const modal = document.getElementById('profile-modal');
  modal.classList.toggle('active');
  if (modal.classList.contains('active')) {
    document.getElementById('profile-first-name').value = profileData.firstName;
    document.getElementById('profile-last-name').value = profileData.lastName;
    document.getElementById('profile-phone').value = profileData.phone;
    document.getElementById('profile-sms-code').value = '';
  }
}

function toggleCartModal() {
  const modal = document.getElementById('cart-modal');
  modal.classList.toggle('active');
  if (modal.classList.contains('active')) {
    updateCartProfile();
  }
}

function toggleChekModal() {
  const modal = document.getElementById('chek-modal');
  modal.classList.toggle('active');
}

function toggleMobileMenu() {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('active');
}

function generateSMSCode() {
  smsCode = Math.floor(1000 + Math.random() * 9000).toString();
  alert(`SMS kod: ${smsCode}`);
}

function saveProfile() {
  const firstName = document.getElementById('profile-first-name').value;
  const lastName = document.getElementById('profile-last-name').value;
  const phone = document.getElementById('profile-phone').value;
  const smsInput = document.getElementById('profile-sms-code').value;

  if (!firstName || !lastName || !phone || !smsInput) {
    alert('Iltimos, barcha maydonlarni to\'ldiring!');
    return;
  }

  if (smsInput !== smsCode) {
    alert('SMS kod noto\'g\'ri!');
    return;
  }

  profileData = { firstName, lastName, phone };
  localStorage.setItem('profileData', JSON.stringify(profileData));
  updateProfileDisplay();
  updateCartProfile();
  toggleProfileModal();
  alert('Profil ma\'lumotlari saqlandi!');
}

function toggleCardDetails() {
  const payment = document.getElementById('payment').value;
  const cardDetails = document.getElementById('card-details');
  cardDetails.classList.toggle('hidden', payment !== 'card');
}

function submitOrder() {
  const address = document.getElementById('address').value;
  const payment = document.getElementById('payment').value;
  const cardNumber = document.getElementById('card-number').value;
  const cardExpiry = document.getElementById('card-expiry').value;

  if (!address || !payment) {
    alert('Iltimos, manzil va to\'lov usulini tanlang!');
    return;
  }

  if (payment === 'card' && (!cardNumber || !cardExpiry)) {
    alert('Karta ma\'lumotlarini to\'ldiring!');
    return;
  }

  if (cart.length === 0) {
    alert('Savat bo\'sh!');
    return;
  }

  const orderNumber = `SAVDO-${Math.floor(1000 + Math.random() * 9000)}`;
  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
  const chekDetails = document.getElementById('chek-details');
  chekDetails.innerHTML = `
    <p><strong>Buyurtma raqami:</strong> ${orderNumber}</p>
    <p><strong>Ism:</strong> ${profileData.firstName} ${profileData.lastName}</p>
    <p><strong>Telefon:</strong> ${profileData.phone}</p>
    <p><strong>Manzil:</strong> ${address}</p>
    <p><strong>To'lov usuli:</strong> ${payment === 'cash' ? 'Naqd' : 'Karta'}</p>
    ${payment === 'card' ? `<p><strong>Karta raqami:</strong> ${cardNumber}</p><p><strong>MM/YY:</strong> ${cardExpiry}</p>` : ''}
    <h3>Mahsulotlar:</h3>
    <ul>${cart.map(item => `<li>${item.name} - $${item.price.toFixed(2)}</li>`).join('')}</ul>
    <p><strong>Jami:</strong> $${total}</p>
  `;

  toggleCartModal();
  toggleChekModal();
  cart = [];
  renderCart();
  updateCartCount();
  document.getElementById('address').value = '';
  document.getElementById('payment').value = '';
  document.getElementById('card-number').value = '';
  document.getElementById('card-expiry').value = '';
}

document.addEventListener('DOMContentLoaded', () => {
  const savedProfile = localStorage.getItem('profileData');
  if (savedProfile) {
    profileData = JSON.parse(savedProfile);
  }
  renderProducts();
  renderCart();
  updateCartCount();
  updateProfileDisplay();
});