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
import { getWeatherForecast } from "../api/weather";

const Main = () => {
    const { setLocation, setWeather, setError } = useContext(WeatherContext);

    const handleLocationSelect = async (selectedLocation) => {
        setLocation(selectedLocation);

        try {
            const { weath, err } = await getWeatherForecast(
                selectedLocation.lat,
                selectedLocation.lon,
                selectedLocation.timeZone
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

    return (
        <div className="w-full flex flex-col h-full overflow-y-auto">
            {/* Main content */}
            <div className="flex flex-col lg:flex-row gap-3 flex-grow">
                <div className="flex flex-col w-full lg:w-3/5 gap-3">
                    <SearchBar onLocationSelect={handleLocationSelect} />
                    <div className="flex flex-col flex-grow gap-3">
                        <WeatherCard />
                        <Today />
                        <Conditions />
                    </div>
                </div>
                <div className="flex flex-col w-full lg:w-[38%]">
                    <WeeklyForecast />
                    <WeatherNews />
                </div>
            </div>

            {/* Footer at the bottom */}
            <Footer />
        </div>
    );
};

export default Main;
