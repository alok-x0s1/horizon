import HourlyCharts from "../charts/HourlyChart";
import WeatherCards from "./WeatherCards";
import WeatherHeader from "../layout/WeatherHeader";
import AirQualityMetrics from "../layout/AirQualityMetrics";

export default function CurrentWeather() {
	return (
		<div className="space-y-8">
			<WeatherHeader />
			<WeatherCards />
			<AirQualityMetrics />
			<HourlyCharts />
		</div>
	);
}
