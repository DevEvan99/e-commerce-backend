require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const validateEnv = require('./utils/validateEnv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const productRoutes = require('./routes/productRoutes');

// Validate environment variables
validateEnv();

// Initialize express
const app = express();

// Connect to MongoDB
connectDB();
console.log("MONGO_URI:", process.env.MONGO_URI);

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Routes
app.use('/api/products', productRoutes);

// Error handling
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});