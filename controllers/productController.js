const Product = require("../models/Product");
const mongoose = require("mongoose");


// @desc Get all products
// @route GET /api/products
// @access Public
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Get single product by ID
// @route GET /api/products/:id
// @access Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Create a product with image upload
// @route POST /api/products
// @access Public
const createProduct = async (req, res) => {
  try {
    const { sku, name, description, price, quantity } = req.body;
    
    console.log('Request body:', req.body);
    console.log('Request files:', req.files);
    // Check if files were uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "Please upload at least one image" });
    }

    // Get image paths
    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

    const product = new Product({
      sku,
      name,
      description,
      price: Number(price),
      quantity: Number(quantity),
      images: imagePaths,
      thumbnail: imagePaths[0] // Set first image as thumbnail
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update a product with image upload
// @route PUT /api/products/:id
// @access Public
const updateProduct = async (req, res) => {
    try {
      const { sku, name, description, price, quantity, thumbnail } = req.body;
  
      const product = await Product.findById(req.params.id);
  
      if (product) {
        const imagePaths = req.files ? req.files.map((file) => file.path) : []; // New uploaded files
        console.log("Uploaded Files:", req.files);

        product.sku = sku || product.sku;
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.quantity = quantity || product.quantity;
        product.images = imagePaths.length > 0 ? imagePaths : product.images; // Replace images if new ones are provided
        product.thumbnail = thumbnail || product.thumbnail; // Update thumbnail
  
        const updatedProduct = await product.save();
        res.json(updatedProduct);
      } else {
        res.status(404).json({ message: "Product not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Public
const deleteProduct = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const result = await Product.findByIdAndDelete(req.params.id);

    if (result) {
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ message: "Server Error" });
  }
};


module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
