require("dotenv").config();
// Load the SDK para JavaScript
const AWS = require('aws-sdk');

AWS.config.update({
    region: process.env.REGION,
    endpoint: "https://dynamodb.us-east-1.amazonaws.com",
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
});

const docClient = new AWS.DynamoDB.DocumentClient();

module.exports = docClient;
