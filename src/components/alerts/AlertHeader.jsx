import React from "react";
import { FaFilter, FaBell } from "react-icons/fa";

const AlertHeader = ({ onToggleFilter }) => {
    return (
        <div className="bg-[#1a2535] px-4 sm:px-5 py-3 sm:py-4 shadow-md border-b border-[#243447] flex justify-between items-center">
            <div className="flex items-center gap-2">
                <div className="bg-cyan-500/20 p-1.5 rounded-lg">
                    <FaBell className="text-cyan-400" size={18} />
                </div>
                <div>
                    <h1 className="text-lg sm:text-xl font-bold">
                        Weather Alerts
                    </h1>
                    <p className="text-gray-400 text-xs">
                        Stay informed about potential hazards
                    </p>
                </div>
            </div>
            <button
                onClick={onToggleFilter}
                className="p-2.5 bg-[#243447] hover:bg-[#2b3e55] text-cyan-400 rounded-lg transition-colors flex items-center gap-2"
                aria-label="Toggle filter options"
            >
                <FaFilter size={16} />
                <span className="text-xs hidden sm:inline">Filter</span>
            </button>
        </div>
    );
};

export default AlertHeader;
