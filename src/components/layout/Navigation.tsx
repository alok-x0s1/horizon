import { Cloud, BarChart3 } from "lucide-react";
import { Button } from "../ui/button";
import { DatePicker } from "../base/DatePicker";
import { ModeToggle } from "../mode-toggle";

interface NavigationProps {
	currentPage: "current" | "historical";
	onPageChange: (page: "current" | "historical") => void;
}

export default function Navigation({
	currentPage,
	onPageChange,
}: NavigationProps) {
	return (
		<header className="border-b border-border bg-card/50 backdrop-blur-lg sticky top-0 z-50">
			<div className="container mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 px-4 py-2 md:py-3">
				<div className="flex items-center gap-3 cursor-pointer">
					<div className="flex flex-col">
						<h1 className="text-xl font-bold bg-linear-to-r from-cyan-400 via-blue-400 to-green-400 bg-clip-text text-transparent">
							Horizon
						</h1>
						<p className="text-xs text-muted-foreground font-light tracking-wider">
							WEATHER INTELLIGENCE
						</p>
					</div>
				</div>

				<nav className="flex gap-1 md:gap-2 w-full md:w-auto">
					<DatePicker />
					<Button
						variant={
							currentPage === "current" ? "default" : "outline"
						}
						size="lg"
						onClick={() => onPageChange("current")}
						className="gap-1 md:gap-2 text-xs md:text-sm flex-1 md:flex-none"
					>
						<Cloud className="h-4 w-4" />
						<span className="inline">Current</span>
					</Button>
					<Button
						variant={
							currentPage === "historical" ? "default" : "outline"
						}
						size="lg"
						onClick={() => onPageChange("historical")}
						className="gap-1 md:gap-2 text-xs md:text-sm flex-1 md:flex-none"
					>
						<BarChart3 className="h-4 w-4" />
						<span className="inline">Historical</span>
					</Button>
					<ModeToggle />
				</nav>
			</div>
		</header>
	);
}
