const express = require('express');
const votingRequestController = require('../controllers/votingRequestController');
const router = express.Router();

router.get('/:username', votingRequestController.list);
router.post('/', votingRequestController.create);

module.exports = router;
