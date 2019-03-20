const todo = document.querySelector(".js-todo"),
  ul = todo.querySelector("ul"),
  todoform = todo.querySelector(".todo-form"),
  todoinput = todoform.querySelector("input");

TODOS_LS = "todos";
let todoList = [];
let newID = 0;
let emptyID = 0;

function deleteTodo(event) {
  const li = event.target.parentNode;
  ul.removeChild(li);
  const cleanTodo = todoList.filter(todo => todo.id != li.id);
  //console.log(cleanTodo);
  emptyID = li.id;
  todoList = cleanTodo;
  saveTodo();
}

function saveTodoList(text) {
  const todoObj = {
    text: text,
    id: newID
  };
  todoList.push(todoObj);
  emptyID = 0;
  saveTodo();
}

function saveTodo() {
  localStorage.setItem(TODOS_LS, JSON.stringify(todoList));
}

function loadTodo() {
  const loadToDos = localStorage.getItem(TODOS_LS);
  if (loadToDos != null) {
    // 다시 오브젝트화 시키는거 필요
    const parsedTodos = JSON.parse(loadToDos);
    parsedTodos.forEach(function(todo) {
      console.log("foreach");
      paintToDo(todo.text);
    });
  }
}

function inputhandler(event) {
  event.preventDefault();
  const currentValue = todoinput.value;
  console.log(currentValue);
  paintToDo(currentValue);
  saveTodoList(currentValue);
  todoinput.value = "";
}

function paintToDo(value) {
  const li = document.createElement("li");
  const delbtn = document.createElement("button");
  const span = document.createElement("span");
  delbtn.innerText = "X";
  if (emptyID == 0) {
    newID = todoList.length + 1;
  } else {
    newID = emptyID;
  }

  li.id = newID;
  delbtn.addEventListener("click", deleteTodo);
  span.innerText = value;
  li.appendChild(delbtn);
  li.appendChild(span);
  ul.appendChild(li);
}

function getToDo() {
  todoform.addEventListener("submit", inputhandler);
}

function init() {
  getToDo();
  loadTodo();
}

init();
