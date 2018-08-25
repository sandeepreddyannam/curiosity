const todos = JSON.parse(localStorage.getItem('myTodos')) || [];
let count = 0;

function addTodo (todo) {
    todo.target && todos.push({text: todo.target.value, index: count}); // if you add todo it will push, otherwise just displays todos from storage
    const displayNode = document.querySelector('.display');
    const newTodo = document.createElement('div');
    newTodo.className = 'row'
    displayNode.appendChild(newTodo);

    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'control';
    const spanNode = document.createElement('div');
    spanNode.className = 'control-indicator'
    const labelNode = document.createElement('label');
    labelNode.className = 'checkbox'

    checkBox.addEventListener('change', changeTodo.bind(this, count));

    labelNode.appendChild(checkBox);
    labelNode.appendChild(spanNode);
    newTodo.appendChild(labelNode);

    const todoNode = document.createElement('li');
    if (todo.target) {
        todoNode.innerText = todo.target.value || todo.text;
        todo.target.value = '';
    } else {
        todoNode.innerText = todo.text;
        checkBox.checked = todo.done;
    }
    
    if (todo.done) {
        todoNode.classList.add('strike');
    }
    newTodo.appendChild(todoNode);

    const closeNode = document.createElement('span');
    closeNode.className = 'close'
    closeNode.addEventListener('click', deleteTodo.bind(this, count));
    newTodo.appendChild(closeNode);

    todo.target && localStorage.setItem('myTodos', JSON.stringify(todos));
    console.log('add or display', todos, JSON.parse(localStorage.getItem('myTodos')));
    count++;
}

function changeTodo(changeIndex, e) {
    todos[changeIndex].done = !todos[changeIndex].done;
    console.log('change todos', todos, e);
    localStorage.setItem('myTodos', JSON.stringify(todos));
    e.target.parentElement.nextSibling.classList.toggle('strike');

}

function displayTodos () {
    const displayItems = JSON.parse(localStorage.getItem('myTodos'));
    displayItems && displayItems.map((item) => {
        addTodo(item);
    })
}

function deleteTodo(deleteIndex, e) {
    todos.splice(deleteIndex, 1);
    console.log('delete', todos);
    localStorage.setItem('myTodos', JSON.stringify(todos));
    e.target.parentElement.style.display = 'none';
}

document.getElementById('clear').onclick = function () {
    localStorage.clear();
    window.location.reload();
}