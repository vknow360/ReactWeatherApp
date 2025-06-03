import React from "react";
import { useContext } from "react";
import WeatherContext from "../../context/WeatherContext";
import { getWeatherCodeDetails } from "../../utils/weatherCodes";
import { getWeatherIconUrl } from "../../utils/weatherIcons";
import { useSettings } from "../../context/SettingsContext";

const Today = () => {
    const { formatTemperature } = useSettings();

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

    const hourlyTime = weather.hourly?.time.slice(0, 24);
    const hourlyTemp = weather.hourly?.temperature_2m;
    const hourlyWeatherCode = weather.hourly?.weather_code;
    const hourlyIsDay = weather.hourly?.is_day;
    return (
        <div className="relative p-0.5 bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-teal-500/20 rounded-3xl">
            <div className="bg-white/80 rounded-[22px] p-6 border border-blue-200/50">
                <div className="overflow-x-auto pb-3 hide-scrollbar -mx-6">
                    <div className="flex gap-6 min-w-max px-6">
                        {hourlyTime?.map((_, index) => (
                            <div
                                key={index}
                                className="flex-none w-[160px] p-4 bg-gradient-to-br from-indigo-500/10 via-blue-500/15 to-teal-500/10 hover:from-indigo-500/15 hover:via-blue-500/20 hover:to-teal-500/15 bg-white/80 rounded-2xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 group shadow-sm"
                            >
                                <div className="flex flex-col items-center">
                                    {/* Time */}
                                    <p className="text-indigo-900 text-sm font-medium">
                                        {formatTime(hourlyTime[index])}
                                    </p>{" "}
                                    {/* Weather Icon */}
                                    <div className="bg-gray-300 w-14 h-14 my-3 group-hover:scale-110 transition-transform bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-teal-500/5 p-1.5 rounded-2xl">
                                        <img
                                            src={getWeatherIconUrl(
                                                hourlyWeatherCode[index],
                                                hourlyIsDay[index] === 1
                                            )}
                                            alt={
                                                getWeatherCodeDetails(
                                                    hourlyWeatherCode[index]
                                                ).description
                                            }
                                            className="w-full h-full"
                                        />
                                    </div>
                                    {/* Temperature */}
                                    <p className="text-blue-900 font-semibold text-xl mt-2 tracking-tight">
                                        {formatTemperature(hourlyTemp[index])}
                                    </p>
                                    {/* Weather Description */}
                                    <p className="text-indigo-600/70 text-xs mt-1.5 text-center font-medium leading-tight">
                                        {
                                            getWeatherCodeDetails(
                                                hourlyWeatherCode[index]
                                            ).description
                                        }
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Today;
