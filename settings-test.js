/**
 * Settings Test Utility
 * ---------------------
 * This script demonstrates how the user settings functionality works
 * to format temperature and wind speed according to user preferences.
 *
 * Usage: Use Node.js to run this script locally:
 *  node settings-test.js
 */

// Default settings
const defaultSettings = {
    temperatureUnit: "celsius",
    windSpeedUnit: "kph",
    theme: "dark",
    defaultLocation: null,
    notifications: {
        severe: true,
        precipitation: false,
        temperature: false,
    },
};

// Sample temperature and wind speed values
const celsiusTemp = 22.5;
const kphWindSpeed = 15.7;

// Format temperature based on settings
function formatTemperature(celsius, settings, includeUnit = true) {
    if (settings.temperatureUnit === "fahrenheit") {
        const fahrenheit = (celsius * 9) / 5 + 32;
        return includeUnit
            ? `${Math.round(fahrenheit)}°F`
            : Math.round(fahrenheit);
    }
    return includeUnit ? `${Math.round(celsius)}°C` : Math.round(celsius);
}

// Format wind speed based on settings
function formatWindSpeed(kph, settings, includeUnit = true) {
    if (settings.windSpeedUnit === "mph") {
        const mph = kph / 1.60934;
        return includeUnit ? `${Math.round(mph)} mph` : Math.round(mph);
    }
    return includeUnit ? `${Math.round(kph)} km/h` : Math.round(kph);
}

// Test with default settings (celsius, kph)
console.log("\n===== Testing with Default Settings =====");
console.log(
    `Default Settings: Temperature unit = ${defaultSettings.temperatureUnit}, Wind speed unit = ${defaultSettings.windSpeedUnit}`
);
console.log(
    `Temperature (${celsiusTemp}°C): ${formatTemperature(
        celsiusTemp,
        defaultSettings
    )}`
);
console.log(
    `Wind Speed (${kphWindSpeed} km/h): ${formatWindSpeed(
        kphWindSpeed,
        defaultSettings
    )}`
);

// Test with custom settings (fahrenheit, mph)
const customSettings = {
    ...defaultSettings,
    temperatureUnit: "fahrenheit",
    windSpeedUnit: "mph",
};

console.log("\n===== Testing with Custom Settings =====");
console.log(
    `Custom Settings: Temperature unit = ${customSettings.temperatureUnit}, Wind speed unit = ${customSettings.windSpeedUnit}`
);
console.log(
    `Temperature (${celsiusTemp}°C): ${formatTemperature(
        celsiusTemp,
        customSettings
    )}`
);
console.log(
    `Wind Speed (${kphWindSpeed} km/h): ${formatWindSpeed(
        kphWindSpeed,
        customSettings
    )}`
);

console.log("\n===== Comparison =====");
console.log("Original temperature:", celsiusTemp, "°C");
console.log(
    "As Celsius:",
    formatTemperature(celsiusTemp, {
        ...defaultSettings,
        temperatureUnit: "celsius",
    })
);
console.log(
    "As Fahrenheit:",
    formatTemperature(celsiusTemp, {
        ...defaultSettings,
        temperatureUnit: "fahrenheit",
    })
);

console.log("\nOriginal wind speed:", kphWindSpeed, "km/h");
console.log(
    "As km/h:",
    formatWindSpeed(kphWindSpeed, { ...defaultSettings, windSpeedUnit: "kph" })
);
console.log(
    "As mph:",
    formatWindSpeed(kphWindSpeed, { ...defaultSettings, windSpeedUnit: "mph" })
);
