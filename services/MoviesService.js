const dynamoClient = require('../config/dynamo-client');

const filmRegister = async film => {
    try {
        await dynamoClient.put(film).promise();
        return { statusCode: 200 };
    } catch (e) {
        throw {
            statusCode: 400,
            error: `Could not post: ${e.stack}`,
            message: e.message
        };
    }
};

const filmsList = async params => {
    try {
        const data = await dynamoClient.scan(params).promise();
        return { statusCode: 200 , data};
    } catch (e) {
        throw {
            statusCode: 400,
            error: `Could not Get Batch: ${e.stack}`,
            message: e.message
        };
    }
};

const filmById = async params => {
    try {
        const data = await dynamoClient.get(params).promise();
        return { statusCode: 200 , data};
    } catch (e) {
        throw {
            statusCode: 400,
            error: `Could not Get Batch: ${e.stack}`,
            message: e.message
        };
    }
};

const filmsBetweenYears = async params => {
    try {
        const data = await dynamoClient.scan(params, onScan).promise();
        return { statusCode: 200 , data};
    } catch (e) {
        throw {
            statusCode: 400,
            error: `Could not Get Batch: ${e.stack}`,
            message: e.message
        };
    }

    //dynamoClient.scan(params, onScan);
    function onScan(err, data) {
        if (err) {
            return err;
        } else {
            // continue scanning if we have more movies, because
            // scan can retrieve a maximum of 1MB of data
            if (typeof data.LastEvaluatedKey != "undefined") {
                console.log("Scanning for more...");
                params.ExclusiveStartKey = data.LastEvaluatedKey;
                dynamoClient.scan(params, onScan);
            }
            return data;
        }
    }
};

const filmByYear = async params => {
    try {
        const data = await dynamoClient.query(params).promise();
        return { statusCode: 200 , data};
    } catch (e) {
        throw {
            statusCode: 400,
            error: `Could not Get Batch: ${e.stack}`,
            message: e.message
        };
    }
};

const filmByTitle = async params => {
    try {
        const data = await dynamoClient.scan(params).promise();
        return {statusCode: 200, data};
    } catch (e) {
        throw {
            statusCode: 400,
            error: `Could not Get Batch: ${e.stack}`,
            message: e.message
        };
    }
};

const filmUpdate = async params => {
    try {
        const data = await dynamoClient.update(params).promise();
        return {statusCode: 200, data};
    } catch (e) {
        throw {
            statusCode: 400,
            error: `Could not update Item: ${e.stack}`,
            message: e.message
        };
    }
};

const filmDelete = async params => {
    try {
        const data = await dynamoClient.delete(params).promise();
        return {statusCode: 200, data};
    } catch (e) {
        throw {
            statusCode: 400,
            error: `Could not delete Item: ${e.stack}`,
            message: e.message
        };
    }
};

module.exports = {filmRegister, filmsList, filmById, filmByTitle, filmsBetweenYears, filmByYear, filmUpdate, filmDelete};
