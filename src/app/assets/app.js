/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';


class State {

    constructor() {
        this.token = null;
        this.userCurrent = null;
    }

}

class StateStore {

    constructor() {
        this._callbackList = [];
        this._state = null;
    }

    onStateUpdate(callback) {
        this._callbackList.push(callback);
    }

    updateState({state}) {
        this._state = Object.assign(new State(), this._state, state);
        this._callbackList.forEach((callback) => callback({state: state}));
    }

}

class FormComponent {

    constructor({apiBaseUrl, stateStore} = {}) {
        this._apiBaseUrl = apiBaseUrl;
        this._stateStore = stateStore;
        this._stateStore.onStateUpdate(({state}) => this._render({state}));
    }

    _render({state}) {

        let containerElement = document.querySelector('#wt-user-form');
        let element;

        containerElement.innerHTML = '';

        /* User is signed in. */
        if (state.user != null) {
            return;
        }

        element = document.createElement('div');
        element.innerHTML = `
<h2>Signin form</h2>
<form>

    <input
        name="username"
        placeholder="Username"
        type="text">

    <input
        name="password"
        placeholder="Password"
        type="password">

    <button type="submit">SIGN IN</button>
    
</form>
`;
        element.querySelector('form').addEventListener('submit', (event) => {

            event.preventDefault();

            let username = event.target.querySelector('input[name="username"]').value;
            let password = event.target.querySelector('input[name="password"]').value;

            fetch(`${this._apiBaseUrl}/tokens`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            })
                .then((response) => response.json())
                .then((data) => {

                    let token = data.token;
                    let userId = data.userId;
                    let state = {
                        token: token,
                        userId: userId
                    };

                    if (token == null) {
                        throw new Error('Invalid credentials.');
                    }

                    this._stateStore.updateState({
                        state: state
                    });

                    return state;

                })
                .then((state) => {
                    return fetch(`${this._apiBaseUrl}/users/${encodeURIComponent(state.userId)}`, {
                        headers: {
                            'Authorization': `Bearer ${state.token}`
                        }
                    });
                })
                .then((response) => response.json())
                .then((user) => this._stateStore.updateState({
                    state: {
                        user: user
                    }
                }))
                .catch((error) => {
                    console.log(error);
                    alert('Try again please...');
                });

        });

        containerElement.appendChild(element);

    }

}

class UserInfoComponent {

    constructor({stateStore} = {}) {

        stateStore.onStateUpdate(({state}) => this._render({state}));

    }

    _render({state}) {


        let containerElement = document.querySelector('#wt-user-info');
        let element;

        containerElement.innerHTML = '';

        /* User is not signed in. */
        if (state.user == null) {
            return;
        }

        element = document.createElement('div');
        element.innerHTML = `
<h2>User info</h2>
<div>
    <span id="wt-first-name"></span>
    <span id="wt-last-name"></span>
</div>
<div id="wt-address"></div>
`;

        element.querySelector('#wt-first-name').textContent = state.user.firstName;
        element.querySelector('#wt-last-name').textContent = state.user.lastName;
        element.querySelector('#wt-address').textContent = state.user.address;

        containerElement.appendChild(element);

    }

}

const stateStore = new StateStore();
new FormComponent({apiBaseUrl: window.API_BASE_URL, stateStore: stateStore});
new UserInfoComponent({stateStore: stateStore});

document.addEventListener('DOMContentLoaded', () => {
    stateStore.updateState({state: new State()});
});
