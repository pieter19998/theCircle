const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(async function (req, res, next) {
    await res.header("Access-Control-Allow-Origin", "*");
    await res.header("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE");
    await res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    await next();
});

const UserController = require('./controllers/userController');
const TopicController = require('./controllers/topicController');
const ReplyController = require('./controllers/replyController');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api/user', UserController);
app.use('/api/topic', TopicController);
app.use('/api/reply', ReplyController);

//fallback
app.all("*", function (req, res) {
    res.status(404);
    res.json({
        description: "Unknown endpoint"
    });
});

app.use((err, req, res, next) => {
    switch (err) {
        case err.message.includes("not found"):
            res.status(404).send({error: err.message});
            break;
        case err.message.includes("token"):
            res.status(401).send({error: err.message});
            break;
        default:
            res.status(422).send({error: err.message});
            break;
    }
});

module.exports = app;
