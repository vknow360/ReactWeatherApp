import { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./screens/Home";
import Alerts from "./screens/Alerts";
import About from "./screens/About";
import News from "./screens/News";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Profile from "./screens/Profile";
import ForgotPassword from "./screens/ForgotPassword";
import PrivateRoute from "./components/auth/PrivateRoute";
import Sidebar from "./components/Sidebar";
import WeatherContext from "./context/WeatherContext";
import { AuthProvider } from "./context/AuthContext";
import { SettingsProvider } from "./context/SettingsContext";
import { applyDefaultTheme } from "./utils/themeUtils";
import { data } from "./screens/sampleData";

function App() {
    const [weather, setWeather] = useState(data);
    const [error, setError] = useState("");
    const [location, setLocation] = useState({
        lat: 0,
        lon: 0,
        timeZone: "auto",
        name: "Gorakhpur, India",
    });

    // Apply default theme on app initialization
    useEffect(() => {
        applyDefaultTheme();
    }, []);

    const currentLocation = useLocation();
    const navigate = useNavigate();

    const handleNavChange = (screen) => {
        navigate(screen === "home" ? "/" : `/${screen}`);
    };
    const getCurrentScreen = () => {
        if (currentLocation.pathname === "/alerts") return "alerts";
        if (currentLocation.pathname === "/news") return "news";
        if (currentLocation.pathname === "/about") return "about";
        if (currentLocation.pathname === "/profile") return "profile";
        if (currentLocation.pathname.startsWith("/profile")) return "profile";
        return "home";
    };
    return (
        <AuthProvider>
            <SettingsProvider>
                <div className="flex min-h-full w-full bg-[var(--color-bg-primary)] relative">
                    {/* Bottom mobile menu (only visible on mobile) */}
                    <div className="bg-[var(--color-bg-primary)] p-3 fixed top-0 left-0 right-0 h-[80px] flex items-center justify-center z-10 sm:hidden">
                        <Sidebar
                            onNavChange={handleNavChange}
                            currentScreen={getCurrentScreen()}
                        />
                    </div>
                    {/* Left sidebar (only visible on sm and larger screens) */}
                    <div className="fixed left-3 top-3 bottom-3 z-10 hidden sm:block">
                        <Sidebar
                            onNavChange={handleNavChange}
                            currentScreen={getCurrentScreen()}
                        />
                    </div>
                    {/* Main content with appropriate margins */}
                    <div className="flex flex-grow ml-0 sm:ml-20 p-3 sm:pb-3">
                        <WeatherContext.Provider
                            value={{
                                weather,
                                error,
                                location,
                                setWeather,
                                setError,
                                setLocation,
                            }}
                        >
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/alerts" element={<Alerts />} />
                                <Route path="/news" element={<News />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<SignUp />} />
                                <Route
                                    path="/forgot-password"
                                    element={<ForgotPassword />}
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
                        </WeatherContext.Provider>{" "}
                    </div>
                </div>
            </SettingsProvider>
        </AuthProvider>
    );
}

export default App;
