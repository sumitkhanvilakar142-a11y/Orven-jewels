// --- WHITELISTED & ADMIN USERS ---
const whitelistedUsers = [
  { mobile: "+918401715116", pin: "1234", role: "admin", name: "Sumit (Owner)" },
  { mobile: "+917085658953", pin: "1234", role: "admin", name: "Admin Two" },
  { mobile: "+917405393841", pin: "1234", role: "admin", name: "Admin Three" },
  { mobile: "+919999999999", pin: "5678", role: "admin", name: "Co-Admin" },
  { mobile: "+918888888888", pin: "1111", role: "client", name: "VIP Member" }
];

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
