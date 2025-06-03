import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";
import {
    FaSave,
    FaExclamationTriangle,
    FaCheckCircle,
    FaSpinner,
    FaUser,
} from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";

const ProfileSettings = () => {
    const { currentUser } = useAuth();
    const { settings, updateSettings } = useSettings();
    const [localSettings, setLocalSettings] = useState({
        temperatureUnit: "celsius",
        windSpeedUnit: "kph",
        pressureUnit: "hPa",
        timeFormat: "12h",
        displayName: currentUser?.displayName || "",
        photoURL: currentUser?.photoURL || "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (settings) {
            const updatedSettings = {
                ...localSettings,
                ...settings,
            };
            setLocalSettings(updatedSettings);
        }
    }, [settings]);

    const handleSaveSettings = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            const success = await updateSettings(localSettings);
            if (success) {
                setMessage("Settings updated successfully");
                setTimeout(() => setMessage(""), 3000);
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

    return (
        <div className="min-h-screen p-4 md:p-6 bg-gradient-to-br from-gray-50 via-blue-50 to-white">
            <div className="max-w-4xl mx-auto">
                {/* Main Content */}
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl border border-gray-200 shadow-lg">
                    {error && (
                        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg mb-6 flex items-center animate-fade-in">
                            <FaExclamationTriangle className="mr-2" />
                            <span>{error}</span>
                        </div>
                    )}

                    {message && (
                        <div className="bg-green-100 border border-green-300 text-green-700 px-4 py-3 rounded-lg mb-6 flex items-center animate-fade-in">
                            <FaCheckCircle className="mr-2" />
                            <span>{message}</span>
                        </div>
                    )}

                    <form onSubmit={handleSaveSettings} className="space-y-8">
                        {/* Unit Preferences */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-800 flex items-center mb-4">
                                <TiWeatherPartlySunny
                                    className="mr-2 text-blue-600"
                                    size={20}
                                />
                                Unit Preferences
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 bg-white"
                                            />
                                            <span className="ml-2 text-gray-700">
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
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 bg-white"
                                            />
                                            <span className="ml-2 text-gray-700">
                                                mph
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Time Format
                                    </label>
                                    <div className="flex space-x-4">
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="timeFormat"
                                                value="12h"
                                                checked={
                                                    localSettings.timeFormat ===
                                                    "12h"
                                                }
                                                onChange={handleInputChange}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 bg-white"
                                            />
                                            <span className="ml-2 text-gray-700">
                                                12h (AM/PM)
                                            </span>
                                        </label>
                                        <label className="flex items-center">
                                            <input
                                                type="radio"
                                                name="timeFormat"
                                                value="24h"
                                                checked={
                                                    localSettings.timeFormat ===
                                                    "24h"
                                                }
                                                onChange={handleInputChange}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 bg-white"
                                            />
                                            <span className="ml-2 text-gray-700">
                                                24h
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="pt-6 border-t border-gray-200">
                            <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex items-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/20 disabled:opacity-50"
                            >
                                {loading ? (
                                    <FaSpinner className="animate-spin mr-2" />
                                ) : (
                                    <FaSave className="mr-2" />
                                )}
                                {loading ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileSettings;
