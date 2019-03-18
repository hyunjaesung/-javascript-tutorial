const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  // 생성자호출하면서 오브젝트 생성, 함수 호출된 시점의 시간 딱 들어가는거 최근시간 확인하려면 다시 함수호출필요
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours > 9 ? hours : `0${hours}`}:${
    minutes > 9 ? minutes : `0${minutes}`
  }:${seconds > 9 ? seconds : `0${seconds}`}`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}

init();
