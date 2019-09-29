const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');

require("dotenv-safe").config();
//criar tabelas do banco se n existirem
require('./db/createTables');

const indexRouter = require('./routes/index');
const filmsRouter = require('./routes/films');
const usersRouter = require('./routes/users');
const minioRouter = require('./routes/s3');
const loginRouter = require('./routes/login');

const appConfig = express();

appConfig.use(logger('dev'));
appConfig.use(cors());
appConfig.use(express.json());
appConfig.use(express.urlencoded({ extended: false }));
appConfig.use(cookieParser());
appConfig.use(express.static(path.join(__dirname, 'public')));

appConfig.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
}));

appConfig.use('/api', indexRouter);
appConfig.use('/api/films', filmsRouter);
appConfig.use('/api/users', usersRouter);
appConfig.use('/api/file', minioRouter);
appConfig.use('/api/login', loginRouter);

module.exports = appConfig;
