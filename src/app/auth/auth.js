/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const express = require('express');

const router = express.Router();

router.use('/v1', require('./auth-v1'));
router.use('/v2', require('./auth-v2'));

router.get('/', (req, res) => res.render('auth/auth', {
    title: 'Authentication & Authorization'
}));


module.exports = router;
