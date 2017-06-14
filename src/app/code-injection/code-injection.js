/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();

const { config } = require('../config');

router.use(bodyParser.json());

router.get('/', (req, res) => res.render('code-injection/code-injection', {
    shouldShowSolution: config.shouldShowSolution(),
    title: 'Code Injection'
}));

if (config.shouldShowSolution()) {
    router.get('/solution', (req, res) => res.render('code-injection/code-injection-solution', {
        title: 'Code Injection - Solution'
    }));
}


router.post('/formulas', (req, res) => res.send({
    formula: req.body.formula,
    result: eval(req.body.formula).toString()
}));

module.exports = router;
