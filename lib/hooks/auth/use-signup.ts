import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/actions/auth.action";
import type { SignUpForm } from "@/lib/validation/auth.schema";

export const useSignup = () => {
	const router = useRouter();

	return useMutation({
		mutationFn: (input: SignUpForm) => signup(input),
		onSuccess: (result, variables) => {
			if (!result.success) return;
			sessionStorage.setItem("signup-email", variables.email);
			router.push("/auth/confirmation");
		},
	});
};
