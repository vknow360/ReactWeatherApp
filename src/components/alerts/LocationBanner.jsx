import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

const LocationBanner = ({ location, alertsCount }) => {
    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 border border-blue-200">
                        <FaMapMarkerAlt className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">
                            {location?.name || "Current Location"}
                        </h2>
                        <p className="text-sm text-white">
                            {new Date().toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </p>
                    </div>
                </div>

                {alertsCount > 0 ? (
                    <div className="px-4 py-2 bg-gradient-to-br from-red-100 to-rose-100 text-red-600 rounded-lg text-sm font-medium border border-red-200">
                        {alertsCount} active{" "}
                        {alertsCount === 1 ? "alert" : "alerts"}
                    </div>
                ) : (
                    <div className="px-4 py-2 bg-gradient-to-br from-emerald-100 to-green-100 text-emerald-600 rounded-lg text-sm font-medium border border-emerald-200">
                        All clear
                    </div>
                )}
            </div>

            <div className="text-sm bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg p-4 border border-gray-200">
                {alertsCount > 0 ? (
                    <p className="text-gray-700 leading-relaxed">
                        There {alertsCount === 1 ? "is" : "are"} currently{" "}
                        {alertsCount} active weather{" "}
                        {alertsCount === 1 ? "alert" : "alerts"} for your area.
                        Stay informed and take necessary precautions.
                    </p>
                ) : (
                    <p className="text-gray-700 leading-relaxed">
                        No active weather alerts for your area at this time.
                        Weather conditions appear favorable.
                    </p>
                )}
            </div>
        </div>
    );
};

export default LocationBanner;
