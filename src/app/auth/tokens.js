/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const express = require('express');

const { userStore } = require('./user/user-store');

const router = express.Router();

router.post('/', (req, res) => {

    let {username, password} = req.body;

    let user = userStore.getUserByUsername({username: username});

    if (user == null || user.password !== password) {
        res.sendStatus(403);
        return;
    }

    res.send({
        userId: user.id,
        token: user.token
    });

});

module.exports = router;