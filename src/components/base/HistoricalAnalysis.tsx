import { format } from "date-fns";
import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useGeolocation } from "../../hooks/useGeolocation";
import { useHistoricalWeather } from "../../hooks/useWeatherQueries";
import { useWeatherStore } from "../../store/useWeatherStore";
import HistoricalCharts from "../charts/HistoricalChart";
import { ErrorState } from "./Error";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card } from "../ui/card";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Spinner } from "../ui/spinner";
import HistoricalAirQualityChart from "../charts/HistoricalAirQualityChart";
import { formatDate } from "../../lib/utils";

export default function HistoricalAnalysis() {
	const { coordinates, loading: geoLoading } = useGeolocation();
	const { isCelsius, toggleUnit } = useWeatherStore();

	const [startDate, setStartDate] = useState<Date>(
		new Date(new Date().setDate(new Date().getDate() - 30)),
	);
	const [endDate, setEndDate] = useState<Date>(new Date(new Date()));

	const [appliedStartDate, setAppliedStartDate] = useState<Date | null>(null);
	const [appliedEndDate, setAppliedEndDate] = useState<Date | null>(null);

	const {
		data,
		isLoading,
		error: historicalError,
		refetch,
	} = useHistoricalWeather(
		appliedStartDate ? formatDate(appliedStartDate) : "",
		appliedEndDate ? formatDate(appliedEndDate) : "",
		coordinates?.latitude,
		coordinates?.longitude,
	);

	const validationError = useMemo(() => {
		if (!startDate || !endDate) return "Please select both dates";
		if (startDate > endDate) return "Start date must be before end date";

		const diff =
			(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);

		if (diff < 7) return "Date range must be at least 7 days";
		if (diff > 730) return "Date range cannot exceed 2 years";

		return null;
	}, [startDate, endDate]);

	if (historicalError) {
		return (
			<ErrorState
				title="Historical Chart data unavailable"
				description={
					historicalError?.message ||
					"Unable to load hourly weather and air quality data."
				}
				onRetry={refetch}
			/>
		);
	}

	return (
		<div className="space-y-8">
			<Card className="border-card-border bg-linear-to-br from-primary/10 to-accent/10 backdrop-blur-xl p-4 md:p-6 rounded-xl">
				<h3 className="mb-4 text-base md:text-lg font-semibold text-foreground">
					Select Date Range
				</h3>

				<div className="flex flex-col gap-3 md:gap-4 md:items-end">
					<div className="flex gap-2 min-w-0">
						<Label>Start Date</Label>
						<SelectDate date={startDate} setDate={setStartDate} />
					</div>

					<div className="flex gap-2 min-w-0">
						<Label>End Date</Label>
						<SelectDate date={endDate} setDate={setEndDate} />
					</div>

					<div className="flex gap-2 flex-wrap md:flex-nowrap">
						<Button
							onClick={() => {
								setAppliedStartDate(startDate);
								setAppliedEndDate(endDate);
							}}
							disabled={
								!!validationError || isLoading || geoLoading
							}
							size="lg"
							className="w-24"
						>
							{isLoading || geoLoading ? (
								<>
									<Spinner className="mr-2 h-4 w-4" />
									Loading...
								</>
							) : (
								"Load Data"
							)}
						</Button>

						<Button
							variant="outline"
							size="lg"
							onClick={toggleUnit}
							className="text-sm md:text-base"
						>
							°{isCelsius ? "F" : "C"}
						</Button>
					</div>
				</div>

				{validationError && (
					<p className="mt-2 text-xs md:text-sm text-destructive">
						{validationError}
					</p>
				)}

				<p className="text-xs mt-0 text-muted-foreground">
					Max: 2 years • Available: up to 60 years
				</p>
			</Card>

			{isLoading ? (
				<div className="w-full min-h-60 flex justify-center items-center">
					<Spinner className="size-5" />
					<p className="ml-2 text-foreground/80">Fetching data...</p>
				</div>
			) : data ? (
				<HistoricalCharts historicalData={data} isCelsius={isCelsius} />
			) : null}

			{appliedStartDate && appliedEndDate && (
				<HistoricalAirQualityChart
					appliedStartDate={appliedStartDate}
					appliedEndDate={appliedEndDate}
				/>
			)}
		</div>
	);
}

function SelectDate({
	date,
	setDate,
}: {
	date: Date;
	setDate: (date: Date) => void;
}) {
	const [isOpen, setOpen] = useState(false);

	return (
		<Popover open={isOpen} onOpenChange={setOpen}>
			<PopoverTrigger>
				<div
					data-empty={!date}
					className="w-44 px-2 rounded-sm flex py-1 text-sm justify-between items-center font-normal border border-muted-foreground cursor-pointer hover:bg-foreground/10"
				>
					{date ? format(date, "PPP") : <span>Pick a date</span>}
					<ChevronDown className="size-4" />
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					className="w-65"
					mode="single"
					selected={date}
					onSelect={(date: Date) => {
						setDate(date);
						setOpen(false);
					}}
					defaultMonth={date}
					required
				/>
			</PopoverContent>
		</Popover>
	);
}
