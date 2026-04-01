import { useState, useEffect } from "react";
import { toast } from "sonner";

interface LocationCoordinates {
	latitude: number;
	longitude: number;
}

interface UseGeolocationReturn {
	coordinates: LocationCoordinates | null;
	error: string | null;
	loading: boolean;
}

export function useGeolocation(): UseGeolocationReturn {
	const [coordinates, setCoordinates] = useState<LocationCoordinates | null>(
		null,
	);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (!navigator.geolocation) {
			toast.error("Geolocation is not supported by your browser", {
				id: "geo-not-supported",
			});

			setTimeout(() => {
				setError("Geolocation is not supported by your browser");
				setLoading(false);
			}, 0);
			return;
		}

		navigator.geolocation.getCurrentPosition(
			(position) => {
				setCoordinates({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
				setLoading(false);
			},
			(err) => {
				toast.warning(
					err.message + ". Using default location instead.",
					{
						id: "location-error",
						style: {
							color: "var(--foreground)",
							fontFamily: "var(--font-outfit)",
						},
					},
				);
				setCoordinates({
					latitude: 26.8467,
					longitude: 80.9462,
				});
				setLoading(false);
			},
		);
	}, []);

	return { coordinates, error, loading };
}
