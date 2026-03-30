import { useState } from "react";
import CurrentWeather from "./components/base/CurrentWeather";
import Navigation from "./components/layout/Navigation";
import HistoricalAnalysis from "./components/base/HistoricalAnalysis";

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

			<div className="flex-1 container mx-auto px-3 md:px-4 py-8 md:py-12">
				{currentPage === "current" && <CurrentWeather />}

				{currentPage === "historical" && <HistoricalAnalysis />}
			</div>
		</main>
	);
}

export default App;
