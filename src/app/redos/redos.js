/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.redirect('/redos/topics/redos-vulnerability-challenge'));

router.get('/topics/:topic((?:(?:[-a-z0-9]|\\w)+))', (req, res) => res.render('redos/redos', {
    title: 'ReDoS',
    topic: req.params.topic.replace(/-/g, ' ')
}));

module.exports = router;
