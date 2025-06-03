import React from "react";
import {
    FaGithub,
    FaCode,
    FaShieldAlt,
    FaUsers,
    FaBolt,
    FaCloud,
} from "react-icons/fa";
import { SiOpenai } from "react-icons/si";
import FeaturesSection from "../components/about/FeaturesSection";
import TeamSection from "../components/about/TeamSection";
import TechnologyStackSection from "../components/about/TechnologyStackSection";
import Footer from "../components/Footer";

const About = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section with Animated Gradient */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-500 to-purple-600">
                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:3rem_3rem]"></div>
                <div className="relative container mx-auto px-4 py-20 max-w-7xl">
                    <div className="flex flex-col items-center text-center text-white mb-12">
                        <FaCloud className="w-16 h-16 mb-6 " />
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            WeatherCast
                        </h1>
                        <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                            Experience weather forecasting reimagined with
                            modern technology and beautiful design
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mt-8">
                            <a
                                href="https://github.com/yourusername/weathercast"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-full font-medium hover:bg-opacity-90 transition-all transform hover:scale-105"
                            >
                                <FaGithub className="w-5 h-5" />
                                <span>View on GitHub</span>
                            </a>
                            <a
                                href="#features"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-400 transition-all transform hover:scale-105"
                            >
                                <FaBolt className="w-5 h-5" />
                                <span>Explore Features</span>
                            </a>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
                        {[
                            {
                                label: "Active Users",
                                value: "10K+",
                            },
                            {
                                label: "Weather Stations",
                                value: "5000+",
                            },
                            {
                                label: "Countries Covered",
                                value: "150+",
                            },
                            {
                                label: "Updates Daily",
                                value: "24/7",
                            },
                        ].map((stat, index) => (
                            <div
                                key={index}
                                className="text-center transform hover:scale-105 transition-all duration-300"
                            >
                                <div className="text-3xl md:text-4xl font-bold text-white mb-2 animate-fade-in">
                                    {stat.value}
                                </div>
                                <div className="text-blue-200 text-sm md:text-base">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>{" "}
            </div>
            {/* Features Section with Diagonal Layout */}
            <div
                id="features"
                className="relative py-20 bg-gradient-to-br from-slate-50 to-blue-50/30 border-y border-blue-100"
            >
                <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/80"></div>
                <div className="relative container mx-auto px-4 max-w-7xl">
                    <FeaturesSection />
                </div>
            </div>
            {/* Technology Stack with Interactive Grid */}
            <div className="relative py-20 bg-gradient-to-br from-gray-50 to-white border-b border-gray-100">
                <div className="container mx-auto px-4 max-w-7xl">
                    <TechnologyStackSection />
                </div>
            </div>
            {/* Team Section with Parallax Effect */}
            <div className="relative py-20 bg-gradient-to-br from-gray-50 to-blue-50/20 border-b border-blue-100">
                <div className="absolute inset-0 bg-pattern-grid opacity-5"></div>
                <div className="relative container mx-auto px-4 max-w-7xl">
                    <div className="text-center mb-12">
                        <FaUsers className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                            Meet Our Team
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Passionate individuals working together to bring you
                            the best weather experience
                        </p>
                    </div>
                    <TeamSection />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default About;
