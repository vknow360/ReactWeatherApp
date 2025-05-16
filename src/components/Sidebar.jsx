import React from "react";
import { useNavigate } from "react-router-dom";
import { PiUmbrella } from "react-icons/pi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaExclamationTriangle, FaInfoCircle, FaUser } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiMapFill } from "react-icons/ri";
import { RiEqualizerFill } from "react-icons/ri";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ currentScreen }) => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();

    const handleNavigation = (screen) => {
        if (screen === "home") {
            navigate("/");
        } else {
            navigate(`/${screen}`);
        }
    };

    return (
        <div className="bg-[#202b3b] rounded-2xl h-16 w-full sm:h-full sm:w-16 flex flex-row sm:flex-col items-center justify-between sm:justify-start py-2 px-3 sm:py-5 sm:px-0 mt-5 mb-5 sm:mb-0 sm:mt-0">
            <div className="sm:mb-6 sm:mt-3 sm:ml-0 sm:mr-0 ml-5">
                <PiUmbrella size={28} className="text-cyan-400" />
            </div>
            <div className="flex flex-row sm:flex-col items-center justify-around w-4/5 sm:w-full sm:space-y-8">
                <button
                    className={`flex flex-col items-center cursor-pointer  transition-all duration-300 p-2 rounded-lg ${
                        currentScreen === "home"
                            ? "bg-[#354051]"
                            : "hover:bg-[#2a3546]"
                    }`}
                    onClick={() => handleNavigation("home")}
                    aria-label="Weather"
                >
                    <TiWeatherPartlySunny
                        size={22}
                        className="text-white mb-1"
                    />
                    <p className="text-white text-[10px] sm:text-xs hidden sm:block">
                        Weather
                    </p>
                </button>
                <button
                    className={`flex flex-col h-full sm:h-auto sm:w-full items-center cursor-pointer transition-all duration-300 p-2 rounded-lg ${
                        currentScreen === "alerts"
                            ? "bg-[#354051]"
                            : "hover:bg-[#2a3546]"
                    }`}
                    onClick={() => handleNavigation("alerts")}
                    aria-label="Alerts"
                >
                    <FaExclamationTriangle
                        size={22}
                        className="text-white mb-1"
                    />
                    <p className="text-white text-[10px] sm:text-xs hidden sm:block">
                        Alerts
                    </p>
                </button>{" "}
                <button
                    className={`flex flex-col h-full sm:h-auto sm:w-full items-center cursor-pointer transition-all duration-300 p-2 rounded-lg ${
                        currentScreen === "profile"
                            ? "bg-[#354051]"
                            : "hover:bg-[#2a3546]"
                    }`}
                    onClick={() => handleNavigation("profile")}
                    aria-label="Profile"
                >
                    <div className="relative">
                        <FaUser size={20} className="text-white mb-1" />
                        {currentUser && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></div>
                        )}
                    </div>
                    <p className="text-white text-[10px] sm:text-xs hidden sm:block">
                        Profile
                    </p>
                </button>
                <button
                    className={`flex flex-col h-full sm:h-auto sm:w-full items-center cursor-pointer transition-all duration-300 p-2 rounded-lg ${
                        currentScreen === "about"
                            ? "bg-[#354051]"
                            : "hover:bg-[#2a3546]"
                    }`}
                    onClick={() => handleNavigation("about")}
                    aria-label="About"
                >
                    <FaInfoCircle size={22} className="text-white mb-1" />
                    <p className="text-white text-[10px] sm:text-xs hidden sm:block">
                        About
                    </p>
                </button>
                <button
                    className={`flex flex-col h-full sm:h-auto sm:w-full items-center cursor-pointer transition-all duration-300 p-2 rounded-lg ${
                        currentScreen === "news"
                            ? "bg-[#354051]"
                            : "hover:bg-[#2a3546]"
                    }`}
                    onClick={() => handleNavigation("news")}
                    aria-label="News"
                >
                    <IoNewspaperOutline size={22} className="text-white mb-1" />
                    <p className="text-white text-[10px] sm:text-xs hidden sm:block">
                        News
                    </p>
                </button>
                {/* <div className="flex flex-col items-center">
                    <RiMapFill size={22} color="white" />
                    <p className="text-white text-xs mt-1">Map</p>
                </div>
                <div className="flex flex-col items-center">
                    <RiEqualizerFill size={22} color="white" />
                    <p className="text-white text-xs mt-1">Settings</p>
                </div> */}
            </div>
        </div>
    );
};

export default Sidebar;
