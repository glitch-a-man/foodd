const express = require('express');
const router = express.Router();
const {
    getMenuItems,
    getMenuItem,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
} = require('../controllers/menuItemController');

router.route('/')
    .get(getMenuItems)
    .post(createMenuItem);

router.route('/:id')
    .get(getMenuItem)
    .put(updateMenuItem)
    .delete(deleteMenuItem);

module.exports = router;
