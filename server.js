const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

const readDB = () => {
  if (!fs.existsSync('db.json')) {
    const initialData = {
      products: [
        {
          id: 249,
          sku: "ORV 249",
          category: "RINGS",
          goldWeight: 4.5,
          silverWeight: 0.0,
          stoneSlots: [{ pieces: 60, cent: 1.7 }],
          fancySlots: [{ type: "Gem Stone", pieces: 1, cent: 209 }],
          image: "vault-ring.jpg",
          lastUpdatedBy: "nayan (staff)"
        }
      ],
      categories: [
        { name: "RINGS", count: 244 },
        { name: "EARINGS", count: 102 },
        { name: "PENDANTS", count: 57 },
        { name: "BRACLETS", count: 20 },
        { name: "MANGALSUTRA", count: 4 },
        { name: "GENTS RING", count: 14 },
        { name: "ORVEN JEWELS", count: 31 },
        { name: "ETERNITY BAND", count: 7 },
        { name: "NECKLACE", count: 15 }
      ],
      diamondTypes: ["CVD - default", "CV - VVS"],
      users: [],
      admin: { username: "admin", password: "password123" }
    };
    fs.writeFileSync('db.json', JSON.stringify(initialData, null, 2));
  }
  return JSON.parse(fs.readFileSync('db.json', 'utf8'));
};

const writeDB = (data) => {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
};

// Get Dashboard Stats & Categories
app.get('/api/admin/dashboard', (req, res) => {
  const db = readDB();
  const totalDesigns = db.products.length;
  const totalCategories = db.categories.length;
  const totalDiamondTypes = db.diamondTypes.length;

  res.json({
    totalDesigns,
    totalCategories,
    totalDiamondTypes,
    categories: db.categories,
    diamondTypes: db.diamondTypes
  });
});

// Get Products by Category
app.get('/api/products/:category', (req, res) => {
  const db = readDB();
  const cat = req.params.category.toUpperCase();
  const filtered = db.products.filter(p => p.category.toUpperCase() === cat);
  res.json(filtered);
});

// Get all products
app.get('/api/products', (req, res) => {
  const db = readDB();
  res.json(db.products || []);
});

// Add or Update Design (SKU)
app.post('/api/products', (req, res) => {
  const db = readDB();
  const { sku, category, goldWeight, silverWeight, stoneSlots, fancySlots, image, updatedBy } = req.body;
  
  const existingIndex = db.products.findIndex(p => p.sku === sku);
  const productData = {
    id: existingIndex >= 0 ? db.products[existingIndex].id : Date.now(),
    sku,
    category: category || "RINGS",
    goldWeight: Number(goldWeight) || 0,
    silverWeight: Number(silverWeight) || 0,
    stoneSlots: stoneSlots || [],
    fancySlots: fancySlots || [],
    image: image || "vault-ring.jpg",
    lastUpdatedBy: updatedBy || "nayan (staff)"
  };

  if (existingIndex >= 0) {
    db.products[existingIndex] = productData;
  } else {
    db.products.push(productData);
  }

  writeDB(db);
  res.json({ status: 'success', product: productData });
});

// Delete Product
app.delete('/api/product/:id', (req, res) => {
  const db = readDB();
  const id = Number(req.params.id);
  db.products = db.products.filter(p => p.id !== id);
  writeDB(db);
  res.json({ status: 'success', message: 'Product deleted' });
});

// User Signup
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  if (!db.users) db.users = [];

  const existingUser = db.users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ status: 'error', message: 'User already exists!' });
  }

  db.users.push({ email, password });
  writeDB(db);
  res.json({ status: 'success', message: 'Signup successful!' });
});

// User Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = (db.users || []).find(u => u.email === email && u.password === password);

  if (user) {
    res.json({ status: 'success', message: 'Login successful' });
  } else {
    res.status(401).json({ status: 'error', message: 'Invalid email or password' });
  }
});

// Admin Login
app.post('/api/admin-login', (req, res) => {
  const { username, password } = req.body;
  const db = readDB();
  const admin = db.admin || { username: "admin", password: "password123" };

  if (username === admin.username && password === admin.password) {
    res.json({ status: 'success', message: 'Admin login successful' });
  } else {
    res.status(401).json({ status: 'error', message: 'Invalid Admin Credentials' });
  }
});

// Live Rates API
app.get('/api/live-rates', (req, res) => {
  res.json({
    success: true,
    goldPricePerGram24K: 7200.00,
    silverPricePerGramFine: 90.00
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});