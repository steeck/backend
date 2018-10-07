const Sequelize = require("sequelize")
const sequelize = new Sequelize("steeck", "steeck", "steeck2018!", {
  host: 'steeck.c9mlkeoxgavg.ap-northeast-2.rds.amazonaws.com',
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const TestModel = require('./models/test')
const Test = TestModel(sequelize, Sequelize)

sequelize.sync({ force: true })
  .then(() => {
    Test.create({
      name: 'DAniela'
    })
    console.log(`Database & tables created!`)
  })

const PostsModel = require('./models/posts')
const Posts = PostsModel(sequelize, Sequelize)

sequelize.sync( {force: true})
  .then(() => {
    Posts.create({
      author: 'Daniela',
      permlink: 'test.com',
      contents: {
        title: {
          url: 'test1',
          text: 'hello'
        },
        content: {
          0: {
            url: '0',
            text: '0 hi'
          },
          1: {
            url: '1',
            text: '1 hello'
          }
        }
      }
    })
  })


module.exports = {
  Test,
  Posts
}

// var Test = connection.define('test', {
//   title: Sequelize.STRING,
//   body: Sequelize.TEXT
// })
//
// connection.sync().then(function() {
//   Test.create({
//     title: 'hello test',
//     body: 'asldkjfsldkjflsdkjflskjdflskjdlfkjsldkflsdf'
//   })
//   Test.findAll().then(function(tests) {
//     console.log(tests.dataValues);
//   })
// })

// connection.query("SELECT * FROM posts").then(postsRows => {
//   console.log(postsRows);
// })
