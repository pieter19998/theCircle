const config = require("../config/config");
const jwt = require("jwt-simple");
const moment = require("moment");

const encode = (email, publicKey, userId) => {
    return new Promise(resolve => {
        const payload = {
            exp: moment()
                .add(1, "days")
                .unix(),
            iat: moment().unix(),
            email: email,
            publicKey: publicKey,
            id: userId
        };
        resolve(jwt.encode(payload, config.local.key));
    })
};

const decode = (token) => {
    return new Promise((resolve, reject) => {
        if (token === undefined) {
            reject({message: "no token supplied"})
        }
        try {
            let key = jwt.decode(token, config.local.key);
            resolve(key);
        } catch (e) {
            reject({message: "invalid token"})
        }
    })
};

module.exports = {
    encode, decode
};
