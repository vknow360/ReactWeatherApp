import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LayoutWrapper = ({ children }) => {
    const location = useLocation();
    const isAuthPage =
        location.pathname === "/login" ||
        location.pathname === "/signup" ||
        location.pathname === "/forgot-password";

    return (
        <div className="min-h-screen flex flex-col bg-[#0B1121]">
            {children}
        </div>
    );
};

export default LayoutWrapper;
