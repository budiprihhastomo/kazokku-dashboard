import { router, usePage } from "@inertiajs/react";
import { PageProps } from "@/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";

const FormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z
        .string()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),
});

export default function UpdateProfileInformation({
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
        },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        router.patch(route("profile.update"), data, {
            onSuccess: () => {
                toast("Saved!", {
                    description: "User profile updated successfully",
                });
            },
            onError: (errors) => {
                if (errors.name) {
                    form.resetField("name");
                    form.setError("name", { message: errors.name });
                }

                if (errors.current_password) {
                    form.resetField("email");
                    form.setError("email", { message: errors.email });
                }
            },
        });
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <div className="pt-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid w-full items-center gap-4 relative">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Email"
                                                type="email"
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
