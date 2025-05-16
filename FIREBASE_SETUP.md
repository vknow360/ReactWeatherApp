# Firebase Setup Guide for Weather App

This guide will help you set up Firebase for the Weather App, focusing on Firestore security rules.

## Firestore Security Rules

By default, Firestore databases have strict security rules that don't allow any reads or writes. You need to update your security rules in the Firebase console to allow authenticated users to read and write to their own documents.

### Steps to Update Firestore Security Rules:

1. Go to the Firebase Console: https://console.firebase.google.com/
2. Select your project (reactweatherapp-a7290)
3. In the left menu, click on "Firestore Database"
4. Select the "Rules" tab
5. Replace the current rules with the following:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read and write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Default deny
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

These rules will:

1. Allow authenticated users to read and write their own user documents
2. Deny access to all other documents by default

## Temporary Development Rules (Not for Production)

If you want a temporary solution to test your app while developing, you can use these less restrictive rules:

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

**⚠️ Warning**: These temporary rules allow any authenticated user to read and write any document, which is useful for testing but not secure for production.

## Troubleshooting Firebase Permissions

If you see errors like `FirebaseError: Missing or insufficient permissions`, it means your security rules are blocking the operation. Check that:

1. The user is authenticated before trying to access Firestore
2. Your security rules allow the specific operation being attempted
3. The user is only trying to access their own data (matching their user ID)

## Firebase Authentication

Authentication is already set up in the app. Users can:

-   Sign up with email and password
-   Log in with existing credentials
-   Reset their password if forgotten
-   Update their profile information

## Firebase Configuration

The Firebase configuration is located in `src/firebase/config.js`. This file contains the connection details for your Firebase project.
