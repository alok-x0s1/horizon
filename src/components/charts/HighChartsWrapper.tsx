import { useEffect, useRef } from "react";

interface HighchartsWrapperProps {
	title: string;
	subtitle?: string;
	series: any[];
	categories?: string[];
	yAxisTitle: string;
	xAxisTitle: string;
	chartType: "line" | "area" | "column" | "spline";
	height: number;
	isTimeChart?: boolean;
}

export default function HighchartsWrapper({
	title,
	subtitle,
	series,
	categories,
	yAxisTitle,
	xAxisTitle,
	chartType,
	height = 400,
	isTimeChart = false,
}: HighchartsWrapperProps) {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const loadHighcharts = async () => {
			try {
				const Highcharts = await import("highcharts");
				const HC = Highcharts.default;

				if (containerRef.current) {
					const options: Highcharts.Options = {
						chart: {
							type: chartType,
							height: height,
							backgroundColor: "transparent",
							style: {
								fontFamily: "inherit",
							},
							marginBottom: 50,
							marginTop: 20,
							marginRight: 0,
							marginLeft: 55,
							zooming: { type: "x" },
							panning: {
								enabled: true,
								type: "x",
							},
						},
						title: {
							text: title,
							style: {
								color: "var(--primary)",
								fontSize: "16px",
								fontWeight: "500",
							},
							align: "right",
							x: 0,
							y: 1,
						},
						subtitle: subtitle
							? {
									text: subtitle,
									style: {
										color: "var(--muted-foreground)",
										fontSize: "12px",
									},
								}
							: undefined,
						xAxis: {
							categories: categories || [],
							labels: {
								style: {
									color: "var(--chart-2)",
									fontSize: "12px",
								},
							},
							title: xAxisTitle
								? {
										text: xAxisTitle,
										style: {
											color: "var(--chart-4)",
										},
									}
								: undefined,
							gridLineWidth: 0,
							lineColor: "var(--chart-4)",
							crosshair: {
								width: 1,
								color: "var(--muted-foreground)",
							},
							lineWidth: 1,
						},
						yAxis: {
							title: yAxisTitle
								? {
										text: yAxisTitle,
										style: {
											color: "var(--chart-4)",
										},
									}
								: undefined,
							labels: {
								rotation: isTimeChart ? -90 : 0,
								style: {
									color: "var(--chart-2)",
									fontSize: "12px",
								},
								formatter: function () {
									if (isTimeChart) {
										const h = Math.floor(
											Number(this.value),
										);
										const m = Math.round(
											(Number(this.value) % 1) * 60,
										);

										const d = new Date();
										d.setHours(h);
										d.setMinutes(m);

										return d.toLocaleTimeString("en-US", {
											hour: "2-digit",
											minute: "2-digit",
										});
									}

									return Number(this.value).toFixed(0);
								},
							},
							gridLineWidth: 0,
							lineColor: "var(--chart-4)",
							lineWidth: 1,
						},
						legend: { enabled: false },
						series: series,
						credits: {
							enabled: false,
						},

						tooltip: isTimeChart
							? {
									formatter: function () {
										const value = Number(this.y);

										const h = Math.floor(value);
										const m = Math.round((value % 1) * 60);

										const d = new Date();
										d.setHours(h);
										d.setMinutes(m);

										return `
											<b>${this.key}</b><br/>
											${this.series.name}: ${d.toLocaleTimeString("en-US", {
												hour: "2-digit",
												minute: "2-digit",
												hour12: true,
											})}
										`;
									},
									backgroundColor: "var(--background)",
									borderColor: "var(--muted-foreground)",
									style: { color: "var(--foreground)" },
								}
							: {
									backgroundColor: "var(--background)",
									borderColor: "var(--muted-foreground)",
									borderWidth: 0.5,
									borderRadius: 4,
									shadow: false,
									style: {
										color: "var(--foreground)",
									},
									headerFormat:
										'<span style="color: var(--destructive)"><b>{point.key}</b></span><br/>',
									shared: true,
								},
						rangeSelector: {
							enabled: false,
						},
						plotOptions: {
							series: {
								lineWidth: 1,
								marker: {
									enabled: true,
									states: {
										hover: {
											enabled: true,
											radius: 3,
											lineColor: "#fff",
											lineWidth: 1,
											fillColor: "#1A1B1E",
										},
									},
								},
								connectNulls: true,
							},
						},
					};

					HC.chart(containerRef.current, options);
				}
			} catch (error) {
				console.error("Error loading Highcharts:", error);
			}
		};

		loadHighcharts();
	}, [
		title,
		series,
		categories,
		chartType,
		height,
		yAxisTitle,
		xAxisTitle,
		subtitle,
		isTimeChart,
	]);

	return <div ref={containerRef} className="w-full" />;
}
