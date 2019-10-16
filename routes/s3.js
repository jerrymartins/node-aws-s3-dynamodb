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


    // s3.upload(uploadParams).on('httpUploadProgress', event => {
    //     console.log(`Uploaded ${event.loaded} out of ${event.total}`);
    // }).send((err, data) => {
    //     if (err) {
    //         res.send(err);
    //     }
    //     if (data) {
    //         res.send(data.Location);
    //     }
    // });
    // call S3 to retrieve upload file to specified bucket
    s3.upload(uploadParams, function (err, data) {
        if (err) {
            res.send(err);
        }
        if (data) {
            res.send(data.Location);
        }
    });

});

router.delete('/', (req, res, next) => {
    let keys = [];
    for (let property in req.body) {
        keys.push({Key: req.body[property]});
    }

    const params = {
        Bucket: 's3dynamox',
        Delete: {
            Objects : keys
        }
    };

    s3.deleteObject(params, function(err, data) {
        if (err) {
            res.send(err);
        }
        if (data) {
            res.send(data.Location);
        }                // deleted
    });
});

module.exports = router;
