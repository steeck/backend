const steem = require('steem');
const { Steecky } = require('../models');
const { Op } = require('sequelize')
const moment = require('moment')

exports.list = function (req, res) {
  Steecky.findAll({
    where: { username: req.params.username },
    order: [
      ['id', 'desc']
    ]
  }).then(result => {
    res.json(result);
  })
};
exports.daily = function (req, res) {
  Steecky.findAll({
    where: {
      username: req.params.username,
      type: 'daily',
      created_at: {
        [Op.gte]: moment().format('YYYY-MM-DD')
      }
    }
  }).then(result => {
    res.json(result);
  }).catch(function (error) {
    res.status(500);
    res.json({error: error, stackError: error.stack});
  })
};

exports.create = function (req, res) {
  if (!req.body.username) {
    res.status(400)
    res.json({})
  }
  if (req.body.type === 'daily') {
    Steecky.findAll({
      where: {
        username: req.body.username,
        type: 'daily',
        created_at: {
          [Op.gte]: moment().format('YYYY-MM-DD')
        }
      },
    }).then(result => {
      if (!result.length) {
        Steecky.create({
          username: req.body.username,
          type: req.body.type,
          point: Math.floor(Math.random() * 1000) + 1
        }).then(function (data) {
          res.status(201);
          res.json(data.get({plain: true}));
        }).catch(function (error) {
          res.status(500);
          res.json({error: error, stackError: error.stack});
        });
      } else {
        res.status(409);
        res.json();
      }
    })
  } else {
    let point = 0;
    if (req.body.type === 'post') {
      point = 1000;
    } else if (req.body.type === 'comment') {
      point = 100;
    } else if (req.body.type === 'vote') {
      point = 200;
    }

    if (point) {
      Steecky.create({
        username: req.body.username,
        type: req.body.type,
        permlink: req.body.permlink,
        point: point
      }).then(function (data) {
        res.status(201);
        res.json(data.get({plain: true}));
      }).catch(function (error) {
        res.status(500);
        res.json({error: error, stackError: error.stack});
      });
    } else {
      res.status(400);
      res.json();
    }
  }
};
