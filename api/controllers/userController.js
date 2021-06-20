const express = require('express');
const {User} = require('../schema/schema.js');
const router = express.Router();
const Logger = require('../helpers/logger')
const Checker = require('../helpers/checkers')
const Bcrypt = require("bcrypt");
const Jwt = require("../helpers/jwt");
const route = "user"

//register user
router.post('/register', async (req, res, next) => {
    const fullName = req.body.fullName;
    const email = req.body.email;
    const password = req.body.password;
    req.body.status = 0;
    try {
        await Checker.checkUndefined([
            {item: fullName, field: "fullName"},
            {item: password, field: "password"},
            {item: email, field: "email"}
        ]);
        await Checker.emailRegex(email);
        req.body.password = Bcrypt.hashSync(password, 10);
        const user = new User(req.body);
        await user.save();
        await Logger(email, route, "REGISTER", req.body)
        res.status(200).send({token: await Jwt.encode(email, user._id)});
    } catch (e) {
        return next(e)
    }
});

//login user
router.post('/login', async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const publicKey = req.body.publicKey;
    try {
        await Checker.checkUndefined([
            {item: password, field: "password"},
            {item: email, field: "email"},
            {item: publicKey, field: "publicKey"}
        ]);
        const user = await User.findOne({email: email})
        await Logger(email, route, "LOGIN", "")
        if (await Bcrypt.compareSync(password, user.password)) {
            res.status(200).send({token: await Jwt.encode(email, publicKey, user._id)});
        } else {
            res.status(401).end();
        }
    } catch (e) {
        return next(e)
    }
});
module.exports = router;
