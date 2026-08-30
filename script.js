const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");

menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});

document.querySelectorAll(".nav a").forEach(link => {
  link.addEventListener("click", () => nav.classList.remove("open"));
});

// Replace this number with ORVÉN's real WhatsApp number in international format.
// Example for India: 919876543210 (no +, spaces or dashes).
const WHATSAPP_NUMBER = "91XXXXXXXXXX";

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

  const text =
`Hello ORVÉN JEWELS,

Name: ${name}
Phone: ${phone}
Interest: ${interest}
Message: ${message || "I'd like to know more."}`;

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
});
