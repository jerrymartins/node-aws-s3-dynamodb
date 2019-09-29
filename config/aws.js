
require("dotenv").config();
// Load the SDK para JavaScript
const AWS = require('aws-sdk');
AWS.config.secretAccessKey = process.env.SECRETACCESSKEY;
AWS.config.accessKeyId = process.env.ACCESSKEYID;
AWS.config.region = process.env.REGION;

module.exports = AWS;



