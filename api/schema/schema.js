const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const topicSchema = new mongoose.Schema({
    topic: {type: String, required: [true, 'A topic needs a topic']},
    description: {type: String, required: [true, 'A topic needs a description']},
    status: {type: Number, required: [true, 'A topic needs a status']},
    author: {type: String, ref: 'user', required: [true, 'A topic needs a author']},
    reply: [{type: Schema.Types.ObjectId, ref: 'reply'}],
    creationDate: {type: Date}
});

const replySchema = new mongoose.Schema({
    text: {type: String, required: [true, 'A reply needs text.']},
    author: {type: String, required: [true, 'A reply needs a author']},
    status: {type: Number, required: [true, 'A reply needs a status']},
    creationDate: {type: Date}
});

const userSchema = new mongoose.Schema({
    fullName: {type: String, required: [true, 'A user needs a fullName.']},
    status: {type: Number, required: [true, 'A user needs a status']},
    cert: {type: String, required: [true, 'A user needs a status']},
    email: {type: String, required: [true, 'A user needs a email.'], unique: true}
});

User = mongoose.model('user', userSchema);
Reply = mongoose.model('reply', replySchema);
Topic = mongoose.model('topic', topicSchema);
module.exports = {Topic, Reply, User};
