import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
    return (
        <div className="bg-[#202b3b] rounded-xl flex items-center p-3">
            <input
                className="w-full bg-transparent text-white outline-none placeholder-gray-400 text-sm"
                placeholder="Search for cities"
            />
            <button
                className="ml-2 flex-shrink-0 flex items-center justify-center text-gray-400 hover:text-white"
                aria-label="Search"
                type="button"
            >
                <FiSearch size={18} />
            </button>
        </div>
    );
};

export default SearchBar;
