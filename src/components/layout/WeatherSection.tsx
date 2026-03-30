export function WeatherSection({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="space-y-2">
			<h3 className="text-lg font-semibold text-foreground">{title}</h3>
			<div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
				{children}
			</div>
		</div>
	);
}
