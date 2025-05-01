import React from "react";
import {
    FaExclamationTriangle,
    FaExclamationCircle,
    FaInfoCircle,
} from "react-icons/fa";

const AlertFilter = ({ filters, onFilterChange }) => {
    return (
        <div className="bg-[#1a2535] px-4 py-3 border-b border-[#243447] animate-slideDown">
            <div className="flex flex-col space-y-2">
                <p className="text-gray-300 text-xs mb-1">
                    Filter by severity level:
                </p>

                <div className="flex flex-wrap gap-2">
                    <button
                        onClick={() => onFilterChange("high")}
                        className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs ${
                            filters.high
                                ? "bg-[#E74C3C]/30 text-[#E74C3C] border border-[#E74C3C]/30"
                                : "bg-[#243447] text-gray-400 border border-transparent"
                        }`}
                    >
                        <FaExclamationTriangle />
                        <span>High</span>
                        <span className="bg-[#E74C3C] text-white text-[9px] rounded-full px-1.5 py-0.5 ml-1">
                            Urgent
                        </span>
                    </button>

                    <button
                        onClick={() => onFilterChange("medium")}
                        className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs ${
                            filters.medium
                                ? "bg-[#F39C12]/30 text-[#F39C12] border border-[#F39C12]/30"
                                : "bg-[#243447] text-gray-400 border border-transparent"
                        }`}
                    >
                        <FaExclamationCircle />
                        <span>Medium</span>
                        <span className="bg-[#F39C12] text-white text-[9px] rounded-full px-1.5 py-0.5 ml-1">
                            Caution
                        </span>
                    </button>

                    <button
                        onClick={() => onFilterChange("low")}
                        className={`flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs ${
                            filters.low
                                ? "bg-[#3498DB]/30 text-[#3498DB] border border-[#3498DB]/30"
                                : "bg-[#243447] text-gray-400 border border-transparent"
                        }`}
                    >
                        <FaInfoCircle />
                        <span>Low</span>
                        <span className="bg-[#3498DB] text-white text-[9px] rounded-full px-1.5 py-0.5 ml-1">
                            Info
                        </span>
                    </button>
                </div>

                <p className="text-gray-500 text-[10px] mt-1">
                    Select severity levels to show or hide alerts
                </p>
            </div>
        </div>
    );
};

export default AlertFilter;
