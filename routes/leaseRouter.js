const express = require('express');
const leaseController = require('../controllers/leaseController');
const router = express.Router();

// router.get('/:username', leaseController.list);
router.post('/', leaseController.create);


module.exports = router;
