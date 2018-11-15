const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.get('/c/:category', postController.getCategory);
router.get('/steeck/pending', postController.getBestPending);
router.get('/steeck/payout', postController.getBestPayout);
router.get('/newbie/pending', postController.getNewbiePending);
router.get('/newbie/payout', postController.getNewbiePayout);
router.get('/best', postController.getBest);
router.get('/new', postController.getNew);
router.get('/newbie', postController.getNewbie);
router.get('/payout', postController.getPayout);
router.get('/weekly', postController.getWeekly);
router.get('/:id', postController.getPost);
router.post('/', postController.create);
router.get('/search/:q', postController.search);
router.post('/search/:q', postController.search);
router.post('/feed', postController.getFeed);

module.exports = router;
