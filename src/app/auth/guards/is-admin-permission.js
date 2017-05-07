/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

module.exports = (req) => {

    return req.user != null && req.user.isAdmin === true;

};
