import BasicHeader from "@/components/basic-header";
import { UpdatePasswordForm } from "@/components/update-password-form";

export default function Page() {
	return (
		<div className="max-w-180 w-full mx-auto px-5 flex flex-col gap-10 py-10 mt-10 text-foreground">
			<BasicHeader
				sticker="Account Recovery"
				title="Set a new password"
				description="Choose a strong password you haven't used before on this account."
			/>

			<section className="grid grid-cols-1">
				<UpdatePasswordForm />
			</section>
		</div>
	);
}
