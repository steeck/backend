const steem = require('steem');
const { Lease } = require('../models');

exports.create = function (req, res) {
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
