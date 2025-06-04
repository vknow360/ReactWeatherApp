import React from "react";
import { FaGithub } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

const HeroSection = () => {
    return (
        <div className="bg-gradient-to-r from-[#1a2b45] to-[#162438] rounded-xl p-6 sm:p-10 mb-6">
            <h1 className="text-2xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
                About Weather App
            </h1>
            <p className="text-gray-300 mb-6 max-w-3xl text-sm sm:text-base">
                A modern, responsive weather application built with React and
                Vite that provides real-time weather forecasts, hourly
                predictions, and weather alerts. Our mission is to deliver
                accurate weather information with a beautiful, intuitive
                interface.
            </p>
            <div className="flex flex-wrap gap-3">
                <a
                    href="https://github.com/vknow360/ReactWeatherApp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#2a3749] hover:bg-[#354761] transition-colors duration-300 px-4 py-2 rounded-lg text-sm inline-flex items-center"
                >
                    <FaGithub className="mr-2" /> View on GitHub
                </a>
                <a
                    href="#features"
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 transition-colors duration-300 px-4 py-2 rounded-lg text-sm inline-flex items-center"
                >
                    <IoMdInformationCircleOutline size={18} className="mr-2" />{" "}
                    Learn More
                </a>
            </div>
        </div>
    );
};

export default HeroSection;
