const form = document.querySelector(".js-form"),
  input = document.querySelector("input"),
  greetings = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHWING_ON = "showing";

function saveName(text) {
  console.log("savename!");
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(Event) {
  console.log("handlesubmit!");
  event.preventDefault();
  const currentValue = input.value;
  paintGreetings(currentValue);
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHWING_ON);
  form.addEventListener("submit", handleSubmit);
}

function paintGreetings(text) {
  form.classList.remove(SHWING_ON);
  greetings.classList.add(SHWING_ON);
  greetings.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser == null) {
    askForName();
  } else {
    paintGreetings(currentUser);
  }
}

function init() {
  loadName();
}

init();
