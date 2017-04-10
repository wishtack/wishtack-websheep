/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const express = require('express');

const csrfV1 = require('./csrf-v1');
const csrfV2 = require('./csrf-v2');
const csrfV3 = require('./csrf-v3');

const router = express.Router();

router.use('/v1', csrfV1);
router.use('/v2', csrfV2);
router.use('/v3', csrfV3);

router.get('/', (req, res) => {
   res.send(`
<html>
<body>
    <h1>C.S.R.F. (Cross-Site Request Forgery)</h1>
    <ul>
        <li><a href="/csrf/v1/todos">V1</a></li>
        <li><a href="/csrf/v2/todos">V2</a></li>
        <li><a href="/csrf/v3/todos">V3</a></li>
    </ul>
</body>
</html>
`);
});

module.exports = router;
