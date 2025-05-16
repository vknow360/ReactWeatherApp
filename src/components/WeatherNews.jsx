import React, { useEffect, useState } from "react";
import { IoNewspaperOutline } from "react-icons/io5";
import { fetchNews } from "../api/weather";
import { useNavigate } from "react-router-dom";

const WeatherNews = () => {
    const [newsItems, setNewsItems] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const getData = async () => {
            try {
                const data = await fetchNews(3);
                console.log("Fetched news data:", data);
                setNewsItems(data);
            } catch (error) {
                console.error("Failed to fetch news for widget", error);
            }
        };
        getData();

        const refreshInterval = setInterval(() => {
            getData();
        }, 30 * 60 * 1000);

        return () => {
            clearInterval(refreshInterval);
        };
    }, []);

    return (
        <div className="bg-[var(--color-bg-secondary)] rounded-2xl p-4 mt-3">
            <div className="flex items-center mb-3">
                <IoNewspaperOutline
                    size={20}
                    className="text-[var(--color-text-primary)] mr-2"
                />
                <p className="text-[var(--color-text-primary)] text-sm font-semibold">
                    WEATHER NEWS
                </p>
            </div>{" "}
            <div className="flex flex-col space-y-3">
                {newsItems.map((item, index) => {
                    const date = new Date(item.pubDate).toLocaleDateString();
                    return (
                        <div
                            key={index}
                            className="border border-[var(--color-border)] rounded-lg p-3 hover:bg-[var(--color-bg-hover)] transition-colors cursor-pointer group"
                            onClick={() => {
                                window.open(item.link);
                            }}
                        >
                            <div className="flex justify-between items-start gap-3">
                                <div className="flex-1">
                                    <p className="text-[var(--color-text-primary)] text-sm font-medium group-hover:text-[var(--color-accent)] transition-colors">
                                        {item.title}
                                    </p>
                                    <p className="text-[var(--color-text-tertiary)] text-xs mt-2 line-clamp-2">
                                        {item.description}
                                    </p>
                                </div>
                                {item.thumbnail && (
                                    <div className="w-16 h-16 flex-shrink-0">
                                        <img
                                            src={item.thumbnail}
                                            alt=""
                                            className="w-full h-full object-cover rounded-lg"
                                            onError={(e) => {
                                                e.target.style.display = "none";
                                            }}
                                        />
                                    </div>
                                )}
                            </div>
                            <p className="text-[var(--color-text-tertiary)] text-xs mt-2 flex items-center">
                                <IoNewspaperOutline className="mr-1" />
                                {date}
                            </p>
                        </div>
                    );
                })}
                <div className="flex justify-center items-center pt-1">
                    <button
                        className="text-[var(--color-accent)] text-sm hover:text-[var(--color-accent-hover)] flex items-center"
                        onClick={() => {
                            navigate("/news");
                        }}
                    >
                        View all news
                        <svg
                            className="w-4 h-4 ml-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WeatherNews;
