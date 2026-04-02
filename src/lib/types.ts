export interface CurrentWeatherData {
	time: string;
	interval: number;
	temperature_2m: number;
	weather_code: number;
	wind_speed_10m: number;
	relative_humidity_2m: number;
	precipitation: number;
	visibility: number;
}

export interface DailyWeatherData {
	precipitation_probability_max: number;
	sunrise: string;
	sunset: string;
	temperature_2m_min: number;
	temperature_2m_max: number;
	time: string;
	uv_index_max: number;
	weather_code: number;
	wind_speed_10m_max: number;
	weather_code_max: number;
}

export type WeatherData = CurrentWeatherData & DailyWeatherData;

export interface AirQualityMetrics {
	time: string;
	interval: number;
	pm10: number;
	pm2_5: number;
	carbon_monoxide: number;
	nitrogen_dioxide: number;
	sulphur_dioxide: number;
	ozone: number;
	us_aqi: number;
}

export interface HourlyData {
	precipitation: number[];
	time: string[];
	temperature_2m: number[];
	relative_humidity_2m: number[];
	visibility: number[];
	weather_code: number[];
	wind_speed_10m: number[];
	pm10: number[];
	pm2_5: number[];
}

export interface HistoricalData {
	precipitation_sum: number[];
	sunrise: string[];
	sunset: string[];
	time: string[];
	temperature_2m_mean: number[];
	temperature_2m_max: number[];
	temperature_2m_min: number[];
	wind_speed_10m_max: number[];
	winddirection_10m_dominant: number[];
	pm10: number[];
	pm2_5: number[];
}

export type Theme = "dark" | "light" | "system";
