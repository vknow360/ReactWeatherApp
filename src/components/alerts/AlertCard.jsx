import React from "react";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { getWeatherIcon } from "../../utils/weatherCodes";

const AlertCard = ({ alert }) => {
    const severityConfig = {
        high: {
            gradient: "from-red-50 to-red-100",
            border: "border-red-200",
            text: "text-red-700",
            icon: "text-red-500",
            badge: "bg-red-100 text-red-700 border-red-200",
        },
        medium: {
            gradient: "from-amber-50 to-amber-100",
            border: "border-amber-200",
            text: "text-amber-700",
            icon: "text-amber-500",
            badge: "bg-amber-100 text-amber-700 border-amber-200",
        },
        low: {
            gradient: "from-blue-50 to-blue-100",
            border: "border-blue-200",
            text: "text-blue-700",
            icon: "text-blue-500",
            badge: "bg-blue-100 text-blue-700 border-blue-200",
        },
    }[alert.severity] || {
        gradient: "from-gray-50 to-gray-100",
        border: "border-gray-200",
        text: "text-gray-700",
        icon: "text-gray-500",
        badge: "bg-gray-100 text-gray-700 border-gray-200",
    };

    return (
        <div
            className={`rounded-xl bg-gradient-to-br ${severityConfig.gradient} border ${severityConfig.border} shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md`}
        >
            {/* Card Header */}
            <div className="px-4 py-3 sm:px-6 border-b border-gray-100/50 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                    <div
                        className={`rounded-lg p-2 ${severityConfig.icon} bg-white/50`}
                    >
                        {(() => {
                            const { icon: IconComponent } = getWeatherIcon(
                                alert.type,
                                true
                            );
                            return <IconComponent size={20} />;
                        })()}
                    </div>
                    <div className="min-w-0">
                        <h3
                            className={`font-semibold truncate ${severityConfig.text} text-sm sm:text-base`}
                        >
                            {alert.title}
                        </h3>
                        <p className="text-gray-500 text-xs sm:text-sm">
                            Until {alert.time}
                        </p>
                    </div>
                </div>
                <div
                    className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-medium border ${severityConfig.badge}`}
                >
                    {alert.severity.charAt(0).toUpperCase() +
                        alert.severity.slice(1)}
                </div>
            </div>

            {/* Card Content */}
            <div className="p-4 sm:p-6">
                <p className="text-gray-600 text-sm sm:text-base">
                    {alert.description}
                </p>

                {/* Location and Duration Info */}
                <div className="mt-4 sm:mt-6 pt-4 border-t border-gray-100/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center text-sm text-gray-500">
                            <FaMapMarkerAlt className="shrink-0 w-4 h-4 mr-2" />
                            <span className="truncate">{alert.location}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                            <FaClock className="shrink-0 w-4 h-4 mr-2" />
                            <span className="truncate">{alert.duration}</span>
                        </div>
                    </div>
                </div>

                {/* Instructions (if any) */}
                {alert.instructions && (
                    <div className="mt-4 p-3 bg-white/50 rounded-lg border border-gray-100">
                        <p className="text-sm text-gray-600">
                            {alert.instructions}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AlertCard;
