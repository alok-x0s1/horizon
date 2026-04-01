import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DailyWeatherData, HourlyData } from "./types";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const colors = {
	purpleLight: "#A8A5FF",
	purpleDark: "#7C7AB6",
	white: "#ffffff",
	azure: "#A5EEFF",
	red: "#FFA5A5",
	lime: "#C0FFA5",
	green: "#6DAB9C",
	green2: "#96C583",
	blue: "#A5C4FF",
	grayAxis: "#636363",

	purple: "#8B5CF6",
	greenBold: "#10B981",
	orange: "#F59E0B",
	redBold: "#EF4444",
	blueBold: "#3B82F6",
	brown: "#8B5A2B",
	pink: "#EC4899",
	gray: "#6B7280",
};

export const convertTemp = (temp: number, isCelsius: boolean) => {
	if (!isCelsius) {
		return ((temp * 9) / 5 + 32).toFixed(1);
	}
	return temp.toFixed(1);
};

export const getAQIStatus = (pm25: number) => {
	if (pm25 <= 12) return { level: "Good", color: "text-green-400" };
	if (pm25 <= 35.4) return { level: "Moderate", color: "text-yellow-400" };
	if (pm25 <= 55.4)
		return { level: "Unhealthy (Sensitive)", color: "text-orange-400" };
	if (pm25 <= 150.4) return { level: "Unhealthy", color: "text-red-400" };
	return { level: "Very Unhealthy", color: "text-purple-600" };
};

export function normalizeDailyData(daily: {
	time?: string[];
	temperature_2m_max?: number[];
	temperature_2m_min?: number[];
	uv_index_max?: number[];
	sunrise?: string[];
	sunset?: string[];
	wind_speed_10m_max?: number[];
	precipitation_probability_max?: number[];
	weather_code?: number[];
	weather_code_max?: number[];
}): DailyWeatherData {
	return {
		time: daily.time?.[0] ?? "",
		temperature_2m_max: daily.temperature_2m_max?.[0] ?? 0,
		temperature_2m_min: daily.temperature_2m_min?.[0] ?? 0,
		uv_index_max: daily.uv_index_max?.[0] ?? 0,
		sunrise: daily.sunrise?.[0] ?? "",
		sunset: daily.sunset?.[0] ?? "",
		wind_speed_10m_max: daily.wind_speed_10m_max?.[0] ?? 0,
		precipitation_probability_max:
			daily.precipitation_probability_max?.[0] ?? 0,
		weather_code: daily.weather_code?.[0] ?? 0,
		weather_code_max: daily.weather_code_max?.[0] ?? 0,
	};
}
export const formatTime = (time: string) =>
	new Date(time).toLocaleTimeString("en-IN", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
	});

export const formatDate = (date: Date) => format(date, "yyyy-MM-dd");

export function groupByDay(hourly: HourlyData): {
	dates: string[];
	pm25: number[];
	pm10: number[];
} {
	const map: Record<string, { pm25: number[]; pm10: number[] }> = {};

	hourly.time.forEach((time: string, i: number) => {
		const date = time.split("T")[0];

		if (!map[date]) {
			map[date] = { pm25: [], pm10: [] };
		}

		map[date].pm25.push(hourly.pm2_5[i]);
		map[date].pm10.push(hourly.pm10[i]);
	});

	const dates: string[] = [];
	const pm25: number[] = [];
	const pm10: number[] = [];

	Object.entries(map).forEach(([date, values]) => {
		dates.push(
			new Date(date).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			}),
		);

		const avg = (arr: number[]) =>
			Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);

		pm25.push(avg(values.pm25));
		pm10.push(avg(values.pm10));
	});

	return { dates, pm25, pm10 };
}
