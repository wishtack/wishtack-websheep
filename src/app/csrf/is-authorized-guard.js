/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const { userStore } = require('../user/user-store');

module.exports = {
    isAuthorizedGuard: (req, res, next) => {

        if (req.cookies['id_token'] !== userStore.getUserById({userId: 'foobar'}).token) {
            res.status(403);
            res.send({
                'errors': [
                    {
                        type: 'forbidden'
                    }
                ]
            });
            return;
        }

        next();

    }
};
