/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const express = require('express');

const router = express.Router();

router.use('/v1', require('./csrf-v1'));
router.use('/v2', require('./csrf-v2'));
router.use('/v3', require('./csrf-v3'));

router.get('/', (req, res) => {
   res.send(`
<html>
<body>
    <h1>C.S.R.F. (Cross-Site Request Forgery)</h1>
    <ul>
        <li><a href="/csrf/v1/todos">C.S.R.F. V1</a></li>
        <li><a href="/csrf/v2/todos">C.S.R.F. V2</a></li>
        <li><a href="/csrf/v3/todos">C.S.R.F. V3</a></li>
    </ul>
</body>
</html>
`);
});

module.exports = router;
