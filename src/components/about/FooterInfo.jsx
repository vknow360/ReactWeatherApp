import React from "react";

const FooterInfo = () => {
    return (
        <div className="text-center text-xs text-gray-500 mt-6">
            <p>
                Weather App v1.0.0 | © {new Date().getFullYear()} | MIT License
            </p>
        </div>
    );
};

export default FooterInfo;
