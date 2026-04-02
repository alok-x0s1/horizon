import { useCurrentWeather, useGeolocation } from "../../hooks";
import { useWeatherStore } from "../../store";
import { convertTemp } from "../../lib/utils";
import { Button } from "../ui/button";
import { RotateCw } from "lucide-react";
import { getWeatherDescription } from "../../lib/weather-api";
import { CurrentWeatherSkeleton } from "../skeleton";
import { ErrorState } from "../layout";

export default function CurrentWeather() {
	const { coordinates } = useGeolocation();
	const { isCelsius, selectedDate, toggleUnit } = useWeatherStore();
	const { data, isLoading, error, refetch, isRefetching } = useCurrentWeather(
		coordinates?.latitude,
		coordinates?.longitude,
	);

	if (error) {
		return (
			<ErrorState
				title="Current Weather data unavailable"
				description={
					error?.message ||
					"Unable to fetch current weather for your location."
				}
				onRetry={refetch}
			/>
		);
	}

	if (isLoading || isRefetching || !data) {
		return <CurrentWeatherSkeleton />;
	}

	const temp = convertTemp(data?.temperature_2m, isCelsius);

	return (
		<div className="rounded-lg border border-card-border bg-linear-to-br from-accent/30 via-blue-500/20 to-accent/50 backdrop-blur-xl p-8 md:p-10">
			<div className="flex flex-col items-start justify-between gap-4">
				<div className="w-full">
					<p className="text-foreground/80 text-xs">
						Current Weather
					</p>
					<h2 className="mb-1 text-5xl md:text-6xl font-bold text-foreground">
						{temp}°{" "}
						<span className="text-2xl">
							{isCelsius ? "C" : "F"}
						</span>
					</h2>
					<p className="text-xl text-primary font-medium">
						{getWeatherDescription(data.weather_code)}
					</p>
					<p className="mt-2 text-sm text-muted-foreground">
						{`${new Date().toLocaleDateString("en-US", {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
						})} | ${new Intl.DateTimeFormat("en-US", {
							hour: "2-digit",
							minute: "2-digit",
						}).format(new Date())}`}
					</p>
				</div>
				<div className="flex gap-2 self-start md:self-auto flex-wrap">
					<Button
						variant="outline"
						size="sm"
						onClick={() => refetch()}
						disabled={isRefetching}
						className="gap-2 border-muted-foreground hover:bg-primary/10"
					>
						<RotateCw className="h-4 w-4" />
						{isRefetching ? "Refreshing..." : "Refresh"}
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => toggleUnit()}
						className="gap-2 border-muted-foreground hover:bg-primary/10"
					>
						°{isCelsius ? "F" : "C"}
					</Button>
				</div>
			</div>
			<p className="text-sm absolute -bottom-9 left-1/2 -translate-x-1/2">
				{new Date(selectedDate).toLocaleDateString("en-US", {
					weekday: "long",
					year: "numeric",
					month: "long",
					day: "numeric",
				})}
			</p>
		</div>
	);
}
