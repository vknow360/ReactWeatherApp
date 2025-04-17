import React from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import Today from "./TodayForecast";
import Conditions from "./Conditions";
import WeeklyForecast from "./WeeklyForecast";
import WeatherNews from "./WeatherNews";

const Main = () => {
    return (
        <div className="w-full flex flex-col lg:flex-row gap-3 h-full">
            <div className="flex flex-col w-full lg:w-3/5 gap-3">
                <SearchBar />
                <div className="flex flex-col flex-grow gap-3">
                    <WeatherCard />
                    <Today />
                    <Conditions />
                </div>
            </div>
            <div className="flex flex-col w-full lg:w-[38%]">
                <WeeklyForecast />
                <WeatherNews />
            </div>
        </div>
    );
};

export default Main;
