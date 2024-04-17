import { router } from "@inertiajs/react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { toast } from "sonner";

const FormSchema = z.object({
    current_password: z.string().min(1, "Current Password is required"),
    password: z.string().min(1, "Password is required"),
    password_confirmation: z
        .string()
        .min(1, "Password Confirmation is required"),
});

export default function UpdatePasswordForm({
    className = "",
}: {
    className?: string;
}) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            current_password: "",
            password: "",
            password_confirmation: "",
        },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        router.put(route("password.update"), data, {
            preserveScroll: true,
            onSuccess: () => {
                form.reset();
                toast("Saved!", {
                    description: "Password updated successfully",
                });
            },
            onError: (errors) => {
                if (errors.password) {
                    form.resetField("password");
                    form.resetField("password_confirmation");
                    form.setError("password", { message: errors.password });
                }

                if (errors.current_password) {
                    form.resetField("current_password");
                    form.setError("current_password", {
                        message: errors.current_password,
                    });
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Update Password
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Ensure your account is using a long, random password to stay
                    secure.
                </p>
            </header>

            <div className="pt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid w-full items-center gap-4 relative">
                            <FormField
                                control={form.control}
                                name="current_password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Current Password"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                            <FormField
                                control={form.control}
                                name="password_confirmation"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Password Confirmation
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Password Confirmation"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className="w-full">Save</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </section>
    );
}
