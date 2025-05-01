import React from "react";
import { PiUmbrella } from "react-icons/pi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TfiMenuAlt } from "react-icons/tfi";
import { RiMapFill } from "react-icons/ri";
import { RiEqualizerFill } from "react-icons/ri";

const Sidebar = () => {
    return (
        <div className="bg-[#202b3b] rounded-2xl h-full flex flex-row sm:w-16 sm:flex-col items-center justify-between sm:justify-start py-3 px-4 sm:py-5 sm:px-0">
            <div className="sm:mb-6">
                <PiUmbrella size={30} color="cyan" />
            </div>
            <div className="flex flex-row sm:flex-col items-center justify-between sm:justify-start w-4/5 sm:w-full sm:space-y-8">
                <div className="flex flex-col items-center">
                    <TiWeatherPartlySunny size={22} color="white" />
                    <p className="text-white text-xs mt-1">Weather</p>
                </div>
                {/* <div className="flex flex-col items-center">
                    <TfiMenuAlt size={22} color="white" />
                    <p className="text-white text-xs mt-1">Cities</p>
                </div>
                <div className="flex flex-col items-center">
                    <RiMapFill size={22} color="white" />
                    <p className="text-white text-xs mt-1">Map</p>
                </div> */}
                {/* <div className="flex flex-col items-center">
                    <RiEqualizerFill size={22} color="white" />
                    <p className="text-white text-xs mt-1">Settings</p>
                </div> */}
            </div>
        </div>
    );
};

export default Sidebar;
