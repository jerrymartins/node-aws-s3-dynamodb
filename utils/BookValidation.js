const { check } = require('express-validator');
const FilmSchema = require('../models/FilmsSchema');

const validateInsertFilm = [
    check('title')
        .custom( title => {
            return FilmSchema.countDocuments({title}).then( count => {
                if (count > 0) {
                    return Promise.reject('filme já cadastrado');
                }
            })
        })
        .isString().isLength({min: 3}).escape(),
    check('description').isString().escape(),
    check('urlImage').isString()
];

const validateUpdateFilm = validateInsertFilm.slice(-4);

module.exports.validateUpdateFilm = validateUpdateFilm;
module.exports.validateInsertFilm = validateInsertFilm;
