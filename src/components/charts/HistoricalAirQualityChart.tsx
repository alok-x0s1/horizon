import { useMemo } from "react";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useHourlyAirQuality } from "../../hooks/useWeatherQueries";
import { formatDate, groupByDay } from "../../lib/utils";
import { ErrorState } from "../layout/Error";
import { Card } from "../ui/card";
import HighchartsWrapper from "./HighChartsWrapper";

export default function HistoricalAirQualityChart({
	appliedStartDate,
	appliedEndDate,
}: {
	appliedStartDate: Date;
	appliedEndDate: Date;
}) {
	const { coordinates } = useGeolocation();

	const { data, error, refetch } = useHourlyAirQuality(
		appliedStartDate ? formatDate(appliedStartDate) : "",
		appliedEndDate ? formatDate(appliedEndDate) : "",
		coordinates?.latitude,
		coordinates?.longitude,
	);

	const grouped = useMemo(() => {
		if (!data) return null;
		return groupByDay(data);
	}, [data]);

	if (error) {
		return (
			<ErrorState
				title="Chart data unavailable"
				description={
					error?.message || "Unable to load air quality data."
				}
				onRetry={refetch}
			/>
		);
	}

	if (!grouped) return null;

	return (
		<Card className="p-4">
			<HighchartsWrapper
				title="Air Quality"
				chartType="spline"
				categories={grouped.dates}
				yAxisTitle="µg/m³"
				xAxisTitle="Date"
				height={350}
				series={[
					{
						name: "PM2.5",
						data: grouped.pm25,
						color: "#ef4444",
						marker: {
							symbol: "circle",
							radius: 3,
						},
					},
					{
						name: "PM10",
						data: grouped.pm10,
						color: "#22c55e",
						marker: {
							symbol: "circle",
							radius: 3,
						},
					},
				]}
			/>
		</Card>
	);
}
