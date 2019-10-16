const express = require('express');
const router = express.Router();
const verifyJWT = require('../utils/verifyJWT');
const aws = require('../config/aws');
const path = require('path');
const generateHash = require('../utils/generateHash');

aws.config.update({
    endpoint: "https://s3.amazonaws.com",
});
const s3 = new aws.S3({apiVersion: new Date()});

router.post('/upload', (req, res, next) => {
    const hashName = generateHash(Math.random().toString(36).substring(2, 15) + req.files.file.name);
    const uploadParams = {
        Bucket: 's3dynamox',
        Key: hashName,
        ACL: 'public-read',
        Body: req.files.file.data,
        ContentType: req.files.file.mimetype
    };

    //call S3 to retrieve upload file to specified bucket
    s3.upload (uploadParams, function (err, data) {
        if (err) {
            res.send(err);
        }
        if (data) {
            res.send(data.Location);
        }
    });

});

router.delete('/', (req, res, next) => {
    const params = {  Bucket: 's3dynamox', Key: 'q1x5c3at1cczvzbrku8bnFullmetal Alchemist Final Trailer (2017) Live Action Anime Adaptation.mp4' };

    s3.deleteObject(params, function(err, data) {
        if (err) {
            res.send(err);
        }
        if (data) {
            res.send(data.Location);
        }                // deleted
    });
})

module.exports = router;
