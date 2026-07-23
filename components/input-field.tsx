import { NextPage } from "next";
import { Input } from "./ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface Props {}

const InputField = ({ className, type, ...props }: React.ComponentPropsWithoutRef<"input">) => {
	const [eyeShow, setEyeShow] = useState<boolean>(false);
	return (
		<div className="relative w-full">
			<Input className={cn(className)} type={eyeShow ? "text" : type} {...props} />
			{type === "password" ? (
				<span
					className="cursor-pointer absolute right-4 top-1/2 -translate-y-1/2 hover:text-primary transition-colors duration-200"
					onClick={() => setEyeShow(!eyeShow)}
				>
					{eyeShow ? <EyeOff /> : <Eye />}
				</span>
			) : null}
		</div>
	);
};

export default InputField;
