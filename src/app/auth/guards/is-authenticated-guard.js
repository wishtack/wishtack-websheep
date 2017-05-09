/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const { userStore } = require('../../user/user-store');

module.exports = (req, res, next) => {

    let authorizationHeader = req.header('Authorization');
    let token;
    let user;

    if (authorizationHeader != null) {
        token = authorizationHeader.split(' ')[1];
    }

    user = userStore.getUserByToken({token: token});

    if (user == null) {
        res.sendStatus(403);
        return;
    }

    req.user = user;

    next();

};
