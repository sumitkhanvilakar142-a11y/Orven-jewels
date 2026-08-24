// ==========================================
// ORVEN JEWELS OWNER PORTAL
// ==========================================

// WhatsApp Business Number
const whatsappNumber = "919328784297";


// ==========================================
// PAGE NAVIGATION
// ==========================================

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".page");
const mobileItems = document.querySelectorAll(".mobile-nav-item");

function showPage(pageId) {

  pages.forEach(page => {
    page.classList.remove("active-page");
  });

  const selectedPage = document.getElementById(pageId);

  if (selectedPage) {
    selectedPage.classList.add("active-page");
  }

  navItems.forEach(item => {
    item.classList.remove("active");

    if (item.dataset.page === pageId) {
      item.classList.add("active");
    }
  });

  mobileItems.forEach(item => {
    item.classList.remove("active");
  });

  // Close mobile sidebar
  document.getElementById("sidebar").classList.remove("open");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


// Desktop sidebar navigation
navItems.forEach(item => {

  item.addEventListener("click", function(e) {

    e.preventDefault();

    const page = this.dataset.page;

    showPage(page);

  });

});


// ==========================================
// MOBILE SIDEBAR
// ==========================================

const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

if (menuBtn) {

  menuBtn.addEventListener("click", () => {

    sidebar.classList.toggle("open");

    if (sidebar.classList.contains("open")) {
      overlay.style.display = "block";
    } else {
      overlay.style.display = "none";
    }

  });

}

if (overlay) {

  overlay.addEventListener("click", () => {

    sidebar.classList.remove("open");
    overlay.style.display = "none";

  });

}


// ==========================================
// WHATSAPP BUSINESS
// ==========================================

function openWhatsApp(message = "") {

  let defaultMessage =
    message ||
    "Hello Orven Jewels, I would like to know more about your jewellery collection.";

  const url =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;

  window.open(url, "_blank");

}


// ==========================================
// SHARE STORE
// ==========================================

function shareStore() {

  const storeUrl = window.location.href;

  if (navigator.share) {

    navigator.share({
      title: "Orven Jewels",
      text: "Explore the premium jewellery collection from Orven Jewels.",
      url: storeUrl
    });

  } else {

    navigator.clipboard.writeText(storeUrl);

    alert("Orven Jewels store link copied!");

  }

}


// ==========================================
// ADD PRODUCT MODAL
// ==========================================

const productModal = document.getElementById("productModal");

function openAddProduct() {

  productModal.classList.add("show");

}

function closeAddProduct() {

  productModal.classList.remove("show");

}


// Close modal by clicking outside
productModal.addEventListener("click", function(e) {

  if (e.target === productModal) {
    closeAddProduct();
  }

});


// ==========================================
// PRODUCT FORM
// ==========================================

const productForm = document.getElementById("productForm");

productForm.addEventListener("submit", function(e) {

  e.preventDefault();

  const productName =
    document.getElementById("newProductName").value;

  alert(
    `"${productName}" has been added to Orven Jewels catalogue.`
  );

  productForm.reset();

  closeAddProduct();

});


// ==========================================
// SALES PERIOD SWITCH
// ==========================================

const periodButtons = document.querySelectorAll(".period");
const bars = document.querySelectorAll(".bar");

const chartData = {

  7: [45, 65, 52, 78, 60, 90, 72],

  30: [38, 52, 46, 67, 55, 74, 82],

  90: [30, 48, 42, 70, 61, 88, 94],

  365: [25, 40, 55, 48, 72, 83, 97]

};

periodButtons.forEach(button => {

  button.addEventListener("click", function() {

    periodButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    this.classList.add("active");

    const period = this.dataset.period;

    const data = chartData[period];

    bars.forEach((bar, index) => {

      bar.style.height = data[index] + "%";

    });

    const revenueElement =
      document.getElementById("revenue");

    const revenues = {
      7: "₹1,18,450",
      30: "₹4,82,750",
      90: "₹13,74,850",
      365: "₹48,25,600"
    };

    revenueElement.textContent =
      revenues[period];

  });

});


// ==========================================
// PRODUCT SEARCH
// ==========================================

const productSearch =
  document.getElementById("productSearch");

if (productSearch) {

  productSearch.addEventListener("input", function() {

    const searchValue =
      this.value.toLowerCase();

    const rows =
      document.querySelectorAll("#productTable tbody tr");

    rows.forEach(row => {

      const text =
        row.textContent.toLowerCase();

      if (text.includes(searchValue)) {

        row.style.display = "";

      } else {

        row.style.display = "none";

      }

    });

  });

}


// ==========================================
// MOBILE NAVIGATION
// ==========================================

mobileItems.forEach((item, index) => {

  item.addEventListener("click", function() {

    mobileItems.forEach(btn => {
      btn.classList.remove("active");
    });

    this.classList.add("active");

    const pages = [
      "dashboard",
      "products",
      "orders",
      "customers",
      "settings"
    ];

    showPage(pages[index]);

  });

});


// ==========================================
// KEYBOARD SHORTCUT
// ==========================================

document.addEventListener("keydown", function(e) {

  // Escape closes modal
  if (e.key === "Escape") {
    closeAddProduct();
  }

});


// ==========================================
// DEMO NOTIFICATION
// ==========================================

setTimeout(() => {

  console.log(
    "✨ Orven Jewels Owner Portal loaded successfully."
  );

  console.log(
    "📱 WhatsApp Business:",
    whatsappNumber
  );

}, 500);
