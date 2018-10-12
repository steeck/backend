const express = require('express');
const models = require('../models');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    models.Delegation.findAll().then(list => res.json(list))
  })

module.exports = router;
