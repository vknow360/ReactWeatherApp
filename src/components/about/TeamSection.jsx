import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const TeamSection = () => {
    const team = [
        {
            name: "Shubhojeet Ghosh",
            role: "Team Leader and Developer",
            description:
                "Leading the team with a vision for innovation and excellence",
            avatar: "https://i.pravatar.cc/150?img=12",
            github: "https://github.com/Shubhojeet2005",
        },
        {
            name: "Sunny Gupta",
            role: "Lead Developer and UX Designer",
            description:
                "Building robust applications with a focus on user experience",
            avatar: "https://i.pravatar.cc/150?img=8",
            github: "https://github.com/vknow360",
        },
        {
            name: "Anushka Singh",
            role: "UI Designer",
            description: "Crafting stunning visual designs and interfaces",
            avatar: "https://i.pravatar.cc/150?img=5",
            github: "https://github.com/Anushka-paper",
        },
        {
            name: "Rudraa Pratap Singh",
            role: "Team Member",
            description: "",
            avatar: "https://i.pravatar.cc/150?img=13",
            github: "https://github.com/rudra-design",
        },
    ];

    return (
        <div className="space-y-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Meet Our Team
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {team.map((person, index) => (
                    <div
                        key={index}
                        className="group relative overflow-hidden bg-gradient-to-br from-white to-blue-50 rounded-xl p-6 hover:shadow-xl hover:shadow-blue-100 transform hover:-translate-y-1 transition-all duration-300 border border-blue-100"
                    >
                        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] bg-[size:1rem_1rem]"></div>
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="relative flex flex-col items-center text-center">
                            {" "}
                            <div className="relative mb-4">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full"></div>
                                <img
                                    src={person.avatar}
                                    alt={person.name}
                                    className="relative w-24 h-24 rounded-full border-2 border-white/80 shadow-sm transform group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="font-semibold text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-lg mb-1">
                                {person.name}
                            </h3>
                            <p className="text-blue-600 text-sm mb-2 font-medium">
                                {person.role}
                            </p>
                            <p className="text-gray-600 text-sm mb-4">
                                {person.description}
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href={person.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-gray-400 hover:text-gray-800 transform hover:scale-110 transition-all duration-300"
                                >
                                    <FaGithub size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamSection;
