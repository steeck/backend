const express = require('express');
const steeckyController = require('../controllers/steeckyController');
const router = express.Router();

router.get('/:username', steeckyController.list);
router.get('/daily/:username', steeckyController.daily);
router.post('/', steeckyController.create);

module.exports = router;
