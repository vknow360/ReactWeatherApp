import React from "react";
import { CiTempHigh } from "react-icons/ci";
import { FaWind } from "react-icons/fa";
import { TbUvIndex } from "react-icons/tb";
import {
    WiHumidity,
    WiSunrise,
    WiSunset,
    WiBarometer,
    WiCloudy,
} from "react-icons/wi";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineWaterDrop } from "react-icons/md";
import { useContext } from "react";
import WeatherContext from "../context/WeatherContext";
import { useSettings } from "../context/SettingsContext";

const Conditions = () => {
    const { weather } = useContext(WeatherContext);
    const {
        formatTemperature,
        formatWindSpeed,
        formatPressure,
        formatVisibility,
        formatTime,
    } = useSettings();
    const current = weather.current; // Using the formatTime from SettingsContext instead of local implementation
    const conditionItems = [
        {
            icon: <CiTempHigh size={22} />,
            label: "Real Feel",
            value: formatTemperature(current.apparent_temperature),
        },
        {
            icon: <FaWind size={22} />,
            label: "Wind",
            value: formatWindSpeed(current.wind_speed_10m),
        },
        {
            icon: <MdOutlineVisibility size={22} />,
            label: "Visibility",
            value: formatVisibility(weather.daily.visibility_mean[0] / 10000),
        },
        {
            icon: <MdOutlineWaterDrop size={22} />,
            label: "Chance of rain",
            value: current.rain + "%",
        },
        {
            icon: <TbUvIndex size={22} />,
            label: "UV Index",
            value: weather.daily.uv_index_max[0],
        },
        {
            icon: <WiHumidity size={22} />,
            label: "Humidity",
            value: current.relative_humidity_2m + "%",
        },
        {
            icon: <WiBarometer size={22} />,
            label: "Pressure",
            value: formatPressure(current.surface_pressure),
        },
        {
            icon: <WiCloudy size={22} />,
            label: "Cloud Cover",
            value: current.cloud_cover + "%",
        },
        {
            icon: <WiSunrise size={22} />,
            label: "Sunrise",
            value: formatTime(weather.daily.sunrise[0], weather.timezone),
        },
        {
            icon: <WiSunset size={22} />,
            label: "Sunset",
            value: formatTime(weather.daily.sunset[0], weather.timezone),
        },
    ];

    const getRows = (itemsPerRow) => {
        const rows = [];
        for (let i = 0; i < conditionItems.length; i += itemsPerRow) {
            rows.push(conditionItems.slice(i, i + itemsPerRow));
        }
        return rows;
    };

    return (
        <div className="bg-[var(--color-bg-secondary)] rounded-2xl p-4 flex-grow sm:flex-grow-0 flex flex-col">
            <p className="text-[var(--color-text-primary)] text-sm font-semibold mb-3">
                AIR CONDITIONS
            </p>

            <div className="sm:hidden flex flex-col gap-4 h-full justify-evenly">
                {getRows(2).map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-2 gap-3">
                        {row.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <div className="text-white mr-2">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-white text-xs font-normal">
                                        {item.label}
                                    </p>
                                    <p className="text-white font-medium text-sm">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div className="hidden sm:flex flex-col gap-5 h-full justify-evenly">
                {getRows(3).map((row, rowIndex) => (
                    <div key={rowIndex} className="grid grid-cols-3 gap-5">
                        {row.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <div className="text-white mr-3">
                                    {item.icon}
                                </div>
                                <div>
                                    <p className="text-white text-xs font-normal">
                                        {item.label}
                                    </p>
                                    <p className="text-white font-medium text-lg">
                                        {item.value}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Conditions;
