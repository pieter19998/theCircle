const fs = require('fs');
async function log(user, route, action, data){
    fs.appendFile('log.txt', `${user} | ${action} | ${route} | ${JSON.stringify(data)} | ${new Date(Date.now())} \n`, async function (err) {
        if (err) throw err;
    });
}
module.exports = log
