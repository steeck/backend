const steem = require('steem');
const { Delegation } = require('../models');

exports.list = function (req, res) {
  // console.log(req.params.username);
  Delegation.findAll({
    where: { from: req.params.username },
    order: [
      ['id', 'desc']
    ]
  }).then(result => {
    res.json(result);
  })
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
        days: req.body.days,
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
