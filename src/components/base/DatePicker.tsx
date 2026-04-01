import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { Calendar } from "../ui/calendar";
import { useWeatherStore } from "../../store/useWeatherStore";
import { useState } from "react";

export function DatePicker() {
	const { selectedDate: date, setDate } = useWeatherStore();
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger>
				<div
					data-empty={!date}
					className="w-fit pr-4 pt-1 rounded-sm text-sm justify-between font-normal cursor-pointer hover:underline"
				>
					{date ? format(date, "PPP") : <span>Pick a date</span>}
				</div>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					className="w-65"
					mode="single"
					selected={date ? new Date(date + "T00:00:00") : undefined}
					onSelect={(d) => {
						setDate(d ? format(d, "yyyy-MM-dd") : "");
						setOpen(false);
					}}
					defaultMonth={date ? new Date(date) : undefined}
				/>
			</PopoverContent>
		</Popover>
	);
}
