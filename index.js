import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import Product from './models/products.js';

// Load environment variables
config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Corrected middleware

// Define routes (example)
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Products routes 

// CREATE: Add a new product (POST)
app.post('/api/products', async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    const product = new Product({ name, category, price, description });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// READ: Get all products (GET)
app.get('/api/products', async (req, res) => {
  try {
    const { search, categories, minPrice, maxPrice, sortBy, sortOrder } = req.query;

    // Build the query object
    let query = {};

    // Search by name
    if (search) {
      query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    // Filter by categories
    if (categories) {
      const categoryArray = categories.split(','); // Expects categories as a comma-separated string
      query.category = { $in: categoryArray };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Set up sorting
    let sortOptions = {};
    if (sortBy) {
      const sortField = sortBy;
      const order = sortOrder === 'desc' ? -1 : 1;
      sortOptions[sortField] = order;
    }

    // Fetch filtered and sorted products
    const products = await Product.find(query).sort(sortOptions);

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// READ: Get a single product by ID (GET)
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// UPDATE: Update a product by ID (PUT)
app.put('/api/products/:id', async (req, res) => {
  try {
    const { name, category, price, description } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, category, price, description },
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE: Delete a product by ID (DELETE)
app.delete('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// READ: Get products by category (GET)
app.get('/api/products/category/:category', async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
