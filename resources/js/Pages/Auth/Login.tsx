import { useEffect } from "react";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, router } from "@inertiajs/react";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { Checkbox } from "@/Components/ui/checkbox";
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
import { Separator } from "@/Components/ui/separator";

const FormSchema = z.object({
    email: z
        .string()
        .min(1, "Username is required")
        .email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
    remember: z.boolean(),
});

export default function Login({
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    useEffect(() => {
        return () => {
            form.resetField("password");
        };
    }, []);

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        router.post(route("login"), data, {
            onError: (e) => {
                if (Object.hasOwn(e, "email")) {
                    form.setError("email", { message: e["email"] });
                }
            },
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="flex flex-col space-y-4">
                <div id="header" className="flex flex-col items-center">
                    <h1 className="font-bold text-2xl">
                        Exchange Rates Dashboard
                    </h1>
                    <p className="">
                        Please login first to access this modules
                    </p>
                </div>
                <Separator />
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid w-full items-center gap-4 relative">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Email"
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
                            <div className="flex items-center justify-between py-2">
                                <FormField
                                    control={form.control}
                                    name="remember"
                                    render={({ field }) => (
                                        <FormItem className="mt-2 flex flex-row items-start space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    id="remember"
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                            <label
                                                htmlFor="remember"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Remember me
                                            </label>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {canResetPassword && (
                                    <Link
                                        href={route("password.request")}
                                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                    >
                                        Forgot your password?
                                    </Link>
                                )}
                            </div>
                            <Button className="w-full">Log in</Button>
                        </div>
                    </form>
                </Form>
            </div>
        </GuestLayout>
    );
}
