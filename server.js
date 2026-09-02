const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// MongoDB Connection
const uri = "mongodb+srv://sumitkhanvilakar142_db_user:cBn06W4K0nh6YZqi@cluster0.swk1khb.mongodb.net/orvenjewels?appName=Cluster0";
const client = new MongoClient(uri);
let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('orvenjewels'); // Database ka naam
        console.log("MongoDB Connected Successfully!");
        
        // Agar pehli baar hai, toh default data daalna (Optional)
        const count = await db.collection('products').countDocuments();
        if (count === 0) {
            await db.collection('products').insertOne({
                id: 249,
                sku: "ORV 249",
                category: "RINGS",
                goldWeight: 4.5,
                silverWeight: 0,
                stoneSlots: [{ pieces: 60, cent: 1.7 }],
                fancySlots: [{ type: "Gem Stone", pieces: 1, cent: 209 }],
                image: "vault-ring.jpg",
                lastUpdatedBy: "nayan (staff)"
            });
        }
    } catch (err) {
        console.error("MongoDB connection error:", err);
    }
}
connectDB();

// Get Dashboard Stats & Categories
app.get('/api/admin/dashboard', async (req, res) => {
  const products = await db.collection('products').find({}).toArray();
  const categories = await db.collection('categories').find({}).toArray();
  const diamondTypes = await db.collection('diamondTypes').find({}).toArray();
  
  res.json({
    totalDesigns: products.length,
    totalCategories: categories.length,
    totalDiamondTypes: diamondTypes.length,
    categories: categories,
    diamondTypes: diamondTypes
  });
});

// Get Products by Category
app.get('/api/products/:category', async (req, res) => {
  const cat = req.params.category.toUpperCase();
  const filtered = await db.collection('products').find({ category: cat }).toArray();
  res.json(filtered);
});

// Get all products
app.get('/api/products', async (req, res) => {
  const products = await db.collection('products').find({}).toArray();
  res.json(products);
});

// Add or Update Design (SKU)
app.post('/api/products', async (req, res) => {
  const { sku, category, goldWeight, silverWeight, stoneSlots, fancySlots, image, updatedBy } = req.body;
  
  const productData = {
    id: Date.now(),
    sku,
    category: category || "RINGS",
    goldWeight: Number(goldWeight) || 0,
    silverWeight: Number(silverWeight) || 0,
    stoneSlots: stoneSlots || [],
    fancySlots: fancySlots || [],
    image: image || "vault-ring.jpg",
    lastUpdatedBy: updatedBy || "nayan (staff)"
  };

  // Check if SKU exists
  const existing = await db.collection('products').findOne({ sku: sku });
  if (existing) {
    await db.collection('products').updateOne({ sku: sku }, { $set: productData });
  } else {
    await db.collection('products').insertOne(productData);
  }
  
  res.json({ status: 'success', product: productData });
});

// Delete Product
app.delete('/api/product/:id', async (req, res) => {
  const id = Number(req.params.id);
  await db.collection('products').deleteOne({ id: id });
  res.json({ status: 'success', message: 'Product deleted' });
});

// User Signup
app.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  
  const existingUser = await db.collection('users').findOne({ email: email });
  if (existingUser) {
    return res.status(400).json({ status: 'error', message: 'User already exists!' });
  }

  await db.collection('users').insertOne({ email, password });
  res.json({ status: 'success', message: 'Signup successful!' });
});

// User Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await db.collection('users').findOne({ email: email, password: password });

  if (user) {
    res.json({ status: 'success', message: 'Login successful' });
  } else {
    res.status(401).json({ status: 'error', message: 'Invalid email or password' });
  }
});

// Admin Login
app.post('/api/admin-login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await db.collection('admin').findOne({ username: username, password: password });

  if (admin) {
    res.json({ status: 'success', message: 'Admin login successful' });
  } else {
    res.status(401).json({ status: 'error', message: 'Invalid Admin Credentials' });
  }
});

// Live Rates API (Abhi hardcoded, baad mein API se fetch karenge)
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
