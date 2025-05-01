import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const LocationBanner = ({ location, alertsCount }) => {
    return (
        <div className="px-4 py-4 border-b border-[#243447] bg-[#1a2535]/50">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-cyan-400" />
                    <div>
                        <h2 className="font-semibold text-sm sm:text-base">
                            {location?.name || "Current Location"}
                        </h2>
                        <p className="text-xs text-gray-400">
                            {new Date().toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                </div>

                {alertsCount > 0 && (
                    <div className="bg-[#E74C3C]/20 text-[#E74C3C] px-3 py-1.5 rounded-full text-xs font-medium">
                        {alertsCount} active{" "}
                        {alertsCount === 1 ? "alert" : "alerts"}
                    </div>
                )}

                {alertsCount === 0 && (
                    <div className="bg-[#27ae60]/20 text-[#27ae60] px-3 py-1.5 rounded-full text-xs font-medium">
                        All clear
                    </div>
                )}
            </div>

            <div className="text-xs text-gray-400 mt-2 pb-1">
                {alertsCount > 0 ? (
                    <p>
                        There {alertsCount === 1 ? "is" : "are"} currently{" "}
                        {alertsCount} active weather{" "}
                        {alertsCount === 1 ? "alert" : "alerts"} for your area.
                        Stay informed and take necessary precautions.
                    </p>
                ) : (
                    <p>
                        No active weather alerts for your area at this time.
                        Weather conditions appear favorable.
                    </p>
                )}
            </div>
        </div>
    );
};

export default LocationBanner;
