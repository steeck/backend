const express = require('express');
const models = require('../models');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    models.Test.findAll().then(list => res.json(list))
  })
  .post((req, res) => {
    models.Test.create({
      name: req.body.name
    }).then(result => {
      res.json(result);
    }).catch(err => {
      res.status(500);
      res.json(err);
    });
  })

module.exports = router;
