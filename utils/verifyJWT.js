const jwt = require('jsonwebtoken');

function verifyJWT(req, res, next){
    const token = req.headers['x-access-token'];
    //---DESCOMENTAR if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        //---DESCOMENTAR if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        // se tudo estiver ok, salva no request para uso posterior
        req.userId = 1;// decoded.id;
        next();
    });
}

module.exports = verifyJWT;
