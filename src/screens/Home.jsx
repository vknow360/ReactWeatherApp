import React, { useEffect, useState } from "react";
import Main from "../components/home/Main";
import WeatherContext from "../context/WeatherContext";
import { getWeatherForecast } from "../api/weather";
import { data } from "./sampleData";
import { FaRobot, FaTimes } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Footer from "../components/Footer";

const Home = () => {
    const [weather, setWeather] = useState(data);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [location, setLocation] = useState({
        lat: 0,
        lon: 0,
        timeZone: "auto",
        name: "Gorakhpur, India",
    });
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("weatherFavorites");
        return saved ? JSON.parse(saved) : [];
    });
    const [unit, setUnit] = useState(() => {
        const saved = localStorage.getItem("weatherUnit");
        return saved || "celsius";
    });

    const [aiInput, setAiInput] = useState("");
    const [aiLoading, setAiLoading] = useState(false);
    const [aiError, setAiError] = useState("");
    const [conversation, setConversation] = useState([]);
    const [showChatbot, setShowChatbot] = useState(false);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    setIsLoading(true);
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    if (lat == 0 || lon == 0) {
                        return;
                    }
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
                    );
                    const data = await response.json();
                    const name =
                        data.address.city + ", " + data.address.country;

                    setLocation({
                        lat,
                        lon,
                        timeZone: "auto",
                        name: name,
                    });

                    const { weath, err } = await getWeatherForecast(
                        lat,
                        lon,
                        "auto"
                    );
                    if (err === "") {
                        setWeather(weath);
                        setError("");
                    } else {
                        setWeather(data);
                        setError(err);
                    }
                    setIsLoading(false);
                },
                (err) => {
                    setError(`Geolocation error: ${err.message}`);
                    setIsLoading(false);
                },
                {
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        }
    }, []);

    const handleAiSubmit = async (e) => {
        e.preventDefault();
        if (!aiInput.trim()) return;

        setAiLoading(true);
        setAiError("");

        const userMessage = {
            sender: "user",
            text: aiInput,
            timestamp: new Date(),
        };
        const updatedConversation = [...conversation, userMessage];
        setConversation(updatedConversation);
        setAiInput("");

        try {
            const genAI = new GoogleGenerativeAI(
                import.meta.env.VITE_GEMINI_API_KEY
            );
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-pro-latest",
            });

            const result = await model.generateContent(aiInput);
            const response = await result.response;
            const text = await response.text();

            const aiMessage = { sender: "ai", text, timestamp: new Date() };
            setConversation([...updatedConversation, aiMessage]);
        } catch (err) {
            console.error("Error generating content:", err);
            setAiError("Failed to get response. Please try again.");
        } finally {
            setAiLoading(false);
        }
    };

    const clearAiChat = () => {
        setConversation([]);
        setAiError("");
    };

    const refreshWeather = async () => {
        setIsLoading(true);
        try {
            const { weath, err } = await getWeatherForecast(
                location.lat,
                location.lon,
                location.timeZone
            );
            if (err === "") {
                setWeather(weath);
                setError("");
            } else {
                setError(err);
            }
        } catch (err) {
            setError("Failed to refresh weather data");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleUnit = () => {
        const newUnit = unit === "celsius" ? "fahrenheit" : "celsius";
        setUnit(newUnit);
        localStorage.setItem("weatherUnit", newUnit);
    };

    const addToFavorites = () => {
        if (
            !favorites.some(
                (fav) => fav.lat === location.lat && fav.lon === location.lon
            )
        ) {
            const newFavorites = [...favorites, location];
            setFavorites(newFavorites);
            localStorage.setItem(
                "weatherFavorites",
                JSON.stringify(newFavorites)
            );
        }
    };

    const removeFromFavorites = () => {
        const newFavorites = favorites.filter(
            (fav) => !(fav.lat === location.lat && fav.lon === location.lon)
        );
        setFavorites(newFavorites);
        localStorage.setItem("weatherFavorites", JSON.stringify(newFavorites));
    };

    const isLocationFavorite = favorites.some(
        (fav) => fav.lat === location.lat && fav.lon === location.lon
    );

    return (
        <WeatherContext.Provider
            value={{
                weather,
                error,
                location,
                isLoading,
                setWeather,
                setError,
                setLocation,
                setIsLoading,
                unit,
                toggleUnit,
                favorites,
                addToFavorites,
                removeFromFavorites,
                isLocationFavorite,
                refreshWeather,
            }}
        >
            <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
                {/* Main Content Area - Full width on mobile, adjusted for sidebar on larger screens */}
                <div className="flex-1 w-full">
                    <div className="container mx-auto max-w-[2000px] px-0 md:px-4 lg:px-4">
                        <Main />
                    </div>

                    {/* Footer */}
                    <div className="mt-8">
                        <Footer />
                    </div>
                </div>

                {/* AI Chatbot - Floating button and chat window */}
                <div className="fixed bottom-20 md:bottom-6 right-4 z-50">
                    {!showChatbot && (
                        <button
                            onClick={() => setShowChatbot(true)}
                            className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            aria-label="Open AI Chat"
                        >
                            <FaRobot className="w-6 h-6" />
                        </button>
                    )}

                    {showChatbot && (
                        <div className="bg-white rounded-2xl shadow-xl w-[90vw] sm:w-[400px] max-h-[600px] overflow-hidden border border-gray-200">
                            <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200 flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <FaRobot className="text-blue-600 w-5 h-5" />
                                    <h3 className="text-gray-800 font-semibold">
                                        Weather Assistant
                                    </h3>
                                </div>
                                <button
                                    onClick={() => {
                                        setShowChatbot(false);
                                        setAiError("");
                                    }}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            {/* Chat Messages */}
                            <div className="p-4 h-[400px] overflow-y-auto space-y-4">
                                {conversation.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex ${
                                            msg.role === "user"
                                                ? "justify-end"
                                                : "justify-start"
                                        }`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-xl ${
                                                msg.role === "user"
                                                    ? "bg-blue-100 text-gray-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {msg.parts}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Input Form */}
                            <form
                                onSubmit={handleAiSubmit}
                                className="p-4 border-t border-gray-200 bg-gray-50"
                            >
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={aiInput}
                                        onChange={(e) =>
                                            setAiInput(e.target.value)
                                        }
                                        placeholder="Ask about weather..."
                                        className="flex-1 bg-white text-gray-800 p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                                        disabled={aiLoading}
                                    />
                                    <button
                                        type="submit"
                                        className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:opacity-90 disabled:opacity-50 transition-all duration-300"
                                        disabled={aiLoading}
                                    >
                                        {aiLoading ? "..." : "Ask"}
                                    </button>
                                </div>
                                {aiError && (
                                    <div className="mt-2 text-red-600 text-sm">
                                        {aiError}
                                    </div>
                                )}
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </WeatherContext.Provider>
    );
};

export default Home;
