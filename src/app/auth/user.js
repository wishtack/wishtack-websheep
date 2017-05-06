/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

class User {

    constructor(args = {}) {
        this.id = args.id;
        this.firstName = args.firstName;
        this.lastName = args.lastName;
        this.username = args.username;
        this.password = args.password;
        this.token = args.token;
        this.address = args.address;
    }

}

module.exports = {
    User: User
};
