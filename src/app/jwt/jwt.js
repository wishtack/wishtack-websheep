/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const express = require('express');

const router = express.Router();

router.use('/v1', require('./jwt-v1'));
router.use('/v2', require('./jwt-v2'));
router.use('/v3', require('./jwt-v3'));

router.get('/', (req, res) => res.render('jwt/jwt', {
    title: 'J.W.T. (Json Web Token)'
}));

module.exports = router;
