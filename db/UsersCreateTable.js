const AWS = require("aws-sdk");

AWS.config.update({
    region: process.env.REGION,
    endpoint: "https://dynamodb.us-east-1.amazonaws.com",
    accessKeyId: process.env.ACCESSKEYID,
    secretAccessKey: process.env.SECRETACCESSKEY,
});

const dynamodb = new AWS.DynamoDB();


dynamodb.describeTable({TableName:'Users'}, (err, data) => {
    if (err) {
        const params = {
            TableName : "Users",
            KeySchema: [
                { AttributeName: "email", KeyType: "HASH"},  //Partition key
                { AttributeName: "user", KeyType: "RANGE" }  //Sort key
            ],
            AttributeDefinitions: [
                { AttributeName: "email", AttributeType: "S" },
                { AttributeName: "user", AttributeType: "S" }
            ],
            ProvisionedThroughput: {
                ReadCapacityUnits: 10,
                WriteCapacityUnits: 10
            }
        };
        dynamodb.createTable(params, function(errCreateTable, dataCreateTable) {
            if (errCreateTable) {
                console.error("Unable to create table. Error JSON:", JSON.stringify(errCreateTable, null, 2));
            } else {
                console.log("Created table. Table description JSON:", JSON.stringify(dataCreateTable, null, 2));
            }
        });
    }
});
