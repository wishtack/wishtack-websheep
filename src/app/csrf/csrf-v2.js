/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const { isAuthorizedGuard } = require('./is-authorized-guard');

const router = express.Router();

let todoList = [
    {
        id: '0',
        title: 'Todo 1'
    },
    {
        id: '1',
        title: 'Todo 2'
    }
];

router.use(cors());

/*
 * This is an ugly deprecated shortcut for:
 * router.use(bodyParser.json());
 * router.use(bodyParser.urlencoded({extended: false}));
 */
router.use(bodyParser());

router.get('/', (req, res) => res.render('csrf/csrf-v2', {
    title: 'C.S.R.F. V2'
}));

router.get('/todos', isAuthorizedGuard, (req, res) => res.send({
    data: todoList
}));

router.post('/todos', isAuthorizedGuard, (req, res) => {

    let todo = req.body;

    todo.id = todoList.length.toString();

    todoList.push(todo);

    res.send(todo);

});

module.exports = router;
