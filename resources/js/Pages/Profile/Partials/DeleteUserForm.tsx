import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog";
import { Separator } from "@radix-ui/react-separator";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { toast } from "sonner";

const FormSchema = z.object({
    password: z.string().min(1, "Password is required"),
});

export default function DeleteUserForm({
    className = "",
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] =
        useState<boolean>(false);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            password: "",
        },
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        router.delete(route("profile.destroy"), {
            data,
            preserveScroll: true,
            onSuccess: closeModal,
            onError: (errors) => {
                console.log(errors);
                if (errors.password) {
                    form.resetField("password");
                    form.setError("password", { message: errors.password });
                }
            },
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
    };

    useEffect(() => {
        return () => {
            form.resetField("password");
        };
    }, []);

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <Dialog
                open={confirmingUserDeletion}
                onOpenChange={(open) => setConfirmingUserDeletion(open)}
            >
                <DialogTrigger asChild>
                    <Button
                        variant={"destructive"}
                        onClick={confirmUserDeletion}
                    >
                        Delete Account
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <div className="mt-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    Are you sure you want to delete your
                                    account?
                                </h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    Once your account is deleted, all of its
                                    resources and data will be permanently
                                    deleted. Please enter your password to
                                    confirm you would like to permanently delete
                                    your account.
                                </p>
                                <Separator
                                    className="my-4"
                                    orientation="horizontal"
                                />
                                <div className="grid w-full items-center gap-4 relative">
                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Password</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Password"
                                                        type="password"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <div className="mt-6 flex justify-end">
                                        <Button
                                            variant={"secondary"}
                                            onClick={closeModal}
                                        >
                                            Cancel
                                        </Button>

                                        <Button
                                            variant={"destructive"}
                                            className="ms-3"
                                        >
                                            Delete Account
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </section>
    );
}
