import { NextPage } from "next";
import { redirect } from "next/navigation";

interface Props {}

const Page = ({}) => {
	redirect("/browse");
};

export default Page;
