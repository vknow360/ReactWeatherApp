import React from "react";

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <div className="bg-[#202b3b] mt-3 rounded-2xl p-3 text-center">
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div className="text-gray-400 text-xs mb-2 sm:mb-0">
                    © {year} Weather App. All rights reserved.
                </div>
                <div className="flex space-x-4">
                    <a
                        href="#"
                        className="text-cyan-400 hover:text-cyan-300 text-xs"
                    >
                        Terms
                    </a>
                    <a
                        href="#"
                        className="text-cyan-400 hover:text-cyan-300 text-xs"
                    >
                        Privacy
                    </a>
                    <a
                        href="#"
                        className="text-cyan-400 hover:text-cyan-300 text-xs"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;
