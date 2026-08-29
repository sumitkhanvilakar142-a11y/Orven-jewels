const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve static frontend files (jaise index.html)
app.use(express.static(path.join(__dirname)));

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

let products = [];

// Live Market Rates API
app.get('/api/live-rates', (req, res) => {
  res.json({
    success: true,
    goldPricePerGram24K: 7200.00,
    silverPricePerGramFine: 90.00
  });
});

// Get all saved products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Save a new product with images and CAD files
app.post('/api/product', upload.fields([
  { name: 'gallery', maxCount: 10 },
  { name: 'cadFiles', maxCount: 10 }
]), (req, res) => {
  try {
    const data = JSON.parse(req.body.data || '{}');
    
    const galleryFiles = req.files['gallery'] ? req.files['gallery'].map(file => file.filename) : [];
    const cadFiles = req.files['cadFiles'] ? req.files['cadFiles'].map(file => file.filename) : [];

    const newProduct = {
      id: Date.now(),
      ...data,
      gallery: galleryFiles,
      cadFiles: cadFiles,
      createdAt: new Date().toISOString()
    };

    products.push(newProduct);
    res.json({ status: 'success', product: newProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// Delete a product
app.delete('/api/product/:id', (req, res) => {
  const id = Number(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ status: 'success', message: 'Product deleted' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
