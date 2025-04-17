import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import Footer from "../components/Footer";
import WeatherContext from "../context/WeatherContext";
import { getWeatherForecast } from "../api/weather";
import { data } from "./sampleData";

const Home = () => {
    const [weather, setWeather] = useState(data);
    const [error, setError] = useState("");
    const [location, setLocation] = useState({
        lat: 0,
        lon: 0,
        timeZone: "auto",
        name: "Gorakhpur, India",
    });

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    if (lat == 0 || lon == 0) {
                        return;
                    }
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
                    );
                    const data = await response.json();
                    const name =
                        data.address.city + ", " + data.address.country;

                    setLocation({
                        lat,
                        lon,
                        timeZone: "auto",
                        name: name,
                    });

                    const { weath, err } = await getWeatherForecast(
                        lat,
                        lon,
                        "auto"
                    );
                    if (err === "") {
                        setWeather(weath);
                        setError("");
                    } else {
                        setWeather(data);
                        setError(err);
                    }
                },
                (err) => {
                    setError(`Geolocation error: ${err.message}`);
                    // Use default location
                },
                {
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        }
    }, []);

    return (
        <div className="flex flex-col min-h-full w-full p-3 bg-[#162438]">
            <div className="flex flex-col sm:flex-row flex-grow">
                <Sidebar />
                <WeatherContext.Provider
                    value={{
                        weather,
                        error,
                        location,
                        setWeather,
                        setError,
                        setLocation,
                    }}
                >
                    <Main />
                </WeatherContext.Provider>
            </div>
            <Footer />
        </div>
    );
};

export default Home;
