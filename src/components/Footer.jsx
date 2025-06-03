import React, { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import { BsHouse } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import umbrella from "../assets/umbrella.png";

const Footer = () => {
    const { weather, location } = useContext(WeatherContext);

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-[#0B1121] border-t border-blue-500/10 mt-auto">
            <div className="container mx-auto px-4 py-6">
                {/* Mobile Layout */}
                <div className="flex flex-col gap-6 sm:hidden">
                    <div className="flex justify-center">
                        <div className="flex items-center gap-2">
                            <img
                                src={umbrella}
                                alt="WeatherCast"
                                className="w-6 h-6 opacity-70"
                            />
                            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
                                WeatherCast
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4 text-sm">
                        <div className="flex items-center gap-2 text-gray-400">
                            <BsHouse className="w-4 h-4" />
                            <span>{location?.name || "Loading..."}</span>
                        </div>

                        <div className="flex items-center gap-3 text-gray-400">
                            <a
                                href="https://github.com/yourusername/weathercast"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors"
                                aria-label="View source on GitHub"
                            >
                                <FaGithub className="w-5 h-5" />
                            </a>
                            <span className="text-gray-500">•</span>
                            <a
                                href="https://open-meteo.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Open-Meteo
                            </a>
                        </div>

                        <div className="text-xs text-center text-gray-500">
                            © {new Date().getFullYear()} All rights reserved
                        </div>
                    </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden sm:flex sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <img
                                src={umbrella}
                                alt="WeatherCast"
                                className="w-6 h-6 opacity-70"
                            />
                            <span className="text-lg font-bold bg-gradient-to-r from-blue-400 to-cyan-400 text-transparent bg-clip-text">
                                WeatherCast
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors">
                            <BsHouse className="w-4 h-4" />
                            <span className="text-sm">
                                {location?.name || "Loading..."}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <a
                            href="https://github.com/yourusername/weathercast"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-white transition-colors"
                            aria-label="View source on GitHub"
                        >
                            <FaGithub className="w-5 h-5" />
                        </a>

                        <div className="flex items-center gap-3 text-sm">
                            <span className="text-gray-500">Powered by</span>
                            <a
                                href="https://open-meteo.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Open-Meteo
                            </a>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-500">
                                © {new Date().getFullYear()} All rights reserved
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
