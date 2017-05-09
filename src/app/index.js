/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const express = require('express');
const expressHandlebars = require('express-handlebars');
const expressHandlebarsSections = require('express-handlebars-sections');
const cookieParser = require('cookie-parser');
const path = require('path');

const auth = require('./auth/auth');
const csrf = require('./csrf/csrf');
const jwt = require('./jwt/jwt');

const app = express();

app.engine('hbs', expressHandlebars({
    defaultLayout: 'layout',
    extname: '.hbs',
    helpers: {
        section: expressHandlebarsSections()
    },
    layoutsDir: __dirname
}));

app.set('view engine', 'hbs');
app.set('views', __dirname);


app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/auth', auth);
app.use('/csrf', csrf);
app.use('/jwt', jwt);

app.get('/', (req, res) => res.render('index', {
    title: 'Welcome to Websheep'
}));

app.listen(3000, function () {
    console.log('Websheep listening on port 3000!')
});
