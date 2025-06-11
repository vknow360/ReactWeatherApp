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
    FaBell,
    FaCog,
    FaUserCircle,
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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
            {/* Header Section */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <h1 className="text-2xl font-bold text-gray-900">
                            My Account
                        </h1>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="relative mb-4">
                                    <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50 border-4 border-white shadow-lg">
                                        {photoURL && !photoError ? (
                                            <img
                                                src={photoURL}
                                                alt={displayName || "User"}
                                                className="w-full h-full object-cover"
                                                onError={() =>
                                                    setPhotoError(true)
                                                }
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center">
                                                <FaUserCircle className="w-20 h-20 text-blue-300" />
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        className="absolute bottom-0 right-0 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                                        title="Change profile picture"
                                    >
                                        <FaCamera size={16} />
                                    </button>
                                </div>
                                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                                    {currentUser?.displayName || "User"}
                                </h2>
                                <p className="text-gray-500 text-sm mb-6">
                                    {currentUser?.email}
                                </p>

                                {/* Navigation Tabs */}
                                <nav className="w-full space-y-1">
                                    <button
                                        onClick={() => setActiveTab("profile")}
                                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                            activeTab === "profile"
                                                ? "bg-blue-50 text-blue-700"
                                                : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                    >
                                        <FaUser className="mr-3" />
                                        Profile Information
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("settings")}
                                        className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                            activeTab === "settings"
                                                ? "bg-blue-50 text-blue-700"
                                                : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                    >
                                        <FaCog className="mr-3" />
                                        Weather Settings
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                            {error && (
                                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-700">
                                    <FaExclamationTriangle className="mr-3 flex-shrink-0" />
                                    <p>{error}</p>
                                </div>
                            )}

                            {message && (
                                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-700">
                                    <FaCheckCircle className="mr-3 flex-shrink-0" />
                                    <p>{message}</p>
                                </div>
                            )}

                            {activeTab === "profile" ? (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-6">
                                        Profile Information
                                    </h3>
                                    <form
                                        onSubmit={handleUpdateProfile}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <label
                                                htmlFor="displayName"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Display Name
                                            </label>
                                            <input
                                                id="displayName"
                                                type="text"
                                                value={displayName}
                                                onChange={(e) =>
                                                    setDisplayName(
                                                        e.target.value
                                                    )
                                                }
                                                className="w-full px-4 py-3 rounded-lg border text-black border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                                placeholder="Enter your display name"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="photoURL"
                                                className="block text-sm font-medium text-gray-700 mb-2"
                                            >
                                                Profile Photo URL
                                            </label>
                                            <input
                                                id="photoURL"
                                                type="text"
                                                value={photoURL}
                                                onChange={(e) => {
                                                    const newUrl =
                                                        e.target.value;
                                                    setPhotoURL(newUrl);
                                                    if (photoError)
                                                        setPhotoError(false);
                                                }}
                                                className={`w-full text-black px-4 py-3 rounded-lg border ${
                                                    photoError
                                                        ? "border-red-300"
                                                        : "border-gray-300"
                                                } focus:ring-2 ${
                                                    photoError
                                                        ? "focus:ring-red-500 focus:border-red-500"
                                                        : "focus:ring-blue-500 focus:border-blue-500"
                                                } transition-colors`}
                                                placeholder="https://example.com/photo.jpg"
                                            />
                                            <p className="mt-2 text-sm text-gray-500">
                                                Enter a URL to a publicly
                                                accessible HTTP/HTTPS image
                                                {photoError && (
                                                    <span className="block mt-1 text-red-600">
                                                        Image failed to load.
                                                        Please check the URL.
                                                    </span>
                                                )}
                                            </p>
                                        </div>

                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
                                            >
                                                <FaSave className="mr-2" />
                                                {loading
                                                    ? "Saving..."
                                                    : "Save Changes"}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            ) : (
                                <ProfileSettings />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
