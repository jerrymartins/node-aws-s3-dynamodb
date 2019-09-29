const dynamoClient = require('../config/dynamo-client');

const userRegister = async user => {
    try {
        await dynamoClient.put(user).promise();
        return { statusCode: 200 };
    } catch (e) {
        throw {
            statusCode: 400,
            error: `Could not post: ${e.stack}`,
            message: e.message
        };
    }
};

const userById = async params => {
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

const userScan = async params => {
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

const userQuery = async params => {
    try {
        const data = await dynamoClient.query(params).promise();
        return {statusCode: 200, data};
    } catch (e) {
        throw {
            statusCode: 400,
            error: `Could not Get Batch: ${e.stack}`,
            message: e.message
        };
    }
};

const userUpdate = async params => {
    try {
        const data = await dynamoClient.update(params).promise();
        return {statusCode: 200, data};
    } catch (e) {
        throw {
            statusCode: 400,
            error: `Could not update User: ${e.stack}`,
            message: e.message
        };
    }
};

const userDelete = async params => {
    try {
        const data = await dynamoClient.delete(params).promise();
        return {statusCode: 200, data};
    } catch (e) {
        throw {
            statusCode: 400,
            error: `Could not delete User: ${e.stack}`,
            message: e.message
        };
    }
};

module.exports = {userRegister, userById, userScan, userQuery, userUpdate, userDelete};

