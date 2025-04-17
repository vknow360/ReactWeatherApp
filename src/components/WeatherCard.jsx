import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import WeatherContext from "../context/WeatherContext";
import { useContext } from "react";
import { getWeatherCodeDetails } from "../utils/weatherCodes";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const WeatherCard = () => {
    const { weather, error, location } = useContext(WeatherContext);

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

    const weathercode = weather.current?.weather_code;
    const isDay = weather.current?.is_day;
    const time = formatTime(weather.current?.time);
    const { description, iconDay, iconNight } =
        getWeatherCodeDetails(weathercode);
    return (
        <div className="bg-[#202b3b] rounded-2xl flex flex-row p-6 flex-grow h-full">
            <div className="flex flex-col justify-between w-2/3">
                <div className="bg-gray-600/50 rounded-lg py-2 px-3 inline-flex items-center">
                    <FaLocationDot color="white" size={16} />
                    <p className="text-lg sm:text-2xl text-white ml-2 truncate">
                        {location.name}
                    </p>
                </div>
                <div className="flex-grow flex flex-col justify-center">
                    <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                        {`${weather.current.temperature_2m}`}&deg;C
                    </p>
                    <p className="text-white mt-1 text-lg">{description}</p>
                </div>
                <div className="mt-4">
                    <p className="text-white/70 text-sm">{`Last updated: ${time}`}</p>
                </div>
            </div>
            <div className="flex justify-center items-center w-1/3 sm:w-1/2 md:w-1/4">
                <DotLottieReact
                    src={isDay == 1 ? iconDay : iconNight}
                    loop
                    autoplay
                />
            </div>
        </div>
    );
};

export default WeatherCard;
