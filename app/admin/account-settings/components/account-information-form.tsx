"use client";
import { appToast } from "@/components/app-toast";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface Props {
	initialFullName?: string;
	initialEmail?: string;
}

const AccountInformationForm = ({ initialFullName, initialEmail }: Props) => {
	const [fullName, setFullname] = useState(initialFullName ?? "");
	const [email, setEmail] = useState(initialEmail);
	const handleProfileUpdate = (e: React.FormEvent) => {
		e.preventDefault();
		appToast.info("Profile Update will available Soon!");
	};
	return (
		<form onSubmit={handleProfileUpdate}>
			<div className="flex flex-col gap-5 items-start">
				<FieldSet className="w-full grid grid-cols-1 gap-3 md:grid-cols-2">
					<Field>
						<FieldLabel htmlFor="name" className="text-muted-foreground/60">
							Full name
						</FieldLabel>
						<Input
							className="bg-accent/20"
							id="name"
							autoComplete="off"
							value={fullName}
							onChange={(e) => setFullname(e.target.value)}
						/>
					</Field>
					<Field>
						<FieldLabel htmlFor="email_address" className="text-muted-foreground/60">
							Email address
						</FieldLabel>
						<Input
							className="bg-accent/20"
							id="email_address"
							autoComplete="off"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Field>
				</FieldSet>
				<Button className="cursor-pointer">Save changes</Button>
			</div>
		</form>
	);
};

export default AccountInformationForm;
