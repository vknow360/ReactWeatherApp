import React from "react";
import {
    FaTemperatureHigh,
    FaWind,
    FaCloudRain,
    FaEye,
    FaSun,
    FaBolt,
    FaCloud,
} from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";

const AlertTypeSelector = ({ types = [], selectedType, onTypeChange }) => {
    const typeInfo = {
        all: { icon: <FaCloud />, name: "All Alerts" },
        temperature: { icon: <FaTemperatureHigh />, name: "Temperature" },
        precipitation: { icon: <FaCloudRain />, name: "Precipitation" },
        wind: { icon: <FaWind />, name: "Wind" },
        visibility: { icon: <FaEye />, name: "Visibility" },
        uv: { icon: <FaSun />, name: "UV Index" },
        thunderstorm: { icon: <FaBolt />, name: "Thunderstorm" },
        humidity: { icon: <WiHumidity size={18} />, name: "Humidity" },
        air: { icon: <FaCloud />, name: "Air Quality" },
    };

    return (
        <div className="px-4 py-3 border-b border-[#243447] overflow-x-auto">
            <div className="flex space-x-2">
                {types.map((type) => {
                    const info = typeInfo[type] || {
                        icon: <FaCloud />,
                        name: type.charAt(0).toUpperCase() + type.slice(1),
                    };
                    return (
                        <button
                            key={type}
                            onClick={() => onTypeChange(type)}
                            className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs whitespace-nowrap ${
                                selectedType === type
                                    ? "bg-cyan-500/25 text-cyan-400"
                                    : "bg-[#1a2535] text-gray-400 hover:bg-[#243447]"
                            }`}
                        >
                            <span className="text-base">{info.icon}</span>
                            <span>{info.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default AlertTypeSelector;
