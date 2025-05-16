# User Settings Guide

This guide explains how user settings and preferences are implemented in the Weather App.

## Features

-   **Authentication**: Users can register, login, and manage their accounts
-   **User Preferences**: Users can set and update their weather display preferences
-   **Settings Application**: User preferences are applied consistently throughout the app
-   **Persistence**: Settings are stored in Firebase Firestore and persist across sessions

## User Settings

The app allows users to customize their experience with the following settings:

### Temperature Units

-   Celsius (°C)
-   Fahrenheit (°F)

### Wind Speed Units

-   Kilometers per hour (km/h)
-   Miles per hour (mph)

### Default Location

-   Set a preferred location to load on startup

### Notification Preferences

-   Severe weather alerts
-   Rain/snow alerts
-   Temperature change alerts

## Implementation

### SettingsContext

The heart of the user settings implementation is the `SettingsContext` that provides settings-related functionality to all components:

```jsx
// src/context/SettingsContext.jsx
const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState(defaultSettings);
    // ...other state and functions

    // Helper functions to format data based on user preferences
    const formatTemperature = (celsius, includeUnit = true) => {
        if (settings.temperatureUnit === "fahrenheit") {
            const fahrenheit = (celsius * 9) / 5 + 32;
            return includeUnit
                ? `${Math.round(fahrenheit)}°F`
                : Math.round(fahrenheit);
        }
        return includeUnit ? `${Math.round(celsius)}°C` : Math.round(celsius);
    };

    const formatWindSpeed = (kph, includeUnit = true) => {
        if (settings.windSpeedUnit === "mph") {
            const mph = kph / 1.60934;
            return includeUnit ? `${Math.round(mph)} mph` : Math.round(mph);
        }
        return includeUnit ? `${Math.round(kph)} km/h` : Math.round(kph);
    };

    // ...context provider value
};
```

### Component Integration

Weather data components use the settings context to format data according to user preferences:

```jsx
// Example from WeatherCard.jsx
const { formatTemperature } = useSettings();

// Display temperature according to user preference
<p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
    {formatTemperature(weather.current.temperature_2m)}
</p>;
```

## Using User Settings

### 1. Import the Settings Hook

```jsx
import { useSettings } from "../context/SettingsContext";
```

### 2. Access Settings and Helper Functions

```jsx
const {
    settings, // Current settings object
    formatTemperature, // Format temperatures according to user preferences
    formatWindSpeed, // Format wind speeds according to user preferences
    updateSettings, // Function to update user settings
} = useSettings();
```

### 3. Apply Settings to Your Components

```jsx
// Format temperature
<p>{formatTemperature(celsius)}</p>

// Format wind speed
<p>{formatWindSpeed(windSpeedInKph)}</p>

// Access specific settings
{settings.temperatureUnit === 'celsius' ? 'Using Celsius' : 'Using Fahrenheit'}
```

## Settings Storage

User settings are stored in Firebase Firestore under the `/users/{userId}/settings` document. When a user is authenticated, their settings are automatically loaded and applied.

For non-authenticated users, default settings are used.

## Settings Page

Users can update their preferences from the Profile page, which has a Settings tab where all preferences can be customized.
