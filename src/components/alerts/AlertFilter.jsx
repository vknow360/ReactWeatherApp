import React from "react";
import {
    FaExclamationTriangle,
    FaExclamationCircle,
    FaInfoCircle,
} from "react-icons/fa";

const AlertFilter = ({ filters, onFilterChange }) => {
    const severityConfig = {
        high: {
            icon: FaExclamationTriangle,
            label: "High Priority",
            activeClass:
                "bg-red-500 text-white border-red-500 hover:bg-red-600",
            inactiveClass:
                "bg-white text-red-700 border-red-200 hover:border-red-500",
        },
        medium: {
            icon: FaExclamationCircle,
            label: "Medium Priority",
            activeClass:
                "bg-yellow-500 text-white border-yellow-500 hover:bg-yellow-600",
            inactiveClass:
                "bg-white text-yellow-700 border-yellow-200 hover:border-yellow-500",
        },
        low: {
            icon: FaInfoCircle,
            label: "Low Priority",
            activeClass:
                "bg-blue-500 text-white border-blue-500 hover:bg-blue-600",
            inactiveClass:
                "bg-white text-blue-700 border-blue-200 hover:border-blue-500",
        },
    };

    return (
        <div className="space-y-4">
            {/* Filter Section Title */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">
                    Alert Filters
                </h3>
                <button
                    onClick={() => {
                        Object.keys(filters).forEach((key) =>
                            onFilterChange(key)
                        );
                    }}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    Toggle All
                </button>
            </div>

            {/* Filter Chips Container */}
            <div className="flex flex-col gap-3">
                {Object.entries(severityConfig).map(([severity, config]) => {
                    const Icon = config.icon;
                    const isActive = filters[severity];
                    const baseClasses =
                        "relative flex items-center w-full px-4 py-3 rounded-xl border transition-all duration-200 cursor-pointer group";
                    const dynamicClasses = isActive
                        ? config.activeClass
                        : config.inactiveClass;

                    return (
                        <button
                            key={severity}
                            onClick={() => onFilterChange(severity)}
                            className={`${baseClasses} ${dynamicClasses}`}
                        >
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`rounded-lg p-2 ${
                                            isActive
                                                ? "bg-white/20"
                                                : "bg-current/10"
                                        }`}
                                    >
                                        <Icon
                                            className={`w-4 h-4 ${
                                                isActive
                                                    ? "text-white"
                                                    : "text-current"
                                            }`}
                                        />
                                    </div>
                                    <span className="font-medium">
                                        {config.label}
                                    </span>
                                </div>
                                <div
                                    className={`w-4 h-4 rounded-full border-2 ${
                                        isActive
                                            ? "bg-white border-transparent"
                                            : "bg-transparent border-gray-300 group-hover:border-current"
                                    }`}
                                >
                                    {isActive && (
                                        <svg
                                            className="w-full h-full text-current"
                                            viewBox="0 0 16 16"
                                        >
                                            <circle
                                                cx="8"
                                                cy="8"
                                                r="4"
                                                fill="currentColor"
                                            />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Quick Actions */}
            <div className="pt-4 mt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-3">
                    <div className="px-3 py-2 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm font-medium text-gray-600">
                            Active Filters
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {Object.values(filters).filter(Boolean).length}
                        </p>
                    </div>
                    <div className="px-3 py-2 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm font-medium text-gray-600">
                            Total Filters
                        </p>
                        <p className="text-lg font-semibold text-gray-900">
                            {Object.keys(filters).length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AlertFilter;
