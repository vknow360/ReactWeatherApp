import React from "react";
import { FaFilter, FaBell } from "react-icons/fa";

const AlertHeader = ({ onToggleFilter }) => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200">
                        <FaBell className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />
                    </div>
                    <div>
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                            Weather Alerts
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600">
                            Stay informed about potential weather hazards
                        </p>
                    </div>
                </div>
                <button
                    onClick={onToggleFilter}
                    className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-600 hover:text-gray-800 rounded-lg transition-all border border-gray-200 shadow-sm hover:shadow"
                    aria-label="Toggle filter options"
                >
                    <FaFilter className="w-4 h-4" />
                    <span className="hidden sm:inline text-sm font-medium">
                        Filters
                    </span>
                </button>
            </div>
        </div>
    );
};

export default AlertHeader;
