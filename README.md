# Weather App

A modern, responsive weather application built with React and Vite that provides real-time weather forecasts, hourly predictions, and weather news.

![image](https://github.com/user-attachments/assets/9b62e172-8b39-4e42-9f8d-b64f84d57506)


## Features

-   **Real-time Weather Data**: Get current weather conditions for any location worldwide
-   **7-Day Forecast**: Weekly weather predictions with temperature highs and lows
-   **Hourly Forecast**: Detailed hourly weather information for the current day
-   **Atmospheric Conditions**: View detailed weather metrics like humidity, wind speed, pressure, and UV index
-   **Geolocation Support**: Automatically detects and displays weather for your current location
-   **Location Search**: Search for any city or location globally
-   **Weather News**: Latest weather-related news updates
-   **AI Weather Assistant**: Ask questions about weather conditions and receive intelligent responses
-   **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
-   **Dynamic Weather Animations**: Beautiful Lottie animations that represent current weather conditions

## Technologies Used

-   **React 19**: Modern React with hooks for state management
-   **Vite**: Fast and efficient build tool
-   **Tailwind CSS**: Utility-first CSS framework for responsive design
-   **DotLottie**: Weather animations using Lottie files
-   **Open-Meteo API**: Free weather data API
-   **Gemini AI**: Integration with Google's Gemini AI for the weather assistant
-   **ESLint**: Code linting and formatting
-   **React Icons**: Icon library

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1. Clone the repository

    ```bash
    git clone https://github.com/yourusername/weather-app.git
    cd weather-app
    ```

2. Install dependencies

    ```bash
    npm install
    # or
    yarn
    ```

3. Set up environment variables

    - Create a `.env` file in the root directory
    - Add your Gemini API key: `VITE_GEMINI_API_KEY=your_api_key_here`

4. Start the development server

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
# or
yarn build
```

## Project Structure

```
weather-app/
├── public/            # Static assets
├── src/
│   ├── api/           # API service functions
│   ├── assets/        # Images and static resources
│   ├── components/    # React components
│   ├── context/       # React context for state management
│   ├── screens/       # Screen components
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main App component
│   ├── main.jsx       # Application entry point
│   └── index.css      # Global styles
├── .env               # Environment variables
├── vite.config.js     # Vite configuration
└── package.json       # Project dependencies
```

## Key Components

-   **WeatherCard**: Displays current weather information
-   **TodayForecast**: Shows hourly forecast for the current day
-   **WeeklyForecast**: Displays 7-day weather forecast
-   **Conditions**: Shows detailed atmospheric conditions
-   **WeatherNews**: Displays latest weather news
-   **SearchBar**: Location search functionality
-   **AI Chatbot**: Weather assistant powered by Google's Gemini AI

## API Integration

The app uses the following APIs:

-   **Open-Meteo API**: For weather forecast data
-   **Nominatim API**: For reverse geocoding
-   **RSS2JSON**: For weather news
-   **Google Gemini API**: For AI assistant functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

-   Weather data provided by [Open-Meteo](https://open-meteo.com/)
-   Weather icons from [Meteocons](https://meteocons.com/)
-   News data from [Times of India](https://timesofindia.indiatimes.com/)
