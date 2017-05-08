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

router.get('/', (req, res) => {
    res.send(`
<html>
<body>
    <h1>J.W.T. (Json Web Token)</h1>
    <ul>
        <li><a href="/jwt/v1">JWT V1</a></li>
        <li><a href="/jwt/v2">JWT V2</a></li>
        <li><a href="/jwt/v3">JWT V3</a></li>
    </ul>
</body>
</html>
`);
});

module.exports = router;
