import { useQuery } from "@tanstack/react-query";
import {
	fetchAirQualityMetrics,
	fetchCurrentWeather,
	fetchDailyWeather,
	fetchHourlyAirQuality,
	fetchHourlyWeather,
} from "../lib/weatherApi";

export function useCurrentWeather(latitude?: number, longitude?: number) {
	return useQuery({
		queryKey: ["currentWeather", latitude, longitude],
		queryFn: () => fetchCurrentWeather(latitude!, longitude!),
		enabled: !!latitude && !!longitude,
	});
}

export function useDailyWeather(
	startDate: string,
	endDate: string,
	latitude?: number,
	longitude?: number,
) {
	return useQuery({
		queryKey: ["dailyWeather", latitude, longitude, startDate, endDate],
		queryFn: () =>
			fetchDailyWeather(latitude!, longitude!, startDate, endDate),
		enabled: !!latitude && !!longitude,
	});
}

export function useHourlyWeather(latitude?: number, longitude?: number) {
	return useQuery({
		queryKey: ["hourlyWeather", latitude, longitude],
		queryFn: () => fetchHourlyWeather(latitude!, longitude!),
		enabled: !!latitude && !!longitude,
	});
}

export function useHourlyAirQuality(latitude?: number, longitude?: number) {
	return useQuery({
		queryKey: ["airQuality", latitude, longitude],
		queryFn: () => fetchHourlyAirQuality(latitude!, longitude!),
		enabled: !!latitude && !!longitude,
	});
}

export function useAirQualityMetrics(
	startDate: string,
	endDate: string,
	latitude?: number,
	longitude?: number,
) {
	return useQuery({
		queryKey: [
			"airQualityMetrics",
			latitude,
			longitude,
			startDate,
			endDate,
		],
		queryFn: () =>
			fetchAirQualityMetrics(latitude!, longitude!, startDate, endDate),
		enabled: !!latitude && !!longitude,
	});
}
