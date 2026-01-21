const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set security headers
app.use(helmet());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Basic route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to FoodReels API' });
});

// User routes
app.use('/api/users', require('./routes/userRoutes'));

// Restaurant routes
app.use('/api/restaurants', require('./routes/restaurantRoutes'));

// Menu routes
app.use('/api/menus', require('./routes/menuRoutes'));

// Menu Item routes
app.use('/api/menu-items', require('./routes/menuItemRoutes'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});
