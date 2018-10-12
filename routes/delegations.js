const express = require('express');
const models = require('../models');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    models.Delegation.findAll().then(list => res.json(list))
  })
  .post((req, res) => {
    models.Delegation.create({
      from: req.body.from,
      to: req.body.to,
      amount: req.body.amount,
      weeks: req.body.weeks
    }).then(result => {
      res.json(result);
    }).catch(err => {
      res.status(500);
      res.json(err);
    });
  })

module.exports = router;
