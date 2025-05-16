import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    FaUser,
    FaCamera,
    FaSave,
    FaSignOutAlt,
    FaExclamationTriangle,
    FaCheckCircle,
} from "react-icons/fa";
import ProfileSettings from "../components/profile/ProfileSettings";

const Profile = () => {
    const {
        currentUser,
        logout,
        updateUserProfile,
        error: authError,
    } = useAuth();
    const [displayName, setDisplayName] = useState("");
    const [photoURL, setPhotoURL] = useState("");
    const [photoError, setPhotoError] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("profile");
    const navigate = useNavigate();

    // Helper function to refresh user data from Firebase Auth
    const refreshUserData = () => {
        if (currentUser) {
            // Force reload the current user to get the latest data
            currentUser.reload().catch((err) => {
                console.error("Error reloading user data:", err);
            });
        }
    };

    useEffect(() => {
        if (currentUser) {
            setDisplayName(currentUser.displayName || "");
            setPhotoURL(currentUser.photoURL || "");
            setPhotoError(false);
        }
    }, [currentUser]);

    const handleLogout = async () => {
        setError("");
        try {
            await logout();
            navigate("/login");
        } catch (err) {
            setError("Failed to log out");
            console.error(err);
        }
    };
    const validatePhotoURL = (url) => {
        if (!url) return true; // Empty URL is valid (no photo)

        try {
            const parsedUrl = new URL(url);
            return (
                parsedUrl.protocol === "http:" ||
                parsedUrl.protocol === "https:"
            );
        } catch (err) {
            return false;
        }
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();

        if (!displayName.trim()) {
            return setError("Display name cannot be empty");
        }

        // Validate photo URL if provided
        if (photoURL && !validatePhotoURL(photoURL)) {
            return setError("Please enter a valid http or https image URL");
        }

        const updateData = {
            displayName: displayName.trim(),
        };

        // Only include photo URL if it's not empty and not causing errors
        if (photoURL && !photoError) {
            updateData.photoURL = photoURL;
        }
        try {
            setLoading(true);
            setError("");

            // First try to update the profile
            const success = await updateUserProfile(currentUser, updateData);
            if (success) {
                // Try to refresh the user data from Firebase
                refreshUserData();

                // Update local state to match what the user entered
                if (updateData.displayName) {
                    // Update our local state to match what the user entered
                    setDisplayName(updateData.displayName);
                }

                if (updateData.photoURL) {
                    // Update our local state to match what the user entered
                    setPhotoURL(updateData.photoURL);
                }

                setMessage("Profile updated successfully");
                setPhotoError(false);

                // Clear the success message after 3 seconds
                setTimeout(() => {
                    setMessage("");
                }, 3000);
            } else {
                throw new Error("Profile update failed");
            }
        } catch (err) {
            // Don't show Firebase's technical error messages to users
            setError("Failed to update profile. Please try again later.");
            console.error("Profile update error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full min-h-full flex flex-col">
            <div className="bg-[#202b3b] shadow-lg rounded-lg p-6 max-w-4xl mx-auto w-full">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
                    <div className="flex items-center mb-4 sm:mb-0">
                        <div className="relative">
                            {" "}
                            <div className="w-20 h-20 rounded-full overflow-hidden bg-[#1a2535] flex items-center justify-center">
                                {photoURL && !photoError ? (
                                    <img
                                        src={photoURL}
                                        alt={displayName || "User"}
                                        className="w-full h-full object-cover"
                                        onError={() => setPhotoError(true)}
                                    />
                                ) : (
                                    <FaUser
                                        className="text-gray-400"
                                        size={32}
                                    />
                                )}
                            </div>
                            <button className="absolute bottom-0 right-0 bg-cyan-500 text-white p-1.5 rounded-full">
                                <FaCamera size={14} />
                            </button>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-xl font-semibold text-white">
                                {currentUser?.displayName || "User"}
                            </h2>
                            <p className="text-gray-400 text-sm">
                                {currentUser?.email}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center px-4 py-2 border border-transparent rounded-lg text-sm font-medium text-white bg-red-600/20 hover:bg-red-500/30"
                    >
                        <FaSignOutAlt className="mr-2" />
                        Sign Out
                    </button>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg mb-4 flex items-center">
                        <FaExclamationTriangle className="mr-2" />
                        <span>{error}</span>
                    </div>
                )}

                {message && (
                    <div className="bg-green-500/20 border border-green-500/50 text-green-300 px-4 py-3 rounded-lg mb-4 flex items-center">
                        <FaCheckCircle className="mr-2" />
                        <span>{message}</span>
                    </div>
                )}

                <div className="border-b border-[#243447] mb-6">
                    <div className="flex">
                        <button
                            className={`py-2 px-4 focus:outline-none ${
                                activeTab === "profile"
                                    ? "text-cyan-400 border-b-2 border-cyan-400 font-medium"
                                    : "text-gray-400 hover:text-gray-300"
                            }`}
                            onClick={() => setActiveTab("profile")}
                        >
                            Profile
                        </button>
                        <button
                            className={`py-2 px-4 focus:outline-none ${
                                activeTab === "settings"
                                    ? "text-cyan-400 border-b-2 border-cyan-400 font-medium"
                                    : "text-gray-400 hover:text-gray-300"
                            }`}
                            onClick={() => setActiveTab("settings")}
                        >
                            Weather Settings
                        </button>
                    </div>
                </div>

                {activeTab === "profile" ? (
                    <div>
                        <form
                            onSubmit={handleUpdateProfile}
                            className="space-y-6"
                        >
                            <div>
                                <label
                                    htmlFor="displayName"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                >
                                    Display Name
                                </label>
                                <input
                                    id="displayName"
                                    type="text"
                                    value={displayName}
                                    onChange={(e) =>
                                        setDisplayName(e.target.value)
                                    }
                                    className="block w-full px-3 py-2 border border-[#243447] rounded-lg bg-[#1a2535] text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            </div>{" "}
                            <div>
                                <label
                                    htmlFor="photoURL"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                >
                                    Profile Photo URL
                                </label>
                                <input
                                    id="photoURL"
                                    type="text"
                                    value={photoURL}
                                    onChange={(e) => {
                                        const newUrl = e.target.value;
                                        setPhotoURL(newUrl);
                                        // Reset photo error when URL changes
                                        if (photoError) setPhotoError(false);
                                    }}
                                    className={`block w-full px-3 py-2 border ${
                                        photoError
                                            ? "border-red-500"
                                            : "border-[#243447]"
                                    } rounded-lg bg-[#1a2535] text-gray-100 focus:outline-none focus:ring-2 ${
                                        photoError
                                            ? "focus:ring-red-500"
                                            : "focus:ring-cyan-500"
                                    }`}
                                    placeholder="https://example.com/photo.jpg"
                                />
                                <p className="mt-1 text-xs text-gray-400">
                                    Enter a URL to a publicly accessible
                                    HTTP/HTTPS image
                                    {photoError && (
                                        <span className="block mt-1 text-red-400">
                                            Image failed to load. Please check
                                            the URL.
                                        </span>
                                    )}
                                </p>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex items-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
                                >
                                    <FaSave className="mr-2" />
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <ProfileSettings />
                )}
            </div>
        </div>
    );
};

export default Profile;
