# ⛅ WeatherCast

A sleek and modern weather application offering real-time forecasts, personalized alerts, and weather insights with an elegant light theme design.

![WeatherCast Dashboard](https://github.com/user-attachments/assets/648464d9-0d52-4887-9589-3d5e76f6f9f4)

[Live Demo](https://weathercast-demo.web.app) | [Documentation](./docs) | [Report Bug](https://github.com/yourusername/weathercast/issues)

## ✨ Key Features

### 🌤️ Weather Information

-   **Real-time Weather Data**: Live conditions with beautiful visualizations
-   **7-Day Forecast**: Comprehensive weekly weather outlook
-   **Hourly Updates**: Detailed hour-by-hour predictions
-   **Atmospheric Details**: Track humidity, wind, pressure, and UV index
-   **Dynamic Animations**: Elegant Lottie animations for weather conditions

### 👤 User Experience

-   **Modern Light Theme**: Clean, intuitive interface design
-   **Smart Geolocation**: Instant local weather detection
-   **Global Search**: Find weather for any location worldwide
-   **Responsive Design**: Optimized for all devices and screen sizes
-   **Customizable Units**: Choose your preferred measurement units

### 🔔 Smart Features

-   **Weather Alerts**: Real-time notifications for severe weather
-   **News Feed**: Latest weather-related news and updates
-   **AI Assistant**: Intelligent weather insights powered by Gemini AI
-   **Location Favorites**: Save and track multiple locations
-   **Detailed Analytics**: Weather trends and patterns

### 🛡️ User Account

-   **Secure Authentication**: Easy email/password signup and login
-   **Profile Customization**: Personalize your display name and photo
-   **Preference Sync**: Cross-device settings synchronization
-   **Alert Settings**: Customize your notification preferences

## Authentication and User Settings

To set up the authentication and user settings features:

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Authentication in your Firebase project and set up Email/Password as a sign-in method
3. Create a Firestore database for storing user data
4. Update the Firebase configuration in `src/firebase/config.js` with your project's credentials
5. **Important**: Update your Firestore security rules to allow authenticated users to access their data
    - See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for detailed instructions on configuring security rules
6. For details about user settings implementation and usage, see [USER_SETTINGS_GUIDE.md](./USER_SETTINGS_GUIDE.md)

> **Note**: If you see errors like "Missing or insufficient permissions" when using authentication features, you need to update your Firestore security rules as explained in the Firebase setup guide.

## 🛠️ Technology Stack

### Frontend

-   **React 19**: Modern component architecture with hooks
-   **Vite**: Lightning-fast build tooling
-   **Tailwind CSS**: Utility-first styling with light theme
-   **DotLottie**: Smooth weather animations
-   **React Icons**: Comprehensive icon library

### Backend Services

-   **Firebase Auth**: Secure user authentication
-   **Firestore**: Real-time data storage
-   **Open-Meteo API**: Reliable weather data
-   **Gemini AI**: Smart weather insights
-   **RSS2JSON**: Weather news integration

### Development Tools

-   **ESLint**: Code quality enforcement
-   **Prettier**: Consistent code formatting
-   **Git**: Version control
-   **Jest**: Unit testing
-   **Cypress**: End-to-end testing

## 🚀 Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   Firebase account for authentication

### Quick Start

1. **Clone the repository**

    ```cmd
    git clone https://github.com/yourusername/weathercast.git
    cd weathercast
    ```

2. **Install dependencies**

    ```cmd
    npm install
    ```

3. **Configure environment variables**
   Create a `.env` file in the root directory:

    ```env
    VITE_FIREBASE_API_KEY=your_firebase_api_key
    VITE_GEMINI_API_KEY=your_gemini_api_key
    ```

4. **Start development server**
    ```cmd
    npm run dev
    ```

The app will be available at [http://localhost:5173](http://localhost:5173)

### Production Build

```cmd
npm run build
npm run preview
```

## 📁 Project Structure

```
weathercast/
├── src/
│   ├── components/    # Reusable UI components
│   │   ├── about/     # About page components
│   │   ├── alerts/    # Alert system components
│   │   ├── auth/      # Authentication components
│   │   ├── home/      # Main weather components
│   │   └── profile/   # User profile components
│   ├── screens/       # Main application screens
│   ├── context/       # React Context providers
│   ├── firebase/      # Firebase configuration
│   ├── services/      # Business logic services
│   ├── api/          # API integrations
│   ├── utils/        # Helper functions
│   └── assets/       # Static resources
├── public/           # Static assets
└── config/          # Configuration files
```

## 📱 Screen Components

-   **Home**: Main dashboard with current weather
    -   WeatherCard: Current conditions display
    -   TodayForecast: Hourly predictions
    -   WeeklyForecast: 7-day outlook
    -   Conditions: Detailed metrics
-   **Alerts**: Weather alerts and notifications
-   **News**: Weather-related news articles
-   **Profile**: User settings and preferences
    -   Account settings
    -   Weather preferences
    -   Notification settings
-   **About**: Application information

## API Integration

The app uses the following APIs:

-   **Open-Meteo API**: For weather forecast data
-   **Nominatim API**: For reverse geocoding
-   **RSS2JSON**: For weather news
-   **Google Gemini API**: For AI assistant functionality

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

-   Weather data: [Open-Meteo](https://open-meteo.com/)
-   Icons: [Hero Icons](https://heroicons.com/)
-   UI Components: [Tailwind CSS](https://tailwindcss.com/)
