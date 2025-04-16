import React from "react";
import { FaLocationDot } from "react-icons/fa6";

const WeatherCard = () => {
    return (
        <div className="flex flex-row h-[28%] ">
            <div className="flex flex-col p-2 ml-5 justify-between w-[60%]">
                <div className="flex flex-col mb-2 bg-gray-600 rounded-4xl pt-3 pb-3 pl-2">
                    <div className=" flex flex-row items-center">
                        <FaLocationDot color="white" size={24} />

                        <p className="text-3xl text-white ml-2">
                            Madrid, Spain
                        </p>
                    </div>
                </div>
                <div>
                    <p className="text-5xl mb-1 font-bold text-white">
                        30&deg;C
                    </p>
                    <p className="text-white">Sunny</p>
                </div>
            </div>
            <div className="flex flex-col p-5 justify-center items-center">
                <img
                    src="https://cdn.weatherapi.com/weather/128x128/day/113.png"
                    className="h-50"
                ></img>
            </div>
        </div>
    );
};

export default WeatherCard;
