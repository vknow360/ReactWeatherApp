import React, { useContext, useState, useRef, useEffect } from "react";
import {
    BsArrowClockwise,
    BsStar,
    BsStarFill,
    BsThermometerHalf,
    BsChevronDown,
    BsGeoAlt,
} from "react-icons/bs";
import WeatherContext from "../../context/WeatherContext";
import { useSettings } from "../../context/SettingsContext";

const HeaderActions = () => {
    const {
        refreshWeather,
        addToFavorites,
        removeFromFavorites,
        isLocationFavorite,
        favorites,
        setLocation,
        location,
    } = useContext(WeatherContext);
    const { settings, updateSettings } = useSettings();
    const [showFavorites, setShowFavorites] = useState(false);
    const dropdownRef = useRef(null);

    const handleUnitToggle = (newUnit) => {
        updateSettings({ ...settings, temperatureUnit: newUnit });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowFavorites(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleFavoriteSelect = (favorite) => {
        setLocation(favorite);
        setShowFavorites(false);
    };

    return (
        <div className="flex items-center gap-3">
            {/* Temperature Unit Toggle */}{" "}
            <div className="flex items-center bg-white/60 backdrop-blur-sm rounded-xl p-1.5 border-2 border-blue-300/30 shadow-md ring-1 ring-blue-200/50">
                <button
                    onClick={() => handleUnitToggle("celsius")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all duration-300 transform ${
                        settings.temperatureUnit === "celsius"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm scale-105"
                            : "text-blue-700 hover:bg-white/50 scale-100 hover:scale-105"
                    }`}
                >
                    <BsThermometerHalf
                        className={`w-4 h-4 transition-transform duration-300 ${
                            settings.temperatureUnit === "celsius"
                                ? "rotate-0"
                                : "-rotate-12"
                        }`}
                    />
                    °C
                </button>
                <button
                    onClick={() => handleUnitToggle("fahrenheit")}
                    className={`px-3 py-1.5 rounded-lg flex items-center gap-2 transition-all duration-300 transform ${
                        settings.temperatureUnit === "fahrenheit"
                            ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-sm scale-105"
                            : "text-blue-700 hover:bg-white/50 scale-100 hover:scale-105"
                    }`}
                >
                    <BsThermometerHalf
                        className={`w-4 h-4 transition-transform duration-300 ${
                            settings.temperatureUnit === "fahrenheit"
                                ? "rotate-0"
                                : "-rotate-12"
                        }`}
                    />
                    °F
                </button>
            </div>{" "}
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
                {/* Refresh Button */}{" "}
                <button
                    onClick={refreshWeather}
                    className="p-2.5 bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-xl border-2 border-blue-300/30 text-blue-600 hover:text-blue-700 transition-all duration-300 group shadow-md hover:shadow-lg ring-1 ring-blue-200/50"
                    title="Refresh weather data"
                >
                    <BsArrowClockwise className="w-5 h-5 group-hover:rotate-180 transition-all duration-500" />
                </button>
            </div>
        </div>
    );
};

export default HeaderActions;
