import { useGeolocation } from "../../hooks/useGeolocation";
import {
	useHourlyAirQuality,
	useHourlyWeather,
} from "../../hooks/useWeatherQueries";
import { colors } from "../../lib/utils";
import { useWeatherStore } from "../../store/useWeatherStore";
import { ErrorState } from "../layout/Error";
import { ChartSkeleton } from "../skeleton/ChartSkeleton";
import { Card } from "../ui/card";
import HighchartsWrapper from "./HighChartsWrapper";

export default function HourlyCharts() {
	const { isCelsius } = useWeatherStore();
	const { coordinates, loading: geoLoading } = useGeolocation();
	const tempUnit = isCelsius ? "°C" : "°F";

	const {
		data: hourlyWeatherData,
		isLoading: weatherLoading,
		error: weatherError,
		refetch: refetchWeather,
	} = useHourlyWeather(coordinates?.latitude, coordinates?.longitude);

	const {
		data: airQualityData,
		isLoading: airQualityLoading,
		error: airQualityError,
		refetch: refetchAirQuality,
	} = useHourlyAirQuality(coordinates?.latitude, coordinates?.longitude);

	const isLoading = geoLoading || weatherLoading || airQualityLoading;
	const isError = weatherError || airQualityError || !hourlyWeatherData;

	if (isLoading) {
		return (
			<div className="space-y-6">
				<h3 className="text-2xl font-bold text-foreground">
					24-Hour Forecast
				</h3>

				<div className="grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-2">
					{Array.from({ length: 6 }).map((_, i) => (
						<ChartSkeleton key={i} />
					))}
				</div>
			</div>
		);
	}

	if (isError) {
		return (
			<ErrorState
				title="Chart data unavailable"
				description="Unable to load hourly weather and air quality data."
				onRetry={() => {
					refetchWeather();
					refetchAirQuality();
				}}
			/>
		);
	}

	const prepareChartData = () => {
		const data = [];
		const length = Math.min(24, hourlyWeatherData.time.length);

		for (let i = 0; i < length; i++) {
			const time = new Date(hourlyWeatherData.time[i]);
			const hour = time.getHours();

			data.push({
				time: `${hour.toString().padStart(2, "0")}:00`,
				temperature:
					hourlyWeatherData.temperature_2m[i] != null
						? isCelsius
							? hourlyWeatherData.temperature_2m[i]
							: (hourlyWeatherData.temperature_2m[i] * 9) / 5 + 32
						: 0,
				humidity: hourlyWeatherData.relative_humidity_2m[i],
				precipitation: hourlyWeatherData.precipitation[i] ?? 0,
				visibility: hourlyWeatherData.visibility[i] / 1000,
				windSpeed: hourlyWeatherData.wind_speed_10m[i],

				pm10: airQualityData?.pm10?.[i] ?? 0,
				pm25: airQualityData?.pm2_5?.[i] ?? 0,
			});
		}
		console.log("data", data);
		return data;
	};

	const chartData = prepareChartData();
	const times = chartData.map((d) => d.time);

	const charts = [
		{
			title: "Temperature",
			series: [
				{
					name: `Temperature (${tempUnit})`,
					data: chartData.map((d) =>
						Number(d.temperature.toFixed(2)),
					),
					color: colors.purple,
				},
			],
			yAxisTitle: `Temperature (${tempUnit})`,
		},
		{
			title: "Humidity",
			series: [
				{
					name: "Humidity (%)",
					data: chartData.map((d) => d.humidity),
					color: colors.greenBold,
				},
			],
			yAxisTitle: "Humidity (%)",
		},
		{
			title: "Precipitation",
			series: [
				{
					name: "Precipitation (mm)",
					data: chartData.map((d) => d.precipitation),
					color: colors.orange,
				},
			],
			yAxisTitle: "Precipitation (mm)",
		},
		{
			title: "Visibility",
			series: [
				{
					name: "Visibility (km)",
					data: chartData.map((d) => d.visibility),
					color: colors.redBold,
				},
			],
			yAxisTitle: "Visibility (km)",
		},
		{
			title: "Wind Speed",
			series: [
				{
					name: "Wind Speed (km/h)",
					data: chartData.map((d) => d.windSpeed),
					color: colors.blueBold,
				},
			],
			yAxisTitle: "Wind Speed (km/h)",
		},
		{
			title: "Air Pollutants",
			series: [
				{
					name: "PM2.5 (µg/m³)",
					data: chartData.map((d) => d.pm25),
					color: colors.pink,
				},
				{
					name: "PM10 (µg/m³)",
					data: chartData.map((d) => d.pm10),
					color: colors.green,
				},
			],
			yAxisTitle: "Air Quality (µg/m³)",
		},
	];

	return (
		<div className="space-y-6">
			<h3 className="text-2xl font-bold text-foreground">
				24-Hour Forecast
			</h3>

			<div className="grid gap-4 lg:gap-6 grid-cols-1 lg:grid-cols-2">
				{charts.map((chart) => (
					<Card
						key={chart.title}
						className="border-card-border bg-card/80 backdrop-blur-xl p-4 md:p-6 overflow-hidden"
					>
						<HighchartsWrapper
							title={chart.title}
							series={chart.series}
							categories={times}
							yAxisTitle={chart.yAxisTitle}
							xAxisTitle="Time"
							chartType="line"
							height={350}
						/>
					</Card>
				))}
			</div>
		</div>
	);
}
