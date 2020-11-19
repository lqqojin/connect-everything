const router = require('express').Router();
const createError = require('http-errors');

const form = (req, res) => {
    const params = req.body;
    console.log(params);

    return res.json(params);
}

router.post('/', form);

module.exports = router;
