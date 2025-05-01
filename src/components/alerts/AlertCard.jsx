import React, { useState } from "react";
import {
    FaAngleDown,
    FaExclamationTriangle,
    FaExclamationCircle,
    FaInfoCircle,
    FaClock,
    FaMapMarkerAlt,
} from "react-icons/fa";

const AlertCard = ({ alert, icon: AlertIcon }) => {
    const [expanded, setExpanded] = useState(false);

    const getSeverityIcon = (severity) => {
        switch (severity.toLowerCase()) {
            case "high":
                return <FaExclamationTriangle className="text-[#E74C3C]" />;
            case "medium":
                return <FaExclamationCircle className="text-[#F39C12]" />;
            case "low":
                return <FaInfoCircle className="text-[#3498DB]" />;
            default:
                return <FaInfoCircle className="text-[#3498DB]" />;
        }
    };

    const getSeverityClass = (severity) => {
        switch (severity.toLowerCase()) {
            case "high":
                return "bg-[#E74C3C]/10 border-[#E74C3C]/20";
            case "medium":
                return "bg-[#F39C12]/10 border-[#F39C12]/20";
            case "low":
                return "bg-[#3498DB]/10 border-[#3498DB]/20";
            default:
                return "bg-[#3498DB]/10 border-[#3498DB]/20";
        }
    };

    return (
        <div
            className={`mb-3 border rounded-lg ${getSeverityClass(
                alert.severity
            )}`}
        >
            <div
                onClick={() => setExpanded(!expanded)}
                className="flex items-center justify-between p-3 cursor-pointer"
            >
                <div className="flex gap-2.5 items-center">
                    {AlertIcon && (
                        <AlertIcon size={20} className="text-cyan-400" />
                    )}
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium">{alert.title}</span>
                            {getSeverityIcon(alert.severity)}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center">
                            <FaClock className="mr-1" size={10} /> Until{" "}
                            {alert.until}
                        </p>
                    </div>
                </div>
                <FaAngleDown
                    className={`transition-transform ${
                        expanded ? "rotate-180" : ""
                    }`}
                />
            </div>

            {expanded && (
                <div className="p-3 pt-0 border-t border-gray-700/30">
                    <p className="text-sm mb-2">{alert.description}</p>

                    {alert.location && (
                        <p className="text-xs text-gray-400 mb-2 flex items-center">
                            <FaMapMarkerAlt className="mr-1" size={10} />{" "}
                            {alert.location}
                        </p>
                    )}

                    {alert.instructions && (
                        <div className="mt-2 bg-[#1E293B] p-3 rounded-lg">
                            <p className="text-xs font-medium mb-1 text-cyan-400">
                                Safety Instructions:
                            </p>
                            <p className="text-sm text-gray-300">
                                {alert.instructions}
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AlertCard;
