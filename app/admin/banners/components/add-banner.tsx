import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ReactNode } from "react";

export default function AddBanner({children} : Readonly<{children: ReactNode}>) {
    return(
        <Dialog>
            {children} {/* Should be your DialogTrigger */}
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Banner</DialogTitle>
                </DialogHeader>

                <article>
                    <p>Laman</p>
                    <p>Laman</p>
                    <p>Laman</p>
                    <p>Laman</p>
                    <p>Laman</p>
                    <p>Laman</p>
                    <p>Laman</p>
                    <p>Laman</p>
                    <p>Laman</p>
                    <p>Laman</p>
                    <p>Laman</p>
                    <p>Laman</p>
                    <p>Laman</p>
                </article>
                
                <DialogFooter>
                    <Button variant={"outline"}>Cancel</Button>
                    <Button>Save Banner</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
};
