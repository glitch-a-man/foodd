const express = require('express');
const router = express.Router();
const {
    getMenus,
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu,
} = require('../controllers/menuController');

router.route('/')
    .get(getMenus)
    .post(createMenu);

router.route('/:id')
    .get(getMenu)
    .put(updateMenu)
    .delete(deleteMenu);

module.exports = router;
