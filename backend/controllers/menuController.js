const Menu = require('../models/Menu');
const Restaurant = require('../models/Restaurant');

// @desc    Get all menus
// @route   GET /api/menus
// @access  Public
exports.getMenus = async (req, res) => {
    try {
        const menus = await Menu.find().populate('items');
        res.status(200).json({ success: true, count: menus.length, data: menus });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get single menu
// @route   GET /api/menus/:id
// @access  Public
exports.getMenu = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id).populate('items');
        if (!menu) {
            return res.status(404).json({ success: false, message: 'Menu not found' });
        }
        res.status(200).json({ success: true, data: menu });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Create new menu
// @route   POST /api/menus
// @access  Admin
exports.createMenu = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.body.restaurant);
        if (!restaurant) {
            return res.status(404).json({ success: false, message: 'Restaurant not found' });
        }

        const menu = await Menu.create(req.body);
        res.status(201).json({ success: true, data: menu });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Update menu
// @route   PUT /api/menus/:id
// @access  Admin
exports.updateMenu = async (req, res) => {
    try {
        const menu = await Menu.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!menu) {
            return res.status(404).json({ success: false, message: 'Menu not found' });
        }
        res.status(200).json({ success: true, data: menu });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Delete menu
// @route   DELETE /api/menus/:id
// @access  Admin
exports.deleteMenu = async (req, res) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).json({ success: false, message: 'Menu not found' });
        }
        await menu.remove();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
