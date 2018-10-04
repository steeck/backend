const express = require('express');
const app = express();
const router = express.Router();
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const mysql = require('mysql');


var connection = mysql.createConnection({
  host     : 'steeck.c9mlkeoxgavg.ap-northeast-2.rds.amazonaws.com',
  user     : 'steeck',
  password : 'steeck2018!',
  database : 'steeck'
});

var upload = multer({ dest: './uploads/'});

AWS.config.update({
    accessKeyId: "AKIAJFY5N6PPEP7MVIPQ",
    secretAccessKey: "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"
  });

var s3 = new AWS.S3();

router.route('/').get(function (req,res) {
  connection.connect(function(err) {
    if (err) throw err
    console.log('You are now connected...')
  })

  connection.query("SELECT * FROM posts ", function(err, rows, fields) {
    if (!err) console.log("hi", rows);
    else console.log("err", err);
  })

  connection.end();
})

 router.route('/create').post(upload.single('file'),function (req,res) {
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

 router.route('/insert').post(function(req,res) {
   let obj = {a: 1}
   let insert = "INSERT INTO posts (permlink, author, title, contents, created_at) VALUES ('"+req.body.file+"', 'dani', 'asdf', '"+obj+"', '2018-10-02')";
   connection.query(insert, function (err, result) {
    if (err) throw err;
    console.log("Number of records inserted: " + result.affectedRows);
   });
 })

 module.exports = router;
