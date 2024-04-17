import { Toaster } from "@/Components/ui/sonner";
import { User } from "@/types";
import { PropsWithChildren } from "react";

export default function Authenticated({
    children,
}: PropsWithChildren<{ user: User }>) {
    return (
        <div className="flex justify-center">
            <div className="w-full">
                <main>{children}</main>
                <Toaster />
            </div>
        </div>
    );
}
