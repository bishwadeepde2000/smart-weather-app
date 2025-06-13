import { useAppSelector } from "../lib/hooks";
import { metrics } from "../lib/constants";

const WeatherMetrics = (data) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const isDark = theme === "dark";

  const weatherValues = data?.data?.data?.values || {};
  const formattedMetrics = getFormattedWeatherMetrics(weatherValues);

  // Function to format weather metrics
  function getFormattedWeatherMetrics(weatherValues: object) {
    return metrics.map((metric) => {
      const rawValue = weatherValues[metric.value];
      const formattedValue =
        rawValue !== undefined
          ? metric.value === "temperatureApparent"
            ? `${rawValue}°` // add degree symbol directly to value
            : rawValue
          : "--";

      return {
        icon: metric.icon,
        label: metric.label,
        value: formattedValue,
        unit: metric.unit,
      };
    });
  }

  return (
    <div
      className={`backdrop-blur-sm border rounded-2xl p-6 transition-colors ${
        isDark
          ? "bg-white/20 border-white/30 text-white"
          : "bg-white/80 border-gray-200 text-gray-800"
      }`}
    >
      <h3 className="text-lg font-semibold mb-6">Today's Highlights</h3>

      <div className="grid grid-cols-2 gap-4">
        {formattedMetrics.map((metric, index) => (
          <div
            key={index}
            className={`backdrop-blur-sm rounded-xl p-4 hover:bg-opacity-80 transition-colors ${
              isDark
                ? "bg-white/10 hover:bg-white/20"
                : "bg-white/60 hover:bg-white/80"
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <metric.icon
                className={`w-4 h-4 ${
                  isDark ? "text-white/70" : "text-gray-600"
                }`}
              />
              <span
                className={`text-sm ${
                  isDark ? "text-white/70" : "text-gray-600"
                }`}
              >
                {metric.label}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold">{metric.value}</span>
              <span
                className={`text-sm ${
                  isDark ? "text-white/70" : "text-gray-600"
                }`}
              >
                {metric.unit}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherMetrics;
