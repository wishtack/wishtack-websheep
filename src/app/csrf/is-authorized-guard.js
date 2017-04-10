/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

module.exports = {
    isAuthorizedGuard: (req, res, next) => {

        if (req.cookies['id_token'] !== 'TOKEN') {
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
