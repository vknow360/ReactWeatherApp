import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
    FaEnvelope,
    FaExclamationTriangle,
    FaCheckCircle,
} from "react-icons/fa";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email) {
            return setError("Please enter your email address");
        }

        try {
            setMessage("");
            setError("");
            setLoading(true);
            await resetPassword(email);
            setMessage("Check your email for password reset instructions");
        } catch (err) {
            setError(
                "Failed to reset password. Please check if the email is registered."
            );
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md">
                <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-2xl border border-gray-200 p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">
                            Reset Password
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            We'll email you instructions to reset your password
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-700">
                            <FaExclamationTriangle className="flex-shrink-0 mr-3" />
                            <span>{error}</span>
                        </div>
                    )}

                    {message && (
                        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center text-green-700">
                            <FaCheckCircle className="flex-shrink-0 mr-3" />
                            <span>{message}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute left-3 top-3 text-gray-400">
                                    <FaEnvelope />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 transition-all duration-200 shadow-lg shadow-blue-500/20 disabled:opacity-50 font-medium"
                        >
                            {loading ? "Sending..." : "Send Reset Link"}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm text-gray-600">
                            Remember your password?{" "}
                            <Link
                                to="/login"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
