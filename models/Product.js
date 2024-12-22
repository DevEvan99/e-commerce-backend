const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    images: [{ type: String }], // Store image paths instead of base64
    thumbnail: { type: String }, // Store thumbnail path
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;