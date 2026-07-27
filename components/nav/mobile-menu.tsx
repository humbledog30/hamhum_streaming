"use client";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronRight, Menu } from "lucide-react";
import { Button } from "../ui/button";

import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const MobileMenu = ({ className }: { className?: string }) => {
	const router = useRouter();
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild className={cn("block lg:hidden", className)}>
				<Button
					className="flex items-center gap-1 cursor-pointer rounded-full"
					size={"icon"}
					variant={"outline"}
				>
					<Menu size={12} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent
				align="end"
				className="w-80 max-w-full mt-3 border border-primary rounded-xl px-0"
			>
				<DropdownMenuItem
					className="flex-1 justify-between cursor-pointer"
					onSelect={() => {
						router.push("/browse");
					}}
				>
					Browse
					<ChevronRight />
				</DropdownMenuItem>
				<DropdownMenuItem className="flex-1 justify-between">
					Popular Movies
					<ChevronRight />
				</DropdownMenuItem>
				<DropdownMenuItem
					className="flex-1 justify-between"
					onSelect={() => {
						router.push("/upcoming-releases");
					}}
				>
					Upcoming Releases
					<ChevronRight />
				</DropdownMenuItem>
				<DropdownMenuItem className="flex-1 justify-between">
					All Time Great
					<ChevronRight />
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default MobileMenu;
