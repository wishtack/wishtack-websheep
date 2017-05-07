/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const express = require('express');

const jwtV1 = require('./jwt-v1');

const router = express.Router();

router.use('/v1', jwtV1);

router.get('/', (req, res) => {
    res.send(`
<html>
<body>
    <h1>J.W.T. (Json Web Token)</h1>
    <ul>
        <li><a href="/jwt/v1">JWT V1</a></li>
    </ul>
</body>
</html>
`);
});

module.exports = router;
