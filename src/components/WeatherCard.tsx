import { Wind, Droplets } from "lucide-react";
import { useAppSelector } from "../lib/hooks";
import {
  formatDateTime,
  getWeatherDescription,
  getWeatherIcon,
} from "../lib/utils";

const WeatherCard = (data) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const locData = useAppSelector((state) => state.location);

  const isDark = theme === "dark";

  const locationName = locData?.locData?.[0]?.name || "";
  const locationState = locData?.locData?.[0]?.state || "";
  const locationCountry = locData?.locData?.[0]?.country || "";
  const weatherLocation = data?.data?.location?.name || `${locationName}, ${locationState}, ${locationCountry}` || "Unknown Location";
  const weatherTime = formatDateTime(data?.data?.data?.time) || "";
  const weatherValues = data?.data?.data?.values || {};
  const Icon = getWeatherIcon(weatherValues?.weatherCode);

  return (
    <div
      className={`backdrop-blur-sm border rounded-2xl p-8 transition-colors ${
        isDark
          ? "bg-white/20 border-white/30 text-white"
          : "bg-white/80 border-gray-200 text-gray-800"
      }`}
    >
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-2xl font-semibold">{weatherLocation}</h2>
          </div>
          <p className={isDark ? "text-white/80" : "text-gray-600"}>
            {weatherTime.relative} • {weatherTime.time}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Temperature Display */}
        <div>
          <div className="flex items-start gap-2 mb-4">
            <span className="text-7xl font-light">
              {weatherValues?.temperature}&deg;
            </span>
            <span className="text-2xl mt-2">C</span>
          </div>
          <div className="space-y-2">
            <p className="text-lg">
              {getWeatherDescription(weatherValues?.weatherCode)}
            </p>

            <p className={isDark ? "text-white/80" : "text-gray-600"}>
              Feels like {weatherValues?.temperatureApparent}&deg;
            </p>
          </div>
        </div>

        {/* Weather Icon and Stats */}
        <div className="space-y-6">
          <div className="flex justify-center">
            <div
              className={`backdrop-blur-sm rounded-full p-8 ${
                isDark ? "bg-white/20" : "bg-gray-100/80"
              }`}
            >
              <Icon className="w-16 h-16" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div
              className={`backdrop-blur-sm rounded-lg p-3 text-center ${
                isDark ? "bg-white/10" : "bg-white/60"
              }`}
            >
              <Wind className="w-5 h-5 mx-auto mb-1" />
              <p
                className={`text-sm ${
                  isDark ? "text-white/80" : "text-gray-600"
                }`}
              >
                Wind
              </p>
              <p className="font-semibold">{weatherValues?.windSpeed} km/h</p>
            </div>
            <div
              className={`backdrop-blur-sm rounded-lg p-3 text-center ${
                isDark ? "bg-white/10" : "bg-white/60"
              }`}
            >
              <Droplets className="w-5 h-5 mx-auto mb-1" />
              <p
                className={`text-sm ${
                  isDark ? "text-white/80" : "text-gray-600"
                }`}
              >
                Humidity
              </p>
              <p className="font-semibold">{weatherValues?.humidity}&#xFF05;</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
