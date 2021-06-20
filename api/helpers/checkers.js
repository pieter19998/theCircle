const emailRegex = (email) => {
    return new Promise((resolve, reject) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(email)) {
            resolve();
        } else {
            reject({message : "invalid email"});
        }
    });
};

const checkUndefined = (array) =>{
    return new Promise((resolve, reject) => {
        array.forEach(async function(item){
            if (item.item === undefined) return reject({message : item.field + " is missing"})
        });
        resolve();
    });
};

const checkLength = (array) =>{
    return new Promise((resolve, reject) => {
        array.forEach(async function(item){
            if (item.item.length > item.length)
            {
                const exceeded = item.item.length - item.length;
                return reject({message : "field " + item.field + " has exceeded the character limit with " + exceeded.toString() +  " characters"});
            }
        });
        resolve();
    });
};

const checkHash = (data, signature, publicKey) =>{
    return new Promise((resolve, reject) => {
        const NodeRSA = require('node-rsa');
        const key = new NodeRSA(publicKey);
        if (key.verify(data, signature,'sha256','base64')) resolve()
        reject({message : "integrity check failed"});
    });
};

module.exports = {
    emailRegex,checkUndefined,checkLength,checkHash
};
