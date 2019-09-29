const AWS = require("aws-sdk");

AWS.config.update({
    region: process.env.REGION,
    endpoint: "https://dynamodb.us-east-1.amazonaws.com",
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
});

const dynamodb = new AWS.DynamoDB();


dynamodb.describeTable({TableName:'Movies'}, (err, data) => {
    if (err) {
        const params = {
            TableName : "Movies",
            KeySchema: [
                { AttributeName: "yearFilm", KeyType: "HASH"},  //Partition key
                { AttributeName: "title", KeyType: "RANGE" }  //Sort key
            ],
            AttributeDefinitions: [
                { AttributeName: "yearFilm", AttributeType: "N" },
                { AttributeName: "title", AttributeType: "S" }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        };
        dynamodb.createTable(params, function(err, data) {
            if (err) {
                console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
            } else {
                console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
            }
        });
    }
});
