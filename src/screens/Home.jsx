import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Main from "../components/Main";
import WeatherContext from "../context/WeatherContext";
import { getWeatherForecast } from "../api/weather";
import { data } from "./sampleData";
import { FaRobot, FaTimes } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Home = () => {
    const [weather, setWeather] = useState(data);
    const [error, setError] = useState("");
    const [location, setLocation] = useState({
        lat: 0,
        lon: 0,
        timeZone: "auto",
        name: "Gorakhpur, India",
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
                },
                (err) => {
                    setError(`Geolocation error: ${err.message}`);
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

    return (
        <div className="flex flex-col min-h-full w-full p-3 bg-[#162438] relative pt-20 sm:pt-0 sm:p-2">
            <div className="flex flex-col sm:flex-row flex-grow">
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
                    <Main />
                </WeatherContext.Provider>
            </div>

            <button
                onClick={() => setShowChatbot(!showChatbot)}
                className="fixed bottom-10 right-6 bg-[#4361ee] text-white p-4 rounded-full shadow-lg hover:bg-[#3a56d4] transition-all duration-300 z-50"
            >
                {showChatbot ? <FaTimes size={24} /> : <FaRobot size={24} />}
            </button>

            {showChatbot && (
                <div className="fixed bottom-24 right-6 w-80 h-96 bg-[#1a1a2e] rounded-lg shadow-xl border border-[#2b2d42] flex flex-col z-50 overflow-hidden">
                    <div className="bg-[#2b2d42] p-3 text-white font-semibold flex justify-between items-center">
                        <h3>Weather AI Assistant</h3>
                        <button
                            onClick={() => setShowChatbot(false)}
                            className="text-white hover:text-gray-300"
                        >
                            <FaTimes />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                        {conversation.length === 0 ? (
                            <div className="text-center text-gray-400 h-full flex flex-col items-center justify-center">
                                <FaRobot
                                    size={48}
                                    className="mb-4 text-[#4361ee]"
                                />
                                <p>Ask me anything about weather!</p>
                                <p className="text-sm mt-2">
                                    Try: "What should I wear in {location.name}
                                    ?"
                                </p>
                            </div>
                        ) : (
                            conversation.map((message, index) => (
                                <div
                                    key={index}
                                    className={`p-3 rounded-lg max-w-[80%] ${
                                        message.sender === "user"
                                            ? "bg-[#4361ee] text-white ml-auto"
                                            : "bg-[#2b2d42] text-white mr-auto"
                                    }`}
                                >
                                    <div className="text-xs text-gray-300 mb-1">
                                        {message.sender === "user"
                                            ? "You"
                                            : "AI"}{" "}
                                        •{" "}
                                        {new Date(
                                            message.timestamp
                                        ).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                    <div>{message.text}</div>
                                </div>
                            ))
                        )}
                    </div>

                    <form
                        onSubmit={handleAiSubmit}
                        className="p-3 border-t border-[#2b2d42]"
                    >
                        <div className="flex">
                            <input
                                type="text"
                                value={aiInput}
                                onChange={(e) => setAiInput(e.target.value)}
                                placeholder="Type your question..."
                                className="flex-1 bg-[#2b2d42] text-white p-2 rounded-l-lg focus:outline-none"
                                disabled={aiLoading}
                            />
                            <button
                                type="submit"
                                className="bg-[#4361ee] text-white px-4 rounded-r-lg hover:bg-[#3a56d4] disabled:bg-gray-600"
                                disabled={aiLoading}
                            >
                                {aiLoading ? "..." : "→"}
                            </button>
                        </div>
                        {aiError && (
                            <div className="text-red-400 text-xs mt-1">
                                {aiError}
                            </div>
                        )}
                        <button
                            type="button"
                            onClick={clearAiChat}
                            className="text-gray-400 text-xs mt-2 hover:text-white"
                        >
                            Clear chat
                        </button>
                    </form>
                </div>
            )}

            {showChatbot && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-20 z-40"
                    onClick={() => setShowChatbot(false)}
                />
            )}
        </div>
    );
};

export default Home;
