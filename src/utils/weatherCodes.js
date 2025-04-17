export const weatherCodeMap = {
    0: { description: "Clear", icon: "/icons/clear.svg" },
    1: {
        description: "Mostly Clear",
        iconDay:
            "https://assets-v2.lottiefiles.com/a/584a51a0-1151-11ee-870f-73f0e4a25c18/OiRsquuDDf.lottie",
        iconNight:
            "https://assets-v2.lottiefiles.com/a/583b455c-1151-11ee-870b-13dd4c78db9c/9xWkK1I9gX.lottie",
    },
    2: { description: "Partly Cloudy", icon: "/icons/partly-cloudy.svg" },
    3: {
        description: "Overcast",
        iconDay:
            "https://assets-v2.lottiefiles.com/a/faf03308-1808-11ee-91d1-739f10e56c3d/YTDV6yU0Ta.lottie",
        iconNight:
            "https://assets-v2.lottiefiles.com/a/faf9adfc-1808-11ee-91dc-37f7d19587c4/vWJRK7XDvJ.lottie",
    },
    45: { description: "Fog", icon: "/icons/fog.svg" },
    48: { description: "Depositing Rime Fog", icon: "/icons/fog.svg" },
    51: { description: "Light Drizzle", icon: "/icons/drizzle.svg" },
    53: { description: "Moderate Drizzle", icon: "/icons/drizzle.svg" },
    55: { description: "Heavy Drizzle", icon: "/icons/drizzle.svg" },
    56: {
        description: "Light Freezing Drizzle",
        icon: "/icons/freezing-drizzle.svg",
    },
    57: {
        description: "Heavy Freezing Drizzle",
        icon: "/icons/freezing-drizzle.svg",
    },
    61: { description: "Light Rain", icon: "/icons/rain.svg" },
    63: { description: "Moderate Rain", icon: "/icons/rain.svg" },
    65: { description: "Heavy Rain", icon: "/icons/rain.svg" },
    66: {
        description: "Light Freezing Rain",
        icon: "/icons/freezing-rain.svg",
    },
    67: {
        description: "Heavy Freezing Rain",
        icon: "/icons/freezing-rain.svg",
    },
    71: { description: "Light Snow", icon: "/icons/snow.svg" },
    73: { description: "Moderate Snow", icon: "/icons/snow.svg" },
    75: { description: "Heavy Snow", icon: "/icons/snow.svg" },
    77: { description: "Snow Grains", icon: "/icons/snow.svg" },
    80: { description: "Light Rain Showers", icon: "/icons/showers.svg" },
    81: { description: "Moderate Rain Showers", icon: "/icons/showers.svg" },
    82: { description: "Heavy Rain Showers", icon: "/icons/showers.svg" },
    85: { description: "Light Snow Showers", icon: "/icons/snow-showers.svg" },
    86: {
        description: "Moderate Snow Showers",
        icon: "/icons/snow-showers.svg",
    },
    95: { description: "Thunderstorm", icon: "/icons/thunderstorm.svg" },
    96: {
        description: "Thunderstorm with Light Hail",
        icon: "/icons/thunderstorm-hail.svg",
    },
    99: {
        description: "Thunderstorm with Heavy Hail",
        icon: "/icons/thunderstorm-hail.svg",
    },
};

export const getWeatherCodeDetails = (code) => {
    return (
        weatherCodeMap[code] || {
            description: "Unknown",
            icon: "/icons/unknown.svg",
        }
    );
};
