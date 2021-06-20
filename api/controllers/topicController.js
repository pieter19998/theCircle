const express = require('express');
const router = express.Router();
const Logger = require('../helpers/logger')
const Checker = require('../helpers/checkers')
const {Topic} = require('../schema/schema')
const Jwt = require("../helpers/jwt");
const route = "topic";

//create topic
router.post('/', async (req, res, next) => {
    const title = req.body.topic;
    const description = req.body.description;
    const hash = req.body.hash;
    const token = req.header('token');
    req.body.status = 0;
    try {
        await Checker.checkUndefined([{item: title, field: "topic"}, {item: description, field: "description"}, {item: hash, field: "hash"}]);
        const decoded = await Jwt.decode(token);
        const data = {topic: title, description: description}
        await Checker.checkHash(data, hash, decoded.publicKey);
        await Logger(decoded.email ,route,"POST", req.body)
        const topic = new Topic({
            topic: title,
            description: description,
            author: decoded._id,
            status: 0
        });
        await topic.save();
        res.status(200).end();
    } catch (e) {
        return next(e)
    }
});

//get Topic
router.get('/:id', async function (req, res, next) {
    const token = req.header('token');
    try {
        await Jwt.decode(token);
        const topic = await Topic.findOne({_id: req.params.id, status: 0}).select({"status": 0, "comment": 0});
        res.status(200).send(topic);
    } catch (e) {
        return next(e)
    }
});

module.exports = router;
