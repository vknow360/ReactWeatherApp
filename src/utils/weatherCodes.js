// Import React icons for static icons
import {
    WiDaySunny,
    WiNightClear,
    WiDayCloudy,
    WiNightAltCloudy,
    WiCloud,
    WiCloudy,
    WiFog,
    WiDayRain,
    WiNightRain,
    WiRain,
    WiDaySnow,
    WiNightSnow,
    WiSnow,
    WiDayThunderstorm,
    WiNightThunderstorm,
    WiThunderstorm,
} from "react-icons/wi";

// Function to get static weather icons for simple displays
export const getWeatherIcon = (code, isDay = true) => {
    // Map WMO weather codes to React Weather Icons components
    switch (code) {
        case 0: // Clear sky
            return isDay
                ? { icon: WiDaySunny, size: 24 }
                : { icon: WiNightClear, size: 24 };
        case 1: // Mainly clear
            return isDay
                ? { icon: WiDaySunny, size: 24 }
                : { icon: WiNightClear, size: 24 };
        case 2: // Partly cloudy
            return isDay
                ? { icon: WiDayCloudy, size: 24 }
                : { icon: WiNightAltCloudy, size: 24 };
        case 3: // Overcast
            return { icon: WiCloudy, size: 24 };
        case 45: // Fog
        case 48: // Depositing rime fog
            return { icon: WiFog, size: 24 };
        case 51: // Drizzle: Light
        case 53: // Drizzle: Moderate
        case 55: // Drizzle: Dense
            return isDay
                ? { icon: WiDayRain, size: 24 }
                : { icon: WiNightRain, size: 24 };
        case 56: // Freezing Drizzle: Light
        case 57: // Freezing Drizzle: Dense
            return { icon: WiRain, size: 24 };
        case 61: // Rain: Slight
        case 63: // Rain: Moderate
        case 65: // Rain: Heavy
            return isDay
                ? { icon: WiDayRain, size: 24 }
                : { icon: WiNightRain, size: 24 };
        case 66: // Freezing Rain: Light
        case 67: // Freezing Rain: Heavy
            return { icon: WiRain, size: 24 };
        case 71: // Snow fall: Slight
        case 73: // Snow fall: Moderate
        case 75: // Snow fall: Heavy
            return isDay
                ? { icon: WiDaySnow, size: 24 }
                : { icon: WiNightSnow, size: 24 };
        case 77: // Snow grains
            return { icon: WiSnow, size: 24 };
        case 80: // Rain showers: Slight
        case 81: // Rain showers: Moderate
        case 82: // Rain showers: Violent
            return isDay
                ? { icon: WiDayRain, size: 24 }
                : { icon: WiNightRain, size: 24 };
        case 85: // Snow showers slight
        case 86: // Snow showers heavy
            return isDay
                ? { icon: WiDaySnow, size: 24 }
                : { icon: WiNightSnow, size: 24 };
        case 95: // Thunderstorm: Slight or moderate
            return isDay
                ? { icon: WiDayThunderstorm, size: 24 }
                : { icon: WiNightThunderstorm, size: 24 };
        case 96: // Thunderstorm with slight hail
        case 99: // Thunderstorm with heavy hail
            return { icon: WiThunderstorm, size: 24 };
        default:
            return isDay
                ? { icon: WiDaySunny, size: 24 }
                : { icon: WiNightClear, size: 24 };
    }
};

export const getWeatherCodeDetails = (code) => {
    const codes = {
        0: {
            description: "Clear",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/8c295244-116c-11ee-b2ad-875cced2a6c4/la2s01QeJ9.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/fbc69c18-1808-11ee-927e-63bf50aff3d7/3GhtwkECl4.lottie",
        },
        1: {
            description: "Mostly Clear",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/584a51a0-1151-11ee-870f-73f0e4a25c18/OiRsquuDDf.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/583b455c-1151-11ee-870b-13dd4c78db9c/9xWkK1I9gX.lottie",
        },
        2: {
            description: "Partly cloudy",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2de-1183-11ee-baf6-173d0526caf0/bp3GDPqFGT.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e2-1183-11ee-b686-47223a1b9836/mc1QY8zH05.lottie",
        },
        3: {
            description: "Overcast",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/faf03308-1808-11ee-91d1-739f10e56c3d/YTDV6yU0Ta.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/faf9adfc-1808-11ee-91dc-37f7d19587c4/vWJRK7XDvJ.lottie",
        },
        45: {
            description: "Fog",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/hp21UebB00.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/0aRwP7HDBC.lottie",
        },
        48: {
            description: "Rime fog",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/hp21UebB00.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/0aRwP7HDBC.lottie",
        },
        51: {
            description: "Light drizzle",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/GDvFbpyhq7.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/XuK1bB9MDm.lottie",
        },
        53: {
            description: "Moderate drizzle",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/GDvFbpyhq7.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/XuK1bB9MDm.lottie",
        },
        55: {
            description: "Heavy drizzle",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/GDvFbpyhq7.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/XuK1bB9MDm.lottie",
        },
        56: {
            description: "Light freezing drizzle",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/ZqrQCPQRsr.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/bq88tEbomk.lottie",
        },
        57: {
            description: "Heavy freezing drizzle",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/ZqrQCPQRsr.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/bq88tEbomk.lottie",
        },
        61: {
            description: "Slight rain",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/GDvFbpyhq7.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/XuK1bB9MDm.lottie",
        },
        63: {
            description: "Moderate rain",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/GDvFbpyhq7.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/XuK1bB9MDm.lottie",
        },
        65: {
            description: "Heavy rain",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/GDvFbpyhq7.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/XuK1bB9MDm.lottie",
        },
        66: {
            description: "Light freezing rain",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/ZqrQCPQRsr.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/bq88tEbomk.lottie",
        },
        67: {
            description: "Heavy freezing rain",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/ZqrQCPQRsr.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/bq88tEbomk.lottie",
        },
        71: {
            description: "Slight snow fall",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/ZqrQCPQRsr.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/bq88tEbomk.lottie",
        },
        73: {
            description: "Moderate snow fall",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/ZqrQCPQRsr.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/bq88tEbomk.lottie",
        },
        75: {
            description: "Heavy snow fall",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/ZqrQCPQRsr.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/bq88tEbomk.lottie",
        },
        77: {
            description: "Snow grains",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/ZqrQCPQRsr.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/bq88tEbomk.lottie",
        },
        80: {
            description: "Slight rain showers",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/GDvFbpyhq7.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/XuK1bB9MDm.lottie",
        },
        81: {
            description: "Moderate rain showers",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/GDvFbpyhq7.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/XuK1bB9MDm.lottie",
        },
        82: {
            description: "Violent rain showers",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/GDvFbpyhq7.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/XuK1bB9MDm.lottie",
        },
        85: {
            description: "Slight snow showers",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/ZqrQCPQRsr.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/bq88tEbomk.lottie",
        },
        86: {
            description: "Heavy snow showers",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/ZqrQCPQRsr.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/bq88tEbomk.lottie",
        },
        95: {
            description: "Slight thunderstorm",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/n6fz7BEWTb.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/IE0h1K1DWz.lottie",
        },
        96: {
            description: "Thunderstorm with slight hail",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/n6fz7BEWTb.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/IE0h1K1DWz.lottie",
        },
        99: {
            description: "Thunderstorm with heavy hail",
            iconDay:
                "https://assets-v2.lottiefiles.com/a/ca1fb2df-1183-11ee-b42d-23b3716fe8f2/n6fz7BEWTb.lottie",
            iconNight:
                "https://assets-v2.lottiefiles.com/a/ca1fb2e3-1183-11ee-bb81-4f4c1eb98680/IE0h1K1DWz.lottie",
        },
    };

    // Default to clear sky if code not found
    return codes[code] || codes[0];
};

// Weather alert threshold values
export const alertThresholds = {
    temperature: {
        extreme_heat: 35, // °C
        severe_heat: 32, // °C
        extreme_cold: 0, // °C
        severe_cold: 5, // °C
    },
    wind: {
        storm: 75, // km/h
        high: 50, // km/h
        moderate: 30, // km/h
    },
    rain: {
        heavy: 20, // mm
        moderate: 10, // mm
        light: 5, // mm
    },
    snow: {
        heavy: 20, // cm
        moderate: 10, // cm
        light: 5, // cm
    },
    uv: {
        extreme: 11, // UV index
        very_high: 8, // UV index
        high: 6, // UV index
    },
    visibility: {
        very_poor: 1000, // m
        poor: 2000, // m
        moderate: 5000, // m
    },
    humidity: {
        very_high: 85, // %
        high: 70, // %
    },
};

// Function to get all weather hazards with their details
export const getWeatherHazards = () => {
    return {
        extreme_heat: {
            title: "Extreme Heat Warning",
            severity: "high",
            icon: "heat",
            description:
                "Temperatures expected to reach extreme levels. Heat stress and heat stroke risk is high.",
            instructions:
                "Stay in cooled spaces, drink plenty of water, and avoid outdoor activities during peak hours.",
        },
        severe_heat: {
            title: "Heat Advisory",
            severity: "medium",
            icon: "heat",
            description:
                "High temperatures that may cause heat-related illness.",
            instructions:
                "Stay hydrated, take regular breaks in the shade or inside, and limit outdoor activity.",
        },
        extreme_cold: {
            title: "Extreme Cold Warning",
            severity: "high",
            icon: "cold",
            description:
                "Dangerously low temperatures that can cause frostbite and hypothermia.",
            instructions:
                "Minimize outdoor exposure, dress in multiple layers, and keep extremities covered.",
        },
        severe_cold: {
            title: "Frost Advisory",
            severity: "medium",
            icon: "cold",
            description:
                "Cold temperatures that may damage vegetation and cause mild frostbite.",
            instructions:
                "Protect sensitive plants and dress warmly when going outdoors.",
        },
        thunderstorm: {
            title: "Thunderstorm Warning",
            severity: "high",
            icon: "thunderstorm",
            description:
                "Dangerous lightning, heavy rain, and possible hail and strong winds.",
            instructions:
                "Seek shelter in a sturdy building, avoid using electrical equipment, and stay away from windows.",
        },
        heavy_rain: {
            title: "Heavy Rainfall Alert",
            severity: "medium",
            icon: "rain",
            description:
                "Significant rainfall that may cause localized flooding.",
            instructions:
                "Avoid areas prone to flooding, drive cautiously, and stay updated on weather changes.",
        },
        flood: {
            title: "Flood Warning",
            severity: "high",
            icon: "flood",
            description:
                "Flooding is imminent or occurring, posing risk to property and safety.",
            instructions:
                "Move to higher ground if necessary and follow evacuation orders if issued.",
        },
        strong_wind: {
            title: "Strong Wind Advisory",
            severity: "medium",
            icon: "wind",
            description:
                "Strong winds that could cause minor property damage and affect driving.",
            instructions:
                "Secure loose outdoor objects and exercise caution when driving, especially high-profile vehicles.",
        },
        storm: {
            title: "Severe Storm Warning",
            severity: "high",
            icon: "wind",
            description:
                "Dangerous storm conditions with potentially damaging winds.",
            instructions:
                "Stay indoors away from windows, prepare for possible power outages, and avoid travel.",
        },
        heavy_snow: {
            title: "Heavy Snow Warning",
            severity: "high",
            icon: "snow",
            description:
                "Significant snowfall that may make travel dangerous or impossible.",
            instructions:
                "Avoid unnecessary travel, keep emergency supplies ready, and clear accumulating snow safely.",
        },
        moderate_snow: {
            title: "Snow Advisory",
            severity: "medium",
            icon: "snow",
            description:
                "Snow accumulation that may affect travel and outdoor activities.",
            instructions:
                "Allow extra time for travel, maintain safe driving distances, and be prepared for slippery conditions.",
        },
        high_uv: {
            title: "High UV Alert",
            severity: "medium",
            icon: "sun",
            description:
                "High levels of UV radiation that can damage skin and eyes.",
            instructions:
                "Apply sunscreen, wear protective clothing and sunglasses, and limit direct sun exposure between 10am and 4pm.",
        },
        extreme_uv: {
            title: "Extreme UV Warning",
            severity: "high",
            icon: "sun",
            description:
                "Dangerous levels of UV radiation that can cause severe sunburn and eye damage.",
            instructions:
                "Minimize sun exposure, apply high-SPF sunscreen frequently, and wear sun-protective clothing and sunglasses.",
        },
        poor_visibility: {
            title: "Poor Visibility Alert",
            severity: "medium",
            icon: "fog",
            description:
                "Reduced visibility due to fog, mist, or other conditions.",
            instructions:
                "Drive with low headlights, reduce speed, and maintain safe distance from other vehicles.",
        },
        very_poor_visibility: {
            title: "Visibility Warning",
            severity: "high",
            icon: "fog",
            description:
                "Extremely low visibility creating hazardous conditions.",
            instructions:
                "Avoid driving if possible; if you must drive, use fog lights, reduce speed significantly, and follow road markings carefully.",
        },
        high_humidity: {
            title: "High Humidity Alert",
            severity: "low",
            icon: "humidity",
            description:
                "High humidity levels that may cause discomfort and heat stress.",
            instructions:
                "Stay in air-conditioned environments when possible and drink plenty of water.",
        },
        air_quality: {
            title: "Poor Air Quality",
            severity: "medium",
            icon: "air",
            description:
                "Poor air quality conditions that may affect sensitive groups.",
            instructions:
                "People with respiratory issues should limit outdoor activity and keep necessary medications accessible.",
        },
    };
};

// Function to determine alert expiration date (typically 24-48 hours from issue)
export const getAlertExpirationDate = (hoursFromNow = 24) => {
    const date = new Date();
    date.setHours(date.getHours() + hoursFromNow);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    });
};
