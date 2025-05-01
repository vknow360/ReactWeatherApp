import React from "react";
import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const TeamSection = () => {
    const team = [
        {
            name: "Sunny Gupta",
            role: "Lead Developer",
            avatar: "https://i.pravatar.cc/150?img=1",
            github: "https://github.com/sunnygupta",
            twitter: "https://twitter.com/sunnygupta",
            linkedin: "https://linkedin.com/in/sunnygupta",
        },
        {
            name: "Alex Johnson",
            role: "UI/UX Designer",
            avatar: "https://i.pravatar.cc/150?img=2",
            github: "https://github.com/alexj",
            twitter: "https://twitter.com/alexj",
            linkedin: "https://linkedin.com/in/alexj",
        },
        {
            name: "Alex Johnson",
            role: "UI/UX Designer",
            avatar: "https://i.pravatar.cc/150?img=2",
            github: "https://github.com/alexj",
            twitter: "https://twitter.com/alexj",
            linkedin: "https://linkedin.com/in/alexj",
        },
        {
            name: "Alex Johnson",
            role: "UI/UX Designer",
            avatar: "https://i.pravatar.cc/150?img=2",
            github: "https://github.com/alexj",
            twitter: "https://twitter.com/alexj",
            linkedin: "https://linkedin.com/in/alexj",
        },
    ];

    return (
        <div className="bg-[#202b3b] rounded-xl p-6 sm:p-8 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-6">Our Team</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {team.map((person, index) => (
                    <div
                        key={index}
                        className="bg-[#263142] rounded-xl p-4 flex flex-col items-center text-center"
                    >
                        <img
                            src={person.avatar}
                            alt={person.name}
                            className="w-20 h-20 rounded-full mb-3 border-2 border-cyan-500"
                        />
                        <h3 className="font-semibold">{person.name}</h3>
                        <p className="text-sm text-gray-400 mb-3">
                            {person.role}
                        </p>
                        <div className="flex gap-3">
                            <a
                                href={person.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white"
                            >
                                <FaGithub size={18} />
                            </a>
                            <a
                                href={person.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white"
                            >
                                <FaTwitter size={18} />
                            </a>
                            <a
                                href={person.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white"
                            >
                                <FaLinkedin size={18} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamSection;
