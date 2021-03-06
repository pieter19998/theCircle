const express = require('express');
const router = express.Router();
const Logger = require('../helpers/logger')
const Checker = require('../helpers/checkers')
const {Topic} = require('../schema/schema')
const cryp = require('../helpers/cryp')
const route = "topic";

//create topic
router.post('/', async (req, res, next) => {
    const title = req.body.topic;
    const description = req.body.description;
    const hash = req.body.hash;
    const cert = req.body.cert;
    req.body.status = 0;
    try {
        await Checker.checkUndefined([{item: title, field: "topic"}, {
            item: description,
            field: "description"
        }, {item: hash, field: "hash"}, {item: cert, field: "cert"}]);
        const publicKey = await cryp.checkCert(cert);
        const data = {topic: title, description: description}
        await cryp.checkHash(data, hash, publicKey.key);
        const topic = new Topic({
            topic: title,
            description: description,
            author: publicKey.fullName,
            creationDate: Date.now(),
            status: 0
        });
        await topic.save();
        req.body.hash = Buffer.from(hash).toString('base64')
        await Logger(publicKey.fullName, route, "POST", req.body)
        res.status(200).end();
    } catch (e) {
        return next(e)
    }
});

//get Topic
router.get('/:id', async function (req, res, next) {
    try {
        const topic = await Topic.findOne({_id: req.params.id, status: 0}).populate('reply').where({status: 0});
        res.status(200).send(topic);
    } catch (e) {
        return next(e)
    }
});

//get Topics
router.get('/', async function (req, res, next) {
    try {
        const topic = await Topic.find({status: 0})
        res.status(200).send(topic);
    } catch (e) {
        return next(e)
    }
});

module.exports = router;
