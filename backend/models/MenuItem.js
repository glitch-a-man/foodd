const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a dish name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    price: {
        type: Number,
        required: [true, 'Please add a price'],
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
    },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
    category: {
        type: String,
        required: [true, 'Please add a category'],
    },
    image: {
        type: String,
        default: 'no-dish-photo.jpg',
    },
    videoUrl: {
        type: String,
        required: [true, 'Please add a video URL for the reel'],
    },
    rating: {
        type: Number,
        default: 4.0,
    },
    eta: {
        type: String,
        default: '20-30 min',
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('MenuItem', menuItemSchema);
