const express = require('express');
const models = require('../models');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/', postController.delete);

module.exports = router;
