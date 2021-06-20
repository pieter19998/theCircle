const encrypt = (data, key) => {
    return new Promise(resolve => {
        const encrypted = key.encrypt(data, "base64");
        resolve(encrypted);
    })
}

const decrypt = (data, key) => {
    return new Promise(resolve => {
        const decrypted = key.decrypt(data);
        resolve(decrypted);
    })
}
module.exports = {encrypt, decrypt}
