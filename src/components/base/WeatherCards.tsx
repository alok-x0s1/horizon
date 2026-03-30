import { Cloud, Droplets, Sun, Sunrise, Sunset, Wind } from "lucide-react";
import { convertTemp, formatTime } from "../../lib/utils";
import { WeatherCard } from "../layout/WeatherCard";
import { WeatherSection } from "../layout/WeatherSection";
import { useWeatherStore } from "../../store/useWeatherStore";
import { useGeolocation } from "../../hooks/useGeolocation";
import { WeatherCardsSkeleton } from "../skeleton/WeatherCardsSkeleton";
import { ErrorState } from "../layout/Error";
import {
	useCurrentWeather,
	useDailyWeather,
} from "../../hooks/useWeatherQueries";

export default function WeatherCards() {
	const { coordinates, loading: geoLoading } = useGeolocation();
	const { selectedDate } = useWeatherStore();

	const {
		data: current,
		isLoading: currentLoading,
		error: currentError,
	} = useCurrentWeather(coordinates?.latitude, coordinates?.longitude);
	const {
		data: daily,
		isLoading: dailyLoading,
		error: dailyError,
		refetch,
	} = useDailyWeather(
		selectedDate,
		selectedDate,
		coordinates?.latitude,
		coordinates?.longitude,
	);

	const { isCelsius } = useWeatherStore();
	const getTemp = (temp: number) =>
		convertTemp(temp, isCelsius) + "°" + (isCelsius ? "C" : "F");

	if (geoLoading || currentLoading || dailyLoading) {
		return <WeatherCardsSkeleton />;
	}

	if (!current || !daily || currentError || dailyError)
		return (
			<ErrorState
				title="Weather data unavailable"
				description="Unable to fetch current weather for your location."
				onRetry={refetch}
			/>
		);

	return (
		<div className="space-y-5">
			<WeatherSection title="Temperature">
				<WeatherCard
					icon={Sun}
					label="Current"
					value={`${getTemp(current.temperature_2m)}`}
					color="text-yellow-400"
					bgColor="bg-yellow-500/10"
				/>
				<WeatherCard
					icon={Sun}
					label="Min"
					value={`${getTemp(daily.temperature_2m_min)}`}
					color="text-blue-400"
					bgColor="bg-blue-500/10"
				/>
				<WeatherCard
					icon={Sun}
					label="Max"
					value={`${getTemp(daily.temperature_2m_max)}`}
					color="text-red-400"
					bgColor="bg-red-500/10"
				/>
			</WeatherSection>

			<WeatherSection title="Atmospheric Conditions">
				<WeatherCard
					icon={Cloud}
					label="Precipitation"
					value={`${current.precipitation ?? 0} mm`}
					color="text-indigo-400"
					bgColor="bg-indigo-500/10"
				/>
				<WeatherCard
					icon={Droplets}
					label="Humidity"
					value={`${current.relative_humidity_2m}%`}
					color="text-blue-400"
					bgColor="bg-blue-500/10"
				/>
				<WeatherCard
					icon={Sun}
					label="UV Index"
					value={`${daily.uv_index_max ?? "--"}`}
					color="text-orange-400"
					bgColor="bg-orange-500/10"
				/>
			</WeatherSection>

			<WeatherSection title="Sun Cycle">
				<WeatherCard
					icon={Sunrise}
					label="Sunrise"
					value={formatTime(daily.sunrise)}
					color="text-yellow-400"
					bgColor="bg-yellow-500/10"
				/>
				<WeatherCard
					icon={Sunset}
					label="Sunset"
					value={formatTime(daily.sunset)}
					color="text-orange-400"
					bgColor="bg-orange-500/10"
				/>
			</WeatherSection>

			<WeatherSection title="Wind & Air">
				<WeatherCard
					icon={Wind}
					label="Maximum Wind Speed"
					value={`${daily.wind_speed_10m_max} km/h`}
					color="text-cyan-400"
					bgColor="bg-cyan-500/10"
				/>
				<WeatherCard
					icon={Cloud}
					label="Maximum Precipitation Probability"
					value={`${daily.precipitation_probability_max ?? 0}%`}
					color="text-indigo-400"
					bgColor="bg-indigo-500/10"
				/>
			</WeatherSection>
		</div>
	);
}
