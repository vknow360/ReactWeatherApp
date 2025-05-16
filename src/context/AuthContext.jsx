import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";

// Create authentication context
const AuthContext = createContext();

// Context provider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); // Sign up new users
    const signup = async (email, password, displayName) => {
        let userCredential = null;

        try {
            setError("");
            // Step 1: Create the user account
            userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            // Step 2: Update profile with display name
            try {
                await updateProfile(userCredential.user, {
                    displayName: displayName,
                });
            } catch (profileError) {
                console.error(
                    "Error setting profile during signup:",
                    profileError
                );
                // Continue with the process even if profile update fails
            } // Step 3: Create user document in Firestore (handled separately to prevent blocking auth)
            try {
                // Try to create the user document
                await setDoc(doc(db, "users", userCredential.user.uid), {
                    email,
                    displayName,
                    createdAt: new Date(),
                    settings: {
                        temperatureUnit: "celsius",
                        windSpeedUnit: "kph",
                        defaultLocation: null,
                        notifications: {
                            severe: true,
                            precipitation: false,
                            temperature: false,
                        },
                    },
                });
            } catch (firestoreError) {
                console.error(
                    "Error creating Firestore record during signup:",
                    firestoreError
                );

                // If this is a permissions error, show a more helpful message in the console
                if (firestoreError.code === "permission-denied") {
                    console.warn(
                        "Firestore permission denied. Please check your Firebase security rules. " +
                            "You need to update your Firestore security rules to allow users to read/write their own documents."
                    );
                }

                // Continue with the signup process even if Firestore fails
                // The user is already created in Auth
            }

            return userCredential.user;
        } catch (err) {
            setError(err.message || "Failed to create account");
            throw err;
        }
    };

    // Sign in existing users
    const login = async (email, password) => {
        try {
            setError("");
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            return userCredential.user;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    // Sign out users
    const logout = () => {
        setError("");
        return signOut(auth);
    };

    // Password reset
    const resetPassword = (email) => {
        setError("");
        return sendPasswordResetEmail(auth, email);
    }; // Get user settings
    const getUserSettings = async (uid) => {
        try {
            const userDoc = await getDoc(doc(db, "users", uid));
            if (userDoc.exists()) {
                return userDoc.data().settings;
            } // Return default settings if the document doesn't exist
            return {
                temperatureUnit: "celsius",
                windSpeedUnit: "kph",
                defaultLocation: null,
                notifications: {
                    severe: true,
                    precipitation: false,
                    temperature: false,
                },
            };
        } catch (err) {
            console.error("Error getting user settings:", err);

            // If this is a permissions error, show a more helpful message
            if (err.code === "permission-denied") {
                console.warn(
                    "Firestore permission denied. Please check your Firebase security rules. " +
                        "You need to update your Firestore security rules to allow users to read/write their own documents."
                );
            }

            setError("Could not load settings. Using defaults."); // Return default settings on error
            return {
                temperatureUnit: "celsius",
                windSpeedUnit: "kph",
                defaultLocation: null,
                notifications: {
                    severe: true,
                    precipitation: false,
                    temperature: false,
                },
            };
        }
    }; // Update user settings
    const updateUserSettings = async (uid, settings) => {
        try {
            setError("");

            // First check if the user document exists
            const userDocRef = doc(db, "users", uid);

            try {
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    // Document exists, update just the settings
                    await setDoc(userDocRef, { settings }, { merge: true });
                } else {
                    // Document doesn't exist, create with minimal structure
                    await setDoc(userDocRef, {
                        createdAt: new Date(),
                        settings: settings,
                    });
                }
                return true;
            } catch (firestoreError) {
                // If there's an error accessing Firestore
                console.error("Firestore access error:", firestoreError);

                // If this is a permissions error, show a more helpful message
                if (firestoreError.code === "permission-denied") {
                    console.warn(
                        "Firestore permission denied. Please check your Firebase security rules. " +
                            "You need to update your Firestore security rules to allow users to read/write their own documents."
                    );

                    // Show a user-friendly error
                    setError(
                        "Unable to save settings to the cloud. Your settings will work for this session only."
                    );
                } else {
                    setError(
                        "Could not connect to the database. Settings saved locally only."
                    );
                }

                // Return true anyway so the UI updates as if it succeeded
                // This lets the app continue working even with Firestore permission issues
                return true;
            }
        } catch (err) {
            console.error("Settings update error:", err);
            setError(err.message || "Failed to update settings");
            return false;
        }
    }; // Update profile information
    const updateUserProfile = async (user, data) => {
        try {
            setError("");

            // Create a sanitized copy of the data to update
            const updateData = {};

            // Only include properties that are provided and not empty
            if (data.displayName) updateData.displayName = data.displayName;

            // Check if photoURL is a valid URL before including it
            if (data.photoURL) {
                try {
                    const url = new URL(data.photoURL);
                    // Make sure the URL is using HTTP/HTTPS protocol
                    if (url.protocol === "http:" || url.protocol === "https:") {
                        updateData.photoURL = data.photoURL;
                    } else {
                        throw new Error(
                            "Invalid photo URL protocol. Must use http or https."
                        );
                    }
                } catch (urlError) {
                    // If URL is invalid, don't include it in the update
                    console.error("Invalid photo URL:", urlError);
                    setError(
                        "Invalid photo URL. Please provide a valid web URL."
                    );
                    return false;
                }
            } // Only update profile if there's something to update
            if (Object.keys(updateData).length > 0) {
                try {
                    // First update the Firebase Auth profile
                    await updateProfile(user, updateData);

                    // Now handle Firestore update separately with error handling
                    try {
                        // Check if the user document exists first
                        const userDoc = await getDoc(
                            doc(db, "users", user.uid)
                        );

                        if (userDoc.exists()) {
                            // Only update specific fields in Firestore
                            const firestoreUpdate = {};
                            if (updateData.displayName)
                                firestoreUpdate.displayName =
                                    updateData.displayName;
                            if (updateData.photoURL)
                                firestoreUpdate.photoURL = updateData.photoURL;

                            // Apply the update if there are fields to update
                            if (Object.keys(firestoreUpdate).length > 0) {
                                await setDoc(
                                    doc(db, "users", user.uid),
                                    firestoreUpdate,
                                    { merge: true }
                                );
                            }
                        } else {
                            // User document doesn't exist, create it with minimal data
                            await setDoc(doc(db, "users", user.uid), {
                                displayName:
                                    updateData.displayName ||
                                    user.displayName ||
                                    "",
                                photoURL:
                                    updateData.photoURL || user.photoURL || "",
                                createdAt: new Date(),
                            });
                        }
                    } catch (firestoreError) {
                        console.error(
                            "Firestore update error:",
                            firestoreError
                        );
                        // Don't fail the whole operation if Firestore update fails
                        // The Auth profile was already updated
                    }

                    // Auth update was successful, consider the operation successful
                    return true;
                } catch (authUpdateError) {
                    // Only fail if the Auth update fails
                    throw authUpdateError;
                }
            }

            return true;
        } catch (err) {
            console.error("Profile update error:", err);
            setError(err.message || "Failed to update profile");
            return false;
        }
    };

    // Monitor auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        // Clean up subscription
        return unsubscribe;
    }, []);

    // Context value
    const value = {
        currentUser,
        loading,
        error,
        signup,
        login,
        logout,
        resetPassword,
        updateUserProfile,
        getUserSettings,
        updateUserSettings,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the auth context
export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
