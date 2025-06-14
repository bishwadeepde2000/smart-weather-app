# 🌦️ React Weather App

A sleek and modern weather forecast application built with **React**, **TypeScript**, **Redux Toolkit**, **Tomorrow.io API**, and the **LocationIQ API**. It allows users to search weather by city or use their current location. Supports real-time weather metrics, loading states, icons, and timezone-adjusted forecasts.

---

## 📸 Preview

Light & Dark Mode included. Supports mobile and desktop responsiveness.

---

## 🚀 Features

- 🔍 **Search Weather by City**
- 📍 **Get Weather by Current Location**
- ⏳ **Loading Indicators**
- 🌤️ **Current Weather Metrics** (Feels like, Wind, Humidity, UV, etc.)
- 🧭 **Weather Condition Icons**
- 🌍 **Timezone & Date Formatting with Moment.js**
- 🔁 **Redux Toolkit for State Management**
- 💡 **Environment Variables for API Keys**
- 💻 **TypeScript for Type Safety**
- 🌗 **Dark & Light Theme Design**

---

## 📁 Project Structure

```
├── public/
├── src/
│   ├── assets/         # Icons and images
│   ├── components/     # Reusable UI components
│   ├── features/
│   │   └── weather/    # Redux slice and related logic
│   ├── services/       # API service handlers
│   ├── utils/          # Utilities like formatDateTime
│   ├── App.tsx
│   └── index.tsx
├── .env
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/react-weather-app.git
cd react-weather-app
```

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Add Your API Key

Create a `.env` file in the root directory and add:

```env
REACT_APP_WEATHER_API_KEY=your_tomorrow_io_api_key
REACT_APP_LOCATION_IQ_API_KEY=your_location-iq_api_key
```

### 4. Start the Development Server

```bash
npm start
```

The app will run on `http://localhost:3000`.

---

## 🌍 APIs Used

- 🌤️ **[LocationIQ API](https://locationiq.com/demo#reverse)** — Reverse Geocoding
- 🌤️ **[Tomorrow.io API](https://openweathermap.org/api)** — Weather
- 📍 `navigator.geolocation` — Get user’s current coordinates
- 🕓 **moment.js** — For time formatting and relative labels ("Today", "Tomorrow")

---

## 🔐 Environment Variables

| Key                             | Description              |
|---------------------------------|--------------------------|
| `REACT_APP_WEATHER_API_KEY`     | Your tomorrow.io API Key |
| `REACT_APP_LOCATION_IQ_API_KEY` | Your locationIQ API Key  |

---

## 🛠 Technologies Used

- React + Vite
- TypeScript
- Redux Toolkit
- Moment.js
- Lucide-react Icons
- Tomorrow.io API
- LocationIQ
- CSS Modules / SCSS (or basic CSS if used)

---

## 📦 Build for Production

```bash
npm run build
```

Deploy the generated `dist/` folder to Vercel, Netlify, or your own host.

---

## 💡 Troubleshooting

- **CORS Errors in Production:** Use a CORS-friendly service like [LocationIQ](https://locationiq.com/).
- **API Key Not Working:** Ensure `.env` is correct and restart the dev server.

---

## 🙌 Credits

- [Tomorrow.io](https://app.tomorrow.io/)
- [LocationIQ](https://locationiq.com/)
- [Lucide Icons](https://lucide.dev/)
- [Moment.js](https://momentjs.com/)

---

## 📃 License

MIT License — free to use, modify, and distribute.

---
