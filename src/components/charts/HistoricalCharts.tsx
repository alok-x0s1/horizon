// import { useMemo } from "react";
// import { Card } from "../ui/card";
// import HighchartsWrapper from "./HighChartsWrapper";

// interface HistoricalChartsProps {
// 	historicalData: any;
// 	isCelsius: boolean;
// }

// export default function HistoricalCharts({
// 	historicalData,
// 	isCelsius,
// }: HistoricalChartsProps) {
// 	const convertTemp = (temp: number) => {
// 		if (!isCelsius) {
// 			return Math.round((temp * 9) / 5 + 32);
// 		}
// 		return Math.round(temp);
// 	};

// 	const tempUnit = isCelsius ? "°C" : "°F";

// 	const chartData = useMemo(() => {
// 		const data = [];
// 		for (let i = 0; i < historicalData.time.length; i++) {
// 			const date = new Date(historicalData.time[i]);
// 			const formattedDate = date.toLocaleDateString("en-US", {
// 				month: "short",
// 				day: "numeric",
// 			});

// 			data.push({
// 				date: formattedDate,
// 				fullDate: historicalData.time[i],
// 				tempMax: convertTemp(historicalData.temperature_2m_max[i]),
// 				tempMin: convertTemp(historicalData.temperature_2m_min[i]),
// 				tempMean: convertTemp(
// 					(historicalData.temperature_2m_max[i] +
// 						historicalData.temperature_2m_min[i]) /
// 						2,
// 				),
// 				precipitation: historicalData.precipitation[i] || 0,
// 				windSpeed: Math.round(historicalData.wind_speed_10m_max[i]),
// 				windDirection: historicalData.wind_direction_10m_dominant[i],
// 				sunrise: historicalData.sunrise[i],
// 				sunset: historicalData.sunset[i],
// 				pm10: historicalData.pm10?.[i] || 0,
// 				pm2_5: historicalData.pm2_5?.[i] || 0,
// 			});
// 		}
// 		return data;
// 	}, [historicalData, isCelsius]);

// 	const dates = useMemo(() => chartData.map((d) => d.date), [chartData]);

// 	// Calculate summary statistics
// 	const summary = useMemo(() => {
// 		const avgMaxTemp = Math.round(
// 			chartData.reduce((sum, d) => sum + d.tempMax, 0) / chartData.length,
// 		);
// 		const avgMinTemp = Math.round(
// 			chartData.reduce((sum, d) => sum + d.tempMin, 0) / chartData.length,
// 		);
// 		const avgMeanTemp = Math.round(
// 			chartData.reduce((sum, d) => sum + d.tempMean, 0) /
// 				chartData.length,
// 		);
// 		const totalPrecip = chartData
// 			.reduce((sum, d) => sum + d.precipitation, 0)
// 			.toFixed(1);
// 		const avgWindSpeed = Math.round(
// 			chartData.reduce((sum, d) => sum + d.windSpeed, 0) /
// 				chartData.length,
// 		);

// 		return {
// 			avgMaxTemp,
// 			avgMinTemp,
// 			avgMeanTemp,
// 			totalPrecip,
// 			avgWindSpeed,
// 		};
// 	}, [chartData]);

// 	const temperatureChartConfig = useMemo(
// 		() => ({
// 			chart: {
// 				type: "spline",
// 				zoomType: "x",
// 				panning: { enabled: true, type: "x" },
// 			},
// 			title: { text: "Temperature Trends", style: { color: "#f1f5f9" } },
// 			xAxis: {
// 				categories: dates,
// 				crosshair: true,
// 				labels: { style: { color: "#cbd5e1" } },
// 			},
// 			yAxis: {
// 				title: {
// 					text: `Temperature (${tempUnit})`,
// 					style: { color: "#f1f5f9" },
// 				},
// 				labels: { style: { color: "#cbd5e1" } },
// 			},
// 			series: [
// 				{
// 					name: `Max (${tempUnit})`,
// 					data: chartData.map((d) => d.tempMax),
// 					color: "#ef4444",
// 				},
// 				{
// 					name: `Mean (${tempUnit})`,
// 					data: chartData.map((d) => d.tempMean),
// 					color: "#f59e0b",
// 				},
// 				{
// 					name: `Min (${tempUnit})`,
// 					data: chartData.map((d) => d.tempMin),
// 					color: "#3b82f6",
// 				},
// 			],
// 		}),
// 		[chartData, dates, tempUnit],
// 	);

// 	const sunCycleChartConfig = useMemo(
// 		() => ({
// 			chart: {
// 				type: "spline",
// 				zoomType: "x",
// 				panning: { enabled: true, type: "x" },
// 			},
// 			title: {
// 				text: "Sunrise & Sunset Times (IST)",
// 				style: { color: "#f1f5f9" },
// 			},
// 			xAxis: {
// 				categories: dates,
// 				labels: { style: { color: "#cbd5e1" } },
// 			},
// 			yAxis: {
// 				title: { text: "Time (Hour)", style: { color: "#f1f5f9" } },
// 				labels: { style: { color: "#cbd5e1" } },
// 			},
// 			series: [
// 				{
// 					name: "Sunrise",
// 					data: chartData.map((d) => {
// 						const hour = new Date(d.sunrise).getHours();
// 						const minutes = new Date(d.sunrise).getMinutes();
// 						return parseFloat(`${hour}.${minutes}`);
// 					}),
// 					color: "#f59e0b",
// 				},
// 				{
// 					name: "Sunset",
// 					data: chartData.map((d) => {
// 						const hour = new Date(d.sunset).getHours();
// 						const minutes = new Date(d.sunset).getMinutes();
// 						return parseFloat(`${hour}.${minutes}`);
// 					}),
// 					color: "#a855f7",
// 				},
// 			],
// 		}),
// 		[chartData, dates],
// 	);

// 	const precipitationChartConfig = useMemo(
// 		() => ({
// 			chart: {
// 				type: "column",
// 				zoomType: "x",
// 				panning: { enabled: true, type: "x" },
// 			},
// 			title: { text: "Daily Precipitation", style: { color: "#f1f5f9" } },
// 			xAxis: {
// 				categories: dates,
// 				labels: { style: { color: "#cbd5e1" } },
// 			},
// 			yAxis: {
// 				title: {
// 					text: "Precipitation (mm)",
// 					style: { color: "#f1f5f9" },
// 				},
// 				labels: { style: { color: "#cbd5e1" } },
// 			},
// 			series: [
// 				{
// 					name: "Precipitation (mm)",
// 					data: chartData.map((d) => d.precipitation),
// 					color: "#06b6d4",
// 				},
// 			],
// 		}),
// 		[chartData, dates],
// 	);

// 	const windSpeedChartConfig = useMemo(
// 		() => ({
// 			chart: {
// 				type: "spline",
// 				zoomType: "x",
// 				panning: { enabled: true, type: "x" },
// 			},
// 			title: { text: "Max Wind Speed", style: { color: "#f1f5f9" } },
// 			xAxis: {
// 				categories: dates,
// 				labels: { style: { color: "#cbd5e1" } },
// 			},
// 			yAxis: {
// 				title: {
// 					text: "Wind Speed (km/h)",
// 					style: { color: "#f1f5f9" },
// 				},
// 				labels: { style: { color: "#cbd5e1" } },
// 			},
// 			series: [
// 				{
// 					name: "Wind Speed (km/h)",
// 					data: chartData.map((d) => d.windSpeed),
// 					color: "#00d9ff",
// 				},
// 			],
// 		}),
// 		[chartData, dates],
// 	);

// 	const windDirectionChartConfig = useMemo(
// 		() => ({
// 			chart: {
// 				type: "column",
// 				zoomType: "x",
// 				panning: { enabled: true, type: "x" },
// 			},
// 			title: {
// 				text: "Dominant Wind Direction",
// 				style: { color: "#f1f5f9" },
// 			},
// 			xAxis: {
// 				categories: dates,
// 				labels: { style: { color: "#cbd5e1" } },
// 			},
// 			yAxis: {
// 				title: { text: "Direction (°)", style: { color: "#f1f5f9" } },
// 				min: 0,
// 				max: 360,
// 				labels: { style: { color: "#cbd5e1" } },
// 			},
// 			series: [
// 				{
// 					name: "Direction (°)",
// 					data: chartData.map((d) => d.windDirection),
// 					color: "#00ffaa",
// 				},
// 			],
// 		}),
// 		[chartData, dates],
// 	);

// 	const airQualityChartConfig = useMemo(
// 		() => ({
// 			chart: {
// 				type: "spline",
// 				zoomType: "x",
// 				panning: { enabled: true, type: "x" },
// 			},
// 			title: {
// 				text: "Air Quality - Particulate Matter Trends",
// 				style: { color: "#f1f5f9" },
// 			},
// 			xAxis: {
// 				categories: dates,
// 				labels: { style: { color: "#cbd5e1" } },
// 			},
// 			yAxis: {
// 				title: {
// 					text: "Concentration (µg/m³)",
// 					style: { color: "#f1f5f9" },
// 				},
// 				labels: { style: { color: "#cbd5e1" } },
// 			},
// 			series: [
// 				{
// 					name: "PM10 (µg/m³)",
// 					data: chartData.map((d) => d.pm10),
// 					color: "#f59e0b",
// 				},
// 				{
// 					name: "PM2.5 (µg/m³)",
// 					data: chartData.map((d) => d.pm2_5),
// 					color: "#ef4444",
// 				},
// 			],
// 		}),
// 		[chartData, dates],
// 	);

// 	return (
// 		<div className="space-y-8">
// 			<div>
// 				<h3 className="text-lg md:text-xl font-bold text-foreground mb-4">
// 					Summary Statistics
// 				</h3>
// 				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
// 					{[
// 						{
// 							label: "Avg Max Temp",
// 							value: `${summary.avgMaxTemp}°${isCelsius ? "C" : "F"}`,
// 							color: "text-red-400",
// 						},
// 						{
// 							label: "Avg Mean Temp",
// 							value: `${summary.avgMeanTemp}°${isCelsius ? "C" : "F"}`,
// 							color: "text-amber-400",
// 						},
// 						{
// 							label: "Avg Min Temp",
// 							value: `${summary.avgMinTemp}°${isCelsius ? "C" : "F"}`,
// 							color: "text-blue-400",
// 						},
// 						{
// 							label: "Total Precipitation",
// 							value: `${summary.totalPrecip} mm`,
// 							color: "text-cyan-400",
// 						},
// 						{
// 							label: "Avg Wind Speed",
// 							value: `${summary.avgWindSpeed} km/h`,
// 							color: "text-primary",
// 						},
// 					].map((stat) => (
// 						<Card
// 							key={stat.label}
// 							className="border-card-border bg-card/60 backdrop-blur p-4 rounded-lg"
// 						>
// 							<p className="text-xs md:text-sm text-muted-foreground font-medium">
// 								{stat.label}
// 							</p>
// 							<p
// 								className={`text-lg md:text-2xl font-bold ${stat.color} mt-2`}
// 							>
// 								{stat.value}
// 							</p>
// 						</Card>
// 					))}
// 				</div>
// 			</div>

// 			<div className="space-y-6">
// 				<Card className="border-card-border bg-card/60 backdrop-blur p-4 md:p-6 rounded-lg overflow-x-auto">
// 					<HighchartsWrapper options={temperatureChartConfig} />
// 				</Card>

// 				<Card className="border-card-border bg-card/60 backdrop-blur p-4 md:p-6 rounded-lg overflow-x-auto">
// 					<HighchartsWrapper options={sunCycleChartConfig} />
// 				</Card>

// 				<Card className="border-card-border bg-card/60 backdrop-blur p-4 md:p-6 rounded-lg overflow-x-auto">
// 					<HighchartsWrapper options={precipitationChartConfig} />
// 				</Card>

// 				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// 					<Card className="border-card-border bg-card/60 backdrop-blur p-4 md:p-6 rounded-lg overflow-x-auto">
// 						<HighchartsWrapper options={windSpeedChartConfig} />
// 					</Card>

// 					<Card className="border-card-border bg-card/60 backdrop-blur p-4 md:p-6 rounded-lg overflow-x-auto">
// 						<HighchartsWrapper options={windDirectionChartConfig} />
// 					</Card>
// 				</div>

// 				<Card className="border-card-border bg-card/60 backdrop-blur p-4 md:p-6 rounded-lg overflow-x-auto">
// 					<HighchartsWrapper options={airQualityChartConfig} />
// 				</Card>
// 			</div>
// 		</div>
// 	);
// }

import { useMemo } from "react";
import { Card } from "../ui/card";
import HighchartsWrapper from "./HighChartsWrapper";
import type { HistoricalData } from "../../lib/types";
import { colors } from "../../lib/utils";

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
				pm10: historicalData.pm10?.[i],
				pm25: historicalData.pm2_5?.[i],
			};
		});
	}, [historicalData]);

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

			{chartData.some((d) => d.pm10 != null) && (
				<Card className="p-4">
					<HighchartsWrapper
						title="Air Quality (PM10 & PM2.5)"
						chartType="spline"
						categories={categories}
						yAxisTitle="µg/m³"
						xAxisTitle="Date"
						height={350}
						series={[
							{
								name: "PM2.5",
								data: chartData.map((d) => d.pm25 || 0),
								color: "#ef4444",
							},
							{
								name: "PM10",
								data: chartData.map((d) => d.pm10 || 0),
								color: "#22c55e",
							},
						]}
					/>
				</Card>
			)}
		</div>
	);
}
