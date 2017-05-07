/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

module.exports = (req, res, next) => {

    if (req.user == null || req.params.userId !== req.user.id) {
        res.sendStatus(403);
        return;
    }

    next();

};
