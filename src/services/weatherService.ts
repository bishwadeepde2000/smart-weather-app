import axios from "axios";

const BASE_URL = 'https://api.tomorrow.io/v4/weather';
const OPEN_WEATHER_BASE_URL = 'http://api.openweathermap.org/geo/1.0';
const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const OPEN_WEATHER_API_KEY = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
}

export const fetchWeatherByCity = async (
  city: string
): Promise<WeatherResponse> => {
  const response = await axios.get<WeatherResponse>(`${BASE_URL}/realtime`, {
    params: {
      location: city,
      units: "metric",
      apikey: API_KEY,
    },
  });

  return response?.data;
};

export const fetchHourlyDailyWeather = async (
  city: string
): Promise<WeatherResponse> => {
  const response = await axios.get<WeatherResponse>(`${BASE_URL}/forecast`, {
    params: {
      location: city,
      units: "metric",
      apikey: API_KEY,
    },
  });

  return response?.data;
};

// Fetch City name by latitude and longitude
export const fetchLocation = async (lat: string, lon: string) => {
  const response = await axios.get(`${OPEN_WEATHER_BASE_URL}/reverse`, {
    params: {
      lat: lat,
      lon: lon,
      limit: "1",
      apikey: OPEN_WEATHER_API_KEY,
    },
  });
  return response?.data;
};
