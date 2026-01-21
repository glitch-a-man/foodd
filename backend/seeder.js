const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config();

// Load models
const Restaurant = require('./models/Restaurant');
const Menu = require('./models/Menu');
const MenuItem = require('./models/MenuItem');
const User = require('./models/User');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

// Read JSON file
const restaurantsData = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'restaurants.json'), 'utf-8')
);

// Import into DB
const importData = async () => {
    try {
        // Clear existing restaurant/menu data
        await Restaurant.deleteMany();
        await Menu.deleteMany();
        await MenuItem.deleteMany();

        console.log('Restaurant and Menu data destroyed...');

        // Create specific test user
        const testUserEmail = 'glitchaman9@gmail.com';
        let user = await User.findOne({ email: testUserEmail });

        if (!user) {
            user = await User.create({
                name: 'Glitch A Man',
                firstName: 'Glitch',
                lastName: 'A Man',
                email: testUserEmail,
                image: 'https://lh3.googleusercontent.com/a/ACg8ocL_XF-XfX_XF-XfX_XF=s96-c',
                role: 'user',
                address: 'C-Scheme, Jaipur, Rajasthan',
                location: {
                    type: 'Point',
                    coordinates: [75.8062, 26.9157], // Jaipur coordinates
                    formattedAddress: 'C-Scheme, Jaipur, Rajasthan'
                }
            });
            console.log(`Test user ${testUserEmail} created.`);
        } else {
            user.address = 'C-Scheme, Jaipur, Rajasthan';
            user.location = {
                type: 'Point',
                coordinates: [75.8062, 26.9157],
                formattedAddress: 'C-Scheme, Jaipur, Rajasthan'
            };
            await user.save();
            console.log(`Test user ${testUserEmail} updated with location.`);
        }

        for (const data of restaurantsData) {
            // 1. Create Restaurant
            const restaurant = await Restaurant.create(data.restaurant_info);

            // 2. Create Menu for this Restaurant
            const menu = await Menu.create({
                name: data.menu_group.name || 'Main Menu',
                restaurant: restaurant._id,
                description: `Standard menu for ${restaurant.name}`
            });

            // 3. Create MenuItems for this Menu
            const itemsWithIds = data.menu_group.items.map(item => ({
                ...item,
                menu: menu._id,
                restaurant: restaurant._id
            }));

            await MenuItem.insertMany(itemsWithIds);
        }

        console.log('Data Imported Successfully!');
        process.exit();
    } catch (err) {
        console.error('Error importing data:', err);
        process.exit(1);
    }
};

// Delete data
const deleteData = async () => {
    try {
        await Restaurant.deleteMany();
        await Menu.deleteMany();
        await MenuItem.deleteMany();

        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
} else {
    console.log('Please provide -i to import or -d to delete');
}
