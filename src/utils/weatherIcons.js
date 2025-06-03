// Weather icon mapping for Meteocons SVG icons
export const getWeatherIconName = (code, isDay = true) => {
    const iconMap = {
        0: isDay ? "clear-day" : "clear-night",
        1: isDay ? "partly-cloudy-day" : "partly-cloudy-night",
        2: isDay ? "partly-cloudy-day" : "partly-cloudy-night",
        3: "overcast",
        45: "fog",
        48: "fog",
        51: "drizzle",
        53: "drizzle",
        55: "drizzle",
        56: "sleet",
        57: "sleet",
        61: isDay ? "partly-cloudy-day-rain" : "partly-cloudy-night-rain",
        63: "rain",
        65: "rain",
        66: "sleet",
        67: "sleet",
        71: "snow",
        73: "snow",
        75: "snow",
        77: "snow",
        80: isDay ? "partly-cloudy-day-rain" : "partly-cloudy-night-rain",
        81: "rain",
        82: "rain",
        85: "snow",
        86: "snow",
        95: "thunderstorms",
        96: "thunderstorms-rain",
        99: "thunderstorms-rain",
    };

    return iconMap[code] || (isDay ? "clear-day" : "clear-night");
};

export const getWeatherIconUrl = (code, isDay = true) => {
    const iconName = getWeatherIconName(code, isDay);
    return `https://basmilius.github.io/weather-icons/production/fill/all/${iconName}.svg`;
};
