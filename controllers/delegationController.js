const steem = require('steem');
const { Delegation } = require('../models');

exports.list = function (req, res) {
  console.log(req.params.username);
  res.json(req.params.username);
  res.send('NOT IMPLEMENTED: Author list');
};

exports.create = async function (req, res) {
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
