const express = require('express');
const votingRequestController = require('../controllers/votingRequestController');
const router = express.Router();

// router.get('/:username', leaseController.list);
router.post('/', votingRequestController.create);


module.exports = router;
