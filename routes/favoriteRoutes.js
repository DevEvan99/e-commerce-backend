const express = require("express");
const router = express.Router();
const { addToFavorites, removeFromFavorites, updateFavorites, getFavorites } = require("../controllers/favoriteController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getFavorites);
router.post("/add", addToFavorites);
router.post("/remove", removeFromFavorites);
router.post("/update", protect, updateFavorites);

module.exports = router;
