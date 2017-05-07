/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');

const auth = require('./auth/auth');
const csrf = require('./csrf/csrf');
const jwt = require('./jwt/jwt');

const app = express();

app.use(cookieParser());

app.use('/auth', auth);
app.use('/csrf', csrf);
app.use('/jwt', jwt);

app.get('/', (req, res) => {

    const id_token = req.cookies.id_token;

    if (id_token == null) {
        res.cookie('id_token', 'TOKEN');
    }

    res.send(`
<html>
<head>
    <title>Websheep</title>
</head>
<body>
    <h1>Welcome to Websheep</h1>
    <ul>
        <li><a href="/auth">Authentication & Authorization</a></li>
        <li><a href="/csrf">C.S.R.F. (Cross-Site Request Forgery)</a></li>
        <li><a href="/jwt">J.W.T. (Json Web Token)</a></li>
    </ul>
</body>
</html>
`);

});

app.listen(3000, function () {
    console.log('Websheep listening on port 3000!')
});
