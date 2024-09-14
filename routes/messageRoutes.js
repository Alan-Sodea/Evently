 
const express = require('express');
const { create, read, remove } = require('../controllers/messageController');
const router = express.Router();

router.post('/', create);
router.get('/', read);
router.delete('/', remove);

module.exports = router;
