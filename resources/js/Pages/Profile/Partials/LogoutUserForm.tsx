import { FormEventHandler } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";

export default function LogoutUserForm({
    className = "",
}: {
    className?: string;
}) {
    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        router.post(route("logout"));
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Logout Menu
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Logout from your account
                </p>
            </header>

            <form onSubmit={onSubmit}>
                <Button variant={"destructive"}>Logout</Button>
            </form>
        </section>
    );
}
