const express = require('express');
const router = express.Router();
const aws = require('../config/aws');
const path = require('path');
const s3 = new aws.S3({apiVersion: new Date()});

router.post('/upload', (req, res, next) => {
    const hash = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + req.files.photo.name;

    const uploadParams = {
        Bucket: 'dynamoxs3storage',
        Key: path.basename(hash),
        ACL: 'public-read',
        Body: req.files.photo.data
    };

    //call S3 to retrieve upload file to specified bucket
    s3.upload (uploadParams, function (err, data) {
        if (err) {
            res.errorCode(500).error(err);
        }
        if (data) {
            res.send(data.Location);
        }
    });

});

module.exports = router;
