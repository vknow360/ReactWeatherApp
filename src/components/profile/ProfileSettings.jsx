import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";
import {
    FaSave,
    FaExclamationTriangle,
    FaCheckCircle,
    FaSpinner,
} from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { WiDaySunny, WiStrongWind } from "react-icons/wi";
import { MdNotifications } from "react-icons/md";

const ProfileSettings = () => {
    const { currentUser } = useAuth();
    const { settings, updateSettings } = useSettings(); // Initialize with default values to prevent undefined issues
    const [localSettings, setLocalSettings] = useState({
        temperatureUnit: "celsius",
        windSpeedUnit: "kph",
        pressureUnit: "hPa",
        visibilityUnit: "km",
        timeFormat: "12h",
        defaultLocation: "",
        refreshInterval: 30,
        notifications: {
            severe: true,
            precipitation: false,
            temperature: false,
            wind: false,
            uv: false,
        },
        display: {
            hourlyForecast: true,
            weeklyForecast: true,
            weatherNews: true,
            weatherAlerts: true,
            weatherMap: false,
        },
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    useEffect(() => {
        // Synchronize local state with global settings
        if (settings) {
            // Ensure all required properties exist with defaults if missing
            const updatedSettings = {
                ...localSettings, // Start with default values
                ...settings, // Override with actual settings
                // Ensure nested objects are properly initialized with defaults
                notifications: {
                    severe: true,
                    precipitation: false,
                    temperature: false,
                    wind: false,
                    uv: false,
                    ...(settings.notifications || {}),
                },
                display: {
                    hourlyForecast: true,
                    weeklyForecast: true,
                    weatherNews: true,
                    weatherAlerts: true,
                    weatherMap: false,
                    ...(settings.display || {}),
                },
            };
            setLocalSettings(updatedSettings);
        }
    }, [settings]);
    const handleSaveSettings = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            setError("");

            // Update global settings through context
            const success = await updateSettings(localSettings);

            if (success) {
                setMessage("Settings updated successfully");

                // Clear the success message after 3 seconds
                setTimeout(() => {
                    setMessage("");
                }, 3000);
            } else {
                throw new Error("Failed to update settings");
            }
        } catch (err) {
            setError("Failed to update settings");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLocalSettings({ ...localSettings, [name]: value });
    };
    const handleNotificationChange = (notificationType) => {
        setLocalSettings({
            ...localSettings,
            notifications: {
                ...localSettings.notifications,
                [notificationType]:
                    !localSettings.notifications[notificationType],
            },
        });
    };
    const handleDisplayComponentChange = (componentKey) => {
        // Ensure display object exists and safely toggle the component
        const currentDisplay = localSettings.display || {};
        const currentValue = currentDisplay[componentKey] || false;

        setLocalSettings({
            ...localSettings,
            display: {
                ...currentDisplay,
                [componentKey]: !currentValue,
            },
        });
    };

    return (
        <div>
            {error && (
                <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-4 flex items-center">
                    <FaExclamationTriangle className="mr-2" />
                    <span>{error}</span>
                </div>
            )}

            {message && (
                <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg mb-4 flex items-center">
                    <FaCheckCircle className="mr-2" />
                    <span>{message}</span>
                </div>
            )}

            <form onSubmit={handleSaveSettings} className="space-y-6">
                <div>
                    <h3 className="text-lg font-medium text-white flex items-center mb-4">
                        <TiWeatherPartlySunny
                            className="mr-2 text-cyan-400"
                            size={20}
                        />
                        Weather Display Settings
                    </h3>{" "}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="temperatureUnit"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Temperature Unit
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="temperatureUnit"
                                        value="celsius"
                                        checked={
                                            localSettings.temperatureUnit ===
                                            "celsius"
                                        }
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                                    />
                                    <span className="ml-2 text-gray-300">
                                        °C (Celsius)
                                    </span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="temperatureUnit"
                                        value="fahrenheit"
                                        checked={
                                            localSettings.temperatureUnit ===
                                            "fahrenheit"
                                        }
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                                    />
                                    <span className="ml-2 text-gray-300">
                                        °F (Fahrenheit)
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="windSpeedUnit"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Wind Speed Unit
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="windSpeedUnit"
                                        value="kph"
                                        checked={
                                            localSettings.windSpeedUnit ===
                                            "kph"
                                        }
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                                    />
                                    <span className="ml-2 text-gray-300">
                                        km/h
                                    </span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="windSpeedUnit"
                                        value="mph"
                                        checked={
                                            localSettings.windSpeedUnit ===
                                            "mph"
                                        }
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                                    />
                                    <span className="ml-2 text-gray-300">
                                        mph
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="pressureUnit"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Pressure Unit
                            </label>
                            <div className="flex flex-wrap gap-3">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="pressureUnit"
                                        value="hPa"
                                        checked={
                                            localSettings.pressureUnit === "hPa"
                                        }
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                                    />
                                    <span className="ml-2 text-gray-300">
                                        hPa
                                    </span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="pressureUnit"
                                        value="inHg"
                                        checked={
                                            localSettings.pressureUnit ===
                                            "inHg"
                                        }
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                                    />
                                    <span className="ml-2 text-gray-300">
                                        inHg
                                    </span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="pressureUnit"
                                        value="mmHg"
                                        checked={
                                            localSettings.pressureUnit ===
                                            "mmHg"
                                        }
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                                    />
                                    <span className="ml-2 text-gray-300">
                                        mmHg
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="visibilityUnit"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Visibility Unit
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="visibilityUnit"
                                        value="km"
                                        checked={
                                            localSettings.visibilityUnit ===
                                            "km"
                                        }
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                                    />
                                    <span className="ml-2 text-gray-300">
                                        km
                                    </span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="visibilityUnit"
                                        value="miles"
                                        checked={
                                            localSettings.visibilityUnit ===
                                            "miles"
                                        }
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                                    />
                                    <span className="ml-2 text-gray-300">
                                        miles
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="timeFormat"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Time Format
                            </label>
                            <div className="flex space-x-4">
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="timeFormat"
                                        value="12h"
                                        checked={
                                            localSettings.timeFormat === "12h"
                                        }
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                                    />
                                    <span className="ml-2 text-gray-300">
                                        12h (AM/PM)
                                    </span>
                                </label>
                                <label className="flex items-center">
                                    <input
                                        type="radio"
                                        name="timeFormat"
                                        value="24h"
                                        checked={
                                            localSettings.timeFormat === "24h"
                                        }
                                        onChange={handleInputChange}
                                        className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                                    />
                                    <span className="ml-2 text-gray-300">
                                        24h
                                    </span>
                                </label>
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="refreshInterval"
                                className="block text-sm font-medium text-gray-300 mb-1"
                            >
                                Auto-Refresh Interval
                            </label>
                            <select
                                name="refreshInterval"
                                id="refreshInterval"
                                value={localSettings.refreshInterval}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-[#243447] rounded-lg bg-[#1a2535] text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                            >
                                <option value="15">15 minutes</option>
                                <option value="30">30 minutes</option>
                                <option value="60">1 hour</option>
                                <option value="180">3 hours</option>
                                <option value="0">Never (Manual only)</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4">
                        <label
                            htmlFor="defaultLocation"
                            className="block text-sm font-medium text-gray-300 mb-1"
                        >
                            Default Location
                        </label>{" "}
                        <input
                            type="text"
                            name="defaultLocation"
                            value={localSettings.defaultLocation || ""}
                            onChange={handleInputChange}
                            placeholder="e.g., New York, USA"
                            className="block w-full px-3 py-2 border border-[#243447] rounded-lg bg-[#1a2535] text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                        />
                        <p className="mt-1 text-xs text-gray-400">
                            This location will be loaded by default when you
                            open the app
                        </p>
                    </div>
                </div>

                <div className="border-t border-[#243447] pt-6">
                    <h3 className="text-lg font-medium text-white flex items-center mb-4">
                        <MdNotifications
                            className="mr-2 text-cyan-400"
                            size={20}
                        />
                        Notification Preferences
                    </h3>{" "}
                    <div className="space-y-3">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={localSettings.notifications.severe}
                                onChange={() =>
                                    handleNotificationChange("severe")
                                }
                                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                            />
                            <span className="ml-2 text-gray-300">
                                Severe weather alerts
                            </span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={
                                    localSettings.notifications.precipitation
                                }
                                onChange={() =>
                                    handleNotificationChange("precipitation")
                                }
                                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                            />
                            <span className="ml-2 text-gray-300">
                                Rain/snow alerts
                            </span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={
                                    localSettings.notifications.temperature
                                }
                                onChange={() =>
                                    handleNotificationChange("temperature")
                                }
                                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                            />
                            <span className="ml-2 text-gray-300">
                                Temperature change alerts
                            </span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={localSettings.notifications.wind}
                                onChange={() =>
                                    handleNotificationChange("wind")
                                }
                                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                            />
                            <span className="ml-2 text-gray-300">
                                Wind advisories
                            </span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={localSettings.notifications.uv}
                                onChange={() => handleNotificationChange("uv")}
                                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                            />
                            <span className="ml-2 text-gray-300">
                                UV index warnings
                            </span>
                        </label>
                    </div>
                </div>

                {/* <div className="border-t border-[#243447] pt-6">
                    <h3 className="text-lg font-medium text-white flex items-center mb-4">
                        <TiWeatherPartlySunny
                            className="mr-2 text-cyan-400"
                            size={20}
                        />
                        Display Components
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {" "}
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={
                                    localSettings.display &&
                                    localSettings.display.hourlyForecast
                                }
                                onChange={() =>
                                    handleDisplayComponentChange(
                                        "hourlyForecast"
                                    )
                                }
                                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                            />
                            <span className="ml-2 text-gray-300">
                                Today's Forecast
                            </span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={
                                    localSettings.display &&
                                    localSettings.display.weeklyForecast
                                }
                                onChange={() =>
                                    handleDisplayComponentChange(
                                        "weeklyForecast"
                                    )
                                }
                                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                            />
                            <span className="ml-2 text-gray-300">
                                Weekly Forecast
                            </span>
                        </label>{" "}
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={
                                    localSettings.display &&
                                    localSettings.display.weatherNews
                                }
                                onChange={() =>
                                    handleDisplayComponentChange("weatherNews")
                                }
                                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                            />
                            <span className="ml-2 text-gray-300">
                                Weather News Panel
                            </span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={
                                    localSettings.display &&
                                    localSettings.display.weatherAlerts
                                }
                                onChange={() =>
                                    handleDisplayComponentChange(
                                        "weatherAlerts"
                                    )
                                }
                                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                            />
                            <span className="ml-2 text-gray-300">
                                Weather Alerts
                            </span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={
                                    localSettings.display &&
                                    localSettings.display.weatherMap
                                }
                                onChange={() =>
                                    handleDisplayComponentChange("weatherMap")
                                }
                                className="h-4 w-4 text-cyan-500 focus:ring-cyan-500 border-[#243447] bg-[#1a2535]"
                            />
                            <span className="ml-2 text-gray-300">
                                Weather Map (Coming Soon)
                            </span>
                        </label>
                    </div>
                </div> */}

                <div className="mt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
                    >
                        <FaSave className="mr-2" />
                        {loading ? "Saving..." : "Save Settings"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfileSettings;
