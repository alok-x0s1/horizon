import { create } from "zustand";

interface WeatherState {
	isCelsius: boolean;
	selectedDate: string;

	toggleUnit: () => void;
	setDate: (date: string) => void;
}

export const useWeatherStore = create<WeatherState>((set) => ({
	isCelsius: true,
	selectedDate: new Date().toISOString().split("T")[0],

	toggleUnit: () =>
		set((state) => ({
			isCelsius: !state.isCelsius,
		})),

	setDate: (date) =>
		set(() => ({
			selectedDate: date.split("T")[0],
		})),
}));
