const steem = require('steem')
const { Post, Steecky } = require('../models')
const uniqid = require('uniqid')
const moment = require('moment')
const {Op} = require('sequelize')

exports.getCategory = function (req, res) {
  // console.log(req.params.username)
  Post.findAll({
    where: {category: req.params.category},
    order: [
      ['id', 'desc']
    ]
  }).then(result => {
    res.json(result)
  })
}

exports.getFeed = function (req, res) {
  // console.log(req.params.username)
  Post.findAll({
    where: {
      author: {
        [Op.in]: req.body.following
      }
    },
    order: [
      ['id', 'desc']
    ]
  }).then(result => {
    res.json(result)
  })
}

exports.getBest = function (req, res) {
  Post.findAll({
    order: [
      ['rate', 'desc'],
      ['id', 'desc']
    ],
    limit: 30
  }).then(result => {
    res.json(result)
  })
}

exports.getNewbie = function (req, res) {
  Post.findAll({
    where: {
      reputation: {
        [Op.lte]: 40
      }
    },
    order: [
      ['pending_payout_value', 'desc'],
      ['id', 'desc']
    ],
    limit: 30
  }).then(result => {
    res.json(result)
  })
}

exports.getNew = function (req, res) {
  Post.findAll({
    order: [
      ['id', 'desc']
    ],
    limit: 30
  }).then(result => {
    res.json(result)
  })
}

exports.getWeekly = function (req, res) {
  Post.findAll({
    where: {
      created_at: {
        [Op.gte]: moment().subtract(7, 'days').toDate()
      }
    },
    order: [
      ['id', 'desc']
    ],
    limit: 30
  }).then(result => {
    res.json(result)
  })
}

exports.getPayout = function (req, res) {
  Post.findAll({
    where: {
      created_at: {
        [Op.lte]: moment().subtract(7, 'days').toDate()
      }
    },
    order: [
      ['id', 'desc']
    ],
    limit: 30
  }).then(result => {
    res.json(result)
  })
}

exports.getPost = async function (req, res) {
  Post.find({
    where: {id: req.params.id}
  }).then(async result => {
    // const steemRoute = '/steeck/@' + result.author + '/' + result.permlink
    const steem = await getSteemContent(result.author, result.permlink)
    let data = {
      data: result,
      steem: steem
    }
    res.json(data)
  })
}

function getSteemContent (author, permlink) {
  return new Promise(function (resolve, reject) {
    steem.api.getContent(author, permlink, function (err, res) {
      return err ? reject(err) : resolve(res)
    })
  })
}

exports.create = function (req, res) {
  let hash = uniqid()
  let permlink = 'steeck-' + hash
  Post.create({
    category: req.body.category,
    author: req.body.author,
    permlink: permlink,
    title: req.body.title,
    thumbnail: req.body.contents[0].url,
    contents: req.body.contents,
    json_metadata: req.body.json_metadata,
    reputation: req.body.reputation
  }).then(function(data) {
    Steecky.create({
      username: req.body.author,
      type: 'post',
      poring: 100,
      permlink: permlink
    }).then(result => {}).catch(error => {})

    res.status(201)
    res.json(data.get({plain: true}))
  }).catch(function (error) {
    res.status(500)
    console.log('err', error)
    res.json({error: error, stackError: error.stack})
  })
}

exports.delete = function (req, res) {
  let permlink = Object.keys(req.body)[0]
  console.log('permlink del', permlink)
  Post.destroy({
    where: {
      permlink: permlink
    }
  }).then(function (data) {
    res.status(200)
    res.json(data.get({plain: true}))
  }).catch(function (error) {
    res.status(500)
    res.json({error: error, stackError: error.stack})
  })
}

exports.search = async function (req, res) {
  let q = req.params.q
  let limit = 10
  let page =req.body.page
  let moreType =req.body.moreType
  q = q.replace(/'/gi, '\\\'')
  if (typeof moreType === 'undefined') {
    let count = await Post.findOne({
      attributes:  [
        [Post.sequelize.fn('count', Post.sequelize.col('id')), 'count']
      ],
      where: {
        [Op.or] : [
          {"json_metadata.tags": {[Op.like]: '%' + q + '%'}},
          {category: {[Op.like]: `%${q}%`}},
          {author: {[Op.like]: `%${q}%`}},
          {title: {[Op.like]: `%${q}%`}}
        ]
      }
    }).catch(error => console.log(error))

    let list = await Post.findAll({
      where: {
        [Op.or] : [
          {"json_metadata.tags": {[Op.like]: '%' + q + '%'}},
          {category: {[Op.like]: `%${q}%`}},
          {author: {[Op.like]: `%${q}%`}},
          {title: {[Op.like]: `%${q}%`}}
        ]
      },
      order: [
        ['id', 'desc']
      ],
      limit: limit
    })
    let result = {
      q: q,
      list: list,
      totalCount: count.dataValues.count,
      page: 1
    }
    res.json(result)
  } else if (typeof page === 'number') {
    let result = await Post.findAll({
      where: {
        [Op.or] : [
          {"json_metadata.tags": {[Op.like]: '%' + q + '%'}},
          // {category: {[Op.like]: `%${q}%`}},
          {author: {[Op.like]: `%${q}%`}},
          {title: {[Op.like]: `%${q}%`}}
        ]
      },
      order: [
        ['id', 'desc']
      ],
      offset: limit * (page - 1), limit: limit
    })
    res.json(result)
  }
}
