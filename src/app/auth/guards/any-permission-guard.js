/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

module.exports = (...permissionList) => {
    return (req, res, next) => {

        for (let permission of permissionList) {
            if (permission(req) === true) {
                next();
                return;
            }
        }

        res.sendStatus(403);

    }
};
