
let todoList = [];

const API_URL = 'https://intense-everglades-20207.herokuapp.com/todo/';

//const API_URL = 'http://localhost:5000/todo/'


window.addEventListener('load', async () => {
    
    /*
    const ref = localStorage.getItem('todoListRef');
    if (ref) {
        todoList = JSON.parse(ref);
        todoList.forEach(t => {
            renderTodo(t);
        });
    }
    */
   loadTodoList();
   setInterval(function(){loadTodoList();}, 5000);
    
});

async function loadTodoList(){
    const response = await fetch(API_URL);
    todoList = await response.json();
    todoList.forEach(t => {
        renderTodo(t);
    }); 
}

async function  addTodo(text){
    const todo = {
        text,
        checked: false,
        id: Date.now(),
        "opcional": "valor"
    };

    todoList.push(todo);
    
    //console.log(todoList);

    const settings = {
        method: 'POST',
        body: JSON.stringify(todo),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
    }

    const response = await fetch(API_URL, settings);
    
    //passo2
    renderTodo(todo);

}

const form = document.querySelector('.js-form');

form.addEventListener('submit', event => {
    event.preventDefault();

    const input = document.querySelector('.js-todo-input');

    const text = input.value.trim();

    if(text != ''){
        addTodo(text);
        input.value = '';
        input.focus();
    }
});

function renderTodo(todo){
    const list = document.querySelector('.js-todo-list');

    const item = document.querySelector(`[data-key='${todo.id}']`);

    // deleted
    if (todo.deleted) {
        item.remove();
        return;
    }

    const isChecked = todo.checked ? 'done':'';
    const node = document.createElement('li');

    node.setAttribute('class', `todo-item ${isChecked}`);
    node.setAttribute('data-key', todo.id);

    node.innerHTML = `
        <input id="${todo.id}" type="checkbox"/>
        <label for="${todo.id}" class="tick js-tick"></label>
        <span>${todo.text}</span>
        <button class="delete-todo js-delete-todo">
        <svg><use href="#delete-icon"></use></svg>
        </button>
    `;

    if (item) {
        list.replaceChild(node, item);
      } else {
        list.append(node);
    }

    localStorage.setItem('todoListRef', JSON.stringify(todoList));

}

const list = document.querySelector('.js-todo-list');

list.addEventListener('click', event => {
    if(event.target.classList.contains('js-tick')){
        const itemKey = event.target.parentElement.dataset.key;
        toggleDone(itemKey);
    }

    if(event.target.classList.contains('js-delete-todo')){
        const itemKey = event.target.parentElement.dataset.key;
        deleteTodo(itemKey);
    }

});

async function toggleDone(key){

    const index = todoList.findIndex(item => item.id == Number(key));

    todoList[index].checked = !todoList[index].checked;

    const settings = {
        method: 'PUT',
        body: JSON.stringify(todoList[index]),
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        }
    }
    const response = await fetch(API_URL+todoList[index].id, settings);

    renderTodo(todoList[index]);
}

async function deleteTodo(key){
    const index = todoList.findIndex(item => item.id === Number(key));

    const todo = {
        deleted: true,
        ...todoList[index]
    }

    const settings = {
        method: 'DELETE'
    }
    const response = await fetch(API_URL+todo.id, settings);

    todoList = todoList.filter(item => item.id !== todo.id);
    
    localStorage.setItem('todoListRef', JSON.stringify(todoList));

    renderTodo(todo);

}