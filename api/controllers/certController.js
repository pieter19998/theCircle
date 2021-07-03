const express = require('express');
const router = express.Router();
const cryp = require("../helpers/cryp");

//get Topics
router.get('/', async function (req, res, next) {
    try {
        res.status(200).send({cert: await cryp.getCert()});
    } catch (e) {
        return next(e)
    }
});

module.exports = router;
