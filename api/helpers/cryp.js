const forge = require('node-forge');
const fs = require('fs');
const path = require('path');
let location = fs.readFileSync(path.join(__dirname, '../config/server.crt'));
const theCircleCert = forge.pki.certificateFromPem(location);

//verify certificate
const checkCert = (cert) => {
    return new Promise((resolve, reject) => {
        try {
            const certificateFromPem = forge.pki.certificateFromPem(cert);
            theCircleCert.verify(certificateFromPem)
            resolve({key: certificateFromPem.publicKey, fullName: certificateFromPem.subject.attributes[0].value});
        } catch (e) {
            reject({message: "cert check failed"});
            console.log(e)
        }
    });
};
//verify digital signature
const checkHash = (data, hash, key) => {
    return new Promise((resolve) => {
        const md = forge.md.sha256.create();
        md.update(data, 'utf8');
        if (key.verify(md.digest().bytes(), hash)) resolve()
    })
}

//create certificate
const csr = (data) => {
    return new Promise((resolve, reject) => {
        try {
            const cert = forge.pki.createCertificate();
            cert.publicKey = forge.pki.publicKeyFromPem(data.publicKey);
            cert.serialNumber = '01';
            cert.validity.notBefore = new Date();
            cert.validity.notAfter = new Date();
            cert.validity.notAfter.setFullYear(cert.validity.notBefore.getFullYear() + 1);
            const attrs = [{
                name: 'commonName',
                value: data.fullName
            }, {
                name: 'countryName',
                value: 'NL'
            }, {
                shortName: 'ST',
                value: 'Noord-Brabant'
            }, {
                name: 'localityName',
                value: 'Breda'
            }, {
                name: 'organizationName',
                value: 'thecircle'
            }, {
                shortName: 'OU',
                value: 'thecircle'
            }];
            cert.setSubject(attrs);
            cert.setIssuer(theCircleCert.subject.attributes);
            const pkey = fs.readFileSync(path.join(__dirname, '../config/private.pem'));
            const privateKey = forge.pki.privateKeyFromPem(pkey);
            cert.sign(privateKey);
            const pem = forge.pki.certificateToPem(cert);
            resolve(pem)
        } catch (e) {
            console.log(e)
            reject(e)
        }
    });
};

module.exports = {
    checkCert, csr, checkHash
};
