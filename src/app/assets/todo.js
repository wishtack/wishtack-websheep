/**
 *
 * (c) 2013-2017 Wishtack
 *
 * $Id: $
 */

'use strict';

class TodoStateStore {

    constructor() {
        this._callbackList = [];
        this._state = {};
    }

    onStateUpdate(callback) {
        this._callbackList.push(callback);
    }

    updateState({state}) {
        this._state = Object.assign({}, this._state, state);
        this._callbackList.forEach((callback) => callback({state: state}));
    }

}

class TodoFormComponent {
    
    constructor({apiBaseUrl, todoStateStore}) {
        this._apiBaseUrl = apiBaseUrl;
        this._todoStateStore = todoStateStore;
        this._todoStateStore.onStateUpdate(({state}) => this._render({state}));
    }
    
    _render({state}) {
        
        let containerElement = document.querySelector('#wt-todo-form');
        let element;

        containerElement.innerHTML = '';

        element = document.createElement('form');

        element.innerHTML = `
<input
        name="title"
        placeholder="Todo title..."
        type="text">

<button type="submit">ADD</button>
`;

        element.addEventListener('submit', (event) => {

            event.preventDefault();

            let todo = {
                title: event.target.querySelector('input[name="title"]').value
            };

            fetch(
                `${this._apiBaseUrl}/todos`,
                {
                    body: JSON.stringify(todo),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                })
                .then((response) => response.json())
                .then((todo) => {
                    this._todoStateStore.updateState({
                        state: {
                            todoList: [...state.todoList, todo]
                        }
                    });
                });

        });

        containerElement.appendChild(element);

    }
    
}

class TodoListComponent {

    constructor({apiBaseUrl, todoStateStore}) {
        this._apiBaseUrl = apiBaseUrl;
        this._todoStateStore = todoStateStore;
        this._todoStateStore.onStateUpdate(({state}) => this._render({state}));
    }

    start() {
        fetch(`${this._apiBaseUrl}/todos`, {
            credentials: 'include'
        })
            .then((response) => response.json())
            .then((data) => this._todoStateStore.updateState({
                state: {todoList: data.data}
            }));
    }
    
    _render({state}) {

        let containerElement = document.querySelector('#wt-todo-list');
        let ulElement = document.createElement('ul');

        containerElement.innerHTML = '';
        
        containerElement.appendChild(ulElement);
        
        state.todoList.forEach((todo) => {

            let element = document.createElement('li');

            element.textContent = todo.title;
            
            ulElement.appendChild(element);
            
        });

    }

}

document.addEventListener('DOMContentLoaded', () => {

    const todoStateStore = new TodoStateStore();

    new TodoFormComponent({apiBaseUrl: window.API_BASE_URL, todoStateStore});
    new TodoListComponent({apiBaseUrl: window.API_BASE_URL, todoStateStore}).start();

});
