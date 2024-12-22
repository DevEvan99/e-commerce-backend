const express = require("express");
const router = express.Router();
const { addToFavorites, removeFromFavorites, updateFavorites } = require("../controllers/favoriteController");
const { protect } = require("../middleware/authMiddleware");

router.post("/add", addToFavorites);
router.post("/remove", removeFromFavorites);
router.post("/update", protect, updateFavorites);

module.exports = router;
