import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { TriangleAlert } from "lucide-react";

const CardSection = ({
	title,
	description,
	type = "normal",
	className,
	children,
}: {
	title: string;
	description?: string;
	type?: "dangerous" | "normal";
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<Card
			className={cn(
				`${type === "dangerous" ? "text-destructive border-destructive" : ""} grid grid-cols-1 lg:grid-cols-[30%_auto_1fr]`,
				className,
			)}
		>
			<CardHeader className="p-6 ">
				<p className="text-xl font-fraunces font-semibold -mb-0.5 flex gap-2 items-center">
					{type === "dangerous" ? <TriangleAlert /> : null}
					{title}
				</p>
				{description ? (
					<p className="text-sm text-muted-foreground">{description}</p>
				) : null}
			</CardHeader>
			<Separator
				orientation="vertical"
				className={`${type === "dangerous" ? " bg-destructive" : ""} hidden lg:block`}
			/>
			<Separator
				className={`${type === "dangerous" ? " bg-destructive" : ""} block lg:hidden`}
			/>
			<CardContent className="p-6 grid items-center">{children}</CardContent>
		</Card>
	);
};

export default CardSection;
