import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SidebarFooterUser from "@/components/sidebar-footer-user";

import AdminBreadcrumbs from "@/components/admin-breadcrumbs";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="min-h-screen flex flex-col items-center">
			<TooltipProvider>
				<SidebarProvider
					style={
						{
							"--sidebar-width": "19rem",
						} as React.CSSProperties
					}
				>
					<AppSidebar footer={<SidebarFooterUser />} />
					<SidebarInset>
						<AdminBreadcrumbs />
						<section>{children}</section>
					</SidebarInset>
				</SidebarProvider>
			</TooltipProvider>
		</main>
	);
}
