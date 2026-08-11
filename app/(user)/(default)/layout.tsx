import Breadcrumbs from "@/components/breadcrumbs";
import MainNavigation from "@/components/nav/main-navigation";
import Footer from "@/components/section/footer";
import { requireUser } from "@/lib/supabase/data-access";
import { UserProvider } from "@/lib/context/UserContext";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
	const user = await requireUser();
	return (
		<UserProvider userId={user.id ?? null}>
			<main className="min-h-screen flex flex-col items-center">
				<div className="flex-1 w-full flex flex-col items-center">
					<MainNavigation />
					<div className="mt-16 w-full gap-10 flex flex-col ">
						{/* <Breadcrumbs /> */}
						{children}
						<Footer />
					</div>
				</div>
			</main>
		</UserProvider>
	);
}
