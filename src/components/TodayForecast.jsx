import React from "react";
import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import { getWeatherCodeDetails } from "../utils/weatherCodes";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Today = () => {
    function formatTime(isoString) {
        let date = new Date(isoString);
        if (date.getTimezoneOffset() != weather.utc_offset_seconds) {
            date = new Date(date.getTime() + weather.utc_offset_seconds);
        }
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;
        hours = String(hours).padStart(2, "0");

        return `${hours}:${minutes} ${ampm}`;
    }

    const { weather } = useContext(WeatherContext);

    const hourlyTime = weather.hourly?.time.slice(0, 8);

    const hourlyTemp = weather.hourly?.temperature_2m;
    const hourlyWeatherCode = weather.hourly?.weather_code;
    const hourlyIsDay = weather.hourly?.is_day;

    return (
        <div className="bg-[#202b3b] rounded-2xl p-4 flex-grow sm:flex-grow-0">
            <p className="text-white text-sm font-semibold mb-3">
                TODAY'S FORECAST
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-8 gap-2 h-[calc(100%-2rem)] items-center">
                {hourlyTime.map((_, index) => {
                    const { description, iconDay, iconNight } =
                        getWeatherCodeDetails(hourlyWeatherCode[index]);
                    return (
                        <div
                            key={index}
                            className="border border-gray-700 rounded-lg flex flex-col items-center py-2 px-1 h-full justify-center"
                        >
                            <p className="text-white text-xs">{`${formatTime(
                                hourlyTime[index]
                            )}`}</p>

                            <div className="w-8 h-8 my-1">
                                <DotLottieReact
                                    src={
                                        hourlyIsDay[index] == 1
                                            ? iconDay
                                            : iconNight
                                    }
                                />
                            </div>

                            <p className="text-lg text-white font-bold">
                                {hourlyTemp[index]}&deg;C
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Today;
