const bubbleContainer = document.querySelector('.bubble_container');
const todoTextInput = document.querySelector('#todo_text_inp');
const addForm = document.querySelector('.add_form');
const todoList = document.querySelector('.todo_list');
const selectBtn = document.querySelector('#open_select');
const options = document.querySelector('.options');
const selectBtn_I = document.querySelector('.fa-sort-up');
const optionsArr = document.querySelectorAll('.option');

addForm.addEventListener('submit', function addTodo(e){
    e.preventDefault();
    if (todoTextInput.value == "") return;
    showTodos(todoTextInput.value);
    saveInLocalStorage(todoTextInput.value);
    filterTodo(selectBtn.childNodes[0].innerHTML)
    todoTextInput.value = "";
})


let removeBtn;
let completeBtn;
let icons = ["<i class='fas fa-times'></i>", "<i class='fas fa-check'></i>"];

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('todos') != null){
        let todos = JSON.parse(localStorage.getItem('todos'));
        todos.forEach(text => { showTodos(text) });
    }

    //----add bubbles------------
    setInterval(() => {
        let item = document.createElement('div');
        item.innerHTML = icons[Math.round(Math.random())];
        let size = Math.round(Math.random() * (window.innerWidth / 1000 * 100)) + 1;
        item.style.fontSize = size + "px";
        item.style.left = Math.round(Math.random() * window.innerWidth) + 1 + "px";
        item.classList.add('bubble');
        bubbleContainer.appendChild(item);
    }, 100);
    setInterval(() => {
        for (let i = 0; i < bubbleContainer.children.length - 20; i++) {
            bubbleContainer.childNodes[i].remove()
        }
    }, 2000);
})

//----open/close dropdown filter-------
selectBtn.addEventListener('click', () => {
    selectBtn_I.classList.toggle('open');
    options.classList.toggle('hidden');
});


//----select option-----
optionsArr.forEach(option => {
    option.addEventListener('click', () => {
        selectBtn_I.classList.add('open');
        options.classList.toggle('hidden');
        selectBtn.childNodes[0].innerHTML = option.value;
        filterTodo(option.value);
    })
})



function showTodos(text) {
    let item = document.createElement('li');
    item.classList.add('todo_item');
    item.classList.add('uncompleted');
    let textSpan = document.createElement('span');
    textSpan.classList.add('text_span')
    textSpan.innerHTML = text;
    item.appendChild(textSpan);
    let controls = document.createElement('span');
    controls.innerHTML = "<i class='fas fa-check'></i>";
    controls.innerHTML += "<i class='fas fa-times'></i>";
    item.appendChild(controls);
    todoList.appendChild(item);

    removeTodo();
    completeTodo();
}



function removeTodo(){
    removeBtn = document.querySelectorAll('.fa-times');
    removeBtn[removeBtn.length - 1].addEventListener('click', (e) => {
        e.target.parentElement.parentElement.classList.add('fall');
        removeFromLocalStorage(e.target.parentElement.parentElement.childNodes[0].innerHTML);
        setTimeout(() => {
            e.target.parentElement.parentElement.remove();
        }, 300);
    })
}

function completeTodo() {
    completeBtn = document.querySelectorAll('.fa-check');
    completeBtn[completeBtn.length - 1].addEventListener('click', (e) => {
        e.target.parentElement.parentElement.classList.toggle('completed');
        e.target.parentElement.parentElement.classList.toggle('uncompleted');
    })
}

function filterTodo(value) {
    todoList.childNodes.forEach(item => {
        switch (value) {
            case 'All':
                item.style.display = "flex";
                break;
            case "Completed":
                if (item.classList.contains('completed')) item.style.display = "flex";
                else item.style.display = "none";
                break;
            case "Uncompleted":
                if (item.classList.contains('uncompleted')) item.style.display = "flex";
                else item.style.display = "none";
                break;
            default:
                item.style.display = "none";
                break;
        }
    })
}

function saveInLocalStorage(text) {
    let todos;
    if (localStorage.getItem('todos') == null) todos = [];
    else todos =JSON.parse(localStorage.getItem('todos'));
    todos.push(text);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function removeFromLocalStorage(text) {
    let todos;
    if (localStorage.getItem('todos') == null) todos = [];
    else todos = JSON.parse(localStorage.getItem('todos'));
    let index = todos.indexOf(text);
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}
