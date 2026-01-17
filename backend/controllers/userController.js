const User = require('../models/User');

// @desc    Sync or create user after OAuth login
// @route   POST /api/users/sync
// @access  Public (Should be protected in production)
exports.syncUser = async (req, res) => {
    try {
        const { name, email, image, googleId } = req.body;

        // Split name into first and last
        const nameParts = name ? name.split(' ') : [];
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';

        let user = await User.findOne({ email });

        if (user) {
            // Update existing user info
            user.name = name || user.name;
            user.firstName = firstName || user.firstName;
            user.lastName = lastName || user.lastName;
            user.image = image || user.image;
            if (googleId) user.googleId = googleId;
            await user.save();
            return res.status(200).json({ success: true, data: user, message: 'User updated' });
        }

        // Create new user
        user = await User.create({
            name,
            firstName,
            lastName,
            email,
            image,
            googleId,
        });

        res.status(201).json({ success: true, data: user, message: 'User created' });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get user profile
// @route   GET /api/users/profile/:id
// @access  Public
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

// @desc    Get user profile by email
// @route   GET /api/users/email/:email
// @access  Public
exports.getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email }).populate('orders');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: user });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
