import { Skeleton } from "../ui/skeleton";

export function WeatherHeaderSkeleton() {
	return (
		<div className="rounded-lg border border-card-border bg-linear-to-br from-accent/30 via-blue-500/20 to-accent/50 backdrop-blur-xl p-8 md:p-10">
			<div className="flex flex-col gap-4">
				<Skeleton className="h-12 w-40" />

				<Skeleton className="h-5 w-32" />

				<Skeleton className="h-4 w-64" />

				<div className="flex gap-2 mt-4">
					<Skeleton className="h-9 w-28 rounded-md" />
					<Skeleton className="h-9 w-20 rounded-md" />
				</div>
			</div>
		</div>
	);
}
