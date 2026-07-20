"use client";
import { appToast } from "@/components/app-toast";
import { Button } from "@/components/ui/button";

const AccountDeactiveForm = ({}) => {
	const handleProfileDeletion = (e: React.FormEvent) => {
		e.preventDefault();
		appToast.info("Profile Update will available Soon!");
	};
	return (
		<form onSubmit={handleProfileDeletion}>
			<div className="flex gap-5 flex-wrap justify-between items-center">
				<div className="w-full md:w-[60%]">
					<p className="font-semibold text-destructive">Deactivate your account</p>
					<p className="text-muted-foreground/80 text-sm text-pretty">
						You'll be signed out immediately and lose admin access. This can be reversed
						by another admin, but is not something to do casually.
					</p>
				</div>
				<Button
					className="text-destructive border-destructive/70! hover:bg-destructive! hover:text-destructive-foreground! cursor-pointer"
					variant={"outline"}
				>
					Deactivate account
				</Button>
			</div>
		</form>
	);
};

export default AccountDeactiveForm;
