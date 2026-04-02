import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface ErrorStateProps {
	title?: string;
	description?: string;
	onRetry?: () => void;
	className?: string;
}

export default function ErrorState({
	title = "Something went wrong",
	description = "We couldn't load the data. Please try again.",
	onRetry,
	className,
}: ErrorStateProps) {
	return (
		<div
			className={cn(
				"flex flex-col items-center justify-center text-center py-16 px-4 border border-destructive/30 rounded-xl bg-destructive/5 backdrop-blur-sm",
				className,
			)}
		>
			<div className="mb-4 rounded-full bg-destructive/10 p-3">
				<AlertTriangle className="h-6 w-6 text-destructive" />
			</div>

			<h3 className="text-lg font-semibold text-foreground">{title}</h3>

			<p className="text-sm text-muted-foreground mt-2 max-w-lg">
				{description}
			</p>

			{onRetry && (
				<Button
					variant="outline"
					className="mt-4 gap-2"
					onClick={onRetry}
					size="lg"
				>
					<RefreshCw className="h-4 w-4" />
					Retry
				</Button>
			)}
		</div>
	);
}
