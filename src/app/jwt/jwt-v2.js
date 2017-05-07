/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');

const { isAuthenticatedGuard, isAuthenticatedWithVerificationGuard, isOwnerGuard } = require('./guards');
const { userStore } = require('../auth/user/user-store');

const router = express.Router();

/* Dirty set of JWT HMAC secret. */
process.env.JWT_HMAC_SECRET = 'MY_INSECURE_JWT_HMAC_SECRET';

router.use(bodyParser.json());

router.get('/', (req, res) => res.sendFile(`${__dirname}/jwt-v2.html`));

router.use('/tokens', (req, res) => {

    let {username, password} = req.body;
    let token;

    try {

        let user = userStore.getUserByUsername({username: username});

        if (user.password !== password) {
            res.sendStatus(403);
            return;
        }

        token = jwt.sign(
            { sub: user.id },
            process.env.JWT_HMAC_SECRET,
            { algorithm: 'HS256'}
        );

        res.send({
            userId: user.id,
            token: token
        });

    }
    catch(error) {
        res.status(500);
        res.send({
            errors: [
                {
                    type: 'technical-error',
                    environment: process.env
                }
            ]
        });
    }

});


router.get(
    '/users/:userId',
    isAuthenticatedWithVerificationGuard,
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

module.exports = router;
