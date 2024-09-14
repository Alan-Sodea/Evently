const express = require('express');
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const messageRoutes = require('./messageRoutes');
const registerRoutes = require('./RegisterRoutes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/messages', messageRoutes);
router.use('/register', registerRoutes);

module.exports = router;
