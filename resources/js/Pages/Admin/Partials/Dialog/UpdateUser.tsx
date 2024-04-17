import { Button } from "@/Components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/Components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    password: z.string().optional(),
    password_confirmation: z.string().optional(),
});

export const UpdateUserDialog = ({
    children,
    open,
    setOpen,
    row,
}: PropsWithChildren<{
    open: boolean;
    setOpen: (open: boolean) => void;
    row: any;
}>) => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            name: row.name,
            password: undefined,
            password_confirmation: undefined,
        },
    });

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        router.patch(route("user.update", row.id), data, {
            onSuccess: () => {
                form.reset();
                form.setValue("name", data.name);
                toast("Saved!", {
                    description: "User account updated successfully",
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

    return (
        <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit User</DialogTitle>
                    <DialogDescription>
                        Fill this form to edit user data.
                    </DialogDescription>
                </DialogHeader>
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
            </DialogContent>
        </Dialog>
    );
};
