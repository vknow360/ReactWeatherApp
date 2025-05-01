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
        <div className="w-full h-full bg-[#162438] text-white overflow-hidden flex flex-col pt-0">
            <AlertHeader onToggleFilter={handleToggleFilter} />

            {filterOpen && (
                <AlertFilter
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />
            )}

            <LocationBanner location={location} alertsCount={alerts.length} />

            {alerts.length > 0 && (
                <AlertTypeSelector
                    types={alertTypes}
                    selectedType={selectedType}
                    onTypeChange={handleTypeChange}
                />
            )}

            <div className="flex-1 overflow-y-auto pb-20">
                <AlertsList alerts={filteredAlerts} />

                {filteredAlerts.length > 0 && (
                    <div className="text-center text-gray-500 text-xs p-4 mt-2">
                        Weather alerts are generated based on forecast data and
                        may change as conditions are updated.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Alerts;
