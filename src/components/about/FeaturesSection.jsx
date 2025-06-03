import React from "react";
import { TiWeatherPartlySunny, TiLocationOutline } from "react-icons/ti";
import { FaBell, FaChartLine, FaUserCog, FaNewspaper } from "react-icons/fa";

const FeaturesSection = () => {
    const features = [
        {
            icon: TiWeatherPartlySunny,
            title: "Real-time Weather Data",
            description:
                "Get current weather conditions for any location worldwide with up-to-date information.",
            gradient: "from-sky-500/10 to-blue-500/10",
            border: "border-sky-200",
            iconColor: "text-sky-500",
        },
        {
            icon: FaChartLine,
            title: "7-Day Forecast",
            description:
                "Plan your week with accurate 7-day weather predictions including temperature highs and lows.",
            gradient: "from-indigo-500/10 to-blue-500/10",
            border: "border-indigo-200",
            iconColor: "text-indigo-500",
        },
        {
            icon: FaBell,
            title: "Weather Alerts",
            description:
                "Receive important weather alerts and warnings for your location.",
            gradient: "from-purple-500/10 to-fuchsia-500/10",
            border: "border-purple-200",
            iconColor: "text-purple-500",
        },
        {
            icon: TiLocationOutline,
            title: "Multiple Locations",
            description: "Save and track weather for multiple locations.",
            gradient: "from-rose-500/10 to-pink-500/10",
            border: "border-rose-200",
            iconColor: "text-rose-500",
        },
        {
            icon: FaUserCog,
            title: "Customizable Settings",
            description:
                "Personalize your experience with customizable units and display preferences.",
            gradient: "from-emerald-500/10 to-teal-500/10",
            border: "border-emerald-200",
            iconColor: "text-emerald-500",
        },
        {
            icon: FaNewspaper,
            title: "Weather News",
            description:
                "Stay informed with the latest weather-related news and updates.",
            gradient: "from-amber-500/10 to-yellow-500/10",
            border: "border-amber-200",
            iconColor: "text-amber-500",
        },
    ];

    return (
        <div className="space-y-12">
            <div className="text-center mb-12">
                <TiWeatherPartlySunny className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-float" />
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Powerful Features
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Everything you need to stay informed about the weather,
                    beautifully designed and easy to use
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={index}
                            className={`group p-6 rounded-xl border ${feature.border} bg-gradient-to-br ${feature.gradient} backdrop-blur-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300`}
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-white/80 group-hover:scale-110 transition-transform duration-200">
                                    <Icon
                                        className={`w-6 h-6 ${feature.iconColor}`}
                                    />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 text-sm">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-12 p-6 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-sky-50 text-center">
                <p className="text-gray-600">
                    Experience weather forecasting like never before with our
                    comprehensive feature set
                </p>
            </div>
        </div>
    );
};

export default FeaturesSection;
