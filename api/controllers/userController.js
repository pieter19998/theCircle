const express = require('express');
const {User} = require('../schema/schema.js');
const router = express.Router();
const Logger = require('../helpers/logger')
const Checker = require('../helpers/checkers')
const crypt = require('../helpers/cryp')
const route = "user"

//register user
router.post('/register', async (req, res, next) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const publicKey = req.body.publicKey;
    req.body.status = 0;
    try {
        await Checker.checkUndefined([
            {item: fullName, field: "fullName"},
            {item: email, field: "email"},
            {item: publicKey, field: "publicKey"}
        ]);
        req.body.cert = await crypt.csr(req.body)
        const user = new User(req.body);
        await user.save();
        await Logger(fullName, route, "REGISTER", req.body)
        res.status(200).send({cert: req.body.cert});
    } catch (e) {
        console.log(e)
        return next(e)
    }
});
module.exports = router;
