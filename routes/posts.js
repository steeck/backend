const express = require('express');
const models = require('../models');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    models.Post.findAll().then(list => res.json(list))
  })
  .post((req, res) => {
    // @TODO validate form data
    let hash = 'abcd1234'; // this is a sample hash, should be implemented as a helper function
    let permlink = 'steeck-hot' + hash;
    models.Post.create({
      author: req.body.author,
      permlink: permlink,
      contents: req.body.contents,
    }).then(function(data) {
      res.status(200);
      res.json(data.get({plain: true}));
    }).catch(function(error) {
      res.status(500);
      res.json({error: error, stackError: error.stack});
    });
  });

module.exports = router;
