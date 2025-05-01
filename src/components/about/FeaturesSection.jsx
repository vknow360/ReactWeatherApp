import React from "react";
import { TiWeatherPartlySunny } from "react-icons/ti";

const FeaturesSection = () => {
    const features = [
        {
            title: "Real-time Weather Data",
            description:
                "Get current weather conditions for any location worldwide with up-to-date information.",
        },
        {
            title: "7-Day Forecast",
            description:
                "Plan your week with accurate 7-day weather predictions including temperature highs and lows.",
        },
        {
            title: "Hourly Forecast",
            description:
                "Detailed hour-by-hour weather information for the current day.",
        },
        {
            title: "Weather Alerts",
            description:
                "Receive important weather alerts and warnings for your location.",
        },
        {
            title: "Atmospheric Conditions",
            description:
                "View detailed metrics like humidity, wind speed, pressure, UV index, and more.",
        },
        {
            title: "Weather News",
            description:
                "Stay informed with the latest weather-related news and updates.",
        },
    ];

    return (
        <div id="features" className="bg-[#202b3b] rounded-xl p-6 sm:p-8 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 flex items-center">
                <span className="bg-cyan-500/20 p-2 rounded-lg mr-3">
                    <TiWeatherPartlySunny size={24} className="text-cyan-400" />
                </span>
                Key Features
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {features.map((feature, index) => (
                    <div
                        key={index}
                        className="bg-[#263142] p-4 rounded-lg hover:bg-[#2d3a4e] transition-colors"
                    >
                        <h3 className="text-lg font-semibold mb-2">
                            {feature.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturesSection;
