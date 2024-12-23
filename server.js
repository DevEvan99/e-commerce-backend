require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const validateEnv = require('./utils/validateEnv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require("./routes/authRoutes");
const favoriteRoutes =require("./routes/favoriteRoutes")
const limiter = require("./middleware/rateLimiter");

// Validate environment variables
validateEnv();

const app = express();

connectDB();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
app.use('/api/products', productRoutes);
app.use("/api/auth", limiter, authRoutes);
app.use("/api/favorites", favoriteRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});