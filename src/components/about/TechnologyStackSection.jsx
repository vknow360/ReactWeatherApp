import React from "react";
import { FaReact, FaNode, FaDatabase } from "react-icons/fa";
import { SiVite, SiTailwindcss, SiFirebase } from "react-icons/si";
import { TbBrandVscode } from "react-icons/tb";
import { TiWeatherPartlySunny } from "react-icons/ti";

const TechnologyStackSection = () => {
    const technologies = [
        {
            category: "Frontend Development",
            items: [
                {
                    name: "React",
                    icon: FaReact,
                    bgColor: "from-cyan-500/10 to-blue-500/10",
                    iconColor: "text-cyan-600",
                    borderColor: "border-cyan-200",
                    description: "Modern UI Framework",
                },
                {
                    name: "Vite",
                    icon: SiVite,
                    bgColor: "from-purple-500/10 to-yellow-500/10",
                    iconColor: "text-purple-500",
                    borderColor: "border-purple-200",
                    description: "Next-Gen Build Tool",
                },
                {
                    name: "TailwindCSS",
                    icon: SiTailwindcss,
                    bgColor: "from-teal-500/10 to-sky-500/10",
                    iconColor: "text-teal-500",
                    borderColor: "border-teal-200",
                    description: "Utility-first CSS",
                },
            ],
        },
        {
            category: "Backend & Services",
            items: [
                {
                    name: "Node.js",
                    icon: FaNode,
                    bgColor: "from-green-500/10 to-emerald-500/10",
                    iconColor: "text-green-600",
                    borderColor: "border-green-200",
                    description: "Runtime Environment",
                },
                {
                    name: "Open Meteo",
                    icon: TiWeatherPartlySunny,
                    bgColor: "from-orange-500/10 to-red-500/10",
                    iconColor: "text-orange-500",
                    borderColor: "border-orange-200",
                    description: "Real-time Weather Data",
                },
                {
                    name: "Firebase",
                    icon: SiFirebase,
                    bgColor: "from-amber-500/10 to-yellow-500/10",
                    iconColor: "text-amber-500",
                    borderColor: "border-amber-200",
                    description: "Cloud Services",
                },
            ],
        },
        {
            category: "Development Tools",
            items: [
                {
                    name: "VS Code",
                    icon: TbBrandVscode,
                    bgColor: "from-blue-500/10 to-indigo-500/10",
                    iconColor: "text-blue-600",
                    borderColor: "border-blue-200",
                    description: "Code Editor",
                },
                {
                    name: "Git",
                    icon: FaDatabase,
                    bgColor: "from-red-500/10 to-orange-500/10",
                    iconColor: "text-red-500",
                    borderColor: "border-red-200",
                    description: "Version Control",
                },
                {
                    name: "NPM",
                    icon: FaDatabase,
                    bgColor: "from-red-500/10 to-pink-500/10",
                    iconColor: "text-red-500",
                    borderColor: "border-red-200",
                    description: "Package Manager",
                },
            ],
        },
    ];

    return (
        <div className="space-y-12">
            <div className="text-center mb-12">
                <FaReact className="w-12 h-12 mx-auto mb-4 text-blue-500 animate-spin-slow" />
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Our Technology Stack
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Built with cutting-edge technologies to deliver the best
                    weather experience
                </p>
            </div>

            <div className="space-y-12">
                {technologies.map((tech, index) => (
                    <div key={index} className="space-y-6">
                        <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-100 pb-2">
                            {tech.category}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {tech.items.map((item, itemIndex) => {
                                const Icon = item.icon;
                                return (
                                    <div
                                        key={itemIndex}
                                        className={`group p-6 rounded-xl border ${item.borderColor} bg-gradient-to-br ${item.bgColor} hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300`}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 rounded-lg bg-white/80 group-hover:scale-110 transition-transform duration-200">
                                                <Icon
                                                    className={`w-6 h-6 ${item.iconColor}`}
                                                />
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-gray-900">
                                                    {item.name}
                                                </h4>
                                                <p className="text-sm text-gray-600">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechnologyStackSection;
