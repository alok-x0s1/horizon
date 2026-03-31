// import { Calendar, X, ChevronLeft, ChevronRight } from "lucide-react";
// import { useState } from "react";
// import { Card } from "../ui/card";
// import { Button } from "../ui/button";

// interface DatePickerModalProps {
// 	isOpen: boolean;
// 	selectedDate: string;
// 	onDateSelect: (date: string) => void;
// 	onClose: () => void;
// }

// export default function DatePickerModal({
// 	isOpen,
// 	selectedDate,
// 	onDateSelect,
// 	onClose,
// }: DatePickerModalProps) {
// 	const [currentMonth, setCurrentMonth] = useState(
// 		new Date(selectedDate || new Date()),
// 	);

// 	const getDaysInMonth = (date: Date) => {
// 		return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
// 	};

// 	const getFirstDayOfMonth = (date: Date) => {
// 		return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
// 	};

// 	const daysInMonth = getDaysInMonth(currentMonth);
// 	const firstDay = getFirstDayOfMonth(currentMonth);
// 	const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

// 	const handlePrevMonth = () => {
// 		setCurrentMonth(
// 			new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1),
// 		);
// 	};

// 	const handleNextMonth = () => {
// 		setCurrentMonth(
// 			new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1),
// 		);
// 	};

// 	const handleDayClick = (day: number) => {
// 		const selected = new Date(
// 			currentMonth.getFullYear(),
// 			currentMonth.getMonth(),
// 			day,
// 		);
// 		const dateStr = selected.toISOString().split("T")[0];
// 		onDateSelect(dateStr);
// 		onClose();
// 	};

// 	const monthYear = currentMonth.toLocaleDateString("en-US", {
// 		month: "long",
// 		year: "numeric",
// 	});
// 	const selectedDateObj = new Date(selectedDate);
// 	const isToday = (day: number) => {
// 		const today = new Date();
// 		return (
// 			day === today.getDate() &&
// 			currentMonth.getMonth() === today.getMonth() &&
// 			currentMonth.getFullYear() === today.getFullYear()
// 		);
// 	};

// 	const isSelected = (day: number) => {
// 		return (
// 			day === selectedDateObj.getDate() &&
// 			currentMonth.getMonth() === selectedDateObj.getMonth() &&
// 			currentMonth.getFullYear() === selectedDateObj.getFullYear()
// 		);
// 	};

// 	if (!isOpen) return null;

// 	return (
// 		<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
// 			<Card className="border-card-border bg-card w-full max-w-sm rounded-xl">
// 				<div className="p-6">
// 					<div className="flex items-center justify-between mb-6">
// 						<h3 className="text-lg font-bold text-foreground flex items-center gap-2">
// 							<Calendar className="h-5 w-5 text-primary" />
// 							Select Date
// 						</h3>
// 						<button
// 							onClick={onClose}
// 							className="p-1 hover:bg-card-border rounded-lg transition-colors"
// 						>
// 							<X className="h-5 w-5 text-muted-foreground" />
// 						</button>
// 					</div>

// 					<div className="flex items-center justify-between mb-6">
// 						<button
// 							onClick={handlePrevMonth}
// 							className="p-2 hover:bg-card-border rounded-lg transition-colors"
// 						>
// 							<ChevronLeft className="h-5 w-5 text-primary" />
// 						</button>
// 						<h4 className="text-base font-semibold text-foreground">
// 							{monthYear}
// 						</h4>
// 						<button
// 							onClick={handleNextMonth}
// 							className="p-2 hover:bg-card-border rounded-lg transition-colors"
// 						>
// 							<ChevronRight className="h-5 w-5 text-primary" />
// 						</button>
// 					</div>

// 					<div className="grid grid-cols-7 gap-1 mb-2">
// 						{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
// 							(day) => (
// 								<div
// 									key={day}
// 									className="text-center text-xs font-semibold text-muted-foreground py-2"
// 								>
// 									{day}
// 								</div>
// 							),
// 						)}
// 					</div>

// 					<div className="grid grid-cols-7 gap-1">
// 						{Array.from({ length: firstDay }).map((_, i) => (
// 							<div
// 								key={`empty-${i}`}
// 								className="aspect-square"
// 							></div>
// 						))}

// 						{days.map((day) => {
// 							const isTodayDate = isToday(day);
// 							const isSelectedDate = isSelected(day);

// 							return (
// 								<button
// 									key={day}
// 									onClick={() => handleDayClick(day)}
// 									className={`
//                     aspect-square rounded-lg text-sm font-medium transition-all flex items-center justify-center
//                     ${
// 						isSelectedDate
// 							? "bg-primary text-primary-foreground"
// 							: isTodayDate
// 								? "bg-accent/20 text-accent border border-accent"
// 								: "hover:bg-card-border text-foreground"
// 					}
//                   `}
// 								>
// 									{day}
// 								</button>
// 							);
// 						})}
// 					</div>

// 					<div className="mt-6 pt-6 border-t border-card-border flex gap-2">
// 						<Button
// 							variant="outline"
// 							onClick={onClose}
// 							className="flex-1"
// 						>
// 							Cancel
// 						</Button>
// 						<Button
// 							onClick={() => {
// 								onDateSelect(selectedDate);
// 								onClose();
// 							}}
// 							className="flex-1 bg-primary hover:bg-primary-dark"
// 						>
// 							Confirm
// 						</Button>
// 					</div>
// 				</div>
// 			</Card>
// 		</div>
// 	);
// }

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
