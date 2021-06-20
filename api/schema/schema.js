const mongoose = require('mongoose');
const {Schema} = require("mongoose");

const topicSchema = new mongoose.Schema({
    topic: {type: String, required: [true, 'A topic needs a  ']},
    description: {type: String, required: [true, 'A topic needs a  ']},
    status: {type: Number, required: [true, 'A topic needs a status']},
    author: { type: Schema.Types.ObjectId, ref: 'user'},
    replies: [{ type: Schema.Types.ObjectId, ref: 'reply' }]
});

const replySchema = new mongoose.Schema({
    text: {type: String, required: [true, 'A reply needs text.']},
    author: { type: Schema.Types.ObjectId, ref: 'user'},
    status: {type: Number, required: [true, 'A reply needs a status']},
});

const userSchema = new mongoose.Schema({
    fullName: {type: String, required: [true, 'A user needs a fullName.']},
    password: {type: String, required: [true, 'A user needs a password.']},
    status: {type: Number, required: [true, 'A user needs a status']},
    email: {type: String, required: [true, 'A user needs a email.'], unique: true}
});

User = mongoose.model('user', userSchema);
Reply = mongoose.model('reply', replySchema);
Topic = mongoose.model('topic', topicSchema);
module.exports = {Topic,Reply, User};
