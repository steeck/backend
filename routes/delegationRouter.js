const express = require('express');
// const { Delegation } = require('../models');
// const { Delegation } = require('../controllers');
const delegationController = require('../controllers/delegationController');
const router = express.Router();

router.get('/:username', delegationController.list);
router.post('/', delegationController.create);

module.exports = router;
