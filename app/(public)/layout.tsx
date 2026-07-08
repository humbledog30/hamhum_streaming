import MainNavigation from "@/components/nav/main-navigation";
import Footer from "@/components/section/footer";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
	return (
		<main className="min-h-screen flex flex-col items-center">
			<div className="flex-1 w-full flex flex-col items-center ">
				<MainNavigation />
				<div className="mt-16 w-full gap-10 flex flex-col">
					{children}
					<Footer />
				</div>
			</div>
		</main>
	);
}
