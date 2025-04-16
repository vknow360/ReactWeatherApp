import React from "react";
import { PiUmbrella } from "react-icons/pi";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { TfiMenuAlt } from "react-icons/tfi";
import { RiMapFill } from "react-icons/ri";
import { RiEqualizerFill } from "react-icons/ri";

const Sidebar = () => {
    return (
        <div className="w-[5%] bg-[#202b3b] h-full rounded-3xl p-5 mr-3 flex flex-col items-center">
            <div className="h-25">
                <PiUmbrella size={35} color="cyan" />
            </div>
            <div className="flex flex-col items-center h-full">
                <div className=" flex flex-col items-center mb-5">
                    <TiWeatherPartlySunny size={24} color="white" />
                    <p className="text-white mt-1">Weather</p>
                </div>
                <div className=" flex flex-col items-center mb-5">
                    <TfiMenuAlt size={24} color="white" />
                    <p className="text-white mt-1">Cities</p>
                </div>
                <div className=" flex flex-col items-center mb-5">
                    <RiMapFill size={24} color="white" />
                    <p className="text-white mt-1">Map</p>
                </div>
                <div className=" flex flex-col items-center mb-5">
                    <RiEqualizerFill size={24} color="white" />
                    <p className="text-white mt-1">Settings</p>
                </div>
                <div className="h-[40%]"></div>
            </div>
        </div>
    );
};

export default Sidebar;
