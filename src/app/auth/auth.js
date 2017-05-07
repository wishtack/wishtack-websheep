/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const express = require('express');

const authV1 = require('./auth-v1');
const authV2 = require('./auth-v2');

const router = express.Router();

router.use('/v1', authV1);
router.use('/v2', authV2);

router.get('/', (req, res) => {
    res.send(`
<html>
<body>
    <h1>Authentication & Authorization</h1>
    <ul>
        <li><a href="/auth/v1">Authentication & Authorization V1</a></li>
        <li><a href="/auth/v2">Authentication & Authorization V2</a></li>
    </ul>
</body>
</html>
`);
});

module.exports = router;
