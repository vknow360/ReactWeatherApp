import React from "react";
import AlertCard from "./AlertCard";
import {
    FaTemperatureHigh,
    FaWind,
    FaCloudRain,
    FaEye,
    FaSun,
    FaBolt,
    FaCloud,
    FaSmog,
} from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { MdFlood } from "react-icons/md";
import { BsSnow } from "react-icons/bs";

const AlertsList = ({ alerts = [] }) => {
    const getAlertIcon = (type, icon) => {
        if (icon) {
            switch (icon.toLowerCase()) {
                case "heat":
                case "cold":
                    return FaTemperatureHigh;
                case "rain":
                    return FaCloudRain;
                case "flood":
                    return MdFlood;
                case "wind":
                    return FaWind;
                case "snow":
                    return BsSnow;
                case "fog":
                    return FaEye;
                case "sun":
                    return FaSun;
                case "thunderstorm":
                    return FaBolt;
                case "humidity":
                    return WiHumidity;
                case "air":
                    return FaSmog;
            }
        }

        // Fallback to type-based icons
        switch (type.toLowerCase()) {
            case "temperature":
                return FaTemperatureHigh;
            case "precipitation":
                return FaCloudRain;
            case "wind":
                return FaWind;
            case "visibility":
                return FaEye;
            case "uv":
                return FaSun;
            case "thunderstorm":
                return FaBolt;
            case "humidity":
                return WiHumidity;
            case "air":
                return FaSmog;
            default:
                return FaCloud;
        }
    };

    return (
        <div className="space-y-4 sm:space-y-6">
            {alerts && alerts.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 sm:gap-6">
                    {alerts.map((alert) => (
                        <AlertCard
                            key={alert.id}
                            alert={alert}
                            icon={getAlertIcon(alert.type, alert.icon)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 sm:py-16">
                    <div className="bg-gray-50 rounded-full p-6 mb-6">
                        <FaCloud className="text-blue-500 w-12 h-12" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                        No Active Alerts
                    </h3>
                    <p className="text-gray-500 text-center max-w-sm">
                        Weather conditions are favorable. We'll notify you when
                        new alerts are generated.
                    </p>
                </div>
            )}
        </div>
    );
};

export default AlertsList;
