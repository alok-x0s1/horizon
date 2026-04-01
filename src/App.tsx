import { useState } from "react";
import HistoricalAnalysis from "./components/base/HistoricalAnalysis";
import CurrentWeather from "./components/layout/CurrentWeather";
import Navigation from "./components/layout/Navigation";

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
					<CurrentWeather />
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
