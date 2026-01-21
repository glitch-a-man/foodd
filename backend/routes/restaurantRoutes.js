const express = require('express');
const router = express.Router();
const {
    getRestaurants,
    getRestaurant,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
} = require('../controllers/restaurantController');

router.route('/')
    .get(getRestaurants)
    .post(createRestaurant);

router.route('/:id')
    .get(getRestaurant)
    .put(updateRestaurant)
    .delete(deleteRestaurant);

module.exports = router;
