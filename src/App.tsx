import { useState } from "react";
import {
	AirQualityMetrics,
	CurrentWeather,
	HourlyForecast,
	WeatherVariables,
} from "./components/current";
import { Navigation } from "./components/layout";
import { HistoricalAnalysis } from "./components/historical";

function App() {
	const [currentPage, setCurrentPage] = useState<"current" | "historical">(
		"current",
	);

	return (
		<main className="min-h-screen bg-background text-foreground flex flex-col">
			<Navigation
				currentPage={currentPage}
				onPageChange={setCurrentPage}
			/>
			<div className="flex-1 container mx-auto px-3 md:px-4 py-8">
				<div
					style={{
						display: currentPage === "current" ? "block" : "none",
					}}
				>
					<div className="space-y-8">
						<CurrentWeather />
						<WeatherVariables />
						<AirQualityMetrics />
						<HourlyForecast />
					</div>
				</div>
				<div
					style={{
						display:
							currentPage === "historical" ? "block" : "none",
					}}
				>
					<HistoricalAnalysis />
				</div>
			</div>
		</main>
	);
}

export default App;
