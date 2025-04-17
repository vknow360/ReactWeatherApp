import React, { useEffect, useState } from "react";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import { IoNewspaperOutline } from "react-icons/io5";
import { fetchNewsData } from "../api/weather";

const WeatherNews = () => {
    const [newsItems, setNewsItems] = useState([]);

    useEffect(() => {
        const getData = async () => {
            setNewsItems(await fetchNewsData());
        };
        getData();
    }, []);

    return (
        <div className="bg-[#202b3b] rounded-2xl p-4 mt-3">
            <div className="flex items-center mb-3">
                <IoNewspaperOutline size={20} className="text-white mr-2" />
                <p className="text-white text-sm font-semibold">WEATHER NEWS</p>
            </div>
            <div className="flex flex-col space-y-3">
                {newsItems.map((item, index) => {
                    const date = item.pubDate;
                    return (
                        <div
                            key={index}
                            className="border border-gray-700 rounded-lg p-3 hover:bg-gray-700/30 transition-colors cursor-pointer"
                            onClick={() => {
                                window.open(item.link);
                            }}
                        >
                            <p className="text-white text-sm font-medium">
                                {item.title}
                            </p>
                            <p className="text-gray-400 text-xs mt-1">
                                {date.split(" ")[0]}
                            </p>
                        </div>
                    );
                })}
                <div className="flex justify-center items-center pt-1">
                    <button
                        className="text-cyan-400 text-sm hover:text-cyan-300 flex items-center"
                        onClick={() => {
                            window.open(
                                "https://timesofindia.indiatimes.com/home/environment"
                            );
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
