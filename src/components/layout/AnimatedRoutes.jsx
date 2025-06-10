import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PrivateRoute from "../auth/PrivateRoute";
import Home from "../../screens/Home";
import About from "../../screens/About";
import News from "../../screens/News";
import Alerts from "../../screens/Alerts";
import Profile from "../../screens/Profile";
import Favorites from "../../screens/Favorites";
import Login from "../../screens/Login";
import SignUp from "../../screens/SignUp";
import ForgotPassword from "../../screens/ForgotPassword";

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                {/* Public routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/about" element={<About />} />

                {/* Home route */}
                <Route path="/" element={<Home />} />

                {/* Protected routes */}
                <Route
                    path="/news"
                    element={
                        <PrivateRoute>
                            <News />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/alerts"
                    element={
                        <PrivateRoute>
                            <Alerts />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/favorites"
                    element={
                        <PrivateRoute>
                            <Favorites />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
