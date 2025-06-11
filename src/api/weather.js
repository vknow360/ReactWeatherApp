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
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=relative_humidity_2m_mean,precipitation_probability_max,weather_code,sunrise,sunset,temperature_2m_max,temperature_2m_min,uv_index_max,rain_sum,temperature_2m_mean,visibility_mean,wind_speed_10m_mean,cloud_cover_mean,surface_pressure_mean,relative_humidity_2m_mean&hourly=temperature_2m,weather_code,is_day,snowfall,showers,pressure_msl,wind_gusts_10m,wind_direction_10m,dew_point_2m,visibility,precipitation_probability,uv_index,cape&current=temperature_2m,is_day,apparent_temperature,weather_code,wind_speed_10m,rain,precipitation,surface_pressure,cloud_cover,relative_humidity_2m,snowfall,showers,pressure_msl,wind_gusts_10m,wind_direction_10m,dew_point_2m,visibility,precipitation_probability,uv_index,cape&timezone=${encodeURIComponent(
            timezone
        )}`;
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

export const fetchNews = async (count = 3) => {
    try {
        const sources = ["https://weathercast-backend-mmp2.onrender.com/news"];

        const responses = await fetch(sources[0])
            .then((res) => res.json())
            .then((data) => data.items || [])
            .catch(() => []);

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

export const fetchNewsData = async () => {
    try {
        const url = `https://weathercast-backend-mmp2.onrender.com/news`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.news) {
            throw new Error(`No items returned`);
        }

        return { items: data.news };
    } catch (error) {
        console.error("Error fetching news:", error);
        throw error;
    }
};
