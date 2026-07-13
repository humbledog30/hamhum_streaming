"use client";
import { appToast } from "@/components/app-toast";
import { Button } from "@/components/ui/button";
import { NextPage } from "next";

interface Props {}

const ProfileDeleteForm = ({}) => {
	const handleProfileDeletion = (e: React.FormEvent) => {
		e.preventDefault();
		appToast.info("Profile Update will available Soon!");
	};
	return (
		<form onSubmit={handleProfileDeletion}>
			<div className="flex gap-5 flex-wrap justify-between items-center border border-destructive/70 p-5 rounded-md">
				<div className="w-full md:w-[60%]">
					<p className="font-semibold text-destructive">Delete account</p>
					<p className="text-muted-foreground/80 text-sm text-pretty">
						Permanently remove your account, watchlist, and viewing history. This can't
						be undone.
					</p>
				</div>
				<Button
					className="text-destructive border-destructive/70 hover:bg-destructive hover:text-destructive-foreground cursor-pointer"
					variant={"outline"}
				>
					Delete account
				</Button>
			</div>
		</form>
	);
};

export default ProfileDeleteForm;
