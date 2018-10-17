const express = require('express');
// const { Delegation } = require('../models');
// const { Delegation } = require('../controllers');
const delegationController = require('../controllers/delegationController');
const router = express.Router();

router.get('/:username', delegationController.list);
router.post('/', delegationController.create);

  // .get((req, res) => {
  //   Delegation.findAll().then(list => res.json(list))
  // })
  // .post((req, res) => {
  //   Delegation.create({
  //     from: req.body.from,
  //     to: req.body.to,
  //     amount: req.body.amount,
  //     weeks: req.body.weeks
  //   }).then(result => {
  //     res.json(result);
  //   }).catch(err => {
  //     res.status(500);
  //     res.json(err);
  //   });
  // })

module.exports = router;
