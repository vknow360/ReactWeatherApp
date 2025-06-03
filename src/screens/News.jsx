import React, { useState, useEffect } from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import {
    FaSearch,
    FaSpinner,
    FaGlobe,
    FaCalendarAlt,
    FaSyncAlt,
} from "react-icons/fa";
import { fetchNewsData } from "../api/weather";
import { useSettings } from "../context/SettingsContext";
import Footer from "../components/Footer";

const News = () => {
    const { settings } = useSettings();
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredNews, setFilteredNews] = useState([]);
    const [categories] = useState(["All", "Weather", "Climate"]);
    const [activeCategory, setActiveCategory] = useState("All");
    const [lastUpdated, setLastUpdated] = useState(null);
    const [refreshTimer, setRefreshTimer] = useState(null);

    // Function to fetch news data
    const fetchNews = async () => {
        try {
            setLoading(true);
            const response = await fetchNewsData();
            setNewsItems(response.items);
            setFilteredNews(response.items);
            setLastUpdated(new Date());
            setError("");
        } catch (err) {
            setError("Failed to fetch news. Please try again later.");
            console.error("News fetch error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Initial fetch
    useEffect(() => {
        fetchNews();
    }, []);

    // Setup auto-refresh based on settings
    useEffect(() => {
        if (refreshTimer) {
            clearInterval(refreshTimer);
        }

        if (settings?.refreshInterval > 0) {
            const intervalMs = settings.refreshInterval * 60 * 1000;
            const timer = setInterval(fetchNews, intervalMs);
            setRefreshTimer(timer);
        }

        return () => {
            if (refreshTimer) {
                clearInterval(refreshTimer);
            }
        };
    }, [settings?.refreshInterval]);

    // Filter news based on search term and category
    useEffect(() => {
        let filtered = [...newsItems];

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (item) =>
                    item.title.toLowerCase().includes(searchLower) ||
                    item.description?.toLowerCase().includes(searchLower)
            );
        }
        if (activeCategory !== "All") {
            filtered = filtered.filter((item) =>
                item.categories.includes(activeCategory)
            );
        }

        setFilteredNews(filtered);
    }, [searchTerm, activeCategory, newsItems]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50/80 to-cyan-50/80">
            <div className="flex-1">
                <div className="container mx-auto px-4 py-6 max-w-7xl">
                    {/* Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-blue-100 shadow-sm">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                                        <IoNewspaperOutline className="text-white w-6 h-6 sm:w-8 sm:h-8" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                            Weather News
                                        </h1>
                                        <p className="text-gray-500 text-sm sm:text-base mt-1">
                                            Stay informed with the latest
                                            weather updates
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={fetchNews}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                                >
                                    <FaSyncAlt
                                        className={
                                            loading ? "animate-spin" : ""
                                        }
                                    />
                                    <span>Refresh</span>
                                </button>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-6 text-white">
                            <div className="h-full flex flex-col justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold mb-2">
                                        News Summary
                                    </h2>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white/10 rounded-xl p-4">
                                            <div className="text-2xl font-bold">
                                                {newsItems.length}
                                            </div>
                                            <div className="text-sm text-blue-100">
                                                Total Stories
                                            </div>
                                        </div>
                                        <div className="bg-white/10 rounded-xl p-4">
                                            <div className="text-2xl font-bold">
                                                {categories.length - 1}
                                            </div>
                                            <div className="text-sm text-blue-100">
                                                Categories
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {lastUpdated && (
                                    <div className="mt-4 text-sm text-blue-100 flex items-center gap-2">
                                        <FaCalendarAlt />
                                        <span>
                                            Updated: {formatDate(lastUpdated)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Search and Filters */}
                    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search news articles..."
                                        value={searchTerm}
                                        onChange={(e) =>
                                            setSearchTerm(e.target.value)
                                        }
                                        className="w-full px-4 py-3 pl-11 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-black placeholder-gray-400 transition-all duration-200"
                                    />
                                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() =>
                                            setActiveCategory(category)
                                        }
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                            activeCategory === category
                                                ? "bg-blue-500 text-white shadow-sm"
                                                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                        }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* News Content */}
                    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm">
                        <div className="p-6">
                            {loading && newsItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16">
                                    <FaSpinner className="text-blue-500 text-4xl animate-spin mb-4" />
                                    <p className="text-gray-500">
                                        Loading latest news...
                                    </p>
                                </div>
                            ) : error ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <div className="bg-red-50 rounded-full p-6 mb-4">
                                        <svg
                                            className="w-10 h-10 text-red-500"
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
                                    <p className="text-red-600 text-lg font-semibold mb-2">
                                        {error}
                                    </p>
                                    <button
                                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                                        onClick={fetchNews}
                                    >
                                        Try Again
                                    </button>
                                </div>
                            ) : filteredNews.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <div className="bg-gray-50 rounded-full p-6 mb-4">
                                        <IoNewspaperOutline className="w-10 h-10 text-gray-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                        No Stories Found
                                    </h3>
                                    <p className="text-gray-500 max-w-md mb-4">
                                        No news articles match your current
                                        search criteria.
                                    </p>
                                    <button
                                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        onClick={() => {
                                            setSearchTerm("");
                                            setActiveCategory("All");
                                        }}
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredNews.map((item, index) => (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                window.open(item.link)
                                            }
                                            className="group cursor-pointer"
                                        >
                                            <div className="bg-gray-50 rounded-xl border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md hover:border-blue-200">
                                                {item.thumbnail && (
                                                    <div className="aspect-video overflow-hidden">
                                                        <img
                                                            src={
                                                                item.thumbnail ||
                                                                item.enclosure
                                                                    ?.link
                                                            }
                                                            alt={item.title}
                                                            className="w-full h-full object-cover transition-transform group-hover:scale-105"
                                                            loading="lazy"
                                                            onError={(e) => {
                                                                e.target.closest(
                                                                    ".aspect-video"
                                                                ).style.display =
                                                                    "none";
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                                <div className="p-4">
                                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                        {item.description ||
                                                            "Read more about this weather story..."}
                                                    </p>
                                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                                        <div className="flex items-center gap-2">
                                                            <FaGlobe className="text-blue-500" />
                                                            <span>
                                                                {item.source}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <FaCalendarAlt className="text-blue-500" />
                                                            <span>
                                                                {formatDate(
                                                                    item.pubDate
                                                                )}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default News;
