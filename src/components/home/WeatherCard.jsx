import React from "react";
import { FaLocationDot, FaCloudRain, FaCloud } from "react-icons/fa6";
import { FaThermometerHalf } from "react-icons/fa";
import { WiSunrise, WiSunset, WiHumidity, WiStrongWind } from "react-icons/wi";
import { BsStar, BsStarFill } from "react-icons/bs";
import WeatherContext from "../../context/WeatherContext";
import { useContext } from "react";
import { useSettings } from "../../context/SettingsContext";
import { getWeatherIconUrl } from "../../utils/weatherIcons";
import { getWeatherCodeDetails } from "../../utils/weatherCodes";

const WeatherCard = () => {
    const {
        weather,
        error,
        location,
        addToFavorites,
        removeFromFavorites,
        isLocationFavorite,
    } = useContext(WeatherContext);
    const {
        formatTemperature,
        formatWindSpeed,
        formatPressure,
        formatVisibility,
    } = useSettings();

    function formatTime(isoString) {
        let date = new Date(isoString);
        if (date.getTimezoneOffset() != weather.utc_offset_seconds) {
            date = new Date(date.getTime() + weather.utc_offset_seconds);
        }

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;
        hours = String(hours).padStart(2, "0");

        return `${hours}:${minutes} ${ampm}`;
    }

    const weathercode = weather.current?.weather_code;
    const isDay = weather.current?.is_day === 1;
    const time = formatTime(weather.current?.time);
    const { description } = getWeatherCodeDetails(weathercode);

    // Function to get background styles based on weather and time
    const getWeatherBackground = () => {
        const cloudCover = weather.current.cloud_cover;
        const rainChance = weather.current.rain;
        const temp = weather.current.temperature_2m;
        const windSpeed = weather.current.wind_speed_10m;

        // Night time
        if (!isDay) {
            if (rainChance > 30) {
                return "bg-gradient-to-br from-[#233a6c] via-[#3a4e8a] to-[#4e5d94] animate-gradient"; // Rainy night (cool blue/purple)
            }
            if (cloudCover > 60) {
                return "bg-gradient-to-br from-[#2a3b5d] via-[#4b5e8e] to-[#6a7bbd] animate-gradient"; // Cloudy night (cool blue)
            }
            return "bg-gradient-to-br from-[#1e2a47] via-[#2e3c5c] to-[#4e5d94] animate-gradient"; // Clear night (deep blue/purple)
        }

        // Severe Weather
        if (windSpeed > 40) {
            return "bg-gradient-to-br from-[#3a6073] via-[#16222a] to-[#4f8a8b] animate-gradient"; // Windy (cool teal/blue)
        }

        // Rainy conditions
        if (rainChance > 60) {
            return "bg-gradient-to-br from-[#3a7bd5] via-[#00d2ff] to-[#4f8a8b] animate-gradient"; // Heavy rain (cool blue/cyan)
        }
        if (rainChance > 30) {
            return "bg-gradient-to-br from-[#43cea2] via-[#185a9d] to-[#4f8a8b] animate-gradient"; // Light rain (aqua/blue)
        }

        // Temperature-based (when not raining)
        if (temp > 30) {
            return "bg-gradient-to-br from-[#43cea2] via-[#185a9d] to-[#4f8a8b] animate-gradient"; // Hot (but still cool tones)
        }
        if (temp < 0) {
            return "bg-gradient-to-br from-[#74ebd5] via-[#ACB6E5] to-[#4f8a8b] animate-gradient"; // Freezing (icy blue)
        }

        // Cloud coverage
        if (cloudCover > 80) {
            return "bg-gradient-to-br from-[#4f8a8b] via-[#283e51] to-[#6a7bbd] animate-gradient"; // Overcast (cool blue/gray)
        }
        if (cloudCover > 60) {
            return "bg-gradient-to-br from-[#5f72bd] via-[#9b23ea] to-[#4f8a8b] animate-gradient"; // Partly cloudy (blue/purple)
        }

        // Default clear day
        return "bg-gradient-to-br from-[#43cea2] via-[#185a9d] to-[#4f8a8b] animate-gradient"; // Clear day (cool aqua/blue)
    };

    // Function to get weather pattern overlay
    const getWeatherPattern = () => {
        const rainChance = weather.current.rain;
        const cloudCover = weather.current.cloud_cover;
        const windSpeed = weather.current.wind_speed_10m;

        if (windSpeed > 40) {
            return "bg-[url('/wind-pattern.svg')]";
        }
        if (rainChance > 30) {
            return "bg-[url('/rain-pattern.svg')]";
        }
        if (cloudCover > 60) {
            return "bg-[url('/cloud-pattern.svg')]";
        }
        return "bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_1px,_transparent_1px)] bg-[length:24px_24px]";
    };

    return (
        <div
            className={`rounded-2xl h-full relative overflow-hidden border border-[#3b4371]/30 shadow-2xl ${getWeatherBackground()}`}
        >
            {/* Dynamic weather pattern overlay */}
            <div
                className={`absolute inset-0 opacity-20 transition-opacity duration-500 ${getWeatherPattern()}`}
            ></div>

            {/* Main Content */}
            <div className="relative z-10 p-6 sm:p-8 lg:p-10 h-full flex flex-col">
                {/* Location Header */}
                <div className="flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-md rounded-lg py-2.5 px-4 border border-white/15 self-start transition-all hover:bg-white/15">
                    <FaLocationDot className="text-blue-300 w-5 h-5 sm:w-6 sm:h-6" />
                    <h2 className="text-lg sm:text-xl text-white font-semibold truncate max-w-[180px] sm:max-w-[240px] lg:max-w-[340px]">
                        {location.name}
                    </h2>
                </div>

                {/* Weather Info Grid */}
                <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                    {/* Temperature and Details */}
                    <div className="space-y-5">
                        <div>
                            <div className="flex items-start gap-3">
                                <p className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white tracking-tight leading-none drop-shadow-md">
                                    {formatTemperature(
                                        weather.current.temperature_2m
                                    )}
                                </p>
                                <FaThermometerHalf className="text-orange-300 w-7 h-7 sm:w-9 sm:h-9 mt-2" />
                            </div>
                            <p className="text-2xl sm:text-3xl text-white/90 font-medium mt-3 flex items-center gap-3">
                                {description}
                                {weather.current.cloud_cover > 60 && (
                                    <FaCloud className="text-blue-200 w-6 h-6 sm:w-7 sm:h-7" />
                                )}
                                {weather.current.rain > 0 && (
                                    <FaCloudRain className="text-blue-300 w-6 h-6 sm:w-7 sm:h-7" />
                                )}
                            </p>
                        </div>

                        {/* Additional Details */}
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-white/80">
                                <FaThermometerHalf className="w-5 h-5 sm:w-6 sm:h-6 text-orange-200" />
                                <span className="text-base sm:text-lg">
                                    Feels like{" "}
                                    {formatTemperature(
                                        weather.current.apparent_temperature
                                    )}
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <FaCloud className="w-5 h-5 sm:w-6 sm:h-6 text-blue-200" />
                                <span className="text-base sm:text-lg">
                                    Cloud cover: {weather.current.cloud_cover}%
                                </span>
                            </div>
                            <div className="flex items-center gap-3 text-white/80">
                                <WiHumidity className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-200" />
                                <span className="text-base sm:text-lg">
                                    Humidity:{" "}
                                    {weather.current.relative_humidity_2m}%
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Weather Icon and Stats */}
                    <div className="flex flex-col items-center sm:items-end justify-between">
                        {/* Weather Icon */}
                        <div className="relative w-full aspect-square max-w-[12rem] sm:max-w-[14rem] lg:max-w-[16rem]">
                            <img
                                src={getWeatherIconUrl(weathercode, isDay)}
                                alt={description}
                                className="w-full h-full object-contain drop-shadow-xl"
                            />
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-3 w-full mt-6">
                            {/* Wind Speed */}
                            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 backdrop-blur-md rounded-lg p-3 border border-white/15 hover:bg-blue-500/10 transition-colors">
                                <div className="flex items-center gap-2">
                                    <WiStrongWind className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300" />
                                    <span className="text-sm sm:text-base text-white/80">
                                        Wind
                                    </span>
                                </div>
                                <p className="text-base sm:text-lg text-white font-semibold mt-1 flex items-center gap-1">
                                    {
                                        formatWindSpeed(
                                            weather.current.wind_speed_10m
                                        ).split(" ")[0]
                                    }
                                    <span className="text-sm sm:text-base text-white/70">
                                        {
                                            formatWindSpeed(
                                                weather.current.wind_speed_10m
                                            ).split(" ")[1]
                                        }
                                    </span>
                                </p>
                            </div>
                            {/* UV Index */}
                            <div className="bg-gradient-to-br from-yellow-400/20 to-pink-400/20 backdrop-blur-md rounded-lg p-3 border border-white/15 hover:bg-yellow-400/10 transition-colors">
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                        />
                                    </svg>
                                    <span className="text-sm sm:text-base text-white/80">
                                        UV Index
                                    </span>
                                </div>
                                <p className="text-base sm:text-lg text-white font-semibold mt-1 flex items-center gap-1">
                                    {Math.round(weather.daily.uv_index_max[0])}
                                    <span className="text-sm sm:text-base text-white/70">
                                        of 11
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sun Times */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-3 text-white/80">
                        <WiSunrise className="w-6 h-6 sm:w-7 sm:h-7 text-yellow-200" />
                        <div>
                            <p className="text-xs text-white/60">Sunrise</p>
                            <p className="text-sm sm:text-base font-semibold">
                                {formatTime(weather.daily.sunrise[0])}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                        <WiSunset className="w-6 h-6 sm:w-7 sm:h-7 text-pink-200" />
                        <div>
                            <p className="text-xs text-white/60">Sunset</p>
                            <p className="text-sm sm:text-base font-semibold">
                                {formatTime(weather.daily.sunset[0])}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Last Updated */}
                <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <p className="text-white/80 text-xs sm:text-sm font-semibold py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md border border-white/15 inline-block w-55">
                        Last updated: {time}
                    </p>{" "}
                    <div className="flex items-center justify-between gap-4 w-full">
                        <div className="flex items-center gap-2 text-white/70 text-xs sm:text-sm">
                            <svg
                                className="w-4 h-4 sm:w-5 sm:h-5 text-blue-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                                />
                            </svg>
                            {isDay ? "Day" : "Night"}
                        </div>
                        <button
                            onClick={() =>
                                isLocationFavorite
                                    ? removeFromFavorites()
                                    : addToFavorites()
                            }
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg border border-white/30 transition-all duration-300 group"
                            title={
                                isLocationFavorite
                                    ? "Remove from favorites"
                                    : "Add to favorites"
                            }
                        >
                            {isLocationFavorite ? (
                                <BsStarFill className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                            ) : (
                                <BsStar className="w-4 h-4 sm:w-5 sm:h-5 text-white/80 group-hover:text-yellow-400 group-hover:scale-110 transition-all" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherCard;
