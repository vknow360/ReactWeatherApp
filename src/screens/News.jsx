import React, { useState, useEffect } from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import { FaSearch, FaSpinner } from "react-icons/fa";
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
        <div className="flex flex-col w-full h-full pb-20 sm:pb-3 pt-20 sm:pt-3">
            <div className="bg-[var(--color-bg-secondary)] px-4 sm:px-6 py-4 sm:py-5 rounded-xl shadow-md mb-4">
                <div className="flex items-center justify-between mb-4">
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
                        <FaSpinner
                            className={`h-5 w-5 ${
                                loading ? "animate-spin" : ""
                            }`}
                        />
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
                {loading && newsItems.length === 0 ? (
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
                            onClick={() => fetchNews()}
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
                                className="bg-[var(--color-bg-tertiary)] border border-[var(--color-border)] rounded-lg overflow-hidden hover:border-[var(--color-accent)]/50 transition-colors cursor-pointer group"
                                onClick={() => window.open(item.link)}
                            >
                                {item.thumbnail && (
                                    <div className="h-48 overflow-hidden">
                                        <img
                                            src={
                                                item.thumbnail ||
                                                item.enclosure.link
                                            }
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                            loading="lazy"
                                            onError={(e) => {
                                                e.target.closest(
                                                    ".h-48"
                                                ).style.display = "none";
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="p-4">
                                    <h3 className="text-[var(--color-text-primary)] font-semibold mb-2 line-clamp-2 group-hover:text-[var(--color-accent)] transition-colors">
                                        {item.title}
                                    </h3>
                                    <p className="text-[var(--color-text-secondary)] text-sm mb-3 line-clamp-3">
                                        {item.description ||
                                            "Read more about this weather story..."}
                                    </p>
                                    <div className="flex items-center justify-between text-[var(--color-text-tertiary)] text-xs">
                                        {" "}
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center">
                                                <IoNewspaperOutline className="mr-1" />
                                                {formatDate(item.pubDate)}
                                            </div>
                                            <div className="flex items-center">
                                                <span className="text-[var(--color-accent)]">
                                                    {item.source}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}{" "}
                    </div>
                )}
            </div>

            <div className="mt-4">
                <Footer />
            </div>
        </div>
    );
};

export default News;
