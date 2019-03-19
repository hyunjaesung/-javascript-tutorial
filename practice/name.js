const form = document.querySelector(".js-name"),
  input = form.querySelector("input"),
  span = document.querySelector(".grid-name");

const USER_LS = "currentUser";
const SHOWING_ON = "show";

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  input.classList.remove(SHOWING_ON);
  saveName(currentValue);
}

function paintGreeting(name) {
  span.innerHTML = `Hi! ${name}`;
}

function saveName(name) {
  localStorage.setItem(USER_LS, name);
}

function askForName() {
  input.classList.add(SHOWING_ON);
  form.addEventListener("submit", handleSubmit);
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser == null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();
