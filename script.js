// ------------------------------
// FETCH WEATHER
// ------------------------------

async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) return;

    const apikey = "YOUR_API_KEY_HERE"; // <--- replace with your real API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apikey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById("wendyMessage").innerText =
                "I couldn't find that city — try again, babe.";
            return;
        }

        // Reveal card
        document.getElementById("weatherResult").classList.remove("hidden");

        // Insert data
        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temp").innerText = `Temperature: ${data.main.temp}°F`;
        document.getElementById("condition").innerText = `Conditions: ${data.weather[0].description}`;
        document.getElementById("wind").innerText = `Wind: ${data.wind.speed} mph`;
        document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;

        // Wendy personality line
        const condition = data.weather[0].main.toLowerCase();
        document.getElementById("wendyMessage").innerText = wendyLine(condition);

    } catch (err) {
        document.getElementById("wendyMessage").innerText =
            "Something broke — but not me. Try again.";
    }
}

// ------------------------------
// WENDY PERSONALITY RESPONSES
// ------------------------------

function wendyLine(condition) {
    if (condition.includes("rain"))
        return "Looks rainy — bring waterproof and don’t let it ruin your vibe.";
    if (condition.includes("cloud"))
        return "Cloudy skies today. Soft light, calm mood — not a bad day at all.";
    if (condition.includes("clear"))
        return "Clear skies! Perfect for getting outside and vibing with the sun.";
    if (condition.includes("storm"))
        return "Storm incoming. Be smart, stay safe, and let me guide you through it.";
    if (condition.includes("snow"))
        return "Snow today — dress warm and enjoy the stillness.";

    return "I’ve got you covered — whatever the weather is doing, I’ll guide you.";
}

// ------------------------------
// WENDY INTRO ANIMATION
// ------------------------------

function playWendyIntro() {
    const storm = document.querySelector('.storm-overlay');
    const light = document.querySelector('.sunlight');
    const reveal = document.getElementById('wendy-reveal');

    if (!storm || !light || !reveal) {
        console.warn("Intro animation elements missing.");
        return;
    }

    // Step 1 — storm visible (default)
    storm.style.opacity = 1;
    light.style.opacity = 0;
    reveal.style.opacity = 0;

    // Step 2 — sunlight begins pushing through
    setTimeout(() => {
        storm.style.opacity = 0.3;
        light.style.opacity = 1;
    }, 4000);

    // Step 3 — Wendy fades in
    setTimeout(() => {
        reveal.style.opacity = 1;
    }, 9000);

    // Step 4 — storm fully clears
    setTimeout(() => {
        storm.style.opacity = 0;
        light.style.opacity = 0.2;
    }, 14000);
}

// Randomize clouds each load
function randomizeClouds() {
    const clouds = document.querySelectorAll(".cloud");

    clouds.forEach(cloud => {
        // Random vertical offset (stormy height)
        cloud.style.top = `${20 + Math.random() * 20}%`;

        // Random opacity variation
        cloud.style.opacity = 0.7 + Math.random() * 0.3;

        // Flip horizontally sometimes (different silhouettes)
        if (Math.random() > 0.5) {
            cloud.style.transform = "scaleX(-1)";
        }
    });
}

// Run both when page loads
window.onload = () => {
    playWendyIntro();
    randomizeClouds();
};
