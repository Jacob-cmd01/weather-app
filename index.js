let results = document.querySelector(".results");

function renderData(d) {
    const safeGet = (value, defaultValue = 'N/A') => {
        return value !== undefined ? value : defaultValue;
    };
    

    const directions = [
        "North",       // 0°
        "NorthEast",   // 45°
        "East",        // 90°
        "SouthEast",   // 135°
        "South",       // 180°
        "SouthWest",   // 225°
        "West",        // 270°
        "NorthWest"    // 315°
    ];

    
    const loc = safeGet(d.resolvedAddress)
    const feelsLikeF = safeGet(d.days[0].feelslike); 
    const C = (5/9)*(parseFloat(feelsLikeF)-32);
    const feelsLikeC = Math.round(C * 10) / 10;
    const humidity = safeGet(d.days[0].humidity); 
    const windSpeed = safeGet(d.days[0].windspeed); 
    const conditions = safeGet(d.days[0].conditions); 
    const windDirectionDegrees = safeGet(d.days[0].winddir); 
    const windDirection = directions[Math.round(parseInt(windDirectionDegrees) / 45) % 8]

    return `
        <strong>Location:</strong> ${loc}<br>
        <strong>Feels like:</strong> ${feelsLikeF}°F or ${feelsLikeC}°C<br>
        <strong>Humidity:</strong> ${humidity}%<br>
        <strong>Wind Speed:</strong> ${windSpeed} mph<br>
        <strong>Conditions:</strong> ${conditions}<br>
        <strong>Wind Direction:</strong> ${windDirectionDegrees}° (${windDirection})<br>
    `;
}

function displayData(data) {
    results.innerHTML = data;
}

document.addEventListener("DOMContentLoaded", () => {
    let button = document.getElementById("btn");
    let key = "3SWMS5R8EZS6ZNHA73GRWV98M";

    button.addEventListener("click", () => {
        let location = document.getElementById("city").value.trim();
        let link = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${key}`;

        if (location) {
            fetch(link)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok or the address you entered does not exist.");
                    }
                    return response.json();
                })
                .then(data => displayData(renderData(data)))
                .catch(e => displayData(`<strong>Error: ${e.message}<strong>`));
        }
    });
});
