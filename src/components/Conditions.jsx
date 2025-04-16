import React from "react";
import { CiTempHigh } from "react-icons/ci";
import { FaWind } from "react-icons/fa";
import { TbUvIndex } from "react-icons/tb";
import { WiHumidity } from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineWaterDrop } from "react-icons/md";

const Conditions = () => {
    return (
        <div className="bg-[#202b3b] rounded-2xl h-[28%] flex flex-col justify-evenly">
            <p className="text-white p-2 pl-5 text-sm font-semibold">
                AIR CONDITIONS
            </p>
            <div className="pl-8 mb-3 flex flex-row">
                <div className="w-[50%] flex flex-row">
                    <CiTempHigh color="white" size={24} />
                    <div className="ml-2">
                        <p className="text-white font-normal">Real Feel</p>
                        <p className="text-white font-medium text-3xl">
                            30&deg;C
                        </p>
                    </div>
                </div>
                <div className="w-[50%] flex flex-row">
                    <FaWind color="white" size={24} />
                    <div className="ml-2">
                        <p className="text-white font-normal">Wind</p>
                        <p className="text-white font-medium text-3xl">
                            0.2 km/h
                        </p>
                    </div>
                </div>
                <div className="w-[50%] flex flex-row">
                    <MdOutlineVisibility color="white" size={24} />
                    <div className="ml-2">
                        <p className="text-white font-normal">Visibility</p>
                        <p className="text-white font-medium text-3xl">
                            0.2 km/h
                        </p>
                    </div>
                </div>
            </div>
            <div className="pl-8 mb-2 flex flex-row">
                <div className="w-[50%] flex flex-row">
                    <MdOutlineWaterDrop color="white" size={24} />
                    <div className="ml-2">
                        <p className="text-white font-normal">Chance of rain</p>
                        <p className="text-white font-medium text-3xl">0%</p>
                    </div>
                </div>
                <div className="w-[50%] flex flex-row">
                    <TbUvIndex color="white" size={24} />
                    <div className="ml-2">
                        <p className="text-white font-normal">UV Index</p>
                        <p className="text-white font-medium text-3xl">3</p>
                    </div>
                </div>
                <div className="w-[50%] flex flex-row">
                    <WiHumidity color="white" size={24} />
                    <div className="ml-2">
                        <p className="text-white font-normal">Humidity</p>
                        <p className="text-white font-medium text-3xl">3</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Conditions;
