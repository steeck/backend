const steem = require('steem');
const { Delegation, Lease, Post } = require('../models');

exports.list = function (req, res) {
  console.log(req.params.username);
  res.json(req.params.username);
  res.send('NOT IMPLEMENTED: Author list');
};

exports.delegate = async function (req, res) {
  steem.broadcast.delegateVestingShares(req.body.wif, req.body.from, req.body.to, req.body.vests + ' VESTS', (err, result) => {
    if (err) {
      console.log(err);
      res.status(500);
      res.json({error: err});
    } else {
      Delegation.create({
        type: req.body.type,
        from: req.body.from,
        to: req.body.to,
        sp: req.body.sp,
        vests: req.body.vests,
        weeks: req.body.weeks,
      }).then(function(data) {
        res.status(200);
        res.json(data.get({plain: true}));
      }).catch(function(error) {
        res.status(500);
        res.json({error: error, stackError: error.stack});
      });
    }
  })
};

exports.post = function (req, res) {
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

exports.lease = function (req, res) {
  Lease.create({
    type: req.body.type,
    from: req.body.from,
    to: req.body.to,
    sp: req.body.sp,
    vests: req.body.vests,
    weeks: req.body.weeks,
  }).then(function(data) {
    res.status(200);
    res.json(data.get({plain: true}));
  }).catch(function(error) {
    res.status(500);
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
    res.json(data.get({plain:true}));
  }).catch(function(error) {
    res.status(500);
    res.json({error: error, stackError: error.stack});
  });
};
