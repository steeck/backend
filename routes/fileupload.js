const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path')

var router = express.Router();
var upload = multer({ dest: './uploads/'});

AWS.config.update({
    accessKeyId: "AKIAJFY5N6PPEP7MVIPQ",
    secretAccessKey: "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"
  });

var s3 = new AWS.S3();

router.route('/')
  .post(upload.single('file'), (req, res) => {
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
  });

module.exports = router;
