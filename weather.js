/*
  weather.js - Weather API integration

  KEY CONCEPTS YOU'LL LEARN:
  1. API calls using fetch() - how to request data from external services
  2. async/await - how to handle operations that take time
  3. Loading states - showing users something is happening
  4. Error handling - gracefully dealing with problems
  5. try/catch - catching errors so the app doesn't crash

  We're using Open-Meteo API: https://open-meteo.com/
  It's free and doesn't require an API key!
*/

// ============================================
// STEP 1: Get references to HTML elements
// ============================================
const citySelect = document.getElementById('city-select');
const weatherLoading = document.getElementById('weather-loading');
const weatherError = document.getElementById('weather-error');
const weatherContent = document.getElementById('weather-content');
const currentWeatherDiv = document.getElementById('current-weather');
const forecastDiv = document.getElementById('forecast');
const retryButton = document.getElementById('retry-button');

// ============================================
// STEP 2: Helper function to show/hide states
// ============================================
// This pattern is called "state management" - only one state shows at a time

function showLoading() {
    weatherLoading.style.display = 'block';
    weatherError.style.display = 'none';
    weatherContent.style.display = 'none';
}

function showError() {
    weatherLoading.style.display = 'none';
    weatherError.style.display = 'block';
    weatherContent.style.display = 'none';
}

function showContent() {
    weatherLoading.style.display = 'none';
    weatherError.style.display = 'none';
    weatherContent.style.display = 'block';
}

// ============================================
// STEP 3: Weather code to emoji mapping
// ============================================
// The API returns weather codes (numbers), we convert to friendly icons

function getWeatherEmoji(weatherCode) {
    // Weather codes from Open-Meteo documentation
    const weatherEmojis = {
        0: '☀️',   // Clear sky
        1: '🌤️',   // Mainly clear
        2: '⛅',   // Partly cloudy
        3: '☁️',   // Overcast
        45: '🌫️',  // Foggy
        48: '🌫️',  // Depositing rime fog
        51: '🌧️',  // Light drizzle
        53: '🌧️',  // Moderate drizzle
        55: '🌧️',  // Dense drizzle
        61: '🌧️',  // Slight rain
        63: '🌧️',  // Moderate rain
        65: '🌧️',  // Heavy rain
        71: '🌨️',  // Slight snow
        73: '🌨️',  // Moderate snow
        75: '🌨️',  // Heavy snow
        77: '🌨️',  // Snow grains
        80: '🌦️',  // Slight rain showers
        81: '🌦️',  // Moderate rain showers
        82: '🌦️',  // Violent rain showers
        85: '🌨️',  // Slight snow showers
        86: '🌨️',  // Heavy snow showers
        95: '⛈️',  // Thunderstorm
        96: '⛈️',  // Thunderstorm with slight hail
        99: '⛈️',  // Thunderstorm with heavy hail
    };
    return weatherEmojis[weatherCode] || '🌡️';
}

function getWeatherDescription(weatherCode) {
    const descriptions = {
        0: 'Clear sky',
        1: 'Mainly clear',
        2: 'Partly cloudy',
        3: 'Overcast',
        45: 'Foggy',
        48: 'Foggy',
        51: 'Light drizzle',
        53: 'Drizzle',
        55: 'Dense drizzle',
        61: 'Light rain',
        63: 'Rain',
        65: 'Heavy rain',
        71: 'Light snow',
        73: 'Snow',
        75: 'Heavy snow',
        77: 'Snow grains',
        80: 'Rain showers',
        81: 'Rain showers',
        82: 'Heavy showers',
        85: 'Snow showers',
        86: 'Heavy snow showers',
        95: 'Thunderstorm',
        96: 'Thunderstorm with hail',
        99: 'Severe thunderstorm',
    };
    return descriptions[weatherCode] || 'Unknown';
}

// ============================================
// STEP 4: Format day names for the forecast
// ============================================
function formatDayName(dateString, index) {
    if (index === 0) return 'Today';
    if (index === 1) return 'Tomorrow';

    const date = new Date(dateString);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
}

// ============================================
// STEP 5: The main API fetch function
// ============================================
/*
  async/await explained:
  - "async" marks a function that will do something that takes time
  - "await" pauses execution until that thing completes
  - This makes asynchronous code read like normal sequential code
*/

async function fetchWeather(lat, lon) {
    // Show loading state while we wait for data
    showLoading();

    // Build the API URL with our coordinates
    // The API needs to know: where (lat/lon), what data (temperature, etc.), and units
    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=auto&forecast_days=10`;

    /*
      try/catch explained:
      - Code in "try" block runs normally
      - If ANY error occurs, execution jumps to "catch" block
      - This prevents the app from crashing on errors
    */
    try {
        // fetch() sends a request to the API and returns a "Response" object
        // "await" waits for the network request to complete
        const response = await fetch(apiUrl);

        // Check if the request was successful (status 200-299)
        if (!response.ok) {
            // "throw" creates an error that jumps to the catch block
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse the JSON response into a JavaScript object
        // This also needs "await" because parsing takes time
        const data = await response.json();

        // Success! Display the weather data
        displayWeather(data);
        showContent();

    } catch (error) {
        // Something went wrong - log it and show error state
        console.error('Failed to fetch weather:', error);
        showError();
    }
}

// ============================================
// STEP 6: Display the weather data
// ============================================
function displayWeather(data) {
    // --- Current Weather ---
    const current = data.current;
    const today = data.daily;

    currentWeatherDiv.innerHTML = `
        <div class="weather-icon">${getWeatherEmoji(current.weather_code)}</div>
        <div class="current-temp">${Math.round(current.temperature_2m)}°F</div>
        <div class="current-details">
            <h3>${getWeatherDescription(current.weather_code)}</h3>
            <p>High: ${Math.round(today.temperature_2m_max[0])}°F · Low: ${Math.round(today.temperature_2m_min[0])}°F</p>
        </div>
    `;

    // --- 10-Day Forecast ---
    // Use map() to transform each day's data into HTML
    const forecastHTML = today.time.map((date, index) => {
        return `
            <div class="forecast-day">
                <div class="day-name">${formatDayName(date, index)}</div>
                <div class="day-icon">${getWeatherEmoji(today.weather_code[index])}</div>
                <div class="day-temps">
                    <span class="temp-high">${Math.round(today.temperature_2m_max[index])}°</span>
                    <span class="temp-low">${Math.round(today.temperature_2m_min[index])}°</span>
                </div>
            </div>
        `;
    }).join('');

    forecastDiv.innerHTML = forecastHTML;
}

// ============================================
// STEP 7: Populate the city dropdown
// ============================================
function populateCityDropdown() {
    // Create an <option> element for each city
    usCities.forEach((city, index) => {
        const option = document.createElement('option');
        option.value = index;  // Store the array index as the value
        option.textContent = city.name;
        citySelect.appendChild(option);
    });
}

// ============================================
// STEP 8: Event listeners - respond to user actions
// ============================================

// When user selects a different city
citySelect.addEventListener('change', function() {
    const selectedCity = usCities[this.value];
    fetchWeather(selectedCity.lat, selectedCity.lon);
});

// When user clicks "Try Again" after an error
retryButton.addEventListener('click', function() {
    const selectedCity = usCities[citySelect.value];
    fetchWeather(selectedCity.lat, selectedCity.lon);
});

// ============================================
// STEP 9: Initialize - run when page loads
// ============================================
function initWeather() {
    populateCityDropdown();

    // Load weather for the first city (New York)
    const defaultCity = usCities[0];
    fetchWeather(defaultCity.lat, defaultCity.lon);
}

// Start the weather widget
initWeather();

console.log('Weather widget initialized');
