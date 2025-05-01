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
        <div className="p-4">
            {alerts && alerts.length > 0 ? (
                alerts.map((alert) => (
                    <AlertCard
                        key={alert.id}
                        alert={alert}
                        icon={getAlertIcon(alert.type, alert.icon)}
                    />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4">
                    <FaCloud className="text-gray-500 text-4xl mb-4" />
                    <p className="text-gray-400 text-center">
                        No active weather alerts for this location.
                    </p>
                    <p className="text-gray-500 text-sm text-center mt-2">
                        Weather alerts are automatically generated based on
                        forecast data.
                    </p>
                </div>
            )}
        </div>
    );
};

export default AlertsList;
