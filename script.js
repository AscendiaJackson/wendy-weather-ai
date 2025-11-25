async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) return;

    const apiKey = "YOUR_API_KEY_HERE"; // Replace with real API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    document.getElementById("weatherResult").classList.remove("hidden");

    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = `Temperature: ${data.main.temp}°F`;
    document.getElementById("condition").innerText = `Conditions: ${data.weather[0].description}`;
    document.getElementById("wind").innerText = `Wind: ${data.wind.speed} mph`;
    document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;

    const condition = data.weather[0].main.toLowerCase();
    document.getElementById("wendyMessage").innerText = wendyLine(condition);
}

function wendyLine(condition) {
    if (condition.includes("rain")) return "Looks rainy — bring something waterproof and don’t let it ruin your vibe.";
    if (condition.includes("cloud")) return "Cloudy skies today. Soft light, calm mood — not a bad day at all.";
    if (condition.includes("clear")) return "Clear skies! Perfect for getting outside and vibing with the sun.";
    if (condition.includes("storm")) return "Storm incoming. Be smart, stay safe, and let me guide you through it.";
    if (condition.includes("snow")) return "Snow today — dress warm and enjoy the stillness.";
    return "I've got you covered — whatever the weather is doing, I’ll guide you.";
}
