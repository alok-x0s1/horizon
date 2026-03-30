import type {
	AirQualityMetrics,
	CurrentWeatherData,
	DailyWeatherData,
	HourlyData,
} from "./types";
import { normalizeDailyData } from "./utils";

const BASE_URL = "https://api.open-meteo.com/v1";
const BASE_AIR_QUALITY_URL = "https://air-quality-api.open-meteo.com/v1";
const BASE_HISTORICAL_WEATHER =
	"https://historical-forecast-api.open-meteo.com/v1";

export async function fetchCurrentWeather(
	latitude: number,
	longitude: number,
): Promise<CurrentWeatherData> {
	try {
		const response = await fetch(
			`${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m,precipitation,visibility&timezone=auto`,
		);
		const data = await response.json();
		if (!response.ok) {
			throw new Error(
				data?.reason || "Failed to fetch current weather data",
			);
		}
		return data.current;
	} catch (error) {
		console.error("Error fetching current weather:", error);
		throw error;
	}
}

export async function fetchDailyWeather(
	latitude: number,
	longitude: number,
	startDate: string,
	endDate: string,
): Promise<DailyWeatherData> {
	try {
		const response = await fetch(
			`${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,uv_index_max,sunset,sunrise,wind_speed_10m_max,precipitation_probability_max&timezone=auto&start_date=${startDate}&end_date=${endDate}`,
		);
		const data = await response.json();
		if (!response.ok) {
			throw new Error(
				data?.reason || "Failed to fetch daily weather data",
			);
		}
		return normalizeDailyData(data.daily);
	} catch (error) {
		console.error("Error fetching daily weather:", error);
		throw error;
	}
}

export async function fetchHourlyWeather(
	latitude: number,
	longitude: number,
	start_date: string,
	end_date: string,
): Promise<HourlyData> {
	try {
		const response = await fetch(
			`${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,precipitation,relative_humidity_2m,weather_code,visibility,wind_speed_10m&timezone=auto&start_date=${start_date}&end_date=${end_date}`,
		);
		const data = await response.json();
		if (!response.ok) {
			throw new Error(
				data?.reason || "Failed to fetch hourly weather data",
			);
		}
		return data.hourly;
	} catch (error) {
		console.error("Error fetching hourly weather:", error);
		throw error;
	}
}

export async function fetchHourlyAirQuality(
	latitude: number,
	longitude: number,
	start_date: string,
	end_date: string,
): Promise<HourlyData> {
	try {
		const response = await fetch(
			`${BASE_AIR_QUALITY_URL}/air-quality?latitude=${latitude}&longitude=${longitude}&hourly=pm10,pm2_5&timezone=auto&start_date=${start_date}&end_date=${end_date}`,
		);
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data?.reason || "Failed to fetch air quality data");
		}
		return data.hourly;
	} catch (error) {
		console.error("Error fetching air quality:", error);
		throw error;
	}
}

export async function fetchAirQualityMetrics(
	latitude: number,
	longitude: number,
	start_date: string,
	end_date: string,
): Promise<AirQualityMetrics> {
	try {
		const response = await fetch(
			`${BASE_AIR_QUALITY_URL}/air-quality?latitude=${latitude}&longitude=${longitude}&current=pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone,us_aqi&start_date=${start_date}&end_date=${end_date}&timezone=auto`,
		);
		const data = await response.json();
		if (!response.ok) {
			throw new Error(
				data?.reason || "Failed to fetch air quality metrics",
			);
		}
		return data.current;
	} catch (error) {
		console.error("Error fetching air quality:", error);
		throw error;
	}
}

export async function fetchHistoricalWeather(
	latitude: number,
	longitude: number,
	startDate: string,
	endDate: string,
) {
	try {
		const response = await fetch(
			`${BASE_HISTORICAL_WEATHER}/forecast?latitude=${latitude}&longitude=${longitude}&start_date=${startDate}&end_date=${endDate}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,temperature_2m_mean,winddirection_10m_dominant,precipitation_sum,wind_speed_10m_max`,
		);
		const data = await response.json();
		if (!response.ok) {
			throw new Error(
				data?.reason || "Failed to fetch historical weather data",
			);
		}
		return data.daily;
	} catch (error) {
		console.error("Error fetching historical air quality:", error);
		throw error;
	}
}

export function getWeatherDescription(code: number): string {
	const weatherCodes: { [key: number]: string } = {
		0: "Clear Sky",
		1: "Mainly Clear",
		2: "Partly Cloudy",
		3: "Overcast",
		45: "Foggy",
		48: "Depositing Rime Fog",
		51: "Light Drizzle",
		53: "Moderate Drizzle",
		55: "Dense Drizzle",
		61: "Slight Rain",
		63: "Moderate Rain",
		65: "Heavy Rain",
		71: "Slight Snow",
		73: "Moderate Snow",
		75: "Heavy Snow",
		77: "Snow Grains",
		80: "Slight Rain Showers",
		81: "Moderate Rain Showers",
		82: "Violent Rain Showers",
		85: "Slight Snow Showers",
		86: "Heavy Snow Showers",
		95: "Thunderstorm",
		96: "Thunderstorm with Hail",
		99: "Thunderstorm with Heavy Hail",
	};

	return weatherCodes[code] || "Unknown";
}

export function getAQILevel(aqi: number): { level: string; color: string } {
	if (aqi <= 50) {
		return { level: "Good", color: "#10b981" };
	} else if (aqi <= 100) {
		return { level: "Fair", color: "#f59e0b" };
	} else if (aqi <= 150) {
		return { level: "Moderate", color: "#ef4444" };
	} else if (aqi <= 200) {
		return { level: "Poor", color: "#8b5cf6" };
	} else {
		return { level: "Very Poor", color: "#7c2d12" };
	}
}
