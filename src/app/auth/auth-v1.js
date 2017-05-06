/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const { isAuthenticatedGuard } = require('./is-authenticated-guard');
const { userStore } = require('./user-store');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, res) => res.sendFile(`${__dirname}/auth-v1.html`));

router.post('/tokens', (req, res) => {

    let {username, password} = req.body;

    let user = userStore.getUserByUsername({username: username});

    if (user == null || user.password !== password) {
        res.send(403);
        return;
    }

    res.send({
        userId: user.id,
        token: user.token
    });

});

router.get('/users/:userId', isAuthenticatedGuard, (req, res) => {

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
