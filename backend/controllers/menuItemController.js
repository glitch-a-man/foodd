const MenuItem = require('../models/MenuItem');
const Menu = require('../models/Menu');

// @desc    Get all menu items
// @route   GET /api/menu-items
// @access  Public
exports.getMenuItems = async (req, res) => {
    try {
        const items = await MenuItem.find()
            .populate({
                path: 'restaurant',
                select: 'name address rating image',
            })
            .populate('menu', 'name');
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get single menu item
// @route   GET /api/menu-items/:id
// @access  Public
exports.getMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id)
            .populate('restaurant')
            .populate('menu');
        if (!item) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Create new menu item
// @route   POST /api/menu-items
// @access  Admin
exports.createMenuItem = async (req, res) => {
    try {
        const { menu, restaurant } = req.body;

        // Check if menu exists
        const menuExists = await Menu.findById(menu);
        if (!menuExists) {
            return res.status(404).json({ success: false, message: 'Menu not found' });
        }

        const item = await MenuItem.create(req.body);
        res.status(201).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Update menu item
// @route   PUT /api/menu-items/:id
// @access  Admin
exports.updateMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!item) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        res.status(200).json({ success: true, data: item });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// @desc    Delete menu item
// @route   DELETE /api/menu-items/:id
// @access  Admin
exports.deleteMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ success: false, message: 'Menu item not found' });
        }
        await item.remove();
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
