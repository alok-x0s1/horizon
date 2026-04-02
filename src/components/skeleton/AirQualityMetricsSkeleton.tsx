import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function AirQualityMetricsSkeleton() {
	return (
		<Card className="bg-card backdrop-blur-xl border border-card-border rounded-xl p-6 md:p-8">
			<h3 className="text-lg md:text-xl font-bold text-foreground mb-6">
				Air Quality Metrics
			</h3>

			<div className="grid gap-3 md:gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
				{Array.from({ length: 8 }).map((_, i) => (
					<div
						key={i}
						className="bg-background-solid/40 rounded-lg p-3 md:p-4 border border-border space-y-2"
					>
						<Skeleton className="h-3 w-12" />
						<Skeleton className="h-6 w-24" />
						<Skeleton className="h-3 w-10" />
					</div>
				))}
			</div>
		</Card>
	);
}
