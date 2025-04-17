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

const Conditions = () => {
    const { weather } = useContext(WeatherContext);
    const current = weather.current;
    function formatTime(isoString) {
        const date = new Date(isoString);

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const ampm = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;
        hours = String(hours).padStart(2, "0");

        return `${hours}:${minutes} ${ampm}`;
    }

    const conditionItems = [
        {
            icon: <CiTempHigh size={22} />,
            label: "Real Feel",
            value: current.apparent_temperature,
        },
        {
            icon: <FaWind size={22} />,
            label: "Wind",
            value: current.wind_speed_10m + " km/h",
        },
        {
            icon: <MdOutlineVisibility size={22} />,
            label: "Visibility",
            value:
                (weather.daily.visibility_mean[0] / 10000).toFixed(0) + " km",
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
            value: current.surface_pressure + " hPa",
        },
        {
            icon: <WiCloudy size={22} />,
            label: "Cloud Cover",
            value: current.cloud_cover + "%",
        },
        {
            icon: <WiSunrise size={22} />,
            label: "Sunrise",
            value: formatTime(weather.daily.sunrise[0]),
        },
        { icon: <WiSunset size={22} />, label: "Sunset", value: "07:30 PM" },
    ];

    const getRows = (itemsPerRow) => {
        const rows = [];
        for (let i = 0; i < conditionItems.length; i += itemsPerRow) {
            rows.push(conditionItems.slice(i, i + itemsPerRow));
        }
        return rows;
    };

    return (
        <div className="bg-[#202b3b] rounded-2xl p-4 flex-grow sm:flex-grow-0 flex flex-col">
            <p className="text-white text-sm font-semibold mb-3">
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
