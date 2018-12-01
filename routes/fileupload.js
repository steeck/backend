const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

var router = express.Router();
var upload = multer({ dest: './uploads/'});

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESSKEY,
    secretAccessKey: process.env.AWS_SECRETKEY
  });

var s3 = new AWS.S3();

router.route('/')
  .post(upload.single('file'), (req, res) => {
    const ext = req.file.originalname.substr(req.file.originalname.lastIndexOf('.'));
    let filePath = req.file.path;
    console.log("fue", filePath);
    //configuring parameters
    var params = {
      Bucket: 'steeck',
      ACL: 'public-read',
      ContentType: req.file.mimetype,
      Body : fs.createReadStream(filePath),
      Key : "folder/"+Date.now()+"_"+path.basename(filePath)+ext
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
  });

module.exports = router;
