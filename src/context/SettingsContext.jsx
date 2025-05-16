import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

// Create settings context
const SettingsContext = createContext();

// Default settings
const defaultSettings = {
    temperatureUnit: "celsius",
    windSpeedUnit: "kph",
    pressureUnit: "hPa",
    visibilityUnit: "km",
    timeFormat: "12h",
    defaultLocation: null,
    refreshInterval: 30, // minutes
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
};

// Provider component
export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(defaultSettings);
    const [loading, setLoading] = useState(true);
    const { currentUser, getUserSettings, updateUserSettings } = useAuth();

    // Load settings from user profile if authenticated
    useEffect(() => {
        const loadSettings = async () => {
            try {
                if (currentUser) {
                    const userSettings = await getUserSettings(currentUser.uid);
                    if (userSettings) {
                        setSettings(userSettings);
                    }
                }
            } catch (error) {
                console.error("Failed to load user settings:", error);
            } finally {
                setLoading(false);
            }
        };

        loadSettings();
    }, [currentUser, getUserSettings]);

    // Update settings in state and in user profile
    const updateSettings = async (newSettings) => {
        // Update local state immediately for responsive UI
        setSettings(newSettings);

        // Save to user profile if authenticated
        if (currentUser) {
            try {
                await updateUserSettings(currentUser.uid, newSettings);
                return true;
            } catch (error) {
                console.error("Failed to update user settings:", error);
                return false;
            }
        }

        return true;
    };

    // Convert temperature based on user settings
    const formatTemperature = (celsius, includeUnit = true) => {
        if (settings.temperatureUnit === "fahrenheit") {
            const fahrenheit = (celsius * 9) / 5 + 32;
            return includeUnit
                ? `${Math.round(fahrenheit)}°F`
                : Math.round(fahrenheit);
        }
        return includeUnit ? `${Math.round(celsius)}°C` : Math.round(celsius);
    }; // Convert wind speed based on user settings
    const formatWindSpeed = (kph, includeUnit = true) => {
        if (settings.windSpeedUnit === "mph") {
            const mph = kph / 1.60934;
            return includeUnit ? `${Math.round(mph)} mph` : Math.round(mph);
        }
        return includeUnit ? `${Math.round(kph)} km/h` : Math.round(kph);
    };

    // Format pressure based on user settings
    const formatPressure = (hPa, includeUnit = true) => {
        if (settings.pressureUnit === "inHg") {
            const inHg = hPa * 0.02953;
            return includeUnit ? `${inHg.toFixed(2)} inHg` : inHg.toFixed(2);
        } else if (settings.pressureUnit === "mmHg") {
            const mmHg = hPa * 0.750062;
            return includeUnit ? `${Math.round(mmHg)} mmHg` : Math.round(mmHg);
        }
        return includeUnit ? `${Math.round(hPa)} hPa` : Math.round(hPa);
    };

    // Format visibility based on user settings
    const formatVisibility = (km, includeUnit = true) => {
        if (settings.visibilityUnit === "miles") {
            const miles = km / 1.60934;
            return includeUnit ? `${miles.toFixed(1)} mi` : miles.toFixed(1);
        }
        return includeUnit ? `${km.toFixed(1)} km` : km.toFixed(1);
    };

    // Format time based on user settings
    const formatTime = (isoString, timeZoneOffset = 0) => {
        try {
            let date = new Date(isoString);

            // Apply timezone offset if provided
            if (timeZoneOffset !== 0) {
                date = new Date(date.getTime() + timeZoneOffset * 1000);
            }

            if (settings.timeFormat === "24h") {
                return date.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                });
            } else {
                return date.toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                });
            }
        } catch (error) {
            console.error("Error formatting time:", error);
            return isoString; // Return original string if error
        }
    };

    // Values to share with consumer components
    const value = {
        settings,
        updateSettings,
        formatTemperature,
        formatWindSpeed,
        formatPressure,
        formatVisibility,
        formatTime,
        loading,
    };

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    );
};

// Custom hook to use the settings context
export const useSettings = () => {
    return useContext(SettingsContext);
};

export default SettingsContext;
