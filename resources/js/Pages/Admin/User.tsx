import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { LaravelPaginationProps, PageProps } from "@/types";
import { DataTable } from "@/Pages/Admin/Partials/DataTable/Table";
import { User, columns } from "@/Pages/Admin/Partials/DataTable/Columns";
import { Button } from "@/Components/ui/button";
import { Plus } from "lucide-react";
import { AddUserDialog } from "./Partials/Dialog/AddUser";

export default function UserAdmin({
    auth,
    users,
}: PageProps<{ users: LaravelPaginationProps<User> }>) {
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Profile" />

            <div className="container">
                <div className="py-12">
                    <div className="flex py-4 justify-end">
                        <Button asChild>
                            <AddUserDialog>
                                <Plus className="h-4 w-4 mr-2" />
                                Add User
                            </AddUserDialog>
                        </Button>
                    </div>
                    <DataTable columns={columns} data={users.data} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
