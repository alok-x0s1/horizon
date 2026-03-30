import { useState, useEffect } from "react";

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
		// Check if geolocation is available
		const checkGeolocation = () => {
			if (!navigator.geolocation) {
				setError("Geolocation is not supported by your browser");
				setLoading(false);
			}
		};
		checkGeolocation();

		// Try to get user's location
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setCoordinates({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				});
				setLoading(false);
			},
			(err) => {
				// If user denies permission, use a default location
				console.log("Geolocation error:", err.message);
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
