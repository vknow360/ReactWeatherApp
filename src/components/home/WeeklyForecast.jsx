import React from "react";
import { useContext } from "react";
import WeatherContext from "../../context/WeatherContext";
import { getWeatherCodeDetails } from "../../utils/weatherCodes";
import { getWeatherIconUrl } from "../../utils/weatherIcons";
import { useSettings } from "../../context/SettingsContext";
import { BsCalendar3, BsSunrise, BsSunset, BsUmbrella } from "react-icons/bs";
import { WiRaindrop, WiStrongWind, WiHumidity } from "react-icons/wi";

const WeeklyForecast = () => {
    const { weather } = useContext(WeatherContext);
    const { formatTemperature, formatWindSpeed } = useSettings();

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
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return "Today";
        }
        if (date.toDateString() === tomorrow.toDateString()) {
            return "Tomorrow";
        }
        return weekdays[date.getDay()];
    }

    const daily = weather.daily;
    const dates = daily.time;
    const weatherCodes = daily.weather_code;
    const tempMax = daily.temperature_2m_max;
    const tempMin = daily.temperature_2m_min;
    const precipProb = daily.precipitation_probability_max;
    const windSpeed = daily.wind_speed_10m_mean;
    const sunrise = daily.sunrise;
    const sunset = daily.sunset;
    const humidity = daily.relative_humidity_2m_mean;

    return (
        <div className="relative p-0.5 bg-gradient-to-br from-blue-500/20 via-indigo-500/20 to-teal-500/20 rounded-3xl">
            <div className="bg-white/80 rounded-[22px] p-6 border border-blue-200/50">
                {/* Forecast Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {dates.map((day, index) => {
                        if (index === 0) return null; // Skip today
                        return (
                            <div
                                key={index}
                                className="p-5 bg-gradient-to-br from-indigo-500/10 via-blue-500/15 to-teal-500/10 hover:from-indigo-500/15 hover:via-blue-500/20 hover:to-teal-500/15 bg-white/80 rounded-2xl border-2 border-blue-100 hover:border-blue-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 group shadow-sm"
                            >
                                {/* Main Weather Info */}
                                <div className="flex items-center gap-4 mb-4">
                                    {/* Day Column */}
                                    <div className="w-[110px] px-3 py-2 rounded-xl bg-gradient-to-r from-indigo-500/10 via-blue-500/10 to-blue-600/10 border border-blue-100/50">
                                        <p className="text-blue-900 font-semibold">
                                            {getWeekdayOrToday(day)}
                                        </p>
                                        <p className="text-blue-600/70 text-xs mt-0.5">
                                            {new Date(day).toLocaleDateString(
                                                "en-US",
                                                {
                                                    month: "short",
                                                    day: "numeric",
                                                }
                                            )}
                                        </p>
                                    </div>
                                    {/* Weather Icon & Description */}
                                    <div className="flex items-center gap-3">
                                        <div className="w-14 h-14 group-hover:scale-110 transition-transform bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-teal-500/5 p-1.5 rounded-2xl">
                                            <img
                                                src={getWeatherIconUrl(
                                                    weatherCodes[index],
                                                    true
                                                )}
                                                alt={
                                                    getWeatherCodeDetails(
                                                        weatherCodes[index]
                                                    ).description
                                                }
                                                className="w-full h-full"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-blue-800 text-sm font-medium">
                                                {
                                                    getWeatherCodeDetails(
                                                        weatherCodes[index]
                                                    ).description
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* Detailed Weather Metrics */}
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
                                    {/* Temperature */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-blue-900 font-bold text-lg">
                                                {formatTemperature(
                                                    tempMax[index]
                                                )}
                                            </span>
                                            <span className="text-blue-600 font-medium">
                                                {formatTemperature(
                                                    tempMin[index]
                                                )}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-blue-600/80 uppercase font-medium tracking-wide">
                                            High / Low
                                        </p>
                                    </div>
                                    {/* Precipitation */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-1.5 bg-gradient-to-r from-cyan-500/10 to-cyan-600/15 px-3 py-1.5 rounded-xl border border-cyan-200/50">
                                            <WiRaindrop className="w-5 h-5 text-cyan-600" />
                                            <span className="text-sm font-medium text-cyan-700">
                                                {precipProb[index]}%
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-cyan-600/80 uppercase font-medium tracking-wide">
                                            Rain Chance
                                        </p>
                                    </div>
                                    {/* Wind */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500/10 to-blue-600/15 px-3 py-1.5 rounded-xl border border-blue-200/50">
                                            <WiStrongWind className="w-5 h-5 text-blue-600" />
                                            <span className="text-sm font-medium text-blue-700">
                                                {formatWindSpeed(
                                                    windSpeed[index]
                                                )}
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-blue-600/80 uppercase font-medium tracking-wide">
                                            Wind Speed
                                        </p>
                                    </div>
                                    {/* Humidity */}
                                    <div className="space-y-1.5">
                                        <div className="flex items-center gap-1.5 bg-gradient-to-r from-teal-500/10 to-teal-600/15 px-3 py-1.5 rounded-xl border border-teal-200/50">
                                            <WiHumidity className="w-5 h-5 text-teal-600" />
                                            <span className="text-sm font-medium text-teal-700">
                                                {humidity[index]}%
                                            </span>
                                        </div>
                                        <p className="text-[11px] text-teal-600/80 uppercase font-medium tracking-wide">
                                            Humidity
                                        </p>
                                    </div>
                                </div>
                                {/* Sunrise/Sunset Info */}
                                <div className="mt-4 grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2.5 bg-gradient-to-r from-orange-400/10 to-orange-500/15 px-3 py-2 rounded-xl border border-orange-200/50">
                                        <BsSunrise className="w-5 h-5 text-orange-500" />
                                        <div>
                                            <p className="text-orange-700 text-sm font-medium">
                                                {new Date(
                                                    sunrise[index]
                                                ).toLocaleTimeString("en-US", {
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                    hour12: true,
                                                })}
                                            </p>
                                            <p className="text-orange-500/80 text-xs font-medium">
                                                Sunrise
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2.5 bg-gradient-to-r from-pink-400/10 to-pink-500/15 px-3 py-2 rounded-xl border border-pink-200/50">
                                        <BsSunset className="w-5 h-5 text-pink-500" />
                                        <div>
                                            <p className="text-pink-700 text-sm font-medium">
                                                {new Date(
                                                    sunset[index]
                                                ).toLocaleTimeString("en-US", {
                                                    hour: "numeric",
                                                    minute: "numeric",
                                                    hour12: true,
                                                })}
                                            </p>
                                            <p className="text-pink-500/80 text-xs font-medium">
                                                Sunset
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default WeeklyForecast;
