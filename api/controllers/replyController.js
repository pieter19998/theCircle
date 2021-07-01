const express = require('express');
const router = express.Router();
const Logger = require('../helpers/logger')
const Checker = require('../helpers/checkers')
const {Topic, Reply} = require('../schema/schema')
const cryp = require("../helpers/cryp");
const route = "reply";

//create reply
router.post('/:id', async (req, res, next) => {
    const text = req.body.text;
    const hash = req.body.hash;
    const cert = req.body.cert;
    req.body.status = 0;
    try {
        await Checker.checkUndefined([{item: text, field: "text"}, {item: hash, field: "hash"} , {item: cert, field: "cert"}]);
        const publicKey = await cryp.checkCert(cert);
        const data = {text: text}
        await cryp.checkHash(data, hash, publicKey.key);
        req.body.hash = Buffer.from(hash).toString('base64')
        const topic = await Topic.findOne({_id: req.params.id});
        if (topic) {
            try {
                const reply = await new Reply({
                    text: text,
                    author: publicKey.fullName,
                    creationDate: Date.now(),
                    status: 0
                }).save();
                await Topic.updateOne({_id: req.params.id}, {
                    $push: {reply: reply._id}
                });
                await Logger(publicKey.fullName ,route,"POST", req.body)
                res.status(200).end();
            } catch (e) {
                res.status(400).end();
            }
        }
        await res.status(404).end();
    } catch (e) {
        return next(e)
    }
});

module.exports = router;
