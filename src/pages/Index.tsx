import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThermometerSnowflake, Search, MapPin, Sun, Moon } from "lucide-react";
import WeatherCard from "../components/WeatherCard";
import HourlyForecast from "../components/HourlyForecast";
import DailyForecast from "../components/DailyForecast";
import WeatherMetrics from "../components/WeatherMetrics";
import Loader from "../components/Loader";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "../components/ui/alert-dialog";
import { useAppSelector } from "../lib/hooks";
import { toggleTheme } from "../store/theme/themeSlice";
import { clearState } from "../store/weather/weatherSlice";
import { clearState as locClearState } from "../store/location/locationSlice";
import { getLocation } from "../store/location/locationSlice";
import {
  getWeather,
  getHourlyDailyWeather,
} from "../store/weather/weatherSlice";
import type { RootState } from "../store/store";
import type { AppDispatch } from "../store/store";

const Index = () => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useAppSelector((state:RootState) => state.theme.theme);
  const { data, hourlyDailyData, loading, error, hourlyDailyError } =
    useAppSelector((state: RootState) => state.weather);
  const { locLoading } = useSelector((state:RootState) => state.location);
  const isDark = theme === "dark";
  const [city, setCity] = useState("");
  const [locError, setLocError] = useState<string>("");

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCity(event.target.value);
  };

  const handleLocationChange = () => {
    setCity("");
    if (!navigator.geolocation) {
      setLocError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude.toString();
        const longitude = position.coords.longitude.toString();
        dispatch(getLocation({ lat: latitude, lon: longitude }));
        dispatch(getWeather(`${latitude},${longitude}`));
        dispatch(getHourlyDailyWeather(`${latitude},${longitude}`));
      },
      (err) => {
        setLocError("Failed to retrieve location. " + err.message);
      }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && city.trim() !== "") {
      dispatch(getWeather(city.toLowerCase()));
      dispatch(getHourlyDailyWeather(city.toLowerCase()));
    }
  };

  useEffect(() => {
    handleLocationChange();
    // Check if city is already set in localStorage
    if (city) {
      dispatch(getWeather(city));
      dispatch(getHourlyDailyWeather(city));
    }

    return () => {
      // Clear state on unmount
      dispatch(clearState());
      dispatch(locClearState());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Error Dialogs */}
      {(locError || hourlyDailyError || error) && (
        <AlertDialog open={true} onOpenChange={() => {}}>
          <AlertDialogTrigger asChild>
            <button className="hidden" />
          </AlertDialogTrigger>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader>
                <h2 className="text-lg font-semibold">Error</h2>
                <p className="text-sm text-gray-500">
                  {locError || error || hourlyDailyError}
                </p>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <button
                  className="btn btn-primary"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
      {loading || locLoading ? (
        <Loader />
      ) : (
        <div
          className={`min-h-screen p-4 transition-all duration-300 ${
            isDark
              ? "bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600"
              : "bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200"
          }`}
        >
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <header
              className={`flex items-center justify-between mb-8 ${
                isDark ? "text-white" : "text-gray-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <ThermometerSnowflake className="w-6 h-6" />
                <h1 className="text-xl font-semibold">Smart Weather</h1>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search city or airport..."
                    value={city}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    className={`border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 w-64 transition-colors ${
                      isDark
                        ? "bg-white/20 backdrop-blur-sm border-white/30 text-white placeholder-white/70 focus:ring-white/50"
                        : "bg-white/80 backdrop-blur-sm border-gray-300 text-gray-800 placeholder-gray-500 focus:ring-blue-400"
                    }`}
                  />
                  <Search
                    className={`w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${
                      isDark ? "text-white/70" : "text-gray-500"
                    }`}
                  />
                </div>
                <button
                  onClick={handleLocationChange}
                  className={`border rounded-lg p-2 hover:bg-opacity-80 transition-colors ${
                    isDark
                      ? "bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
                      : "bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-white"
                  }`}
                >
                  <MapPin className="w-5 h-5" />
                </button>
                <button
                  onClick={handleToggleTheme}
                  className={`border rounded-lg p-2 hover:bg-opacity-80 transition-colors ${
                    isDark
                      ? "bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30"
                      : "bg-white/80 backdrop-blur-sm border-gray-300 hover:bg-white"
                  }`}
                >
                  {isDark ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </header>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Main Weather */}
              <div className="lg:col-span-2 space-y-6">
                <WeatherCard data={data} />
                <HourlyForecast hourlyDailyData={hourlyDailyData} />
              </div>

              {/* Right Column - Additional Info */}
              <div className="space-y-6">
                <WeatherMetrics data={data} />
                <DailyForecast hourlyDailyData={hourlyDailyData} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Index;
