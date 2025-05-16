import React from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import Today from "./TodayForecast";
import Conditions from "./Conditions";
import WeeklyForecast from "./WeeklyForecast";
import WeatherNews from "./WeatherNews";
import Footer from "./Footer";
import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import { useSettings } from "../context/SettingsContext";
import { getWeatherForecast } from "../api/weather";

const Main = () => {
    const { location, setLocation, weather, setWeather, setError } =
        useContext(WeatherContext);
    const { settings } = useSettings();
    const [refreshTimer, setRefreshTimer] = React.useState(null);

    // Function to fetch weather data
    const fetchWeatherData = async (loc = location) => {
        try {
            const { weath, err } = await getWeatherForecast(
                loc.lat,
                loc.lon,
                loc.timeZone
            );

            if (err === "") {
                setWeather(weath);
                setError("");
            } else {
                setError(err);
            }
        } catch (error) {
            setError(`Failed to fetch weather data: ${error.message}`);
        }
    };

    const handleLocationSelect = async (selectedLocation) => {
        setLocation(selectedLocation);
        await fetchWeatherData(selectedLocation);
    };

    // Setup auto-refresh based on settings
    React.useEffect(() => {
        // Clear any existing timer
        if (refreshTimer) {
            clearInterval(refreshTimer);
            setRefreshTimer(null);
        }

        // If refresh interval is set and not zero
        if (settings.refreshInterval > 0) {
            // Convert minutes to milliseconds
            const intervalMs = settings.refreshInterval * 60 * 1000;

            // Set new timer
            const timer = setInterval(() => {
                fetchWeatherData();
            }, intervalMs);

            setRefreshTimer(timer);
        }

        // Cleanup on component unmount
        return () => {
            if (refreshTimer) {
                clearInterval(refreshTimer);
            }
        };
    }, [settings.refreshInterval, location]); // Safely access display settings
    const displaySettings = settings?.display || {
        hourlyForecast: true,
        weeklyForecast: true,
        weatherNews: true,
        weatherAlerts: true,
        weatherMap: false,
    };

    return (
        <div className="w-full flex flex-col h-full overflow-y-auto">
            {/* Main content */}
            <div className="flex flex-col lg:flex-row gap-3 flex-grow">
                <div className="flex flex-col w-full lg:w-3/5 gap-3">
                    <SearchBar onLocationSelect={handleLocationSelect} />
                    <div className="flex flex-col flex-grow gap-3">
                        <WeatherCard />
                        {displaySettings.hourlyForecast && <Today />}
                        <Conditions />
                    </div>
                </div>
                <div className="flex flex-col w-full lg:w-[38%]">
                    {displaySettings.weeklyForecast && <WeeklyForecast />}
                    {displaySettings.weatherNews && <WeatherNews />}
                </div>
            </div>

            {/* Footer at the bottom */}
            <Footer />
        </div>
    );
};

export default Main;
