const mongoose = require('mongoose');
// open a connection to the test database (don't use production database!)
before(done => {
    mongoose.connect('mongodb://localhost/thecircletest');
    mongoose.connection
        .once('open', () => done())
        .on('error', error => {
            console.warn('Warning', error);
        });
});

//clean databases
beforeEach(async function () {
    const {users, topics, replies} = mongoose.connection.collections;
    await users.drop(() => {
    })
    await topics.drop(() => {
    })
    await replies.drop(() => {
    })
});
