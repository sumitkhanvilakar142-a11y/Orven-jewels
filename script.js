// --- MOBILE MENU TOGGLE ---
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// --- WHATSAPP INTEGRATION ---
const WHATSAPP_NUMBER = "918401715116";

function openWhatsApp(product = "") {
  const text = product
    ? `Hello ORVÉN JEWELS, I'm interested in the ${product}. Please share the details.`
    : `Hello ORVÉN JEWELS, I'd like to explore your jewelry collection.`;
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  if (!WHATSAPP_NUMBER.includes("X")) window.open(url, "_blank", "noopener");
  else alert("Please add ORVÉN's WhatsApp number in script.js first.");
}

document.querySelectorAll("[data-product]").forEach(button => {
  button.addEventListener("click", () => openWhatsApp(button.dataset.product));
});

document.getElementById("contactForm")?.addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const interest = document.getElementById("interest").value;
  const message = document.getElementById("message").value.trim();

  if (WHATSAPP_NUMBER.includes("X")) {
    alert("Please add ORVÉN's WhatsApp number in script.js first.");
    return;
  }

  const text = `Hello ORVÉN JEWELS,

Name: ${name}
Phone: ${phone}
Interest: ${interest}
Message: ${message || "I'd like to know more."}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});

// --- WHITELISTED & ADMIN USERS ---
const whitelistedUsers = [
  { mobile: "+918401715116", pin: "1234", role: "admin", name: "Sumit (Owner)" },
  { mobile: "+917085658953", pin: "1234", role: "admin", name: "Admin Two" },
  { mobile: "+917405393841", pin: "1234", role: "admin", name: "Admin Three" },
  { mobile: "+919999999999", pin: "5678", role: "admin", name: "Co-Admin" },
  { mobile: "+918888888888", pin: "1111", role: "client", name: "VIP Member" }
];

window.addEventListener("DOMContentLoaded", () => {
  checkActiveSession();
  loadGoogleLiveRates();
  updateCartCount();

  // --- AUTO POPUP AFTER 10 SECONDS ---
  let activeUser = JSON.parse(localStorage.getItem('orven_active_user'));
  if (!activeUser) {
    setTimeout(() => {
      const modal = document.getElementById('loginModal');
      if (modal && modal.style.display !== 'flex') {
        modal.style.display = 'flex';
      }
    }, 10000);
  }
});

// Tab Switching Between Login & Signup
function switchTab(mode) {
  const loginForm = document.getElementById('loginFormWrapper');
  const signupForm = document.getElementById('signupFormWrapper');
  const tabLoginBtn = document.getElementById('tabLoginBtn');
  const tabSignupBtn = document.getElementById('tabSignupBtn');

  if (mode === 'login') {
    loginForm.style.display = 'block';
    signupForm.style.display = 'none';
    tabLoginBtn.style.color = 'var(--gold, #d4af37)';
    tabLoginBtn.style.borderBottom = '2px solid var(--gold, #d4af37)';
    tabSignupBtn.style.color = '#888';
    tabSignupBtn.style.borderBottom = 'none';
  } else {
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
    tabSignupBtn.style.color = 'var(--gold, #d4af37)';
    tabSignupBtn.style.borderBottom = '2px solid var(--gold, #d4af37)';
    tabLoginBtn.style.color = '#888';
    tabLoginBtn.style.borderBottom = 'none';
  }
}

// Customer Signup Handler
function handleCustomerSignup(event) {
  event.preventDefault();
  const name = document.getElementById('signupName').value.trim();
  const countryCode = document.getElementById('signupCountryCode').value;
  const rawMobile = document.getElementById('signupMobile').value.trim();
  const mobile = countryCode + rawMobile;
  const pin = document.getElementById('signupPassword').value.trim();

  let customUsers = JSON.parse(localStorage.getItem('orven_custom_users')) || [];
  let existing = customUsers.find(u => u.mobile === mobile) || whitelistedUsers.find(u => u.mobile === mobile);
  
  if (existing) {
    alert('This mobile number is already registered. Please login instead.');
    switchTab('login');
    return;
  }

  const newUser = { mobile: mobile, pin: pin, role: "client", name: name };
  customUsers.push(newUser);
  localStorage.setItem('orven_custom_users', JSON.stringify(customUsers));

  alert('Registration successful! Please login with your credentials.');
  switchTab('login');
}

// Authorized Login Handler
function handleAuthorizedLogin(event) {
  event.preventDefault();
  const countryCode = document.getElementById('authCountryCode').value;
  const rawMobile = document.getElementById('authMobile').value.trim();
  const mobile = countryCode + rawMobile;
  const pin = document.getElementById('authPassword').value.trim();

  let customUsers = JSON.parse(localStorage.getItem('orven_custom_users')) || [];
  let allUsers = [...whitelistedUsers, ...customUsers];
  let foundUser = allUsers.find(u => u.mobile === mobile && u.pin === pin);

  if (foundUser) {
    localStorage.setItem('orven_active_user', JSON.stringify(foundUser));
    alert(`Welcome back, ${foundUser.name}!`);
    closeLoginModal();
    checkActiveSession();

    if (foundUser.role === 'admin') {
      window.location.href = 'admin.html';
    }
  } else {
    alert('Access Denied: Incorrect mobile number or PIN.');
  }
}

function checkActiveSession() {
  let activeUser = JSON.parse(localStorage.getItem('orven_active_user'));
  if (activeUser) {
    const authBtn = document.getElementById('authButtonText');
    if (authBtn) {
      authBtn.innerHTML = `<span>👤</span> ${activeUser.name} (<a href="#" onclick="logoutUser()" style="color:#d4af37">Logout</a>)`;
    }
    if (activeUser.role === 'admin' && window.location.pathname.includes('index.html')) {
      window.location.href = 'admin.html';
    }
  }
}

function logoutUser() {
  localStorage.removeItem('orven_active_user');
  window.location.reload();
}

// --- LIVE RATES FETCH ---
async function loadGoogleLiveRates() {
  try {
    const res = await fetch('https://data-asg.goldprice.org/dbXRates/INR');
    const json = await res.json();
    if (json && json.items && json.items.length > 0) {
      let ouncePriceINR = json.items[0].xauPrice;
      let gold24k = Math.round(ouncePriceINR / 31.1034768);
      updateTickerDOM(gold24k, Math.round(json.items[0].xagPrice / 31.1034768));
      return;
    }
    throw new Error("Using fallback");
  } catch (err) {
    updateTickerDOM(15824, 255);
  }
}

function updateTickerDOM(gold24k, silverPerGram) {
  const r24 = document.getElementById('rate24k');
  const r18 = document.getElementById('rate18k');
  const r14 = document.getElementById('rate14k');
  const r9 = document.getElementById('rate9k');
  const rSilver = document.getElementById('rateSilver');

  if (r24) r24.innerText = '₹' + gold24k.toLocaleString('en-IN');
  if (r18) r18.innerText = '₹' + Math.round(gold24k * 0.75).toLocaleString('en-IN');
  if (r14) r14.innerText = '₹' + Math.round(gold24k * 0.585).toLocaleString('en-IN');
  if (r9) r9.innerText = '₹' + Math.round(gold24k * 0.375).toLocaleString('en-IN');
  if (rSilver) rSilver.innerText = '₹' + Math.round(silverPerGram).toLocaleString('en-IN');
}

function openLoginModal() { 
  const modal = document.getElementById('loginModal');
  if (modal) modal.style.display = 'flex'; 
}

function closeLoginModal() { 
  const modal = document.getElementById('loginModal');
  if (modal) modal.style.display = 'none'; 
}

function updateCartCount() {
  let cart = JSON.parse(localStorage.getItem('orven_cart')) || [];
  const cartCountEl = document.getElementById('cartCount');
  if (cartCountEl) cartCountEl.innerText = cart.length;
}
