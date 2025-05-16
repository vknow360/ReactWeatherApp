import React from "react";
import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { getWeatherCodeDetails } from "../utils/weatherCodes";
import { useSettings } from "../context/SettingsContext";

const WeeklyForecast = () => {
    const { weather } = useContext(WeatherContext);
    const { formatTemperature } = useSettings();

    const weekdays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    function getWeekdayOrToday(dateString) {
        const inputDate = new Date(dateString);
        const today = new Date();

        const isToday =
            inputDate.getFullYear() === today.getFullYear() &&
            inputDate.getMonth() === today.getMonth() &&
            inputDate.getDate() === today.getDate();

        if (isToday) return "Today";

        return weekdays[inputDate.getDay()];
    }

    const daily = weather.daily;
    const dates = daily.time;
    const weatherCodes = daily.weather_code;
    const tempMax = daily.temperature_2m_max;
    const tempMin = daily.temperature_2m_min;

    return (
        <div className="bg-[var(--color-bg-secondary)] rounded-2xl p-4 h-auto">
            <p className="text-[var(--color-text-primary)] text-sm font-semibold mb-3">
                7-DAY FORECAST
            </p>
            <div className="flex flex-col space-y-2">
                {dates.map((day, index) => {
                    const { description, iconDay, iconNight } =
                        getWeatherCodeDetails(weatherCodes[0]);

                    return (
                        <div
                            key={index}
                            className="border border-gray-700 rounded-lg flex items-center justify-between p-2 md:p-3"
                        >
                            <p className="text-white text-xs sm:text-sm font-medium min-w-[60px] w-1/4 truncate">
                                {getWeekdayOrToday(day)}
                            </p>
                            <div className="flex items-center justify-center w-1/4">
                                <div className="w-10 h-10 my-1">
                                    <DotLottieReact src={iconDay} />
                                </div>
                            </div>
                            <p className="text-white text-xs sm:text-sm font-medium w-1/4 text-center">
                                {description}
                            </p>{" "}
                            <p className="text-white text-xs sm:text-sm font-medium w-1/4 text-right">
                                {formatTemperature(tempMax[index], false)}&deg;
                                / {formatTemperature(tempMin[index], false)}
                                &deg;
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WeeklyForecast;
