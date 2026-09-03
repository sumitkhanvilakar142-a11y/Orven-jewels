const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));

// MongoDB Connection with updated password (Sumit1996)
const uri = process.env.MONGO_URI || "mongodb+srv://sumitkhanvilakar142_db_user:Sumit1996@cluster0.swk1khb.mongodb.net/orvenjewels?appName=Cluster0";
const client = new MongoClient(uri);
let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('orvenjewels');
        console.log("MongoDB Connected Successfully!");
        
        // Default product seed check
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

// Handle legacy/alternate customizer links
app.get('/customize.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'customizer.html'));
});

// Get Dashboard Stats & Categories
app.get('/api/admin/dashboard', async (req, res) => {
  try {
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
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Get Products by Category
app.get('/api/products/:category', async (req, res) => {
  try {
    const cat = req.params.category.toUpperCase();
    const filtered = await db.collection('products').find({ category: cat }).toArray();
    res.json(filtered);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await db.collection('products').find({}).toArray();
    res.json(products);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Add or Update Design (SKU)
app.post('/api/products', async (req, res) => {
  try {
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

    const existing = await db.collection('products').findOne({ sku: sku });
    if (existing) {
      await db.collection('products').updateOne({ sku: sku }, { $set: productData });
    } else {
      await db.collection('products').insertOne(productData);
    }
    
    res.json({ status: 'success', product: productData });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Delete Product
app.delete('/api/product/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    await db.collection('products').deleteOne({ id: id });
    res.json({ status: 'success', message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Save Customizer Design Request (New Feature for Bespoke Studio)
app.post('/api/custom-requests', async (req, res) => {
  try {
    const { metal, band, quality, stone, setting, sizeSystem, size, estimatedPrice } = req.body;
    
    const customOrder = {
      id: Date.now(),
      metal,
      band,
      quality,
      stone,
      setting,
      sizeSystem,
      size,
      estimatedPrice,
      createdAt: new Date()
    };

    await db.collection('customRequests').insertOne(customOrder);
    res.json({ status: 'success', message: 'Custom design request saved successfully!', orderId: customOrder.id });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// User Signup
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const existingUser = await db.collection('users').findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ status: 'error', message: 'User already exists!' });
    }

    await db.collection('users').insertOne({ email, password, createdAt: new Date() });
    res.json({ status: 'success', message: 'Signup successful!' });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// User Login
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.collection('users').findOne({ email: email, password: password });

    if (user) {
      res.json({ status: 'success', message: 'Login successful' });
    } else {
      res.status(401).json({ status: 'error', message: 'Invalid email or password' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Admin Login
app.post('/api/admin-login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await db.collection('admin').findOne({ username: username, password: password });

    if (admin) {
      res.json({ status: 'success', message: 'Admin login successful' });
    } else {
      res.status(401).json({ status: 'error', message: 'Invalid Admin Credentials' });
    }
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
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
  console.log(`Server running on port ${PORT}`);
});
