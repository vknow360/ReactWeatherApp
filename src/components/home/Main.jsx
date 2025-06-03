import React, { useContext } from "react";
import WeatherCard from "./WeatherCard";
import TodayForecast from "./TodayForecast";
import WeeklyForecast from "./WeeklyForecast";
import Conditions from "./Conditions";
import Footer from "../Footer";
import SearchBar from "./SearchBar";
import LoadingSkeleton from "./LoadingSkeleton";
import HeaderActions from "./HeaderActions";
import WeatherContext from "../../context/WeatherContext";
import { getWeatherForecast } from "../../api/weather";

const Main = () => {
    const { weather, isLoading, setLocation, setWeather, setError } =
        useContext(WeatherContext);

    const handleLocationSelect = async (selectedLocation) => {
        const { weath, err } = await getWeatherForecast(
            selectedLocation.lat,
            selectedLocation.lon,
            selectedLocation.timeZone
        );
        if (err === "") {
            setWeather(weath);
            setError("");
            setLocation(selectedLocation);
        } else {
            setError(err);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen w-full">
                <div className="container mx-auto max-w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
                    <LoadingSkeleton />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full">
            {/* Main Content */}
            <div className="relative z-10 w-full min-h-screen">
                <div className="container mx-auto max-w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
                    {/* Header Section with Search and Actions */}
                    <div className="bg-gradient-to-br from-white/90 via-blue-50/80 to-indigo-50/70 rounded-2xl p-6 border-2 border-blue-300/30 shadow-xl backdrop-blur-lg ring-1 ring-blue-200/50 hover:shadow-2xl transition-all duration-300">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                            {/* Title and Description */}
                            <div className="flex-1">
                                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 flex items-center gap-3">
                                    <svg
                                        className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-indigo-600 animate-pulse"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"
                                        />
                                    </svg>
                                    <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 text-transparent bg-clip-text animate-gradient">
                                        Weather Dashboard
                                    </span>
                                </h1>
                                <p className="text-sm sm:text-base text-indigo-700/80">
                                    Real-time weather updates for your location
                                </p>
                            </div>
                            {/* Actions and Search */}{" "}
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                                <HeaderActions />
                                <div className="relative w-full md:w-72 lg:w-96">
                                    <div className="bg-gradient-to-r from-white/80 to-blue-50/60 p-1.5 rounded-[1rem] backdrop-blur-lg border border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-blue-300/50">
                                        {" "}
                                        <SearchBar
                                            onLocationSelect={
                                                handleLocationSelect
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="mt-6 space-y-6">
                        {/* Current Weather */}
                        <div className="w-full">
                            {" "}
                            <div className="h-full bg-gradient-to-br from-white via-white to-blue-50/90 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500">
                                <WeatherCard />
                            </div>
                        </div>
                        {/* Weather Map Section */}
                        <div className="bg-gradient-to-br from-white via-white to-indigo-50/30 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 p-6">
                            <div className="flex items-center gap-4 mb-6 bg-gradient-to-r from-indigo-600 to-blue-600 p-4 rounded-xl shadow-lg">
                                <div className="p-3 rounded-xl bg-indigo-700">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-lg font-semibold text-white">
                                        Weather Map
                                    </h2>
                                    <p className="text-sm text-indigo-100">
                                        Interactive weather visualization
                                    </p>
                                </div>
                            </div>
                            <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                                <div className="w-full h-full flex items-center justify-center text-gray-500">
                                    <p>Weather Map Coming Soon</p>
                                </div>
                            </div>
                        </div>
                        {/* Air Quality and Recent Events Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Air Quality Card */}
                            <div className="bg-gradient-to-br from-white via-white to-emerald-50/30 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 p-6">
                                <div className="flex items-center gap-4 mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 p-4 rounded-xl shadow-lg">
                                    <div className="p-3 rounded-xl bg-emerald-700">
                                        <svg
                                            className="w-6 h-6 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-white">
                                            Air Quality
                                        </h2>
                                        <p className="text-sm text-emerald-100">
                                            Current air quality metrics
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="text-center text-gray-500">
                                        <p>
                                            Air Quality Information Coming Soon
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Recent Events Card */}
                            <div className="bg-gradient-to-br from-white via-white to-amber-50/30 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 p-6">
                                <div className="flex items-center gap-4 mb-6 bg-gradient-to-r from-amber-600 to-orange-600 p-4 rounded-xl shadow-lg">
                                    <div className="p-3 rounded-xl bg-amber-700">
                                        <svg
                                            className="w-6 h-6 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-semibold text-white">
                                            Recent Events
                                        </h2>
                                        <p className="text-sm text-amber-100">
                                            Latest weather events and changes
                                        </p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="text-center text-gray-500">
                                        <p>Recent Weather Events Coming Soon</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Existing Sections */}
                        {/* Two Column Grid for Conditions and Today's Forecast */}
                        <div className="grid grid-cols-1 gap-6">
                            {/* Conditions Card */}{" "}
                            <div className="bg-gradient-to-br from-white via-white to-blue-50/30 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 p-6">
                                <Conditions />
                            </div>
                            {/* Today's Forecast Card */}{" "}
                            <div className="bg-gradient-to-br from-white via-white to-teal-50/30 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 p-6">
                                {" "}
                                <div className="flex items-center gap-4 mb-6 bg-gradient-to-r from-teal-600 to-blue-600 p-4 rounded-xl shadow-lg">
                                    <div className="p-3 rounded-xl bg-teal-700">
                                        <svg
                                            className="w-6 h-6 text-white"
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
                                    </div>
                                    <div>
                                        {" "}
                                        <h2 className="text-lg font-semibold text-white">
                                            Today's Forecast
                                        </h2>
                                        <p className="text-sm text-teal-100">
                                            Hourly forecast for next 24 hours
                                        </p>
                                    </div>
                                </div>
                                <TodayForecast />
                            </div>
                        </div>
                        {/* Weekly Forecast - Full width */}{" "}
                        <div className="bg-gradient-to-br from-white via-white to-magenta-50/30 backdrop-blur-lg rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500 p-6">
                            {" "}
                            <div className="flex items-center gap-4 mb-6 bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-xl shadow-lg">
                                <div className="p-3 rounded-xl bg-purple-700">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    {" "}
                                    <h2 className="text-lg font-semibold text-white">
                                        7-Day Forecast
                                    </h2>
                                    <p className="text-sm text-purple-100">
                                        Weekly weather forecast
                                    </p>
                                </div>
                            </div>
                            <WeeklyForecast />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
