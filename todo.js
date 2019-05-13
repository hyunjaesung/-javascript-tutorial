const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

let toDos = []; // 목록생성시 array에 저장되도로

function DeleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(toDo => toDo.id != li.id);
  // filter는 조건에 참인것것들만 담아서 다시 배열만들어줌
  toDos = cleanToDos; // 뺀거 새로 담아줌
  saveToDos(); // 다시 string형태로 저장
}

function loadToDos() {
  const loadToDos = localStorage.getItem(TODOS_LS);
  if (loadToDos != null) {
    const parsedToDos = JSON.parse(loadToDos);
    parsedToDos.forEach(function(todo) {
      paintToDo(todo.text);
    });
  }
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const checklist = document.createElement("li"); // js에서 html 태그 생성
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = " X ";
  delBtn.addEventListener("click", DeleteToDo);
  span.innerText = text;
  checklist.appendChild(delBtn);
  checklist.appendChild(span); //자식으로 만들기
  toDoList.appendChild(checklist); // ul 자식으로 li인 checklist 넣기
  checklist.id = newId;
  const toDoObj = {
    text: text,
    id: newId // 배열길이 +1
  };
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = ""; // 작성하고 엔터치면 창에있는것 다 사라지게
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
