import { useGeolocation } from "../../hooks/useGeolocation";
import { AirQualityMetricsSkeleton } from "../skeleton/AirQualityMetricsSkeleton";
import { useWeatherStore } from "../../store/useWeatherStore";
import { useAirQualityMetrics } from "../../hooks/useWeatherQueries";
import { ErrorState } from "../base/Error";

const AirQualityMetrics = () => {
	const { selectedDate: date } = useWeatherStore();
	const { coordinates } = useGeolocation();
	const { data, isLoading, error, refetch, isRefetching } =
		useAirQualityMetrics(
			date,
			date,
			coordinates?.latitude,
			coordinates?.longitude,
		);

	if (isLoading || isRefetching) {
		return <AirQualityMetricsSkeleton />;
	}

	if (!data || error)
		return (
			<ErrorState
				title="Weather data unavailable"
				description={
					error?.message ||
					"Unable to fetch current weather for your location."
				}
				onRetry={refetch}
			/>
		);

	return (
		<div className="bg-card backdrop-blur-xl border border-card-border rounded-xl p-6 md:p-8">
			<h3 className="text-lg md:text-xl font-bold text-foreground mb-6">
				Air Quality Metrics
			</h3>
			<div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{[
					{
						label: "PM2.5",
						value: `${data.pm2_5}`,
						unit: "µg/m³",
					},
					{
						label: "PM10",
						value: `${data.pm10}`,
						unit: "µg/m³",
					},
					{
						label: "O₃",
						value: `${data.ozone}`,
						unit: "µg/m³",
					},
					{
						label: "NO₂",
						value: `${data.nitrogen_dioxide}`,
						unit: "ppb",
					},
					{
						label: "SO₂",
						value: `${data.sulphur_dioxide}`,
						unit: "µg/m³",
					},
					{
						label: "CO",
						value: `${data.carbon_monoxide}`,
						unit: "µg/m³",
					},
					{
						label: "AQI",
						value: `${data.us_aqi}`,
						unit: "USAQI",
					},
				].map((pollutant) => (
					<div
						key={pollutant.label}
						className="bg-background-solid/40 rounded-lg p-3 md:p-4 border border-border"
					>
						<p className="text-xs md:text-sm text-muted-foreground font-medium">
							{pollutant.label}
						</p>
						<p className="text-xl md:text-2xl font-bold text-foreground mt-1">
							{pollutant.value}
						</p>
						<p className="text-xs text-muted-foreground mt-1">
							{pollutant.unit}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default AirQualityMetrics;
