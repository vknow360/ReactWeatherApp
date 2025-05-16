import React, { useState, useEffect, useContext } from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import { fetchNewsData as fetchNewsApiData } from "../api/newsApi";
import {
    FaSearch,
    FaSpinner,
    FaExternalLinkAlt,
    FaShare,
} from "react-icons/fa";
import { IoCalendarOutline } from "react-icons/io5";
import Footer from "../components/Footer";
import { useSettings } from "../context/SettingsContext";
import WeatherContext from "../context/WeatherContext";

const News = () => {
    const { settings, formatTime } = useSettings();
    const { location } = useContext(WeatherContext);
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredNews, setFilteredNews] = useState([]);
    const [categories] = useState([
        "All",
        "Weather",
        "Climate",
        "Environment",
        "Disaster",
    ]);
    const [activeCategory, setActiveCategory] = useState("All"); // Store refresh timer
    const [refreshTimer, setRefreshTimer] = useState(null);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [lastVisited, setLastVisited] = useState(() => {
        // Get last visit time from localStorage
        const saved = localStorage.getItem("newsLastVisited");
        return saved ? new Date(saved) : null;
    });

    // Function to fetch news data
    const fetchNews = async () => {
        try {
            setLoading(true);
            // Use the new API, pass country code if available
            let country = "us";
            if (location && location.name) {
                // Try to extract country code from location.name (e.g., "City, Country")
                const parts = location.name.split(",");
                if (parts.length > 1) {
                    country = parts[parts.length - 1]
                        .trim()
                        .slice(0, 2)
                        .toLowerCase();
                }
            }
            const data = await fetchNewsApiData(
                50,
                activeCategory === "All" ? "weather" : activeCategory,
                country
            );
            setNewsItems(data);
            setFilteredNews(data);
            setLastUpdated(new Date());
            setError(""); // Clear any previous errors
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
        // Clear any existing timer
        if (refreshTimer) {
            clearInterval(refreshTimer);
            setRefreshTimer(null);
        }

        // If refresh interval is set and not zero
        if (settings && settings.refreshInterval > 0) {
            // Convert minutes to milliseconds
            const intervalMs = settings.refreshInterval * 60 * 1000;

            // Set new timer
            const timer = setInterval(() => {
                fetchNews();
            }, intervalMs);

            setRefreshTimer(timer);
        }

        // Cleanup on component unmount
        return () => {
            if (refreshTimer) {
                clearInterval(refreshTimer);
            }
        };
    }, [settings?.refreshInterval]);

    useEffect(() => {
        // Filter news based on search term and category
        let filtered = [...newsItems];

        if (searchTerm) {
            filtered = filtered.filter(
                (item) =>
                    item.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                    item.description
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
            );
        }

        if (activeCategory !== "All") {
            filtered = filtered.filter(
                (item) =>
                    item.categories?.some((category) =>
                        category
                            .toLowerCase()
                            .includes(activeCategory.toLowerCase())
                    ) ||
                    item.title
                        .toLowerCase()
                        .includes(activeCategory.toLowerCase())
            );
        }

        setFilteredNews(filtered);
    }, [searchTerm, activeCategory, newsItems]);
    const formatDate = (dateString) => {
        const date = new Date(dateString);

        // Format date part
        const dateOptions = {
            year: "numeric",
            month: "short",
            day: "numeric",
        };
        const dateFormatted = new Intl.DateTimeFormat(
            "en-US",
            dateOptions
        ).format(date);

        // Use formatTime from settings context for time part
        const timeFormatted = formatTime ? formatTime(date, "UTC") : "";

        return `${dateFormatted}, ${timeFormatted}`;
    };

    // Store the current visit time when the component mounts or is updated
    useEffect(() => {
        const now = new Date();
        localStorage.setItem("newsLastVisited", now.toISOString());

        // Update last visited state only on component mount
        if (!lastVisited) {
            setLastVisited(now);
        }

        // Update again when unmounting/navigating away
        return () => {
            localStorage.setItem("newsLastVisited", new Date().toISOString());
        };
    }, []);

    // Check if a news item is new (published after the last visit)
    const isNewItem = (pubDate) => {
        if (!lastVisited) return false;

        const pubDateTime = new Date(pubDate);
        return pubDateTime > lastVisited;
    };

    return (
        <div className="flex flex-col w-full h-full pb-20 sm:pb-3 pt-20 sm:pt-3">
            <div className="bg-[var(--color-bg-secondary)] px-4 sm:px-6 py-4 sm:py-5 rounded-xl shadow-md mb-4">
                {" "}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                        <div className="bg-[var(--color-accent)]/20 p-2 rounded-lg">
                            <IoNewspaperOutline className="text-[var(--color-accent)] text-xl" />
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-[var(--color-text-primary)]">
                            Weather News
                        </h1>
                    </div>
                    <button
                        onClick={fetchNews}
                        className="bg-[var(--color-accent)]/20 hover:bg-[var(--color-accent)]/30 text-[var(--color-accent)] p-2 rounded-lg transition-colors"
                        aria-label="Refresh news"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                    </button>
                </div>
                {lastUpdated && (
                    <div className="text-[var(--color-text-tertiary)] text-xs mb-4">
                        Last updated: {formatDate(lastUpdated)}
                    </div>
                )}
                <div className="relative mb-6">
                    <input
                        type="text"
                        placeholder="Search news..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 pl-10 bg-[var(--color-input-bg)] border border-[var(--color-border)] rounded-lg focus:outline-none focus:border-[var(--color-accent)] text-[var(--color-text-primary)]"
                    />
                    <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                                activeCategory === category
                                    ? "bg-[var(--color-accent)] text-white"
                                    : "bg-[var(--color-bg-tertiary)] text-[var(--color-text-secondary)] hover:bg-[var(--color-bg-hover)]"
                            }`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-grow bg-[var(--color-bg-secondary)] rounded-xl p-4 overflow-y-auto">
                {loading ? (
                    <div className="flex flex-col items-center justify-center h-64">
                        <FaSpinner className="text-[var(--color-accent)] text-3xl animate-spin mb-3" />
                        <p className="text-[var(--color-text-secondary)]">
                            Loading news...
                        </p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <p className="text-red-400 mb-2">⚠️ {error}</p>
                        <button
                            className="px-4 py-2 bg-[var(--color-accent)] rounded-lg hover:bg-[var(--color-accent-hover)] text-white"
                            onClick={() => window.location.reload()}
                        >
                            Retry
                        </button>
                    </div>
                ) : filteredNews.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-64 text-center">
                        <p className="text-[var(--color-text-secondary)] mb-2">
                            No news found matching your search criteria
                        </p>
                        <button
                            className="px-4 py-2 bg-[var(--color-accent)] rounded-lg hover:bg-[var(--color-accent-hover)] text-white"
                            onClick={() => {
                                setSearchTerm("");
                                setActiveCategory("All");
                            }}
                        >
                            Clear filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredNews.map((item, index) => (
                            <div
                                key={index}
                                className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg overflow-hidden hover:border-[var(--color-accent)]/50 transition-colors relative"
                            >
                                {item.thumbnail && (
                                    <div className="h-40 overflow-hidden">
                                        <img
                                            src={item.thumbnail}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://via.placeholder.com/300x150?text=Weather+News";
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="p-4">
                                    {" "}
                                    <div className="flex items-start gap-2">
                                        <h3 className="text-[var(--color-text-primary)] font-semibold mb-2 line-clamp-2 flex-1">
                                            {item.title}
                                        </h3>
                                        {isNewItem(item.pubDate) && (
                                            <span className="bg-[var(--color-accent)] text-white text-xs px-1.5 py-0.5 rounded-full font-medium whitespace-nowrap">
                                                New
                                            </span>
                                        )}
                                    </div>{" "}
                                    <p className="text-[var(--color-text-secondary)] text-sm mb-3 line-clamp-3">
                                        {item.description ||
                                            "Read more about this weather story..."}
                                    </p>
                                    {item.categories &&
                                        item.categories.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-3">
                                                {item.categories
                                                    .slice(0, 3)
                                                    .map((category, i) => (
                                                        <span
                                                            key={i}
                                                            className="text-xs px-2 py-0.5 rounded-full bg-[var(--color-bg-primary)] text-[var(--color-text-tertiary)]"
                                                        >
                                                            {category}
                                                        </span>
                                                    ))}
                                            </div>
                                        )}
                                    <div className="flex justify-between items-center">
                                        {" "}
                                        <div className="flex items-center text-[var(--color-text-tertiary)] text-xs">
                                            <IoCalendarOutline className="mr-1" />
                                            {formatDate(item.pubDate)}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="text-[var(--color-text-tertiary)] hover:text-[var(--color-accent)] p-1 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (navigator.share) {
                                                        navigator
                                                            .share({
                                                                title: item.title,
                                                                text: item.description,
                                                                url: item.link,
                                                            })
                                                            .catch((err) =>
                                                                console.error(
                                                                    "Share failed",
                                                                    err
                                                                )
                                                            );
                                                    } else {
                                                        navigator.clipboard
                                                            .writeText(
                                                                item.link
                                                            )
                                                            .then(() =>
                                                                alert(
                                                                    "Link copied to clipboard!"
                                                                )
                                                            )
                                                            .catch((err) =>
                                                                console.error(
                                                                    "Copy failed",
                                                                    err
                                                                )
                                                            );
                                                    }
                                                }}
                                                aria-label="Share"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                                                    />
                                                </svg>
                                            </button>
                                            <button
                                                className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] flex items-center text-sm"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    window.open(item.link);
                                                }}
                                            >
                                                Read{" "}
                                                <FaExternalLinkAlt className="ml-1 text-xs" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Footer component */}
            <div className="mt-4">
                <Footer />
            </div>
        </div>
    );
};

export default News;
