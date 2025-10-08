const api_key = "3a0701e90892ea199793df56b489235b";
const defaultCity = "San Francisco";

document.addEventListener("DOMContentLoaded", async () => {
  let weatherInfo = await getWeather(defaultCity);
  updateUI(weatherInfo);
});

let searchBtn = document.querySelector(".fa-solid");
let searchInput = document.querySelector("#search");
searchBtn.addEventListener("click", searchWeather);
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    searchWeather();
  }
});
async function searchWeather() {
  let result;
  let inputVal = document.querySelector("#search");
  let value = inputVal.value;
  console.log(value);
  let weatherInfo = await getWeather(value);
  updateUI(weatherInfo);
}
function updateUI(weatherInfo) {
  if (!weatherInfo) {
    document.querySelector(".current-temp").textContent = "City not found!";
    return;
  }

  let cityName = document.querySelector(".cityName");
  let temp = document.querySelector(".temp_in_C");
  let icon = document.querySelector(".icon");
  let condition = document.querySelector(".condition");
  let humidity = document.querySelector(".humidity");
  let windSpeed = document.querySelector(".wind");

  const iconCode = weatherInfo.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  icon.innerHTML = `<img src="${iconUrl}" alt="weather icon">`;

  cityName.textContent = weatherInfo.name;
  temp.textContent = `${weatherInfo.main.temp}°C`;
  condition.textContent = weatherInfo.weather[0].main;
  humidity.textContent = `${weatherInfo.main.humidity}%`;
  windSpeed.textContent = `${weatherInfo.wind.speed} mph`;
}
async function getWeather(city) {
  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
  try {
    let response = await fetch(URL);
    let data = await response.json();

    if (Number(data.cod) !== 200) {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    console.error(err.message);
    return null;
  }
}
