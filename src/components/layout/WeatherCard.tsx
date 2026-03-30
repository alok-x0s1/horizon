import type { LucideIcon } from "lucide-react";
import { Card } from "../ui/card";

interface WeatherCardProps {
	icon: LucideIcon;
	label: string;
	value: string;
	color: string;
	bgColor: string;
}

export function WeatherCard({
	icon: Icon,
	label,
	value,
	color,
	bgColor,
}: WeatherCardProps) {
	return (
		<Card className="border-border backdrop-blur-xl p-4 md:p-6">
			<div className="flex items-start justify-between gap-3">
				<div className="flex-1">
					<p className="text-sm text-muted-foreground mb-1 font-medium">
						{label}
					</p>
					<p className="text-lg md:text-2xl font-bold text-foreground">
						{value}
					</p>
				</div>

				<div className={`rounded-md p-2 md:p-3 ${bgColor}`}>
					<Icon className={`h-5 w-5 md:h-6 md:w-6 ${color}`} />
				</div>
			</div>
		</Card>
	);
}
