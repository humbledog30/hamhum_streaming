'use client'

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";
import { Suspense, useState } from "react";
import { DataTable } from "./components/data-table";
import { useGetMovies } from "@/lib/services/get-movies.services";
import { columns } from "./components/column-def";
import AddBanner from "./components/add-banner";
import { DialogTrigger } from "@/components/ui/dialog";

export default function Page() {
    const {data: bannerList, isLoading} = useGetMovies()
    const [randomNumber, setRandomNumber] = useState(0)
    
    if(isLoading){
        return <>Loading ngani ! ! !</>
    }

    function getRandomInt() {
        setRandomNumber(Math.floor(Math.random() * (bannerList?.length ?? 0 - 1 + 1)) + 1);
    }

    return(
        <div className="flex flex-1 flex-col gap-4 p-5 pt-0">
			<section className="flex flex-1 flex-row size-full justify-between">
				<span>
					<h1 className="font-fraunces font-semibold text-2xl md:text-3xl mb-1">
						Banners
					</h1>
					<p className="text-sm text-muted-foreground">
						Manage the homepage featured slider — order, status, and content.
					</p>
				</span>
				<AddBanner>
                    <DialogTrigger className="flex flex-row size-fit px-4 py-2 rounded-md primary-btn">
                        <Plus /> Add Banner
                    </DialogTrigger>
                </AddBanner>
			</section>

            <section className="flex flex-1 flex-row size-full justify-between bg-muted border rounded-md p-3">
                <article className="flex flex-row w-full gap-2 items-center">
                    <p className="text-sm text-muted-foreground">{randomNumber} of {bannerList?.length} active slots used</p>
                    <Progress value={randomNumber} max={bannerList?.length} className="max-w-50" onClick={() => getRandomInt()}/>
                </article>
                
                <p className="w-full text-sm text-muted-foreground">Inactive banners stay saved and can be reactivated anytime</p>
            </section>

			<section>
				<Suspense>
					{bannerList ? <DataTable columns={columns} data={bannerList} /> : null}
				</Suspense>
			</section>
		</div>
    )
}