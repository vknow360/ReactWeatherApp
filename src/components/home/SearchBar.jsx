import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FiSearch } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { getCoordinates } from "../../api/weather";

const SearchBar = ({ onLocationSelect }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const searchRef = useRef(null);
    const inputRef = useRef(null);
    const [inputRect, setInputRect] = useState(null);

    // Add effect to handle body scroll locking
    useEffect(() => {
        if (showSuggestions && (suggestions.length > 0 || isLoading)) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [showSuggestions, suggestions.length, isLoading]);

    useEffect(() => {
        const updatePosition = () => {
            if (searchRef.current) {
                const rect = searchRef.current.getBoundingClientRect();
                setInputRect(rect);
            }
        };

        updatePosition();
        window.addEventListener("scroll", updatePosition);
        window.addEventListener("resize", updatePosition);

        return () => {
            window.removeEventListener("scroll", updatePosition);
            window.removeEventListener("resize", updatePosition);
        };
    }, []);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setShowSuggestions(false);
                setIsFocused(false);
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
                    if (results && Array.isArray(results)) {
                        setSuggestions(results);
                        setShowSuggestions(true);
                    } else {
                        setSuggestions([]);
                    }
                } catch (error) {
                    console.error("Search error:", error);
                    setSuggestions([]);
                }
                setIsLoading(false);
            } else {
                setSuggestions([]);
            }
        }, 300); // Reduced debounce time for better responsiveness

        return () => clearTimeout(searchTimer);
    }, [searchTerm]);
    const handleLocationSelect = (location) => {
        if (onLocationSelect) {
            const locationName = [
                location.name,
                location.admin1,
                location.country,
            ]
                .filter(Boolean)
                .join(", ");

            const locationData = {
                lat: location.latitude,
                lon: location.longitude,
                timeZone: "auto",
                name: locationName,
            };
            onLocationSelect(locationData);
        }
        setSearchTerm("");
        setShowSuggestions(false);
        setIsFocused(false);
    };

    const clearSearch = () => {
        setSearchTerm("");
        setSuggestions([]);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            setShowSuggestions(false);
            setIsFocused(false);
            inputRef.current?.blur();
        }
    };
    const renderSuggestions = () => {
        if (!showSuggestions || (!suggestions.length && !isLoading)) {
            return null;
        }

        const style = inputRect
            ? {
                  position: "fixed",
                  width: inputRect.width,
                  top: inputRect.bottom + 8,
                  left: inputRect.left,
                  zIndex: 9999,
              }
            : {};

        return createPortal(
            <div
                style={style}
                className="bg-white rounded-lg border border-gray-200 shadow-lg overflow-hidden"
            >
                <div className="max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                    {isLoading ? (
                        <div className="px-4 py-3 text-sm text-blue-600 flex items-center space-x-2">
                            <div className="animate-spin w-4 h-4 border-2 border-blue-100 border-t-blue-600 rounded-full"></div>
                            <span>Searching...</span>
                        </div>
                    ) : (
                        suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                onMouseDown={() =>
                                    handleLocationSelect(suggestion)
                                }
                                className="px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer flex items-center space-x-3 group"
                            >
                                {" "}
                                <svg
                                    className="w-4 h-4 text-gray-500 group-hover:text-gray-700"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span className="truncate">
                                    {suggestion.name}, {suggestion.admin1},{" "}
                                    {suggestion.country}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>,
            document.body
        );
    };

    return (
        <div ref={searchRef} className="relative w-full">
            {" "}
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowSuggestions(true);
                    }}
                    onFocus={() => {
                        setIsFocused(true);
                        setShowSuggestions(true);
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="Search for cities..."
                    className="w-full bg-white border-2 border-black text-gray-700 placeholder-gray-500 text-sm rounded-xl block pl-10 pr-8 py-2.5"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {" "}
                    <FiSearch className="w-5 h-5 text-gray-500" />
                </div>
                {searchTerm && (
                    <button
                        onClick={clearSearch}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                        aria-label="Clear search"
                    >
                        <IoClose className="w-4 h-4" />
                    </button>
                )}
            </div>
            {renderSuggestions()}
        </div>
    );
};

export default SearchBar;
