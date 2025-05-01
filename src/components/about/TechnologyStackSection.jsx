import React from "react";

const TechnologyStackSection = () => {
    const technologies = [
        { name: "React 19", description: "Frontend framework" },
        { name: "Vite", description: "Build tool" },
        { name: "Tailwind CSS", description: "Styling" },
        { name: "React Router", description: "Navigation" },
        { name: "DotLottie", description: "Weather animations" },
        { name: "Open-Meteo API", description: "Weather data" },
        { name: "Gemini AI", description: "Weather assistant" },
        { name: "React Icons", description: "Icon library" },
    ];

    return (
        <div className="bg-[#202b3b] rounded-xl p-6 sm:p-8 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">
                Technology Stack
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {technologies.map((tech, index) => (
                    <div
                        key={index}
                        className="bg-[#263142] p-3 rounded-lg border border-gray-700"
                    >
                        <h3 className="font-medium text-cyan-400">
                            {tech.name}
                        </h3>
                        <p className="text-xs text-gray-400">
                            {tech.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TechnologyStackSection;
