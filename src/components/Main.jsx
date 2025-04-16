import React from "react";
import SearchBar from "./SearchBar";
import WeatherCard from "./WeatherCard";
import Today from "./TodayForecast";
import Conditions from "./Conditions";
import WeeklyForecast from "./WeeklyForecast";

const Main = () => {
    return (
        <div className="ml-3 w-full flex flex-row h-full">
            <div className="flex flex-col w-[60%] justify-between h-full">
                <SearchBar></SearchBar>
                <WeatherCard></WeatherCard>
                <Today></Today>
                <Conditions></Conditions>
            </div>
            <div className="flex flex-col w-[42%] ml-5 pl-5">
                <WeeklyForecast></WeeklyForecast>
            </div>
        </div>
    );
};

export default Main;
