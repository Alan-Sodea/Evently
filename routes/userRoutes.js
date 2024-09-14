 
const express = require('express');
const { register, login, readList, modify, readMe } = require('../controllers/userController');
const router = express.Router();

router.post('/register', register);
router.put('/', modify);
router.get('/login', login);
router.get('/', readList);
router.get('/me', readMe);

module.exports = router;
