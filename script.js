/* ==========================================
   ORVÉN JEWELS - Complete Main Script Engine
   ========================================== */

const authorizedAdminNumbers = ["8401715116", "7085658953", "7405393841"];
const adminWhatsAppNumber = "919876543210"; 

// Initialize on DOM load
window.addEventListener("DOMContentLoaded", () => {
  // Auto popup after 10 seconds
  setTimeout(() => {
    openLoginModal();
  }, 10000); 
  
  // Load accurate live market rates
  loadGoogleLiveRates();

  // Load products dynamically from static products.json
  loadProductsFromJSON();

  // Setup Password Show/Hide Toggle Button
  setupPasswordToggle();
});

// Setup Password Show/Hide Toggle UI
function setupPasswordToggle() {
  const passwordInputs = document.querySelectorAll('input[type="password"]');
  
  passwordInputs.forEach(input => {
    const parent = input.parentElement;
    if (parent && !parent.querySelector('.toggle-password-btn')) {
      // Styling parent for proper icon alignment
      parent.style.position = 'relative';

      const toggleBtn = document.createElement('button');
      toggleBtn.type = 'button';
      toggleBtn.className = 'toggle-password-btn';
      toggleBtn.innerHTML = '👁️';
      toggleBtn.style.cssText = 'position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 16px; z-index: 10; padding: 0;';

      toggleBtn.addEventListener('click', () => {
        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';
        toggleBtn.innerHTML = isPassword ? '🙈' : '👁️';
      });

      parent.appendChild(toggleBtn);
    }
  });
}

// Function to fetch products from static products.json for GitHub Pages
async function loadProductsFromJSON() {
  const container = document.getElementById('productsContainer') || document.querySelector('.product-grid');
  if (!container) return;

  try {
    const response = await fetch('products.json');
    if (!response.ok) throw new Error("Could not fetch products.json");
    
    const products = await response.json();
    
    if (Array.isArray(products) && products.length > 0) {
      container.innerHTML = products.map(prod => `
        <div class="grid-card">
          <div class="card-image-wrap" style="position: relative; overflow: hidden;">
            <img src="${prod.image || 'https://via.placeholder.com/300'}" alt="${prod.name}" style="width: 100%; display: block;">
            <div class="gold-overlay" style="position: absolute; top:0; left:0; width:100%; height:100%; background: rgba(212, 175, 55, 0.15); pointer-events: none;"></div>
          </div>
          <div class="card-details" style="padding: 12px; text-align: center;">
            <span class="category-pill" style="font-size: 12px; background: #f4f4f4; padding: 2px 8px; border-radius: 10px;">${prod.category || 'Jewellery'}</span>
            <h3 style="margin: 8px 0; font-size: 16px;">${prod.name}</h3>
            <p class="price" style="font-weight: bold; color: #d4af37;">${prod.price}</p>
          </div>
        </div>
      `).join('');
    }
  } catch (err) {
    console.log("Static product loading info:", err.message);
  }
}

// Function to fetch and sync live gold and silver rates
async function loadGoogleLiveRates() {
  try {
    const res = await fetch('https://data-asg.goldprice.org/dbXRates/INR');
    const json = await res.json();
    if (json && json.items && json.items.length > 0) {
      let ouncePriceINR = json.items[0].xauPrice;
      let gold24k = Math.round(ouncePriceINR / 31.1034768);
      let silverPerGram = Math.round(json.items[0].xagPrice / 31.1034768);
      updateTickerDOM(gold24k, silverPerGram);
      return;
    }
    throw new Error("Using fallback market sync");
  } catch (err) {
    // Current Live Market Benchmarks (24K Gold & 925 Silver per gram)
    updateTickerDOM(15824, 237);
  }
}

// Update DOM elements for Live Rates Ticker
function updateTickerDOM(gold24k, silverPerGram) {
  const el24k = document.getElementById('rate24k');
  const el18k = document.getElementById('rate18k');
  const el14k = document.getElementById('rate14k');
  const el9k = document.getElementById('rate9k');
  const elSilver = document.getElementById('rateSilver');

  if (el24k) el24k.innerText = '₹' + gold24k.toLocaleString('en-IN');
  if (el18k) el18k.innerText = '₹' + Math.round(gold24k * 0.75).toLocaleString('en-IN');
  if (el14k) el14k.innerText = '₹' + Math.round(gold24k * 0.585).toLocaleString('en-IN');
  if (el9k) el9k.innerText = '₹' + Math.round(gold24k * 0.375).toLocaleString('en-IN');
  if (elSilver) elSilver.innerText = '₹' + Math.round(silverPerGram).toLocaleString('en-IN');
}

// Modal Handlers
function openLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.add('active');
}

function closeLoginModal() {
  const modal = document.getElementById('loginModal');
  if (modal) modal.classList.remove('active');
}

function switchView(viewId) {
  document.querySelectorAll('.auth-form-wrapper').forEach(sec => sec.classList.remove('active'));
  const target = document.getElementById(viewId);
  if (target) target.classList.add('active');
}

// Authentication & Admin Redirection Handlers
function handleLogin(event) {
  event.preventDefault();
  let mobile = document.getElementById('loginMobile').value.trim().replace('+91', '');
  let password = document.getElementById('loginPassword').value.trim();

  if(mobile.length < 10) {
    alert('Please enter a valid mobile number.');
    return;
  }

  // Direct Admin Portal Access for the 3 authorized numbers
  if (authorizedAdminNumbers.includes(mobile)) {
    sessionStorage.setItem('orven_active_admin', mobile);
    alert('Admin Access Granted! Redirecting to Admin Portal...');
    window.location.href = 'admin.html';
    return;
  }

  let users = JSON.parse(localStorage.getItem('orven_registered_users')) || [];
  let user = users.find(u => u.mobile === mobile && u.password === password);

  if (user) {
    alert(`Welcome back, ${user.name || 'Valued Client'}! Successfully logged in.`);
    closeLoginModal();
  } else {
    alert('Invalid mobile number or password, or account does not exist.');
  }
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById('regName').value.trim();
  let mobile = document.getElementById('regMobile').value.trim().replace('+91', '');
  const password = document.getElementById('regPassword').value.trim();

  if(mobile.length < 10) {
    alert('Please enter a valid mobile number.');
    return;
  }

  // Direct Admin Portal Access if any of the 3 numbers registers
  if (authorizedAdminNumbers.includes(mobile)) {
    sessionStorage.setItem('orven_active_admin', mobile);
    alert('Admin Authorized! Welcome to ORVÉN Admin Portal.');
    window.location.href = 'admin.html';
    return;
  }

  let users = JSON.parse(localStorage.getItem('orven_registered_users')) || [];
  if(users.some(u => u.mobile === mobile)) {
    alert('This mobile number is already registered! Please login.');
    return;
  }

  users.push({ name, mobile, password, date: new Date().toLocaleString() });
  localStorage.setItem('orven_registered_users', JSON.stringify(users));

  alert('Registration successful! Welcome voucher unlocked.');
  closeLoginModal();

  let whatsappMessage = `Hello Admin, a new customer has registered on ORVÉN JEWELS!%0a%0a👤 Name: ${name}%0a📱 Mobile: ${mobile}%0a🕒 Time: ${new Date().toLocaleString()}`;
  let whatsappURL = `https://wa.me/${adminWhatsAppNumber}?text=${whatsappMessage}`;
  window.open(whatsappURL, '_blank');
}

function handleForgot(event) {
  event.preventDefault();
  let mobile = document.getElementById('forgotMobile').value.trim().replace('+91', '');

  let users = JSON.parse(localStorage.getItem('orven_registered_users')) || [];
  let user = users.find(u => u.mobile === mobile);

  if(user || authorizedAdminNumbers.includes(mobile)) {
    let whatsappMessage = `Hello Admin, password reset requested for account:%0a📱 Mobile: ${mobile}`;
    let whatsappURL = `https://wa.me/${adminWhatsAppNumber}?text=${whatsappMessage}`;
    
    window.open(whatsappURL, '_blank');
    alert('Password recovery request sent to Admin via WhatsApp.');
    closeLoginModal();
  } else {
    alert('This mobile number is not found in our records.');
  }
}
