import { cn } from "@/lib/utils";

const OtherDetails = ({
	data,
	label,
	className,
}: {
	data: React.ReactNode;
	label: string;
	className?: string;
}) => {
	return (
		<div className="flex justify-between items-center gap-3 border-b border-foreground/10 pb-3">
			<span className="text-foreground/50 text-sm font-light">{label}</span>
			<span
				className={cn(
					"text-lg font-medium flex items-center gap-1 font-[Georgia]",
					className,
				)}
			>
				{data}
			</span>
		</div>
	);
};
export default OtherDetails;
