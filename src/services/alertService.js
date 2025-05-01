import {
    alertThresholds,
    getWeatherHazards,
    getAlertExpirationDate,
} from "../utils/weatherCodes";

/**
 * Analyzes weather data and generates appropriate alerts
 * @param {Object} weatherData - The weather forecast data
 * @param {Object} location - The location information
 * @returns {Array} - Array of alert objects
 */
export const generateAlerts = (weatherData, location) => {
    if (!weatherData || !weatherData.daily) {
        return [];
    }

    const alerts = [];
    const hazards = getWeatherHazards();
    const { daily, hourly, current } = weatherData;

    // Check for high temperature alerts
    if (
        daily.temperature_2m_max.some(
            (temp) => temp >= alertThresholds.temperature.extreme_heat
        )
    ) {
        const maxTemp = Math.max(...daily.temperature_2m_max);
        const hazard = hazards.extreme_heat;

        alerts.push({
            id: "extreme-heat-" + Date.now(),
            type: "temperature",
            title: hazard.title,
            severity: hazard.severity,
            description: `${
                hazard.description
            } Temperatures may reach ${maxTemp.toFixed(
                1
            )}°C in the coming days.`,
            instructions: hazard.instructions,
            until: getAlertExpirationDate(48),
            location: location.name,
            icon: hazard.icon,
        });
    } else if (
        daily.temperature_2m_max.some(
            (temp) => temp >= alertThresholds.temperature.severe_heat
        )
    ) {
        const maxTemp = Math.max(...daily.temperature_2m_max);
        const hazard = hazards.severe_heat;

        alerts.push({
            id: "heat-advisory-" + Date.now(),
            type: "temperature",
            title: hazard.title,
            severity: hazard.severity,
            description: `${
                hazard.description
            } Temperatures may reach ${maxTemp.toFixed(
                1
            )}°C in the coming days.`,
            instructions: hazard.instructions,
            until: getAlertExpirationDate(48),
            location: location.name,
            icon: hazard.icon,
        });
    }

    // Check for cold temperature alerts
    if (
        daily.temperature_2m_min.some(
            (temp) => temp <= alertThresholds.temperature.extreme_cold
        )
    ) {
        const minTemp = Math.min(...daily.temperature_2m_min);
        const hazard = hazards.extreme_cold;

        alerts.push({
            id: "extreme-cold-" + Date.now(),
            type: "temperature",
            title: hazard.title,
            severity: hazard.severity,
            description: `${
                hazard.description
            } Temperatures may drop to ${minTemp.toFixed(
                1
            )}°C in the coming days.`,
            instructions: hazard.instructions,
            until: getAlertExpirationDate(48),
            location: location.name,
            icon: hazard.icon,
        });
    } else if (
        daily.temperature_2m_min.some(
            (temp) => temp <= alertThresholds.temperature.severe_cold
        )
    ) {
        const minTemp = Math.min(...daily.temperature_2m_min);
        const hazard = hazards.severe_cold;

        alerts.push({
            id: "frost-advisory-" + Date.now(),
            type: "temperature",
            title: hazard.title,
            severity: hazard.severity,
            description: `${
                hazard.description
            } Temperatures may drop to ${minTemp.toFixed(
                1
            )}°C in the coming days.`,
            instructions: hazard.instructions,
            until: getAlertExpirationDate(48),
            location: location.name,
            icon: hazard.icon,
        });
    }

    // Check for precipitation alerts (rain)
    if (
        daily.rain_sum &&
        daily.rain_sum.some((rain) => rain >= alertThresholds.rain.heavy)
    ) {
        const maxRain = Math.max(...daily.rain_sum);
        const hazard = hazards.heavy_rain;

        alerts.push({
            id: "heavy-rain-" + Date.now(),
            type: "precipitation",
            title: hazard.title,
            severity: hazard.severity,
            description: `${
                hazard.description
            } Rainfall may reach ${maxRain.toFixed(1)}mm in the coming days.`,
            instructions: hazard.instructions,
            until: getAlertExpirationDate(24),
            location: location.name,
            icon: hazard.icon,
        });

        // Check for potential flooding with heavy continuous rain
        if (
            daily.rain_sum.filter(
                (rain) => rain > alertThresholds.rain.moderate
            ).length >= 2
        ) {
            const floodHazard = hazards.flood;

            alerts.push({
                id: "flood-warning-" + Date.now(),
                type: "precipitation",
                title: floodHazard.title,
                severity: floodHazard.severity,
                description: `${floodHazard.description} Multiple days of heavy rainfall forecasted.`,
                instructions: floodHazard.instructions,
                until: getAlertExpirationDate(48),
                location: location.name,
                icon: floodHazard.icon,
            });
        }
    } else if (
        daily.rain_sum &&
        daily.rain_sum.some((rain) => rain >= alertThresholds.rain.moderate)
    ) {
        const maxRain = Math.max(...daily.rain_sum);
        const hazard = {
            title: "Moderate Rainfall Alert",
            severity: "low",
            icon: "rain",
            description:
                "Moderate rainfall expected that may affect outdoor activities.",
            instructions:
                "Carry an umbrella and consider waterproof clothing if going outdoors.",
        };

        alerts.push({
            id: "moderate-rain-" + Date.now(),
            type: "precipitation",
            title: hazard.title,
            severity: hazard.severity,
            description: `${
                hazard.description
            } Rainfall may reach ${maxRain.toFixed(1)}mm in the coming days.`,
            instructions: hazard.instructions,
            until: getAlertExpirationDate(24),
            location: location.name,
            icon: hazard.icon,
        });
    }

    // Check for wind alerts
    if (
        daily.wind_speed_10m_mean &&
        daily.wind_speed_10m_mean.some(
            (wind) => wind >= alertThresholds.wind.storm
        )
    ) {
        const maxWind = Math.max(...daily.wind_speed_10m_mean);
        const hazard = hazards.storm;

        alerts.push({
            id: "storm-warning-" + Date.now(),
            type: "wind",
            title: hazard.title,
            severity: hazard.severity,
            description: `${
                hazard.description
            } Wind speeds may reach ${maxWind.toFixed(1)} km/h.`,
            instructions: hazard.instructions,
            until: getAlertExpirationDate(24),
            location: location.name,
            icon: hazard.icon,
        });
    } else if (
        daily.wind_speed_10m_mean &&
        daily.wind_speed_10m_mean.some(
            (wind) => wind >= alertThresholds.wind.high
        )
    ) {
        const maxWind = Math.max(...daily.wind_speed_10m_mean);
        const hazard = hazards.strong_wind;

        alerts.push({
            id: "wind-advisory-" + Date.now(),
            type: "wind",
            title: hazard.title,
            severity: hazard.severity,
            description: `${
                hazard.description
            } Wind speeds may reach ${maxWind.toFixed(1)} km/h.`,
            instructions: hazard.instructions,
            until: getAlertExpirationDate(24),
            location: location.name,
            icon: hazard.icon,
        });
    }

    // Check for UV index alerts
    if (
        daily.uv_index_max &&
        daily.uv_index_max.some((uv) => uv >= alertThresholds.uv.extreme)
    ) {
        const maxUV = Math.max(...daily.uv_index_max);
        const hazard = hazards.extreme_uv;

        alerts.push({
            id: "extreme-uv-" + Date.now(),
            type: "uv",
            title: hazard.title,
            severity: hazard.severity,
            description: `${
                hazard.description
            } UV Index may reach ${maxUV.toFixed(1)}.`,
            instructions: hazard.instructions,
            until: getAlertExpirationDate(24),
            location: location.name,
            icon: hazard.icon,
        });
    } else if (
        daily.uv_index_max &&
        daily.uv_index_max.some((uv) => uv >= alertThresholds.uv.very_high)
    ) {
        const maxUV = Math.max(...daily.uv_index_max);
        const hazard = hazards.high_uv;

        alerts.push({
            id: "high-uv-" + Date.now(),
            type: "uv",
            title: hazard.title,
            severity: hazard.severity,
            description: `${
                hazard.description
            } UV Index may reach ${maxUV.toFixed(1)}.`,
            instructions: hazard.instructions,
            until: getAlertExpirationDate(24),
            location: location.name,
            icon: hazard.icon,
        });
    }

    // Check for poor visibility
    if (
        daily.visibility_mean &&
        daily.visibility_mean.some(
            (vis) => vis <= alertThresholds.visibility.very_poor
        )
    ) {
        const minVisibility = Math.min(...daily.visibility_mean);
        const hazard = hazards.very_poor_visibility;

        alerts.push({
            id: "visibility-warning-" + Date.now(),
            type: "visibility",
            title: hazard.title,
            severity: hazard.severity,
            description: `${hazard.description} Visibility may be reduced to ${(
                minVisibility / 1000
            ).toFixed(1)} km.`,
            instructions: hazard.instructions,
            until: getAlertExpirationDate(24),
            location: location.name,
            icon: hazard.icon,
        });
    } else if (
        daily.visibility_mean &&
        daily.visibility_mean.some(
            (vis) => vis <= alertThresholds.visibility.poor
        )
    ) {
        const minVisibility = Math.min(...daily.visibility_mean);
        const hazard = hazards.poor_visibility;

        alerts.push({
            id: "visibility-alert-" + Date.now(),
            type: "visibility",
            title: hazard.title,
            severity: hazard.severity,
            description: `${hazard.description} Visibility may be reduced to ${(
                minVisibility / 1000
            ).toFixed(1)} km.`,
            instructions: hazard.instructions,
            until: getAlertExpirationDate(24),
            location: location.name,
            icon: hazard.icon,
        });
    }

    // Check for high humidity (which can affect heat perception)
    if (
        daily.relative_humidity_2m_mean &&
        daily.relative_humidity_2m_mean.some(
            (hum) => hum >= alertThresholds.humidity.very_high
        )
    ) {
        const maxHumidity = Math.max(...daily.relative_humidity_2m_mean);
        const hazard = hazards.high_humidity;

        alerts.push({
            id: "humidity-alert-" + Date.now(),
            type: "humidity",
            title: hazard.title,
            severity: hazard.severity,
            description: `${
                hazard.description
            } Humidity levels may reach ${maxHumidity.toFixed(0)}%.`,
            instructions: hazard.instructions,
            until: getAlertExpirationDate(24),
            location: location.name,
            icon: hazard.icon,
        });
    }

    // Check for thunderstorm risk (based on weather codes)
    if (
        daily.weather_code &&
        daily.weather_code.some((code) => [95, 96, 99].includes(code))
    ) {
        const hazard = hazards.thunderstorm;

        alerts.push({
            id: "thunderstorm-warning-" + Date.now(),
            type: "thunderstorm",
            title: hazard.title,
            severity: hazard.severity,
            description: hazard.description,
            instructions: hazard.instructions,
            until: getAlertExpirationDate(24),
            location: location.name,
            icon: hazard.icon,
        });
    }

    // Check for air quality issues (using cloud cover and wind speed as a simple proxy)
    if (daily.cloud_cover_mean && daily.wind_speed_10m_mean) {
        const hasHighCloudCover = daily.cloud_cover_mean.some(
            (cover) => cover > 80
        );
        const hasLowWind = daily.wind_speed_10m_mean.some((wind) => wind < 10);

        if (hasHighCloudCover && hasLowWind) {
            const hazard = hazards.air_quality;

            alerts.push({
                id: "air-quality-" + Date.now(),
                type: "air",
                title: hazard.title,
                severity: hazard.severity,
                description: hazard.description,
                instructions: hazard.instructions,
                until: getAlertExpirationDate(24),
                location: location.name,
                icon: hazard.icon,
            });
        }
    }

    return alerts;
};

/**
 * Filters alerts based on severity levels
 * @param {Array} alerts - Array of alert objects
 * @param {Object} filters - Object with severity levels as keys and boolean values
 * @returns {Array} - Filtered array of alert objects
 */
export const filterAlerts = (alerts, filters) => {
    if (!alerts || !filters) return [];

    return alerts.filter((alert) => filters[alert.severity]);
};

/**
 * Sorts alerts by severity and then by date
 * @param {Array} alerts - Array of alert objects
 * @returns {Array} - Sorted array of alert objects
 */
export const sortAlerts = (alerts) => {
    if (!alerts) return [];

    const severityOrder = {
        high: 1,
        medium: 2,
        low: 3,
    };

    return [...alerts].sort((a, b) => {
        // First sort by severity
        const severityDiff =
            severityOrder[a.severity] - severityOrder[b.severity];
        if (severityDiff !== 0) return severityDiff;

        // Then sort by date (newest first)
        const dateA = new Date(a.id.split("-").pop());
        const dateB = new Date(b.id.split("-").pop());
        return dateB - dateA;
    });
};

/**
 * Groups alerts by type for easier filtering/display
 * @param {Array} alerts - Array of alert objects
 * @returns {Object} - Object with alert types as keys and arrays of alerts as values
 */
export const groupAlertsByType = (alerts) => {
    if (!alerts) return {};

    return alerts.reduce((grouped, alert) => {
        const type = alert.type || "other";
        if (!grouped[type]) {
            grouped[type] = [];
        }
        grouped[type].push(alert);
        return grouped;
    }, {});
};
