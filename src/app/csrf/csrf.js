/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const express = require('express');
const { userStore } = require('../user/user-store');

const router = express.Router();


router.use('/v1', require('./csrf-v1'));
router.use('/v2', require('./csrf-v2'));
router.use('/v3', require('./csrf-v3'));

router.get('/', (req, res) => {

    const id_token = req.cookies.id_token;

    if (id_token == null) {
        res.cookie('id_token', userStore.getUserById({userId: 'foobar'}).token);
    }

   res.render('csrf/csrf', {
        title: 'C.S.R.F. (Cross-Site Request Forgery)'
   });

});


module.exports = router;
