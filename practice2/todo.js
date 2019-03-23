const form = document.querySelector(".todo_form"), input = form.querySelector("input"), ul =document.querySelector(".todo_ul");

console.log(input);

const TODO_KEY = "TODO_KEY";

let todos = [];

function saveTodo(){
    localStorage.setItem(TODO_KEY, JSON.stringify(todos)); // set할때마다 새로 초기화
}


function inputHandler(event){
    event.preventDefault();
    console.log("inputhandling");
    const currentValue = input.value;
    const newID = todos.length + 1;
    
    paintTodo(currentValue);
    saveTodo();
    input.value = "";
}

function askForTodo(){
    form.addEventListener("submit", inputHandler);
}

function paintTodo(text){
    const todo = document.createElement("li");
    const delbtn = document.createElement("button");
    const span = document.createElement("span");
    span.innerText = text;
    delbtn.innerText = "X";
    delbtn.addEventListener("click", deleteBtn);
    ul.appendChild(todo);
    todo.appendChild(delbtn);
    todo.appendChild(span);
    const newID= todos.length + 1;
    todo.id = newID;

    const todoobj = {
        text : text,
        id : newID
    };
    todos.push(todoobj);
    todos.push()
    saveTodo();
}

function loadTodos(){
    console.log("loadtodo");
    const loadtodos = localStorage.getItem(TODO_KEY);
    if(loadtodos == null){
        askForTodo();
    }else{
        const parsedTodo = JSON.parse(loadtodos);
        parsedTodo.forEach(function(todo){
            paintTodo(todo.text);
        });
        todos = parsedTodo; // 재저장필요
        askForTodo();
    }
}

function deleteBtn(event){
    const target = event.target.parentNode;
    ul.removeChild(target);
    console.log(target.id);
    const filteredtodos = todos.filter(function(todo){
        return todo.id != target.id;
    });
    console.log(filteredtodos);
    todos = filteredtodos;
    saveTodo();
}

function init(){
    loadTodos();
}

init();