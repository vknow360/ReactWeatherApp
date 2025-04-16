import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
    return (
        <div className="bg-[#202b3b] w-[100%] rounded-xl flex flex-row justify-evenly items-center h-12 p-1 mb-2">
            <input
                className="w-[100%] h-8 ml-2 outline-none text-white"
                placeholder="Search for cities"
                color="white"
            ></input>
            {/* <button
                className="w-[10%] flex flex-col justify-center items-center cursor-pointer active:text-blue-500 transition-colors"
                aria-label="Search"
                type="button"
            >
                <FiSearch size={22} />
            </button> */}
        </div>
    );
};

export default SearchBar;
