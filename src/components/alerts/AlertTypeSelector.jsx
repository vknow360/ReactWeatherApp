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
        all: { icon: FaCloud, name: "All Alerts", color: "blue" },
        temperature: {
            icon: FaTemperatureHigh,
            name: "Temperature",
            color: "red",
        },
        precipitation: {
            icon: FaCloudRain,
            name: "Precipitation",
            color: "cyan",
        },
        wind: { icon: FaWind, name: "Wind", color: "indigo" },
        visibility: { icon: FaEye, name: "Visibility", color: "purple" },
        uv: { icon: FaSun, name: "UV Index", color: "amber" },
        thunderstorm: { icon: FaBolt, name: "Thunderstorm", color: "yellow" },
        humidity: { icon: WiHumidity, name: "Humidity", color: "teal" },
    };

    return (
        <div className="space-y-4">
            {/* Section Title */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                    Alert Categories
                </h3>
            </div>

            {/* Type Selection Grid */}
            <div className="grid grid-cols-2 gap-3">
                {types.map((type) => {
                    const info = typeInfo[type] || {
                        icon: FaCloud,
                        name: type.charAt(0).toUpperCase() + type.slice(1),
                        color: "gray",
                    };
                    const Icon = info.icon;
                    const isSelected = type === selectedType;

                    return (
                        <button
                            key={type}
                            onClick={() => onTypeChange(type)}
                            className={`
                                relative p-3 rounded-xl border transition-all duration-200
                                ${
                                    isSelected
                                        ? `bg-${info.color}-500 border-${info.color}-500 text-white hover:bg-${info.color}-600`
                                        : `bg-white border-gray-200 text-${info.color}-700 hover:border-${info.color}-500`
                                }
                            `}
                        >
                            <div className="flex flex-col items-center gap-2">
                                <div
                                    className={`rounded-lg p-2 ${
                                        isSelected
                                            ? "bg-white/20"
                                            : `bg-${info.color}-50`
                                    }`}
                                >
                                    <Icon
                                        className={`w-5 h-5 ${
                                            isSelected
                                                ? "text-white"
                                                : `text-${info.color}-500`
                                        }`}
                                    />
                                </div>
                                <span className="text-sm font-medium line-clamp-1">
                                    {info.name}
                                </span>
                            </div>

                            {/* Selection Indicator */}
                            <div
                                className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
                                    isSelected ? "bg-white" : "bg-transparent"
                                }`}
                            />
                        </button>
                    );
                })}
            </div>

            {/* Current Selection Info */}
            <div className="pt-4 mt-4 border-t border-gray-100">
                <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-600 text-center">
                        {selectedType === "all"
                            ? "Showing all alert types"
                            : `Filtered to ${
                                  typeInfo[selectedType]?.name || selectedType
                              } alerts`}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AlertTypeSelector;
