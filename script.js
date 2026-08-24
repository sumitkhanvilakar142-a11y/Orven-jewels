/* =========================================================
   ORVÉN JEWELS — OWNER PORTAL JS
========================================================= */


/* =========================================================
   PAGE NAVIGATION
========================================================= */

const navItems = document.querySelectorAll(".nav-item");
const mobileNavItems = document.querySelectorAll(".mobile-nav-item");

const pages = document.querySelectorAll(".page");

const pageTitle = document.getElementById("pageTitle");
const breadcrumbPage = document.getElementById("breadcrumbPage");


const pageNames = {
  dashboard: "Dashboard",
  products: "Products",
  orders: "Orders",
  customers: "Customers",
  analytics: "Sales & Analytics",
  marketing: "Marketing",
  inventory: "Jewellery Inventory",
  invoices: "Invoices",
  store: "Store",
  settings: "Settings"
};


function showPage(pageId) {

  pages.forEach(page => {
    page.classList.remove("active-page");
  });

  const selectedPage = document.getElementById(pageId);

  if (selectedPage) {
    selectedPage.classList.add("active-page");
  }


  /* Sidebar */

  navItems.forEach(item => {

    item.classList.toggle(
      "active",
      item.dataset.page === pageId
    );

  });


  /* Mobile navigation */

  mobileNavItems.forEach(item => {

    if (item.dataset.page) {

      item.classList.toggle(
        "active",
        item.dataset.page === pageId
      );

    }

  });


  /* Header */

  pageTitle.textContent =
    pageNames[pageId] || "Dashboard";

  breadcrumbPage.textContent =
    pageNames[pageId] || "Dashboard";


  /* Scroll top */

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  /* Close mobile sidebar */

  closeMobileSidebar();
}


/* Desktop navigation */

navItems.forEach(item => {

  item.addEventListener("click", () => {

    const page = item.dataset.page;

    if (page) {
      showPage(page);
    }

  });

});


/* Mobile navigation */

mobileNavItems.forEach(item => {

  item.addEventListener("click", () => {

    const page = item.dataset.page;

    if (page) {
      showPage(page);
    }

  });

});


/* Global helper */

window.showPage = showPage;


/* =========================================================
   MOBILE SIDEBAR
========================================================= */

const sidebar = document.getElementById("sidebar");
const mobileMenu = document.getElementById("mobileMenu");
const closeSidebar = document.getElementById("closeSidebar");
const mobileOverlay = document.getElementById("mobileOverlay");
const mobileMore = document.getElementById("mobileMore");


function openMobileSidebar() {

  sidebar.classList.add("open");
  mobileOverlay.classList.add("active");

}


function closeMobileSidebar() {

  sidebar.classList.remove("open");
  mobileOverlay.classList.remove("active");

}


mobileMenu.addEventListener("click", openMobileSidebar);

closeSidebar.addEventListener("click", closeMobileSidebar);

mobileOverlay.addEventListener("click", closeMobileSidebar);


/* More button */

mobileMore.addEventListener("click", openMobileSidebar);


/* =========================================================
   PRODUCT MODAL
========================================================= */

const productModal =
  document.getElementById("productModal");


function openProductModal() {

  productModal.classList.add("active");

  document.body.style.overflow = "hidden";

}


function closeProductModal() {

  productModal.classList.remove("active");

  document.body.style.overflow = "";

}


window.openProductModal = openProductModal;
window.closeProductModal = closeProductModal;


/* Close modal on background click */

productModal.addEventListener("click", function(event) {

  if (event.target === productModal) {
    closeProductModal();
  }

});


/* Escape key */

document.addEventListener("keydown", function(event) {

  if (event.key === "Escape") {

    closeProductModal();

    closeMobileSidebar();

  }

});


/* =========================================================
   PRODUCT SEARCH
========================================================= */

const productSearch =
  document.getElementById("productSearch");


if (productSearch) {

  productSearch.addEventListener("input", function() {

    const query =
      this.value.toLowerCase().trim();

    const productRows =
      document.querySelectorAll(".product-list-row");


    productRows.forEach(row => {

      const text =
        row.textContent.toLowerCase();

      row.style.display =
        text.includes(query)
          ? "grid"
          : "none";

    });

  });

}


/* =========================================================
   SALES CHART RANGE
========================================================= */

const rangeButtons =
  document.querySelectorAll(".range-btn");

const chartRevenue =
  document.getElementById("chartRevenue");


const chartData = {

  7: {
    revenue: "₹1,18,450",
    path: "M0 220 C80 200,100 150,170 175 S260 110,330 140 S420 80,490 115 S590 65,650 90 S740 35,800 50"
  },

  30: {
    revenue: "₹4,82,750",
    path: "M0 230 C80 210,100 170,170 190 S260 130,330 150 S420 90,490 130 S590 70,650 100 S740 40,800 60"
  },

  90: {
    revenue: "₹12,84,200",
    path: "M0 220 C90 190,110 160,190 175 S280 90,350 120 S450 140,520 85 S620 100,700 55 S760 70,800 35"
  },

  365: {
    revenue: "₹48,92,600",
    path: "M0 200 C80 190,120 160,180 180 S280 100,350 145 S430 85,500 115 S590 80,660 105 S740 50,800 25"
  }

};


rangeButtons.forEach(button => {

  button.addEventListener("click", function() {

    rangeButtons.forEach(btn => {
      btn.classList.remove("active");
    });

    this.classList.add("active");

    const range =
      this.dataset.range;

    const data =
      chartData[range];

    if (!data) return;


    chartRevenue.textContent =
      data.revenue;


    const line =
      document.getElementById("chartLine");

    const area =
      document.getElementById("chartArea");


    if (line) {

      line.setAttribute(
        "d",
        data.path
      );

    }


    if (area) {

      area.setAttribute(
        "d",
        `${data.path} L800 280 L0 280 Z`
      );

    }

  });

});


/* =========================================================
   PRODUCT PRICE CALCULATOR
========================================================= */

const costPrice =
  document.getElementById("costPrice");

const makingCharges =
  document.getElementById("makingCharges");

const stoneCharges =
  document.getElementById("stoneCharges");

const gst =
  document.getElementById("gst");

const sellingPrice =
  document.getElementById("sellingPrice");

const totalCost =
  document.getElementById("totalCost");

const profit =
  document.getElementById("profit");

const profitMargin =
  document.getElementById("profitMargin");


function calculateProductPrice() {

  if (!costPrice) return;


  const cost =
    Number(costPrice.value) || 0;

  const making =
    Number(makingCharges.value) || 0;

  const stone =
    Number(stoneCharges.value) || 0;

  const gstRate =
    Number(gst.value) || 0;

  const selling =
    Number(sellingPrice.value) || 0;


  const baseCost =
    cost + making + stone;

  const gstAmount =
    baseCost * (gstRate / 100);

  const finalCost =
    baseCost + gstAmount;

  const calculatedProfit =
    selling - finalCost;

  const margin =
    selling > 0
      ? (calculatedProfit / selling) * 100
      : 0;


  totalCost.textContent =
    formatCurrency(finalCost);

  profit.textContent =
    formatCurrency(calculatedProfit);

  profitMargin.textContent =
    `${margin.toFixed(1)}%`;

}


[
  costPrice,
  makingCharges,
  stoneCharges,
  gst,
  sellingPrice
].forEach(input => {

  if (input) {

    input.addEventListener(
      "input",
      calculateProductPrice
    );

  }

});


/* =========================================================
   CURRENCY
========================================================= */

function formatCurrency(value) {

  return new Intl.NumberFormat(
    "en-IN",
    {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0
    }
  ).format(value);

}


/* =========================================================
   PRODUCT FORM
========================================================= */

const productForm =
  document.getElementById("productForm");


if (productForm) {

  productForm.addEventListener(
    "submit",
    function(event) {

      event.preventDefault();


      const productName =
        document.getElementById("newProductName").value;


      closeProductModal();


      showToast(
        `${productName || "Jewellery"} added successfully.`
      );


      productForm.reset();

      calculateProductPrice();

    }
  );

}


/* =========================================================
   TOAST
========================================================= */

const toast =
  document.getElementById("toast");

const toastMessage =
  document.getElementById("toastMessage");

let toastTimer;


function showToast(message) {

  toastMessage.textContent =
    message;

  toast.classList.add("show");


  clearTimeout(toastTimer);


  toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 3000);

}


window.showToast = showToast;


/* =========================================================
   STORE LINK COPY
========================================================= */

function copyStoreLink() {

  const link =
    "https://orvenjewels.com/store";


  if (
    navigator.clipboard &&
    navigator.clipboard.writeText
  ) {

    navigator.clipboard
      .writeText(link)
      .then(() => {

        showToast(
          "Store link copied successfully."
        );

      })
      .catch(() => {

        showToast(
          "Store link ready to copy."
        );

      });

  } else {

    showToast(
      "Store link ready to copy."
    );

  }

}


window.copyStoreLink = copyStoreLink;


/* =========================================================
   SETTINGS TABS
========================================================= */

const settingsTabs =
  document.querySelectorAll(".settings-tab");


settingsTabs.forEach(tab => {

  tab.addEventListener("click", function() {

    settingsTabs.forEach(item => {
      item.classList.remove("active");
    });

    this.classList.add("active");

    showToast(
      `${this.textContent.trim()} settings selected.`
    );

  });

});


/* =========================================================
   SAVE SETTINGS
========================================================= */

document.querySelectorAll(
  ".settings-panel .btn-gold"
).forEach(button => {

  button.addEventListener("click", function() {

    showToast(
      "ORVÉN JEWELS profile updated successfully."
    );

  });

});


/* =========================================================
   GENERIC BUTTON FEEDBACK
========================================================= */

document.querySelectorAll(
  ".btn-outline, .btn-light"
).forEach(button => {

  const text =
    button.textContent.trim();

  if (
    text &&
    !button.closest(".modal-footer") &&
    !button.closest(".welcome-actions")
  ) {

    button.addEventListener("click", function() {

      if (
        this.getAttribute("onclick") ||
        this.closest("form")
      ) {
        return;
      }

      showToast(
        `${text} selected.`
      );

    });

  }

});


/* =========================================================
   TABLE VIEW BUTTONS
========================================================= */

document.querySelectorAll(
  ".btn-small"
).forEach(button => {

  button.addEventListener("click", function() {

    showToast(
      "Opening customer/order details..."
    );

  });

});


/* =========================================================
   IMAGE UPLOAD PREVIEW
========================================================= */

document.querySelectorAll(
  ".upload-box input[type='file']"
).forEach(input => {

  input.addEventListener("change", function() {

    if (!this.files || !this.files[0]) {
      return;
    }


    const file =
      this.files[0];


    const label =
      this.closest(".upload-box");


    const span =
      label.querySelector("span");


    if (span) {

      span.textContent =
        file.name.length > 18
          ? file.name.substring(0, 18) + "..."
          : file.name;

    }


    label.style.borderColor =
      "#c9a45c";

    label.style.background =
      "#fbf6eb";

  });

});


/* =========================================================
   INITIALIZE
========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {

    calculateProductPrice();

    showPage("dashboard");

  }
);
