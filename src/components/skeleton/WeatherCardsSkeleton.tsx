import { Skeleton } from "../ui/skeleton";

function SectionSkeleton({ title }: { title: string }) {
	return (
		<div className="space-y-4">
			<h3 className="text-lg font-semibold text-foreground">{title}</h3>

			<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
				{Array.from({ length: 3 }).map((_, i) => (
					<div
						key={i}
						className="border border-border rounded-xl p-4 md:p-6 space-y-3"
					>
						<div className="flex justify-between items-center">
							<div className="flex flex-col gap-3">
								<Skeleton className="h-5 w-20" />
								<Skeleton className="h-8 w-28" />
							</div>

							<div className="flex">
								<Skeleton className="h-12 w-12 rounded-md" />
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export function WeatherCardsSkeleton() {
	return (
		<div className="space-y-6">
			<SectionSkeleton title="Temperature" />
			<SectionSkeleton title="Atmospheric Conditions" />
			<SectionSkeleton title="Sunrise & Sunset (IST)" />
			<SectionSkeleton title="Wind & Rain" />
		</div>
	);
}
