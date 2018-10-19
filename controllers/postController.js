const steem = require('steem');
const { Post } = require('../models');

exports.create = function (req, res) {
  let hash = 'abc123';
  let permlink = 'steeck-hot' + hash;
  Post.create({
    author: req.body.author,
    permlink: permlink,
    contents: req.body.contents,
    json_metadata: req.body.json_metadata
  }).then(function(data) {
    res.status(200);
    res.json(data.get({plain: true}));
  }).catch(function(error) {
    res.status(500);
    res.json({error: error, stackError: error.stack});
  });
};
