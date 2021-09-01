let timeDate = document.querySelector("#time");
let now = new Date();
let days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let currentMonth = months[now.getMonth()];
let currentDay = days[now.getDay()];
let date = now.getDate();
let currentHour = now.getHours();
let currentMinute = now.getMinutes();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
timeDate.innerHTML = `${currentDay}, ${currentMonth} ${date},  ${currentHour}:${currentMinute}`;

let findCity = document.querySelector("#search-form");
findCity.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  let place = document.querySelector("#current-city");
  let searchCity = document.querySelector("#search-location");
  place.innerHTML = searchCity.value;
  let city = searchCity.value;
  let apiKey = "a906446d03e88c127f9d85a4e9cd44be";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperature(response) {
  let place = document.querySelector("#current-city");
  let searchCity = response.data.name;
  place.innerHTML = searchCity;

  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#temperature");
  currentTemp.innerHTML = `${temperature}°C`;
  console.log(response.data);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a906446d03e88c127f9d85a4e9cd44be";
  let apiCoordUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiCoordUrl).then(showTemperature);
}
function currentData(position) {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#geo-button");
locationButton.addEventListener("click", currentData);
