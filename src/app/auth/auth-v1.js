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
const { userStore } = require('../user/user-store');
const { config } = require('../config');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, res) => res.render('auth/auth-v1', {
    title: 'Authentication & Authorization V1',
    shouldShowSolution: config.shouldShowSolution()
}));

if (config.shouldShowSolution()) {
    router.get('/solution', (req, res) => res.render('auth/auth-v1-solution', {
        title: 'Authentication & Authorization V1 - Solution'
    }));
}

router.use('/tokens', tokensRouter);

router.get('/users/:userId', isAuthenticatedGuard, (req, res) => {

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
