const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const forge = require('node-forge');
const app = require('../app');

const User = mongoose.model('user');

describe('User controller', () => {
    it('Post to /api/register requires all fields', async function () {
        await request(app)
            .post('/api/user/register')
            .send({fullName: "User1"})
            .expect(422);
    });

    it('Post to /api/register invalid email', async function () {
        const keyPair = await forge.pki.rsa.generateKeyPair(1024)
        await request(app)
            .post('/api/user/register')
            .send({fullName: "User1", email: "invalidEmail", publicKey: keyPair.publicKey})
            .expect(422);
    });

    it('Post to /api/register invalid public key', async function () {
        await request(app)
            .post('/api/user/register')
            .send({fullName: "User1", email: "test@testuser.com", publicKey: "invalidKey"})
            .expect(422);
    });

    it('Post to /api/register valid request', async function () {
        const keyPair = await forge.pki.rsa.generateKeyPair(1024)
        const publicKey = await forge.pki.publicKeyToPem(keyPair.publicKey)
        await request(app)
            .post('/api/user/register')
            .send({fullName: "User1", email: "test@testuser.com", publicKey: publicKey})
            .expect(200);
        const user = await User.findOne({fullName: "User1", email: "test@testuser.com"});
        await assert(user.fullName === "User1")
        await assert(user.cert !== undefined)
    });
});
