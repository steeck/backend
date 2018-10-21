const steem = require('steem');
const { Post } = require('../models');
const uniqid = require('uniqid')

exports.create = function (req, res) {
  let hash = uniqid();
  let permlink = 'steeck-hot-' + hash;
  Post.create({
    author: req.body.author,
    permlink: permlink,
    contents: req.body.contents,
    json_metadata: req.body.json_metadata
  }).then(function(data) {
    res.status(200);
    console.log('success', data);
    res.json(data.get({plain: true}));
  }).catch(function(error) {
    res.status(500);
    console.log('err', error);
    res.json({error: error, stackError: error.stack});
  });
};

exports.delete = function (req, res) {
  let permlink = Object.keys(req.body)[0]
  console.log('permlink del', permlink);
  Post.destroy({
    where: {
      permlink:permlink
    }
  }).then(function(data) {
    res.status(200);
    res.json(data.get({plain: true}));
  }).catch(function(error) {
    res.status(500);
    res.json({error: error, stackError: error.stack});
  });
};
