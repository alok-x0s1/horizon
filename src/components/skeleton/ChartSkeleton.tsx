import { Card } from "../ui/card";

export default function ChartSkeleton() {
	return (
		<Card className="border-card-border bg-card/80 backdrop-blur-xl p-4 md:p-6">
			<div className="space-y-4 animate-pulse">
				<div className="h-4 w-1/3 bg-muted rounded" />

				<div className="h-75 w-full bg-muted rounded-lg" />

				<div className="flex justify-between">
					{Array.from({ length: 6 }).map((_, i) => (
						<div key={i} className="h-3 w-8 bg-muted rounded" />
					))}
				</div>
			</div>
		</Card>
	);
}
