import fs from "fs";
export const getCoordinates = async (location) => {
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                location
            )}`
        );
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        return error.message;
    }
};

export const getWeatherForecast = async (latitude, longitude, timezone) => {
    try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,sunrise,sunset,temperature_2m_max,temperature_2m_min,uv_index_max,rain_sum,temperature_2m_mean,visibility_mean,wind_speed_10m_mean,cloud_cover_mean,surface_pressure_mean,relative_humidity_2m_mean&hourly=temperature_2m,weather_code,is_day&current=temperature_2m,is_day,apparent_temperature,weather_code,wind_speed_10m,rain,precipitation,surface_pressure,cloud_cover,relative_humidity_2m&timezone=${encodeURIComponent(
            timezone
        )}&temporal_resolution=hourly_3`;
        console.log(weatherUrl);
        const response = await fetch(weatherUrl);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        return { err: "", weath: data };
    } catch (error) {
        return { err: error.message, weath: {} };
    }
};

const apiKey = "gjigfrawthkmtyaf1kgezwz8rauwhvse0du1qpzw";
export const fetchNewsData = async (count = 10) => {
    try {
        // We'll fetch from multiple sources to get a comprehensive weather news feed
        const sources = [
            // Environmental news
            `https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Ftimesofindia.indiatimes.com%2Frssfeeds%2F2647163.cms&api_key=${apiKey}&order_by=pubDate&order_dir=desc&count=${count}`,

            // Weather-specific news (fallback with fewer items if main request fails)
        ];

        // Make all requests in parallel
        const responses = await Promise.all(
            sources.map(
                (url) =>
                    fetch(url)
                        .then((res) => res.json())
                        .then((data) => data.items || [])
                        .catch(() => []) // Return empty array if fetch fails
            )
        );

        // Combine all responses and sort by publication date
        const allItems = responses.flat();
        const sortedItems = allItems.sort(
            (a, b) => new Date(b.pubDate) - new Date(a.pubDate)
        );

        return sortedItems;
    } catch (error) {
        console.error("Error fetching news data:", error);
        return []; // Return empty array in case of error
    }
};
