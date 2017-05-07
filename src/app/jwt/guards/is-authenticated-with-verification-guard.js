/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const jwt = require('jsonwebtoken');

const { userStore } = require('./../../auth/user/user-store');

module.exports = (req, res, next) => {

    let authorizationHeader = req.header('Authorization');
    let claims;
    let token;
    let user;

    if (authorizationHeader != null) {
        token = authorizationHeader.split(' ')[1];
    }

    try {
        claims = jwt.verify(token, process.env.JWT_HMAC_SECRET);
    }
    catch(error) {
        res.status(403);
        return;
    }

    user = userStore.getUserById({userId: claims.sub});

    if (user == null) {
        res.sendStatus(403);
        return;
    }

    req.user = user;

    next();

};
