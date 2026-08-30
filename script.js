/* ==========================================
   ORVÉN JEWELS - Main JavaScript Engine
   ================================---------- */

const allowedAdminNumbers = ["+919999999999", "+919876543210"];
const adminWhatsAppNumber = "919876543210"; 

// Initialize on DOM load
window.addEventListener("DOMContentLoaded", () => {
  // Auto popup after 10 seconds
  setTimeout(() => {
    openLoginModal();
  }, 10000); 
  
  // Load accurate live market rates
  loadGoogleLiveRates();
});

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

// Authentication & Admin Handlers
function handleLogin(event) {
  event.preventDefault();
  const mobile = document.getElementById('loginMobile').value.trim();
  const password = document.getElementById('loginPassword').value.trim();

  if(mobile.length < 10) {
    alert('Please enter a valid mobile number.');
    return;
  }

  if (allowedAdminNumbers.includes(mobile)) {
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
    alert('Invalid mobile number or password, or account does not exist. Please register.');
  }
}

function handleRegister(event) {
  event.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const mobile = document.getElementById('regMobile').value.trim();
  const password = document.getElementById('regPassword').value.trim();

  if(mobile.length < 10) {
    alert('Please enter a valid mobile number.');
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
  const mobile = document.getElementById('forgotMobile').value.trim();

  let users = JSON.parse(localStorage.getItem('orven_registered_users')) || [];
  let user = users.find(u => u.mobile === mobile);

  if(user || allowedAdminNumbers.includes(mobile)) {
    let whatsappMessage = `Hello Admin, password reset requested for account:%0a📱 Mobile: ${mobile}`;
    let whatsappURL = `https://wa.me/${adminWhatsAppNumber}?text=${whatsappMessage}`;
    
    window.open(whatsappURL, '_blank');
    alert('Password recovery request sent to Admin via WhatsApp.');
    closeLoginModal();
  } else {
    alert('This mobile number is not found in our records.');
  }
}
