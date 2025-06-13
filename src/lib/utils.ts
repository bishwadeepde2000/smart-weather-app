import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import moment from "moment";
import { weatherCode, weatherIcons } from "./constants";
import { HelpCircle } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// formatDateTime to get date, time, and relative date from an ISO string
interface FormattedDateTime {
  date: string; // e.g., "2023-06-10"
  time: string; // e.g., "14:22"
  relative: string; // e.g., "Today", "Tomorrow", "Yesterday", or "2023-06-07"
}

export function formatDateTime(isoString: string): FormattedDateTime {
  const localMoment = moment.utc(isoString).local();

  const date = localMoment.format("YYYY-MM-DD");
  const time = localMoment.format("hh:mm A");

  const today = moment().startOf("day");
  const diffDays = localMoment.startOf("day").diff(today, "days");

  let relative: string;
  if (diffDays === 0) relative = "Today";
  else if (diffDays === 1) relative = "Tomorrow";
  else if (diffDays === -1) relative = "Yesterday";
  else relative = localMoment.format("dddd"); // e.g., "Monday"

  return { date, time, relative };
}

// getWeatherDescription to get the weather description based on the code
export function getWeatherDescription(code: number): string {
  return weatherCode[code] || "Unknown";
}

// getWeatherIcon to get the weather icon based on the code
export function getWeatherIcon(code: string) {
  if (code) {
    return (
      weatherIcons.find((entry) => entry.code === code.toString())?.icon ||
      HelpCircle
    );
  } else {
    return HelpCircle;
  }
}
