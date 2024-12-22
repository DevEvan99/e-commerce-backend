const User = require("../models/User");

// @desc Add item to favorites
// @route POST /api/favorites/add
// @access Public
const addToFavorites = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favorites.includes(productId)) {
      user.favorites.push(productId);
      await user.save();
    }

    res.status(200).json({ message: "Product added to favorites", favorites: user.favorites });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete a item to favorites
// @route GET /api/favorites/remove/:id
// @access Public
const removeFromFavorites = async (req, res) => {
    const { userId, productId } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.favorites = user.favorites.filter((id) => id.toString() !== productId);
      await user.save();
  
      res.status(200).json({ message: "Product removed from favorites", favorites: user.favorites });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

// @desc Update favorites
// @route PUT /api/products/update/:id
// @access Public
const updateFavorites = async (req, res) => {
    try {
      const userId = req.user.id;
      console.log(userId);
      const { productIds } = req.body;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.favorites = productIds;
      await user.save();
  
      res.status(200).json({ message: "Favorites updated successfully", favorites: user.favorites });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
};

  module.exports = {
    addToFavorites,
    removeFromFavorites,
    updateFavorites
  }