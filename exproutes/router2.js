const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');
const cors = require('cors');

// const { Test, Posts } = require('../sequelize.js')
var models = require('../models');

const app = express()
app.use(bodyParser.json())
app.use(cors());
// app.use('/');
var port = 4000
var upload = multer({ dest: './uploads/'});

AWS.config.update({
    accessKeyId: "AKIAJFY5N6PPEP7MVIPQ",
    secretAccessKey: "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"
  });

var s3 = new AWS.S3();

// app.post('/test', (req, res) => {
//   console.log('req.bod', req.body);
//   Test.create(req.body)
//     .then(user => res.json(user))
// })

app.get('/delegations', (req, res) => {
    models.delegations.findAll().then(test => res.json(test))
})

app.get('/test', (req, res) => {
    models.tests.findAll().then(test => res.json(test))
})

app.get('/get/posts', (req, res) => {
    models.posts.findAll().then(test => res.json(test))
})

app.post('/insert', function(req, res) {

  console.log("objsasd", req.body);
  models.posts.create({
    author: 'danielaasdf',
    permlink: 'testinglink',
    contents: req.body
  }).then(function(data) {
      res.status(200);
      res.json(data.get({plain: true}));
  }).catch(function(error) {
      res.status(500);
      res.json({error:error, stackError:error.stack});
  });

})

app.post('/create', upload.single('file'), function(req, res) {
  let filePath = req.file.path;
  console.log("fue", filePath);
  //configuring parameters
  var params = {
    Bucket: 'steeck',
    Body : fs.createReadStream(filePath),
    Key : "folder/"+Date.now()+"_"+path.basename(filePath)
  };

  s3.upload(params, function (err, data) {
    //handle error
    if (err) {
      console.log("Error", err);
    }
    //success
    if (data) {
      console.log("datatest",data);
      res.json(data);
    }
  });
})

app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`)
})
