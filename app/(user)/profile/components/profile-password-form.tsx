"use client";
import { appToast } from "@/components/app-toast";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const ProfilePasswordForm = ({}) => {
	const [currentPassword, setCurrentPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmNewPassword, setConfirmNewPassword] = useState("");
	const handleProfilePassword = (e: React.FormEvent) => {
		e.preventDefault();
		appToast.info("Profile Update will available Soon!");
	};
	return (
		<form onSubmit={handleProfilePassword}>
			<div className="flex flex-col gap-5 items-start">
				<FieldSet className="w-full grid grid-cols-1 gap-3 md:grid-cols-2">
					<Field className="col-span-2">
						<FieldLabel htmlFor="name" className="text-muted-foreground/60">
							Current Password
						</FieldLabel>
						<Input
							className="bg-accent/20"
							id="name"
							autoComplete="off"
							type={"password"}
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="email_address" className="text-muted-foreground/60">
							New Password
						</FieldLabel>
						<Input
							className="bg-accent/20"
							id="email_address"
							autoComplete="off"
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="email_address" className="text-muted-foreground/60">
							Confirm New Password
						</FieldLabel>
						<Input
							className="bg-accent/20"
							id="email_address"
							autoComplete="off"
							type="email"
							value={confirmNewPassword}
							onChange={(e) => setConfirmNewPassword(e.target.value)}
						/>
					</Field>
				</FieldSet>
				<Button className="cursor-pointer" variant={"outline"}>
					Update password
				</Button>
			</div>
		</form>
	);
};

export default ProfilePasswordForm;
