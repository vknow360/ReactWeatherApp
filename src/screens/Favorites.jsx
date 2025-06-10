import React, { useContext, useState, useEffect } from "react";
import WeatherContext from "../context/WeatherContext";
import { getCoordinates, getWeatherForecast } from "../api/weather";
import {
    FaSearch,
    FaPlus,
    FaTrash,
    FaMapMarkerAlt,
    FaStar,
    FaThermometerHalf,
    FaWind,
    FaCloudRain,
} from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { WiHumidity } from "react-icons/wi";
import { useNavigate } from "react-router-dom";
import { getWeatherIcon } from "../utils/weatherCodes";
import { useSettings } from "../context/SettingsContext";

const Favorites = () => {
    const { location, setLocation, setWeather, setError } =
        useContext(WeatherContext);
    const { formatTemperature } = useSettings();
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("weatherFavorites");
        return saved ? JSON.parse(saved) : [];
    });
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [weatherData, setWeatherData] = useState({});
    const navigate = useNavigate();

    // Search for locations
    const searchLocations = async () => {
        if (!input.trim()) return;

        setIsSearching(true);
        try {
            const results = await getCoordinates(input.trim());
            setSearchResults(Array.isArray(results) ? results : []);
        } catch (error) {
            console.error("Error searching locations:", error);
            setSearchResults([]);
        }
        setIsSearching(false);
    };

    // Add a location to favorites
    const addFavorite = (location) => {
        const newFav = {
            name: location.name,
            country: location.country,
            lat: location.latitude,
            lon: location.longitude,
            id: `${location.latitude}-${location.longitude}`,
        };

        if (favorites.some((fav) => fav.id === newFav.id)) return;

        const updated = [...favorites, newFav];
        setFavorites(updated);
        localStorage.setItem("weatherFavorites", JSON.stringify(updated));
        setInput("");
        setSearchResults([]);
    };

    const removeFavorite = (e, id) => {
        e.stopPropagation(); // Prevent triggering the card click
        const updated = favorites.filter((fav) => fav.id !== id);
        setFavorites(updated);
        localStorage.setItem("weatherFavorites", JSON.stringify(updated));
    };

    const selectFavorite = async (fav) => {
        try {
            // Fetch weather data for the selected location
            const { weath, err } = await getWeatherForecast(
                fav.lat,
                fav.lon,
                "auto"
            );

            if (err === "") {
                // Only update location and weather data if the fetch was successful
                setLocation({
                    lat: fav.lat,
                    lon: fav.lon,
                    name: `${fav.name}, ${fav.country}`,
                    timeZone: "auto",
                });
                setWeather(weath);
                setError("");
                window.location.href = "/"; // Navigate after successful data fetch
            } else {
                setError(err);
            }
        } catch (error) {
            setError(`Failed to fetch weather data: ${error.message}`);
        }
    };

    // Fetch weather preview for favorites
    useEffect(() => {
        const fetchWeatherPreviews = async () => {
            const weatherPromises = favorites.map(async (fav) => {
                try {
                    const { weath, err } = await getWeatherForecast(
                        fav.lat,
                        fav.lon,
                        "auto"
                    );
                    if (err === "") {
                        return { id: fav.id, data: weath };
                    }
                    return { id: fav.id, error: err };
                } catch (error) {
                    return { id: fav.id, error: error.message };
                }
            });

            const results = await Promise.all(weatherPromises);
            const weatherMap = {};
            results.forEach((result) => {
                weatherMap[result.id] = result;
            });

            setWeatherData(weatherMap);
        };

        if (favorites.length > 0) {
            fetchWeatherPreviews();
        }
    }, [favorites]);

    return (
        <div className="w-full h-full p-3 sm:p-2 pt-20">
            <div className="bg-[#202b3b] rounded-2xl p-5 sm:p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-[var(--color-text-primary)] flex items-center">
                    <FaMapMarkerAlt className="mr-3 text-[var(--color-accent)]" />
                    Favorite Locations
                </h2>

                {/* Search section */}
                <div className="mb-8">
                    <div className="flex mb-3 gap-2">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Search for a city or location..."
                                className="w-full px-4 py-3 rounded-xl border border-[#354051] bg-[#2a3546] text-white pl-10 focus:outline-none focus:border-[var(--color-accent)]"
                                onKeyUp={(e) =>
                                    e.key === "Enter" && searchLocations()
                                }
                            />
                            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
                        </div>
                        <button
                            onClick={searchLocations}
                            disabled={isSearching || !input.trim()}
                            className="px-5 py-3 rounded-xl bg-[var(--color-accent)] text-white font-semibold hover:bg-[var(--color-accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center transition-colors"
                        >
                            {isSearching ? "Searching..." : "Search"}
                        </button>
                    </div>

                    {/* Search results */}
                    {searchResults.length > 0 && (
                        <div className="bg-[#2a3546] rounded-xl shadow-md mt-2 max-h-60 overflow-y-auto divide-y divide-[#354051]">
                            <ul>
                                {searchResults.map((result) => (
                                    <li
                                        key={`${result.latitude}-${result.longitude}`}
                                        className="flex items-center justify-between p-4 hover:bg-[#354051] transition-colors"
                                    >
                                        <div>
                                            <p className="text-white font-medium">
                                                {result.name}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                {result.country}{" "}
                                                {result.admin1 &&
                                                    `- ${result.admin1}`}
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => addFavorite(result)}
                                            className="bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-full p-2 transition-colors"
                                            title="Add to favorites"
                                        >
                                            <FaPlus size={12} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Favorites list */}
                <div className="mb-4">
                    <h3 className="text-lg font-semibold mb-4 text-white flex items-center border-b border-[#354051] pb-2">
                        <FaStar className="mr-2 text-yellow-400" />
                        Your Favorites
                    </h3>

                    {favorites.length === 0 ? (
                        <div className="py-10 text-center text-gray-400 bg-[#2a3546] rounded-xl">
                            <TiWeatherPartlySunny
                                size={48}
                                className="mx-auto mb-3 text-gray-400"
                            />
                            <p className="text-lg">
                                You don't have any favorite locations yet.
                            </p>
                            <p className="text-sm mt-2">
                                Search for locations above and add them to your
                                favorites.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {favorites.map((fav) => {
                                const weatherPreview =
                                    weatherData[fav.id]?.data;
                                const currentTemp =
                                    weatherPreview?.current?.temperature_2m;
                                const weatherCode =
                                    weatherPreview?.current?.weather_code;
                                const isDay =
                                    weatherPreview?.current?.is_day === 1;
                                const humidity =
                                    weatherPreview?.current
                                        ?.relative_humidity_2m;
                                const windSpeed =
                                    weatherPreview?.current?.wind_speed_10m;
                                const rain = weatherPreview?.current?.rain;

                                return (
                                    <div
                                        key={fav.id}
                                        onClick={() => selectFavorite(fav)}
                                        className="bg-[#2a3546] rounded-xl shadow-md border border-[#354051] hover:shadow-lg transition-all cursor-pointer group"
                                    >
                                        <div className="p-5">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="font-semibold text-white text-lg group-hover:text-[var(--color-accent)] transition-colors">
                                                        {fav.name}
                                                    </h4>
                                                    <p className="text-sm text-gray-400">
                                                        {fav.country}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={(e) =>
                                                        removeFavorite(
                                                            e,
                                                            fav.id
                                                        )
                                                    }
                                                    className="text-red-400 hover:text-red-600 p-1.5 bg-[#354051] rounded-full hover:bg-[#202b3b] transition-colors"
                                                    title="Remove from favorites"
                                                >
                                                    <FaTrash size={12} />
                                                </button>
                                            </div>

                                            {weatherPreview ? (
                                                <div className="mt-4">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center">
                                                            {weatherCode !==
                                                                undefined && (
                                                                <span className="mr-3 text-white p-2 bg-[#354051] rounded-full">
                                                                    {(() => {
                                                                        const IconComponent =
                                                                            getWeatherIcon(
                                                                                weatherCode,
                                                                                isDay
                                                                            ).icon;
                                                                        return (
                                                                            <IconComponent
                                                                                size={
                                                                                    32
                                                                                }
                                                                            />
                                                                        );
                                                                    })()}
                                                                </span>
                                                            )}
                                                            {currentTemp !==
                                                                undefined && (
                                                                <span className="text-2xl font-bold text-white">
                                                                    {formatTemperature
                                                                        ? formatTemperature(
                                                                              currentTemp
                                                                          )
                                                                        : `${Math.round(
                                                                              currentTemp
                                                                          )}°C`}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div className="text-right">
                                                            <span className="text-xs text-gray-400">
                                                                Last updated
                                                            </span>
                                                            <p className="text-sm text-white">
                                                                {new Date(
                                                                    weatherPreview.current.time
                                                                ).toLocaleTimeString(
                                                                    [],
                                                                    {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    }
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                                                        {humidity !==
                                                            undefined && (
                                                            <div className="bg-[#354051] rounded-lg p-2">
                                                                <WiHumidity
                                                                    className="mx-auto text-gray-400"
                                                                    size={20}
                                                                />
                                                                <p className="text-xs text-gray-400 mt-1">
                                                                    Humidity
                                                                </p>
                                                                <p className="text-sm font-medium text-white">
                                                                    {humidity}%
                                                                </p>
                                                            </div>
                                                        )}

                                                        {windSpeed !==
                                                            undefined && (
                                                            <div className="bg-[#354051] rounded-lg p-2">
                                                                <FaWind
                                                                    className="mx-auto text-gray-400"
                                                                    size={16}
                                                                />
                                                                <p className="text-xs text-gray-400 mt-1">
                                                                    Wind
                                                                </p>
                                                                <p className="text-sm font-medium text-white">
                                                                    {windSpeed}{" "}
                                                                    km/h
                                                                </p>
                                                            </div>
                                                        )}

                                                        {rain !== undefined && (
                                                            <div className="bg-[#354051] rounded-lg p-2">
                                                                <FaCloudRain
                                                                    className="mx-auto text-gray-400"
                                                                    size={16}
                                                                />
                                                                <p className="text-xs text-gray-400 mt-1">
                                                                    Rain
                                                                </p>
                                                                <p className="text-sm font-medium text-white">
                                                                    {rain} mm
                                                                </p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="mt-4 py-4 text-center text-sm text-gray-400 bg-[#354051] rounded-lg">
                                                    Loading weather data...
                                                </div>
                                            )}

                                            <div className="mt-4 text-center">
                                                <button className="w-full py-2 rounded-lg bg-[#354051] text-[var(--color-accent)] font-medium hover:bg-[#202b3b] transition-colors group-hover:bg-[var(--color-accent)] group-hover:text-white">
                                                    View Full Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Favorites;
