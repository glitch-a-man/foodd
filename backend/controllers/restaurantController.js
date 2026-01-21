const Restaurant = require('../models/Restaurant');

// @desc    Get all restaurants
// @route   GET /api/restaurants
// @access  Public
exports.getRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find().populate('menu');
        res.status(200).json({ success: true, count: restaurants.length, data: restaurants });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get single restaurant
// @route   GET /api/restaurants/:id
// @access  Public
exports.getRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id).populate('menu');
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
        res.status(200).json({ success: true, data: restaurant });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Create new restaurant
// @route   POST /api/restaurants
// @access  Admin (would be protected in real app)
exports.createRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.create(req.body);
        res.status(201).json({ success: true, data: restaurant });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Update restaurant
// @route   PUT /api/restaurants/:id
// @access  Admin
exports.updateRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
        res.status(200).json({ success: true, data: restaurant });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Delete restaurant
// @route   DELETE /api/restaurants/:id
// @access  Admin
exports.deleteRestaurant = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }
        await restaurant.remove();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
