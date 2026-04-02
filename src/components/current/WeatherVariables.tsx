import {
	CloudRain,
	CloudSunRain,
	Droplets,
	Sun,
	SunDim,
	SunMedium,
	Sunrise,
	Sunset,
	ThermometerSun,
	Wind,
} from "lucide-react";
import {
	useCurrentWeather,
	useDailyWeather,
	useGeolocation,
} from "../../hooks";
import { convertTemp, formatTime } from "../../lib/utils";
import { useWeatherStore } from "../../store";
import { WeatherVariablesSkeleton } from "../skeleton";
import { ErrorState, WeatherCard, WeatherSection } from "../layout";

export default function WeatherVariables() {
	const { coordinates } = useGeolocation();
	const { selectedDate, isCelsius } = useWeatherStore();

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
		isRefetching,
	} = useDailyWeather(
		selectedDate,
		selectedDate,
		coordinates?.latitude,
		coordinates?.longitude,
	);

	const getTemp = (temp: number) =>
		convertTemp(temp, isCelsius) + "°" + (isCelsius ? "C" : "F");

	if (currentError || dailyError)
		return (
			<ErrorState
				title="Weather Variables data unavailable"
				description={
					currentError?.message ||
					dailyError?.message ||
					"Unable to fetch current weather for your location."
				}
				onRetry={refetch}
				className="mt-12"
			/>
		);

	if (currentLoading || dailyLoading || isRefetching || !current || !daily) {
		return <WeatherVariablesSkeleton />;
	}

	return (
		<div className="space-y-5 pt-2">
			<WeatherSection title="Temperature">
				<WeatherCard
					icon={SunMedium}
					label="Current"
					value={`${getTemp(current.temperature_2m)}`}
					color="text-yellow-500"
					bgColor="bg-yellow-500/10"
				/>
				<WeatherCard
					icon={SunDim}
					label="Min"
					value={`${getTemp(daily.temperature_2m_min)}`}
					color="text-blue-500"
					bgColor="bg-blue-500/10"
				/>
				<WeatherCard
					icon={Sun}
					label="Max"
					value={`${getTemp(daily.temperature_2m_max)}`}
					color="text-red-500"
					bgColor="bg-red-500/10"
				/>
			</WeatherSection>

			<WeatherSection title="Atmospheric Conditions">
				<WeatherCard
					icon={CloudRain}
					label="Precipitation"
					value={`${current.precipitation ?? 0} mm`}
					color="text-indigo-500"
					bgColor="bg-indigo-500/10"
				/>
				<WeatherCard
					icon={Droplets}
					label="Humidity"
					value={`${current.relative_humidity_2m}%`}
					color="text-blue-500"
					bgColor="bg-blue-500/10"
				/>
				<WeatherCard
					icon={ThermometerSun}
					label="UV Index"
					value={`${daily.uv_index_max ?? "--"}`}
					color="text-orange-500"
					bgColor="bg-orange-500/10"
				/>
			</WeatherSection>

			<WeatherSection title="Sunrise & Sunset (IST)">
				<WeatherCard
					icon={Sunrise}
					label="Sunrise"
					value={formatTime(daily.sunrise)}
					color="text-yellow-500"
					bgColor="bg-yellow-500/10"
				/>
				<WeatherCard
					icon={Sunset}
					label="Sunset"
					value={formatTime(daily.sunset)}
					color="text-orange-500"
					bgColor="bg-orange-500/10"
				/>
			</WeatherSection>

			<WeatherSection title="Wind & Rain">
				<WeatherCard
					icon={Wind}
					label="Maximum Wind Speed"
					value={`${daily.wind_speed_10m_max} km/h`}
					color="text-cyan-500"
					bgColor="bg-cyan-500/10"
				/>
				<WeatherCard
					icon={CloudSunRain}
					label="Maximum Precipitation Probability"
					value={`${daily.precipitation_probability_max ?? 0}%`}
					color="text-indigo-500"
					bgColor="bg-indigo-500/10"
				/>
			</WeatherSection>
		</div>
	);
}
