import { useAppSelector } from "../lib/hooks";
import {
  formatDateTime,
  getWeatherDescription,
  getWeatherIcon,
} from "../lib/utils";
import type { RootState } from "../store/store";

export interface DailyDataItem {
  time: string;
  values: {
    weatherCodeMax: number;
    temperatureMax: number;
    temperatureMin: number;
  };
}

export interface DailyForecastProps {
  hourlyDailyData: {
    timelines?: {
      daily?: DailyDataItem[];
    };
  };
}

const DailyForecast = ({ hourlyDailyData }: DailyForecastProps) => {
  const theme = useAppSelector((state: RootState) => state.theme.theme);
  const isDark = theme === "dark";
  const dailyData = hourlyDailyData?.timelines?.daily || [];

  return (
    <div
      className={`backdrop-blur-sm border rounded-2xl p-6 transition-colors ${
        isDark
          ? "bg-white/20 border-white/30 text-white"
          : "bg-white/80 border-gray-200 text-gray-800"
      }`}
    >
      <h3 className="text-lg font-semibold mb-6">6-Day Forecast</h3>

      <div className="space-y-3">
        {dailyData.map((data, index) => {
          const Icon = getWeatherIcon(data?.values?.weatherCodeMax.toString());
          return (
            <div
              key={index}
              className={`flex items-center justify-between py-3 hover:bg-opacity-60 rounded-lg px-3 transition-colors ${
                isDark ? "hover:bg-white/10" : "hover:bg-gray-100/60"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <Icon
                  className={`w-5 h-5 ${
                    isDark ? "text-white/80" : "text-gray-600"
                  }`}
                />
                <span className="font-medium min-w-[80px]">
                  {formatDateTime(data?.time).relative}
                </span>
                <span
                  className={`text-sm flex-1 ${
                    isDark ? "text-white/70" : "text-gray-600"
                  }`}
                >
                  {getWeatherDescription(data?.values?.weatherCodeMax)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {data?.values?.temperatureMax}&deg;
                </span>
                <span className={isDark ? "text-white/60" : "text-gray-500"}>
                  {data?.values?.temperatureMin}&deg;
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyForecast;
