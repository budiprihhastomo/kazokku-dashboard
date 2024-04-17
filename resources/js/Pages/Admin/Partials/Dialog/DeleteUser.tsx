import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import { Separator } from "@/Components/ui/separator";
import { router } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { toast } from "sonner";

export const DeleteUserDialog = ({
    children,
    open,
    setOpen,
    row,
}: PropsWithChildren<{
    open: boolean;
    setOpen: (open: boolean) => void;
    row: any;
}>) => {
    const onSubmit = () => {
        router.delete(route("user.delete", row.id), {
            onSuccess: () => {
                setOpen(false);
                toast("Destroyed!", {
                    description: "User account deleted successfully",
                });
            },
            onError: (errors) => {
                Object.keys(errors).forEach((key) => {
                    if (key !== "name" || key !== "email") {
                        form.resetField(key);
                    }

                    form.setError(key, { message: errors[key] });
                });
            },
        });
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <div className="mt-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete your account?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once your account is deleted, all of its resources and
                        data will be permanently deleted. Please enter your
                        password to confirm you would like to permanently delete
                        your account.
                    </p>
                    <Separator className="my-4" orientation="horizontal" />
                    <div className="grid w-full items-center gap-4 relative">
                        <div className="mt-6 flex justify-end">
                            <Button variant={"secondary"} onClick={closeModal}>
                                Cancel
                            </Button>

                            <Button
                                variant={"destructive"}
                                className="ms-3"
                                onClick={onSubmit}
                            >
                                Delete Account
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
