const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a menu name'],
        default: 'Main Menu',
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    description: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Reverse populate with items
menuSchema.virtual('items', {
    ref: 'MenuItem',
    localField: '_id',
    foreignField: 'menu',
    justOne: false,
});

module.exports = mongoose.model('Menu', menuSchema);
