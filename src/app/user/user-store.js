/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

const { User } = require('./user');

class UserStore {

    constructor() {
        this._userList = [
            new User({
                id: 'foobar',
                firstName: 'Foo',
                isAdmin: false,
                lastName: 'BAR',
                username: 'foobar',
                password: '123456',
                token: '33^2Emh2#11OUW74Yamk%goTr7NQD8g5wwEvOY!Q',
                address: 'Somewhere in Lyon'
            }),
            new User({
                id: 'johndoe',
                firstName: 'John',
                isAdmin: false,
                lastName: 'DOE',
                username: 'johndoe',
                password: '654321',
                token: 'DVQH1uMj4qrkCO*R@u1zoSz#VzG2tK5xyYHAy9eM',
                address: 'Somewhere around Strasbourg'
            })
        ];
    }

    getUserById({userId}) {
        return this._userList.find((user) => user.id === userId);
    }

    getUserByToken({token}) {
        return this._userList.find((user) => user.token === token);
    }

    getUserByUsername({username}) {
        return this._userList.find((user) => user.username === username);
    }

    getUserList() {
        return this._userList;
    }

    updateUser({user}) {

        /* Enforcing immutability. */
        this._userList = this._userList.map((_user) => {

            /* Replacing on match. */
            if (_user.id === user.id) {
                return user;
            }

            return _user;

        });

    }

}

const userStore = new UserStore();

module.exports = {
    userStore: userStore
};
