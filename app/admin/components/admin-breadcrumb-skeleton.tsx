import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

const AdminBreadcrumbsSkeleton = () => {
	return (
		<header className="flex h-16 shrink-0 items-center gap-2 px-6">
			<SidebarTrigger className="-ml-1" />
			<Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
			<div className="flex items-center gap-2">
				<Skeleton className="hidden h-3.5 w-16 md:block" />
				<Skeleton className="hidden h-3.5 w-3 md:block" />
				<Skeleton className="h-3.5 w-24" />
			</div>
		</header>
	);
};

export default AdminBreadcrumbsSkeleton;
