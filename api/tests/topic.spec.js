const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const forge = require('node-forge');
const app = require('../app');
const Topic = mongoose.model('topic');
const cert = "-----BEGIN CERTIFICATE-----MIICfjCCAWagAwIBAgIBATANBgkqhkiG9w0BAQUFADAUMRIwEAYDVQQDDAl0aGVjaXJjbGUwHhcNMjEwNjI4MTUxODQ0WhcNMjIwNjI4MTUxODQ0WjB1MRYwFAYDVQQDEw1waWV0ZXIgbW91cmlrMQswCQYDVQQGEwJOTDEWMBQGA1UECBMNTm9vcmQtQnJhYmFudDEOMAwGA1UEBxMFQnJlZGExEjAQBgNVBAoTCXRoZWNpcmNsZTESMBAGA1UECxMJdGhlY2lyY2xlMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDB5/0cEDkqqCGWKVX9tuJYbOd5UjECJwL4ALfbqkszTN/CEdw1BwI1FRs6AmSWj4d0wlQH74H7MKIJm/jEHEY779kZrWLRWUi8ShTL5WV319xe8CrYNlsSTepBlIk0q2kGBq2mjjFhFgaXkTIS5XwL/rtJhaoD658vGYhlI+XEtQIDAQABMA0GCSqGSIb3DQEBBQUAA4IBAQAaM/ybvI9MF35GR07VvQJw99XtZJllPmgNRS/TaTam9lNStvQG8oU2gEADBaJDj7VKDDgqVpGK7SH43htUZRkDzrYF/tkJtbJJ794slJrLtFdeprKEu1UpJ4eSZfK058jGwOV6HCCuCkR6uoWtocj7XN65U5dyJ7PSCAqF2QsaewQTj1QW/EI+VRXwVzBK6ufWehyD6qewyI/x87b519OEED3+XtKxT6mDvXRChwQ9vCBg6+meTSOwbumOqUL1T6E16+V9qvDOE7d0YV9q4cN4x2ayZp0i3MV3Gikrz7W4MbFWug1C707r4B4V3t17em0+ewc1aO4VtW53p+2oKou/-----END CERTIFICATE-----";
const privateKey = "-----BEGIN RSA PRIVATE KEY-----MIICXQIBAAKBgQDB5/0cEDkqqCGWKVX9tuJYbOd5UjECJwL4ALfbqkszTN/CEdw1BwI1FRs6AmSWj4d0wlQH74H7MKIJm/jEHEY779kZrWLRWUi8ShTL5WV319xe8CrYNlsSTepBlIk0q2kGBq2mjjFhFgaXkTIS5XwL/rtJhaoD658vGYhlI+XEtQIDAQABAoGAVlLpI601RgBDs44DckgQzDzvb9tfZg3oDHCFaY2OnPAETWmWFyVfnjIfRNv72+tZ6mj47+94dlNYT97YCLZtrUrUz95+0mXBxn8gjRPOKCEGkj8hw4T8RiLlJ20HEAI/ylqEU7RnqO1BNHgmlkw15ettaEUr38O2/ImCOPMPyAECQQDjzeKf2oHTmy3G5dZxTzgrvBZ1hUeYKzirJy3aDtrMqFyOhhaW6ZHGDxexJpBg87/UU5qJ18h4kUq/NPeKLjD1AkEA2egGGSBGN1/QWN1JFllAB8/PsbbhNl7sYpNBDhfS386pGR9dfVKkqTxYafNgYOgqLgakXJVUgzXCp7D5343swQJBAKGh335UZ3Fg1WYehbz33H8LgVP5MQdDA35M2jex+oTjoGhvs294YjoJU2IaXq6rxBw/BZNwS4lgbYylZE3i4FECQAgwdyI0m07zc+ITFu8XFZf1kGmuZNJlSN7/h79e19b/bk16Z0oRdAzELtJ0ihe6QfOO3lh4aD+yIomo1gs3y0ECQQCB5izg6o+5JHQi707WtRmKaN/bJMmH5oZMp3vjQEd/WZKFCQBinjCYOexp6LwsMPzK8isX7wsVzvIt4moBBugJ-----END RSA PRIVATE KEY-----"

describe('Topic controller', () => {
    it('Post to /api/topic invalid certification', async function () {
        const md = forge.md.sha256.create();
        md.update({topic: "testTopic", description: "testDescription"}, 'utf8');
        const key = forge.pki.privateKeyFromPem(privateKey)
        const hash = key.sign(md);
        await request(app)
            .post('/api/topic')
            .send({topic: "testTopic", description: "testDescription", hash: hash, cert: "aaaaaa"})
            .expect(422);
    });

    it('Post to /api/topic missing data', async function () {
        const md = forge.md.sha256.create();
        md.update({topic: "testTopic", description: "testDescription"}, 'utf8');
        const key = forge.pki.privateKeyFromPem(privateKey)
        const hash = key.sign(md);
        await request(app)
            .post('/api/topic')
            .send({topic: "testTopic", hash: hash, cert: "aaaaaa"})
            .expect(422);
    });

    it('Post to /api/topic invalid hash', async function () {
        const md = forge.md.sha256.create();
        md.update({topic: "sss", description: "sss"}, 'utf8');
        const key = forge.pki.privateKeyFromPem(privateKey)
        const hash = key.sign(md);
        const result = await request(app)
            .post('/api/topic')
            .send({topic: "testTopic", description: "testDescription", hash: hash, cert: cert})
            .expect(200);

    });

    it('Post to /api/topic valid request', async function () {
        const md = forge.md.sha256.create();
        md.update({topic: "testTopic", description: "testDescription"}, 'utf8');
        const key = forge.pki.privateKeyFromPem(privateKey)
        const hash = key.sign(md);
        await request(app)
            .post('/api/topic')
            .send({topic: "testTopic", description: "testDescription", hash: hash, cert: cert})
            .expect(200);
        const topic = await Topic.findOne({topic: "testTopic", description: "testDescription"});
        await assert(topic.topic === "testTopic")
        await assert(topic.description === "testDescription")
    });

    it('Get to /api/topic/', async function () {
        const md = forge.md.sha256.create();
        md.update({topic: "testTopic", description: "testDescription"}, 'utf8');
        const key = forge.pki.privateKeyFromPem(privateKey)
        const hash = key.sign(md);
        await request(app)
            .post('/api/topic')
            .send({topic: "testTopic", description: "testDescription", hash: hash, cert: cert})
            .expect(200);
        const result = await request(app)
            .get('/api/topic/')
            .expect(200);
        assert(result !== null)
    });
    it('Get to /api/topic/:id', async function () {
        const md = forge.md.sha256.create();
        md.update({topic: "testTopic", description: "testDescription"}, 'utf8');
        const key = forge.pki.privateKeyFromPem(privateKey)
        const hash = key.sign(md);
        await request(app)
            .post('/api/topic')
            .send({topic: "testTopic", description: "testDescription", hash: hash, cert: cert})
            .expect(200);
        const id = await Topic.findOne({topic: "testTopic", description: "testDescription"});
        const result = await request(app)
            .get('/api/topic/' + id._id)
            .expect(200);
        assert(result !== null)
    });
});
