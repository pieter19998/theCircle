const express = require('express');
const router = express.Router();
const Logger = require('../helpers/logger')
const Checker = require('../helpers/checkers')
const {Reply} = require('../schema/schema')
const Jwt = require("../helpers/jwt");
const route = "reply";

//create topic
router.post('/:id', async (req, res, next) => {
    const topic = req.body.topic;
    const description = req.body.description;
    const token = req.header('token');
    try {
        await Checker.checkUndefined([{item: topic, field: "topic"}, {item: description, field: "description"}]);
        const decoded = await Jwt.decode(token);
        await Logger(decoded.email ,route,"POST", req.body)
        console.log(decoded)
        const topic = new Topic({
            topic: topic,
            description: description,
            author: decoded._id
        });
        await topic.save();
        res.status(200).end();
    } catch (e) {
        return next(e)
    }
});

module.exports = router;
