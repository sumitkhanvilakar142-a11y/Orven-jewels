/* =========================================
   ORVÉN JEWELS — COMPLETE JAVASCRIPT
========================================= */


/* =========================================
   MOBILE MENU
========================================= */

const menuBtn = document.getElementById("menuBtn");
const mobileNav = document.getElementById("mobileNav");

if (menuBtn && mobileNav) {

  menuBtn.addEventListener("click", () => {

    mobileNav.classList.toggle("show");

    menuBtn.textContent =
      mobileNav.classList.contains("show")
        ? "×"
        : "☰";

  });


  document
    .querySelectorAll(".mobile-nav a")
    .forEach(link => {

      link.addEventListener("click", () => {

        mobileNav.classList.remove("show");

        menuBtn.textContent = "☰";

      });

    });

}


/* =========================================
   QUIZ MODAL
========================================= */

const quizModal =
  document.getElementById("quizModal");

const quizBtn =
  document.getElementById("quizBtn");

const closeModal =
  document.getElementById("closeModal");

const startQuiz =
  document.getElementById("startQuiz");


if (quizBtn && quizModal) {

  quizBtn.addEventListener("click", () => {

    quizModal.classList.add("show");

  });

}


if (closeModal && quizModal) {

  closeModal.addEventListener("click", () => {

    quizModal.classList.remove("show");

  });

}


if (startQuiz && quizModal) {

  startQuiz.addEventListener("click", () => {

    alert("Quiz feature coming soon!");

    quizModal.classList.remove("show");

  });

}


if (quizModal) {

  quizModal.addEventListener("click", event => {

    if (event.target === quizModal) {

      quizModal.classList.remove("show");

    }

  });

}


/* =========================================
   METAL SELECTOR
========================================= */

document
  .querySelectorAll(".metal")
  .forEach(metal => {

    metal.addEventListener("click", () => {

      document
        .querySelectorAll(".metal")
        .forEach(item => {

          item.style.outline = "none";

        });


      metal.style.outline =
        "2px solid #f0d3a2";

      metal.style.outlineOffset =
        "4px";

    });

  });


/* =========================================
   DISABLE EMPTY LINKS
========================================= */

document
  .querySelectorAll('a[href="#"]')
  .forEach(link => {

    link.addEventListener("click", event => {

      event.preventDefault();

    });

  });


/* =========================================
   ORVÉN PRODUCT SYSTEM
========================================= */

const ORVEN_OWNER =
  "sumitkhanvilakar142-a11y";

const ORVEN_REPO =
  "Orven-jewels";

const ORVEN_BRANCH =
  "main";


/* =========================================
   COLLECTION NAMES
========================================= */

const collectionNames = {

  "Cocktail-Ring":
    "Cocktail Rings",

  "Diamond-Studs-for-Girls":
    "Diamond Studs",

  "Light-Weight-Earrings":
    "Lightweight Earrings",

  "Light-Weight-Ring":
    "Lightweight Rings",

  "Mens-Ring":
    "Men's Rings",

  "Mens-diamonds-ring":
    "Men's Diamond Rings",

  "Teeth-Grillz":
    "Teeth Grillz",

  "bracelet":
    "Bracelets",

  "fancy-shape-band-ring":
    "Fancy Shape Rings",

  "mangalsutra":
    "Mangalsutra",

  "necklaces":
    "Necklaces",

  "nosepin":
    "Nose Pins",

  "rings":
    "Rings",

  "solitaire-diamond-ring":
    "Solitaire Diamond Rings",

  "solitaire-rings":
    "Solitaire Rings",

  "tennis-bracelet":
    "Tennis Bracelets"

};


/* =========================================
   GET ELEMENTS
========================================= */

const productsContainer =
  document.getElementById(
    "products-container"
  );

const productTitle =
  document.getElementById(
    "product-grid-title"
  );

const productDescription =
  document.getElementById(
    "product-grid-description"
  );

const productCount =
  document.getElementById(
    "product-count"
  );


/* =========================================
   COLLECTION NAME
========================================= */

function getCollectionName(folder) {

  return (
    collectionNames[folder] ||
    folder
  );

}


/* =========================================
   CREATE PRODUCT CARD
========================================= */

function createProductCard(
  imageUrl,
  folder,
  index
) {

  const collectionName =
    getCollectionName(folder);


  const card =
    document.createElement(
      "article"
    );

  card.className =
    "product-card";


  card.innerHTML = `

    <div class="product-card-image">

      <img
        src="${imageUrl}"
        alt="${collectionName} ${index + 1}"
        loading="lazy"
      >

      <span class="product-view">
        VIEW
      </span>

    </div>


    <div class="product-card-info">

      <div class="product-card-category">
        ${collectionName}
      </div>


      <h3 class="product-card-name">
        ${collectionName}
        ${String(index + 1).padStart(2, "0")}
      </h3>


      <div class="product-card-price">
        Price on request
      </div>


      <a
        class="product-inquiry"
        href="#"
      >
        WhatsApp Inquiry →
      </a>

    </div>

  `;


  /* =========================================
     IMAGE CLICK
  ========================================= */

  const image =
    card.querySelector(
      ".product-card-image img"
    );


  if (image) {

    image.addEventListener(
      "click",
      () => {

        window.open(
          imageUrl,
          "_blank"
        );

      }
    );

  }


  /* =========================================
     WHATSAPP
  ========================================= */

  const whatsapp =
    card.querySelector(
      ".product-inquiry"
    );


  if (whatsapp) {

    const message =
      "Hello Orvén Jewels, " +
      "I am interested in " +
      collectionName +
      " product #" +
      (index + 1) +
      ". Please share details.";


    whatsapp.href =
      "https://wa.me/?text=" +
      encodeURIComponent(
        message
      );


    whatsapp.target =
      "_blank";


    whatsapp.rel =
      "noopener";

  }


  return card;

}


/* =========================================
   LOAD PRODUCTS FROM GITHUB
========================================= */

async function loadProducts(
  folder
) {

  if (!productsContainer) {

    return;

  }


  /* LOADING */

  productsContainer.innerHTML = `

    <div class="products-loading">

      LOADING PRODUCTS...

    </div>

  `;


  const collectionName =
    getCollectionName(folder);


  /* TITLE */

  if (productTitle) {

    productTitle.textContent =
      collectionName;

  }


  /* DESCRIPTION */

  if (productDescription) {

    productDescription.textContent =
      "Explore our " +
      collectionName.toLowerCase() +
      " collection.";

  }


  try {

    /*
      jsDelivr repository file list.
      This avoids GitHub API rate limits.
    */

    const apiUrl =
      "https://data.jsdelivr.com/v1/package/gh/" +
      ORVEN_OWNER +
      "/" +
      ORVEN_REPO +
      "@" +
      ORVEN_BRANCH +
      "/flat";


    const response =
      await fetch(apiUrl);


    if (!response.ok) {

      throw new Error(
        "Unable to load repository files"
      );

    }


    const data =
      await response.json();


    const files =
      Array.isArray(data.files)
        ? data.files
        : [];


    /* IMAGE EXTENSIONS */

    const imageExtensions =
      /\.(jpg|jpeg|png|webp|avif)$/i;


    /* FIND CATEGORY IMAGES */

    const images =
      files
        .map(file => file.name || "")
        .filter(path => {

          return (

            path.includes(
              "/" + folder + "/"
            )

            &&

            imageExtensions.test(
              path
            )

          );

        });


    /* CLEAR */

    productsContainer.innerHTML =
      "";


    /* NO PRODUCTS */

    if (!images.length) {

      productsContainer.innerHTML = `

        <div class="products-loading">

          NO PRODUCTS FOUND IN THIS COLLECTION.

        </div>

      `;


      if (productCount) {

        productCount.textContent =
          "";

      }


      return;

    }


    /* COUNT */

    if (productCount) {

      productCount.textContent =
        images.length +
        " PRODUCTS";

    }


    /* CREATE PRODUCTS */

    images.forEach(
      (path, index) => {

        const cleanPath =
          path.replace(
            /^\/+/,
            ""
          );


        const imageUrl =
          "https://cdn.jsdelivr.net/gh/" +
          ORVEN_OWNER +
          "/" +
          ORVEN_REPO +
          "@" +
          ORVEN_BRANCH +
          "/" +
          cleanPath;


        const card =
          createProductCard(
            imageUrl,
            folder,
            index
          );


        productsContainer.appendChild(
          card
        );

      }
    );


  }

  catch (error) {

    console.error(
      "Orven product error:",
      error
    );


    productsContainer.innerHTML = `

      <div class="products-loading">

        PRODUCTS COULD NOT BE LOADED.
        PLEASE REFRESH THE PAGE.

      </div>

    `;


    if (productCount) {

      productCount.textContent =
        "";

    }

  }

}


/* =========================================
   COLLECTION CARD → PRODUCT GRID
========================================= */

document
  .querySelectorAll(
    ".image-collection-card"
  )
  .forEach(card => {

    card.addEventListener(
      "click",
      event => {

        event.preventDefault();


        const folder =
          card.dataset.folder;


        if (!folder) {

          return;

        }


        /* LOAD PRODUCTS */

        loadProducts(
          folder
        );


        /* REMOVE ACTIVE FROM TABS */

        document
          .querySelectorAll(
            ".product-category-tab"
          )
          .forEach(button => {

            button.classList.toggle(
              "active",
              button.dataset.folder ===
              folder
            );

          });


        /* SCROLL */

        const productGrid =
          document.getElementById(
            "product-grid"
          );


        if (productGrid) {

          productGrid.scrollIntoView({

            behavior:
              "smooth",

            block:
              "start"

          });

        }

      }

    );

  });


/* =========================================
   CATEGORY TABS
========================================= */

document
  .querySelectorAll(
    ".product-category-tab"
  )
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const folder =
          button.dataset.folder;


        if (!folder) {

          return;

        }


        /* ACTIVE TAB */

        document
          .querySelectorAll(
            ".product-category-tab"
          )
          .forEach(item => {

            item.classList.remove(
              "active"
            );

          });


        button.classList.add(
          "active"
        );


        /* LOAD */

        loadProducts(
          folder
        );

      }

    );

  });


/* =========================================
   DEFAULT COLLECTION
========================================= */

if (productsContainer) {

  loadProducts(
    "rings"
  );

}
