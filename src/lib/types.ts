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

// export interface DailyData {
// 	time: string[];
// 	temperatureMax: number[];
// 	temperatureMin: number[];
// 	temperature2mMax: number[];
// 	temperature2mMin: number[];
// 	precipitation: number[];
// 	weatherCode: number[];
// 	windSpeed10mMax: number[];
// 	windDirection10mDominant: number[];
// 	sunrise: string[];
// 	sunset: string[];
// }

// export interface AirQualityData {
// 	time: string[];
// 	pm10: number[];
// 	pm2_5: number[];
// 	carbon_dioxide: number[];
// 	carbon_monoxide: number[];
// 	nitrogen_dioxide: number[];
// 	sulphur_dioxide: number[];
// 	uv_index: number[];
// }
