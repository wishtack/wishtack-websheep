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
const { anyPermissionGuard, isAdminPermission, isAuthenticatedGuard } = require('./guards');
const { User } = require('../user/user');
const { userStore } = require('../user/user-store');
const { config } = require('../config');

const router = express.Router();

router.use(bodyParser.json());

router.get('/', (req, res) => res.render('auth/auth-v2', {
    shouldShowSolution: config.shouldShowSolution(),
    title: 'Authentication & Authorization V2'
}));

if (config.shouldShowSolution()) {
    router.get('/solution', (req, res) => res.render('auth/auth-v2-solution', {
        title: 'Authentication & Authorization V2 - Solution'
    }));
}

router.use('/tokens', tokensRouter);

const isUserOwnerPermission = (req) => req.user != null && req.params.userId === req.user.id;

router.get(
    '/users/:userId',
    isAuthenticatedGuard,
    anyPermissionGuard(isAdminPermission, isUserOwnerPermission),
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

router.patch(
    '/users/:userId',
    isAuthenticatedGuard,
    anyPermissionGuard(isAdminPermission, isUserOwnerPermission),
    (req, res) => {

        if (Object.entries(req.body).length === 0) {
            res
                .status(400)
                .send({
                    errors: [
                        {
                            type: 'content-type-missing',
                            message: 'Body is empty... did you set the right content type 😉?'
                        }
                    ]
                });
            return;
        }

        let userId = req.params.userId;

        let user = userStore.getUserById({userId: userId});

        if (user == null) {
            res.sendStatus(404);
            return;
        }

        /* Disallow id modification. */
        delete req.body.id;

        user = Object.assign(new User(), user, req.body);

        userStore.updateUser({user: user});

        res.send({
            id: user.id,
            address: user.address,
            firstName: user.firstName,
            lastName: user.lastName
        });

    }
);

module.exports = router;
