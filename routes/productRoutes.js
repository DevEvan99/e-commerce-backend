const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');
const { protect } = require("../middleware/authMiddleware");
const asyncHandler = require('../middleware/asyncHandler');

router.route('/')
  .get(asyncHandler(getProducts))
  .post(upload.array('images', 5), asyncHandler(createProduct));

router.route('/:id')
  .get(asyncHandler(getProductById))
  .put(upload.array('images', 5), asyncHandler(updateProduct))
  .delete(asyncHandler(deleteProduct));

router.get("/", protect, getProducts);

module.exports = router;