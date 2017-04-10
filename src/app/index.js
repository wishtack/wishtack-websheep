/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');

const csrf = require('./csrf/csrf');

const app = express();

app.use(cookieParser());

app.use('/csrf', csrf);

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
    <a href="/csrf">CSRF</a>
</body>
</html>
`);

});

app.listen(3000, function () {
    console.log('Websheep listening on port 3000!')
});
