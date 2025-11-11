// 1️⃣ API Key
const apiKey = "833a8bb62df08119f1384e62dc07e6d3"; 

// 2️⃣ DOM Elements
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.querySelector(".weather-card");
const errorText = document.getElementById("error");
const darkModeToggle = document.getElementById("darkModeToggle");

// 3️⃣ Search Event (Button + Enter key)
searchBtn.addEventListener("click", getWeather);
cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") getWeather();
});

// 4️⃣ Fetch Weather Data
async function getWeather() {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name.");
    return;
  }

  errorText.textContent = "";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 401) throw new Error("Invalid API key.");
      if (response.status === 404) throw new Error("City not found.");
      throw new Error("Something went wrong. Please try again later.");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

// 5️⃣ Display Weather Data
function displayWeather(data) {
  const { name, main, weather } = data;
  const description = weather[0].description;
  const iconCode = weather[0].icon;

  document.getElementById("cityName").textContent = name;
  document.getElementById("temperature").textContent = `${main.temp}°C`;
  document.getElementById("description").textContent = description;
  document.getElementById("humidity").textContent = `Humidity: ${main.humidity}%`;
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  weatherCard.classList.remove("hidden");
  errorText.textContent = "";

  // 🎨 Change background dynamically
  changeBackground(weather[0].main);
}

// 6️⃣ Show Error Message
function showError(message) {
  errorText.textContent = message;
  weatherCard.classList.add("hidden");
  document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1350&q=80')";
  document.body.style.backgroundColor = "#bcdfff";
}

// 7️⃣ Change Background Based on Weather
function changeBackground(weatherType) {
  const lower = weatherType.toLowerCase();

  if (lower.includes("cloud")) {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501630834273-4b5604d2ee31?auto=format&fit=crop&w=1350&q=80')";
  } else if (lower.includes("rain")) {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80')";
  } else if (lower.includes("clear")) {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1350&q=80')";
  } else if (lower.includes("snow")) {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1608889175233-5b5e40194c5a?auto=format&fit=crop&w=1350&q=80')";
  } else if (lower.includes("thunderstorm")) {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1350&q=80')";
  } else if (lower.includes("mist") || lower.includes("fog")) {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1350&q=80')";
  } else {
    document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1350&q=80')";
  }

  // ✅ common style settings
  document.body.style.backgroundSize = "cover";
  document.body.style.backgroundPosition = "center";
  document.body.style.transition = "background-image 1s ease-in-out";
}

// 8️⃣ Dark Mode Toggle 🌙 / ☀️
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");

  // 🔸 Update button icon
  darkModeToggle.textContent = isDark ? "☀️" : "🌙";

  // Save user preference
  localStorage.setItem("theme", isDark ? "dark" : "light");
});

// 9️⃣ Load saved mode on page load
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    darkModeToggle.textContent = "☀️";
  } else {
    darkModeToggle.textContent = "🌙";
  }
});