import { useMemo } from "react";
import type { HistoricalData } from "../../lib/types";
import { colors } from "../../lib/utils";
import { Card } from "../ui/card";
import HighchartsWrapper from "./HighChartsWrapper";

interface Props {
	historicalData: HistoricalData;
	isCelsius: boolean;
}

export default function HistoricalCharts({ historicalData, isCelsius }: Props) {
	const tempUnit = isCelsius ? "°C" : "°F";

	const chartData = useMemo(() => {
		if (!historicalData || !historicalData.time) return [];

		return historicalData.time.map((t: string, i: number) => {
			const d = new Date(t);

			return {
				date: d.toLocaleDateString("en-US", {
					month: "short",
					day: "numeric",
				}),
				tempMax: historicalData.temperature_2m_max[i],
				tempMin: historicalData.temperature_2m_min[i],
				tempMean: historicalData.temperature_2m_mean[i],
				precip: historicalData.precipitation_sum?.[i] || 0,
				windSpeed: historicalData.wind_speed_10m_max[i] || 0,
				windDir: historicalData.winddirection_10m_dominant?.[i] || 0,
				sunrise: historicalData.sunrise?.[i]
					? new Date(historicalData.sunrise[i] + "Z")
					: null,
				sunset: historicalData.sunset?.[i]
					? new Date(historicalData.sunset[i] + "Z")
					: null,
			};
		});
	}, [historicalData]);
	console.log(chartData);

	const categories = chartData.map((d) => d.date);

	const totalPrecip = chartData.reduce((s, d) => s + d.precip, 0).toFixed(1);

	const getDirection = (deg: number) => {
		if (deg >= 337.5 || deg < 22.5) return "N";
		if (deg < 67.5) return "NE";
		if (deg < 112.5) return "E";
		if (deg < 157.5) return "SE";
		if (deg < 202.5) return "S";
		if (deg < 247.5) return "SW";
		if (deg < 292.5) return "W";
		return "NW";
	};

	return (
		<div className="space-y-6">
			<Card className="p-4">
				<HighchartsWrapper
					title="Temperature Trends"
					chartType="spline"
					categories={categories}
					yAxisTitle={`Temperature (${tempUnit})`}
					xAxisTitle="Date"
					height={350}
					series={[
						{
							name: "Max Temp",
							data: chartData.map((d) => d.tempMax),
							color: colors.purple,
							marker: {
								symbol: "circle",
								marker: {
									symbol: "circle",
								},
							},
						},
						{
							name: "Mean Temp",
							data: chartData.map((d) => d.tempMean),
							color: colors.greenBold,
							marker: {
								symbol: "circle",
								radius: 3,
							},
						},
						{
							name: "Min Temp",
							data: chartData.map((d) => d.tempMin),
							color: colors.orange,
							marker: {
								symbol: "circle",
								radius: 3,
							},
						},
					]}
				/>
			</Card>

			<Card className="p-4">
				<HighchartsWrapper
					title="Sunrise & Sunset (IST)"
					chartType="spline"
					categories={categories}
					yAxisTitle="Time"
					xAxisTitle="Date"
					height={350}
					isTimeChart={true}
					series={[
						{
							name: "Sunrise 🌅",
							data: chartData.map((d) =>
								d.sunrise
									? d.sunrise.getHours() +
										d.sunrise.getMinutes() / 60
									: null,
							),
							color: "#f59e0b",
							marker: {
								symbol: "circle",
								radius: 3,
							},
						},
						{
							name: "Sunset 🌇",
							data: chartData.map((d) =>
								d.sunset
									? d.sunset.getHours() +
										d.sunset.getMinutes() / 60
									: null,
							),
							color: "#a855f7",
							marker: {
								symbol: "circle",
								radius: 3,
							},
						},
					]}
				/>
			</Card>

			<Card className="p-4">
				<HighchartsWrapper
					title="Precipitation"
					subtitle={`Total: ${totalPrecip} mm`}
					chartType="column"
					categories={categories}
					yAxisTitle="Precipitation (mm)"
					xAxisTitle="Date"
					height={350}
					series={[
						{
							name: "Rain (mm)",
							data: chartData.map((d) => d.precip),
							color: colors.red,
						},
					]}
				/>
			</Card>

			<div className="grid md:grid-cols-2 gap-4">
				<Card className="p-4">
					<HighchartsWrapper
						title="Max Wind Speed"
						chartType="spline"
						categories={categories}
						yAxisTitle="Wind Speed (km/h)"
						xAxisTitle="Date"
						height={350}
						series={[
							{
								name: "Wind Speed (km/h)",
								data: chartData.map((d) => d.windSpeed),
								color: colors.pink,
							},
						]}
					/>
				</Card>

				<Card className="p-4">
					<HighchartsWrapper
						title="Dominant Wind Direction"
						chartType="column"
						categories={categories}
						yAxisTitle="Degrees (°)"
						xAxisTitle="Date"
						height={350}
						series={[
							{
								name: `Direction (${getDirection(chartData[0].windDir)})`,
								data: chartData.map((d) => d.windDir),
								color: colors.green2,
							},
						]}
					/>
				</Card>
			</div>
		</div>
	);
}
