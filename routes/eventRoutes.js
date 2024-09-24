 
const express = require('express');
const { create, read, readAll, update, remove, readMe } = require('../controllers/eventController');
const router = express.Router();

router.post('/', create);
router.delete('/', remove);
router.get('/changes', update);
router.get('/', read);
router.get('/me', readMe);
router.get('/list', readAll);

module.exports = router;
