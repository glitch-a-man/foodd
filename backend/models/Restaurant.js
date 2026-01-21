const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a restaurant name'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
    },
    location: {
        // GeoJSON Point
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
        },
        formattedAddress: String,
    },
    rating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [5, 'Rating must can not be more than 5'],
        default: 4.5,
    },
    image: {
        type: String,
        default: 'no-photo.jpg',
    },
    cuisine: {
        type: [String],
        required: true,
        enum: [
            'Italian',
            'American',
            'Japanese',
            'Indian',
            'Chinese',
            'Mexican',
            'Thai',
            'Dessert',
            'Fast Food',
        ],
    },
    averageCost: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

// Cascade delete menus when a restaurant is deleted
restaurantSchema.pre('remove', async function (next) {
    console.log(`Menus and items being removed from restaurant ${this._id}`);
    await this.model('Menu').deleteMany({ restaurant: this._id });
    await this.model('MenuItem').deleteMany({ restaurant: this._id });
    next();
});

// Reverse populate with virtuals
restaurantSchema.virtual('menus', {
    ref: 'Menu',
    localField: '_id',
    foreignField: 'restaurant',
    justOne: false,
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
