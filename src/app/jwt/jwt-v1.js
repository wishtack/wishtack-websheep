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

const { isAuthenticatedGuard, isOwnerGuard } = require('./guards');
const { userStore } = require('../user/user-store');

const router = express.Router();

/* Dirty set of JWT HMAC secret. */
process.env.JWT_HMAC_SECRET = 'MY_INSECURE_JWT_HMAC_SECRET';

router.use(bodyParser.json());

router.get('/', (req, res) => res.render('jwt/jwt-v1', {
    title: 'JWT V1'
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
        process.env.JWT_HMAC_SECRET,
        { algorithm: 'HS256'}
    );

    res.send({
        userId: user.id,
        token: token
    });

});


router.get(
    '/users/:userId',
    isAuthenticatedGuard,
    isOwnerGuard,
    (req, res) => {

        let userId = req.params.userId;

        let user = userStore.getUserById({userId: userId});

        if (user == null) {
            res.send(404);
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
