const verifyJWT = require('../utils/verifyJWT');
const express = require('express');
const router = express.Router();
const {
    userRegister,
    userScan,
    userQuery,
    userById,
    userUpdate,
    userDelete} = require('../services/UsersService');

router.post('/', (req, res, next) => {
    const film = req.body;
    let paramsGet = {
        TableName: "Users",
        ...film
    };
    userRegister(paramsGet).then( r => {
        res.status(r.statusCode).send();
    }).catch(err => {
        res.status(err.statusCode).send(err.message);
    });
});

router.get('/',  (req, res, next) => {
    const paramsGet = {
        TableName: "Users",
        Limit: 50,
        //ProjectionExpression: ["user", "email", "info"]
    };
    userScan(paramsGet).then( r => {
        res.status(r.statusCode).send(r.data);
    }).catch(err => {
        res.status(err.statusCode).send(err.message);
    });
});

router.get('/find-one/:user/:email', verifyJWT, (req, res, next) => {
    const paramsGet = {
        TableName: "Users",
        Key:{
            "userName": req.params.user,
            "email": req.params.email
        }
    };
    userById(paramsGet).then( r => {
        res.status(r.statusCode).send(r.data);
    }).catch(err => {
        res.status(err.statusCode).send(err.message);
    });
});

router.get('/name/:user', verifyJWT, (req, res, next) => {
    const params = {
        TableName : "Users",
        FilterExpression: 'contains (#user, :user)',
        ExpressionAttributeValues: {
            ":user": req.params.user
        },
        ExpressionAttributeNames:{
            "#user": "user"
        }
    };
    userScan(params).then( r => {
        res.status(r.statusCode).send(r.data);
    }).catch(err => {
        res.status(err.statusCode).send(err.message);
    });
});

router.get('/email/:email', verifyJWT, (req, res, next) => {
    const params = {
        TableName : "Users",
        KeyConditionExpression: "#email = :email",
        ExpressionAttributeNames:{
            "#email": "email"
        },
        ExpressionAttributeValues: {
            ":email": req.params.email
        }
    };

    userQuery(params).then( r => {
        res.status(r.statusCode).send(r.data);
    }).catch(err => {
        res.status(err.statusCode).send(err.message);
    });

});

router.put('/', verifyJWT, (req, res, next) => {
    const film = req.body;
    let paramsGet = {
        TableName: "Users",
        ...film
    };
    userRegister(paramsGet).then( r => {
        res.status(r.statusCode).send();
    }).catch(err => {
        res.status(err.statusCode).send(err.message);
    });

});

router.delete('/:userName/:email', verifyJWT, (req, res, next) => {
    const params = {
        TableName: 'Users',
        Key:{
            "user": req.params.userName,
            "email": req.params.email
        },
        // ConditionExpression:"info.rating <= :val",
        // ExpressionAttributeValues: {
        //   ":val": 5.0
        // }
    };

    userDelete(params).then( r => {
        res.status(r.statusCode).send(r.data);
    }).catch(err => {
        res.status(err.statusCode).send(err.message);
    });
});

module.exports = router;
