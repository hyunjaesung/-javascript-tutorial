const weather = document.querySelector(".js-weather");

const API_KEY = "2886beb8d4cc803f97d6dea5a2121b47";

const COORDS = "COORDS";

function getWeather(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(json) {
      console.log(json);
      const temp = json.main.temp;
      const location = json.name;
      weather.innerText = `${temp} @ ${location}`;
    });
}

function handleSuccess(position) {
  console.log(position);
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const geoObj = {
    latitude: latitude,
    longitude: longitude
  };
  console.log(geoObj);
  localStorage.setItem(COORDS, JSON.stringify(geoObj));
}

function handleError() {
  console.log("Can't find");
}

function getGeography() {
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
}

function loadCoords() {
  const coords = localStorage.getItem(COORDS);
  if (coords == null) {
    getGeography();
  } else {
    const parsedcoords = JSON.parse(coords);
    getWeather(parsedcoords.latitude, parsedcoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();
