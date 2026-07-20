import { Skeleton } from "@/components/ui/skeleton";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
} from "@/components/ui/sidebar";

const SECTIONS = [
	{ title: "Overview", items: 2 },
	{ title: "Content", items: 4 },
];

export function AppSidebarSkeleton(props: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar variant="inset" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<div className="flex items-center gap-2 px-2 py-1.5">
							<Skeleton className="size-8 rounded-lg" />
							<div className="flex flex-col gap-1.5">
								<Skeleton className="h-3.5 w-24" />
								<Skeleton className="h-3 w-16" />
							</div>
						</div>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				{SECTIONS.map((section) => (
					<SidebarGroup key={section.title}>
						<SidebarGroupLabel>
							<Skeleton className="h-3.5 w-16" />
						</SidebarGroupLabel>
						<SidebarGroupContent>
							<SidebarMenu>
								{Array.from({ length: section.items }).map((_, index) => (
									<SidebarMenuItem key={index}>
										<div className="flex items-center gap-2 px-2 py-1.5">
											<Skeleton className="size-4 rounded" />
											<Skeleton className="h-3.5 w-24" />
										</div>
									</SidebarMenuItem>
								))}
							</SidebarMenu>
						</SidebarGroupContent>
					</SidebarGroup>
				))}
			</SidebarContent>
		</Sidebar>
	);
}

export default AppSidebarSkeleton;
