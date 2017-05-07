/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const tokensRouter = require('./tokens');
const { isAuthenticatedGuard } = require('./guards');
const { userStore } = require('./user/user-store');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, res) => res.sendFile(`${__dirname}/auth-v1.html`));

router.use('/tokens', tokensRouter);

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
