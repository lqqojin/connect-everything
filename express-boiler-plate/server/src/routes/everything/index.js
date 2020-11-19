const router = require('express').Router();
const form = require('./form');

router.use('/form', form);

module.exports = router;