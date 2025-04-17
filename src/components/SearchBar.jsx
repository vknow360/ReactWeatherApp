import React, { useState, useEffect, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { getCoordinates } from "../api/weather";

const SearchBar = ({ onLocationSelect }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () =>
            document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    useEffect(() => {
        const searchTimer = setTimeout(async () => {
            if (searchTerm.trim().length > 2) {
                setIsLoading(true);
                try {
                    const results = await getCoordinates(searchTerm);
                    setSuggestions(Array.isArray(results) ? results : []);
                } catch (error) {
                    console.error("Search error:", error);
                    setSuggestions([]);
                }
                setIsLoading(false);
            } else {
                setSuggestions([]);
            }
        }, 1000);

        return () => clearTimeout(searchTimer);
    }, [searchTerm]);

    const handleLocationSelect = (location) => {
        if (onLocationSelect) {
            onLocationSelect({
                lat: location.latitude,
                lon: location.longitude,
                timeZone: "auto",
                name: `${location.name}, ${location.country}`,
            });
        }
        setSearchTerm("");
        setShowSuggestions(false);
    };

    return (
        <div className="bg-[#202b3b] rounded-xl relative" ref={searchRef}>
            <div className="flex items-center p-3">
                <input
                    className="w-full bg-transparent text-white outline-none placeholder-gray-400 text-sm"
                    placeholder="Search for cities"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                />
            </div>

            {!isLoading && showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 mt-1 bg-[#1a2231] rounded-xl shadow-lg z-10 max-h-60 overflow-y-auto suggestions">
                    <ul className="py-1">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                className="px-4 py-2 text-sm text-white hover:bg-[#262f3e] cursor-pointer truncate"
                                onClick={() => handleLocationSelect(suggestion)}
                            >
                                {suggestion.name}, {suggestion.admin1} ,
                                {suggestion.country}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {isLoading && showSuggestions && (
                <div className="absolute left-0 right-0 mt-1 bg-[#1a2231] rounded-xl shadow-lg z-10">
                    <div className="px-4 py-3 text-sm text-gray-400">
                        Searching...
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
