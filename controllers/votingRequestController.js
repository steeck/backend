const steem = require('steem');
const { VotingRequests } = require('../models');

exports.create = function (req, res) {
  VotingRequests.create({
    username: req.body.username,
    url: req.body.url,
    amount: req.body.amount,
    payment_type: req.body.payment_type
  }).then(function(data) {
    res.status(200);
    res.json(data.get({plain: true}));
  }).catch(function(error) {
    res.status(500);
    res.json({error: error, stackError: error.stack});
  });
};