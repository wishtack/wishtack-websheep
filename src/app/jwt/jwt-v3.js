/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const rsaPemToJwk = require('rsa-pem-to-jwk');

const { isAuthenticatedWithRsaVerificationGuard, isOwnerGuard } = require('./guards');
const { userStore } = require('../user/user-store');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, res) => res.render('jwt/jwt-v3', {
    title: 'JWT V3'
}));

router.use('/tokens', (req, res) => {

    let {username, password} = req.body;
    let token;

    let user = userStore.getUserByUsername({username: username});

    if (user == null || user.password !== password) {
        res.sendStatus(403);
        return;
    }

    token = jwt.sign(
        { sub: user.id },
        fs.readFileSync(`${__dirname}/private.pem`),
        { algorithm: 'RS256'}
    );

    res.send({
        userId: user.id,
        token: token
    });

});


router.get(
    '/users/:userId',
    isAuthenticatedWithRsaVerificationGuard,
    isOwnerGuard,
    (req, res) => {

        let userId = req.params.userId;

        let user = userStore.getUserById({userId: userId});

        if (user == null) {
            res.sendStatus(404);
            return;
        }

        res.send({
            id: user.id,
            address: user.address,
            firstName: user.firstName,
            lastName: user.lastName
        });

    });

router.get('/key', (req, res) => {
    res.send(rsaPemToJwk(fs.readFileSync(`${__dirname}/private.pem`), 'public'));
});

module.exports = router;
