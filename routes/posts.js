const express = require('express');
const models = require('../models');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    models.Post.findAll().then(list => res.json(list))
  })
  .post((req, res) => {
    models.Post.create({
      author: 'Author King',
      permlink: 'my-permlink',
      contents: req.body
    }).then(function(data) {
      res.status(200);
      res.json(data.get({plain: true}));
    }).catch(function(error) {
      res.status(500);
      res.json({error: error, stackError: error.stack});
    });
  });

module.exports = router;
