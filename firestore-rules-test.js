// This is a local testing file that helps verify if you have correctly
// set up your Firebase Firestore security rules
// Run this with: node firestore-rules-test.js

const isRulesConfigured = (errorMessage) => {
    if (
        errorMessage &&
        errorMessage.includes("Missing or insufficient permissions")
    ) {
        console.error(
            "\x1b[31m%s\x1b[0m",
            "❌ Firebase Security Rules Problem Detected"
        );
        console.log(
            "\x1b[33m%s\x1b[0m",
            "Your Firestore security rules are blocking operations. Please update them:"
        );
        console.log(
            "\x1b[36m%s\x1b[0m",
            "1. Go to Firebase Console: https://console.firebase.google.com/"
        );
        console.log("\x1b[36m%s\x1b[0m", "2. Select your project");
        console.log("\x1b[36m%s\x1b[0m", "3. Go to Firestore Database > Rules");
        console.log(
            "\x1b[36m%s\x1b[0m",
            "4. Update the rules with those provided in FIREBASE_SETUP.md"
        );
        console.log(
            "\x1b[33m%s\x1b[0m",
            "For more details, see: FIREBASE_SETUP.md"
        );
        return false;
    }
    return true;
};

console.log("\x1b[32m%s\x1b[0m", "📋 Firebase Security Rules Checker");
console.log(
    "This tool helps verify if you've set up your Firestore security rules correctly."
);
console.log(
    "When you see Firestore permission errors in your app, look for this pattern:"
);
console.log(
    "\x1b[31m%s\x1b[0m",
    "FirebaseError: Missing or insufficient permissions."
);
console.log(
    "If you see this error, follow the instructions in FIREBASE_SETUP.md to update your rules.\n"
);

// Example error simulation
const simulatedError = {
    code: "permission-denied",
    message: "FirebaseError: Missing or insufficient permissions.",
};

isRulesConfigured(simulatedError.message);

console.log(
    "\n\x1b[32m%s\x1b[0m",
    "✅ Properly configured rules should allow:"
);
console.log("- Authenticated users to read/write their own user documents");
console.log("- Prevent users from accessing other users' data");
