const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/', (req, res, next) => {
    if(req.body.user === 'luiz' && req.body.pwd === '123'){
        //auth ok
        const id = 1; //esse id viria do banco de dados
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 300 // expires in 5min
        });
        res.status(200).send({ auth: true, token: token });
    } else {
        res.status(500).send('Login inválido!');
    }
});

router.get('/logout', function(req, res) {
    res.status(200).send({ auth: false, token: null });
});

module.exports = router;
