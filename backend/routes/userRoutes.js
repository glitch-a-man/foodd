const express = require('express');
const router = express.Router();
const { syncUser, getUserProfile, getUserByEmail } = require('../controllers/userController');

router.post('/sync', syncUser);
router.get('/profile/:id', getUserProfile);
router.get('/email/:email', getUserByEmail);

module.exports = router;
