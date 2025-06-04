import { useState, useEffect, useRef } from "react";
import "./App.css";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Home from "./screens/Home";
import Alerts from "./screens/Alerts";
import About from "./screens/About";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Profile from "./screens/Profile";
import News from "./screens/News";
import ForgotPassword from "./screens/ForgotPassword";
import PrivateRoute from "./components/auth/PrivateRoute";
import WeatherContext from "./context/WeatherContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { SettingsProvider } from "./context/SettingsContext";
import { applyDefaultTheme } from "./utils/themeUtils";
import { data } from "./screens/sampleData";
import Favorites from "./screens/Favorites";
import {
    BsHouseFill,
    BsNewspaper,
    BsInfoCircle,
    BsBellFill,
    BsPersonCircle,
    BsList,
    BsInbox,
} from "react-icons/bs";

const UserMenu = ({ handleNavChange }) => {
    const { currentUser, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!currentUser) {
        return (
            <button
                onClick={() => handleNavChange("login")}
                className="hidden md:flex items-center px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-all"
            >
                <BsPersonCircle className="w-5 h-5" />
                <span className="ml-2">Login</span>
            </button>
        );
    }

    return (
        <div className="hidden md:block relative" ref={dropdownRef}>
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-all"
            >
                <BsPersonCircle className="w-5 h-5" />
                <span className="ml-2">
                    {currentUser.displayName || "User"}
                </span>
                <svg
                    className={`w-4 h-4 ml-2 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50">
                    <button
                        onClick={() => {
                            handleNavChange("profile");
                            setIsDropdownOpen(false);
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        <BsPersonCircle className="w-4 h-4 mr-2" />
                        Profile
                    </button>
                    <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                        <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

function App() {
    const [weather, setWeather] = useState(data);
    const [error, setError] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [location, setLocation] = useState({
        lat: 0,
        lon: 0,
        timeZone: "auto",
        name: "Gorakhpur, India",
    });
    const handleLogout = async () => {
        try {
            await logout();
            navigate("/");
        } catch (error) {
            console.error("Failed to log out:", error);
        }
    };

    const currentLocation = useLocation();
    const navigate = useNavigate();

    const handleNavChange = (screen) => {
        navigate(screen === "home" ? "/" : `/${screen}`);
    };

    const getCurrentScreen = () => {
        if (currentLocation.pathname === "/alerts") return "alerts";
        if (currentLocation.pathname === "/about") return "about";
        if (currentLocation.pathname === "/profile") return "profile";
        if (currentLocation.pathname.startsWith("/profile")) return "profile";
        if (currentLocation.pathname === "/favorites") return "favorites";
        if (currentLocation.pathname === "/news") return "news";
        if (
            currentLocation.pathname === "/login" ||
            currentLocation.pathname === "/signup" ||
            currentLocation.pathname === "/forgot-password"
        )
            return "login";
        return "home";
    };

    return (
        <AuthProvider>
            <SettingsProvider>
                <div className="min-h-screen flex flex-col bg-[#0B1121]">
                    {getCurrentScreen() !== "login" && (
                        <nav className="sticky top-0 z-50 bg-[#007bff] border-b border-cyan-800/50">
                            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 relative">
                                {/* Logo section */}
                                <div className="flex items-center">
                                    <span className="self-center text-xl lg:text-2xl font-semibold whitespace-nowrap text-white">
                                        WeatherCast
                                    </span>
                                </div>
                                {/* Navigation links - now in the middle */}
                                <div
                                    className={`${
                                        isMenuOpen ? "block" : "hidden"
                                    } md:flex order-3 md:order-2 w-full md:w-auto`}
                                >
                                    <ul className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 lg:gap-4 mt-4 md:mt-0">
                                        <li>
                                            <button
                                                onClick={() =>
                                                    handleNavChange("home")
                                                }
                                                className={`flex items-center px-3 md:px-2 lg:px-4 py-2 rounded-lg text-sm ${
                                                    currentLocation.pathname ===
                                                    "/"
                                                        ? "text-white bg-white/10"
                                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                                } transition-all w-full md:w-auto`}
                                            >
                                                <BsHouseFill className="w-5 h-5" />
                                                <span className="ml-2">
                                                    Home
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() =>
                                                    handleNavChange("alerts")
                                                }
                                                className={`flex items-center px-3 md:px-2 lg:px-4 py-2 rounded-lg text-sm ${
                                                    currentLocation.pathname ===
                                                    "/alerts"
                                                        ? "text-white bg-white/10"
                                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                                } transition-all w-full md:w-auto`}
                                            >
                                                <BsBellFill className="w-5 h-5" />
                                                <span className="ml-2">
                                                    Alerts
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() =>
                                                    handleNavChange("news")
                                                }
                                                className={`flex items-center px-3 md:px-2 lg:px-4 py-2 rounded-lg text-sm ${
                                                    currentLocation.pathname ===
                                                    "/news"
                                                        ? "text-white bg-white/10"
                                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                                } transition-all w-full md:w-auto`}
                                            >
                                                <BsNewspaper className="w-5 h-5" />
                                                <span className="ml-2">
                                                    News
                                                </span>
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                onClick={() =>
                                                    handleNavChange("about")
                                                }
                                                className={`flex items-center px-3 md:px-2 lg:px-4 py-2 rounded-lg text-sm ${
                                                    currentLocation.pathname ===
                                                    "/about"
                                                        ? "text-white bg-white/10"
                                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                                } transition-all w-full md:w-auto`}
                                            >
                                                <BsInfoCircle className="w-5 h-5" />
                                                <span className="ml-2">
                                                    About
                                                </span>
                                            </button>
                                        </li>

                                        <li>
                                            <button
                                                onClick={() =>
                                                    handleNavChange("profile")
                                                }
                                                className={`md:hidden flex items-center px-3 md:px-2 lg:px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all w-full md:w-auto`}
                                            >
                                                <BsPersonCircle className="w-5 h-5" />
                                                <span className="lg:inline ml-2">
                                                    Profile
                                                </span>
                                            </button>
                                        </li>

                                        <li>
                                            <button
                                                onClick={handleLogout}
                                                className={`md:hidden flex items-center px-3 md:px-2 lg:px-4 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-all w-full md:w-auto`}
                                            >
                                                <svg
                                                    className="w-4 h-4 mr-2"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                                    />
                                                </svg>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </div>{" "}
                                {/* Search and profile section */}
                                <div className="flex items-center gap-2 md:gap-4 order-2 md:order-3">
                                    {/* User menu - desktop */}
                                    <UserMenu
                                        handleNavChange={handleNavChange}
                                    />

                                    {/* Mobile menu toggle */}
                                    <button
                                        onClick={() =>
                                            setIsMenuOpen(!isMenuOpen)
                                        }
                                        className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10"
                                        aria-controls="navbar-menu"
                                        aria-expanded={isMenuOpen}
                                    >
                                        <BsList className="w-6 h-6" />
                                        <span className="sr-only">
                                            Toggle menu
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </nav>
                    )}
                    {/* Main Content */}
                    <main className="flex-grow">
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
                                <Route
                                    path="/"
                                    element={<Home key={currentLocation.key} />}
                                />
                                <Route
                                    path="/about"
                                    element={
                                        <About key={currentLocation.key} />
                                    }
                                />
                                <Route
                                    path="/login"
                                    element={
                                        <Login key={currentLocation.key} />
                                    }
                                />
                                <Route
                                    path="/signup"
                                    element={
                                        <SignUp key={currentLocation.key} />
                                    }
                                />
                                <Route
                                    path="/forgot-password"
                                    element={
                                        <ForgotPassword
                                            key={currentLocation.key}
                                        />
                                    }
                                />
                                {/* Protected Routes */}
                                <Route
                                    path="/news"
                                    element={
                                        <PrivateRoute key={currentLocation.key}>
                                            <News />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/alerts"
                                    element={
                                        <PrivateRoute key={currentLocation.key}>
                                            <Alerts />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/favorites"
                                    element={
                                        <PrivateRoute key={currentLocation.key}>
                                            <Favorites />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/profile"
                                    element={
                                        <PrivateRoute key={currentLocation.key}>
                                            <Profile />
                                        </PrivateRoute>
                                    }
                                />
                            </Routes>
                        </WeatherContext.Provider>
                    </main>
                </div>
            </SettingsProvider>
        </AuthProvider>
    );
}

export default App;
