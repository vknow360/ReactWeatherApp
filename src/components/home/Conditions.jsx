import React from "react";
import {
    BsThermometerHalf,
    BsEyeFill,
    BsDropletHalf,
    BsWater,
    BsCompass,
    BsCloudRainHeavy,
    BsSnow,
    BsLightning,
} from "react-icons/bs";
import { WiBarometer, WiHumidity } from "react-icons/wi";
import {
    FaLocationArrow,
    FaTemperatureHigh,
    FaTemperatureLow,
    FaPercent,
} from "react-icons/fa";
import { useContext } from "react";
import WeatherContext from "../../context/WeatherContext";
import { useSettings } from "../../context/SettingsContext";

const Conditions = () => {
    const { weather } = useContext(WeatherContext);
    const {
        formatTemperature,
        formatWindSpeed,
        formatPressure,
        formatVisibility,
    } = useSettings();
    const current = weather.current;
    const daily = weather.daily;

    // Helper function to interpret CAPE values
    function getCapeRisk(cape) {
        if (cape < 300) return "Low";
        if (cape < 1000) return "Moderate";
        if (cape < 2500) return "High";
        return "Extreme";
    }

    // Helper function to convert wind direction degrees to cardinal directions
    function getWindDirection(degrees) {
        const directions = [
            "N",
            "NNE",
            "NE",
            "ENE",
            "E",
            "ESE",
            "SE",
            "SSE",
            "S",
            "SSW",
            "SW",
            "WSW",
            "W",
            "WNW",
            "NW",
            "NNW",
        ];
        const index = Math.round(degrees / 22.5) % 16;
        return directions[index];
    }
    const conditionItems = [
        {
            icon: <FaTemperatureHigh size={20} />,
            label: "High Today",
            value: formatTemperature(daily.temperature_2m_max[0]),
            color: "text-white",
            bgColor: "bg-orange-600",
        },
        {
            icon: <FaTemperatureLow size={20} />,
            label: "Low Today",
            value: formatTemperature(daily.temperature_2m_min[0]),
            color: "text-white",
            bgColor: "bg-blue-600",
        },
        {
            icon: <BsDropletHalf size={20} />,
            label: "Precipitation",
            value: `${current.precipitation_probability}%`,
            color: "text-white",
            bgColor: "bg-cyan-600",
        },
        {
            icon: <BsCloudRainHeavy size={20} />,
            label: "Rain Showers",
            value: `${current.showers} mm`,
            color: "text-white",
            bgColor: "bg-teal-600",
        },
        {
            icon: <BsSnow size={20} />,
            label: "Snowfall",
            value: `${current.snowfall} cm`,
            color: "text-white",
            bgColor: "bg-gray-600",
        },
        {
            icon: <BsEyeFill size={20} />,
            label: "Visibility",
            value: formatVisibility(current.visibility / 1000),
            color: "text-white",
            bgColor: "bg-gray-600",
        },
        {
            icon: <WiBarometer size={24} />,
            label: "Sea Level Pressure",
            value: formatPressure(current.pressure_msl),
            color: "text-white",
            bgColor: "bg-blue-600",
        },
        {
            icon: <BsWater size={20} />,
            label: "Dew Point",
            value: formatTemperature(current.dew_point_2m),
            color: "text-white",
            bgColor: "bg-cyan-600",
        },
        {
            icon: <BsCompass size={20} />,
            label: "Wind Direction",
            value: `${getWindDirection(
                current.wind_direction_10m
            )} (${Math.round(current.wind_direction_10m)}°)`,
            color: "text-white",
            bgColor: "bg-pink-600",
        },
        {
            icon: (
                <FaLocationArrow
                    size={20}
                    style={{
                        transform: `rotate(${current.wind_direction_10m}deg)`,
                    }}
                />
            ),
            label: "Wind Gusts",
            value: formatWindSpeed(current.wind_gusts_10m),
            color: "text-white",
            bgColor: "bg-blue-600",
        },
        {
            icon: <WiHumidity size={24} />,
            label: "Humidity",
            value: `${current.relative_humidity_2m}%`,
            color: "text-white",
            bgColor: "bg-teal-600",
        },
        {
            icon: <BsLightning size={20} />,
            label: "Thunderstorm Risk",
            value: getCapeRisk(current.cape),
            color: "text-white",
            bgColor: "bg-orange-600",
        },
    ];

    return (
        <div className="h-full">
            {/* Section Title */}{" "}
            <div className="flex items-center gap-4 mb-8 bg-gradient-to-r from-blue-700 via-blue-800 to-cyan-700 backdrop-blur-sm p-4 rounded-2xl border border-blue-600 shadow-lg">
                {" "}
                <div className="p-3 rounded-xl bg-blue-900 shadow-md">
                    <BsThermometerHalf className="w-6 h-6 text-white" />
                </div>
                <div>
                    {" "}
                    <h2 className="text-xl font-extrabold text-white">
                        Weather Conditions
                    </h2>{" "}
                    <p className="text-sm text-pink-100 font-medium">
                        Detailed weather metrics
                    </p>
                </div>
            </div>
            {/* Grid of conditions - 2 columns on mobile, 3 on larger screens */}{" "}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {conditionItems.map((item, index) => (
                    <div
                        key={index}
                        className="relative p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-600/30 via-cyan-600/25 to-teal-600/30 backdrop-blur-xl border border-blue-300 shadow hover:shadow-lg hover:scale-[1.02] transition-all group overflow-hidden"
                    >
                        <div className="relative flex items-center sm:items-start gap-3 sm:gap-4 z-10">
                            <div
                                className={`p-2.5 sm:p-3 rounded-xl ${item.bgColor} shadow-sm group-hover:scale-110 transition-transform flex-shrink-0`}
                            >
                                <span className={item.color}>{item.icon}</span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-gray-600 text-xs sm:text-sm font-semibold tracking-wide truncate">
                                    {item.label}
                                </p>
                                <p className="text-gray-900 font-bold text-base sm:text-lg tracking-tight truncate">
                                    {item.value}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Conditions;
