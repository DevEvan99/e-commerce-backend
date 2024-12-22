const User = require("../models/User");

const addToFavorites = async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Add product to favorites if not already present
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


const removeFromFavorites = async (req, res) => {
    const { userId, productId } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Remove the product from favorites
      user.favorites = user.favorites.filter((id) => id.toString() !== productId);
      await user.save();
  
      res.status(200).json({ message: "Product removed from favorites", favorites: user.favorites });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  };

  const updateFavorites = async (req, res) => {
    try {
      const userId = req.user.id; // Extracted from the token in the middleware
      console.log(userId);
      const { productIds } = req.body;
  
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Update the user's favorites
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