const apiKey = "833a8bb62df08119f1384e62dc07e6d3"; 
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.querySelector(".weather-card");
const errorText = document.getElementById("error");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value.trim();
  if (city === "") {
    showError("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=Cebu&appid=833a8bb62df08119f1384e62dc07e6d3&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError("City not found. Please try again.");
  }
}

function displayWeather(data) {
  const { name, main, weather } = data;
  document.getElementById("cityName").textContent = name;
  document.getElementById("temperature").textContent = `${main.temp}°C`;
  document.getElementById("description").textContent = weather[0].description;
  document.getElementById("humidity").textContent = `Humidity: ${main.humidity}%`;

  const iconCode = weather[0].icon;
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  weatherCard.classList.remove("hidden");
  errorText.textContent = "";
}

function showError(message) {
  errorText.textContent = message;
  weatherCard.classList.add("hidden");
}
