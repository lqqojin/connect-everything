/**
 * Express Server
 *
 **/
const express = require('express');
const cors = require('cors');
// const helmet = require('helmet'); 뭔가요?
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const timeout = require('connect-timeout');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(timeout(process.env.TIMEOUT));

app.use((req, res, next) => {
    const st = new Date();
    res.on('finish', () => {
        console.log('%s - %s %s %s %s ms', req.ip, req.method, req.originalUrl, res.statusCode, (new Date() - st));
    });
    next();
});

app.use('/', require('./routes'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`http SERVER Listening on Port ${PORT}`);
});