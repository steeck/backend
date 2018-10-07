const express = require('express')
const bodyParser = require('body-parser')
const { Test, Posts } = require('../sequelize.js')

const app = express()
app.use(bodyParser.json())

// app.post('/test', (req, res) => {
//   console.log('req.bod', req.body);
//   Test.create(req.body)
//     .then(user => res.json(user))
// })

app.get('/g/test', (req, res) => {
    Test.findAll().then(test => res.json(test))
})

app.get('/g/posts', (req, res) => {
    Posts.findAll().then(test => res.json(test))
})

const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
