const router = require('express').Router();
const everything = require('./everything');

router.use('/everything', everything);

module.exports = router;