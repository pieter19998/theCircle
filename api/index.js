const mongoose = require('mongoose');
const app = require('./app');
const http = require('http');
const httpsServer = http.createServer(app);

const PORT = process.env.PORT || 3000;
httpsServer.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
});

mongoose.connect('mongodb://localhost:27017/thecircle', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => {
        console.log('MongoDB connection success');
        app.emit('databaseConnected')
    })
    .catch(err => {
        console.log('MongoDB connection failed');
        console.log(err)
    });
