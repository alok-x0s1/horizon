import HourlyCharts from "../charts/HourlyChart";
import WeatherHeader from "../layout/WeatherHeader";
import AirQualityMetrics from "../layout/AirQualityMetrics";
import WeatherCards from "../base/WeatherCards";

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
