import React, { useState, useEffect, useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import AlertHeader from "../components/alerts/AlertHeader";
import AlertFilter from "../components/alerts/AlertFilter";
import LocationBanner from "../components/alerts/LocationBanner";
import AlertsList from "../components/alerts/AlertsList";
import {
    generateAlerts,
    filterAlerts,
    sortAlerts,
} from "../services/alertService";
import Footer from "../components/Footer";
import AlertTypeSelector from "../components/alerts/AlertTypeSelector";

const Alerts = () => {
    const { weather, location } = useContext(WeatherContext);

    const [alerts, setAlerts] = useState([]);
    const [filteredAlerts, setFilteredAlerts] = useState([]);
    const [filterOpen, setFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        high: true,
        medium: true,
        low: true,
    });
    const [selectedType, setSelectedType] = useState("all");

    // Generate alerts when weather data or location changes
    useEffect(() => {
        if (weather && weather.daily) {
            try {
                const generatedAlerts = generateAlerts(weather, location);
                const sortedAlerts = sortAlerts(generatedAlerts);
                setAlerts(sortedAlerts);
            } catch (error) {
                console.error("Error generating alerts:", error);
                setAlerts([]);
            }
        }
    }, [weather, location]);

    // Apply filters when filter settings or alerts change
    useEffect(() => {
        if (alerts.length > 0) {
            let filtered = filterAlerts(alerts, filters);

            // Filter by type if not "all"
            if (selectedType !== "all") {
                filtered = filtered.filter(
                    (alert) => alert.type === selectedType
                );
            }

            setFilteredAlerts(filtered);
        } else {
            setFilteredAlerts([]);
        }
    }, [filters, alerts, selectedType]);

    const handleToggleFilter = () => {
        setFilterOpen(!filterOpen);
    };

    const handleFilterChange = (severity) => {
        setFilters((prev) => ({ ...prev, [severity]: !prev[severity] }));
    };

    const handleTypeChange = (type) => {
        setSelectedType(type);
    };

    // Get unique alert types for the type selector
    const alertTypes =
        alerts.length > 0
            ? ["all", ...new Set(alerts.map((alert) => alert.type))]
            : ["all"];
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50/80 to-cyan-50/80">
            <div className="flex-1">
                <div className="container mx-auto px-4 py-6 max-w-7xl">
                    {/* Header with integrated location */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
                            <AlertHeader onToggleFilter={handleToggleFilter} />
                        </div>
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white flex items-center">
                            <LocationBanner
                                location={location}
                                alertsCount={alerts.length}
                            />
                        </div>
                    </div>

                    {/* Alert Statistics Dashboard */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-red-100 text-sm">
                                        High Priority
                                    </p>
                                    <h3 className="text-3xl font-bold mt-1">
                                        {
                                            alerts.filter(
                                                (a) => a.severity === "high"
                                            ).length
                                        }
                                    </h3>
                                </div>
                                <div className="bg-white/20 rounded-full p-3">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-yellow-100 text-sm">
                                        Medium Priority
                                    </p>
                                    <h3 className="text-3xl font-bold mt-1">
                                        {
                                            alerts.filter(
                                                (a) => a.severity === "medium"
                                            ).length
                                        }
                                    </h3>
                                </div>
                                <div className="bg-white/20 rounded-full p-3">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-blue-100 text-sm">
                                        Low Priority
                                    </p>
                                    <h3 className="text-3xl font-bold mt-1">
                                        {
                                            alerts.filter(
                                                (a) => a.severity === "low"
                                            ).length
                                        }
                                    </h3>
                                </div>
                                <div className="bg-white/20 rounded-full p-3">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-green-100 text-sm">
                                        Total Alerts
                                    </p>
                                    <h3 className="text-3xl font-bold mt-1">
                                        {alerts.length}
                                    </h3>
                                </div>
                                <div className="bg-white/20 rounded-full p-3">
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Sidebar */}
                        <div
                            className={`lg:col-span-1 ${
                                !filterOpen && "hidden lg:block"
                            }`}
                        >
                            <div className="sticky top-6 space-y-6">
                                {/* Filter Panel */}
                                <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                Filters
                                            </h3>
                                            <span className="text-sm text-blue-600">
                                                {filteredAlerts.length} of{" "}
                                                {alerts.length}
                                            </span>
                                        </div>
                                        <AlertFilter
                                            filters={filters}
                                            onFilterChange={handleFilterChange}
                                        />
                                    </div>
                                </div>

                                {/* Alert Types Panel */}
                                {alerts.length > 0 && (
                                    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden">
                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-lg font-semibold text-gray-900">
                                                    Alert Types
                                                </h3>
                                            </div>
                                            <AlertTypeSelector
                                                types={alertTypes}
                                                selectedType={selectedType}
                                                onTypeChange={handleTypeChange}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            <div className="bg-white rounded-2xl border border-blue-100 shadow-sm h-full">
                                <div className="p-6 h-full">
                                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900">
                                                Active Alerts
                                            </h2>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Showing alerts for{" "}
                                                {location.name}
                                            </p>
                                        </div>
                                        {alerts.length > 0 && (
                                            <button
                                                onClick={handleToggleFilter}
                                                className="lg:hidden px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                            >
                                                {filterOpen
                                                    ? "Hide Filters"
                                                    : "Show Filters"}
                                            </button>
                                        )}
                                    </div>

                                    {/* Alert List with spacing */}
                                    <div className="space-y-4">
                                        <AlertsList alerts={filteredAlerts} />
                                    </div>

                                    {/* Empty State */}
                                    {filteredAlerts.length === 0 && (
                                        <div className="text-center py-16 px-4 rounded-2xl bg-gray-50">
                                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                                                <svg
                                                    className="w-8 h-8 text-blue-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                                {alerts.length === 0
                                                    ? "All Clear"
                                                    : "No Matching Alerts"}
                                            </h3>
                                            <p className="text-gray-600 max-w-md mx-auto">
                                                {alerts.length === 0
                                                    ? "There are currently no weather alerts for your location. Enjoy the favorable weather conditions!"
                                                    : "No alerts match your current filter settings. Try adjusting your filters to see more alerts."}
                                            </p>
                                        </div>
                                    )}

                                    {/* Info Footer */}
                                    {filteredAlerts.length > 0 && (
                                        <div className="mt-6">
                                            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-4">
                                                <p className="text-center text-blue-700 text-sm">
                                                    Weather alerts are updated
                                                    in real-time based on
                                                    forecast data. Stay informed
                                                    of changing conditions.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Alerts;
