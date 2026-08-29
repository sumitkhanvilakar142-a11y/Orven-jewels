const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// Helper function to read/write JSON database
const readDB = () => {
  if (!fs.existsSync('db.json')) {
    fs.writeFileSync('db.json', JSON.stringify({ products: [], users: [], admin: { username: "admin", password: "password123" } }));
  }
  return JSON.parse(fs.readFileSync('db.json', 'utf8'));
};

const writeDB = (data) => {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
};

// Get all products
app.get('/api/products', (req, res) => {
  const db = readDB();
  res.json(db.products || []);
});

// Add Product (Admin only)
app.post('/api/products', (req, res) => {
  const db = readDB();
  const newProduct = { id: Date.now(), ...req.body };
  db.products.push(newProduct);
  writeDB(db);
  res.json({ status: 'success', product: newProduct });
});

// Delete Product (Admin only)
app.delete('/api/product/:id', (req, res) => {
  const db = readDB();
  const id = Number(req.params.id);
  db.products = db.products.filter(p => p.id !== id);
  writeDB(db);
  res.json({ status: 'success', message: 'Product deleted' });
});

// Customer Signup
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

// Customer Login
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});