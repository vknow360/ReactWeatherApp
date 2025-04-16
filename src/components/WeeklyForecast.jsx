import React from "react";

const WeeklyForecast = () => {
    return (
        <div className="mt-13 bg-[#202b3b] rounded-3xl p-8 flex flex-col justify-between">
            <p className="text-white p-2 pl-5 text-sm font-semibold mb-2">
                7-DAY FORECAST
            </p>
            <div className="flex flex-col justify-between">
                <div className="border-2 flex flex-row h-[12%] justify-between items-center p-1 ml-2 mr-2">
                    <p className="text-white p-2 pl-5 text-sm font-semibold w-[25%]">
                        Today
                    </p>
                    <img
                        src="https://cdn.weatherapi.com/weather/128x128/day/113.png"
                        className="h-15"
                    ></img>
                    <p className="text-white p-2 pl-5 text-sm font-semibold">
                        Sunny
                    </p>
                    <p className="text-white p-2 pl-5 text-sm font-semibold">
                        36/22
                    </p>
                </div>

                <div className="border-2 flex flex-row h-[12%] justify-between items-center p-1 ml-2 mr-2">
                    <p className="text-white p-2 pl-5 text-sm font-semibold w-[25%]">
                        Thursday
                    </p>
                    <img
                        src="https://cdn.weatherapi.com/weather/128x128/day/113.png"
                        className="h-15"
                    ></img>
                    <p className="text-white p-2 pl-5 text-sm font-semibold">
                        Sunny
                    </p>
                    <p className="text-white p-2 pl-5 text-sm font-semibold">
                        36/22
                    </p>
                </div>

                <div className="border-2 flex flex-row h-[12%] justify-between items-center p-1 ml-2 mr-2">
                    <p className="text-white p-2 pl-5 text-sm font-semibold w-[25%]">
                        Friday
                    </p>
                    <img
                        src="https://cdn.weatherapi.com/weather/128x128/day/113.png"
                        className="h-15"
                    ></img>
                    <p className="text-white p-2 pl-5 text-sm font-semibold">
                        Sunny
                    </p>
                    <p className="text-white p-2 pl-5 text-sm font-semibold">
                        36/22
                    </p>
                </div>

                <div className="border-2 flex flex-row h-[12%] justify-between items-center p-1 ml-2 mr-2">
                    <p className="text-white p-2 pl-5 text-sm font-semibold w-[25%]">
                        Saturday
                    </p>
                    <img
                        src="https://cdn.weatherapi.com/weather/128x128/day/113.png"
                        className="h-15"
                    ></img>
                    <p className="text-white p-2 pl-5 text-sm font-semibold">
                        Sunny
                    </p>
                    <p className="text-white p-2 pl-5 text-sm font-semibold">
                        36/22
                    </p>
                </div>

                <div className="border-2 flex flex-row h-[12%] justify-between items-center p-1 ml-2 mr-2">
                    <p className="text-white p-2 pl-5 text-sm font-semibold w-[25%]">
                        Sunday
                    </p>
                    <img
                        src="https://cdn.weatherapi.com/weather/128x128/day/113.png"
                        className="h-15"
                    ></img>
                    <p className="text-white p-2 pl-5 text-sm font-semibold">
                        Sunny
                    </p>
                    <p className="text-white p-2 pl-5 text-sm font-semibold">
                        36/22
                    </p>
                </div>

                <div className="border-2 flex flex-row h-[12%] justify-between items-center p-1 ml-2 mr-2">
                    <p className="text-white p-2 pl-5 text-sm font-semibold w-[25%]">
                        Monday
                    </p>
                    <img
                        src="https://cdn.weatherapi.com/weather/128x128/day/113.png"
                        className="h-15"
                    ></img>
                    <p className="text-white p-2 pl-5 text-sm font-semibold">
                        Sunny
                    </p>
                    <p className="text-white p-2 pl-5 text-sm font-semibold">
                        36/22
                    </p>
                </div>

                <div className="border-2 flex flex-row h-[12%] justify-between items-center p-1 ml-2 mr-2">
                    <p className="text-white p-2 pl-5 text-sm font-semibold w-[25%]">
                        Tuesday
                    </p>
                    <img
                        src="https://cdn.weatherapi.com/weather/128x128/day/113.png"
                        className="h-15"
                    ></img>
                    <p className="text-white p-2 pl-5 text-sm font-semibold">
                        Sunny
                    </p>
                    <p className="text-white p-2 pl-5 text-sm font-semibold">
                        36/22
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WeeklyForecast;
