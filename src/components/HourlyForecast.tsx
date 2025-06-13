import { useState } from "react";
import { useAppSelector } from "../lib/hooks";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import {
  formatDateTime,
  getWeatherIcon,
} from "../lib/utils";

const HourlyForecast = (hourlyDailyData) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const isDark = theme === "dark";
  const dailyData = hourlyDailyData?.hourlyDailyData?.timelines?.daily || [];
  const hourlyData = hourlyDailyData?.hourlyDailyData?.timelines?.hourly || [];

  const [hourlyDataBtn, setHourlyDataBtn] = useState(true);

  return (
    <div
      className={`backdrop-blur-sm border rounded-2xl p-6 transition-colors ${
        isDark
          ? "bg-white/20 border-white/30 text-white"
          : "bg-white/80 border-gray-200 text-gray-800"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Today</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setHourlyDataBtn(true)}
            className={
              hourlyDataBtn
                ? `text-sm rounded-lg px-3 py-1 hover:bg-opacity-80 transition-colors ${
                    isDark
                      ? "bg-white/20 hover:bg-white/30"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                  }`
                : `text-sm hover:opacity-80 transition-colors ${
                    isDark
                      ? "text-white/70 hover:text-white"
                      : "text-gray-600 hover:text-gray-800"
                  }`
            }
          >
            Hourly
          </button>
          <button
            onClick={() => setHourlyDataBtn(false)}
            className={
              !hourlyDataBtn
                ? `text-sm rounded-lg px-3 py-1 hover:bg-opacity-80 transition-colors ${
                    isDark
                      ? "bg-white/20 hover:bg-white/30"
                      : "bg-blue-100 hover:bg-blue-200 text-blue-800"
                  }`
                : `text-sm hover:opacity-80 transition-colors ${
                    isDark
                      ? "text-white/70 hover:text-white"
                      : "text-gray-600 hover:text-gray-800"
                  }`
            }
          >
            Daily
          </button>
        </div>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {(hourlyDataBtn ? hourlyData : dailyData).map((data, index) => {
            const Icon = getWeatherIcon(
              hourlyDataBtn
                ? data?.values?.weatherCode
                : data?.values?.weatherCodeMax
            );
            return (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
                <div
                  className={`backdrop-blur-sm rounded-xl p-4 text-center hover:bg-opacity-80 transition-colors ${
                    isDark
                      ? "bg-white/10 hover:bg-white/20"
                      : "bg-white/60 hover:bg-white/80"
                  }`}
                >
                  <p
                    className={`text-sm mb-3 ${
                      isDark ? "text-white/80" : "text-gray-600"
                    }`}
                  >
                    {hourlyDataBtn
                      ? formatDateTime(data?.time).time
                      : formatDateTime(data?.time).relative}
                  </p>
                  <Icon className="w-6 h-6 mx-auto mb-3" />
                  <p className="font-semibold text-lg">
                    {hourlyDataBtn
                      ? data?.values?.temperature
                      : data?.values?.temperatureAvg}
                    &deg;
                  </p>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious
          className={`${
            isDark
              ? "bg-white/20 border-white/30 hover:bg-white/30"
              : "bg-white/80 border-gray-200 hover:bg-white"
          }`}
        />
        <CarouselNext
          className={`${
            isDark
              ? "bg-white/20 border-white/30 hover:bg-white/30"
              : "bg-white/80 border-gray-200 hover:bg-white"
          }`}
        />
      </Carousel>
    </div>
  );
};

export default HourlyForecast;
