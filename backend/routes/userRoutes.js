const express = require('express');
const router = express.Router();
const { syncUser, getUserProfile } = require('../controllers/userController');

router.post('/sync', syncUser);
router.get('/profile/:id', getUserProfile);
router.get('/email/:email', exports.getUserByEmail); // I need to define this in controller

module.exports = router;
